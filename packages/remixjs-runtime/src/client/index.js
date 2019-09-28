import { getApplication } from './application';
import Page from './page';
import events from './events';
import { getComponentManager } from './component';

export function attached (...argv) {
  return getComponentManager().attached(this, ...argv);
} 

export function detached (...argv) {
  return getComponentManager().detached(this, ...argv);
} 

export { Page, getApplication, events };