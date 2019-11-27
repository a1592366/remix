const seed = function () { return seed; };
seed.isRequired = seed;

const PropTypes = {
  array: seed,
  bool: seed,
  func: seed,
  number: seed,
  object: seed,
  string: seed,
  any: seed,
  arrayOf: seed,
  element: seed,
  instanceOf: seed,
  node: seed,
  objectOf: seed,
  oneOf: seed,
  oneOfType: seed,
  shape: seed
};

export default PropTypes;