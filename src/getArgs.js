define(["isTemplateNode"],function(isTemplateNode){
	var isHtml = function(o){
		return typeof o === "string" || isTemplateNode(o);
	};
	var isFactory = function(o){
		return typeof o === "function";
	};
	return function(args){
		var html, factory, thisObject;
		for(var i=0;i<args.length;i++){
			if(isHtml(args[i])){
				html = args[i];
			}else if(isFactory(args[i])){
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