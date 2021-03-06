const wrap = require('../wrap');

module.exports = wrap({
  name: 'map',
  open: false,
  properties: [
    { name: 'longitude', type: 'Number', defaultValue: 'null' },
    { name: 'latitude', type: 'Number', defaultValue: 'null' },
    { name: 'scale', type: 'Number', defaultValue: '16' },
    { name: 'markers', type: 'Array', defaultValue: 'null' },
    { name: 'covers', type: 'Array', defaultValue: 'null' },
    { name: 'polyline', type: 'Array', defaultValue: 'null' },
    { name: 'circles', type: 'Array', defaultValue: 'null' },
    { name: 'controls', type: 'Array', defaultValue: 'null' },
    { name: 'include-points', type: 'Array', defaultValue: 'null' },
    { name: 'show-location', type: 'Boolean', defaultValue: 'false' },
    { name: 'polygons', type: 'Array', defaultValue: 'null' },
    { name: 'subkey', type: 'String', defaultValue: 'null' },
    { name: 'layer-style', type: 'Number', defaultValue: '1' },
    { name: 'rotate', type: 'Number', defaultValue: '0' },
    { name: 'skew', type: 'Number', defaultValue: '0' },
    { name: 'enable-3D', type: 'Boolean', defaultValue: 'false' },
    { name: 'show-compass', type: 'Boolean', defaultValue: 'false' },
    { name: 'show-scale', type: 'Boolean', defaultValue: 'false' },
    { name: 'enable-overlooking', type: 'Boolean', defaultValue: 'false' },
    { name: 'enable-zoom', type: 'Boolean', defaultValue: 'false' },
    { name: 'enable-scroll', type: 'Boolean', defaultValue: 'false' },
    { name: 'enable-rotate', type: 'Boolean', defaultValue: 'false' },
    { name: 'enable-satellite', type: 'Boolean', defaultValue: 'false' },
    { name: 'enable-traffic', type: 'Boolean', defaultValue: 'false' },
    { name: 'setting', type: 'Object', defaultValue: 'null' },
  ],

  events: [
    // { name: 'onTap', type: 'String', defaultValue: 'null', alias: 'bindtap' },
    { name: 'onMarkerTap', type: 'String', defaultValue: 'null', alias: 'bindmarkertap' },
    { name: 'onLabelTap', type: 'String', defaultValue: 'null', alias: 'bindlabeltap' },
    { name: 'onControlTap', type: 'String', defaultValue: 'null', alias: 'bindcontroltap' },
    { name: 'onCalloutTap', type: 'String', defaultValue: 'null', alias: 'bindcallouttap' },
    { name: 'onUpdated', type: 'String', defaultValue: 'null', alias: 'bindupdated' },
    { name: 'onRegionChange', type: 'String', defaultValue: 'null', alias: 'bindregionchange' },
    { name: 'onPoiTap', type: 'String', defaultValue: 'null', alias: 'bindpoitap' },
  ]
})