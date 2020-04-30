
import { document } from './document';
import { ViewNativeSupport } from './project';
import { INTERNAL_RELATIVE_KEY } from './shared';

const flattern = function (element) {
  const { child } = element;

  if (child) {
    const siblings = [];
    let sibling = child.sibling;

    if (child.child) {
      flattern(child);
    }

    while (sibling) {
      if (sibling.child) {
        flattern(sibling);
      }

      const { sibling: s, ...rest } = sibling;

      siblings.push(rest);
      sibling = sibling.sibling;
    } 

    if (siblings.length > 0) {
      child.siblings = siblings;
    }

    delete child.sibling;
  }
}


export function DOMUpdateQueue (workInProgress) {
  const { stateNode } = workInProgress;

  if (stateNode) {
    const { containerInfo } = stateNode;

    if (containerInfo.tagName === 'view-controller') {
      const element = containerInfo.serialize();

      flattern(element)

      ViewNativeSupport.Publisher.Data(
        containerInfo[INTERNAL_RELATIVE_KEY], 
        element.child
      );
    }
  }
}


