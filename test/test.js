require.config({
	baseUrl:"../src/"
});

require(["testSet","require-element"],function(testSet){
	testSet = testSet(function(e){console.error(e);}, function(s){console.info(s);});
	
	testSet("allTests", function(test){
		test("test1",function(){
			var div = requireElement("<div></div>");
			this.assert(!!div, "div was not there");
		});
	});
});