const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const mustache = require('mustache');

mustache.tag = ['<%', '%>'];


module.exports = class Default {
  constructor (name, tagName, model) {
    this.name = name;
    this.tagName = tagName;
    this.openning = model.openning || false;
  }

  get xml () {
    return this._xml_string || this.resolve()
  }

  get model () {
    return this._model || (this._model = {
      t: new Date() - 0,
      name: this.name,
      tagName: this.tagName,
      openning: this.openning,
      props: this.mapPropsToString(),
    });
  }

  mapPropsToString () {
    return this.properties.map(prop => {
      const { name, value } = prop;

      return `${name}=${value}`;
    }).join(' ');
  }

  resolve () {
    const file = path.resolve(__dirname, `${this.name}.xml`);
    const xml = fs.readFileSync(file).toString();

    this._xml_string = xml;

    return xml;
  }

  render () {
    return mustache.render(
      this.xml, 
      this.model
    );
  }
}
