define(["appendFromThingsToNode"],function(appendFromThingsToNode){
	var getNamedNode = function(node){
		var attr = node.getAttribute('id');
		if(!attr){return null;}
		var match = attr.match(/^(\d+)(\$)?$/);
		if(!match){return null;}
		node.removeAttribute('id');
		var id = match[1];
		if(match[2] && typeof jQuery === "function"){
			node = jQuery(node);
		}
		return {
			node:node,
			id:id
		};
	};

	var areAllJQueryObjects = function(nodes){
		if(!(typeof jQuery === "function")){return false;}
		for(var i=0;i<nodes.length;i++){
			if(!(nodes[i] instanceof jQuery)){
				return false;
			}
		}
		return true;
	};

	var makePassableArray = function(nodes){
		if(!areAllJQueryObjects(nodes)){return nodes;}
		var result = jQuery();
		for(var i=0;i<nodes.length;i++){
			result.add(nodes[i]);
		}
		return result;
	};

	var groupNamedNodesById = function(namedNodes){
		var result = {};
		for(var i=0;i<namedNodes.length;i++){
			var id = namedNodes[i].id;
			if(result.hasOwnProperty(id)){
				result[id].push(namedNodes[i].node);
			}else{
				result[id] = [namedNodes[i].node];
			}
		}
		for(var id in result){
			if(result.hasOwnProperty(id)){
				result[id] = makePassableArray(result[id]);
			}
		}
		return result;
	};

	var makeArgumentsArray = function(groupedNodes){
		var result = [];

		for(var id in groupedNodes){
			if(groupedNodes.hasOwnProperty(id)){
				var group = groupedNodes[id];
				result[id] = ((typeof jQuery == "function" && group instanceof jQuery) || group.length > 1) ? group : group[0];
			}
		}
		var result2 = [];
		for(var id in result){
			if(result.hasOwnProperty(id)){
				result2.push(result[id]);
			}
		}
		return result2;
	};

	return function(nodes, thisObject){
		var namedNodes = [];
		for(var i=0;i<nodes.length;i++){
			var namedNode = getNamedNode(nodes[i]);
			if(namedNode){
				namedNodes.push(namedNode);
			}
			if(thisObject){
				appendFromThingsToNode(nodes[i], thisObject);
			}
		}
		var grouped = groupNamedNodesById(namedNodes)
		return makeArgumentsArray(grouped);
	};
});