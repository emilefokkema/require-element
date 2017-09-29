define(["makeRawNode", "appendFromThingsToNode","getAllNodes","getArgs","useArgsAndGrouping","isTemplateNode"],function(makeRawNode, appendFromThingsToNode,getAllNodes,getArgs,useArgsAndGrouping,isTemplateNode){
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
				var args = getArgs(arguments);
				var grouping = new nodeGrouping(templateNode.outerHTML, args.thisObject);
				parentNode.appendChild(grouping.rawNode);
				var removed = false;
				var remove = function(){
					if(!removed){
					   	parentNode.removeChild(grouping.rawNode);
						removed = true;
					}
				};
				return useArgsAndGrouping(args, grouping, {remove:remove});
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

	var mountFromTemplateNode = function(templateNode){
		var node = makeRawNode(templateNode.innerHTML);
		var parent = templateNode.parentElement;
		parent.appendChild(node);
		var removed = false;
		var remove = function(){
			if(!removed){
				parent.removeChild(node);
				removed = true;
			}
		};
		return {
			node:node,
			remove:remove
		};
	};

	var nodeGrouping = function(html, thisObject){
		var rawNode;
		if(isTemplateNode(html)){
			var mountedTemplate = mountFromTemplateNode(html);
			rawNode = mountedTemplate.node;
			this.remove = mountedTemplate.remove;
		}else{
			rawNode = makeRawNode(html);
		}
		this.groups = groupNamedNodesById(getNamedNodes(rawNode, thisObject));
		this.rawNode = rawNode;
	};
	return nodeGrouping;
});