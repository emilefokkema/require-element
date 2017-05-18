define([], function(){
	var makeArgumentsArray = function(groupedNodes){
		var result = [];

		for(var id in groupedNodes){
			if(groupedNodes.hasOwnProperty(id)){
				var group = groupedNodes[id];
				result[id] = ((typeof jQuery == "function" && group instanceof jQuery) || group.length > 1) ? group : group[0];
			}
		}
		var result2 = [];
		for(var id in result){
			if(result.hasOwnProperty(id)){
				result2.push(result[id]);
			}
		}
		return result2;
	};
	return makeArgumentsArray;
});