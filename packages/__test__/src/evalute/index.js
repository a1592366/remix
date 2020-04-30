const create = require('./interpreter');
const native = require('./native');

class Evaluate {
  view (route) {
    view(route, this);
  }

  onCreate (interpreter, window) {
    native(interpreter, window);
  } 

  listen () {}

  call () {}

  script (code) {
    this.interpreter = create(code, (interpreter, window) => this.onCreate(interpreter, window));
  }

  run () {
    return this.interpreter.run();
  }

  step () {
    this.interpreter.step();
  }
}

module.exports = new Evaluate();
