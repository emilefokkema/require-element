define([],function(){
	var onlyTags = function(html){
		return html.replace(/^[^<]*|[^>]*$/g, "");
	};
	if(document.createElement('template').content){
		return function(html){
			var template = document.createElement('template');
			template.innerHTML = onlyTags(html);
			return template.content.childNodes[0];
		};
	}else{
		return function(html){
			var div = document.createElement('div');
			div.innerHTML = onlyTags(html);
			return div.childNodes[0];
		};
	}
});