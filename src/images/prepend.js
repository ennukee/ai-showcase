const fs = require('fs');
const path = require('path');

const directory = '../images';

// Used to prepend an extra in front of the file names in case we reach a new # milestone (made for 100, when we only had 00-99)
fs.readdir(directory, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach((file) => {
    const oldPath = path.join(directory, file);
    const newName = `0${file}`;
    const newPath = path.join(directory, newName);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Renamed ${file} to ${newName}`);
      }
    });
  });
});