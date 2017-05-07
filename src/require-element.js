define(["makeRawNode","applyConstructor","getThisObject"],function(makeRawNode,applyConstructor,getThisObject){
	var requireElement = function(html){
		var rawNode = makeRawNode(html);
		var f;
		if(arguments.length <= 1 || typeof (f = arguments[1]) != "function"){
			return rawNode;
		}
		var thisObject, toReturn;
		if(arguments.length > 2){
			thisObject = getThisObject(arguments[2], function(){return toReturn;});
		}
		toReturn = applyConstructor(rawNode, f, thisObject);
		if(toReturn){
			return toReturn;
		}
		return rawNode;
	};

	window.requireElement = requireElement;
});