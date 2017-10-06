define(["nodeGrouping", "useArgsAndGrouping", "getArgs"],function(nodeGrouping,useArgsAndGrouping,getArgs){
	
	var requireElement = function(){
		var args = getArgs(arguments);
		
		var grouping = new nodeGrouping(args.html, args.thisObject);

		return useArgsAndGrouping(args, grouping, null);
	};

	return requireElement;
});