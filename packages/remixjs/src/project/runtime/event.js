import { getCurrentRendered } from '../instance';

class Event {
  static create (route, event, name) {
    return new Event(route, event, name);
  }

  constructor (route, event, name) {
    this.route = route;
    this.event = event;
    this.name = name;

    const component = this.getTargetComponent();

    if (component) {
      this.createBubble(component);
    }
  }

  getCurrentTargetId () {
    const { target } = this.event;
    const { dataset } = target;
  
    return dataset.id;
  }

  getTargetComponent () {
    const id = this.getCurrentTargetId(this.event);
    const rendered = getCurrentRendered(this.route);
    const component = rendered.dsl.search(id);
  
    return component;
  }

  createEvent (component) {
    const { target, currentTarget, detail } = this.event;
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
      ...this.event,
      __event__: this.event,
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

  createBubble (component) {
    const method = component.json.props[this.name.method];

    if (typeof method === 'function') {
      const event = this.createEvent(component);

      this.nextTick(() => {
        method(event);

        if (!event.isStopPropgation) {
          if (component.parent) {
            this.createBubble(component.parent);
          }
        }
      });        
    }
  }

  nextTick (callback) {
    setTimeout(callback, 0);
  }
}

export default Event;