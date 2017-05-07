define([],function(){
	var createNodeIterator = (function(){
		var nodeIterator = function(node){
			var nextNode;
			var childIndex = -1;
			var currentChildNodeIterator = null;
			var children = node.childNodes;
			var getNextNode = function(){
				if(childIndex < children.length){
					currentChildNodeIterator = currentChildNodeIterator || nodeIterator(children[childIndex]);
					if(nextNode = currentChildNodeIterator.nextNode()){
						return nextNode;
					}else{
						childIndex++;
						currentChildNodeIterator = null;
						return getNextNode();
					}
				}else{
					return null;
				}
			};
			var nextNode = function(){
				if(childIndex == -1){
					childIndex++;
					return node;
				}else{
					return getNextNode();
				}
			};
			return {
				nextNode:nextNode
			};
		};
		return function(node){
			var currentNode;
			var iterator = nodeIterator(node);
			var nextNode = function(){
				while((currentNode = iterator.nextNode()) && currentNode.nodeType != 1){

				}
				return currentNode;
			};
			return {
				nextNode:nextNode
			};
		};
	})();
	return function(node){
		var res0,nodeIterator;
		var r=[];
		if(document.createNodeIterator){
			nodeIterator=document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT, null, false);
		}else{
			nodeIterator=createNodeIterator(node);
		}
		
		while(res0=nodeIterator.nextNode()){
			r.push(res0);
		}
		return r;
	};
});