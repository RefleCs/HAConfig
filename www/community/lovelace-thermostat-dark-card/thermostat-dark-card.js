var t=Object.defineProperty,e=(e,i)=>{let r={};for(var s in e)t(r,s,{get:e[s],enumerable:!0});return i||t(r,Symbol.toStringTag,{value:"Module"}),r},i={pending:3,idle_zone:0,diameter:400,show_ticks:!0,show_power_toggle:!0,show_preset_indicator:!0,num_ticks:150,tick_degrees:300},r=/* @__PURE__ */e({card_description:()=>g,card_name:()=>m,default:()=>f,editor_ambient_temperature:()=>d,editor_entity:()=>s,editor_hide_name:()=>n,editor_name:()=>o,editor_pending:()=>h,editor_readonly:()=>p,editor_show_power_toggle:()=>u,editor_show_preset_indicator:()=>_,editor_status_entity:()=>c,editor_step:()=>l,editor_theme:()=>a}),s="Entity",o="Name",n="Hide name",a="Theme",l="Step override",h="Pending (seconds)",d="Ambient temperature sensor",c="Status text entity",p="Read-only mode",u="Power button",_="Preset icon",m="Thermostat Dark Card",g="A thermostat card with a round dial — supports dark and light themes",f={editor_entity:s,editor_name:o,editor_hide_name:n,editor_theme:a,editor_step:l,editor_pending:h,editor_ambient_temperature:d,editor_status_entity:c,editor_readonly:p,editor_show_power_toggle:u,editor_show_preset_indicator:_,card_name:m,card_description:g},v=/* @__PURE__ */e({card_description:()=>P,card_name:()=>T,default:()=>O,editor_ambient_temperature:()=>C,editor_entity:()=>$,editor_hide_name:()=>b,editor_name:()=>y,editor_pending:()=>A,editor_readonly:()=>S,editor_show_power_toggle:()=>E,editor_show_preset_indicator:()=>M,editor_status_entity:()=>k,editor_step:()=>x,editor_theme:()=>w}),$="Entita",y="Názov",b="Skryť názov",w="Téma",x="Prepísanie kroku",A="Čakanie (sekundy)",C="Senzor okolitej teploty",k="Entita stavového textu",S="Režim len na čítanie",E="Tlačidlo napájania",M="Ikona predvoľby",T="Termostat tmavá karta",P="Karta termostatu s kruhovým ciferníkom — podporuje tmavé a svetlé témy",O={editor_entity:$,editor_name:y,editor_hide_name:b,editor_theme:w,editor_step:x,editor_pending:A,editor_ambient_temperature:C,editor_status_entity:k,editor_readonly:S,editor_show_power_toggle:E,editor_show_preset_indicator:M,card_name:T,card_description:P},j=/* @__PURE__ */e({card_description:()=>W,card_name:()=>Z,default:()=>X,editor_ambient_temperature:()=>D,editor_entity:()=>R,editor_hide_name:()=>U,editor_name:()=>L,editor_pending:()=>N,editor_readonly:()=>q,editor_show_power_toggle:()=>V,editor_show_preset_indicator:()=>B,editor_status_entity:()=>I,editor_step:()=>z,editor_theme:()=>H}),R="实体",L="名称",U="隐藏名称",H="主题",z="步进覆盖",N="等待时间（秒）",D="环境温度传感器",I="状态文本实体",q="只读模式",V="电源按钮",B="预设图标",Z="恒温器暗色卡片",W="带有圆形表盘的恒温器卡片 — 支持深色和浅色主题",X={editor_entity:R,editor_name:L,editor_hide_name:U,editor_theme:H,editor_step:z,editor_pending:N,editor_ambient_temperature:D,editor_status_entity:I,editor_readonly:q,editor_show_power_toggle:V,editor_show_preset_indicator:B,card_name:Z,card_description:W},Y=/* #__PURE__ */Object.assign({"./languages/en.json":r,"./languages/sk.json":v,"./languages/zh-Hans.json":j}),F={};for(const[Xe,Ye]of Object.entries(Y)){const t=Xe.replace("./languages/","").replace(".json","");F[t]=Ye.default}function K(t,e){var i,r,s,o,n;const a=null!=e?e:"en",l=null!==(i=null!==(r=F[a])&&void 0!==r?r:F[a.split("-")[0]])&&void 0!==i?i:F.en;return null!==(s=null!==(o=null==l?void 0:l[t])&&void 0!==o?o:null===(n=F.en)||void 0===n?void 0:n[t])&&void 0!==s?s:t}F["zh-Hans"]&&(F.zh=F["zh-Hans"],F["zh-CN"]=F["zh-Hans"]);var J,G,Q,tt,et=globalThis,it=et.ShadowRoot&&(void 0===et.ShadyCSS||et.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),st=/* @__PURE__ */new WeakMap,ot=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(it&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=st.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&st.set(e,t))}return t}toString(){return this.cssText}},nt=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new ot(i,t,rt)},at=it?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new ot("string"==typeof t?t:t+"",void 0,rt))(e)})(t):t,{is:lt,defineProperty:ht,getOwnPropertyDescriptor:dt,getOwnPropertyNames:ct,getOwnPropertySymbols:pt,getPrototypeOf:ut}=Object,_t=globalThis,mt=_t.trustedTypes,gt=mt?mt.emptyScript:"",ft=_t.reactiveElementPolyfillSupport,vt=(t,e)=>t,$t={toAttribute(t,e){switch(e){case Boolean:t=t?gt:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},yt=(t,e)=>!lt(t,e),bt={attribute:!0,type:String,converter:$t,reflect:!1,useDefault:!1,hasChanged:yt};null!==(G=(J=Symbol).metadata)&&void 0!==G||(J.metadata=Symbol("metadata")),null!==(Q=_t.litPropertyMetadata)&&void 0!==Q||(_t.litPropertyMetadata=/* @__PURE__ */new WeakMap);var wt,xt=class extends HTMLElement{static addInitializer(t){var e;this._$Ei(),(null!==(e=this.l)&&void 0!==e?e:this.l=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=bt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&ht(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){var r;const{get:s,set:o}=null!==(r=dt(this.prototype,t))&&void 0!==r?r:{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=null==s?void 0:s.call(this);null==o||o.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){var e;return null!==(e=this.elementProperties.get(t))&&void 0!==e?e:bt}static _$Ei(){if(this.hasOwnProperty(vt("elementProperties")))return;const t=ut(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(vt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(vt("properties"))){const t=this.properties,e=[...ct(t),...pt(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=/* @__PURE__ */new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(at(t))}else void 0!==t&&e.push(at(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$EO)&&void 0!==e?e:this._$EO=/* @__PURE__ */new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$EO)||void 0===e||e.delete(t)}_$E_(){const t=/* @__PURE__ */new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(it)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=et.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(e,this.constructor.elementStyles),e}connectedCallback(){var t,e;null!==(t=this.renderRoot)&&void 0!==t||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$EO)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$EO)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){var s;const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:$t).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){var s,o,n;const t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:$t;this._$Em=r;const l=a.fromAttribute(e,t.type);this[r]=null!==(o=null!=l?l:null===(n=this._$Ej)||void 0===n?void 0:n.get(r))&&void 0!==o?o:l,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){var o,n,a;const l=this.constructor;if(!1===r&&(s=this[t]),null!==(o=i)&&void 0!==o||(i=l.getPropertyOptions(t)),!((null!==(n=i.hasChanged)&&void 0!==n?n:yt)(s,e)||i.useDefault&&i.reflect&&s===(null===(a=this._$Ej)||void 0===a?void 0:a.get(t))&&!this.hasAttribute(l._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){var n,a,l;i&&!(null!==(n=this._$Ej)&&void 0!==n?n:this._$Ej=/* @__PURE__ */new Map).has(t)&&(this._$Ej.set(t,null!==(a=null!=o?o:e)&&void 0!==a?a:this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(null!==(l=this._$Eq)&&void 0!==l?l:this._$Eq=/* @__PURE__ */new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){var t;if(null!==(t=this.renderRoot)&&void 0!==t||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const i=this._$AL;try{var r;e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(r=this._$EO)||void 0===r||r.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$EO)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(t){}firstUpdated(t){}};xt.elementStyles=[],xt.shadowRootOptions={mode:"open"},xt[vt("elementProperties")]=/* @__PURE__ */new Map,xt[vt("finalized")]=/* @__PURE__ */new Map,null==ft||ft({ReactiveElement:xt}),(null!==(tt=_t.reactiveElementVersions)&&void 0!==tt?tt:_t.reactiveElementVersions=[]).push("2.1.2");var At=globalThis,Ct=t=>t,kt=At.trustedTypes,St=kt?kt.createPolicy("lit-html",{createHTML:t=>t}):void 0,Et="$lit$",Mt=`lit$${Math.random().toFixed(9).slice(2)}$`,Tt="?"+Mt,Pt=`<${Tt}>`,Ot=document,jt=()=>Ot.createComment(""),Rt=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Lt=Array.isArray,Ut="[ \t\n\f\r]",Ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zt=/-->/g,Nt=/>/g,Dt=RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),It=/'/g,qt=/"/g,Vt=/^(?:script|style|textarea|title)$/i,Bt=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),Zt=Bt(1),Wt=Bt(2),Xt=(Bt(3),Symbol.for("lit-noChange")),Yt=Symbol.for("lit-nothing"),Ft=/* @__PURE__ */new WeakMap,Kt=Ot.createTreeWalker(Ot,129);function Jt(t,e){if(!Lt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==St?St.createHTML(e):e}var Gt=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=Ht;for(let l=0;l<i;l++){var a;const e=t[l];let i,h,d=-1,c=0;for(;c<e.length&&(n.lastIndex=c,h=n.exec(e),null!==h);)c=n.lastIndex,n===Ht?"!--"===h[1]?n=zt:void 0!==h[1]?n=Nt:void 0!==h[2]?(Vt.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=Dt):void 0!==h[3]&&(n=Dt):n===Dt?">"===h[0]?(n=null!==(a=s)&&void 0!==a?a:Ht,d=-1):void 0===h[1]?d=-2:(d=n.lastIndex-h[2].length,i=h[1],n=void 0===h[3]?Dt:'"'===h[3]?qt:It):n===qt||n===It?n=Dt:n===zt||n===Nt?n=Ht:(n=Dt,s=void 0);const p=n===Dt&&t[l+1].startsWith("/>")?" ":"";o+=n===Ht?e+Pt:d>=0?(r.push(i),e.slice(0,d)+Et+e.slice(d)+Mt+p):e+Mt+(-2===d?l:p)}return[Jt(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]},Qt=class t{constructor({strings:e,_$litType$:i},r){let s;this.parts=[];let o=0,n=0;const a=e.length-1,l=this.parts,[h,d]=Gt(e,i);if(this.el=t.createElement(h,r),Kt.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Kt.nextNode())&&l.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(Et)){const e=d[n++],i=s.getAttribute(t).split(Mt),r=/([.?@])?(.*)/.exec(e);l.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?se:"?"===r[1]?oe:"@"===r[1]?ne:re}),s.removeAttribute(t)}else t.startsWith(Mt)&&(l.push({type:6,index:o}),s.removeAttribute(t));if(Vt.test(s.tagName)){const t=s.textContent.split(Mt),e=t.length-1;if(e>0){s.textContent=kt?kt.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],jt()),Kt.nextNode(),l.push({type:2,index:++o});s.append(t[e],jt())}}}else if(8===s.nodeType)if(s.data===Tt)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(Mt,t+1));)l.push({type:7,index:o}),t+=Mt.length-1}o++}}static createElement(t,e){const i=Ot.createElement("template");return i.innerHTML=t,i}};function te(t,e,i=t,r){var s,o,n;if(e===Xt)return e;let a=void 0!==r?null===(s=i._$Co)||void 0===s?void 0:s[r]:i._$Cl;const l=Rt(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==l&&(null==a||null===(o=a._$AO)||void 0===o||o.call(a,!1),void 0===l?a=void 0:(a=new l(t),a._$AT(t,i,r)),void 0!==r?(null!==(n=i._$Co)&&void 0!==n?n:i._$Co=[])[r]=a:i._$Cl=a),void 0!==a&&(e=te(t,a._$AS(t,e.values),a,r)),e}var ee=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:r}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:Ot).importNode(i,!0);Kt.currentNode=s;let o=Kt.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new ie(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new ae(o,this,t)),this._$AV.push(e),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=Kt.nextNode(),n++)}return Kt.currentNode=Ot,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},ie=class t{get _$AU(){var t,e;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cv}constructor(t,e,i,r){var s;this.type=2,this._$AH=Yt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=te(this,t,e),Rt(t)?t===Yt||null==t||""===t?(this._$AH!==Yt&&this._$AR(),this._$AH=Yt):t!==this._$AH&&t!==Xt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>Lt(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Yt&&Rt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ot.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:r}=t,s="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=Qt.createElement(Jt(r.h,r.h[0]),this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.p(i);else{const t=new ee(s,this),e=t.u(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=Ft.get(t.strings);return void 0===e&&Ft.set(t.strings,e=new Qt(t)),e}k(e){Lt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let r,s=0;for(const o of e)s===i.length?i.push(r=new t(this.O(jt()),this.O(jt()),this,this.options)):r=i[s],r._$AI(o),s++;s<i.length&&(this._$AR(r&&r._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t!==this._$AB;){const e=Ct(t).nextSibling;Ct(t).remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cv=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},re=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=Yt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(/* @__PURE__ */new String),this.strings=i):this._$AH=Yt}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=te(this,t,e,0),o=!Rt(t)||t!==this._$AH&&t!==Xt,o&&(this._$AH=t);else{var n;const r=t;let a,l;for(t=s[0],a=0;a<s.length-1;a++)l=te(this,r[i+a],e,a),l===Xt&&(l=this._$AH[a]),o||(o=!Rt(l)||l!==this._$AH[a]),l===Yt?t=Yt:t!==Yt&&(t+=(null!==(n=l)&&void 0!==n?n:"")+s[a+1]),this._$AH[a]=l}o&&!r&&this.j(t)}j(t){t===Yt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},se=class extends re{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Yt?void 0:t}},oe=class extends re{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Yt)}},ne=class extends re{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=te(this,t,e,0))&&void 0!==i?i:Yt)===Xt)return;const r=this._$AH,s=t===Yt&&r!==Yt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Yt&&(r===Yt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(e=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==e?e:this.element,t):this._$AH.handleEvent(t)}},ae=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){te(this,t)}},le=At.litHtmlPolyfillSupport;null==le||le(Qt,ie),(null!==(wt=At.litHtmlVersions)&&void 0!==wt?wt:At.litHtmlVersions=[]).push("3.3.3");var he,de,ce=globalThis,pe=class extends xt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var r;const s=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:e;let o=s._$litPart$;if(void 0===o){var n;const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=o=new ie(e.insertBefore(jt(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Xt}};pe._$litElement$=!0,pe.finalized=!0,null===(he=ce.litElementHydrateSupport)||void 0===he||he.call(ce,{LitElement:pe});var ue=ce.litElementPolyfillSupport;null==ue||ue({LitElement:pe}),(null!==(de=ce.litElementVersions)&&void 0!==de?de:ce.litElementVersions=[]).push("4.2.2");var _e=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},me={attribute:!0,type:String,converter:$t,reflect:!1,hasChanged:yt},ge=(t=me,e,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=/* @__PURE__ */new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,s,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];e.call(this,i),this.requestUpdate(r,s,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function fe(t){return(e,i)=>"object"==typeof i?ge(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ve(t){return ve="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ve(t)}function $e(t){var e=function(t,e){if("object"!=ve(t)||!t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var r=i.call(t,e||"default");if("object"!=ve(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==ve(e)?e:e+""}function ye(t,e,i){return(e=$e(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function be(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),i.push.apply(i,r)}return i}function we(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?be(Object(i),!0).forEach(function(e){ye(t,e,i[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):be(Object(i)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))})}return t}function xe(t){return fe(we(we({},t),{},{state:!0,attribute:!1}))}var Ae=/* @__PURE__ */e({default:()=>Ce}),Ce={"dial-off-fill":"#555","dial-idle-fill":"#222","dial-heating-fill":"#e36304","dial-cooling-fill":"#007af1","dial-drying-fill":"#a68b00","dial-text-color":"#fff","dial-path-color":"rgba(255, 255, 255, 0.3)","dial-path-active-color":"rgba(255, 255, 255, 0.8)","dial-path-active-large-color":"rgba(255, 255, 255, 1)","dial-leaf-color":"#13eb13","dial-toggle-color":"grey"},ke=/* @__PURE__ */e({default:()=>Se}),Se={"dial-off-fill":"transparent","dial-idle-fill":"transparent","dial-heating-fill":"transparent","dial-cooling-fill":"transparent","dial-drying-fill":"transparent","dial-text-color":"#f8fbff","dial-path-color":"rgba(255, 255, 255, 0.2)","dial-path-active-color":"#7fe8ff","dial-path-active-large-color":"#7fe8ff","dial-leaf-color":"#13eb13","dial-toggle-color":"rgba(255, 255, 255, 0.5)"},Ee=/* @__PURE__ */e({default:()=>Me}),Me={"dial-off-fill":"#e0e0e0","dial-idle-fill":"#f5f5f5","dial-heating-fill":"#e36304","dial-cooling-fill":"#007af1","dial-drying-fill":"#a68b00","dial-text-color":"#212121","dial-path-color":"rgba(0, 0, 0, 0.25)","dial-path-active-color":"rgba(0, 0, 0, 0.6)","dial-path-active-large-color":"rgba(0, 0, 0, 0.9)","dial-leaf-color":"#0a8f0a","dial-toggle-color":"#757575"},Te=/* @__PURE__ */e({default:()=>Pe}),Pe={"dial-off-fill":"transparent","dial-idle-fill":"transparent","dial-heating-fill":"transparent","dial-cooling-fill":"transparent","dial-drying-fill":"transparent","dial-text-color":"#fff","dial-path-color":"rgba(255, 255, 255, 0.3)","dial-path-active-color":"rgba(255, 255, 255, 0.8)","dial-path-active-large-color":"rgba(255, 255, 255, 1)","dial-leaf-color":"#13eb13","dial-toggle-color":"grey","colored-ticks":"true"},Oe=/* #__PURE__ */Object.assign({"./dark.json":Ae,"./glassy.json":ke,"./light.json":Ee,"./transparent.json":Te}),je={};for(const[Xe,Ye]of Object.entries(Oe)){const t=Xe.replace("./","").replace(".json","");je[t]=Ye.default}var Re=class{constructor(t){this._host=t,t.addController(this)}hostDisconnected(){this._clearTimeout()}enterEditMode(){this._host.editing=!0,this._host.requestUpdate(),this._resetTimer()}pauseTimer(){this._clearTimeout()}resumeTimer(){this._resetTimer()}adjustTarget(t){var e;const i=this._host;if(!i.editing)return void this.enterEditMode();let r=(null!==(e=i.temperature)&&void 0!==e?e:i.min_temp)+t*i.target_temp_step;r=Math.min(Math.max(r,i.min_temp),i.max_temp),i.temperature=r,i.requestUpdate(),this._resetTimer()}adjustLow(t){var e,i;const r=this._host;if(!r.editing)return void this.enterEditMode();let s=(null!==(e=r.target_temp_low)&&void 0!==e?e:r.min_temp)+t*r.target_temp_step;const o=(null!==(i=r.target_temp_high)&&void 0!==i?i:r.max_temp)-r.idle_zone;s=Math.min(Math.max(s,r.min_temp),o),r.target_temp_low=s,r.requestUpdate(),this._resetTimer()}adjustHigh(t){var e,i;const r=this._host;if(!r.editing)return void this.enterEditMode();let s=(null!==(e=r.target_temp_high)&&void 0!==e?e:r.max_temp)+t*r.target_temp_step;const o=(null!==(i=r.target_temp_low)&&void 0!==i?i:r.min_temp)+r.idle_zone;s=Math.min(Math.max(s,o),r.max_temp),r.target_temp_high=s,r.requestUpdate(),this._resetTimer()}_resetTimer(){this._clearTimeout(),this._timeout=window.setTimeout(()=>{this._commitAndExit()},1e3*this._host.pending)}_clearTimeout(){void 0!==this._timeout&&(window.clearTimeout(this._timeout),this._timeout=void 0)}_commitAndExit(){const t=this._host;t.editing=!1,t.requestUpdate(),t.dual?t.dispatchEvent(new CustomEvent("temperature-changed",{bubbles:!0,composed:!0,detail:{target_temp_low:t.target_temp_low,target_temp_high:t.target_temp_high}})):t.dispatchEvent(new CustomEvent("temperature-changed",{bubbles:!0,composed:!0,detail:{temperature:t.temperature}}))}};function Le(t,e,i){const r=e*Math.PI/180,s=t[0]-i[0],o=t[1]-i[1];return[s*Math.cos(r)-o*Math.sin(r)+i[0],s*Math.sin(r)+o*Math.cos(r)+i[1]]}function Ue(t,e,i){return t.map(t=>Le(t,e,i))}function He(t){return`${t.map((t,e)=>`${0===e?"M":"L"}${t[0]} ${t[1]}`).join(" ")}Z`}function ze(t,e,i,r){return Math.round((t-e)/(i-e)*(r-1))}function Ne(t,e,i){return Math.min(Math.max(t,e),i)}var De,Ie=nt`
  :host {
    display: block;
  }

  .dial-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dial {
    user-select: none;
    cursor: pointer;
    touch-action: none;
    width: 100%;
    height: auto;

    /* Theme-aware colors */
    --dial-off-fill: #555;
    --dial-idle-fill: #222;
    --dial-heating-fill: #e36304;
    --dial-cooling-fill: #007af1;
    --dial-drying-fill: #a68b00;
    --dial-text-color: var(--primary-text-color, #fff);
    --dial-path-color: rgba(255, 255, 255, 0.3);
    --dial-path-active-color: rgba(255, 255, 255, 0.8);
    --dial-path-active-large-color: rgba(255, 255, 255, 1);
    --dial-leaf-color: #13eb13;
    --dial-toggle-color: var(--secondary-text-color, grey);
  }

  /* Disc background — colored by hvac_action */
  .dial-disc {
    transition: fill 0.5s ease, opacity 0.5s ease;
  }
  .dial-disc--off {
    fill: var(--dial-off-fill);
  }
  .dial-disc--idle {
    fill: var(--dial-idle-fill);
  }
  .dial-disc--heating {
    fill: var(--dial-heating-fill);
  }
  .dial-disc--cooling {
    fill: var(--dial-cooling-fill);
  }
  .dial-disc--drying {
    fill: var(--dial-drying-fill);
  }
  .dial-disc--preheating {
    fill: var(--dial-heating-fill);
  }
  .dial-disc--defrosting {
    fill: var(--dial-cooling-fill);
  }
  .dial-disc--fan {
    fill: var(--dial-idle-fill);
  }

  /* Off state uses grey fill (handled by disc color) */

  /* Ticks */
  .dial-tick {
    fill: var(--dial-path-color);
  }
  .dial-tick--active {
    fill: var(--dial-path-active-color);
  }
  .dial-tick--large {
    fill: var(--dial-path-active-large-color);
  }

  /* Center text */
  .dial-text {
    fill: var(--dial-text-color);
    text-anchor: middle;
    dominant-baseline: central;
    font-family: Helvetica, sans-serif;
  }
  .dial-text--ambient {
    font-size: 120px;
    font-weight: bold;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  .dial-text--status {
    font-size: 22px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.8;
  }
  .dial-text--target {
    font-size: 120px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .dial-text--low,
  .dial-text--high {
    font-size: 60px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /* Edit mode: swap center text and show dual targets */
  :host([editing]) .dial-text--ambient {
    opacity: 0;
  }
  :host([editing]) .dial-text--target {
    opacity: 1;
  }
  :host([editing]) .dial-text--low,
  :host([editing]) .dial-text--high {
    opacity: 1;
  }

  /* Ring (edit mode indicator — thin outline at edge) */
  .dial-ring {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  :host([editing]) .dial-ring {
    opacity: 1;
  }

  /* Ring labels (temperature values on the tick ring) */
  .dial-ring-label {
    font-size: 22px;
    font-weight: bold;
  }

  /* Pointer tick — thicker, extends inward */
  .dial-pointer {
    fill: var(--dial-path-active-large-color);
  }
  :host([off]) .dial-pointer {
    fill: var(--dial-path-color);
  }

  /* Controls (chevrons) */
  .dial-chevron {
    cursor: pointer;
    opacity: 0.3;
    transition: opacity 0.15s ease;
  }
  .dial-chevron path {
    fill: none;
    stroke: var(--dial-text-color);
    stroke-width: 4px;
  }
  .dial-chevron:active {
    opacity: 1;
  }
  .dial-chevron:active path {
    stroke: white;
  }

  /* Indicators */
  .dial-preset {
    fill: var(--dial-leaf-color);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .dial-preset--visible {
    opacity: 1;
  }

  .dial-power {
    cursor: pointer;
    transition: opacity 0.3s ease;
  }
  .dial-power path {
    fill: var(--dial-toggle-color);
    transition: fill 0.3s ease;
  }
  :host([off]) .dial-power path {
    fill: darkgrey;
  }
  :host(:not([off])) .dial-power path {
    fill: lightgrey;
  }
  .dial-power:hover {
    opacity: 0.8;
  }
  .dial-power--hidden {
    opacity: 0;
    pointer-events: none;
  }

  .dial-thermo {
    fill: var(--dial-path-active-color);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .dial-thermo--visible {
    opacity: 1;
  }
`;function qe(t,e,i,r){var s,o=arguments.length,n=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(o<3?s(n):o>3?s(e,i,n):s(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}var Ve=(De=class extends pe{constructor(...t){super(...t),this.current_temperature=0,this.temperature=null,this.target_temp_low=null,this.target_temp_high=null,this.min_temp=7,this.max_temp=35,this.target_temp_step=1,this.hvac_action=null,this.hvac_mode=null,this.preset_mode=null,this.diameter=400,this.num_ticks=150,this.tick_degrees=300,this.pending=3,this.idle_zone=0,this.show_ticks=!0,this.show_power_toggle=!0,this.show_preset_indicator=!0,this.readonly=!1,this.theme="dark",this.status_text=null,this.editing=!1,this._dragging=!1,this._didPointerInteract=!1,this._dragStartX=0,this._dragStartY=0,this._dragActivated=!1,this._scale=1,this._interaction=new Re(this)}get dual(){return null!==this.target_temp_low&&null!==this.target_temp_high}get _radius(){return this.diameter/2}get _outerRadius(){return this.diameter/30}get _innerRadius(){return this.diameter/8}get _offsetDegrees(){return 180-(360-this.tick_degrees)/2}get _chevronTapSize(){const t=this._radius/3*1.2,e=.6*this._radius,i=this._scale>0?44/this._scale:t;return Math.min(Math.max(t,i),e)}connectedCallback(){super.connectedCallback(),"undefined"!=typeof ResizeObserver&&(this._resizeObserver=new ResizeObserver(()=>this._updateScale()),this._resizeObserver.observe(this))}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._resizeObserver)||void 0===t||t.disconnect(),this._resizeObserver=void 0}_updateScale(){const t=this.getBoundingClientRect().width;if(t<=0)return;const e=t/this.diameter;Math.abs(e-this._scale)<.005||(this._scale=e,this.requestUpdate())}updated(t){super.updated(t),t.has("diameter")&&this._updateScale(),t.has("editing")&&(this.editing?this.setAttribute("editing",""):this.removeAttribute("editing")),t.has("hvac_action")&&("off"===this.hvac_action?this.setAttribute("off",""):this.removeAttribute("off"))}render(){const t=this._radius,e=this._getColorStyle();return Zt`
      <div class="dial-container">
        <svg
          viewBox="0 0 ${this.diameter} ${this.diameter}"
          class="dial"
          style=${e}
          @click=${this._handleDialClick}
          @contextmenu=${this._handleLongPress}
          @pointerdown=${this._handlePointerDown}
          @pointermove=${this._handlePointerMove}
          @pointerup=${this._handlePointerUp}
          @pointercancel=${this._handlePointerUp}
        >
          ${this._renderDisc()}
          ${this.show_ticks?this._renderTicks():""}
          ${function(t){const e=t/50;return Wt`<circle
    cx=${t}
    cy=${t}
    r=${t-t/50-e}
    class="dial-ring"
    fill="none"
    stroke="white"
    stroke-width=${e}
  />`}(t)}
          ${this._renderRingLabels()}
          ${this._renderCenter()}
          ${this._renderIndicators()}
          ${this.editing?this._renderControls():""}
        </svg>
      </div>
    `}_getColorStyle(){const t=[];if(this.theme&&"dark"!==this.theme){const e=function(t){const e=je[t];return e?Object.entries(e).filter(([t])=>"colored-ticks"!==t).map(([t,e])=>`--${t}: ${e}`).join("; "):""}(this.theme);e&&t.push(e)}if(this.colors&&(this.colors.heating&&t.push(`--dial-heating-fill: ${this.colors.heating}`),this.colors.cooling&&t.push(`--dial-cooling-fill: ${this.colors.cooling}`),this.colors.idle&&t.push(`--dial-idle-fill: ${this.colors.idle}`),this.colors.off&&t.push(`--dial-off-fill: ${this.colors.off}`)),function(t){const e=je[t];return"true"===(null==e?void 0:e["colored-ticks"])}(this.theme)){var e;const i=this.editing?this._predictAction():null!==(e=this.hvac_action)&&void 0!==e?e:"off",r="light"===this.theme,s="transparent"===this.theme||"glassy"===this.theme,o={heating:"#e36304",cooling:"#007af1",drying:"#a68b00"}[i];o&&(s?(t.push(`--dial-path-active-color: ${o}`),t.push(`--dial-path-active-large-color: ${o}`)):r?(t.push(`--dial-path-active-color: color-mix(in srgb, ${o} 60%, black)`),t.push(`--dial-path-active-large-color: color-mix(in srgb, ${o} 50%, black)`)):(t.push(`--dial-path-active-color: color-mix(in srgb, ${o} 55%, white)`),t.push(`--dial-path-active-large-color: color-mix(in srgb, ${o} 40%, white)`)))}return t.join("; ")}_renderDisc(){var t;const e=this._radius;let i=null!==(t=this.hvac_action)&&void 0!==t?t:"off";this.editing&&(i=this._predictAction());const r=this.editing&&"idle"!==i&&"off"!==i?.5:1;return Wt`
      <circle cx=${e} cy=${e} r=${e} class="dial-disc dial-disc--${i}" style="opacity: ${r}" />
    `}_predictAction(){const t=this.current_temperature,e=this.hvac_mode;return this.dual&&null!==this.target_temp_low&&null!==this.target_temp_high?t<this.target_temp_low?"heating":t>this.target_temp_high?"cooling":"idle":null!==this.temperature?this.temperature>t?"cool"===e?"idle":"heating":this.temperature<t?"heat"===e?"idle":"cooling":"idle":"off"}_renderTicks(){return function(t,e){const{numTicks:i,tickDegrees:r,radius:s,outerRadius:o,innerRadius:n,offsetDegrees:a}=t,{from:l,to:h,largeIndices:d}=e,c=r/i,p=[s,s],u=[];for(let _=0;_<i;_++){const t=d.includes(_),e=void 0!==l&&void 0!==h&&_>=l&&_<=h,i=He(Ue(t?[[s-.0075*s,o],[s+.0075*s,o],[s+.0075*s,n+.1*s],[s-.0075*s,n+.1*s]]:[[s-.005*s,o],[s+.005*s,o],[s+.005*s,n],[s-.005*s,n]],_*c-a,p));let r="dial-tick";e&&(r+=" dial-tick--active"),t&&(r+=" dial-tick--large"),u.push(Wt`<path d=${i} class=${r} />`)}return Wt`<g class="dial-ticks">${u}</g>`}({numTicks:this.num_ticks,tickDegrees:this.tick_degrees,radius:this._radius,outerRadius:this._outerRadius,innerRadius:this._innerRadius,offsetDegrees:this._offsetDegrees},this._computeTickRange())}_renderRingLabels(){const t=this._radius,e=this._outerRadius+(this._innerRadius-this._outerRadius)/2,i=(i,r=0)=>{const s=Ne(i,this.min_temp,this.max_temp),o=this.tick_degrees*(s-this.min_temp)/(this.max_temp-this.min_temp)-this._offsetDegrees+r,n=Le([t,e],o,[t,t]);return{x:n[0],y:n[1]}},r=e=>{const i=ze(Ne(e,this.min_temp,this.max_temp),this.min_temp,this.max_temp,this.num_ticks)*(this.tick_degrees/this.num_ticks)-this._offsetDegrees,r=this._outerRadius,s=this._innerRadius-this._outerRadius,o=this._innerRadius+Math.round(.6*s),n=He(Ue([[t-.0125*t,r],[t+.0125*t,r],[t+.0125*t,o],[t-.0125*t,o]],i,[t,t]));return Wt`
        <path d=${n} class="dial-pointer" />
      `},s=[];if(this.editing)if(this.dual&&null!==this.target_temp_low&&null!==this.target_temp_high){let t;t=this.current_temperature<this.target_temp_low?-8:(this.current_temperature,this.target_temp_high,8);const e=i(this.current_temperature,t);s.push(Wt`
          ${r(this.target_temp_low)}
          ${r(this.target_temp_high)}
          <text x=${e.x} y=${e.y} class="dial-text dial-ring-label">${this._superscript(this.current_temperature)}</text>
        `)}else if(null!==this.temperature){const t=this.current_temperature<=this.temperature?-8:8,e=i(this.current_temperature,t);s.push(Wt`
          ${r(this.temperature)}
          <text x=${e.x} y=${e.y} class="dial-text dial-ring-label">${this._superscript(this.current_temperature)}</text>
        `)}else{const t=i(this.current_temperature,-8);s.push(Wt`
          <text x=${t.x} y=${t.y} class="dial-text dial-ring-label">${this._superscript(this.current_temperature)}</text>
        `)}else if(this.dual&&null!==this.target_temp_low&&null!==this.target_temp_high){let t,e;"heating"===this.hvac_action?(t=8,e=8):"cooling"===this.hvac_action?(t=-8,e=-8):(t=-8,e=8);const o=i(this.target_temp_low,t),n=i(this.target_temp_high,e);s.push(Wt`
          ${r(this.current_temperature)}
          <text x=${o.x} y=${o.y} class="dial-text dial-ring-label">${this._superscript(this.target_temp_low)}</text>
          <text x=${n.x} y=${n.y} class="dial-text dial-ring-label">${this._superscript(this.target_temp_high)}</text>
        `)}else if(null!==this.temperature){const t=this.temperature>=this.current_temperature?8:-8,e=i(this.temperature,t);s.push(Wt`
          ${r(this.current_temperature)}
          <text x=${e.x} y=${e.y} class="dial-text dial-ring-label">${this._superscript(this.temperature)}</text>
        `)}return Wt`<g class="dial-ring-labels">${s}</g>`}_superscript(t){const e=Math.round(10*t)/10,i=Math.floor(e),r=Math.round(10*(e-i));return this.target_temp_step<1?Wt`${i}<tspan font-size="12" dy="5">.${r}</tspan>`:Wt`${i}`}_renderCenter(){const t=this._radius;return this.dual&&this.editing?Wt`
        <g class="dial-center">
          <text x=${t} y=${t} class="dial-text dial-text--ambient">
            ${this._renderTempText(this.current_temperature)}
          </text>
          <text x=${t-t/3} y=${t} class="dial-text dial-text--low">
            ${this._renderTempTextSmall(this.target_temp_low)}
          </text>
          <text x=${t+t/3} y=${t} class="dial-text dial-text--high">
            ${this._renderTempTextSmall(this.target_temp_high)}
          </text>
        </g>
      `:Wt`
      <g class="dial-center">
        ${this.status_text&&!this.editing?Wt`
          <text x=${t} y=${t-.35*t} class="dial-text dial-text--status">${this.status_text.length>16?`${this.status_text.substring(0,14)}…`:this.status_text}</text>
        `:""}
        <text x=${t} y=${t} class="dial-text dial-text--ambient">
          ${this._renderTempText(this.current_temperature)}
        </text>
        ${null!==this.temperature?Wt`
          <text x=${t} y=${t} class="dial-text dial-text--target">
            ${this._renderTempText(this.temperature)}
          </text>
        `:""}
      </g>
    `}_renderTempText(t){const e=Math.round(10*t)/10,i=Math.floor(e),r=Math.round(10*(e-i));return this.target_temp_step<1?Wt`${i}<tspan font-size="40" dy="30">.${r}</tspan>`:Wt`${i}`}_renderTempTextSmall(t){const e=Math.round(10*t)/10,i=Math.floor(e),r=Math.round(10*(e-i));return this.target_temp_step<1?Wt`${i}<tspan font-size="22" dy="16">.${r}</tspan>`:Wt`${i}`}_renderIndicators(){const t=this._radius,e=this._getPresetIcon(),i="dial-preset"+(!this.editing&&this.show_preset_indicator&&null!==this.preset_mode&&"none"!==this.preset_mode&&null!==e?" dial-preset--visible":""),r=t/5/24,s=t-24*r/2,o=t+.32*t,n=t/87,a=24*n,l=t-a/2,h=this.diameter-a-.05*t,d=t/87,c=24*d,p=t-c/2,u=this.diameter-c-.05*t;return Wt`
      <g>
        ${null!==e?Wt`
          <path
            d=${e}
            class=${i}
            transform="translate(${s}, ${o}) scale(${r})"
          />
        `:""}
        ${this.show_power_toggle?Wt`
            <g class="dial-power ${this.editing?"dial-power--hidden":""}" @click=${this._handlePowerClick}>
              <rect
                x=${l}
                y=${h}
                width=${a}
                height=${a}
                fill="transparent"
              />
              <path
                d=${"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13"}
                transform="translate(${l}, ${h}) scale(${n})"
              />
            </g>
            <path
              d=${"M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z"}
              class="dial-thermo ${this.editing?"dial-thermo--visible":""}"
              transform="translate(${p}, ${u}) scale(${d})"
            />
          `:""}
      </g>
    `}_getPresetIcon(){var t,e;if(!this.preset_mode||"none"===this.preset_mode)return null;const i={eco:"M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22L6.66,19.7C7.14,19.87,7.64,20,8,20C19,20,22,3,22,3C21,5,14,5.25,9,6.25C4,7.25,2,11.5,2,13.5C2,15.5,3.75,17.25,3.75,17.25C7,8,17,8,17,8Z",away:"M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22L6.66,19.7C7.14,19.87,7.64,20,8,20C19,20,22,3,22,3C21,5,14,5.25,9,6.25C4,7.25,2,11.5,2,13.5C2,15.5,3.75,17.25,3.75,17.25C7,8,17,8,17,8Z",home:"M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",sleep:"M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87,20.69,17.05,20.16,17.8C19.84,18.25,19.5,18.67,19.08,19.07C15.17,23,8.84,23,4.94,19.07C1.03,15.17,1.03,8.83,4.94,4.93C5.34,4.53,5.76,4.17,6.21,3.85C6.96,3.32,8.14,4.21,8.06,5.04C7.79,7.9,8.75,10.87,10.95,13.06C13.14,15.26,16.1,16.22,18.97,15.95Z",boost:"M17.66,11.2C17.43,10.9,17.15,10.64,16.89,10.38C16.22,9.78,15.46,9.35,14.82,8.72C13.33,7.26,13,4.85,13.95,3C13,3.23,12.17,3.75,11.46,4.32C8.87,6.4,7.85,10.07,9.07,13.22C9.11,13.32,9.15,13.42,9.15,13.55C9.15,13.77,9,13.97,8.8,14.05C8.57,14.15,8.33,14.09,8.14,13.93C8.08,13.88,8.04,13.83,8,13.76C6.87,12.33,6.69,10.28,7.45,8.64C5.78,10,4.87,12.3,5,14.47C5.06,14.97,5.12,15.47,5.29,15.97C5.43,16.57,5.7,17.17,6,17.7C7.08,19.43,8.95,20.67,10.96,20.92C13.1,21.19,15.39,20.8,16.89,19.32C18.55,17.68,19.15,15.15,18.43,12.97L18.3,12.66C18.1,12.16,17.83,11.68,17.66,11.2Z",comfort:"M12,7A5,5,0,1,0,17,12,5,5,0,0,0,12,7ZM12,2L14.39,5.42C13.65,5.15,12.84,5,12,5S10.36,5.15,9.61,5.42ZM3.34,7L7.5,6.65A6.86,6.86,0,0,0,5.42,9.61ZM3.34,17L5.42,14.39A6.86,6.86,0,0,0,7.5,17.35ZM12,22L9.61,18.58C10.36,18.85,11.16,19,12,19S13.65,18.85,14.39,18.58ZM20.66,17L16.5,17.35A6.86,6.86,0,0,0,18.58,14.39ZM20.66,7L18.58,9.61A6.86,6.86,0,0,0,16.5,6.65Z",activity:"M12,4A4,4,0,1,1,8,8,4,4,0,0,1,12,4ZM12,14C7.58,14,4,15.79,4,18V20H20V18C20,15.79,16.42,14,12,14Z"};var r;return(null===(t=this._presetIcons)||void 0===t?void 0:t[this.preset_mode])?null!==(r=i[this._presetIcons[this.preset_mode]])&&void 0!==r?r:null:null!==(e=i[this.preset_mode])&&void 0!==e?e:null}_renderControls(){const t=this._radius,e=t/3,i=t/3;return this.dual?Wt`
        <g class="dial-controls">
          ${this._renderChevron(t-t/3,t-i,0,.7*e,"low-up")}
          ${this._renderChevron(t-t/3,t+i,180,.7*e,"low-down")}
          ${this._renderChevron(t+t/3,t-i,0,.7*e,"high-up")}
          ${this._renderChevron(t+t/3,t+i,180,.7*e,"high-down")}
        </g>
      `:Wt`
      <g class="dial-controls">
        ${this._renderChevron(t,t-i,0,e,"target-up")}
        ${this._renderChevron(t,t+i,180,e,"target-down")}
      </g>
    `}_renderChevron(t,e,i,r,s){const o=r/2,n=`M${-o},0 L0,${-(.3*r)} L${o},0`,a=this._chevronTapSize;return Wt`
      <g
        class="dial-chevron"
        data-id=${s}
        transform="translate(${t}, ${e}) rotate(${i})"
        @click=${this._handleChevronClick}
      >
        <rect
          x=${-a/2}
          y=${-a/2}
          width=${a}
          height=${a}
          fill="transparent"
        />
        <path d=${n} />
      </g>
    `}_handleDialClick(t){if(this.readonly)return;if(this._didPointerInteract)return void(this._didPointerInteract=!1);const e=t.target;e.closest(".dial-power")||e.closest(".dial-chevron")||this.editing||this._interaction.enterEditMode()}_handleLongPress(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("more-info",{bubbles:!0,composed:!0}))}_handleChevronClick(t){t.stopPropagation();const e=t.currentTarget.dataset.id;if(e)switch(e){case"target-up":this._interaction.adjustTarget(1);break;case"target-down":this._interaction.adjustTarget(-1);break;case"low-up":this._interaction.adjustLow(1);break;case"low-down":this._interaction.adjustLow(-1);break;case"high-up":this._interaction.adjustHigh(1);break;case"high-down":this._interaction.adjustHigh(-1)}}_handlePowerClick(t){this.readonly||(t.stopPropagation(),this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0})))}_handlePointerDown(t){if(this.readonly)return;if(!this.editing)return;const e=t.target;e.closest(".dial-power")||e.closest(".dial-chevron")||null!==this._pointerToTemperature(t)&&(this._dragging=!0,this._didPointerInteract=!0,this._dragStartX=t.clientX,this._dragStartY=t.clientY,this._dragActivated=!1,this._interaction.pauseTimer(),e.setPointerCapture(t.pointerId),t.preventDefault())}_handlePointerMove(t){if(!this._dragging)return;if(!this._dragActivated){const e=t.clientX-this._dragStartX,i=t.clientY-this._dragStartY;if(e*e+i*i<36)return;this._dragActivated=!0}const e=this._pointerToTemperature(t);null!==e&&(this._setTemperatureFromRing(e),t.preventDefault())}_handlePointerUp(t){this._dragging&&(this._dragging=!1,this._dragActivated=!1,t.target.releasePointerCapture(t.pointerId),this._interaction.resumeTimer(),"pointercancel"===t.type&&(this._didPointerInteract=!1))}_pointerToTemperature(t){var e;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("svg");if(!i)return null;const r=i.getBoundingClientRect(),s=this._radius,o=this.diameter/r.width,n=this.diameter/r.height,a=(t.clientX-r.left)*o-s,l=(t.clientY-r.top)*n-s;if(Math.sqrt(a*a+l*l)<.5*s)return null;let h=Math.atan2(-a,l)*(180/Math.PI);h<0&&(h+=360);const d=360-this.tick_degrees;if(h>360-d/2||h<d/2)return null;const c=(h-d/2)/this.tick_degrees,p=this.min_temp+c*(this.max_temp-this.min_temp);return Ne(Math.round(p/this.target_temp_step)*this.target_temp_step,this.min_temp,this.max_temp)}_setTemperatureFromRing(t){var e,i;if(this.dual)if(Math.abs(t-(null!==(e=this.target_temp_low)&&void 0!==e?e:this.min_temp))<Math.abs(t-(null!==(i=this.target_temp_high)&&void 0!==i?i:this.max_temp))){var r;const e=(null!==(r=this.target_temp_high)&&void 0!==r?r:this.max_temp)-this.idle_zone;this.target_temp_low=Ne(t,this.min_temp,e)}else{var s;const e=(null!==(s=this.target_temp_low)&&void 0!==s?s:this.min_temp)+this.idle_zone;this.target_temp_high=Ne(t,e,this.max_temp)}else this.temperature=t;this.requestUpdate()}_computeTickRange(){const t=Ne(ze(this.current_temperature,this.min_temp,this.max_temp,this.num_ticks),0,this.num_ticks-1);let e,i;const r=[];if(this.dual&&null!==this.target_temp_low&&null!==this.target_temp_high){const s=Ne(ze(this.target_temp_low,this.min_temp,this.max_temp,this.num_ticks),0,this.num_ticks-1),o=Ne(ze(this.target_temp_high,this.min_temp,this.max_temp,this.num_ticks),0,this.num_ticks-1);this.editing?r.push(t,s,o):r.push(s,o),s>t?(e=t,i=s):o<t&&(e=o,i=t)}else if(null!==this.temperature){const s=Ne(ze(this.temperature,this.min_temp,this.max_temp,this.num_ticks),0,this.num_ticks-1);this.editing?r.push(t):r.push(s),s>t?(e=t,i=s):s<t&&(e=s,i=t)}return{from:e,to:i,largeIndices:r,predicted:this.editing}}},De.styles=Ie,De);qe([fe({type:Number})],Ve.prototype,"current_temperature",void 0),qe([fe({type:Number})],Ve.prototype,"temperature",void 0),qe([fe({type:Number})],Ve.prototype,"target_temp_low",void 0),qe([fe({type:Number})],Ve.prototype,"target_temp_high",void 0),qe([fe({type:Number})],Ve.prototype,"min_temp",void 0),qe([fe({type:Number})],Ve.prototype,"max_temp",void 0),qe([fe({type:Number})],Ve.prototype,"target_temp_step",void 0),qe([fe({type:String})],Ve.prototype,"hvac_action",void 0),qe([fe({type:String})],Ve.prototype,"hvac_mode",void 0),qe([fe({type:String})],Ve.prototype,"preset_mode",void 0),qe([fe({type:Number})],Ve.prototype,"diameter",void 0),qe([fe({type:Number})],Ve.prototype,"num_ticks",void 0),qe([fe({type:Number})],Ve.prototype,"tick_degrees",void 0),qe([fe({type:Number})],Ve.prototype,"pending",void 0),qe([fe({type:Number})],Ve.prototype,"idle_zone",void 0),qe([fe({type:Boolean})],Ve.prototype,"show_ticks",void 0),qe([fe({type:Boolean})],Ve.prototype,"show_power_toggle",void 0),qe([fe({type:Boolean})],Ve.prototype,"show_preset_indicator",void 0),qe([fe({type:Boolean})],Ve.prototype,"readonly",void 0),qe([fe({type:String,reflect:!0})],Ve.prototype,"theme",void 0),qe([fe({type:Object})],Ve.prototype,"colors",void 0),qe([fe({type:Object})],Ve.prototype,"_presetIcons",void 0),qe([fe({type:String})],Ve.prototype,"status_text",void 0),qe([xe()],Ve.prototype,"editing",void 0),Ve=qe([_e("thermostat-dial")],Ve);var Be,Ze=class extends pe{static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",flatten:!0,schema:[{name:"theme",selector:{select:{options:Object.keys(je),mode:"dropdown"}}},{name:"step",selector:{number:{min:.5,max:5,step:.5,mode:"box"}}},{name:"pending",selector:{number:{min:1,max:30,step:1,mode:"box"}}}]},{name:"ambient_temperature",selector:{entity:{domain:"sensor"}}},{name:"status_entity",selector:{entity:{domain:["sensor","input_text"]}}},{type:"grid",name:"",flatten:!0,schema:[{name:"hide_name",selector:{boolean:{}}},{name:"readonly",selector:{boolean:{}}},{name:"show_power_toggle",selector:{boolean:{}}},{name:"show_preset_indicator",selector:{boolean:{}}}]}],computeLabel:t=>{var e;const i=document.documentElement.lang||"en";return null!==(e=K(`editor_${t.name}`,i))&&void 0!==e?e:t.name}}}static getStubConfig(t){return{entity:(t?Object.keys(t.states).filter(t=>t.startsWith("climate.")):[])[0]||"climate.thermostat"}}setConfig(t){if(!(null==t?void 0:t.entity))throw new Error("Entity is required");this._config=we(we({},i),t)}getCardSize(){return 6}getGridOptions(){return{columns:6,min_columns:3}}shouldUpdate(t){return!!this._config&&function(t,e,i){var r;if(e.has("_config"))return!0;const s=e.get("hass");return!s||s.states[i]!==(null===(r=t.hass)||void 0===r?void 0:r.states[i])}(this,t,this._config.entity)}render(){var t,e,i,r,s,o,n,a,l,h,d,c,p,u,_;if(!this.hass||!this._config)return Zt``;const m=this.hass.states[this._config.entity];if(!m)return Zt`
        <ha-card>
          <div class="warning">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const g=m.attributes;let f=g.current_temperature;if(this._config.ambient_temperature){const t=this.hass.states[this._config.ambient_temperature];t&&(f=parseFloat(t.state))}const v=g.hvac_action||m.state,$=m.state,y=g.preset_mode||null,b=null!==(t=g.temperature)&&void 0!==t?t:null,w=null!==(e=g.target_temp_low)&&void 0!==e?e:null,x=null!==(i=g.target_temp_high)&&void 0!==i?i:null,A=null!==(r=null!==(s=this._config.range_min)&&void 0!==s?s:g.min_temp)&&void 0!==r?r:7,C=null!==(o=null!==(n=this._config.range_max)&&void 0!==n?n:g.max_temp)&&void 0!==o?o:35,k=null!==(a=null!==(l=this._config.step)&&void 0!==l?l:g.target_temp_step)&&void 0!==a?a:.5,S=this._config.hide_name||!1===this._config.name?"":null!==(h=null!==(d=this._config.name)&&void 0!==d?d:g.friendly_name)&&void 0!==h?h:"";return Zt`
      <ha-card>
        ${S?Zt`<div class="card-title">${S}</div>`:""}
        <thermostat-dial
          .current_temperature=${f}
          .temperature=${b}
          .target_temp_low=${w}
          .target_temp_high=${x}
          .min_temp=${A}
          .max_temp=${C}
          .target_temp_step=${k}
          .hvac_action=${v}
          .hvac_mode=${$}
          .preset_mode=${y}
          .diameter=${this._config.diameter}
          .num_ticks=${this._config.num_ticks}
          .tick_degrees=${this._config.tick_degrees}
          .pending=${this._config.pending}
          .idle_zone=${this._config.idle_zone}
          .show_ticks=${null===(c=this._config.show_ticks)||void 0===c||c}
          .show_power_toggle=${null===(p=this._config.show_power_toggle)||void 0===p||p}
          .show_preset_indicator=${null===(u=this._config.show_preset_indicator)||void 0===u||u}
          .readonly=${null!==(_=this._config.readonly)&&void 0!==_&&_}
          .theme=${this._config.theme}
          .colors=${this._config.colors}
          ._presetIcons=${this._config.preset_icons}
          .status_text=${this._resolveStatusText()}
          @temperature-changed=${this._handleTemperatureChanged}
          @toggle=${this._handleToggle}
          @more-info=${this._handleMoreInfo}
        ></thermostat-dial>
      </ha-card>
    `}_handleTemperatureChanged(t){const e=t.detail;void 0!==e.temperature?this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:e.temperature}):void 0!==e.target_temp_low&&this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,target_temp_low:e.target_temp_low,target_temp_high:e.target_temp_high})}_handleToggle(){const t="off"===this.hass.states[this._config.entity].state?"turn_on":"turn_off";this.hass.callService("climate",t,{entity_id:this._config.entity})}_handleMoreInfo(){const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}});this.dispatchEvent(t)}_resolveStatusText(){if(!this._config.status_entity)return null;const t=this.hass.states[this._config.status_entity];if(!t)return null;const e=t.state;return e&&"unknown"!==e&&"unavailable"!==e?e:null}static get styles(){return nt`
      ha-card {
        padding: 16px;
        overflow: hidden;
      }
      .card-title {
        font-size: 1.2em;
        color: var(--secondary-text-color);
        text-align: center;
        padding-bottom: 8px;
        font-weight: 400;
      }
      .warning {
        padding: 16px;
        color: var(--error-color);
      }
    `}};qe([fe({attribute:!1})],Ze.prototype,"hass",void 0),qe([xe()],Ze.prototype,"_config",void 0),Ze=qe([_e("thermostat-dark-card")],Ze),console.info("%c THERMOSTAT-DARK-CARD %c v2.6.2 ","color: white; background: #555; font-weight: 700;","color: white; background: #e36304; font-weight: 700;");var We=null!==(Be=window.customCards)&&void 0!==Be?Be:[];window.customCards=We,We.push({type:"thermostat-dark-card",name:K("card_name"),description:K("card_description"),preview:!0});