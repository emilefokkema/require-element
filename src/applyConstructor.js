define(["getAllNodes","getNodesToPass"],function(getAllNodes,getNodesToPass){
	return function(rawNode, f, thisObject){
		var allNodes = getAllNodes(rawNode),
			nodesToPass = getNodesToPass(allNodes);
		return f.apply(thisObject, nodesToPass);
	};
});