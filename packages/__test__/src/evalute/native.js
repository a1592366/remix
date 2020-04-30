const React = require('react');
const { Interpreter } = require('./interpreter');

module.exports = function (interpreter, window) {
  const rest = {
    ...React
  }

  delete rest.default;
  delete rest.PropTypes;

  interpreter.setProperty(
    window,
    'React',
    interpreter.nativeToPseudo({
      ...rest 
    })
  );

  interpreter.setProperty(
    window,
    'console',
    interpreter.nativeToPseudo(console)
  )

  interpreter.setProperty(
    window,
    'setInterval',
    interpreter.createNativeFunction((object, timeout) => {
      setTimeout(function () {
        // arguments_: (2) [I…r.Object, 5000]
        // directEval_: false
        // doneArgs_: true
        // doneCallee_: 2
        // doneExec_: true
        // funcThis_: Interpreter.Object {getter: {…}, setter: {…}, properties: {…}, proto: I…r.Object}
        // func_: Interpreter.Object {getter: {…}, setter: {…}, properties: {…}, proto: I…r.Object, illegalConstructor: true, …}
        // n_: 2
        // node: Node {type: "CallExpression", start: 60, end: 126, callee: Node, arguments: Array(2)}
        // scope: Interpreter.Scope {parentScope: I…r.Scope, strict: false, object: I…r.Object}
        // value: 5000
        const state = new Interpreter.State(node, );
      }, timeout)
    })
  )

  interpreter.setProperty(
    window,
    'wx',
    interpreter.nativeToPseudo(wx)
  );
}