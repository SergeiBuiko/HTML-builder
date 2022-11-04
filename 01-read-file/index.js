const fs = require('fs');
const path = require('path');
const { stdout } = process; 

const pathFile = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathFile, 'utf-8');
readableStream.on('data', chunk => stdout.write(chunk));
readableStream.on('error', error => console.log('error', error.message));