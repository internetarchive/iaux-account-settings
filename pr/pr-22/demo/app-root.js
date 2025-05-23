(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=window,le=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,de=Symbol(),pe=new WeakMap;let Ce=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==de)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(le&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&pe.set(t,e))}return e}toString(){return this.cssText}};const ze=r=>new Ce(typeof r=="string"?r:r+"",void 0,de),l=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,o,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[s+1],r[0]);return new Ce(t,r,de)},Ne=(r,e)=>{le?r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=N.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,r.appendChild(i)})},ue=le?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ze(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Y;const j=window,ve=j.trustedTypes,je=ve?ve.emptyScript:"",fe=j.reactiveElementPolyfillSupport,ne={toAttribute(r,e){switch(e){case Boolean:r=r?je:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Te=(r,e)=>e!==r&&(e==e||r==r),Z={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:Te};let T=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const s=this[e];this[t]=o,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Z}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(ue(o))}else e!==void 0&&t.push(ue(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ne(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=Z){var o;const s=this.constructor._$Ep(e,i);if(s!==void 0&&i.reflect===!0){const n=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:ne).toAttribute(t,i.type);this._$El=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,s=o._$Ev.get(e);if(s!==void 0&&this._$El!==s){const n=o.getPropertyOptions(s),d=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:ne;this._$El=s,this[s]=d.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Te)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,s)=>this[s]=o),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var s;return(s=o.hostUpdate)===null||s===void 0?void 0:s.call(o)}),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};T.finalized=!0,T.elementProperties=new Map,T.elementStyles=[],T.shadowRootOptions={mode:"open"},fe==null||fe({ReactiveElement:T}),((Y=j.reactiveElementVersions)!==null&&Y!==void 0?Y:j.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W;const V=window,L=V.trustedTypes,me=L?L.createPolicy("lit-html",{createHTML:r=>r}):void 0,ae="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,Le="?"+x,Ve=`<${Le}>`,C=document,M=()=>C.createComment(""),H=r=>r===null||typeof r!="object"&&typeof r!="function",Ie=Array.isArray,Ge=r=>Ie(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",K=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,ye=/>/g,E=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,we=/"/g,Pe=/^(?:script|style|textarea|title)$/i,De=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),v=De(1),ce=De(2),I=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),$e=new WeakMap,S=C.createTreeWalker(C,129,null,!1),qe=(r,e)=>{const t=r.length-1,i=[];let o,s=e===2?"<svg>":"",n=D;for(let c=0;c<t;c++){const h=r[c];let _,p,g=-1,w=0;for(;w<h.length&&(n.lastIndex=w,p=n.exec(h),p!==null);)w=n.lastIndex,n===D?p[1]==="!--"?n=ge:p[1]!==void 0?n=ye:p[2]!==void 0?(Pe.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=E):p[3]!==void 0&&(n=E):n===E?p[0]===">"?(n=o??D,g=-1):p[1]===void 0?g=-2:(g=n.lastIndex-p[2].length,_=p[1],n=p[3]===void 0?E:p[3]==='"'?we:be):n===we||n===be?n=E:n===ge||n===ye?n=D:(n=E,o=void 0);const O=n===E&&r[c+1].startsWith("/>")?" ":"";s+=n===D?h+Ve:g>=0?(i.push(_),h.slice(0,g)+ae+h.slice(g)+x+O):h+x+(g===-2?(i.push(void 0),c):O)}const d=s+(r[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return[me!==void 0?me.createHTML(d):d,i]};class R{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,n=0;const d=e.length-1,c=this.parts,[h,_]=qe(e,t);if(this.el=R.createElement(h,i),S.currentNode=this.el.content,t===2){const p=this.el.content,g=p.firstChild;g.remove(),p.append(...g.childNodes)}for(;(o=S.nextNode())!==null&&c.length<d;){if(o.nodeType===1){if(o.hasAttributes()){const p=[];for(const g of o.getAttributeNames())if(g.endsWith(ae)||g.startsWith(x)){const w=_[n++];if(p.push(g),w!==void 0){const O=o.getAttribute(w.toLowerCase()+ae).split(x),z=/([.?@])?(.*)/.exec(w);c.push({type:1,index:s,name:z[2],strings:O,ctor:z[1]==="."?Ze:z[1]==="?"?Ke:z[1]==="@"?Je:q})}else c.push({type:6,index:s})}for(const g of p)o.removeAttribute(g)}if(Pe.test(o.tagName)){const p=o.textContent.split(x),g=p.length-1;if(g>0){o.textContent=L?L.emptyScript:"";for(let w=0;w<g;w++)o.append(p[w],M()),S.nextNode(),c.push({type:2,index:++s});o.append(p[g],M())}}}else if(o.nodeType===8)if(o.data===Le)c.push({type:2,index:s});else{let p=-1;for(;(p=o.data.indexOf(x,p+1))!==-1;)c.push({type:7,index:s}),p+=x.length-1}s++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function P(r,e,t=r,i){var o,s,n,d;if(e===I)return e;let c=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const h=H(e)?void 0:e._$litDirective$;return(c==null?void 0:c.constructor)!==h&&((s=c==null?void 0:c._$AO)===null||s===void 0||s.call(c,!1),h===void 0?c=void 0:(c=new h(r),c._$AT(r,t,i)),i!==void 0?((n=(d=t)._$Co)!==null&&n!==void 0?n:d._$Co=[])[i]=c:t._$Cl=c),c!==void 0&&(e=P(r,c._$AS(r,e.values),c,i)),e}class Ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,s=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:C).importNode(i,!0);S.currentNode=s;let n=S.nextNode(),d=0,c=0,h=o[0];for(;h!==void 0;){if(d===h.index){let _;h.type===2?_=new U(n,n.nextSibling,this,e):h.type===1?_=new h.ctor(n,h.name,h.strings,this,e):h.type===6&&(_=new Qe(n,this,e)),this._$AV.push(_),h=o[++c]}d!==(h==null?void 0:h.index)&&(n=S.nextNode(),d++)}return S.currentNode=C,s}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class U{constructor(e,t,i,o){var s;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(s=o==null?void 0:o.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),H(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==I&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Ge(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==u&&H(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=R.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.v(i);else{const n=new Ye(s,this),d=n.u(this.options);n.v(i),this.$(d),this._$AH=n}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new R(e)),t}T(e){Ie(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new U(this.k(M()),this.k(M()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class q{constructor(e,t,i,o,s){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const s=this.strings;let n=!1;if(s===void 0)e=P(this,e,t,0),n=!H(e)||e!==this._$AH&&e!==I,n&&(this._$AH=e);else{const d=e;let c,h;for(e=s[0],c=0;c<s.length-1;c++)h=P(this,d[i+c],t,c),h===I&&(h=this._$AH[c]),n||(n=!H(h)||h!==this._$AH[c]),h===u?e=u:e!==u&&(e+=(h??"")+s[c+1]),this._$AH[c]=h}n&&!o&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ze extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}const We=L?L.emptyScript:"";class Ke extends q{constructor(){super(...arguments),this.type=4}j(e){e&&e!==u?this.element.setAttribute(this.name,We):this.element.removeAttribute(this.name)}}class Je extends q{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){var i;if((e=(i=P(this,e,t,0))!==null&&i!==void 0?i:u)===I)return;const o=this._$AH,s=e===u&&o!==u||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==u&&(o===u||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Qe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}}const ke=V.litHtmlPolyfillSupport;ke==null||ke(R,U),((W=V.litHtmlVersions)!==null&&W!==void 0?W:V.litHtmlVersions=[]).push("2.7.4");const Be=(r,e,t)=>{var i,o;const s=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let n=s._$litPart$;if(n===void 0){const d=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;s._$litPart$=n=new U(e.insertBefore(M(),d),d,void 0,t??{})}return n._$AI(r),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var J,Q;class A extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Be(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return I}}A.finalized=!0,A._$litElement$=!0,(J=globalThis.litElementHydrateSupport)===null||J===void 0||J.call(globalThis,{LitElement:A});const _e=globalThis.litElementPolyfillSupport;_e==null||_e({LitElement:A});((Q=globalThis.litElementVersions)!==null&&Q!==void 0?Q:globalThis.litElementVersions=[]).push("3.3.2");function a(r,e,t,i){var o=arguments.length,s=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(r,e,t,i);else for(var d=r.length-1;d>=0;d--)(n=r[d])&&(s=(o<3?n(s):o>3?n(e,t,s):n(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=r=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(r,e):((t,i)=>{const{kind:o,elements:s}=i;return{kind:o,elements:s,finisher(n){customElements.define(t,n)}}})(r,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=(r,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,r)}};function y(r){return(e,t)=>t!==void 0?((i,o,s)=>{o.constructor.createProperty(s,i)})(r,e,t):Xe(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(r){return y({...r,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const et=({finisher:r,descriptor:e})=>(t,i)=>{var o;if(i===void 0){const s=(o=t.originalKey)!==null&&o!==void 0?o:t.key,n=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(t.key)}:{...t,key:s};return r!=null&&(n.finisher=function(d){r(d,s)}),n}{const s=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),r==null||r(s,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function k(r,e){return et({descriptor:t=>{const i={get(){var o,s;return(s=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(r))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){const o=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var s,n;return this[o]===void 0&&(this[o]=(n=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(r))!==null&&n!==void 0?n:null),this[o]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var X;((X=window.HTMLSlotElement)===null||X===void 0?void 0:X.prototype.assignedElements)!=null;const G=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)?console.log.bind(console):()=>{};async function B(r){var e;const t={action:null,identifier:"",userData:{},selectedMailingLists:[],csrfToken:"",baseHost:"/account/index.php",headers:{},...r};G(t);let i=t.baseHost,o={},s=new FormData;s.append("action",t.action),s.append("identifier",t.identifier),s.append("csrf-token",t.csrfToken),t.action==="email-available"?s.append("email",t.email):t.action==="screenname-available"?s.append("screenname",t.screenname):t.action==="verify-password"?s.append("password",t.password):t.action==="delete-account"?s.append("delete-confirm",t.confirmDelete):t.action==="save-account"&&(s.append("userdata",JSON.stringify(t.userData)),s.append("selected-mailing-lists",t.selectedMailingLists),s.append("loan-history-flag",t.loanHistoryFlag));const n=(e=window==null?void 0:window.location)===null||e===void 0?void 0:e.pathname;n.includes("/demo/")&&(n.includes("localhost")||n.includes("iaux-account-settings"))&&(i="/demo/");try{await fetch(i,{mode:"no-cors",method:"POST",headers:t.headers,body:s}).then(d=>(G("response - ",d),i==="/demo/"?t.userData.screenname==="neeraj-archive"&&t.action==="email-available"?{success:!1,error:"Invalid CSRF token, please refresh the page and try again later."}:{success:!0,fields:{screenname:"Your screen name has been updated successfully.",mailing_lists:"Mailing lists has been updated!"}}:d.json())).then(d=>{o=d})}catch{}return o}async function Fe(r,e){const t=e;(t==null?void 0:t.type)==="password"?t.type="text":t.type="password"}function Me(r){r==null||r.preventDefault(),r==null||r.stopPropagation()}function xe(r){var e;return(e=r==null?void 0:r.replace("/s+/"," "))===null||e===void 0?void 0:e.trim()}function tt(r,e){let t=!1;return()=>{t||(r(),t=!0,setTimeout(()=>{t=!1},e))}}const He=l`
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
    vertical-align: middle;
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
    margin: 0;
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
`,Ae=l`var(--white, #fff)`,it=l`var(--primaryDisableCTAFill, #767676)`,ot=l`var(--secondaryCTABorder, #999)`,st=l`var(--primaryCTAFill, #194880)`,ee=l`var(--primaryCTAFillRGB, 25, 72, 128)`,rt=l`var(--primaryCTABorder, #c5d1df)`,nt=l`var(--primaryErrorCTAFill, #d9534f)`,te=l`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,at=l`var(--primaryErrorCTABorder, #d43f3a)`,lt=l`var(--secondaryCTAFill, #333)`,ie=l`var(--secondaryCTAFillRGB, 51, 51, 51)`,dt=l`var(--primaryCTABorder, #979797)`,ct=l`#ee8950`,ht=l`#ec7939`,Re=l`
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
`,pt=Object.freeze({processing:"processing",complete:"complete"});class ut extends A{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=pt.processing}render(){return v`
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
    `}static get styles(){const e=l`var(--activityIndicatorCheckmarkColor, #31A481)`,t=l`var(--activityIndicatorCompletedRingColor, #31A481)`,i=l`var(--activityIndicatorLoadingRingColor, #333333)`,o=l`var(--activityIndicatorLoadingDotColor, #333333)`;return l`
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
    `}}window.customElements.define("ia-activity-indicator",ut);const Ee=l`var(--white, #fff)`,vt=l`var(--primaryDisableCTAFill, #767676)`,ft=l`var(--secondaryCTABorder, #999)`,mt=l`var(--primaryCTAFill, #194880)`,oe=l`var(--primaryCTAFillRGB, 25, 72, 128)`,gt=l`var(--primaryCTABorder, #c5d1df)`,yt=l`var(--primaryErrorCTAFill, #d9534f)`,se=l`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,bt=l`var(--primaryErrorCTABorder, #d43f3a)`,wt=l`var(--secondaryCTAFill, #333)`,re=l`var(--secondaryCTAFillRGB, 51, 51, 51)`,$t=l`var(--primaryCTABorder, #979797)`,kt=l`#ee8950`,_t=l`#ec7939`,xt=l`
  .ia-button {
    height: 3.5rem;
    min-height: 3rem;
    cursor: pointer;
    color: ${Ee};
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
    outline-color: ${Ee};
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
    background-color: ${yt};
    border-color: ${bt};
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
`,F=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)?console.log.bind(console):()=>{};async function Se(r){var e;const t={action:null,identifier:"",file:null,getParam:"",endpoint:"",headers:{},callback(){},...r};let i={},o="";const s=window==null?void 0:window.location;(s==null?void 0:s.pathname)==="/demo/"?o="/demo/":o=`${t.endpoint}?${t.getParam}`;try{await fetch(o,{mode:"no-cors",method:"POST",headers:t.headers,body:(e=t.file)!==null&&e!==void 0?e:null}).then(n=>{if(F("response",n),o==="/demo/"&&t.action==="verify-upload")return{success:!0,item_last_updated:1};if(t.action==="save-file"&&n.status===200)return t.callback(n),{};if(n.status!==0)return n.json()}).then(n=>{F("data",n),t.action==="save-file"&&F("file saved, metadata call started to verify is picture is upadated!"),i=n})}catch(n){F(n)}return i}let m=class extends A{constructor(){super(...arguments),this.identifier="",this.endpoint="/services/post-file.php",this.picture="",this.type="compact",this.lookingAtMyAccount=!1,this.maxFileSizeInMB=8,this.validFileTypes=["image/jpeg","image/png","image/gif"],this.taskStatus="",this.fileValidationError="",this.showDropper=!1,this.fileTypeMessage="Image file must be a JPEG, PNG, or GIF.",this.fileSizeMessage="",this.relatedTarget=""}firstUpdated(){this.fileSizeMessage=`Image file must be less than ${this.maxFileSizeInMB}MB.`,this.renderInput(),this.lookingAtMyAccount&&this.bindEvents()}renderInput(){var e,t,i;const o=document.createElement("input");o.type="file",o.accept="image/*",o.multiple=!1,(e=this.profileSection)===null||e===void 0||e.addEventListener("mouseenter",()=>{var s;(s=this.profileSection)===null||s===void 0||s.classList.add("profile-hover")}),(t=this.dropRegion)===null||t===void 0||t.addEventListener("click",()=>{o.click()}),(i=this.uploadRegion)===null||i===void 0||i.addEventListener("click",()=>{o.click()}),o.addEventListener("change",()=>{const{files:s}=o;this.handleSelectedFiles(s)})}dragOver(e){var t,i,o;this.preventDefault(e),(t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("hidden"),this.showLoadingIndicator||(i=this.selfSubmitEle)===null||i===void 0||i.classList.add("drag-over"),(o=this.overlay)===null||o===void 0||o.classList.add("window-drag-over")}dragLeave(e){var t,i,o;this.preventDefault(e),this.relatedTarget===e.target&&(this.showLoadingIndicator||((t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("drag-over"),(i=this.selfSubmitEle)===null||i===void 0||i.classList.add("hidden")),(o=this.overlay)===null||o===void 0||o.classList.remove("window-drag-over"))}drop(e){var t,i;this.preventDefault(e),(t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("drag-over"),(i=this.overlay)===null||i===void 0||i.classList.remove("window-drag-over"),this.showLoadingIndicator||this.cancelFile()}bindEvents(){var e,t;document.addEventListener("dragenter",i=>{this.relatedTarget=i.target},!1),document.addEventListener("dragover",i=>this.dragOver(i),!1),document.addEventListener("dragleave",i=>this.dragLeave(i),!0),document.addEventListener("drop",i=>this.drop(i),!1),document==null||document.addEventListener("saveProfileAvatar",i=>{var o;!((o=this.fileSelector)===null||o===void 0)&&o.files.length&&this.handleSaveFile(i)}),[this.overlay,this.dropRegion,this.selfSubmitEle].forEach(i=>i==null?void 0:i.addEventListener("drop",this.handleDropImage.bind(this),!1)),(e=this.saveFile)===null||e===void 0||e.addEventListener("submit",this.handleSaveFile.bind(this),!1),(t=this.fileSelector)===null||t===void 0||t.addEventListener("change",()=>{const{files:i}=this.fileSelector;this.handleSelectedFiles(i)})}preventDefault(e){e.preventDefault(),e.stopPropagation()}handleDropImage(e){var t,i;if(this.preventDefault(e),(t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("drag-over"),!this.showLoadingIndicator){const o=(i=e==null?void 0:e.dataTransfer)===null||i===void 0?void 0:i.files;o!=null&&o.length&&this.handleSelectedFiles(o)}}previewImage(e){var t,i;this.showDropper=!0;let o;this.type==="full"?o=document.createElement("img"):o=(t=this.dropRegion)===null||t===void 0?void 0:t.querySelector("img"),o.alt="profile picture";const s=new FileReader;if(s.onload=n=>{var d;o.src=(d=n.target)===null||d===void 0?void 0:d.result},this.type==="full"){const n=(i=this.selfSubmitEle)===null||i===void 0?void 0:i.querySelector(".full-preview");n==null||n.appendChild(o)}s.readAsDataURL(e)}validateImage(e){this.fileValidationError="";const t=this.validFileTypes,i=this.maxFileSizeInMB*1024*1024;return t.indexOf(e.type)===-1?(this.fileValidationError=this.fileTypeMessage,!1):e.size>i?(this.fileValidationError=this.fileSizeMessage,!1):!0}async handleSelectedFiles(e){var t,i,o,s;const n=(t=this.selfSubmitEle)===null||t===void 0?void 0:t.querySelector(".image-preview");if((i=this.overlay)===null||i===void 0||i.classList.remove("window-drag-over"),this.type==="full"&&((o=this.selfSubmitEle)===null||o===void 0||o.classList.remove("hidden")),e.length&&this.validateImage(e[0])){if(this.type==="full")for(;n!=null&&n.firstChild&&n.removeChild(n.firstChild););await this.previewImage(e[0]),this.fileSelector&&(this.fileSelector.files=e)}else for(e.length||this.cancelFile();n!=null&&n.firstChild&&n.removeChild(n.firstChild););this.dispatchEvent(new CustomEvent("fileChanged",{detail:{error:(s=this.fileValidationError)!==null&&s!==void 0?s:""}}))}async handleSaveFile(e){var t,i;this.preventDefault(e),this.showLoadingIndicator=!0,(t=this.selfSubmitEle)===null||t===void 0||t.classList.add("vertical-center"),this.taskStatus="waiting for your tasks to queue";const o=(i=this.fileSelector)===null||i===void 0?void 0:i.files[0],s=`identifier=${this.identifier}&fname=${encodeURIComponent(o.name)}&submit=1`;await Se({action:"save-file",identifier:this.identifier,file:o,getParam:s,endpoint:this.endpoint,headers:{"Content-type":"multipart/form-data; charset=UTF-8"},callback:async()=>{F("callback invoked!",this.type),this.type==="full"&&await this.metadataAPIExecution()}}),this.dispatchEvent(new Event("fileUploaded")),this.type==="compact"&&(this.showLoadingIndicator=!1),this.fileSelector&&(this.fileSelector.value="")}metadataAPIExecution(){const e=Math.round(Date.now()/1e3),t=setInterval(async()=>{Se({action:"verify-upload",endpoint:`/metadata/${this.identifier}?rand=${Math.random()}`}).then(o=>{const s=o.pending_tasks&&o.tasks?o.tasks.length:0;s?o.tasks.filter(d=>d.wait_admin===2).length?(this.taskStatus="status task failure -- an admin will need to resolve",clearInterval(t)):this.taskStatus=`waiting for your ${s} tasks to finish`:o.item_last_updated<e?this.taskStatus="waiting for your tasks to queue":(clearInterval(t),this.taskStatus="reloading page with your image",window.location.reload())})},2e3)}cancelFile(){var e,t,i;const o=(e=this.selfSubmitEle)===null||e===void 0?void 0:e.querySelector(".image-preview");for(this.fileSelector&&(this.fileSelector.value=""),this.showDropper=!1,this.showLoadingIndicator=!1,this.fileValidationError="",(t=this.selfSubmitEle)===null||t===void 0||t.classList.add("hidden"),(i=this.profileSection)===null||i===void 0||i.classList.remove("profile-hover");o!=null&&o.firstChild&&o.removeChild(o.firstChild););}get loadingIndicatorTemplate(){return v` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`}get selfSubmitFormTemplate(){const e=encodeURIComponent(`${this.endpoint}?identifier=${this.identifier}&submit=1`);return v`
      <div class="self-submit-form hidden">
        <button
          class="close-button ia-button 
          ${!this.showDropper&&this.fileValidationError===""||this.showLoadingIndicator?"hidden":""}
          ${this.showLoadingIndicator?"pointer-none":""}"
          @click=${()=>{this.cancelFile()}}
        >
          &#10060;
        </button>
        ${this.showLoadingIndicator?this.loadingIndicatorTemplate:this.plusSVGTemplate(35,35,"#969696","#fff")}
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
    `}get overlayTemplate(){return v`
      <div
        class="overlay ${this.showLoadingIndicator?"show-overlay pointer-none":""}"
        @keyup="${()=>{}}"
        @click=${()=>{var e;(e=this.dropRegion)===null||e===void 0||e.click()}}
      >
        ${this.showLoadingIndicator?this.loadingIndicatorTemplate:this.plusSVGTemplate(25,25,"#fff","#333333")}
      </div>
    `}plusSVGTemplate(e,t,i,o){return ce`<svg 
      class="plus-icon"  
      width="${t}" 
      height="${e}" 
      viewBox="0 0 26 26" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12.8137" cy="13.3699" r="12.5" fill="${i}"/>
      <path d="M11.3137 5.36987H14.3137V21.3699H11.3137V5.36987Z" fill="${o}"/>
      <path d="M4.56366 14.8699V11.8699H21.0637V14.8699H4.56366Z" fill="${o}"/>
    </svg>
    `}render(){return v`
      <div
        class="profile-section profile-hover 
        ${this.lookingAtMyAccount?"":"pointer-none"}
        ${this.type==="full"?"adjust-full":""}
      "
      >
        ${this.type==="compact"?this.overlayTemplate:u}
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
    `}static get styles(){return l`
      ${xt}

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
        width: fit-content;
      }

      .profile-section > .full-preview img {
        max-height: 100px;
        max-width: 200px;
      }

      .profile-section:hover .overlay {
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

      .profile-hover:hover .self-submit-form {
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

      .overlay:hover + .image-preview img,
      .overlay.window-drag-over + .image-preview img,
      .image-preview:hover img {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
        opacity: 0.5;
      }

      .overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 100%;
        transform: translate(-50%, -50%);
        text-align: center;
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

      .plus-icon {
        pointer-events: none;
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

      .window-drag-over {
        display: block;
        z-index: 1;
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
    `}};a([y({type:String})],m.prototype,"identifier",void 0);a([y({type:String})],m.prototype,"endpoint",void 0);a([y({type:String})],m.prototype,"picture",void 0);a([y({type:String})],m.prototype,"type",void 0);a([y({type:Boolean})],m.prototype,"lookingAtMyAccount",void 0);a([y({type:Number})],m.prototype,"maxFileSizeInMB",void 0);a([y({type:Number})],m.prototype,"validFileTypes",void 0);a([b()],m.prototype,"showLoadingIndicator",void 0);a([b()],m.prototype,"taskStatus",void 0);a([b()],m.prototype,"fileValidationError",void 0);a([b()],m.prototype,"showDropper",void 0);a([k("#drop-region")],m.prototype,"dropRegion",void 0);a([k("#upload-region")],m.prototype,"uploadRegion",void 0);a([k(".profile-section")],m.prototype,"profileSection",void 0);a([k(".overlay")],m.prototype,"overlay",void 0);a([k(".plus-icon")],m.prototype,"plusIcon",void 0);a([k("#save-file")],m.prototype,"saveFile",void 0);a([k(".self-submit-form")],m.prototype,"selfSubmitEle",void 0);a([k(".file-selector")],m.prototype,"fileSelector",void 0);m=a([he("ia-pic-uploader")],m);const Ue=ce`
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
  </svg>`,Oe=ce`
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
  </svg>`;let $=class extends A{constructor(){super(...arguments),this.authenticationType="ia",this.identifier="",this.email="",this.csrfToken="",this.showPassword=!1,this.password="",this.passwordError=""}async verifyIAPassword(e){var t,i;if(Me(e),!this.password){(t=this.passwordField)===null||t===void 0||t.focus(),this.passwordError=" * password can't be empty";return}this.showLoadingIndicator=!0;const o=await B({action:"verify-password",identifier:this.identifier,password:this.password,csrfToken:this.csrfToken});o.success===!0?this.dispatchEvent(new CustomEvent("ia-authenticated",{detail:{token:o.token}})):((i=this.passwordField)===null||i===void 0||i.focus(),this.passwordError=o.error),this.showLoadingIndicator=!1}setPassword(e){const t=e.target;this.password=t.value,this.passwordError=""}get iaPasswordVerification(){return v`
      <p class="title">
        To access your account settings, as an extra security measure, please
        enter your password.
      </p>
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
          ${this.showPassword?Oe:Ue}
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
      <p class="title">
        To access your account settings, as an extra security measure, please
        sign in with Google.
      </p>
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
    `}static get styles(){return[He,Re,l`
        .authentication-template {
          position: relative;
        }
        .authentication-template a {
          display: inherit;
          width: fit-content;
          cursor: pointer;
        }
        .authentication-template .title {
          max-width: 35rem;
          margin-bottom: 2rem;
        }
        .footer {
          position: absolute;
          bottom: -50px;
          width: 300px;
        }
        .ia-button {
          width: 130px;
          padding: 0 1rem;
        }
      `]}};a([y({type:String})],$.prototype,"authenticationType",void 0);a([y({type:String})],$.prototype,"identifier",void 0);a([y({type:String})],$.prototype,"email",void 0);a([y({type:String})],$.prototype,"csrfToken",void 0);a([b()],$.prototype,"showLoadingIndicator",void 0);a([b()],$.prototype,"showPassword",void 0);a([b()],$.prototype,"password",void 0);a([b()],$.prototype,"passwordError",void 0);a([k(".password")],$.prototype,"passwordField",void 0);$=a([he("authentication-template")],$);let f=class extends A{constructor(){super(...arguments),this.userData={},this.selectedMailingLists=[],this.linkedProviders=[],this.profilePicture="",this.loanHistoryFlag="",this.csrfToken="",this.fieldsError={},this.confirmDelete=!1,this.responseFields={},this.saveButtonDisabled=!0,this.lookingToAuth=!0,this.isStickyHeader=!1,this.showPassword=!1,this.apiHasExecuted=!1,this.passwordMinLength=3,this.passwordMaxLength=100,this.passwordLengthMessage=`The password needs to be between ${this.passwordMinLength} and ${this.passwordMaxLength} characters long.`,this.userAvatarSuccessMsg="Your profile picture has been updated. Please allow 5 minutes for the change to take effect.",this.providerUnlinkMsg="Your Google account has been unlinked.",this.oldUserData={email:"",screenname:""},this.ImageHasUploaded=!1,this.providerHasUnlinked=!1,this.unlinkProviders=[]}firstUpdated(){this.oldUserData=Object.assign(this.oldUserData,{email:this.userData.email,screenname:this.userData.screenname}),this.bindEvents()}updated(e){var t,i,o,s;this.fileInput=(i=(t=this.iaPicUploader)===null||t===void 0?void 0:t.shadowRoot)===null||i===void 0?void 0:i.querySelector(".file-selector"),(e.has("userData")||e.has("selectedMailingLists"))&&(this.showLoadingIndicator=!1,this.responseFields={}),e.has("fieldsError")&&this.hasFieldError()&&(this.saveButtonDisabled=!0),e.has("apiHasExecuted")&&this.apiHasExecuted===!0&&(this.providerHasUnlinked&&(this.responseFields={...this.responseFields,fields:{unlink:this.providerUnlinkMsg,...(o=this.responseFields)===null||o===void 0?void 0:o.fields}}),this.ImageHasUploaded&&(this.responseFields={...this.responseFields,fields:{file:this.userAvatarSuccessMsg,...(s=this.responseFields)===null||s===void 0?void 0:s.fields}}),this.apiHasExecuted=!1)}bindEvents(){document.addEventListener("IAThirdPartyAuth:verifiedLogin",()=>{G("IAThirdPartyAuth:verifiedLogin"),this.lookingToAuth=!1}),window.addEventListener("scroll",tt(()=>{window.scrollY>this.offsetTop?this.isStickyHeader=!0:this.isStickyHeader=!1},50))}render(){return v`
      <main id="maincontent">
        <div class="container">
          ${this.lookingToAuth?this.verificationTemplate:this.settingsTemplate}
        </div>
      </main>
    `}setScreenname(e){const t=e.target;this.userData.screenname=t.value,this.resetErrorFields("screenname")}setEmail(e){const t=e.target;this.userData.email=t.value,this.fieldsError.email="",this.resetErrorFields("email")}setPassword(e){const t=e.target;this.userData.password=t.value,this.fieldsError.password="",this.resetErrorFields("password")}setLoanHistory(e){const t=e.target;this.loanHistoryFlag=t.checked?"public":"private",this.changeSaveButtonState()}setMailingList(e){const t=e.target,i=t.name;if(t.checked)this.selectedMailingLists.push(i);else{const o=this.selectedMailingLists.indexOf(i);this.selectedMailingLists.splice(o,1)}this.changeSaveButtonState()}setLinkedProvider(e){const t=e.target,{provider:i}=t.dataset;if(i){if(!t.checked)this.unlinkProviders.push(i);else{const o=this.unlinkProviders.indexOf(i);this.unlinkProviders.splice(o,1)}this.changeSaveButtonState()}}changeSaveButtonState(){this.saveButtonDisabled=!!this.hasFieldError()}resetErrorFields(e){let t={};e==="email"?t={...this.fieldsError,email:""}:e==="screenname"?t={...this.fieldsError,screenname:""}:t={...this.fieldsError,password:""},this.saveButtonDisabled=!1,this.fieldsError=t}hasFieldError(){return Object.values(this.fieldsError).some(e=>e!=="")}async validateScreenname(){var e;let t="";this.userData.screenname=xe(this.userData.screenname);const i=this.userData.screenname.length<3||this.userData.screenname.length>40;this.userData.screenname===""||i?t="The screen name needs to be between 3 and 40 characters long.":!((e=this.userData.screenname)===null||e===void 0)&&e.includes("\\")?t="This does not appear to be a valid screen name.":await this.isScreennameAvailable()===!1&&(t=`The screen name ${this.userData.screenname} is already taken.`),this.fieldsError={...this.fieldsError,screenname:t}}async validateEmail(){var e;let t="";this.userData.email=xe(this.userData.email);const i=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;!((e=this.userData.email)===null||e===void 0)&&e.match(i)?await this.isEmailAvailable()||(t=`${this.userData.email} is already taken.`):t="This does not appear to be a valid email address.",this.fieldsError={...this.fieldsError,email:t}}async validatePassword(){var e;const t=(e=this.userData.password)===null||e===void 0?void 0:e.length,i=t<this.passwordMinLength||t>this.passwordMaxLength;this.userData.password&&i&&(this.fieldsError={...this.fieldsError,password:this.passwordLengthMessage})}async isEmailAvailable(){var e;return this.userData.email!==((e=this.oldUserData)===null||e===void 0?void 0:e.email)?(await B({action:"email-available",email:this.userData.email})).success:!0}async isScreennameAvailable(){return this.userData.screenname!==this.oldUserData.screenname?(await B({action:"screenname-available",screenname:this.userData.screenname})).success:!0}async saveAccountSettings(e){if(this.showLoadingIndicator=!0,this.saveButtonDisabled=!0,Me(e),this.ImageHasUploaded=!1,this.providerHasUnlinked=!1,this.responseFields={},await this.validateScreenname(),await this.validateEmail(),await this.validatePassword(),this.emitProfileAvatarSaveEvent(),this.emitUnlinkProviderEvent(),!this.hasFieldError()){const t=await B({action:"save-account",identifier:this.userData.identifier,userData:this.userData,csrfToken:this.csrfToken,selectedMailingLists:this.selectedMailingLists,loanHistoryFlag:this.loanHistoryFlag});t&&(this.responseFields=t),t.success===!0&&(this.apiHasExecuted=!0),this.userData.password="",this.passwordField.value=""}setTimeout(async()=>{this.showLoadingIndicator=!1},100)}profilePictureUploaded(){this.saveButtonDisabled=!0,this.ImageHasUploaded=!0,this.apiHasExecuted=!0}emitProfileAvatarSaveEvent(){var e,t;!((t=(e=this.fileInput)===null||e===void 0?void 0:e.files)===null||t===void 0)&&t.length&&document.dispatchEvent(new Event("saveProfileAvatar"))}emitUnlinkProviderEvent(){if(Object.values(this.unlinkProviders).length===0)return u;const e=Object.values(this.unlinkProviders).filter(t=>t??u);return e&&(G(`${e} provider should be unlinked!`),document.dispatchEvent(new CustomEvent("IAThirdPartyAuth:unlinkProvider",{detail:{provider:e}})),this.providerHasUnlinked=!0,this.unlinkProviders=[],this.linkedProviders=[]),u}get verificationTemplate(){return v` <authentication-template
      authenticationType="${Object.keys(this.linkedProviders).length?"":"ia"}"
      identifier=${this.userData.identifier}
      email=${this.userData.email}
      csrfToken=${this.csrfToken}
      @ia-authenticated=${e=>{this.lookingToAuth=!1;const{token:t}=e.detail;this.dispatchEvent(new CustomEvent("ready",{detail:{mgcToken:t}}));try{localStorage.setItem("keep-authenticated","yes")}catch{}}}
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
              @fileChanged=${t=>{this.fieldsError.picture=t.detail.error,this.changeSaveButtonState()}}
              @fileUploaded=${()=>{this.profilePictureUploaded()}}
            ></ia-pic-uploader>
          </div>

          <div class="form-element ">
            <label for="screenname">
              Change screenname
            </label>
            <div class="input-note">
              Changing your screenname will not change your user id.<br />
              You cannot re-use a screenname once it has been changed.
            </div>
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
              Change email
            </label>
            <div class="input-note">
              After changing your email address, items you've uploaded will no longer be associated with your account.<br />
              You cannot re-use an email address once it has been changed.
            </div>
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
              ${this.showPassword?Oe:Ue}
            </button>
            <span class="error-field">${this.fieldsError.password}</span>
          </div>
          <div>
            <slot name="center-of-form"></slot>
          <div>
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
          please do so before deleting your account.
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
      @click=${async()=>{this.showLoadingIndicator=!0,(await B({action:"delete-account",confirmDelete:this.confirmDelete,csrfToken:this.csrfToken})).success&&(window.location.href=window.location.pathname.startsWith("/demo/")?"/demo/":"/")}}
    >
      ${this.showLoadingIndicator?this.loadingIndicatorTemplate:"Delete account"}
    </button>`}get adminFunctionsTemplate(){return v`<div class="col-md-4">
      <div class="form-element admin-functions">
        <h2>Admin functions</h2>
        <hr />
        <ul>
          <li>
            <a href="https://catalogd.archive.org/control/setadmin.php"
              >Grant or revoke administrator privileges</a
            >
          </li>
          <li>
            <a href="https://catalogd.archive.org/control/useradmin.php"
              >User Administration</a
            >
          </li>
          <li>
            <a href="https://archive.org/iathreads/forum-new.php"
              >Make a new Forum</a
            >
          </li>
        </ul>
      </div>
    </div>`}static get styles(){return[Re,He,l`
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

        slot[name='center-of-form'] {
          display: flex;
          align-items: center;
        }

        ::slotted(#form-center) {
          margin-bottom: 15px;
          display: flex;
        }
      `]}};a([y({type:Object})],f.prototype,"userData",void 0);a([y({type:Object})],f.prototype,"mailingLists",void 0);a([y({type:Array})],f.prototype,"selectedMailingLists",void 0);a([y({type:Array})],f.prototype,"linkedProviders",void 0);a([y({type:String})],f.prototype,"profilePicture",void 0);a([y({type:String})],f.prototype,"loanHistoryFlag",void 0);a([y({type:String})],f.prototype,"csrfToken",void 0);a([b()],f.prototype,"fileInput",void 0);a([b()],f.prototype,"fieldsError",void 0);a([b()],f.prototype,"attemptToDelete",void 0);a([b()],f.prototype,"confirmDelete",void 0);a([b()],f.prototype,"responseFields",void 0);a([b()],f.prototype,"saveButtonDisabled",void 0);a([b()],f.prototype,"lookingToAuth",void 0);a([b()],f.prototype,"showLoadingIndicator",void 0);a([b()],f.prototype,"isStickyHeader",void 0);a([b()],f.prototype,"showPassword",void 0);a([b()],f.prototype,"apiHasExecuted",void 0);a([k("ia-pic-uploader")],f.prototype,"iaPicUploader",void 0);a([k("#password")],f.prototype,"passwordField",void 0);f=a([he("ia-account-settings")],f);const At="ml_best_of",Et="ml_events",St="ml_donors",Ct={ML_BEST_OF:{key:At,name:"Best of the Archive",interest_id:"e7594f8604",selected_by_default:!0,public:!0,short_desc:"Useful resources, unique stories, and fun finds from our collections"},ML_EVENTS:{key:Et,name:"Event Notices",interest_id:"98cc7bf635",selected_by_default:!1,public:!0,short_desc:"Invitations to and news about our events"},ML_DONORS:{key:St,name:"Donor Communications",interest_id:"ff44b81002",selected_by_default:!1,public:!0,short_desc:"Information about how your donations are being used."}},Tt={identifier:"@neerajksharma453_gmail_com",screenname:"neeraj-archive",email:"neerajksharma453@gmail.com",password:"",isAdmin:!1},Lt=["ml_best_of","ml_donors"],It=["google"];Be(v`
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
      <div slot="center-of-form" id="form-center">
        <button id="random-size-color" @click=${()=>{const r=Math.floor(Math.random()*16777215).toString(16),e=Math.floor(Math.random()*100)+50;document.getElementById("form-center").style.backgroundColor=`#${r}`,document.getElementById("form-center").style.height=`${e}px`}}>Click to change height</button>

        <button id="random-size-color" @click=${()=>{const r=document.getElementById("form-center");r.parentNode.removeChild(r)}}>Click to delete slotted content</button>
      </div>
      </ia-account-settings>`,document.querySelector("#demo"));
