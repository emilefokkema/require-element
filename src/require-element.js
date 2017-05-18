define(["nodeGrouping", "makeArgumentsArray"],function(nodeGrouping,makeArgumentsArray){
	
	var requireElement = function(){
		var thisObject = arguments[2];
		var grouping;
		if(arguments[0] instanceof nodeGrouping){
			grouping = arguments[0];
		}else if(typeof arguments[0] === "string"){
			grouping = new nodeGrouping(arguments[0], thisObject);
		}
		
		var f;
		if(arguments.length <= 1 || typeof (f = arguments[1]) != "function"){
			return grouping.rawNode;
		}
		var toReturn;
		toReturn = f.apply(thisObject, makeArgumentsArray(grouping.groups));
		if(toReturn){
			return toReturn;
		}
		return grouping.rawNode;
	};

	window.requireElement = requireElement;
});