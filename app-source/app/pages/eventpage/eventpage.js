define(['stache!app/pages/eventpage/eventpage.mustache'],
	
			
function(template){

BaseController.extend('Page.Eventpage',
/* @Static */
{
	
},
/* @Prototype */
{
	template : template,
	
	getData : function(){
		
	},
	preRender : function(data){
		this._super();
	}

});



})
