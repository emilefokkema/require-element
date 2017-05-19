# require-element

obtain a reference to an HTML element like

```js
var thing = requireElement("<div><a id=\"1\"></a></div>", function(a){
    //do something with a
    //return something, or not (in which case the div will be returned)
});
```

or use templates like

```html
<script type="text/template" id="toDoList">
	<div>
		<h3>To do</h3>
		<div>
			<div template-id="1"><a id="2">$(text)</a><input id="1" type="button" value="done"></div>
		</div>
		<div><input id="2" type="text"/><input id="3" type="button" value="add"/></div>
	</div>
</script>
```

and then use this template like this

```js
var list = requireElement(
	document.getElementById("toDoList").innerHTML, //the template above as a string of HTML

	//first argument is a function that creates an instance of the div with 'template-id="1"'
	//second argument is the input with 'id="2"'
	//third argument is the input with 'id="3"'
	function(newItemElement, input, addButton){

			addButton.addEventListener('click',function(){

				newItemElement(
					//first argument is the input with 'id="1"'
					//second argument the a with 'id="2"'
					function(doneButton, text){
						doneButton.addEventListener('click',function(){
							text.style.textDecoration = "line-through";
						});
					},
					//an object containing 'text', which is referred to in '$(text)' in the html above
					{text:input.value}
				);
		});
	});

document.body.appendChild(list);
```


