({
    baseUrl: ".",
    paths: {
        "can" : "bower_components/canjs/amd/can",
        "jquery" : "bower_components/jquery/dist/jquery",
        "views": 'views.production', 
        "framework7" : "bower_components/framework7/dist/js/framework7"
        
        	
    },
    name: "app",
    out: "app-production.js",
    shim: {
       /* 'views': ['can'], */
        'can': ['jquery']
    },
    
    optimize: "none"
})