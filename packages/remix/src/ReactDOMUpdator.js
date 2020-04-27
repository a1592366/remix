
import { ViewNativeSupport } from './project';

export function enqueueUpdate (element) {
  while (element) {
    if (!element.return) {
      break;
    }

    element = element.return;
  }

  ViewNativeSupport.Publisher.Data(element.serialize());
}

export function dequeueUpdate () {
  
}

