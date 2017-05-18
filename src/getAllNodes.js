define([],function(){

	return function(node, condition, rejectedCallback){
		var res0,nodeIterator;
		var r=[node];
		nodeIterator=document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, 
			{
				acceptNode: function(node){
					var accept = condition(node);
					if(rejectedCallback && !accept){
						rejectedCallback(node);
					}
					return accept ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
				}
			}, false);
		while(res0=nodeIterator.nextNode()){
			r.push(res0);
		}
		return r;
	};
});