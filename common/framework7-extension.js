define(['can', 'framework7'], 
		function(){

	window.Framework7extension = function(params){
		
		
		var app = new Framework7(params), override = {};
		
		override.get = app.get;
		
		app.nextPage = {};
		
		app.get = function(url, callback){
			if(url.indexOf('page_')>-1){
				var pagehtml = can.view.render('//common/pagebase.mustache', {title : url.substring(5), showBackLink : app.nextPage.showBackLink});
			
				app.nextPage.element = $('<div class="page-content"></div>')
				var pageControllerClass = Page[can.capitalize(url.substring(5))];
				var controller = new pageControllerClass(app.nextPage.element, app.nextPage.options);
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
			app.nextPage = {};
			
			
		});
		Framework7.$(document).on('pageAfterAnimation', function (e) {
			app.closePanel();
			
			
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