const fs = require('fs');

fs.copyFile('npm-package.json', 'dist/package.json', (err) => {
  if (err) throw err;
});

fs.copyFile('README.md', 'dist/README.md', (err) => {
  if (err) throw err;
  console.log('README.md Updated!');
});
