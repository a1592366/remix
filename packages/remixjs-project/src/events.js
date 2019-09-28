import { getCurrentRendered } from './instance';
import { nextTick } from '@expri/exprijs';
import { events } from '@expri/events';

function getCurrentTargetId (e) {
  const { target } = e;
  const { dataset } = target;

  return dataset.id;
}

function getTargetComponent (e) {
  const id = getCurrentTargetId(e);
  const rendered = getCurrentRendered();
  const component = rendered.dsl.search(id);

  return component;
}

export function createEvent (e, component) {
  const { target, currentTarget, detail } = e;
  const id = component.json.id;
  const newTarget = {    
    ...target,
    ...detail,
  };
  const newCurrentTarget = {
    ...currentTarget,
    ...detail,
    id
  }

  const event = {
    ...e,
    __event__: e,
    target: newTarget,
    currentTarget: newCurrentTarget,
    isStopPropgation: false,
    isPreventDefault: false,
    stopPropagation () {
      this.isStopPropgation = true;
    },

    preventDefault () {
      this.isPreventDefault = true;
    }
  };

  return event;
}

const exports = {};

events.forEach(evt => {
  exports[evt.short] = (e) => {
    const component = getTargetComponent(e);

    if (component) {
      createBuble(evt, e, component);
    }
  }
});

const createBuble  = (evt, e, component) => {
  const method = component.json.props[evt.method];

  

  if (typeof method === 'function') {
    const event = createEvent(e, component);

    nextTick(() => {
      method(event);

      if (!event.isStopPropgation) {
        if (component.parent) {
          createBuble(evt, e, component.parent);
        }
      }
    })        
  }
}

export default exports;
