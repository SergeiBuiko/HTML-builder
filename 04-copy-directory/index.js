const fs = require("fs/promises");
const path = require("path");
const { copyFile } = require("fs");
const { stdout } = process;

const sourceFolder = path.join(__dirname, "files");
const duplicateFolder = path.join(__dirname, "files-copy");


async function copyDir(srcFolder, dupFolder) {
   await fs.rm(dupFolder, { force: true, recursive: true }); // delete duplicate folder
   await fs.mkdir(dupFolder, { recursive: true }); // create duplicate folder

   const files = await fs.readdir(srcFolder, { withFileTypes: true });

   for (const item of files) {

      const source = path.join(srcFolder, item.name);
      const duplicate = path.join(dupFolder, item.name);

      if (item.isFile()) {
         await fs.copyFile(source, duplicate);  //copy file
      }
      else if (item.isDirectory()) {
         copyDir(source, duplicate);  //copy directory
      }
      
   }
   stdout.write('Directory is copied');
}
copyDir(sourceFolder, duplicateFolder);