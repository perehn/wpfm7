
define(['can/control', 'can/construct/super'],
function() {
	
	return can.Control.extend('BaseController',{
		
	},{

	html : '',

	useAnimation : true,
	init: function( element , options ){
		this.element.on( 'dodestroy', 'destroy' );
		//this.render();
	},
	getTitle : function(){

		return this.options.title;
	},

	render : function(){
		var self = this;
		return this._preRenderPhase().done(function(){
			self._postRenderPhase();
		})
	},

	_preRenderPhase : function(){
		var controller = this;
		

		var element = controller.element;
		var dfd = $.Deferred();

		var dataDFD = controller.getData() || {};


		$.when(C.dfdMap(dataDFD)).done(function(data){
			if(!controller.element){
				dfd.fail();
				return;
			}

			can.extend(controller.options, data);

			$.when(controller.preRender(data)).done(function(){

				
				dfd.resolve();
			})


		}).fail(function(){
		
			dfd.fail();
		});
		return dfd.promise();
	},

	_postRenderPhase : function(){
		var controller = this, element = this.element;
		if(controller.template){
			element.html(controller.template(controller.options));
			
		}else if(controller.html){
			element.html(controller.html, controller.options);
		}
		
		controller.postRender();
		element.addClass('controller');
		element.trigger('rendered');
		
	},
	

	reRender : function(useAnimation){


		return this.render();
	},

	getData : function(){
		return {}
	},
	preRender : function(data){

	},

	postRender : function(data){

	},
	preAnimate : function(container){

		return {};
	},
	postAnimate : function(container){

		return {};
	},
	destroy: function() {
		if(this.element){
			this.element.removeClass('controller');
		}
		console.log('destroy ' + this.constructor._shortName);
	    this._super();

	}

});
});


