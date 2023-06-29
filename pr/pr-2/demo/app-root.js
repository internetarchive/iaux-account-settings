(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=window,le=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),he=new WeakMap;let Se=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(le&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=he.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&he.set(t,e))}return e}toString(){return this.cssText}};const ze=r=>new Se(typeof r=="string"?r:r+"",void 0,de),c=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,o,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[s+1],r[0]);return new Se(t,r,de)},Ne=(r,e)=>{le?r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=j.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,r.appendChild(i)})},pe=le?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ze(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Z;const V=window,ue=V.trustedTypes,je=ue?ue.emptyScript:"",ve=V.reactiveElementPolyfillSupport,ne={toAttribute(r,e){switch(e){case Boolean:r=r?je:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Ce=(r,e)=>e!==r&&(e==e||r==r),W={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:Ce};let T=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=W){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const s=this[e];this[t]=o,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||W}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(pe(o))}else e!==void 0&&t.push(pe(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ne(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=W){var o;const s=this.constructor._$Ep(e,i);if(s!==void 0&&i.reflect===!0){const n=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:ne).toAttribute(t,i.type);this._$El=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,s=o._$Ev.get(e);if(s!==void 0&&this._$El!==s){const n=o.getPropertyOptions(s),h=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:ne;this._$El=s,this[s]=h.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Ce)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,s)=>this[s]=o),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var s;return(s=o.hostUpdate)===null||s===void 0?void 0:s.call(o)}),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};T.finalized=!0,T.elementProperties=new Map,T.elementStyles=[],T.shadowRootOptions={mode:"open"},ve==null||ve({ReactiveElement:T}),((Z=V.reactiveElementVersions)!==null&&Z!==void 0?Z:V.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Y;const G=window,P=G.trustedTypes,fe=P?P.createPolicy("lit-html",{createHTML:r=>r}):void 0,ae="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,Te="?"+A,Ve=`<${Te}>`,C=document,R=()=>C.createComment(""),O=r=>r===null||typeof r!="object"&&typeof r!="function",Le=Array.isArray,Ge=r=>Le(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",K=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,ge=/>/g,E=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,ye=/"/g,Ie=/^(?:script|style|textarea|title)$/i,Pe=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),v=Pe(1),De=Pe(2),D=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),we=new WeakMap,S=C.createTreeWalker(C,129,null,!1),qe=(r,e)=>{const t=r.length-1,i=[];let o,s=e===2?"<svg>":"",n=F;for(let l=0;l<t;l++){const d=r[l];let w,p,m=-1,$=0;for(;$<d.length&&(n.lastIndex=$,p=n.exec(d),p!==null);)$=n.lastIndex,n===F?p[1]==="!--"?n=me:p[1]!==void 0?n=ge:p[2]!==void 0?(Ie.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=E):p[3]!==void 0&&(n=E):n===E?p[0]===">"?(n=o??F,m=-1):p[1]===void 0?m=-2:(m=n.lastIndex-p[2].length,w=p[1],n=p[3]===void 0?E:p[3]==='"'?ye:be):n===ye||n===be?n=E:n===me||n===ge?n=F:(n=E,o=void 0);const z=n===E&&r[l+1].startsWith("/>")?" ":"";s+=n===F?d+Ve:m>=0?(i.push(w),d.slice(0,m)+ae+d.slice(m)+A+z):d+A+(m===-2?(i.push(void 0),l):z)}const h=s+(r[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return[fe!==void 0?fe.createHTML(h):h,i]};class U{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,n=0;const h=e.length-1,l=this.parts,[d,w]=qe(e,t);if(this.el=U.createElement(d,i),S.currentNode=this.el.content,t===2){const p=this.el.content,m=p.firstChild;m.remove(),p.append(...m.childNodes)}for(;(o=S.nextNode())!==null&&l.length<h;){if(o.nodeType===1){if(o.hasAttributes()){const p=[];for(const m of o.getAttributeNames())if(m.endsWith(ae)||m.startsWith(A)){const $=w[n++];if(p.push(m),$!==void 0){const z=o.getAttribute($.toLowerCase()+ae).split(A),N=/([.?@])?(.*)/.exec($);l.push({type:1,index:s,name:N[2],strings:z,ctor:N[1]==="."?We:N[1]==="?"?Ke:N[1]==="@"?Je:q})}else l.push({type:6,index:s})}for(const m of p)o.removeAttribute(m)}if(Ie.test(o.tagName)){const p=o.textContent.split(A),m=p.length-1;if(m>0){o.textContent=P?P.emptyScript:"";for(let $=0;$<m;$++)o.append(p[$],R()),S.nextNode(),l.push({type:2,index:++s});o.append(p[m],R())}}}else if(o.nodeType===8)if(o.data===Te)l.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(A,p+1))!==-1;)l.push({type:7,index:s}),p+=A.length-1}s++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function B(r,e,t=r,i){var o,s,n,h;if(e===D)return e;let l=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const d=O(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==d&&((s=l==null?void 0:l._$AO)===null||s===void 0||s.call(l,!1),d===void 0?l=void 0:(l=new d(r),l._$AT(r,t,i)),i!==void 0?((n=(h=t)._$Co)!==null&&n!==void 0?n:h._$Co=[])[i]=l:t._$Cl=l),l!==void 0&&(e=B(r,l._$AS(r,e.values),l,i)),e}class Ze{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,s=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:C).importNode(i,!0);S.currentNode=s;let n=S.nextNode(),h=0,l=0,d=o[0];for(;d!==void 0;){if(h===d.index){let w;d.type===2?w=new H(n,n.nextSibling,this,e):d.type===1?w=new d.ctor(n,d.name,d.strings,this,e):d.type===6&&(w=new Qe(n,this,e)),this._$AV.push(w),d=o[++l]}h!==(d==null?void 0:d.index)&&(n=S.nextNode(),h++)}return S.currentNode=C,s}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class H{constructor(e,t,i,o){var s;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(s=o==null?void 0:o.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),O(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==D&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Ge(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==u&&O(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=U.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.v(i);else{const n=new Ze(s,this),h=n.u(this.options);n.v(i),this.$(h),this._$AH=n}}_$AC(e){let t=we.get(e.strings);return t===void 0&&we.set(e.strings,t=new U(e)),t}T(e){Le(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new H(this.k(R()),this.k(R()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class q{constructor(e,t,i,o,s){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const s=this.strings;let n=!1;if(s===void 0)e=B(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==D,n&&(this._$AH=e);else{const h=e;let l,d;for(e=s[0],l=0;l<s.length-1;l++)d=B(this,h[i+l],t,l),d===D&&(d=this._$AH[l]),n||(n=!O(d)||d!==this._$AH[l]),d===u?e=u:e!==u&&(e+=(d??"")+s[l+1]),this._$AH[l]=d}n&&!o&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class We extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}const Ye=P?P.emptyScript:"";class Ke extends q{constructor(){super(...arguments),this.type=4}j(e){e&&e!==u?this.element.setAttribute(this.name,Ye):this.element.removeAttribute(this.name)}}class Je extends q{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){var i;if((e=(i=B(this,e,t,0))!==null&&i!==void 0?i:u)===D)return;const o=this._$AH,s=e===u&&o!==u||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==u&&(o===u||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Qe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const $e=G.litHtmlPolyfillSupport;$e==null||$e(U,H),((Y=G.litHtmlVersions)!==null&&Y!==void 0?Y:G.litHtmlVersions=[]).push("2.7.4");const Be=(r,e,t)=>{var i,o;const s=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let n=s._$litPart$;if(n===void 0){const h=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;s._$litPart$=n=new H(e.insertBefore(R(),h),h,void 0,t??{})}return n._$AI(r),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var J,Q;class x extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Be(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return D}}x.finalized=!0,x._$litElement$=!0,(J=globalThis.litElementHydrateSupport)===null||J===void 0||J.call(globalThis,{LitElement:x});const ke=globalThis.litElementPolyfillSupport;ke==null||ke({LitElement:x});((Q=globalThis.litElementVersions)!==null&&Q!==void 0?Q:globalThis.litElementVersions=[]).push("3.3.2");function a(r,e,t,i){var o=arguments.length,s=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(r,e,t,i);else for(var h=r.length-1;h>=0;h--)(n=r[h])&&(s=(o<3?n(s):o>3?n(e,t,s):n(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ce=r=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(r,e):((t,i)=>{const{kind:o,elements:s}=i;return{kind:o,elements:s,finisher(n){customElements.define(t,n)}}})(r,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=(r,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,r)}};function b(r){return(e,t)=>t!==void 0?((i,o,s)=>{o.constructor.createProperty(s,i)})(r,e,t):Xe(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(r){return b({...r,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const et=({finisher:r,descriptor:e})=>(t,i)=>{var o;if(i===void 0){const s=(o=t.originalKey)!==null&&o!==void 0?o:t.key,n=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(t.key)}:{...t,key:s};return r!=null&&(n.finisher=function(h){r(h,s)}),n}{const s=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),r==null||r(s,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(r,e){return et({descriptor:t=>{const i={get(){var o,s;return(s=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(r))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){const o=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var s,n;return this[o]===void 0&&(this[o]=(n=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(r))!==null&&n!==void 0?n:null),this[o]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var X;((X=window.HTMLSlotElement)===null||X===void 0?void 0:X.prototype.assignedElements)!=null;const L=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)?console.log.bind(console):()=>{};async function M(r){var e;const t={action:null,identifier:"",userData:{},selectedMailingLists:[],csrfToken:"",baseHost:"/account/index.php",headers:{},...r};L(t);let i=t.baseHost,o={},s=new FormData;s.append("action",t.action),s.append("identifier",t.identifier),s.append("csrf-token",t.csrfToken),t.action==="email-available"?s.append("email",t.email):t.action==="screenname-available"?s.append("screenname",t.screenname):t.action==="verify-password"?s.append("password",t.password):t.action==="delete-account"?s.append("delete-confirm",t.confirmDelete):t.action==="save-account"&&(s.append("userdata",JSON.stringify(t.userData)),s.append("selected-mailing-lists",t.selectedMailingLists),s.append("loan-history-flag",t.loanHistoryFlag)),((e=window==null?void 0:window.location)===null||e===void 0?void 0:e.pathname)==="/demo/"&&(i="/demo/");try{await fetch(i,{mode:"no-cors",method:"POST",headers:t.headers,body:s}).then(n=>(L("response - ",n),i==="/demo/"?t.userData.screenname==="neeraj-archive"&&t.action==="email-available"?{success:!1,error:"Invalid CSRF token, please refresh the page and try again later."}:{success:!0,fields:{screenname:"Your screen name has been updated successfully.",mailing_lists:"Mailing lists has been updated!"}}:n.json())).then(n=>{o=n})}catch{}return o}async function Fe(r,e){const t=e;(t==null?void 0:t.type)==="password"?t.type="text":t.type="password"}function Me(r){r==null||r.preventDefault(),r==null||r.stopPropagation()}function _e(r){var e;return(e=r==null?void 0:r.replace("/s+/"," "))===null||e===void 0?void 0:e.trim()}function tt(r,e){let t=!1;return()=>{t||(r(),t=!0,setTimeout(()=>{t=!1},e))}}const Re=c`
  .settings-template {
    display: flex;
    flex-wrap: wrap;
  }
  .container {
    display: grid;
    justify-content: center;
    flex-direction: column;
  }

  .ia-button.primary {
    display: inline;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .header h2 {
    margin-block: 0;
    margin-right: 10px;
  }
  button {
    user-select: none;
  }
  a,
  a:hover,
  a:focus {
    color: #4b64ff;
  }
  button,
  input[type='submit'],
  .delete-button {
    margin-right: 5px;
    background: #000;
  }

  button:disabled {
    opacity: 0.5;
    cursor: auto;
  }

  .select-message {
    line-height: 18px;
  }
  input[type='text'],
  input[type='email'],
  input[type='password'] {
    display: inline-block;
    width: 75%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    -webkit-transition: border-color ease-in-out 0.15s,
      box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  .newsletter p {
    margin-top: 0;
  }
  .form-element {
    margin-bottom: 15px;
  }
  .form-element.header {
    margin-bottom: 0;
  }
  .form-element label:first-child {
    display: block;
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 8px;
    width: fit-content;
  }
  .form-element label {
    font-weight: normal;
  }
  .form-element label small {
    font-weight: normal;
  }
  input[type='checkbox'],
  input[type='radio'] {
    vertical-align: middle;
    margin-left: 0px;
  }

  .admin-functions ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  .admin-functions ul li {
    padding: 5px 0;
  }

  .delete-link {
    margin-top: 10px;
    border: none;
    background: rgb(255, 255, 255);
    cursor: pointer;
    padding-left: 0px;
    color: #bb0505;
  }
  .delete-link:hover {
    text-decoration: underline;
  }

  .data-updated {
    display: grid;
    background: rgb(238, 253, 238);
    margin-right: 20px;
    margin: 1.5rem 0;
    width: fit-content;
  }

  .data-updated.success {
    border-left: 5px solid green;
  }

  .data-updated.error {
    border-left: 5px solid red;
  }

  .error-field {
    color: #bb0505;
    margin: 3px 0px;
    font-size: 1.2rem;
    display: block;
  }

  .success-field {
    color: #219518;
    font-size: 1.4rem;
    padding: 10px;
    cursor: pointer;
    display: block;
  }

  .success-field .close {
    float: right;
    padding: 2px 6px;
  }
  .success-field .close:hover {
    background: #b9c9b9;
    cursor: pointer;
  }

  .data-updated .error-field {
    font-size: 1.4rem;
    padding: 10px;
    cursor: pointer;
    display: block;
  }

  .data-updated error-field .close {
    float: right;
    padding: 2px 6px;
  }
  .data-updated .error-field .close:hover {
    background: #b9c9b9;
    cursor: pointer;
  }

  iaux-pic-uploader label {
    display: block;
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 5px;
  }

  ia-activity-indicator {
    display: inline-block;
    width: 20px;
    height: 20px;
    color: white;
    vertical-align: middle;
    --activityIndicatorLoadingRingColor: #fff;
    --activityIndicatorLoadingDotColor: #fff;
  }

  .pointer-none {
    opacity: 0.8;
    pointer-events: none;
    z-index: 1;
  }

  .delete-section {
    border: 2px solid #f18286;
    padding: 10px;
    margin-left: -10px;
    background: #fee;
  }

  .delete-section a {
    font-weight: normal;
    display: inherit;
    width: fit-content;
  }

  .hide {
    display: none;
  }

  .password-icon {
    vertical-align: middle;
    padding: 7px 4px;
    cursor: pointer;
    border-radius: 0px 5px 5px 0px;
    border: 0;
  }

  .password-icon {
    background: #fff;
    vertical-align: middle;
    padding: 7px 4px;
    cursor: pointer;
    border: 0px;
  }

  .password-icon svg {
    margin-top: 2px;
  }
`,Ae=c`var(--white, #fff)`,it=c`var(--primaryDisableCTAFill, #767676)`,ot=c`var(--secondaryCTABorder, #999)`,st=c`var(--primaryCTAFill, #194880)`,ee=c`var(--primaryCTAFillRGB, 25, 72, 128)`,rt=c`var(--primaryCTABorder, #c5d1df)`,nt=c`var(--primaryErrorCTAFill, #d9534f)`,te=c`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,at=c`var(--primaryErrorCTABorder, #d43f3a)`,lt=c`var(--secondaryCTAFill, #333)`,ie=c`var(--secondaryCTAFillRGB, 51, 51, 51)`,dt=c`var(--primaryCTABorder, #979797)`,ct=c`#ee8950`,ht=c`#ec7939`,Oe=c`
  .ia-button {
    height: 3.5rem;
    min-height: 3rem;
    cursor: pointer;
    color: ${Ae};
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 1rem;
    outline-color: ${Ae};
    outline-offset: -4px;
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: ${it};
    border: 1px solid ${ot};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${ct}
    border-color: ${ht};
  }

  .ia-button.primary {
    background-color: ${st};
    border-color: ${rt};
  }
  .ia-button.primary:hover {
    background-color: rgba(${ee}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${ee}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${ee}, 0.7);
  }

  .ia-button.danger {
    background-color: ${nt};
    border-color: ${at};
  }
  .ia-button.danger:hover {
    background-color: rgba(${te}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${te}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${te}, 0.7);
  }

  .ia-button.dark {
    background-color: ${lt};
    border-color: ${dt};
  }
  .ia-button.dark:hover {
    background-color: rgba(${ie}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${ie}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${ie}, 0.7);
  }
`,pt=Object.freeze({processing:"processing",complete:"complete"});class ut extends x{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=pt.processing}render(){return v`
      <div class="${this.mode}">
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-labelledby="indicatorTitle indicatorDescription"
        >
          <title id="indicatorTitle">Activity Indicator</title>
          <desc id="indicatorDescription">
            A rotating activity indicator with three dots in the middle.
          </desc>
          <g
            id="icons/check-ring---squared"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              id="completed-ring"
              class="loaded-indicator"
              d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <polygon
              id="check"
              class="loaded-indicator"
              transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
              points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
            ></polygon>
            <path
              id="activity-ring"
              class="activity-indicator"
              d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <g
              id="activity-dots"
              class="activity-indicator"
              transform="translate(40.000000, 55.000000)"
            >
              <circle id="left-dot" cx="5" cy="5" r="5"></circle>
              <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
              <circle id="right-dot" cx="35" cy="5" r="5"></circle>
            </g>
          </g>
        </svg>
      </div>
    `}static get styles(){const e=c`var(--activityIndicatorCheckmarkColor, #31A481)`,t=c`var(--activityIndicatorCompletedRingColor, #31A481)`,i=c`var(--activityIndicatorLoadingRingColor, #333333)`,o=c`var(--activityIndicatorLoadingDotColor, #333333)`;return c`
      #completed-ring {
        fill: ${t};
      }

      #check {
        fill: ${e};
      }

      #activity-ring {
        fill: ${i};
      }

      #activity-dots {
        fill: ${o};
      }

      .activity-indicator {
        opacity: 0;
        transition: opacity 0.25s ease-out;
      }

      .processing .activity-indicator {
        opacity: 1;
      }

      .loaded-indicator {
        opacity: 1;
        transition: opacity 0.25s ease-out;
      }

      .processing .loaded-indicator {
        opacity: 0;
      }

      .image {
        border: 1px solid red;
        display: inline-block;
      }

      .processing #activity-ring {
        animation: rotate 1.3s infinite linear;
        transform-origin: 50px 50px;
        transform-box: fill-box;
      }

      .processing #left-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.2s;
      }

      .processing #middle-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.4s;
      }

      .processing #right-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.6s;
      }

      @keyframes rotate {
        0% {
          transform: rotate(-360deg);
        }
        100% {
          /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
          transform: rotate(0deg);
        }
      }

      @keyframes dot {
        0% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `}}window.customElements.define("ia-activity-indicator",ut);const xe=c`var(--white, #fff)`,vt=c`var(--primaryDisableCTAFill, #767676)`,ft=c`var(--secondaryCTABorder, #999)`,mt=c`var(--primaryCTAFill, #194880)`,oe=c`var(--primaryCTAFillRGB, 25, 72, 128)`,gt=c`var(--primaryCTABorder, #c5d1df)`,bt=c`var(--primaryErrorCTAFill, #d9534f)`,se=c`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,yt=c`var(--primaryErrorCTABorder, #d43f3a)`,wt=c`var(--secondaryCTAFill, #333)`,re=c`var(--secondaryCTAFillRGB, 51, 51, 51)`,$t=c`var(--primaryCTABorder, #979797)`,kt=c`#ee8950`,_t=c`#ec7939`,At=c`
  .ia-button {
    height: 3.5rem;
    min-height: 3rem;
    cursor: pointer;
    color: ${xe};
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 3rem;
    outline-color: ${xe};
    outline-offset: -4px;
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    background-color: ${vt};
    border: 1px solid ${ft};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${kt}
    border-color: ${_t};
  }

  .ia-button.primary {
    background-color: ${mt};
    border-color: ${gt};
  }
  .ia-button.primary:hover {
    background-color: rgba(${oe}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${oe}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${oe}, 0.7);
  }

  .ia-button.danger {
    background-color: ${bt};
    border-color: ${yt};
  }
  .ia-button.danger:hover {
    background-color: rgba(${se}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${se}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${se}, 0.7);
  }

  .ia-button.dark {
    background-color: ${wt};
    border-color: ${$t};
  }
  .ia-button.dark:hover {
    background-color: rgba(${re}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${re}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${re}, 0.7);
  }
`,I=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)?console.log.bind(console):()=>{};async function Ee(r){var e;const t={action:null,identifier:"",file:null,getParam:"",endpoint:"",headers:{},callback(){},...r};let i={},o="";const s=window==null?void 0:window.location;(s==null?void 0:s.pathname)==="/demo/"?o="/demo/":o=`${t.endpoint}?${t.getParam}`;try{await fetch(o,{mode:"no-cors",method:"POST",headers:t.headers,body:(e=t.file)!==null&&e!==void 0?e:null}).then(n=>{if(I("response",n),o==="/demo/"&&t.action==="verify-upload")return{success:!0,item_last_updated:1};if(t.action==="save-file"&&n.status===200)return t.callback(n),{};if(n)return n.json()}).then(n=>{I("data",n),t.action==="save-file"&&I("file saved, metadata call started to verify is picture is upadated!"),i=n})}catch(n){I(n)}return i}let g=class extends x{constructor(){super(...arguments),this.identifier="",this.endpoint="/services/post-file.php",this.picture="",this.type="compact",this.lookingAtMyAccount=!1,this.maxFileSizeInMB=8,this.validFileTypes=["image/jpeg","image/png","image/gif"],this.taskStatus="",this.fileValidationError="",this.showDropper=!1,this.fileTypeMessage="Image file must be a JPEG, PNG, or GIF.",this.fileSizeMessage=""}firstUpdated(){this.fileSizeMessage=`Image file must be less than ${this.maxFileSizeInMB}MB.`,this.renderInput(),this.lookingAtMyAccount&&this.bindEvents()}renderInput(){var e,t,i;const o=document.createElement("input");o.type="file",o.accept="image/*",o.multiple=!1,(e=this.profileSection)===null||e===void 0||e.addEventListener("mouseenter",()=>{var s;(s=this.profileSection)===null||s===void 0||s.classList.add("hover-class")}),(t=this.dropRegion)===null||t===void 0||t.addEventListener("click",()=>{o.click()}),(i=this.uploadRegion)===null||i===void 0||i.addEventListener("click",()=>{o.click()}),o.addEventListener("change",()=>{const{files:s}=o;this.handleSelectedFiles(s)})}bindEvents(){var e,t,i,o,s,n,h;window.addEventListener("dragover",l=>{var d,w;(d=this.selfSubmitEle)===null||d===void 0||d.classList.remove("hidden"),(w=this.selfSubmitEle)===null||w===void 0||w.classList.add("drag-over"),this.preventDefault(l)},!1),(e=this.dropRegion)===null||e===void 0||e.addEventListener("dragenter",this.preventDefault,!1),(t=this.dropRegion)===null||t===void 0||t.addEventListener("dragleave",this.preventDefault,!1),(i=this.dropRegion)===null||i===void 0||i.addEventListener("dragover",this.preventDefault,!1),(o=this.dropRegion)===null||o===void 0||o.addEventListener("drop",this.handleDropImage.bind(this),!1),(s=this.selfSubmitEle)===null||s===void 0||s.addEventListener("drop",this.handleDropImage.bind(this),!1),(n=this.saveFile)===null||n===void 0||n.addEventListener("submit",this.handleSaveFile.bind(this),!1),(h=this.fileSelector)===null||h===void 0||h.addEventListener("change",()=>{const{files:l}=this.fileSelector;this.handleSelectedFiles(l)}),document==null||document.addEventListener("saveProfileAvatar",l=>{var d;!((d=this.fileSelector)===null||d===void 0)&&d.files.length&&this.handleSaveFile(l)})}preventDefault(e){e.preventDefault(),e.stopPropagation()}handleDropImage(e){var t,i;if(this.preventDefault(e),(t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("drag-over"),!this.showLoadingIndicator){const o=(i=e==null?void 0:e.dataTransfer)===null||i===void 0?void 0:i.files;o!=null&&o.length&&this.handleSelectedFiles(o)}}previewImage(e){var t,i;this.showDropper=!0;let o;this.type==="full"?o=document.createElement("img"):o=(t=this.dropRegion)===null||t===void 0?void 0:t.querySelector("img"),o.alt="profile picture";const s=new FileReader;if(s.onload=n=>{var h;o.src=(h=n.target)===null||h===void 0?void 0:h.result},this.type==="full"){const n=(i=this.selfSubmitEle)===null||i===void 0?void 0:i.querySelector(".full-preview");n==null||n.appendChild(o)}s.readAsDataURL(e)}validateImage(e){this.fileValidationError="";const t=this.validFileTypes,i=this.maxFileSizeInMB*1024*1024;return t.indexOf(e.type)===-1?(this.fileValidationError=this.fileTypeMessage,!1):e.size>i?(this.fileValidationError=this.fileSizeMessage,!1):!0}async handleSelectedFiles(e){var t,i;const o=(t=this.selfSubmitEle)===null||t===void 0?void 0:t.querySelector(".image-preview");if(this.type==="full"&&((i=this.selfSubmitEle)===null||i===void 0||i.classList.remove("hidden")),e.length&&this.validateImage(e[0])){if(this.dispatchEvent(new Event("fileChanged")),this.type==="full")for(;o!=null&&o.firstChild&&o.removeChild(o.firstChild););await this.previewImage(e[0]),this.fileSelector&&(this.fileSelector.files=e)}else for(e.length||this.cancelFile();o!=null&&o.firstChild&&o.removeChild(o.firstChild););}async handleSaveFile(e){var t,i;this.preventDefault(e),this.showLoadingIndicator=!0,(t=this.selfSubmitEle)===null||t===void 0||t.classList.add("vertical-center"),this.taskStatus="waiting for your tasks to queue";const o=(i=this.fileSelector)===null||i===void 0?void 0:i.files[0],s=`identifier=${this.identifier}&fname=${encodeURIComponent(o.name)}&submit=1`;await Ee({action:"save-file",identifier:this.identifier,file:o,getParam:s,endpoint:this.endpoint,headers:{"Content-type":"multipart/form-data; charset=UTF-8"},callback:async()=>{I("callback invoked!",this.type),this.type==="full"&&await this.metadataAPIExecution()}}),this.dispatchEvent(new Event("fileUploaded")),this.type==="compact"&&(this.showLoadingIndicator=!1),this.fileSelector&&(this.fileSelector.value="")}metadataAPIExecution(){const e=Math.round(Date.now()/1e3),t=setInterval(async()=>{Ee({action:"verify-upload",endpoint:`/metadata/${this.identifier}?rand=${Math.random()}`}).then(o=>{const s=o.pending_tasks&&o.tasks?o.tasks.length:0;s?o.tasks.filter(h=>h.wait_admin===2).length?(this.taskStatus="status task failure -- an admin will need to resolve",clearInterval(t)):this.taskStatus=`waiting for your ${s} tasks to finish`:o.item_last_updated<e?this.taskStatus="waiting for your tasks to queue":(I("task(s) done!"),clearInterval(t),this.taskStatus="reloading page with your image",window.location.reload())})},2e3)}cancelFile(){var e,t,i;const o=(e=this.selfSubmitEle)===null||e===void 0?void 0:e.querySelector(".image-preview");for(this.fileSelector&&(this.fileSelector.value=""),this.showDropper=!1,this.showLoadingIndicator=!1,this.fileValidationError="",(t=this.selfSubmitEle)===null||t===void 0||t.classList.add("hidden"),(i=this.profileSection)===null||i===void 0||i.classList.remove("hover-class");o!=null&&o.firstChild&&o.removeChild(o.firstChild););}get loadingIndicatorTemplate(){return v` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`}get plusIconTemplate(){return v`<div
      class="plus-icon ${this.showLoadingIndicator?"pointer-none":""}"
      @keyup=""
      @click=${()=>{var e;(e=this.dropRegion)===null||e===void 0||e.click()}}
    >
      <span>&#43;</span>
    </div>`}get selfSubmitFormTemplate(){const e=encodeURIComponent(`${this.endpoint}?identifier=${this.identifier}&submit=1`);return v`
      <div
        class="self-submit-form hidden
      "
      >
        <button
          class="close-button ia-button 
          ${!this.showDropper&&this.fileValidationError===""||this.showLoadingIndicator?"hidden":""}
          ${this.showLoadingIndicator?"pointer-none":""}"
          @click=${()=>{this.cancelFile()}}
        >
          &#10060;
        </button>
        ${this.showLoadingIndicator?this.loadingIndicatorTemplate:this.plusIconTemplate}
        <span
          class="drag-text ${this.showLoadingIndicator?"pointer-none":""}"
          @keyup=""
          @click=${()=>{var t;(t=this.dropRegion)===null||t===void 0||t.click()}}
          >${this.taskStatus?this.taskStatus:"Drag & Drop an image file here or"}</span
        >
        <button
          id="file-picker"
          @click=${()=>{var t;(t=this.dropRegion)===null||t===void 0||t.click()}}
          class="ia-button primary ${this.showLoadingIndicator?"pointer-none hidden":""}"
        >
          Pick image to upload
        </button>
        <span class="error">${this.fileValidationError}</span>
        <form
          method="post"
          id="save-file"
          enctype="multipart/form-data"
          action="${e}"
        >
          <input
            class="file-selector"
            name="file"
            type="file"
            accept="image/*"
            style="display: none;"
          />
          <input type="hidden" name="identifier" .value="${this.identifier}" />
          <button
            id="file-submit"
            type="submit"
            name="submit"
            value="SUBMIT"
            class="ia-button
            ${!this.showDropper||this.fileValidationError!==""?"hidden":""}
            ${this.fileValidationError||this.showLoadingIndicator?"pointer-none hidden":""}"
          >
            ${this.showLoadingIndicator?this.loadingIndicatorTemplate:"Submit"}
          </button>
        </form>
        <div
          class="image-preview full-preview 
          ${this.showLoadingIndicator?"pointer-none hidden":""}"
          @keyup=""
          @click=${()=>{var t;(t=this.dropRegion)===null||t===void 0||t.click()}}
        ></div>
      </div>
    `}get selectFileTemplate(){return v`
      <div class="select-region">
        <input
          class="file-selector"
          name="file"
          type="file"
          accept="image/*"
          style="display: none;"
        />
        <div class="select-message">
          Drop a new image onto<br />your picture here or<br />
          <a
            href="#"
            id="upload-region"
            class="${this.showLoadingIndicator?"pointer-none":""}"
            >select an image to upload</a
          >
        </div>
      </div>
      <span class="error">${this.fileValidationError}</span>
    `}get overlayIcon(){return v`
      <div
        class="overlay-icon ${this.showLoadingIndicator?"show-overlay pointer-none":""}"
        @keyup=""
        @click=${()=>{var e;(e=this.dropRegion)===null||e===void 0||e.click()}}
      >
        ${this.showLoadingIndicator?this.loadingIndicatorTemplate:"+"}
      </div>
    `}render(){return v`
      <div
        class="profile-section hover-class 
        ${this.lookingAtMyAccount?"":"pointer-none"}
        ${this.type==="full"?"adjust-full":""}
      "
      >
        ${this.type==="compact"?this.overlayIcon:u}
        <div
          id="drop-region"
          class="image-preview 
            ${this.type==="full"?"full-preview":""}
            ${this.showLoadingIndicator?"pointer-none":""}"
        >
          <img alt="user profile" src="${this.picture}" />
        </div>
        ${this.type==="full"?this.selfSubmitFormTemplate:u}
      </div>
      ${this.type==="compact"?this.selectFileTemplate:u}
    `}static get styles(){return c`
      ${At}

      :host {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }

      :host *:focus,
      :host *:focus-visible {
        outline: none;
      }

      a,
      a:hover,
      a:focus {
        color: #4b64ff;
      }

      .profile-section,
      .select-region {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
        position: relative;
        font-size: 1.4rem;
      }

      .profile-section {
        border-radius: 100%;
        width: fit-content;
        line-height: normal;
        height: fit-content;
      }

      .adjust-full {
        text-align: left;
        width: fit-content;
      }

      .profile-section > .full-preview img {
        max-height: 100px;
        max-width: 200px;
      }

      .profile-section:hover .overlay-icon {
        display: block;
        z-index: 1;
      }

      .show-overlay {
        display: block !important;
        z-index: 1;
        background: none !important;
      }

      .show-overlay + .image-preview img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
        opacity: 0.2;
      }

      .hover-class:hover .self-submit-form {
        display: block;
      }

      .image-preview {
        border-radius: 100%;
      }

      .image-preview img {
        height: 120px;
        width: 120px;
        max-height: 120px;
        max-width: 120px;
        background-size: cover;
        border-radius: 50%;
        box-shadow: rgb(0 0 0 / 5%) 0px 0px 35px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        position: relative;
        overflow: hidden;
      }

      .overlay-icon:hover + .image-preview img,
      .image-preview:hover img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
        opacity: 0.5;
      }

      .overlay-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 100%;
        transform: translate(-50%, -50%);
        background: white;
        text-align: center;
        color: rgb(158 150 150);
        cursor: pointer;
        font-size: 2rem;
        font-weight: bold;
        display: none;
        padding: 5px;
        min-width: 16px;
        line-height: 1.5rem;
      }

      .full-preview img {
        cursor: default;
        width: auto;
        height: 100%;
        border-radius: 0% !important;
      }

      .vertical-center {
        top: 10px !important;
      }

      .self-submit-form {
        box-sizing: border-box;
        background: white;
        border: 3px solid #ccc;
        border-radius: 10px;
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 200px;
        padding: 11px;
        text-align: center;
        justify-content: center;
        z-index: 2;
        justify-items: center;
      }

      .self-submit-form .full-preview img {
        height: auto;
      }

      .close-button {
        position: absolute;
        right: 10px;
        padding: 5px;
        border: none;
        font-size: 1rem;
        background: white;
      }

      .self-submit-form.drag-over {
        border: 3px dashed #ccc;
      }

      .self-submit-form .drag-text {
        font-weight: bold;
        font-size: 1.2rem;
        cursor: default;
        color: #000;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .plus-icon {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }

      .plus-icon span {
        cursor: default;
        height: 40px;
        width: 40px;
        color: #fff;
        background-size: cover;
        background-color: #aaa;
        border-radius: 50%;
        font-size: 4rem;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .hidden {
        display: none;
      }

      .pointer-none {
        pointer-events: none;
      }

      #file-picker {
        margin: 2px auto;
        padding: 0 1rem;
      }

      #file-submit {
        padding: 0 1rem;
        margin: 4px auto;
        background-color: #5cb85c;
        justify-content: center;
        width: 8rem;
        border-color: #4cae4c;
      }

      #file-submit:hover {
        background-color: #47a447;
        border-color: #398439;
      }

      .error {
        margin: 3px 0px;
        font-size: 1.2rem;
        color: #bb0505;
        overflow: hidden;
        word-wrap: unset;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .self-submit-form ia-activity-indicator {
        display: inline-block;
        width: 20px;
        color: white;
        margin-top: 2px;
        --activityIndicatorLoadingRingColor: #000;
        --activityIndicatorLoadingDotColor: #000;
      }

      .show-overlay ia-activity-indicator {
        display: inline-block;
        width: 25px;
        color: white;
        margin-top: 2px;
        --activityIndicatorLoadingRingColor: #000;
        --activityIndicatorLoadingDotColor: #000;
      }
    `}};a([b({type:String})],g.prototype,"identifier",void 0);a([b({type:String})],g.prototype,"endpoint",void 0);a([b({type:String})],g.prototype,"picture",void 0);a([b({type:String})],g.prototype,"type",void 0);a([b({type:Boolean})],g.prototype,"lookingAtMyAccount",void 0);a([b({type:Number})],g.prototype,"maxFileSizeInMB",void 0);a([b({type:Number})],g.prototype,"validFileTypes",void 0);a([y()],g.prototype,"showLoadingIndicator",void 0);a([y()],g.prototype,"taskStatus",void 0);a([y()],g.prototype,"fileValidationError",void 0);a([y()],g.prototype,"showDropper",void 0);a([_("#drop-region")],g.prototype,"dropRegion",void 0);a([_("#upload-region")],g.prototype,"uploadRegion",void 0);a([_(".profile-section")],g.prototype,"profileSection",void 0);a([_("#save-file")],g.prototype,"saveFile",void 0);a([_(".self-submit-form")],g.prototype,"selfSubmitEle",void 0);a([_(".file-selector")],g.prototype,"fileSelector",void 0);g=a([ce("ia-pic-uploader")],g);const Ue=De`
  <svg
    height="16"
    viewBox="0 0 22 16"
    width="22"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fill-rule="evenodd">
      <g stroke="#333" stroke-width="1.5" transform="translate(1 2)">
        <path 
          d="m0 6c4.44444444-4 7.77777778-6 10-6 2.2222222 0 5.5555556 2 10 6-4.4444444 4-7.7777778 6-10 6-2.22222222 0-5.55555556-2-10-6z" stroke-linejoin="round"/>
        <circle cx="10" cy="6" r="5"/>
      </g>
      <circle cx="11" cy="8" fill="#333" r="2"/>
      <path d="m4.5 1.5 13.5 13.5" stroke="#333" stroke-linecap="round" stroke-width="2"/>
    </g>
  </svg>`,He=De`
  <svg 
    height="16" 
    viewBox="0 0 22 16" 
    width="22" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fill-rule="evenodd">
      <g stroke="#333" stroke-width="1.5" transform="translate(1 2)">
        <path 
          d="m0 6c4.44444444-4 7.77777778-6 10-6 2.2222222 0 5.5555556 2 10 6-4.4444444 4-7.7777778 6-10 6-2.22222222 0-5.55555556-2-10-6z" 
          stroke-linejoin="round"
        />
        <circle cx="10" cy="6" r="5"/>
      </g>
      <circle cx="11" cy="8" fill="#333" r="2"/>
    </g>
  </svg>`;let k=class extends x{constructor(){super(...arguments),this.authenticationType="ia",this.identifier="",this.email="",this.csrfToken="",this.showPassword=!1,this.password="",this.passwordError=""}async verifyIAPassword(e){var t,i;if(Me(e),!this.password){(t=this.passwordField)===null||t===void 0||t.focus(),this.passwordError=" * password can't be empty";return}this.showLoadingIndicator=!0;const o=await M({action:"verify-password",identifier:this.identifier,password:this.password,csrfToken:this.csrfToken});o.success===!0?this.dispatchEvent(new Event("ia-authenticated")):((i=this.passwordField)===null||i===void 0||i.focus(),this.passwordError=o.error),this.showLoadingIndicator=!1}setPassword(e){const t=e.target;this.password=t.value,this.passwordError=""}get iaPasswordVerification(){return v`
      <p>Please verify your password again to change protected settings.</p>
      <div class="form-element">
        <label for="password">Internet Archive password</label>
        <input
          type="password"
          class="form-control password"
          id="password"
          name="password"
          required
          @input=${this.setPassword}
        />
        <button
          type="button"
          class="password-icon"
          @click="${e=>{Fe(e,this.passwordField),this.showPassword=!this.showPassword}}"
        >
          ${this.showPassword?He:Ue}
        </button>
        <span class="error-field">${this.passwordError}</span>
        <a
          href="/account/forgot-password?email=${encodeURIComponent(this.email)}"
          >Forgot password?</a
        >
      </div>
      <div class="form-element">
        <button
          class="ia-button primary ${this.showLoadingIndicator?"pointer-none":""}"
          @click=${e=>{this.verifyIAPassword(e)}}
        >
          ${this.showLoadingIndicator?v` <ia-activity-indicator
                mode="processing"
                class="go-button-loading-icon"
              ></ia-activity-indicator>`:"Verify password"}
        </button>
      </div>
    `}get providerVerification(){return v`
      <p>Please sign in again to change protected settings.</p>
      <div class="form-element footer">
        <a @click=${()=>this.authenticationType="ia"}
          >Prefer to use your Internet Archive password?</a
        >
      </div>
      <slot></slot>
    `}render(){return v`
      <div class="authentication-template">
        <form method="post" name="authentication-settings" autocomplete="off">
          <div class="form-element">
            <h2>Account settings</h2>
          </div>
          ${this.authenticationType==="ia"?this.iaPasswordVerification:this.providerVerification}
        </form>
      </div
    `}static get styles(){return[Re,Oe,c`
        .authentication-template {
          position: relative;
        }
        .authentication-template a {
          display: inherit;
          width: fit-content;
          cursor: pointer;
        }
        .footer {
          position: absolute;
          bottom: -50px;
        }
        .ia-button {
          width: 130px;
          padding: 0 1rem;
        }
      `]}};a([b({type:String})],k.prototype,"authenticationType",void 0);a([b({type:String})],k.prototype,"identifier",void 0);a([b({type:String})],k.prototype,"email",void 0);a([b({type:String})],k.prototype,"csrfToken",void 0);a([y()],k.prototype,"showLoadingIndicator",void 0);a([y()],k.prototype,"showPassword",void 0);a([y()],k.prototype,"password",void 0);a([y()],k.prototype,"passwordError",void 0);a([_(".password")],k.prototype,"passwordField",void 0);k=a([ce("authentication-template")],k);let f=class extends x{constructor(){super(...arguments),this.userData={},this.selectedMailingLists=[],this.linkedProviders=[],this.profilePicture="",this.loanHistoryFlag="",this.csrfToken="",this.fieldsError={},this.confirmDelete=!1,this.responseFields={},this.saveButtonDisabled=!0,this.lookingToAuth=!0,this.isStickyHeader=!1,this.showPassword=!1,this.passwordMinLength=3,this.passwordMaxLength=100,this.passwordLengthMessage=`The password needs to be between ${this.passwordMinLength} and ${this.passwordMaxLength} characters long.`,this.userAvatarSuccessMsg="Your profile picture has been updated. Please allow 5 minutes for the change to take effect.",this.providerUnlinkMsg="The third party provider has unlinked.",this.oldUserData={email:"",screenname:""},this.unlinkProviders=[]}firstUpdated(){this.oldUserData=Object.assign(this.oldUserData,{email:this.userData.email,screenname:this.userData.screenname}),this.bindEvents()}updated(e){var t,i;this.fileInput=(i=(t=this.iaPicUploader)===null||t===void 0?void 0:t.shadowRoot)===null||i===void 0?void 0:i.querySelector(".file-selector"),(e.has("userData")||e.has("selectedMailingLists"))&&(this.showLoadingIndicator=!1,this.responseFields={}),e.has("fieldsError")&&this.hasFieldError()&&(L("buttton keep disabled"),this.saveButtonDisabled=!0)}bindEvents(){document.addEventListener("IAThirdPartyAuth:verifiedLogin",()=>{L("IAThirdPartyAuth:verifiedLogin"),this.lookingToAuth=!1}),window.addEventListener("scroll",tt(()=>{window.scrollY>this.offsetTop?this.isStickyHeader=!0:this.isStickyHeader=!1},50))}render(){return v`
      <main id="maincontent">
        <div class="container">
          ${this.lookingToAuth?this.verificationTemplate:this.settingsTemplate}
        </div>
      </main>
    `}setScreenname(e){const t=e.target;this.userData.screenname=t.value,this.resetErrorFields("screenname")}setEmail(e){const t=e.target;this.userData.email=t.value,this.fieldsError.email="",this.resetErrorFields("email")}setPassword(e){const t=e.target;this.userData.password=t.value,this.fieldsError.password="",this.resetErrorFields("password")}setLoanHistory(e){const t=e.target;this.loanHistoryFlag=t.checked?"public":"private",this.changeSaveButtonState()}setMailingList(e){const t=e.target,i=t.name;if(t.checked)this.selectedMailingLists.push(i);else{const o=this.selectedMailingLists.indexOf(i);this.selectedMailingLists.splice(o,1)}this.changeSaveButtonState()}setLinkedProvider(e){const t=e.target,{provider:i}=t.dataset;if(i){if(!t.checked)this.unlinkProviders.push(i);else{const o=this.unlinkProviders.indexOf(i);this.unlinkProviders.splice(o,1)}this.changeSaveButtonState()}}changeSaveButtonState(){this.saveButtonDisabled=!!this.hasFieldError()}resetErrorFields(e){let t={};e==="email"?t={...this.fieldsError,email:""}:e==="screenname"?t={...this.fieldsError,screenname:""}:t={...this.fieldsError,password:""},this.saveButtonDisabled=!1,this.fieldsError=t}hasFieldError(){return Object.values(this.fieldsError).some(e=>e!=="")}async validateScreenname(){var e;let t="";this.userData.screenname=_e(this.userData.screenname);const i=this.userData.screenname.length<3||this.userData.screenname.length>127;this.userData.screenname===""||i?t="The screen name needs to be between 3 and 127 characters long.":!((e=this.userData.screenname)===null||e===void 0)&&e.includes("\\")?t="This does not appear to be a valid screen name.":await this.isScreennameAvailable()===!1&&(t=`The screen name ${this.userData.screenname} is already taken.`),this.fieldsError={...this.fieldsError,screenname:t}}async validateEmail(){var e;let t="";this.userData.email=_e(this.userData.email);const i=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;!((e=this.userData.email)===null||e===void 0)&&e.match(i)?await this.isEmailAvailable()||(t=`${this.userData.email} is already taken.`):t="This does not appear to be a valid email address.",this.fieldsError={...this.fieldsError,email:t}}async validatePassword(){var e;const t=(e=this.userData.password)===null||e===void 0?void 0:e.length,i=t<this.passwordMinLength||t>this.passwordMaxLength;this.userData.password&&i&&(this.fieldsError={...this.fieldsError,password:this.passwordLengthMessage})}async isEmailAvailable(){var e;return this.userData.email!==((e=this.oldUserData)===null||e===void 0?void 0:e.email)?(await M({action:"email-available",email:this.userData.email})).success:!0}async isScreennameAvailable(){return this.userData.screenname!==this.oldUserData.screenname?(await M({action:"screenname-available",screenname:this.userData.screenname})).success:!0}async saveAccountSettings(e){if(this.showLoadingIndicator=!0,this.saveButtonDisabled=!0,Me(e),await this.validateScreenname(),await this.validateEmail(),await this.validatePassword(),this.emitProfileAvatarSaveEvent(),!this.hasFieldError()){const t=await M({action:"save-account",identifier:this.userData.identifier,userData:this.userData,csrfToken:this.csrfToken,selectedMailingLists:this.selectedMailingLists,loanHistoryFlag:this.loanHistoryFlag});t&&(this.responseFields=t),t.success===!0&&this.emitUnlinkProviderEvent()}setTimeout(async()=>{this.showLoadingIndicator=!1},100)}profilePictureUploaded(){var e;this.saveButtonDisabled=!0,this.responseFields={...this.responseFields,fields:{file:this.userAvatarSuccessMsg,...(e=this.responseFields)===null||e===void 0?void 0:e.fields}}}emitProfileAvatarSaveEvent(){var e,t;!((t=(e=this.fileInput)===null||e===void 0?void 0:e.files)===null||t===void 0)&&t.length&&(L("profile avatar should be updated!"),document.dispatchEvent(new Event("saveProfileAvatar")))}emitUnlinkProviderEvent(){var e;if(Object.values(this.unlinkProviders).length===0)return u;const t=Object.values(this.unlinkProviders).filter(i=>i??u);return t&&(L(`${t} provider should be unlinked!`),document.dispatchEvent(new CustomEvent("IAThirdPartyAuth:unlinkProvider",{detail:{provider:t}})),this.responseFields={...this.responseFields,fields:{unlink:this.providerUnlinkMsg,...(e=this.responseFields)===null||e===void 0?void 0:e.fields}}),u}get verificationTemplate(){return v` <authentication-template
      authenticationType="${Object.keys(this.linkedProviders).length?"":"ia"}"
      identifier=${this.userData.identifier}
      email=${this.userData.email}
      csrfToken=${this.csrfToken}
      @ia-authenticated=${()=>{this.lookingToAuth=!1;try{localStorage.setItem("keep-authenticated","yes")}catch{}}}
    >
      <slot name="ia-google-login"></slot>
    </authentication-template>`}get settingsTemplate(){var e;return v`<div
      class="settings-template ${this.isStickyHeader?"sticky-header":""} "
    >
      <form id="form" name="account-settings" method="post" autocomplete="off">
        <div
          class="form-element header ${this.showLoadingIndicator?"pointer-none":""}"
        >
          <h2>Account settings</h2>
          <button
            type="button"
            class="ia-button dark"
            @click=${()=>{setTimeout(()=>{window.location.href="/"},10)}}
          >
            Cancel
          </button>
          <button
            class="ia-button primary"
            @click=${t=>{this.saveAccountSettings(t)}}
            .disabled=${this.saveButtonDisabled}
          >
            ${this.showLoadingIndicator?this.loadingIndicatorTemplate:"Save changes"}
          </button>
        </div>

        <div class="body-content">
          <div
            class="data-updated 
            ${!((e=this.responseFields)===null||e===void 0)&&e.success?"success":"error"}"
          >
            ${this.getResponseTemplate}
          </div>

          <div class="form-element">
            <label>Change profile picture</label>
            <ia-pic-uploader
              identifier=${this.userData.identifier}
              picture="${this.profilePicture}"
              ?lookingAtMyAccount=${!0}
              type="compact"
              @fileChanged=${()=>{this.changeSaveButtonState()}}
              @fileUploaded=${()=>{this.profilePictureUploaded()}}
            ></ia-pic-uploader>
          </div>

          <div class="form-element ">
            <label for="screenname">
              Change screenname <small>(will not change user id)</small>
            </label>
            <input
              type="text"
              class="form-control"
              id="screenname"
              name="screenname"
              .value="${this.userData.screenname}"
              @input=${this.setScreenname}
              @blur=${this.validateScreenname}
            />
            <span class="error-field">${this.fieldsError.screenname}</span>
          </div>

          <div class="form-element">
            <label for="email">
              Change email <small>(verification will be required)</small>
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              .value="${this.userData.email}"
              @input=${this.setEmail}
              @blur=${this.validateEmail}
            />
            <span class="error-field">${this.fieldsError.email}</span>
          </div>

          <div class="form-element">
            <label for="password">
              Change Internet Archive / Open Library password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              autocomplete="new-password"
              @input=${this.setPassword}
              @blur=${this.validatePassword}
            />
            <button
              type="button"
              class="password-icon"
              @click="${t=>{Fe(t,this.passwordField),this.showPassword=!this.showPassword}}"
            >
              ${this.showPassword?He:Ue}
            </button>
            <span class="error-field">${this.fieldsError.password}</span>
          </div>

          <div class="form-element">
            <label>Set borrow history</label>
            <input
              type="checkbox"
              id="loan-history"
              name="loan-history"
              .checked=${this.loanHistoryFlag==="public"||this.loanHistoryFlag===!0}
              @click=${this.setLoanHistory}
            />
            <label for="loan-history"> Visible to the public</label>
          </div>

          <div class="form-element newsletter">
            <label>Newsletter subscriptions</label>
            <p>
              Stay up to date with what's happening at the Internet Archive by
              signing up for our free newsletters.
            </p>
            ${this.mailingListsTemplate}
          </div>

          <div class="form-element">
            <label for="linked-account"
              >Linked 3rd party accounts (e.g. Google)</label
            >
            ${Object.keys(this.linkedProviders).length?this.linkedAccountTemplate:"You have no linked accounts"}
          </div>

          <div
            class="form-element delete-account ${this.attemptToDelete?"hide":""}"
          >
            <button
              type="button"
              class="delete-link"
              href="javascript:void(0)"
              @click=${()=>{this.attemptToDelete=!0}}
            >
              Delete Internet Archive / Open Library account
            </button>
          </div>

          ${this.attemptToDelete?this.deleteAccountTemplate:""}
        </div>
      </form>

      ${this.userData.isAdmin?this.adminFunctionsTemplate:""}
    </div>`}get getResponseTemplate(){var e,t,i,o,s;return((e=this.responseFields)===null||e===void 0?void 0:e.success)===!1?v`<span class="error-field"
        >&#10006; ${(t=this.responseFields)===null||t===void 0?void 0:t.error}</span
      >`:(s=Object.values((o=(i=this.responseFields)===null||i===void 0?void 0:i.fields)!==null&&o!==void 0?o:{}))===null||s===void 0?void 0:s.map(n=>v`<span class="success-field">&#10003; ${n}</span>`)}get mailingListsTemplate(){return this.mailingLists?Object.entries(this.mailingLists).map(e=>e[1].public?v`<input
          type="checkbox"
          id="${e[1].key}"
          name="${e[1].key}"
          @click=${this.setMailingList}
          .checked=${Object.values(this.selectedMailingLists).includes(e[1].key)}
        />
        <label for="${e[1].key}">
          ${e[1].name}: ${e[1].short_desc}</label
        ><br /> `:u):u}get linkedAccountTemplate(){var e;return(e=Object.values(this.linkedProviders))===null||e===void 0?void 0:e.map(t=>this.linkedProviders[t]===!1?v`You have no linked accounts`:v` <input
          name="ia-${t}"
          id="ia-${t}"
          type="checkbox"
          data-provider=${t}
          checked
          @click=${this.setLinkedProvider}
        />
        <label for="ia-${t}"> ${t}</label>`)}get loadingIndicatorTemplate(){return v` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`}get deleteAccountTemplate(){return v`
      <div class="form-element delete-section">
        <label>Delete Internet Archive / Open Library account</label>
        <p>
          Items you've uploaded will remain on the Internet Archive. If you wish
          to remove items,<br />
          please do so before delete your account.
        </p>
        <a
          href="https://help.archive.org/help/how-do-i-delete-my-account/"
          target="_blank"
          >Click here for instructions on removing your items.</a
        ><br />

        <input
          type="checkbox"
          id="confirm-delete"
          name="confirm-delete"
          @click=${()=>{this.confirmDelete=!this.confirmDelete}}
        />
        <label for="confirm-delete"
          >I'm sure I want to delete my account.</label
        >
        <p>This action cannot be reversed.</p>
        ${this.getDeleteButton}
      </div>
    `}get getDeleteButton(){return v`<button
      id="delete-button"
      class="ia-button danger ${this.showLoadingIndicator?"pointer-none":""}"
      type="button"
      ?disabled=${!this.confirmDelete}
      @click=${async()=>{this.showLoadingIndicator=!0,(await M({action:"delete-account",confirmDelete:this.confirmDelete,csrfToken:this.csrfToken})).success&&window.location.reload()}}
    >
      ${this.showLoadingIndicator?this.loadingIndicatorTemplate:"Delete account"}
    </button>`}get adminFunctionsTemplate(){return v`<div class="col-md-4">
      <div class="form-element admin-functions">
        <h2>Admin functions</h2>
        <hr />
        <ul>
          <li>
            <a href="https://pi.archive.org/control/setadmin.php"
              >Grant or revoke administrator privileges</a
            >
          </li>
          <li>
            <a href="https://pi.archive.org/control/useradmin.php"
              >User Administration</a
            >
          </li>
          <li>
            <a href="https://archive.org/iathreads/forum-new.php"
              >Make a new Forum</a
            >
          </li>
          <li>
            <a href="https://pi.archive.org/control/blockparty.php"
              >Block Party</a
            >
          </li>
        </ul>
      </div>
    </div>`}static get styles(){return[Oe,Re,c`
        :host {
          display: block;
          padding: 25px;
          font-size: 1.4rem;
          outline: none;
          border: none;
        }

        .ia-button.primary {
          width: 138px;
        }

        ia-pic-uploader:focus,
        ia-pic-uploader:focus-visible {
          outline: none;
        }

        /* sticky header on scroll */
        .sticky-header .header {
          position: fixed;
          top: 0;
          width: 100%;
          padding: 20px 0;
          z-index: 2;
          background: #fff;
        }
        .sticky-header .body-content {
          margin-top: 50px;
        }
      `]}};a([b({type:Object})],f.prototype,"userData",void 0);a([b({type:Object})],f.prototype,"mailingLists",void 0);a([b({type:Array})],f.prototype,"selectedMailingLists",void 0);a([b({type:Array})],f.prototype,"linkedProviders",void 0);a([b({type:String})],f.prototype,"profilePicture",void 0);a([b({type:String})],f.prototype,"loanHistoryFlag",void 0);a([b({type:String})],f.prototype,"csrfToken",void 0);a([y()],f.prototype,"fileInput",void 0);a([y()],f.prototype,"fieldsError",void 0);a([y()],f.prototype,"attemptToDelete",void 0);a([y()],f.prototype,"confirmDelete",void 0);a([y()],f.prototype,"responseFields",void 0);a([y()],f.prototype,"saveButtonDisabled",void 0);a([y()],f.prototype,"lookingToAuth",void 0);a([y()],f.prototype,"showLoadingIndicator",void 0);a([y()],f.prototype,"isStickyHeader",void 0);a([y()],f.prototype,"showPassword",void 0);a([_("ia-pic-uploader")],f.prototype,"iaPicUploader",void 0);a([_("#password")],f.prototype,"passwordField",void 0);f=a([ce("ia-account-settings")],f);const xt="ml_best_of",Et="ml_events",St="ml_donors",Ct={ML_BEST_OF:{key:xt,name:"Best of the Archive",interest_id:"e7594f8604",selected_by_default:!0,public:!0,short_desc:"Useful resources, unique stories, and fun finds from our collections"},ML_EVENTS:{key:Et,name:"Event Notices",interest_id:"98cc7bf635",selected_by_default:!1,public:!0,short_desc:"Invitations to and news about our events"},ML_DONORS:{key:St,name:"Donor Communications",interest_id:"ff44b81002",selected_by_default:!1,public:!0,short_desc:"Information about how your donations are being used."}},Tt={identifier:"@neerajksharma453_gmail_com",screenname:"neeraj-archive",email:"neerajksharma453@gmail.com",password:"",isAdmin:!1},Lt=["ml_best_of","ml_donors"],It=["google"];Be(v`
      <ia-account-settings
        .userData="${Tt}"
        .mailingLists="${Ct}"
        .selectedMailingLists=${Lt}
        .linkedProviders=${It}
        .profilePicture=${"../demo/default-preview.jpg"}
        .loanHistoryFlag=${"public"}
        .csrfToken=${"sfsdflksjfkfeteldkfjlf37583585n534535ui5n353h5"}
        .updatedFields=${{screenname:"123Your screen name has been updated successfully.",mailing_lists:"Mailing lists has been updated!"}}
      ><div slot="ia-google-login" class="third-party-login-cta">
          <img src="google-login-placeholder.jpg" alt="" width="200px" >
          <div>
            <div id="g_id_signin"></div>
          </div>
      </div>
      </ia-account-settings>`,document.querySelector("#demo"));
