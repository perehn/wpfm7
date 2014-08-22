define(['can/map',
        'can/view/mustache',
        'common/basemodel',
        'common/basecontroller'],
		function(){
			C = {};
			C.currentPageInfo = new can.Map();
			
			C.compute = function(c){
				if(can.isFunction(c)){
					return c();
				}else{
					return c;
				}
				
			};
			

			$.fn.animationEnd = function (callback) {
	            var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
	                i, j, dom = this;
	            function fireCallBack(e) {
	                callback(e);
	                for (i = 0; i < events.length; i++) {
	                    dom.off(events[i], fireCallBack);
	                }
	            }
	            if (callback) {
	                for (i = 0; i < events.length; i++) {
	                    dom.on(events[i], fireCallBack);
	                }
	            }
	            return this;
	        };
			
			C.openmodal = function(modalClass, options){
				$('#modal-control').control().openModal({modal : modalClass, options:options});
			};
			
			C.openselect = function(target, modalClass, options){
				can.trigger(window, 'closeselect');
				target.selectcontrol({modal : modalClass, options:options});
			};
			
			Mustache.registerHelper('longDate', function(date) {
				date = C.compute(date);
				if(date == null){
					return "-";
				}
				return C.convertToMoment(date).format("L");
			});
			Mustache.registerHelper('shortDate', function(date) {
				date = C.compute(date);
				if(date == null){
					return "-";
				}
				return C.convertToMoment(date).format("D/M");
			});
			Mustache.registerHelper('integeramount', function(number, context) {
				number = C.compute(number);
				  return C.formatInteger(number);
			});
			
		
			C.formatInteger = function(value){
				if(value==null){
					return "";
				}
				return $.formatNumber(value, {format:"#,##0", locale:'sv'});
			};

			C.convertToMoment = function(dateinput) {

				if(moment.isMoment(dateinput)){
					return dateinput;
				}else if(dateinput instanceof LocalDate){
					return dateinput.mom;
				}else if(dateinput instanceof can.Construct){
					var datearray = [dateinput[0], dateinput[1] - 1,dateinput[2]];
					return moment(datearray);
				}else if (dateinput instanceof Date) {
					return moment(dateinput);
				}
				else if (dateinput instanceof Array) {
					var datearray = dateinput.slice(0);
					datearray[1] = dateinput[1] - 1;
					return moment(datearray);
				}else if (dateinput instanceof can.Construct) {
					var datearray = [dateinput[0],dateinput[1] - 1,dateinput[2]]
					
					return moment(datearray);
				}else if(isFinite(String(dateinput))){
					return moment(dateinput);
				}
				console.log("convertToMoment() called with unexpected input: " + dateinput);
				return "";
			};

			
			
			
			C.jsonajax = function(request){
				var dfd = $.Deferred();
				var dataType = 'json';
				if(request.dataType){
					dataType = request.dataType;
				}
				
				var url = '/data' + request.url;
				$.ajax({
					  url: url,
					  processData: false,
					  data: JSON.stringify(request.data),
					  dataType: dataType,
					  contentType:'application/json',
					  type: 'POST',
					  beforeSend:function(request){
			                request.setRequestHeader("QapitalAppVersion", "web");

					  },
					  success: function(data, testStatus, ajaxrequest){
						  var cacheVersion = ajaxrequest.getResponseHeader('cacheversion');
						  if(cacheVersion!=null){
							  C.checkCache(cacheVersion);
						  }

						  if(request.converter){
							  data = request.converter(data);
						  }

						  if(request.success){
							  request.success(data);
						  }
						  return dfd.resolve(data);
					  },

					  error: function(jqXHR, textStatus, errorThrown){

						  C.handleAjaxError(request, jqXHR, textStatus, errorThrown);
						  console.log('fail');
						  dfd.reject();
					  }

					});
				return dfd.promise();
			};

			C.handleAjaxError = function(request, jqXHR, textStatus, errorThrown){
				console.error('ajax error:' + errorThrown + ' for url ' + request.url);

				  if(jqXHR.status == 401){
					  User.handleAuthenticationException();
					  /*
					  if(jqXHR.responseText){
						  var errorInfo = jQuery.parseJSON(jqXHR.responseText);
						  C.showError(errorInfo.text);
					  }else{
						  C.showError('Autentieringsfel');
					  }
					  */
				  }
				  if(request.error){
					  request.error(jqXHR, textStatus, errorThrown);
				  }
				  if(jqXHR.status == 400){
					  if(jqXHR.responseText){
						  var errorInfo = jQuery.parseJSON(jqXHR.responseText);
						  C.showError(errorInfo.text);
					  }else{
						  C.showError('Ett fel har inträffat');
					  }
				  }

				  if(jqXHR.status == 500){
					   C.showError('Ett fel har inträffat');
				  }
				  if(jqXHR.status == 502 || jqXHR.status == 0){
					  window.location.href = "/";
				  }
			};
			
			C.checkCache = function(cacheVersionString){
				
			};
			C.showError = function(errorText){
				console.error(errorText);
			}
			

			 C.dfdMap = function(data){
			    	var dfdMap = $.Deferred();
			    	var deffereds_array = [];
			    	var keys_array = [];
			    	$.map(data, function(dfd, key) {
			    		deffereds_array.push(dfd);
			    		keys_array.push(key);
			    	});
			    	$.when.apply(null, deffereds_array).done(function(){
			    		var args = arguments;
			    		var result = {};
			    		$.each(args, function(i,e){
			    			
			    			var key = keys_array[i];
			    			if(key){
			    				result[key] = e;
			    			}
			    		});
			    		
			    		dfdMap.resolve(result);
			    	}).fail(function(a,b,c){
			    		dfdMap.reject();
			    	});

					return dfdMap;
			    };

			
			can.Control.prototype.find = function(s){
				return this.element.find(s);  
			};
			
			can.Model.List.prototype.grep = function(callback, args){
				return new this.constructor($.grep(this, callback, args));
			};

			can.Model.List.prototype.getOne = function(id){
				return this.grep(function(element){
					return element.id == id;
				})[0];
			};
			can.Model.List.prototype.sort = function(sortFunc){

				[].sort.apply(this, [sortFunc]); 
				return this;
			};
			can.Model.List.prototype.remove = function(item){

				var index = this.indexOf(item);
				this.splice(index, 1);
				console.log(index);
			};



			$.browser = {};
		

			$.fn.model = function(m){
				if(m){

					this.data('model', m);
					this.addClass(m.constructor._shortName);
					this.addClass(m.constructor._shortName + "_" + m.id);
					return this;
				}else{
					return this.data('model');
				}
			};


			jQuery.Event.prototype.stop = function(){
				this.stopPropagation();
				this.preventDefault();
			};

		

		
			$.ajaxSetup({
				
			});
			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
				

			});

			C.isTouch = function(){

				return false;
			};
			C.isPhone = function(){

				return false;
			};


			C.clearController = function(element){
		    	if(element == null){
		    		return;
		    	}
				var controller = element.control();
				if(controller){
					controller.destroy();
				}	
				element.html('')
				
			};
			
			$.fn.clearController = function(){
				C.clearController(this);
			};

			$.fn.deepest = function(selector){
				var elements = this.find(selector);
				var count = elements.length;
				var deepest = elements[count-1];
				return $(deepest);
			};
			$.fn.fullmouseout = function(callback, time){
				if(C.isTouch()){
					return;
				}

				var container = this;
				var timer = $.timer(function() {
					timer.stop();
					if(container ){
						callback();
					}
				}, time !=null?time:500);

				container.on('mouseout', function(){
					timer.play();
				});
				container.on('mouseover', function(){
					timer.stop();
				});
			};

		})