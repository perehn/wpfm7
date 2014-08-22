define(['stache!app/pages/popuppage/popuppage.mustache'],
	
			
function(template){

BaseController.extend('Page.Popuppage',
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
	}

});



})
