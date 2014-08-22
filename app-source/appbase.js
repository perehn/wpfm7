//The build will inline common dependencies into this file.

requirejs.config({

  paths: {
    'jquery':                   '../bower_components/jquery/dist/jquery',
    'can':						'../bower_components/canjs/amd/can',
    "framework7" : 				"../bower_components/framework7/dist/js/framework7",
    'text':						'common/text',
    'stache':					'common/stache-modded'
  },
  shim: {
      /*'views': ['can'],*/
      'can': ['jquery'],
      'stache' : ['jquery', 'can']
  }
});
define([
	'can/view/mustache', 
	'stache',
	
	'jquery',
    'can/util/library', 
    'can/control/route', 
    'can/model',      
    'can/component',
    'can/control',
    'can/route',
    //'can/view/modifiers',
    'can/map/delegate',
    'can/construct/super',
    'can/construct/proxy',
    'can/control/plugin',
    'can/list',
    'can/map/backup',
    'can/map/define',
    'can/map/validations',
    'framework7',
    'common/framework7-extension',
    
    'common/common',
    'common/wordpresscontroller',
   // 'common/basemodel.js',
    'app/models',
    'app/pages',
    'app/models/fixtures',
    'app/appcontrol'], function(){
	
});