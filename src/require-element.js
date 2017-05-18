define(["makeRawNode","getAllNodes","getGroupedNodes", "makeArgumentsArray"],function(makeRawNode,getAllNodes,getGroupedNodes,makeArgumentsArray){
	var requireElement = function(html){
		var rawNode = makeRawNode(html);
		var thisObject = arguments[2];
		var f;
		if(arguments.length <= 1 || typeof (f = arguments[1]) != "function"){
			return rawNode;
		}
		var toReturn;
		var allNodes = getAllNodes(rawNode),
			groupedNodes = getGroupedNodes(allNodes, thisObject);
		toReturn = f.apply(thisObject, makeArgumentsArray(groupedNodes));
		if(toReturn){
			return toReturn;
		}
		return rawNode;
	};

	window.requireElement = requireElement;
});