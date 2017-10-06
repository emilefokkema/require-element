;(function(){
	var something = {};
	//HERE
	if(typeof define === "function"){
		define("requireElement",[],function(){return something.requireElement;})
	}else{
		window.requireElement = something.requireElement;
	}
})()