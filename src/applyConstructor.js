define(["getAllNodes","getNodesToPass"],function(getAllNodes,getNodesToPass){
	return function(rawNode, f, thisObject){
		var allNodes = getAllNodes(rawNode),
			nodesToPass = getNodesToPass(allNodes, thisObject);
		return f.apply(thisObject, nodesToPass);
	};
});