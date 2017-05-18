define(["makeArgumentsArray"],function(makeArgumentsArray){
	return function(args, grouping){
		if(!args.factory){
			return grouping.rawNode;
		}
		var toReturn = args.factory.apply(args.thisObject, makeArgumentsArray(grouping.groups));
		if(toReturn){
			return toReturn;
		}
		return grouping.rawNode;
	}
})