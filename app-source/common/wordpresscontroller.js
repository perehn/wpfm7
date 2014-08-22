require(['common/basecontroller'],
	
			
function(bc){

BaseController.extend('WordpressController',
/* @Static */
{
	
},
/* @Prototype */
{
	html : '//app/pages/about/about.mustache',
	
	getData : function(){
		
		return {
			pageContent : $.ajax({
				  url: '' + this.options.wordpressUrl
			})
		}
	},
	preRender : function(data){
		
	},
	postRender : function(){
		var page = this.element[0];
		FM7App.initPage(page);
	},
	_postRenderPhase : function(){
		var controller = this, element = this.element;
		
		
		var pageContent = $(this.options.pageContent);
		var content = pageContent.find('#page-container > .page');

		
		element.html(content);
		controller.postRender();
		element.addClass('controller');
		element.trigger('rendered');
		
	}

});



})
