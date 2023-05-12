// stanz - v8.1.5 https://github.com/kirakiray/stanz  (c) 2018-2023 YAO
!function(){"use strict";const e=()=>Math.random().toString(32).slice(2),t=Object.prototype.toString,r=e=>{const r=(s=e,t.call(s).toLowerCase().replace(/(\[object )|(])/g,""));var s;return"array"===r||"object"===r},s=new Set;function n(t,r=0){let n=null,o=[];return function(...a){o.push(...a),r>0?(clearTimeout(n),n=setTimeout((()=>{t.call(this,o),o=[],n=null}),r)):null===n&&(n=1,function(t){const r=`t-${e()}`;s.add(r),Promise.resolve().then((()=>{s.has(r)&&(t(),s.delete(r))}))}((()=>{t.call(this,o),o=[],n=null})))}}const{assign:o,freeze:a}=Object;class i{constructor(e){o(this,e),a(this)}_getCurrent(e){let{currentTarget:t}=this;if(/\./.test(e)){const r=e.split(".");e=r.pop(),t=t.get(r.join("."))}return{current:t,key:e}}hasModified(e){if("array"===this.type)return this.path.includes(this.currentTarget.get(e));if(/\./.test(e)){const{current:t,key:r}=this._getCurrent(e);return t===this.path.slice(-1)[0]?this.name===r:this.path.includes(t)}return this.path.length?this.path.includes(this.currentTarget[e]):this.name===e}hasReplaced(e){if("set"!==this.type)return!1;if(/\./.test(e)){const{current:t,key:r}=this._getCurrent(e);return t===this.path.slice(-1)[0]&&this.name===r}return!this.path.length&&this.name===e}}class c extends Array{constructor(e){super(...e)}hasModified(e){return this.some((t=>t.hasModified(e)))}hasReplaced(e){return this.some((t=>t.hasReplaced(e)))}}const l=({type:e,currentTarget:t,target:r,name:s,value:n,oldValue:o,args:a,path:c=[]})=>{if(c&&c.includes(t))return void console.warn("Circular references appear");let u={type:e,target:r,name:s,oldValue:o,value:n};if("array"===e&&(delete u.value,u.args=a),t._hasWatchs){const e=new i({currentTarget:t,...u,path:[...c]});t[k].forEach((t=>{t(e)}))}t._update&&t.owner.forEach((e=>{l({currentTarget:e,...u,path:[t,...c]})}))};var u={watch(t){const r="w-"+e();return this[k].set(r,t),r},unwatch(e){return this[k].delete(e)},watchTick(e,t){return this.watch(n((t=>{try{this.xid}catch(e){return}t=t.filter((e=>{try{e.path.forEach((e=>e.xid))}catch(e){return!1}return!0})),e(new c(t))}),t||0))}};const{defineProperties:h}=Object,d=({target:e,key:t,value:s,receiver:n,type:o,succeed:a})=>{let i=s;x(i)?i._owner.push(n):r(s)&&(i=new E(s),i._owner.push(n));const c=n[t],u=c===s;!u&&x(c)&&p(c,n);const h=a(i);return!u&&!e.__unupdate&&l({type:o||"set",target:n,currentTarget:n,name:t,value:s,oldValue:c}),h},p=(e,t)=>{if(x(e)){const r=e._owner.indexOf(t);r>-1?e._owner.splice(r,1):console.error({desc:"This data is wrong, the owner has no boarding object at the time of deletion",target:t,mismatch:e})}},f={set(e,t,r,s){if("symbol"==typeof t)return Reflect.set(e,t,r,s);if(/^_/.test(t))return e.hasOwnProperty(t)?Reflect.set(e,t,r,s):h(e,{[t]:{writable:!0,configurable:!0,value:r}}),!0;try{return d({target:e,key:t,value:r,receiver:s,succeed:r=>Reflect.set(e,t,r,s)})}catch(e){const n=new Error(`failed to set ${t} \n ${e.stack}`);throw Object.assign(n,{key:t,value:r,target:s,error:e}),n}},deleteProperty:(e,t)=>/^_/.test(t)||"symbol"==typeof t?Reflect.deleteProperty(e,t):d({target:e,key:t,value:void 0,receiver:e[O],type:"delete",succeed:()=>Reflect.deleteProperty(e,t)})},g=Symbol("placeholder");const y={},w=Array.prototype;["push","pop","shift","unshift","splice","reverse","sort","fill","copyWithin"].forEach((e=>{w[e]&&(y[e]=function(...t){const s=Array.from(this),n=w[e].apply(this[_],t),{deletedItems:o,addedItems:a}=function(e,t){const r=Array.from(t),s=Array.from(e),n=[],o=new Map,a=e.length;for(let t=0;t<a;t++){const s=e[t],o=r.indexOf(s);o>-1?r[o]=g:n.push(s)}const i=t.length;for(let e=0;e<i;e++){const r=t[e],n=s.indexOf(r);n>-1?s[n]=g:o.set(e,r)}return{deletedItems:n,addedItems:o}}(s,this);for(let[e,t]of a)x(t)?t._owner.push(this):r(t)&&(this.__unupdate=1,this[e]=t,delete this.__unupdate);for(let e of o)p(e,this);return l({type:"array",currentTarget:this,target:this,args:t,name:e,oldValue:s}),n===this[_]?this[O]:n})}));const{defineProperties:b,getOwnPropertyDescriptor:m,entries:v}=Object,_=Symbol("self"),O=Symbol("proxy"),k=Symbol("watchs"),j=Symbol("isxdata"),x=e=>e&&!!e[j];function S(t,r=f){let s,{proxy:n,revoke:o}=Proxy.revocable(this,r);return n._update=1,b(this,{xid:{value:t.xid||e()},_owner:{value:[]},owner:{configurable:!0,get(){return new Set(this._owner)}},[j]:{value:!0},[_]:{configurable:!0,get:()=>this},[O]:{configurable:!0,get:()=>n},[k]:{get:()=>s||(s=new Map)},_hasWatchs:{get:()=>!!s},_revoke:{value:o}}),Object.keys(t).forEach((e=>{const r=m(t,e);let{value:s,get:o,set:a}=r;o||a?b(this,{[e]:r}):n[e]=s})),n}class E extends Array{constructor(e){return super(),S.call(this,e)}revoke(){const e=this[_];e._onrevokes&&(e._onrevokes.forEach((e=>e())),e._onrevokes.length=0),e.__unupdate=1,e[k].clear(),v(this).forEach((([e,t])=>{x(t)&&(this[e]=null)})),e._owner.forEach((e=>{v(e).forEach((([t,r])=>{r===this&&(e[t]=null)}))})),delete e[_],delete e[O],e._revoke()}toJSON(){let e={},t=!0,r=0;Object.keys(this).forEach((s=>{let n=this[s];/\D/.test(s)?t=!1:(s=parseInt(s))>r&&(r=s),x(n)&&(n=n.toJSON()),e[s]=n})),t&&(e.length=r+1,e=Array.from(e));const s=this.xid;return b(e,{xid:{get:()=>s}}),e}toString(){return JSON.stringify(this.toJSON())}extend(e,t){return((e,t,r={})=>(Object.keys(t).forEach((s=>{const n=Object.getOwnPropertyDescriptor(t,s),{configurable:o,enumerable:a,writable:i,get:c,set:l,value:u}=n;"value"in n?e.hasOwnProperty(s)?e[s]=u:Object.defineProperty(e,s,{enumerable:a,configurable:o,writable:i,...r,value:u}):Object.defineProperty(e,s,{enumerable:a,configurable:o,...r,get:c,set:l})})),e))(this,e,t)}get(e){if(/\./.test(e)){const t=e.split(".");let r=this;for(let e=0,s=t.length;e<s;e++)try{r=r[t[e]]}catch(s){const n=new Error(`Failed to get data : ${t.slice(0,e).join(".")} \n${s.stack}`);throw Object.assign(n,{error:s,target:r}),n}return r}return this[e]}}E.prototype.extend({...u,...y},{enumerable:!1});const P=e=>new E(e);Object.assign(P,{is:x}),"undefined"!=typeof window&&(window.stanz=P),"object"==typeof module&&(module.exports=P)}();