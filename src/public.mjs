import Stanz from "./main.mjs";
export const getRandomId = () => Math.random().toString(32).slice(2);

export const isxdata = (val) => val instanceof Stanz;

const objectToString = Object.prototype.toString;
export const getType = (value) =>
  objectToString
    .call(value)
    .toLowerCase()
    .replace(/(\[object )|(])/g, "");

export const isObject = (obj) => {
  const type = getType(obj);
  return type === "array" || type === "object";
};

export function nextTick(callback) {
  if (typeof process === "object" && typeof process.nextTick === "function") {
    process.nextTick(callback);
  } else {
    Promise.resolve().then(callback);
  }
}

export function debounce(func, wait = 0) {
  let timeout = null;
  let hisArgs = [];

  return function (...args) {
    if (timeout === null) {
      timeout = 1;
      (wait > 0 ? setTimeout : nextTick)(() => {
        func.call(this, hisArgs);
        hisArgs = [];
        timeout = null;
      }, wait);
    }
    hisArgs.push(...args);
  };
}

// Enhanced methods for extending objects
export const extend = (_this, proto, descriptor = {}) => {
  Object.keys(proto).forEach((k) => {
    const result = Object.getOwnPropertyDescriptor(proto, k);
    const { configurable, enumerable, writable, get, set, value } = result;

    if ("value" in result) {
      if (_this.hasOwnProperty(k)) {
        _this[k] = value;
      } else {
        Object.defineProperty(_this, k, {
          enumerable,
          configurable,
          writable,
          ...descriptor,
          value,
        });
      }
    } else {
      Object.defineProperty(_this, k, {
        enumerable,
        configurable,
        ...descriptor,
        get,
        set,
      });
    }
  });

  return _this;
};
