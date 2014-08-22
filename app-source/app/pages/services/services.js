define(['stache!app/pages/services/services.mustache'],
	
			
function(template){

BaseController.extend('Page.Services',
/* @Static */
{
	
},
/* @Prototype */
{
	template : template,
	
	getData : function(){
		return {
			events : Mevent.getAll()
		}
	},
	preRender : function(data){
		
	},
	postRender : function(){
		var page = this.element[0];
		FM7App.initPage(page);
	}
});



})
