
define(['can'],
	function(){
		
/**
 * @tag models, home
 * Base model ("Abstract")
 */
return can.Model.extend('BaseModel',
/* @Static */
{
	
	

	get : function(){
		return this.findOne(-1);
	},
	  
	getAll: function(){
		return this.findAll();
	},
	
	loadModels : function(request){
		var dfd = can.Deferred();
		var self = this;
		C.jsonajax(request).done(function(items){
			var models = self.models(items);
			dfd.resolve(models);
		});
		return dfd.promise();
	},
	
	
	getOne : function(id){
		var dfd = new $.Deferred();
		this.getAll().done(function(items){
			dfd.resolve(items.getOne(id));
		});
		return dfd.promise();
	}
},
/* @Prototype */
{
	changedAttributes : function(){
		var result = {};
		var data = this.serialize();
		for(var k in data){
			var d = data[k];
			var b = this._backupStore[k];
			if(!can.Object.same(d,b)){
				result[k] = d;
			}
		}
		return result;
	}
});



});
