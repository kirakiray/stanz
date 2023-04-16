// stanz - v8.0.1 https://github.com/kirakiray/stanz  (c) 2018-2023 YAO
parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pBGv":[function(require,module,exports) {

var t,e,n=module.exports={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}function u(t){if(e===clearTimeout)return clearTimeout(t);if((e===o||!e)&&clearTimeout)return e=clearTimeout,clearTimeout(t);try{return e(t)}catch(n){try{return e.call(null,t)}catch(n){return e.call(this,t)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(n){t=r}try{e="function"==typeof clearTimeout?clearTimeout:o}catch(n){e=o}}();var c,s=[],l=!1,a=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):a=-1,s.length&&h())}function h(){if(!l){var t=i(f);l=!0;for(var e=s.length;e;){for(c=s,s=[];++a<e;)c&&c[a].run();a=-1,e=s.length}c=null,l=!1,u(t)}}function m(t,e){this.fun=t,this.array=e}function p(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new m(t,e)),1!==s.length||l||i(h)},m.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.env={},n.argv=[],n.version="",n.versions={},n.on=p,n.addListener=p,n.once=p,n.off=p,n.removeListener=p,n.removeAllListeners=p,n.emit=p,n.prependListener=p,n.prependOnceListener=p,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0};
},{}],"jcrR":[function(require,module,exports) {
var process = require("process");
var e=require("process");Object.defineProperty(exports,"__esModule",{value:!0}),exports.debounce=i,exports.isObject=exports.isFunction=exports.getType=exports.getRandomId=exports.extend=void 0,exports.nextTick=s;const t=()=>Math.random().toString(32).slice(2);exports.getRandomId=t;const o=Object.prototype.toString,n=e=>o.call(e).toLowerCase().replace(/(\[object )|(])/g,"");exports.getType=n;const r=e=>{const t=n(e);return"array"===t||"object"===t};exports.isObject=r;const c=e=>n(e).search("function");function s(t){"object"==typeof e&&"function"==typeof e.nextTick?e.nextTick(t):Promise.resolve().then(t)}function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=null,n=[];return function(){null===o&&(o=1,(t>0?setTimeout:s)(()=>{e.call(this,n),n=[],o=null},t)),n.push(...arguments)}}exports.isFunction=c;const l=function(e,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return Object.keys(t).forEach(n=>{const r=Object.getOwnPropertyDescriptor(t,n),{configurable:c,enumerable:s,writable:i,get:l,set:u,value:p}=r;"value"in r?e.hasOwnProperty(n)?e[n]=p:Object.defineProperty(e,n,{enumerable:s,configurable:c,writable:i,...o,value:p}):Object.defineProperty(e,n,{enumerable:s,configurable:c,...o,get:l,set:u})}),e};exports.extend=l;
},{"process":"pBGv"}],"aER9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.emitUpdate=exports.default=void 0;var e=require("./public.mjs"),t=require("./main.mjs");const r=e=>{let{type:a,currentTarget:u,target:s,name:n,value:c,oldValue:o,args:p,path:i=[]}=e;if(i&&i.includes(u))return void console.warn("Circular references appear");let l={type:a,target:s,name:n,value:c,oldValue:o};"array"===a&&(l={type:a,target:s,name:n,args:p}),u._hasWatchs&&u[t.WATCHS].forEach(e=>{e({currentTarget:u,...l,path:[...i]})}),u._update&&u.owner.forEach(e=>{r({currentTarget:e,...l,path:[u,...i]})})};exports.emitUpdate=r;var a={watch(r){const a="w-"+(0,e.getRandomId)();return this[t.WATCHS].set(a,r),a},unwatch(e){return this[t.WATCHS].delete(e)},watchTick(t){return this.watch((0,e.debounce)(t))}};exports.default=a;
},{"./public.mjs":"jcrR","./main.mjs":"PnwU"}],"KVRu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setData=exports.handler=exports.clearData=void 0;var e=require("./public.mjs"),t=o(require("./main.mjs")),r=require("./watch.mjs");function a(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(a=function(e){return e?r:t})(e)}function o(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=a(t);if(r&&r.has(e))return r.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var i=n?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(o,s,i):o[s]=e[s]}return o.default=e,r&&r.set(e,o),o}const{defineProperties:n}=Object,s=a=>{let{target:o,key:n,value:s,receiver:c,type:u}=a,l=s;(0,t.isxdata)(l)?l._owner.push(c):(0,e.isObject)(s)&&(l=new t.default(s))._owner.push(c);const p=c[n],f=p===s;return!f&&(0,t.isxdata)(p)&&i(p,c),!f&&!o.__unupdate&&(0,r.emitUpdate)({type:u||"set",target:c,currentTarget:c,name:n,value:s,oldValue:p}),l};exports.setData=s;const i=(e,r)=>{if((0,t.isxdata)(e)){const t=e._owner.indexOf(r);t>-1?e._owner.splice(t,1):console.error({desc:"This data is wrong, the owner has no boarding object at the time of deletion",target:r,mismatch:e})}};exports.clearData=i;const c={set(e,t,r,a){if("symbol"==typeof t)return Reflect.set(e,t,r,a);if(/^_/.test(t))return e.hasOwnProperty(t)?Reflect.set(e,t,r,a):n(e,{[t]:{writable:!0,configurable:!0,value:r}}),!0;try{const n=s({target:e,key:t,value:r,receiver:a});return Reflect.set(e,t,n,a)}catch(o){throw{desc:`failed to set ${t}`,key:t,value:r,target:a,error:o}}},deleteProperty:(e,r)=>(s({target:e,key:r,value:void 0,receiver:e[t.PROXY],type:"delete"}),Reflect.deleteProperty(e,r))};exports.handler=c;
},{"./public.mjs":"jcrR","./main.mjs":"PnwU","./watch.mjs":"aER9"}],"hwXb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./accessor.mjs"),t=require("./main.mjs"),r=require("./public.mjs"),s=require("./watch.mjs");const o=["push","pop","shift","unshift","splice","reverse","sort","fill","copyWithin"],a=Symbol("placeholder");function i(e,t){const r=Array.from(t),s=Array.from(e),o=[],i=new Map,n=e.length;for(let c=0;c<n;c++){const t=e[c],s=r.indexOf(t);s>-1?r[s]=a:o.push(t)}const h=t.length;for(let c=0;c<h;c++){const e=t[c],r=s.indexOf(e);r>-1?s[r]=a:i.set(c,e)}return{deletedItems:o,addedItems:i}}const n={},h=Array.prototype;o.forEach(o=>{h[o]&&(n[o]=function(){const a=Array.from(this);for(var n=arguments.length,c=new Array(n),d=0;d<n;d++)c[d]=arguments[d];const l=h[o].apply(this[t.SELF],c),{deletedItems:u,addedItems:p}=i(a,this);for(let[e,s]of p)(0,t.isxdata)(s)?s._owner.push(this):(0,r.isObject)(s)&&(this.__unupdate=1,this[e]=s,delete this.__unupdate);for(let t of u)(0,e.clearData)(t,this);return(0,s.emitUpdate)({type:"array",currentTarget:this,target:this,args:c,name:o}),l===this[t.SELF]?this[t.PROXY]:l})});var c=n;exports.default=c;
},{"./accessor.mjs":"KVRu","./main.mjs":"PnwU","./public.mjs":"jcrR","./watch.mjs":"aER9"}],"PnwU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.WATCHS=exports.SELF=exports.PROXY=void 0,exports.constructor=d,exports.isxdata=exports.default=void 0;var e=require("./public.mjs"),t=require("./accessor.mjs"),r=s(require("./array.mjs")),o=s(require("./watch.mjs"));function s(e){return e&&e.__esModule?e:{default:e}}const{defineProperties:n,getOwnPropertyDescriptor:i,entries:a}=Object,l=Symbol("self");exports.SELF=l;const c=Symbol("proxy");exports.PROXY=c;const u=Symbol("watchs");function d(r){let o,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.handler,{proxy:a,revoke:d}=Proxy.revocable(this,s);return a._update=1,n(this,{xid:{value:r.xid||(0,e.getRandomId)()},_owner:{configurable:!0,value:[]},owner:{get(){return new Set(this._owner)}},[l]:{configurable:!0,get:()=>this},[c]:{configurable:!0,get:()=>a},[u]:{get:()=>o||(o=new Map)},_hasWatchs:{get:()=>!!o},_revoke:{value:d}}),Object.keys(r).forEach(e=>{const t=i(r,e);let{value:o,get:s,set:l}=t;s||l?n(this,{[e]:t}):a[e]=o}),a}exports.WATCHS=u;class h extends Array{constructor(e){return super(),d.call(this,e)}revoke(){const e=this[l];a(this).forEach(e=>{let[t,r]=e;p(r)&&(this[t]=null)}),e._owner.forEach(e=>{a(e).forEach(t=>{let[r,o]=t;o===this&&(e[r]=null)})}),delete e[l],delete e[c],e._revoke()}toJSON(){let e={},t=!0,r=0;Object.keys(this).forEach(o=>{let s=this[o];/\D/.test(o)?t=!1:(o=parseInt(o))>r&&(r=o),p(s)&&(s=s.toJSON()),e[o]=s}),t&&(e.length=r+1,e=Array.from(e));const o=this.xid;return n(e,{xid:{get:()=>o}}),e}toString(){return JSON.stringify(this.toJSON())}extend(t,r){return(0,e.extend)(this,t,r)}}exports.default=h,h.prototype.extend({...o.default,...r.default},{enumerable:!1});const p=e=>e instanceof h;exports.isxdata=p;
},{"./public.mjs":"jcrR","./accessor.mjs":"KVRu","./array.mjs":"hwXb","./watch.mjs":"aER9"}],"SZYs":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("./main.mjs"));function t(e){if("function"!=typeof WeakMap)return null;var r=new WeakMap,n=new WeakMap;return(t=function(e){return e?n:r})(e)}function r(e,r){if(!r&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=t(r);if(n&&n.has(e))return n.get(e);var a={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var f=o?Object.getOwnPropertyDescriptor(e,u):null;f&&(f.get||f.set)?Object.defineProperty(a,u,f):a[u]=e[u]}return a.default=e,n&&n.set(e,a),a}const n=t=>new e.default(t);Object.assign(n,{is:e.isxdata});var a=n;exports.default=a;
},{"./main.mjs":"PnwU"}],"s7iV":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3];Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=r(require("./base.mjs"));function r(e){return e&&e.__esModule?e:{default:e}}var a=t.default;exports.default=a,void 0!==e&&(e.stanz=t.default);
},{"./base.mjs":"SZYs"}]},{},["s7iV"], "global")
