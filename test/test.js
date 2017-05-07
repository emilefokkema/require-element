require.config({
	baseUrl:"../src/"
});

require(["testSet","require-element"],function(testSet){
	testSet = testSet(function(e){console.error(e);}, function(s){console.info(s);});
	
	testSet("allTests", function(test){
		test("testSimple",function(){
			var div = requireElement("<div></div>");
			this.assert(!!div, "div was not there");
		});

		test("testWithFunction",function(){
			var a = requireElement("<div><a id='1'></a></div>",function(a){
				return a;
			});

			this.assert(!!a, "a was not there");
			this.assert(a.tagName == "A", "expected an <a>");
			this.assert(!a.getAttribute('id'),"didn't expect a to have an id");
		});
	});
});