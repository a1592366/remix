const [
  STYLE,
  CHILD
] = [
  'style',
  'child'
]


export default class Updater {
  constructor () {
    this.proxy = new Proxy(this, {
       set: this.setter
    });
  }

  setter = (target, propName, value) => {
    if (this[propName] !== value) {
      this[propName] = value;

      if (propName === STYLE) {
        this.onStyleChange(propName, value);
      } else if (propName === CHILD) {
        this.onChildChange(propName, value);
      } else {
        this.onDefaultChange(propName, value);
      }
    }

    return true;
  }

  onDefaultChange = (propName, value) => {
    if (this.binding) {
      this.binding()
    }
  }

  onChildChange = (propName, value) => {
    if (this.binding) {
      this.binding();
    }
  }

  onStyleChange = (propName, value) => {
    if (this.binding) {
      this.binding()
    }
  }
}