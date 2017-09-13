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

		test("testAttributes",function(){
			var button = requireElement("<input type=\"button\" value=\"$(name)\">",{name:"hoi"});

			this.assert(button.getAttribute('value') == "hoi", "button's value wasn't set correctly");
		});

		test("testOffspringArray",function(){
			var div = requireElement("<div>$(name)</div>",function(){}, {name:["one","two"]});

			var html = div.innerHTML;
			this.assert(html == "onetwo", "expected div to say 'onetwo'");
		});

		test("testOffspringAttribute",function(){
			var div = requireElement("<div offspring=\"$(name)\"></div>",function(){}, {name:"something"});

			var html = div.innerHTML;
			this.assert(html == "something", "expected div to say 'something'");
		});

		test("testFromTemplate",function(){
			var self = this;
			requireElement(document.getElementById("settings").innerHTML,function(div, number, button){
				self.assert(div != null, "div was null");
			});
		});

		test("testWithInnerTemplate",function(){
			var self = this;
			requireElement("<div id=\"1\"><ul><li id=\"1\" template-id=\"2\"><a id=\"2\">$(name)</a></li></ul></div>",function(div, li){
				self.assert(div.outerHTML == "<div><ul></ul></div>");

				var item = li(function(li, a){
					self.assert(li, "there was no li");
					self.assert(a, "there was no a");
				},{name:"li"});

				self.assert(div.outerHTML == "<div><ul><li><a>li</a></li></ul></div>");

				
			});
		});
		
		test("testRemovingTemplate", function(){
			var templateUser = requireElement("<div id=\"1\"><span template-id=\"2\"></span></div>",function(div, spanTemplate){
				var span = spanTemplate(function(){
					var self = this;
					return {
						remove:function(){self.remove();}
					};
				});
				return {
					div:div,
					removeSpan:function(){span.remove();}
				};
			});
			var html = templateUser.div.outerHTML;
			this.assert(html === "<div><span></span></div>");
			templateUser.removeSpan();
			html = templateUser.div.outerHTML;
			this.assert(html === "<div></div>", "the span wasn't removed");
		});
	});

	var list = requireElement(document.getElementById("toDoList").innerHTML,function(newItemElement, input, addButton){
		addButton.addEventListener('click',function(){
			newItemElement(function(doneButton, text){
				doneButton.addEventListener('click',function(){
					text.style.textDecoration = "line-through";
				});
			},{text:input.value});
		});
	});

	document.body.appendChild(list);
});