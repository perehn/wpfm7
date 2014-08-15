require(['common/common'],
	
			
function(bc){

BaseController.extend('Page.Start',
/* @Static */
{
	
},
/* @Prototype */
{
	html : '//app/pages/start/start.mustache',
	
	getData : function(){
		return {
			events : Mevent.getAll()
		}
	},
	preRender : function(data){
		this._super();
	},
	'.event click' : function(el,ev){
		ev.stop();
	
		FM7App.nextPage.options = {event : el.model()};
		FM7App.nextPage.showBackLink = true;
		FM7App.loadPage(FM7App.mainView, 'page_eventpage');
	
	},
	'.openpopup click' : function(el,ev){
		ev.stop();
		FM7App.openPopup('popuppage');
	},
	'h2 click' : function(){
		
		
		var buttons = [
		               {
		                   text: 'Button1',
		                   onClick: function () {
		                       FM7App.alert('Button1 clicked');
		                   }
		               },
		               {
		                   text: 'Button2',
		                   onClick: function () {
		                	   FM7App.alert('Button2 clicked');
		                   }
		               },
		               {
		                   text: 'Cancel',
		                   red: true,
		                   onClick: function () {
		                	   FM7App.alert('Cancel clicked');
		                   }
		               },
		           ];
		   FM7App.actions(buttons);
		
		
	}

});



})
