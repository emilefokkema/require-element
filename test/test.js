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

		test("testWithTwoIds",function(){
			var both = requireElement("<div id='1'><a id='2'></a></div>",function(div, a){
				return {
					div:div,
					a:a
				};
			});

			this.assert(both.a.tagName == "A", "expected an <a>");
			this.assert(both.div.tagName == "DIV", "expected a <div>");
		});

		test("testWithThreeIds",function(){
			var both = requireElement("<div id='2'><a id='1'></a><span id='3'></span></div>",function(a, div, span){
				return {
					div:div,
					a:a,
					span:span
				};
			});

			this.assert(both.a.tagName == "A", "expected an <a>");
			this.assert(both.span.tagName == "SPAN", "expected a <span>");
			this.assert(both.div.tagName == "DIV", "expected a <div>");
		});

		test("testOffspring",function(){
			var div = requireElement("<div>$(name)</div>",function(){}, {name:"something"});

			var html = div.innerHTML;
			this.assert(html == "something", "expected div to say 'something'");
		});
	});
});