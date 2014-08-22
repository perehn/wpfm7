define(['stache!app/pages/about/about.mustache'],
	
function(template){

BaseController.extend('Page.About',
/* @Static */
{
	
},
/* @Prototype */
{
	html : null,
	template : template,
	
	getData : function(){
		return {
			
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
