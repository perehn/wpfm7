require(['common/common'],
	
			
function(bc){

BaseController.extend('Page.About',
/* @Static */
{
	
},
/* @Prototype */
{
	html : '//app/pages/about/about.mustache',
	
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
