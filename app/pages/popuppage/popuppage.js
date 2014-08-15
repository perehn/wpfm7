require(['common/common'],
	
			
function(bc){

BaseController.extend('Page.Popuppage',
/* @Static */
{
	
},
/* @Prototype */
{
	html : '//app/pages/popuppage/popuppage.mustache',
	
	getData : function(){
		return {
			events : Mevent.getAll()
		}
	}

});



})
