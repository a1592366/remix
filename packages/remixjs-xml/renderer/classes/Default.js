const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const camelcase = require('camelcase');
const { names } = require('remixjs-events');
const types = require('../../types');

mustache.tags = ['<%', '%>'];


class Default {
  constructor (tagName, model) {
    this.tagName = tagName;
    this.model = model;
    this.type = types.DEFAULT;
    this.openning = model.openning || false;
  }

  get xml () {
    const file = path.join(__dirname, '../xml',`${this.type}.xml`);
    return fs.readFileSync(file).toString();
  }

  get __model__ () {
    return {
      t: new Date() - 0,
      tagName: this.tagName,
      openning: this.openning,
      props: this.properties,
    }
  }

  get events () {
    const { events } = this.model;

    return events.map(event => {
      return {
        ...event,
        value: names[event.name].short
      }
    }).map(event => {
      return {
        ...event,
        name: `${event.type || 'bind'}${event.name}`
      }
    })
  }

  get properties () {
    const { props } = this.model;

    return props.map(prop => {
      return {
        ...prop,
        value: `{{${camelcase(prop.name)}}}`
      }
    }).concat(this.events, [
      { name: 'style', value: `{{style}}` },
      { name: 'data-id', value: '{{dataId}}' },
      { name: 'data-type', value: '{{type}}' },
      { name: 'class', value: `{{className}}` }
    ]).map(prop => {
      const { name, value } = prop;

      return `${name}=${value}`;
    }).join(' ')
  }

  render () {
    return mustache.render(this.xml, this.__model__);
  }
}

module.exports = Default;