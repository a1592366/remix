const fs = require('fs-extra');
const path = require('path');
const Default = require('./Default');

class Text extends Default {
  constructor (...argv) {
    super(...argv);

    this.xml = fs.readFileSync(
      path.resolve(__dirname, '../xml', 'text.xml')
    ).toString();
  }
}

module.exports = Text;