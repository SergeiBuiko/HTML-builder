const fs = require('fs');
const path = require('path');
const { stdin, stdout, stderr} = process;
const pathFile = path.join(__dirname, 'source.txt');
const output = fs.createWriteStream(pathFile);

stdout.write('Hi, enter your text\n');

stdin.on('data', data => {
  output.write(data);
  const numString = data.toString().trim();
  if (numString === 'exit') {
    process.exit();
  }
  process.on('SIGINT', () => process.exit());
});

process.on('exit', code => {
  if (code === 0) {
      stdout.write('The entry process is completed');
  } else {
      stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
  }
});

