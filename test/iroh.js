'use strict';

const Iroh = require('iroh');

// Define the code you want to analyze
const code = `
  var foo = 42;
`;

// Create a stage to analyze the code
const stage = new Iroh.Stage(code);

// Create a listener on the stage
const listener = stage.addListener(Iroh.VAR);

// Jump in *after* the variable got created
listener.on('after', (e) => {
    // This logs the variable's 'name' and 'value'
    console.log(e.name, '=>', e.value);// Prints 'foo => 42'
});

// WARNING: Using eval can be harmful and introduce security vulnerabilities.
// Ensure that the code passed to eval is safe and trusted.
// eslint-disable-next-line no-eval
eval(stage.script);
