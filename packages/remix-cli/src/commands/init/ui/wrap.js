const camelcase = require('camelcase');

module.exports = function (view) {
  view.events = view.events.map(event => {
    event.isEvent = true;
    event.camel = event.name;


    return event;
  });

  view.properties = [
    { name: 'uuid', type: 'String', defaultValue: 'null' },
    { name: 'parent', type: 'String', defaultValue: 'null' },
    { name: 'style', type: 'String', defaultValue: 'null' },
    { name: 'className', type: 'String', defaultValue: 'null' }
  ].concat(view.properties).map(prop => {
    prop.camel = camelcase(prop.fullname || prop.name);
    prop.alias = prop.name;

    return prop;
  })

  if (view.open) {
    view.properties.unshift(
      { name: 'child', type: 'Object', defaultValue: 'null', camel: 'child', alias: 'child' },
      { name: 'innerText', type: 'String', defaultValue: 'null', camel: 'innerText', alias: 'innerText' },
    );
  }

  return view;
}