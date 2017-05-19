define([],function(){
	var makeAppendable=function(thing){
		var type=typeof thing;
		if(type==='string'){
			return document.createTextNode(thing);
		}else if(type==='number'){
			return document.createTextNode(thing.toString());
		}else{
			return thing;
		}
	};
	var append=function(node, ids, things){
		var toAppend;
		try{
			node.innerText="";
		}catch(e){}
		try{
			node.textContent="";
		}catch(e){}
		ids.map(function(id){
			if(things.hasOwnProperty(id)){
				toAppend=things[id];
				if(!!toAppend.shift){
					for(var j=0;j<toAppend.length;j++){
						node.appendChild(makeAppendable(toAppend[j]));
					}
				}else{
					node.appendChild(makeAppendable(toAppend));
				}
			}
		});
	};
	var rgx = /\$\(([^\s()\-\.]+)\)/g;
	var extract=function(text){
		var match,result=[];
		
		while(match=rgx.exec(text)){
			result.push(match[1]);
		}
		if(result.length==0){return null;}
		return result;
	};
	var getOffspringIdentifiers=function(node){
		var rgx;
		
		if(node.childNodes.length==1&&node.childNodes[0].nodeName==='#text'&&(result=node.innerText||node.textContent)){
			return extract(result);
		}else if(result=node.getAttribute('offspring')){
			node.removeAttribute('offspring');
			return extract(result);
		}
		return null;
	};
	var replaceAttributes = function(node, things){
		var attrs = node.attributes;
		for(var i=0;i<attrs.length;i++){
			attrs[i].value = attrs[i].value.replace(rgx, function(m, p1){
				return ""+things[p1];
			});

		}
	};

	return function(node, things){
		var offspringIds = getOffspringIdentifiers(node);
		if(offspringIds){
			append(node, offspringIds, things);
		}
		replaceAttributes(node, things);
	};
});