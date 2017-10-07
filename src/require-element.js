define(["nodeGrouping", "useArgsAndGrouping", "getArgs"],function(nodeGrouping,useArgsAndGrouping,getArgs){
	
	var requireElement = function(){
		var args = getArgs(arguments);
		
		var grouping = new nodeGrouping(args.html, args.thisObject);
		var thisObj = null;
		if(grouping.remove){
			thisObj = {remove:grouping.remove};
		};

		return useArgsAndGrouping(args, grouping, thisObj);
	};

	return requireElement;
});