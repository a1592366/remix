import HTMLBodyElement from './HTMLBodyElement';
import createElement from './createElement';
import createTextNode from './createTextNode';
import createContainer from './createContainer';

import env from '../../env';


const fakeDocument = {
  body: new HTMLBodyElement(),
  getElementById (id) {
    return createContainer('container');
  },
  getElementsByTagName () {},  
  querySelector () {},
  addEventListener (type, callback, capture) {
    debugger;
  },
  removeEventListener () {
    debugger;
  },
  createElement,
  createTextNode
}

export default fakeDocument;

// export default typeof document === 'undefined' ? 
//   virtualDocument : 
//   env.isDevToolRuntime ? fakeDocument : document;