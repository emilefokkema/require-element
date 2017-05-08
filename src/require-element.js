define(["makeRawNode","applyConstructor"],function(makeRawNode,applyConstructor){
	var requireElement = function(html){
		var rawNode = makeRawNode(html);
		var f;
		if(arguments.length <= 1 || typeof (f = arguments[1]) != "function"){
			return rawNode;
		}
		var toReturn;
		toReturn = applyConstructor(rawNode, f, arguments[2]);
		if(toReturn){
			return toReturn;
		}
		return rawNode;
	};

	window.requireElement = requireElement;
});