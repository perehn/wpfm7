require(['common/common'],
	
			
function(bc){

BaseController.extend('Page.Services',
/* @Static */
{
	
},
/* @Prototype */
{
	html : '//app/pages/services/services.mustache',
	
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
