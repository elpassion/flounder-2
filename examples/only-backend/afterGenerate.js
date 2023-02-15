const replace = require('replace-in-file');

const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const projectName = await readline.question(
  'Specify project name used on AWS:\n'
);

const clientName = await readline.question(
  'Specify client name used on AWS:\n'
);
