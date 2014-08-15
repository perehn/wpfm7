require.config({
  paths : {
    "jquery" : "bower_components/jquery/dist/jquery",
    "can": "bower_components/canjs/amd/can",
    /*"views" : "views"*/
    "framework7" : "bower_components/framework7/dist/js/framework7"
    
  },
  shim: {
      /*'views': ['can'],*/
      'can': ['jquery']
  }
});
require(['can',
         /*'can/util', */
         'can/route',
         'can/view/modifiers',
         'can/map/delegate',
         'can/construct/super',
         'can/construct/proxy',
         'can/control/plugin',
         'can/list',
         'can/map/backup',
         'can/map/define',
         'can/map/validations',
         "framework7",
         "common/framework7-extension",
         "views", 
         'common/common',
 
         'app/models',
         'app/pages',
         'app/models/fixtures'], function() {
	// Use Mustache and Control
	can.Control.extend('SiteControl',{},{
		init : function(){
			var self = this;

			this.element.find('body').append('//app/sitecontainer.mustache', {}, function(){
				FM7App = new Framework7extension({
					
					preloadPreviousPage : false,
					swipePanel: 'left'
					
				});
				
				FM7App.mainView = FM7App.addView('.view-main', {
					// Because we use fixed-through navbar we can enable dynamic navbar
					dynamicNavbar: true
				});
			
				FM7App.loadPage(FM7App.mainView, 'page_start', false);
			});
		},
		'.panel-left a click' : function(el,ev){
			ev.stop();
			FM7App.loadPage(FM7App.mainView, el.attr('data-page'), false);
		}
	});
	
	
	new SiteControl(document, {});
	
});