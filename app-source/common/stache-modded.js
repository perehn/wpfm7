// RequireJS Mustache template plugin
// http://github.com/jfparadis/requirejs-mustache
//
// An alternative to https://github.com/millermedeiros/requirejs-hogan-plugin
//
// Using Mustache Logic-less templates at http://mustache.github.com
// Using and RequireJS text.js at http://requirejs.org/docs/api.html#text
// @author JF Paradis
// @version 0.0.3
//
// Released under the MIT license
//
// Usage:
//   require(['backbone', 'stache!mytemplate'], function (Backbone, mytemplate) {
//     return Backbone.View.extend({
//       initialize: function(){
//         this.render();
//       },
//       render: function(){
//         this.$el.html(mytemplate({message: 'hello'}));
//     });
//   });
//
// Configuration: (optional)
//   require.config({
//     stache: {
//       extension: '.stache' // default = '.html'
//     }
//   });

/*jslint nomen: true */
/*global define: false */

define(['text'], function ( text) {
    'use strict';

    var sourceMap = {},
        buildMap = {},
        buildTemplateSource = "define('{pluginName}!{moduleName}', ['can/view/mustache'], function (Mustache) { var template = '{content}';  return can.mustache( template );  });\n";

    return {
        version: '0.0.3',

        load: function (moduleName, parentRequire, onload, config) {
            if (buildMap[moduleName]) {
                onload(buildMap[moduleName]);

            } else {
            	//console.log('load ' + moduleName);
                var ext = (config.stache && config.stache.extension) || '';
                var path = (config.stache && config.stache.path) || '';
                text.load(path + moduleName + ext, parentRequire, function (source) {
                    if (config.isBuild) {
                        sourceMap[moduleName] = source;
                        onload();
                    } else {
                        
                        buildMap[moduleName] = can.mustache(source);
                        onload(buildMap[moduleName]);
                    }
                }, config);
            }
        },

        write: function (pluginName, moduleName, write, config) {
        	//console.log('write ' + moduleName);
        	var source = sourceMap[moduleName],
                content = source && text.jsEscape(source);
            if (content) {
                write.asModule(pluginName + '!' + moduleName,
                    buildTemplateSource
                    .replace('{pluginName}', pluginName)
                    .replace('{moduleName}', moduleName)
                    .replace('{content}', content));
            }
        }
    };
});