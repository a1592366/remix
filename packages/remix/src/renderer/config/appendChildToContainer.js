import { COMMENT_NODE } from '../../shared/HTMLNodeType';

export default function appendChildToContainer (
  container,
  child
) {
  let parentNode;
  if (container.nodeType === COMMENT_NODE) {
    parentNode = container.parentNode;
    parentNode.insertBefore(child, container);
  } else {
    parentNode = container;
    parentNode.appendChild(child);
  }  
}