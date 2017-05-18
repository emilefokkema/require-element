define([],function(){
	return function(args){
		var html, factory, thisObject;
		for(var i=0;i<args.length;i++){
			if(typeof args[i] === "string"){
				html = args[i];
			}else if(typeof args[i] === "function"){
				factory = args[i];
			}else{
				thisObject = args[i];
			}
		}
		return {
			html:html,
			factory:factory,
			thisObject:thisObject
		};
	};
})