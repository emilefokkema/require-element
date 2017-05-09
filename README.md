# require-element

obtain a reference to an HTML element like

```js
var thing = requireElement("<div><a id=\"1\"></a></div>", function(a){
    //do something with a and/or return something
});
```
