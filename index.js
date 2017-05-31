'use strict';

/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */
module.exports = class Delegator {
  constructor(proto, target) {
    this.proto = proto;
    this.sourceTarget = target;
    this.methods = [];
    this.getters = [];
    this.setters = [];
    this.fluents = [];

    // inspect target exist
    this.target;
  }

  // To prevent the pointer changes
  get target() {
    let target;
    if (typeof this.sourceTarget === 'string') {
      const [ tObj, tName ] = name2Obj(this.proto, this.sourceTarget);
      target = tObj[tName];
    } else {
      target = this.sourceTarget;
    }

    if(!isObject(target)) {
      throw new Error('target is not an object');
    }

    return target;
  }

  /**
   * Delegate method `name`.
   *
   * @param {String} name
   * @param {String} targetName
   * @return {Delegator} self
   * @api public
   */
  method(name, targetName) {
    targetName = targetName || name;
    this.methods.push(targetName);

    const [ proto, pName ] = name2Obj(this.proto, targetName, true);

    proto[pName] = (...args) => {
      const [ target, tName] = name2Obj(this.target, name);
      return target[tName].apply(target, args);
    };
    
    return this;
  }

  /**
   * Delegator getter `name`.
   *
   * @param {String} name
  *  @param {String} targetName
   * @return {Delegator} self
   * @api public
   */
  getter(name, targetName) {
    targetName = targetName || name;
    this.getters.push(targetName);

    const [ proto, pName ] = name2Obj(this.proto, targetName, true);

    proto.__defineGetter__(pName, () => {
      const [ target, tName] = name2Obj(this.target, name);
      return target[tName];
    });

    return this;
  }

  setter(name, targetName){
    targetName = targetName || name;
    this.setters.push(targetName);

    const [ proto, pName ] = name2Obj(this.proto, targetName, true);

    proto.__defineSetter__(pName, (val) => {
      const [ target, tName] = name2Obj(this.target, name);
      return target[tName] = val;
    });

    return this;
  }

  /**
   * Delegator accessor `name`.
   *
   * @param {String} name
   * @param {String} targetName
   * @return {Delegator} self
   * @api public
   */
  access(name, targetName) {
    return this.getter(name, targetName).setter(name, targetName);
  }

  /**
   * Delegator fluent accessor
   *
   * @param {String} name
   * @param {String} targetName
   * @return {Delegator} self
   * @api public
   */
  fluent (name, targetName) {
    targetName = targetName || name;
    this.fluents.push(targetName);

    const [ proto, pName ] = name2Obj(this.proto, targetName, true);

    proto[pName] = (val) => {
      const [ target, tName] = name2Obj(this.target, name);
      if ('undefined' != typeof val) {
        target[tName] = val;
        return proto;
      } else {
        return target[tName];
      }
    };

    return this;
  }

  static delegate(...args) {
    return new this(...args);
  }

  /**
   * Automatically delegate properties
   * from a target prototype
   *
   * @param {Object} proto
   * @param {object} target
   * @api public
   */
  static auto(proto, target) {
    const delegator = new this(proto, target);
    const properties = Object.getOwnPropertyNames(delegator.target);
    for (const property of properties) {
      const descriptor = Object.getOwnPropertyDescriptor(delegator.target, property);
      if (descriptor.get) {
        delegator.getter(property);
      }
      if (descriptor.set) {
        delegator.setter(property);
      }
      if (descriptor.hasOwnProperty('value')) { // could be undefined but writable
        const value = descriptor.value;
        if (value instanceof Function) {
          delegator.method(property);
        } else {
          delegator.getter(property);
        }
        if (descriptor.writable) {
          delegator.setter(property);
        }
      }
    }
  } 
};

function name2Obj(proto, name, autoPad) {
  let names = name.split('.');
  let lastPropName = names.pop();
  let target = proto;

  names.reduce((prop, propName, index) => {
    // not auto padding obj and not find property throw error
    if(!autoPad && !isObject(prop[propName])){
      throw new Error(`property [${names.slice(0, index + 1).join('.')}] is not an object`);
    }

    return prop[propName] = target = prop[propName] || {};
  }, target);

  return [target, lastPropName];
}

function isObject(obj){
  return typeof obj === 'object' && obj !== null;
}
