const { readdir } = require("fs/promises");
const { stdout } = process;
const { createReadStream, createWriteStream } = require("fs");
const path = require("path");

const sourceStyles = path.resolve(__dirname, "./styles")
const targetStyles = path.resolve(__dirname, "./project-dist/bundle.css")



async function assembleStyles() {
  const writeStream = createWriteStream(targetStyles);

  const cssFile = (str) => path.extname(str).split('.')[1] === "css";

  const stylePath = (str) => path.join(sourceStyles, str);

  async function mergeFiles(fileName) {

  const readStream = createReadStream(stylePath(fileName));
  readStream.pipe(writeStream);
    
  }

  await Promise.all((await readdir(sourceStyles)).filter(cssFile).map(mergeFiles));
  stdout.write('Styles is merged');
}

assembleStyles();