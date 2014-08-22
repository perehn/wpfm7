define([ 'framework7', 'stache!common/pagebase.mustache'], 
		function(fm7, pagebaseTemplate){

	window.Framework7extension = function(params){
		
		
		var app = new Framework7(params), override = {};
		
		override.get = app.get;
		
		app.nextPage = {
			options : {}
		};
		
		app.get = function(url, view, callback){
			console.log('Get ' + url);
			if(url.indexOf('page_')>-1){
				app.closePanel();
				//var pagehtml = can.view.render('//common/pagebase.mustache', {title : url.substring(5), showBackLink : app.nextPage.showBackLink});
				var pagehtml = pagebaseTemplate.render( {title : url.substring(5), showBackLink : app.nextPage.showBackLink});
				
				
				
				app.nextPage.element = $('<div class="page-content"></div>')
				var pageControllerClass = Page[can.capitalize(url.substring(5))];
				if(!pageControllerClass){
					console.log('COuld not find controller for ' + url);
					return;
				}
				var controller = new pageControllerClass(app.nextPage.element, app.nextPage.options);
				controller._preRenderPhase().done(function(){
					callback(pagehtml);
					
					
				});
				
				return;
			}
			
			else if(url.indexOf('/') == 0 || url.indexOf('http://wordpress.dev') == 0){
				app.closePanel();
				var pagehtml = pagebaseTemplate.render( {title : '', showBackLink : true});
				app.nextPage.element = $('<div class="page-content"></div>');
				app.nextPage.options.wordpressUrl = url;
				
				var controller = new WordpressController(app.nextPage.element, app.nextPage.options);
				controller._preRenderPhase().done(function(){
					callback(pagehtml);
					
					
				});
				
				return;
				
			}
			override.get(url,callback);
		}
		
		app.openPopup = function(url, config){
			var self = this, config = config || {};
			

			$('.popup .page').append('<div class="page-content"></div>')
			var target = $('.popup .page .page-content');
			
			
			
			var pageController = Page[can.capitalize(url)];
			if (pageController == null) {
				console.error(url + ' not found');
				
				return;
			}

			var renderDFD = new pageController(target, config.pageOptions).render();
			renderDFD.done(function(){
				self.popup('.popup');
			});
		};
		
		
		
		
		
		Framework7.$(document).on('pageBeforeInit', function (e) {
			var pageConfig = e.detail.page;
			
			
			
			var $page = $(pageConfig.container);
			
			$page.append(app.nextPage.element);
			var controller = $page.find('.page-content').control();
			controller._postRenderPhase();
			app.nextPage = {
				options : {}
			};
			
			
		});
		Framework7.$(document).on('pageAfterAnimation', function (e) {
			//app.closePanel();
			
			
		});
		Framework7.$(document).on('pageBeforeRemove', function (e) {
			var pageConfig = e.detail.page;
			
			
			var el = $(pageConfig.container).find('.page-content');
			var control = el.control();
			control.destroy();
			
		});
		
		$('.popup').on('closed', function(){
			console.log('popup closed');
			$('.popup .page .page-content').remove();
		});
		
		
		return app;
	};
	
	
	
	
})