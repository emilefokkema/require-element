define(["makeRawNode","nodeGrouping", "makeArgumentsArray"],function(makeRawNode,nodeGrouping,makeArgumentsArray){
	
	var requireElement = function(){
		var thisObject = arguments[2];
		var grouping;
		if(arguments[0] instanceof nodeGrouping){
			grouping = arguments[0];
		}else if(typeof arguments[0] === "string"){
			var rawNode = makeRawNode(arguments[0]);
			grouping = new nodeGrouping(rawNode, thisObject);
		}
		
		var f;
		if(arguments.length <= 1 || typeof (f = arguments[1]) != "function"){
			return rawNode;
		}
		var toReturn;
		toReturn = f.apply(thisObject, makeArgumentsArray(grouping.groups));
		if(toReturn){
			return toReturn;
		}
		return rawNode;
	};

	window.requireElement = requireElement;
});