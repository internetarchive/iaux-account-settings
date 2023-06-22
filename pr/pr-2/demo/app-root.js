(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=window,ae=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),ce=new WeakMap;let Ee=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(ae&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ce.set(t,e))}return e}toString(){return this.cssText}};const He=s=>new Ee(typeof s=="string"?s:s+"",void 0,le),c=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,o,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[r+1],s[0]);return new Ee(t,s,le)},ze=(s,e)=>{ae?s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=N.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)})},he=ae?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return He(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var q;const j=window,pe=j.trustedTypes,Ne=pe?pe.emptyScript:"",ue=j.reactiveElementPolyfillSupport,se={toAttribute(s,e){switch(e){case Boolean:s=s?Ne:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Se=(s,e)=>e!==s&&(e==e||s==s),Z={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:Se};let T=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Z}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(he(o))}else e!==void 0&&t.push(he(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return ze(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=Z){var o;const r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:se).toAttribute(t,i.type);this._$El=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,r=o._$Ev.get(e);if(r!==void 0&&this._$El!==r){const n=o.getPropertyOptions(r),h=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:se;this._$El=r,this[r]=h.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Se)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,r)=>this[r]=o),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};T.finalized=!0,T.elementProperties=new Map,T.elementStyles=[],T.shadowRootOptions={mode:"open"},ue==null||ue({ReactiveElement:T}),((q=j.reactiveElementVersions)!==null&&q!==void 0?q:j.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W;const V=window,P=V.trustedTypes,ve=P?P.createPolicy("lit-html",{createHTML:s=>s}):void 0,ne="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,Ce="?"+x,je=`<${Ce}>`,L=document,R=()=>L.createComment(""),M=s=>s===null||typeof s!="object"&&typeof s!="function",Le=Array.isArray,Ve=s=>Le(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,me=/>/g,S=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ge=/'/g,be=/"/g,Te=/^(?:script|style|textarea|title)$/i,Pe=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),v=Pe(1),Ie=Pe(2),I=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ye=new WeakMap,C=L.createTreeWalker(L,129,null,!1),Ge=(s,e)=>{const t=s.length-1,i=[];let o,r=e===2?"<svg>":"",n=B;for(let l=0;l<t;l++){const d=s[l];let w,p,m=-1,$=0;for(;$<d.length&&(n.lastIndex=$,p=n.exec(d),p!==null);)$=n.lastIndex,n===B?p[1]==="!--"?n=fe:p[1]!==void 0?n=me:p[2]!==void 0?(Te.test(p[2])&&(o=RegExp("</"+p[2],"g")),n=S):p[3]!==void 0&&(n=S):n===S?p[0]===">"?(n=o??B,m=-1):p[1]===void 0?m=-2:(m=n.lastIndex-p[2].length,w=p[1],n=p[3]===void 0?S:p[3]==='"'?be:ge):n===be||n===ge?n=S:n===fe||n===me?n=B:(n=S,o=void 0);const H=n===S&&s[l+1].startsWith("/>")?" ":"";r+=n===B?d+je:m>=0?(i.push(w),d.slice(0,m)+ne+d.slice(m)+x+H):d+x+(m===-2?(i.push(void 0),l):H)}const h=r+(s[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ve!==void 0?ve.createHTML(h):h,i]};class O{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0;const h=e.length-1,l=this.parts,[d,w]=Ge(e,t);if(this.el=O.createElement(d,i),C.currentNode=this.el.content,t===2){const p=this.el.content,m=p.firstChild;m.remove(),p.append(...m.childNodes)}for(;(o=C.nextNode())!==null&&l.length<h;){if(o.nodeType===1){if(o.hasAttributes()){const p=[];for(const m of o.getAttributeNames())if(m.endsWith(ne)||m.startsWith(x)){const $=w[n++];if(p.push(m),$!==void 0){const H=o.getAttribute($.toLowerCase()+ne).split(x),z=/([.?@])?(.*)/.exec($);l.push({type:1,index:r,name:z[2],strings:H,ctor:z[1]==="."?Ze:z[1]==="?"?Ye:z[1]==="@"?Ke:G})}else l.push({type:6,index:r})}for(const m of p)o.removeAttribute(m)}if(Te.test(o.tagName)){const p=o.textContent.split(x),m=p.length-1;if(m>0){o.textContent=P?P.emptyScript:"";for(let $=0;$<m;$++)o.append(p[$],R()),C.nextNode(),l.push({type:2,index:++r});o.append(p[m],R())}}}else if(o.nodeType===8)if(o.data===Ce)l.push({type:2,index:r});else{let p=-1;for(;(p=o.data.indexOf(x,p+1))!==-1;)l.push({type:7,index:r}),p+=x.length-1}r++}}static createElement(e,t){const i=L.createElement("template");return i.innerHTML=e,i}}function D(s,e,t=s,i){var o,r,n,h;if(e===I)return e;let l=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const d=M(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==d&&((r=l==null?void 0:l._$AO)===null||r===void 0||r.call(l,!1),d===void 0?l=void 0:(l=new d(s),l._$AT(s,t,i)),i!==void 0?((n=(h=t)._$Co)!==null&&n!==void 0?n:h._$Co=[])[i]=l:t._$Cl=l),l!==void 0&&(e=D(s,l._$AS(s,e.values),l,i)),e}class qe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:L).importNode(i,!0);C.currentNode=r;let n=C.nextNode(),h=0,l=0,d=o[0];for(;d!==void 0;){if(h===d.index){let w;d.type===2?w=new U(n,n.nextSibling,this,e):d.type===1?w=new d.ctor(n,d.name,d.strings,this,e):d.type===6&&(w=new Je(n,this,e)),this._$AV.push(w),d=o[++l]}h!==(d==null?void 0:d.index)&&(n=C.nextNode(),h++)}return C.currentNode=L,r}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class U{constructor(e,t,i,o){var r;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(r=o==null?void 0:o.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=D(this,e,t),M(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==I&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Ve(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==u&&M(this._$AH)?this._$AA.nextSibling.data=e:this.$(L.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=O.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(i);else{const n=new qe(r,this),h=n.u(this.options);n.v(i),this.$(h),this._$AH=n}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new O(e)),t}T(e){Le(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new U(this.k(R()),this.k(R()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class G{constructor(e,t,i,o,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let n=!1;if(r===void 0)e=D(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==I,n&&(this._$AH=e);else{const h=e;let l,d;for(e=r[0],l=0;l<r.length-1;l++)d=D(this,h[i+l],t,l),d===I&&(d=this._$AH[l]),n||(n=!M(d)||d!==this._$AH[l]),d===u?e=u:e!==u&&(e+=(d??"")+r[l+1]),this._$AH[l]=d}n&&!o&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ze extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}const We=P?P.emptyScript:"";class Ye extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==u?this.element.setAttribute(this.name,We):this.element.removeAttribute(this.name)}}class Ke extends G{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=D(this,e,t,0))!==null&&i!==void 0?i:u)===I)return;const o=this._$AH,r=e===u&&o!==u||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==u&&(o===u||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Je{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}}const we=V.litHtmlPolyfillSupport;we==null||we(O,U),((W=V.litHtmlVersions)!==null&&W!==void 0?W:V.litHtmlVersions=[]).push("2.7.4");const De=(s,e,t)=>{var i,o;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let n=r._$litPart$;if(n===void 0){const h=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;r._$litPart$=n=new U(e.insertBefore(R(),h),h,void 0,t??{})}return n._$AI(s),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var K,J;class E extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=De(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return I}}E.finalized=!0,E._$litElement$=!0,(K=globalThis.litElementHydrateSupport)===null||K===void 0||K.call(globalThis,{LitElement:E});const $e=globalThis.litElementPolyfillSupport;$e==null||$e({LitElement:E});((J=globalThis.litElementVersions)!==null&&J!==void 0?J:globalThis.litElementVersions=[]).push("3.3.2");function a(s,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,e,t,i);else for(var h=s.length-1;h>=0;h--)(n=s[h])&&(r=(o<3?n(r):o>3?n(e,t,r):n(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=s=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(s,e):((t,i)=>{const{kind:o,elements:r}=i;return{kind:o,elements:r,finisher(n){customElements.define(t,n)}}})(s,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=(s,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,s)}};function y(s){return(e,t)=>t!==void 0?((i,o,r)=>{o.constructor.createProperty(r,i)})(s,e,t):Qe(s,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(s){return y({...s,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=({finisher:s,descriptor:e})=>(t,i)=>{var o;if(i===void 0){const r=(o=t.originalKey)!==null&&o!==void 0?o:t.key,n=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return s!=null&&(n.finisher=function(h){s(h,r)}),n}{const r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),s==null||s(r,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(s,e){return Xe({descriptor:t=>{const i={get(){var o,r;return(r=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(s))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const o=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,n;return this[o]===void 0&&(this[o]=(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(s))!==null&&n!==void 0?n:null),this[o]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Q;((Q=window.HTMLSlotElement)===null||Q===void 0?void 0:Q.prototype.assignedElements)!=null;const A=location.hostname==="localhost"||location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||location.host.match(/\.code\.archive\.org$/)||location.host.match(/\.dev\.archive\.org$/)||location.host.match(/^ia-petabox-/)?console.log.bind(console):()=>{};async function F(s){var e;const t={action:null,identifier:"",userData:{},selectedMailingLists:[],baseHost:"/account/index.php",headers:{},...s};A(t);let i=t.baseHost,o={},r=new FormData;r.append("action",t.action),r.append("email",t.email),r.append("identifier",t.identifier),r.append("screenname",t.screenname),t.action==="verify-password"?r.append("password",t.password):t.action==="delete-account"?r.append("delete-confirm",t.confirmDelete):t.action==="save-account"?(r.append("userData",JSON.stringify(t.userData)),r.append("selectedMailingLists",t.selectedMailingLists),r.append("loanHistoryFlag",t.loanHistoryFlag)):t.action==="save-file"&&(r=t.file,i=`${t.endpoint}?${t.getParam}`),((e=window==null?void 0:window.location)===null||e===void 0?void 0:e.pathname)==="/demo/"&&(i="/demo/");try{await fetch(i,{mode:"no-cors",method:"POST",headers:t.headers,body:r}).then(n=>(A("response - ",n),i==="/demo/"?t.action==="screenname-available"&&t.screenname==="neeraj-archive"?{success:!1,error:"This screen name is already being used by another user."}:{success:!0,updatedFields:{screenname:"Your screen name has been updated successfully.",mailing_lists:"Mailing lists has been updated!"}}:n.json())).then(n=>{o=n})}catch{}return o}async function Be(s,e){const t=e;(t==null?void 0:t.type)==="password"?t.type="text":t.type="password"}function Fe(s){s==null||s.preventDefault(),s==null||s.stopPropagation()}function ke(s){var e;return(e=s==null?void 0:s.replace("/s+/"," "))===null||e===void 0?void 0:e.trim()}function et(s,e){let t=!1;return()=>{t||(s(),t=!0,setTimeout(()=>{t=!1},e))}}const Re=c`
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
    border-left: 5px solid green;
    margin: 1.5rem 0;
    width: fit-content;
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
`,_e=c`var(--white, #fff)`,tt=c`var(--primaryDisableCTAFill, #767676)`,it=c`var(--secondaryCTABorder, #999)`,ot=c`var(--primaryCTAFill, #194880)`,X=c`var(--primaryCTAFillRGB, 25, 72, 128)`,rt=c`var(--primaryCTABorder, #c5d1df)`,st=c`var(--primaryErrorCTAFill, #d9534f)`,ee=c`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,nt=c`var(--primaryErrorCTABorder, #d43f3a)`,at=c`var(--secondaryCTAFill, #333)`,te=c`var(--secondaryCTAFillRGB, 51, 51, 51)`,lt=c`var(--primaryCTABorder, #979797)`,dt=c`#ee8950`,ct=c`#ec7939`,Me=c`
  .ia-button {
    height: 3.5rem;
    min-height: 3rem;
    cursor: pointer;
    color: ${_e};
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
    outline-color: ${_e};
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
    background-color: ${tt};
    border: 1px solid ${it};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${dt}
    border-color: ${ct};
  }

  .ia-button.primary {
    background-color: ${ot};
    border-color: ${rt};
  }
  .ia-button.primary:hover {
    background-color: rgba(${X}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${X}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${X}, 0.7);
  }

  .ia-button.danger {
    background-color: ${st};
    border-color: ${nt};
  }
  .ia-button.danger:hover {
    background-color: rgba(${ee}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${ee}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${ee}, 0.7);
  }

  .ia-button.dark {
    background-color: ${at};
    border-color: ${lt};
  }
  .ia-button.dark:hover {
    background-color: rgba(${te}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${te}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${te}, 0.7);
  }
`,ht=Object.freeze({processing:"processing",complete:"complete"});class pt extends E{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=ht.processing}render(){return v`
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
    `}}window.customElements.define("ia-activity-indicator",pt);const Ae=c`var(--white, #fff)`,ut=c`var(--primaryDisableCTAFill, #767676)`,vt=c`var(--secondaryCTABorder, #999)`,ft=c`var(--primaryCTAFill, #194880)`,ie=c`var(--primaryCTAFillRGB, 25, 72, 128)`,mt=c`var(--primaryCTABorder, #c5d1df)`,gt=c`var(--primaryErrorCTAFill, #d9534f)`,oe=c`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,bt=c`var(--primaryErrorCTABorder, #d43f3a)`,yt=c`var(--secondaryCTAFill, #333)`,re=c`var(--secondaryCTAFillRGB, 51, 51, 51)`,wt=c`var(--primaryCTABorder, #979797)`,$t=c`#ee8950`,kt=c`#ec7939`,_t=c`
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
    padding: 0 3rem;
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
    background-color: ${ut};
    border: 1px solid ${vt};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${$t}
    border-color: ${kt};
  }

  .ia-button.primary {
    background-color: ${ft};
    border-color: ${mt};
  }
  .ia-button.primary:hover {
    background-color: rgba(${ie}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${ie}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${ie}, 0.7);
  }

  .ia-button.danger {
    background-color: ${gt};
    border-color: ${bt};
  }
  .ia-button.danger:hover {
    background-color: rgba(${oe}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${oe}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${oe}, 0.7);
  }

  .ia-button.dark {
    background-color: ${yt};
    border-color: ${wt};
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
`;async function xe(s){var e;const t={action:null,identifier:"",file:null,getParam:"",endpoint:"",headers:{},callback(){},...s};let i={},o="";const r=window==null?void 0:window.location;(r==null?void 0:r.pathname)==="/demo/"?o="/demo/":o=`${t.endpoint}?${t.getParam}`;try{await fetch(o,{mode:"no-cors",method:"POST",headers:t.headers,body:(e=t.file)!==null&&e!==void 0?e:null}).then(n=>{if(console.log("response",n),o==="/demo/"&&t.action==="verify-upload")return{success:!0,item_last_updated:1};if(t.action==="save-file"&&n.status===200&&t.callback(n),n.status!==0)return n.json()}).then(n=>{console.log("data",n),t.action==="save-file"&&console.log("file saved, metadata call started to verify is picture is upadated!"),i=n})}catch(n){console.log(n)}return i}let b=class extends E{constructor(){super(...arguments),this.identifier="",this.endpoint="/services/post-file.php",this.picture="",this.type="compact",this.lookingAtMyAccount=!1,this.taskStatus="",this.fileValidationError="",this.showDropper=!1}firstUpdated(){this.renderInput(),this.lookingAtMyAccount&&this.bindEvents()}renderInput(){var e,t,i;const o=document.createElement("input");o.type="file",o.accept="image/*",o.multiple=!1,(e=this.profileSection)===null||e===void 0||e.addEventListener("mouseenter",()=>{var r;(r=this.profileSection)===null||r===void 0||r.classList.add("hover-class")}),(t=this.dropRegion)===null||t===void 0||t.addEventListener("click",()=>{o.click()}),(i=this.uploadRegion)===null||i===void 0||i.addEventListener("click",()=>{o.click()}),o.addEventListener("change",()=>{const{files:r}=o;this.handleSelectedFiles(r)})}bindEvents(){var e,t,i,o,r,n,h;window.addEventListener("dragover",l=>{var d,w;(d=this.selfSubmitEle)===null||d===void 0||d.classList.remove("hidden"),(w=this.selfSubmitEle)===null||w===void 0||w.classList.add("drag-over"),this.preventDefault(l)},!1),(e=this.dropRegion)===null||e===void 0||e.addEventListener("dragenter",this.preventDefault,!1),(t=this.dropRegion)===null||t===void 0||t.addEventListener("dragleave",this.preventDefault,!1),(i=this.dropRegion)===null||i===void 0||i.addEventListener("dragover",this.preventDefault,!1),(o=this.dropRegion)===null||o===void 0||o.addEventListener("drop",this.handleDropImage.bind(this),!1),(r=this.selfSubmitEle)===null||r===void 0||r.addEventListener("drop",this.handleDropImage.bind(this),!1),(n=this.saveFile)===null||n===void 0||n.addEventListener("submit",this.handleSaveFile.bind(this),!1),(h=this.fileSelector)===null||h===void 0||h.addEventListener("change",()=>{const{files:l}=this.fileSelector;this.handleSelectedFiles(l)}),document==null||document.addEventListener("saveProfileAvatar",l=>{var d;!((d=this.fileSelector)===null||d===void 0)&&d.files.length&&this.handleSaveFile(l)})}preventDefault(e){e.preventDefault(),e.stopPropagation()}handleDropImage(e){var t,i;if(this.preventDefault(e),(t=this.selfSubmitEle)===null||t===void 0||t.classList.remove("drag-over"),!this.showLoadingIndicator){const o=(i=e==null?void 0:e.dataTransfer)===null||i===void 0?void 0:i.files;o!=null&&o.length&&this.handleSelectedFiles(o)}}previewImage(e){var t,i;this.showDropper=!0;let o;this.type==="full"?o=document.createElement("img"):o=(t=this.dropRegion)===null||t===void 0?void 0:t.querySelector("img"),o.alt="profile picture";const r=new FileReader;if(r.onload=n=>{var h;o.src=(h=n.target)===null||h===void 0?void 0:h.result},this.type==="full"){const n=(i=this.selfSubmitEle)===null||i===void 0?void 0:i.querySelector(".full-preview");n==null||n.appendChild(o)}r.readAsDataURL(e),this.dispatchEvent(new Event("fileChanged"))}validateImage(e){this.fileValidationError="";const t=["image/jpeg","image/png","image/gif"],i=5*1024*1024;return t.indexOf(e.type)===-1?(this.fileValidationError="file must be  format of JPEG or PNG or GIF.",!1):e.size>i?(this.fileValidationError="file size must be less than 5MB.",!1):!0}async handleSelectedFiles(e){var t,i;const o=(t=this.selfSubmitEle)===null||t===void 0?void 0:t.querySelector(".image-preview");if(this.type==="full"&&((i=this.selfSubmitEle)===null||i===void 0||i.classList.remove("hidden")),e.length&&this.validateImage(e[0])){if(this.type==="full")for(;o!=null&&o.firstChild&&o.removeChild(o.firstChild););await this.previewImage(e[0]),this.fileSelector&&(this.fileSelector.files=e)}else for(e.length||this.cancelFile();o!=null&&o.firstChild&&o.removeChild(o.firstChild););}async handleSaveFile(e){var t,i;this.preventDefault(e),this.showLoadingIndicator=!0,(t=this.selfSubmitEle)===null||t===void 0||t.classList.add("vertical-center");const o=(i=this.fileSelector)===null||i===void 0?void 0:i.files[0],r=`identifier=${this.identifier}&fname=${encodeURIComponent(o.name)}&submit=1`;await xe({action:"save-file",identifier:this.identifier,file:o,getParam:r,endpoint:this.endpoint,headers:{"Content-type":"multipart/form-data; charset=UTF-8"},callback:async()=>{console.log("callback invoked!",this.type),this.type==="full"&&await this.metadataAPIExecution()}}),this.dispatchEvent(new Event("fileUploaded")),this.type==="compact"&&(this.showLoadingIndicator=!1),this.fileSelector&&(this.fileSelector.value="")}metadataAPIExecution(){const e=Math.round(Date.now()/1e3),t=setInterval(async()=>{xe({action:"verify-upload",endpoint:`/metadata/${this.identifier}?rand=${Math.random()}`}).then(o=>{const r=o.pending_tasks&&o.tasks?o.tasks.length:0;r?o.tasks.filter(h=>h.wait_admin===2).length?(this.taskStatus="status task failure -- an admin will need to resolve",clearInterval(t)):this.taskStatus=`waiting for your ${r} tasks to finish`:o.item_last_updated<e?this.taskStatus="waiting for your tasks to queue":(console.log("task(s) done!"),clearInterval(t),this.taskStatus="reloading page with your image",window.location.reload())})},2e3)}cancelFile(){var e,t,i;const o=(e=this.selfSubmitEle)===null||e===void 0?void 0:e.querySelector(".image-preview");for(this.fileSelector&&(this.fileSelector.value=""),this.showDropper=!1,this.showLoadingIndicator=!1,this.fileValidationError="",(t=this.selfSubmitEle)===null||t===void 0||t.classList.add("hidden"),(i=this.profileSection)===null||i===void 0||i.classList.remove("hover-class");o!=null&&o.firstChild&&o.removeChild(o.firstChild););}get loadingIndicatorTemplate(){return v` <ia-activity-indicator
      mode="processing"
      class="go-button-loading-icon"
    ></ia-activity-indicator>`}get plusIconTemplate(){return v`<div
      class="plusIcon ${this.showLoadingIndicator?"pointer-none":""}"
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
        <div
          class="validationErrorDiv"
          style="display:${this.fileValidationError===""?"none":"block"}"
        >
          <span class="fileValidationError">${this.fileValidationError}</span>
        </div>
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
    `}get getSelectFileTemplate(){return v`
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
    `}get getOverlayIcon(){return v`
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
        ${this.type==="compact"?this.getOverlayIcon:u}
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
      ${this.type==="compact"?this.getSelectFileTemplate:u}
    `}static get styles(){return c`
      ${_t}

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

      .plusIcon {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }

      .plusIcon span {
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

      .validationErrorDiv {
        margin: 5px 0;
      }

      .validationErrorDiv .fileValidationError {
        text-align: center;
        word-wrap: unset;
        overflow: hidden;
        line-height: 1.4rem;
        font-size: 1.1rem;
        font-weight: bold;
        color: #f00;
        display: -webkit-box;
        -webkit-line-clamp: 2;
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
    `}};a([y({type:String})],b.prototype,"identifier",void 0);a([y({type:String})],b.prototype,"endpoint",void 0);a([y({type:String})],b.prototype,"picture",void 0);a([y({type:String})],b.prototype,"type",void 0);a([y({type:Boolean})],b.prototype,"lookingAtMyAccount",void 0);a([g()],b.prototype,"showLoadingIndicator",void 0);a([g()],b.prototype,"taskStatus",void 0);a([g()],b.prototype,"fileValidationError",void 0);a([g()],b.prototype,"showDropper",void 0);a([_("#drop-region")],b.prototype,"dropRegion",void 0);a([_("#upload-region")],b.prototype,"uploadRegion",void 0);a([_(".profile-section")],b.prototype,"profileSection",void 0);a([_("#save-file")],b.prototype,"saveFile",void 0);a([_(".self-submit-form")],b.prototype,"selfSubmitEle",void 0);a([_(".file-selector")],b.prototype,"fileSelector",void 0);b=a([de("ia-pic-uploader")],b);const Oe=Ie`
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
  </svg>`,Ue=Ie`
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
  </svg>`;let k=class extends E{constructor(){super(...arguments),this.authenticationType="ia",this.identifier="",this.email="",this.showPassword=!1,this.password="",this.passwordError=""}async verifyIAPassword(e){var t,i;if(Fe(e),!this.password){(t=this.passwordField)===null||t===void 0||t.focus(),this.passwordError=" * password can't be empty";return}this.showLoadingIndicator=!0,(await F({action:"verify-password",identifier:this.identifier,password:this.password})).success===!0?this.dispatchEvent(new Event("ia-authenticated")):((i=this.passwordField)===null||i===void 0||i.focus(),this.passwordError=" * invalid password"),this.showLoadingIndicator=!1}setPassword(e){const t=e.target;this.password=t.value,this.passwordError=""}get iaPasswordVerification(){return v`
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
          @click="${e=>{Be(e,this.passwordField),this.showPassword=!this.showPassword}}"
        >
          ${this.showPassword?Ue:Oe}
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
    `}static get styles(){return[Re,Me,c`
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
      `]}};a([y({type:String})],k.prototype,"authenticationType",void 0);a([y({type:String})],k.prototype,"identifier",void 0);a([y({type:String})],k.prototype,"email",void 0);a([g()],k.prototype,"showLoadingIndicator",void 0);a([g()],k.prototype,"showPassword",void 0);a([g()],k.prototype,"password",void 0);a([g()],k.prototype,"passwordError",void 0);a([_(".password")],k.prototype,"passwordField",void 0);k=a([de("authentication-template")],k);let f=class extends E{constructor(){super(...arguments),this.userData={},this.selectedMailingLists=[""],this.profilePicture="",this.loanHistoryFlag="",this.linkedProviders={},this.profileCsrfToken="",this.fieldsError={},this.confirmDelete=!1,this.updatedFields={},this.saveButtonDisabled=!0,this.lookingToAuth=!0,this.isStickyHeader=!1,this.showPassword=!1,this.passwordMinLength=3,this.passwordMaxLength=100,this.passwordLengthMessage=`The password needs to be between ${this.passwordMinLength} and ${this.passwordMaxLength} characters long.`,this.userAvatarSuccessMsg="Your profile picture has been updated. Please allow 5 minutes for the change to take effect.",this.providerUnlinkMsg="The third party provider has unlinked.",this.oldUserData={email:"",screenname:""},this.unlinkProviders={}}firstUpdated(){this.oldUserData=Object.assign(this.oldUserData,{email:this.userData.email,screenname:this.userData.screenname}),this.bindEvents()}updated(e){var t,i;this.fileInput=(i=(t=this.iaPicUploader)===null||t===void 0?void 0:t.shadowRoot)===null||i===void 0?void 0:i.querySelector(".file-selector"),(e.has("userData")||e.has("selectedMailingLists"))&&(this.showLoadingIndicator=!1,this.updatedFields={}),e.has("fieldsError")&&this.hasFieldError()&&(A("buttton keep disabled"),this.saveButtonDisabled=!0)}bindEvents(){document.addEventListener("IAThirdPartyAuth:verifiedLogin",()=>{A("IAThirdPartyAuth:verifiedLogin"),this.lookingToAuth=!1}),window.addEventListener("scroll",et(()=>{window.scrollY>this.offsetTop?(this.isStickyHeader=!0,A("sticky header")):(this.isStickyHeader=!1,A("non-sticky header"))},50))}render(){return v`
      <main id="maincontent">
        <div class="container">
          ${this.lookingToAuth?this.verificationTemplate:this.settingsTemplate}
        </div>
      </main>
    `}setScreenname(e){const t=e.target;this.userData.screenname=t.value,this.resetErrorFields("screenname")}setEmail(e){const t=e.target;this.userData.email=t.value,this.fieldsError.email="",this.resetErrorFields("email")}setPassword(e){const t=e.target;this.userData.password=t.value,this.fieldsError.password="",this.resetErrorFields("password")}setBorrowHistory(e){const t=e.target;this.loanHistoryFlag=t.checked?"public":"private",this.changeSaveButtonState()}setMailingList(e){const t=e.target,i=t.name;if(t.checked)this.selectedMailingLists.push(i);else{const o=this.selectedMailingLists.indexOf(i);this.selectedMailingLists.splice(o,1)}this.changeSaveButtonState()}setLinkedProvider(e){const t=e.target,{provider:i}=t.dataset;i&&(t.checked?this.unlinkProviders[i]=!1:this.unlinkProviders[i]=!0,this.changeSaveButtonState())}changeSaveButtonState(){this.saveButtonDisabled=!!this.hasFieldError()}resetErrorFields(e){let t={};e==="email"?t={...this.fieldsError,email:""}:e==="screenname"?t={...this.fieldsError,screenname:""}:t={...this.fieldsError,password:""},this.saveButtonDisabled=!1,this.fieldsError=t}hasFieldError(){return Object.values(this.fieldsError).some(e=>e!=="")}async validateScreenname(){var e;let t="";this.userData.screenname=ke(this.userData.screenname);const i=this.userData.screenname.length<3||this.userData.screenname.length>127;this.userData.screenname===""||i?t="The screen name needs to be between 3 and 127 characters long.":!((e=this.userData.screenname)===null||e===void 0)&&e.includes("\\")?t="This does not appear to be a valid screen name.":await this.isScreennameAvailable()===!1&&(t=`The screen name ${this.userData.screenname} is already taken.`),this.fieldsError={...this.fieldsError,screenname:t}}async validateEmail(){var e;let t="";this.userData.email=ke(this.userData.email);const i=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;!((e=this.userData.email)===null||e===void 0)&&e.match(i)?await this.isEmailAvailable()||(t=`${this.userData.email} is already taken.`):t="This does not appear to be a valid email address.",this.fieldsError={...this.fieldsError,email:t}}async validatePassword(){var e;const t=(e=this.userData.password)===null||e===void 0?void 0:e.length,i=t<this.passwordMinLength||t>this.passwordMaxLength;this.userData.password&&i&&(this.fieldsError={...this.fieldsError,password:this.passwordLengthMessage})}async isEmailAvailable(){var e;return this.userData.email!==((e=this.oldUserData)===null||e===void 0?void 0:e.email)?(await F({action:"email-available",email:this.userData.email})).success:!0}async isScreennameAvailable(){return this.userData.screenname!==this.oldUserData.screenname?(await F({action:"screenname-available",screenname:this.userData.screenname})).success:!0}async saveAccountSettings(e){if(this.showLoadingIndicator=!0,this.saveButtonDisabled=!0,Fe(e),await this.validateScreenname(),await this.validateEmail(),await this.validatePassword(),this.emitProfileAvatarSaveEvent(),this.emitUnlinkProviderEvent(),!this.hasFieldError()){const t=await F({action:"save-account",identifier:this.userData.identifier,userData:this.userData,selectedMailingLists:this.selectedMailingLists,loanHistoryFlag:this.loanHistoryFlag});t.success&&t.updatedFields&&(this.updatedFields=t.updatedFields,setTimeout(()=>{this.scrollIntoView()},100))}setTimeout(async()=>{this.showLoadingIndicator=!1},100)}profilePictureUploaded(){this.saveButtonDisabled=!0,this.updatedFields={...this.updatedFields,file:this.userAvatarSuccessMsg}}emitProfileAvatarSaveEvent(){var e,t;!((t=(e=this.fileInput)===null||e===void 0?void 0:e.files)===null||t===void 0)&&t.length&&(A("profile avatar should be updated!"),document.dispatchEvent(new Event("saveProfileAvatar")))}emitUnlinkProviderEvent(){if(Object.keys(this.unlinkProviders).length===0)return u;const e=Object.keys(this.unlinkProviders).filter(t=>t??u);return e&&(A(`${e} provider should be unlinked!`),document.dispatchEvent(new CustomEvent("IAThirdPartyAuth:unlinkProvider",{detail:{provider:e}})),this.updatedFields={...this.updatedFields,unlink:this.providerUnlinkMsg}),u}get verificationTemplate(){return v` <authentication-template
      authenticationType="${Object.keys(this.linkedProviders).length?"":"ia"}"
      identifier=${this.userData.identifier}
      email=${this.userData.email}
      @ia-authenticated=${()=>{this.lookingToAuth=!1;try{localStorage.setItem("keep-authenticated","yes")}catch{}}}
    >
      <slot name="ia-google-login"></slot>
    </authentication-template>`}get settingsTemplate(){return v`<div
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
            @click=${e=>{this.saveAccountSettings(e)}}
            .disabled=${this.saveButtonDisabled}
          >
            ${this.showLoadingIndicator?this.loadingIndicatorTemplate:"Save changes"}
          </button>
        </div>

        <div class="body-content">
          <div class="form-element data-updated">
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
              @click="${e=>{Be(e,this.passwordField),this.showPassword=!this.showPassword}}"
            >
              ${this.showPassword?Ue:Oe}
            </button>
            <span class="error-field">${this.fieldsError.password}</span>
          </div>

          <div class="form-element">
            <label>Set borrow history</label>
            <input
              type="checkbox"
              id="borrow-history"
              name="borrow-history"
              .checked=${this.loanHistoryFlag==="public"||this.loanHistoryFlag===!0}
              @click=${this.setBorrowHistory}
            />
            <label for="borrow-history"> Visible to the public</label>
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
    </div>`}get getResponseTemplate(){var e;return(e=Object.values(this.updatedFields))===null||e===void 0?void 0:e.map(t=>v`<span class="success-field">&#10003; ${t}</span>`)}get mailingListsTemplate(){return this.mailingLists?Object.entries(this.mailingLists).map(e=>e[1].public?v`<input
          type="checkbox"
          id="${e[1].key}"
          name="${e[1].key}"
          @click=${this.setMailingList}
          .checked=${Object.values(this.selectedMailingLists).includes(e[1].key)}
        />
        <label for="${e[1].key}">
          ${e[1].name}: ${e[1].short_desc}</label
        ><br /> `:u):u}get linkedAccountTemplate(){var e;return(e=Object.keys(this.linkedProviders))===null||e===void 0?void 0:e.map(t=>this.linkedProviders[t]===!1?v`You have no linked accounts`:v` <input
          name="ia-${t}"
          id="ia-${t}"
          type="checkbox"
          data-provider=${t}
          .checked=${this.linkedProviders[t]===!0}
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
        <p for="borrow-history">This action cannot be reversed.</p>
        ${this.getDeleteButton}
      </div>
    `}get getDeleteButton(){return v`<button
      id="delete-button"
      class="ia-button danger ${this.showLoadingIndicator?"pointer-none":""}"
      type="button"
      ?disabled=${!this.confirmDelete}
      @click=${async()=>{this.showLoadingIndicator=!0,(await F({action:"delete-account",confirmDelete:this.confirmDelete})).success&&window.location.reload()}}
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
    </div>`}static get styles(){return[Me,Re,c`
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
      `]}};a([y({type:Object})],f.prototype,"userData",void 0);a([y({type:Object})],f.prototype,"mailingLists",void 0);a([y({type:Array})],f.prototype,"selectedMailingLists",void 0);a([y({type:String})],f.prototype,"profilePicture",void 0);a([y({type:String})],f.prototype,"loanHistoryFlag",void 0);a([y({type:Object})],f.prototype,"linkedProviders",void 0);a([y({type:String})],f.prototype,"profileCsrfToken",void 0);a([g()],f.prototype,"fileInput",void 0);a([g()],f.prototype,"fieldsError",void 0);a([g()],f.prototype,"attemptToDelete",void 0);a([g()],f.prototype,"confirmDelete",void 0);a([g()],f.prototype,"updatedFields",void 0);a([g()],f.prototype,"saveButtonDisabled",void 0);a([g()],f.prototype,"lookingToAuth",void 0);a([g()],f.prototype,"showLoadingIndicator",void 0);a([g()],f.prototype,"isStickyHeader",void 0);a([g()],f.prototype,"showPassword",void 0);a([_("ia-pic-uploader")],f.prototype,"iaPicUploader",void 0);a([_("#password")],f.prototype,"passwordField",void 0);f=a([de("ia-account-settings")],f);const At="ml_best_of",xt="ml_events",Et="ml_donors",St={ML_BEST_OF:{key:At,name:"Best of the Archive",interest_id:"e7594f8604",selected_by_default:!0,public:!0,short_desc:"Useful resources, unique stories, and fun finds from our collections"},ML_EVENTS:{key:xt,name:"Event Notices",interest_id:"98cc7bf635",selected_by_default:!1,public:!0,short_desc:"Invitations to and news about our events"},ML_DONORS:{key:Et,name:"Donor Communications",interest_id:"ff44b81002",selected_by_default:!1,public:!0,short_desc:"Information about how your donations are being used."}},Ct={identifier:"@neerajksharma453_gmail_com",screenname:"neeraj-k-sharma",email:"neerajksharma453@gmail.com",password:"",isAdmin:!1},Lt=["ml_best_of","ml_donors"],Tt={};De(v`
      <ia-account-settings
        .userData="${Ct}"
        .mailingLists="${St}"
        .selectedMailingLists=${Lt}
        .profilePicture=${"../demo/default-preview.jpg"}
        .loanHistoryFlag=${"public"}
        .linkedProviders="${Tt}"
        .profileCsrfToken=${"sfsdflksjfkfeteldkfjlf37583585n534535ui5n353h5"}
        .updatedFields=${{screenname:"123Your screen name has been updated successfully.",mailing_lists:"Mailing lists has been updated!"}}
      ><div slot="ia-google-login" class="third-party-login-cta">
          <img src="google-login-placeholder.jpg" alt="" width="200px" >
          <div>
            <div id="g_id_signin"></div>
          </div>
      </div>
      </ia-account-settings>`,document.querySelector("#demo"));
