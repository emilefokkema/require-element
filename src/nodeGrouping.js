define(["makeRawNode", "appendFromThingsToNode","getAllNodes"],function(makeRawNode, appendFromThingsToNode,getAllNodes){
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

	var getNamedTemplateNode = function(templateNode){
		var parentNode = templateNode.parentNode;
		parentNode.removeChild(templateNode);
		var idAttr = templateNode.getAttribute('template-id');
		var match = idAttr.match(/^\d+$/);
		if(!match){
			throw new Error("just an integer as template-id please");
		}
		templateNode.removeAttribute('template-id');
		var id = match[0];
		return {
			id:id,
			node:function(){
				console.log(templateNode.outerHTML);
				throw new Error("not implemented!");
			}
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

	var getNamedNodes = function(rawNode, thisObject){
		var templateNodes = [];
		var nodes = getAllNodes(
			rawNode,
			function(node){return node.getAttribute('template-id') == null;},
			function(templateNode){templateNodes.push(templateNode);});
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
		for(var i=0;i<templateNodes.length;i++){
			namedNodes.push(getNamedTemplateNode(templateNodes[i]));
		}
		return namedNodes;
	};

	return function(html, thisObject){
		var rawNode = makeRawNode(html);
		this.groups = groupNamedNodesById(getNamedNodes(rawNode, thisObject));
		this.rawNode = rawNode;
	};
});