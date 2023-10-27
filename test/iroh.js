const Iroh = require("iroh");

// Define the code you want to analyze
const code = `
  var foo = 42;
`;

// Create a stage to analyze the code
let stage = new Iroh.Stage(code);

// Create a listener on the stage
let listener = stage.addListener(Iroh.VAR);

// Jump in *after* the variable got created
listener.on("after", (e) => {
  // This logs the variable's 'name' and 'value'
  console.log(e.name, "=>", e.value);  // Prints "foo => 42"
});

// Run the stage script to perform the analysis
eval(stage.script);
