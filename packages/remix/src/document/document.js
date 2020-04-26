import HTMLBodyElement from './HTMLBodyElement';
import createElement from './createElement';
import createTextNode from './createTextNode';
import createContainer from './createContainer';
import globalElements from './globalElements';
import env from '../../config';


const fakeDocument = {
  findElement (uuid) {
    return globalElements[uuid];
  },
  getContainerElements (container) {
    return container.serialize();
  },
  body: new HTMLBodyElement(),
  getElementById (id) {
    return createContainer('container');
  },
  getElementsByTagName () {},  
  querySelector () {},
  dispatchEvent () {},
  createElement,
  createTextNode
}

export default fakeDocument;

// export default typeof document === 'undefined' ? 
//   virtualDocument : 
//   env.isDevToolRuntime ? fakeDocument : document;