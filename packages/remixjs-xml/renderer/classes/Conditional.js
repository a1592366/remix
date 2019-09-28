const { names } = require('remixjs-events');
const Default = require('./Default');
const types = require('../../types');

const assemblingConditions = function (data, index = 0, group = []) {
  const needApply = [];
  const d = data[index];
  const value = d.name + '|' + d.type;

  needApply.push(value);
  
  for(let i = 0; i < group.length; i++) {
    needApply.push(group[i] + ',' + value);
  }
  
  group.push.apply(group, needApply);

  return index + 1 >= data.length ? 
    group : 
    assemblingConditions(data, index + 1, group);
}

class Conditional extends Default {
  constructor (tagName, model) {
    super(tagName, model);
    this.type = types.CONDITIONAL;
  }

  get __model__ () {
    const conditions = this.conditions;

    return {
      ...super.__model__,
      conditions,
      EXPRESSION () {
        return function () {
          return this === conditions[0] ?
            'if' : 'elif';
        }
      },

      EVENTS () {
        return function () {
          return this.map(e => {
            return `${e.t}${e.n}="${e.v}"`;
          }).join(' ');
        }
      },

      CONDITION () {
        return function () {
          return this.map(e => {
            return `e.${e.v}`;
          }).join('&&');
        }
      }
    }
  }

  get conditions () {
    const { conditions } = this.model;

    return assemblingConditions(conditions).map(t => {
      const e = t.split(',').map(e => {
        const s = e.split('|');
        const n = s[0];
        const t = (s[1] === 'undefined' || !s[1]) ? 'bind' : s[1];
    
        return {
          v: names[n].short,
          n,
          t
        }
      });

      return e;
    }).sort((x, y) => {
      return x.length > x.length ? -1 : 1;
    });
  }
}

module.exports = Conditional;