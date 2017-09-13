define(["makeArgumentsArray"],function(makeArgumentsArray){
	return function(args, grouping, thisObj){
		if(!args.factory){
			return grouping.rawNode;
		}
		var toReturn = args.factory.apply(thisObj, makeArgumentsArray(grouping.groups));
		if(toReturn){
			return toReturn;
		}
		return grouping.rawNode;
	}
})