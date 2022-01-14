const path = require('path');

const appDir = process.cwd();
const resolvePathApp = (relativePath) => {
    console.log(path.resolve(appDir, relativePath), 1111111);
    return path.resolve(appDir, relativePath);
};

module.exports = resolvePathApp;
