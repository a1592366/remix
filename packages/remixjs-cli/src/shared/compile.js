const webpack = require('webpack');

class Compile {
  static createCompileEngine (...argv) {
    return new CompileEngine(...argv);
  }

  constructor () {
    this.instance = null;
  }

  distroy () {
    if (this.instance) {
      this.instance.close();
    }
  }

  start () {

  }

  build () {

  }

  update () {
    
  }

}
