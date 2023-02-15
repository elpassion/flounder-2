const replace = require('replace-in-file');

const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const run = async () => {
  const projectName = await readline.question(
    'Specify project name used on AWS:\n'
  );

  const clientName = await readline.question(
    'Specify client name used on AWS:\n'
  );
  await readline.close();

  const clientNameRegex = /.*(elpassion).*#REPLACE_CLIENT/g;
  const projectNameRegex = /.*(fch).*#REPLACE_PROJECT/g;

  const results = replace.sync({
    files: 'iac/**/*',
    from: [clientNameRegex, projectNameRegex],
    to: [
      (match) => match.replaceAll('elpassion', clientName),
      (match) => match.replaceAll('fch', projectName),
    ],
  });

  console.log(results);
};

run();
