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

  const projectToken = 'nixa';
  const clientToken = 'nixa'

  const clientNameRegex = new RegExp(`^.*(${clientToken}).*REPLACE_CLIENT.*$`, 'gm');
  const projectNameRegex = new RegExp(`^.*(${projectToken}).*REPLACE_PROJECT.*$`, 'gm');

  console.log('Replacing project and client references...');
  replace.sync({
    files: [
      './.aws/**/*',
      './.development/**/*',
      './.docker/**/*',
      './.github/**/*',
      './README.md',
      './apps/admin/next.config.js',
      './iac/**/*',
      './**/.env*'
    ],
    ignore: ['node_modules/**/*', 'afterGenerate.js'],
    glob: {
      dot: true,
    },
    from: [clientNameRegex, projectNameRegex],
    to: [
      (match) => match.replaceAll(clientToken, clientName),
      (match) => match.replaceAll(projectToken, projectName),
    ],
  });
  console.log('Successfully replaced project files!');
};

run();
