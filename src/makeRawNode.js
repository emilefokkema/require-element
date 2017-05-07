define([],function(){
	if(document.createElement('template').content){
		return function(html){
			var template = document.createElement('template');
			template.innerHTML = html;
			return template.content.childNodes[0];
		};
	}else{
		return function(html){
			var div = document.createElement('div');
			div.innerHTML = html;
			return div.childNodes[0];
		};
	}
});