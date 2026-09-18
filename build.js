const fs = require("fs");
const path = require("path");

function copyFolder(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  for (const item of fs.readdirSync(source)) {
    const sourcePath = path.join(source, item);
    const destinationPath = path.join(destination, item);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolder(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

fs.copyFileSync("index.html", "dist/index.html");

if (fs.existsSync("public")) {
  copyFolder("public", "dist");
}