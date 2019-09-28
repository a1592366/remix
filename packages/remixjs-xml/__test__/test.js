const path = require('path');
const fs = require('fs-extra');
const builder = require('../index');

const filepath = path.join(__dirname, 'xml');

if (!fs.existsSync(filepath)) {
  fs.mkdirSync(filepath);
}

builder.build(filepath);