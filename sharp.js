const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

const createDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

createDirectory(destination);

fs.readdirSync(target).forEach((image) => {
  sharp(`${target}/${image}`)
    .resize(1200).toFile(path.resolve(__dirname, `${destination}/${image.split('.')
      .slice(0, -1)
      .join('.')}-large.jpg`));

  sharp(`${target}/${image}`)
    .resize(720)
    .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`));
});
