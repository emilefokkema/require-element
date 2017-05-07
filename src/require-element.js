define(["makeRawNode"],function(makeRawNode){
	var requireElement = function(html){
		var rawNode = makeRawNode(html);
		var f;
		if(arguments.length > 1 && typeof (f = arguments[1]) == "function"){

		}else{
			return rawNode;
		}
	};

	window.requireElement = requireElement;
});