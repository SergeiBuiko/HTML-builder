const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'secret-folder');

fs.readdir(pathFile, {withFileTypes: true}, (error, dirList) => {

  if (!error) {
      dirList.forEach((dirEntry) => {
        
        if (dirEntry.isFile()) {

          const fileName = dirEntry.name;
          fs.stat(`${pathFile}/${fileName}`, (err, stats) => {
            if (err) {
              console.error(err);
              return
            }
            console.log(`${path.basename(fileName).split('.')[0]} - ${path.extname(fileName).split('.')[1]} - ${stats.size}kb`);
          })

        }

      });
  }
  else {
      console.error(error);
  }

})
