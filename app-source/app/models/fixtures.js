define(['can/util/fixture'],
function(){
	can.fixture.delay = 0;
	
	var makeStoreOfArray = function(itemArray){
		var store = can.fixture.store(itemArray.length, function(i){
		    var item = itemArray[i];
		    if(item.id == null){
		    	item.id = i;
		    }
		    return item;
		
		})
		return store;
	}
	
	
	var mEventStore = makeStoreOfArray([
	               	          		    
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"},
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"},
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"},
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"},
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"},
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"},
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"},
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"},
	            	        		    {message: "Allright!"},
	            	        		    {message: "New model arrived!"}
	            	        		  ]);
	
	can.fixture({
		'GET /mevent' : mEventStore.findAll
	})
	
	
})