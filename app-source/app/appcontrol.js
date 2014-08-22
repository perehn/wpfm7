
define([
         'stache!app/sitecontainer.mustache',
         'stache!app/pages/about/about.mustache',
         'can/control',
         'app/pages',
         'app/models'
         ], function(template) {
	// Use Mustache and Control
	can.Control.extend('AppControl',{},{
		init : function(){
			var self = this;

			var html = template({});
			this.element.find('body').append(html);
			
			FM7App = new Framework7extension({
				
				preloadPreviousPage : false,
				swipePanel: 'left'
				
			});
			
			FM7App.mainView = FM7App.addView('.view-main', {
				// Because we use fixed-through navbar we can enable dynamic navbar
				dynamicNavbar: true
			});
			console.log('load page');
			FM7App.loadPage(FM7App.mainView, 'page_start', false);
		}
		
	});
	
	//setTimeout(function(){
		new AppControl(document, {});
	//},10)
	
	
});