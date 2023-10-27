// create a listener
let listener = stage.addListener(Iroh.VAR);
// jump in *after* the variable got created
listener.on("after", (e) => {
  // this logs the variable's 'name' and 'value'
  console.log(e.name, "=>", e.value); // prints "foo => 42"
});


// the stage object holds the patched version of our code
// we just use eval here to keep things simple
eval(stage.script);