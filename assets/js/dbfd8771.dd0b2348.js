"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2408],{2121:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"documentation/assert/index","title":"\ud83d\udd75\ud83c\udffb Assert","description":"Poku includes the assert method native from Node.js, keeping everything as it is, but providing human readability.","source":"@site/versioned_docs/version-2.x.x/documentation/assert/index.mdx","sourceDirName":"documentation/assert","slug":"/documentation/assert/","permalink":"/docs/documentation/assert/","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/assert/index.mdx","tags":[{"inline":true,"label":"assert","permalink":"/docs/tags/assert"},{"inline":true,"label":"assertions","permalink":"/docs/tags/assertions"},{"inline":true,"label":"expect","permalink":"/docs/tags/expect"}],"version":"2.x.x","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"tags":["assert","assertions","expect"]},"sidebar":"docs","previous":{"title":"noExit","permalink":"/docs/documentation/poku/options/no-exit"},"next":{"title":"\u26a1\ufe0f Helpers","permalink":"/docs/category/\ufe0f-helpers"}}');var r=t(4848),a=t(8453),l=(t(1470),t(9365),t(185));const i={sidebar_position:2,tags:["assert","assertions","expect"]},o="\ud83d\udd75\ud83c\udffb Assert",c={},d=[{value:"Migrating to <strong>Poku</strong>&#39;s <code>assert</code>",id:"migrating-to-pokus-assert",level:2},{value:"Available Methods",id:"available-methods",level:2},{value:"Truthy",id:"truthy",level:3},{value:"Equality",id:"equality",level:3},{value:"Deep Equality",id:"deep-equality",level:3},{value:"Matching",id:"matching",level:3},{value:"Success",id:"success",level:3},{value:"Inequality",id:"inequality",level:3},{value:"Deep Inequality",id:"deep-inequality",level:3},{value:"Non-Matching",id:"non-matching",level:3},{value:"Failure",id:"failure",level:3},{value:"Falsy",id:"falsy",level:3},{value:"Forces a failure",id:"forces-a-failure",level:3}];function u(e){const s={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"-assert",children:"\ud83d\udd75\ud83c\udffb Assert"})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Poku"})," includes the ",(0,r.jsx)(s.code,{children:"assert"})," method native from ",(0,r.jsx)(s.a,{href:"https://github.com/nodejs/node",children:(0,r.jsx)(s.strong,{children:"Node.js"})}),", keeping everything as it is, but providing human readability.",(0,r.jsx)("br",{}),"\nIt supports both ",(0,r.jsx)(s.a,{href:"https://github.com/oven-sh/bun",children:(0,r.jsx)(s.strong,{children:"Bun"})})," and ",(0,r.jsx)(s.a,{href:"https://github.com/denoland/deno",children:(0,r.jsx)(s.strong,{children:"Deno"})}),"."]}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.a,{href:"https://github.com/nodejs/node",children:(0,r.jsx)(s.strong,{children:"Node.js"})}),", ",(0,r.jsx)(s.a,{href:"https://github.com/oven-sh/bun",children:(0,r.jsx)(s.strong,{children:"Bun"})})," and ",(0,r.jsx)(s.a,{href:"https://github.com/denoland/deno",children:(0,r.jsx)(s.strong,{children:"Deno"})})," compatible."]}),"\n"]}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.code,{children:"assert"})," is used to write tests and verify if your code works as expected by comparing values and throwing errors, otherwise \ud83e\uddd1\ud83c\udffb\u200d\ud83c\udf93"]}),"\n"]}),"\n",(0,r.jsxs)(s.h2,{id:"migrating-to-pokus-assert",children:["Migrating to ",(0,r.jsx)(s.strong,{children:"Poku"}),"'s ",(0,r.jsx)(s.code,{children:"assert"})]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.em,{children:"But only if you want to, of course."})}),"\n",(0,r.jsx)(s.p,{children:"Default assertions:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-diff",children:"- import assert from 'node:assert';\n+ import { assert } from 'poku';\n"})}),"\n",(0,r.jsx)(s.p,{children:"Strict assertions:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-diff",children:"- import assert from 'node:assert/strict';\n+ import { strict as assert } from 'poku';\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"strict"})," method is available for ",(0,r.jsx)(s.strong,{children:"Node.js 16"})," onwards, ",(0,r.jsx)(s.strong,{children:"Bun"}),", and ",(0,r.jsx)(s.strong,{children:"Deno"}),". If you use it on unsupported ",(0,r.jsx)(s.strong,{children:"Node.js"})," versions, ",(0,r.jsx)(s.strong,{children:"Poku"})," will use the standard ",(0,r.jsx)(s.code,{children:"assert"})," instead."]}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert(true, \"It's true \ud83e\uddea\");\nassert.strictEqual(1, '1', 'Poku will describe it and show an error \ud83d\udc37');\n// ...\n"})}),"\n",(0,r.jsx)(s.admonition,{type:"tip",children:(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Poku"}),"'s ",(0,r.jsx)(s.code,{children:"assert"})," will use the message exactly as it is when using ",(0,r.jsx)(s.code,{children:"describe"})," and ",(0,r.jsx)(s.code,{children:"it"}),". ",(0,r.jsx)("br",{}),"\nYour ",(0,r.jsx)(s.strong,{children:"Poku"})," is waiting for you \ud83d\udc37\u2728"]})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsxs)(s.p,{children:["\ud83d\udcd8 To learn about assertions, see the quick tutorial: ",(0,r.jsx)(s.a,{href:"/docs/tutorials/beginner",children:"From a basic assertion test to its execution"}),"."]}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(s.h2,{id:"available-methods",children:"Available Methods"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"import { assert } from 'poku';\n// import { strict as assert } from 'poku';\n"})}),"\n",(0,r.jsxs)(l.T,{title:"Positive Assertion",open:!0,children:[(0,r.jsx)(s.h3,{id:"truthy",children:"Truthy"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert(value[, message])\n"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.ok(value[, message])\n"})}),(0,r.jsx)(s.h3,{id:"equality",children:"Equality"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.equal(actual, expected[, message])\n"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.strictEqual(actual, expected[, message])\n"})}),(0,r.jsx)(s.h3,{id:"deep-equality",children:"Deep Equality"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.deepEqual(actual, expected[, message])\n"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.deepStrictEqual(actual, expected[, message])\n"})}),(0,r.jsx)(s.h3,{id:"matching",children:"Matching"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.match(string, regexp[, message])\n"})}),(0,r.jsx)(s.h3,{id:"success",children:"Success"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.doesNotReject(asyncFn[, error][, message])\n"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.doesNotThrow(fn[, error][, message])\n"})})]}),"\n",(0,r.jsxs)(l.T,{title:"Negative Assertion",children:[(0,r.jsx)(s.h3,{id:"inequality",children:"Inequality"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.notEqual(actual, expected[, message])\n"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.notStrictEqual(actual, expected[, message])\n"})}),(0,r.jsx)(s.h3,{id:"deep-inequality",children:"Deep Inequality"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.notDeepEqual(actual, expected[, message])\n"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.notDeepStrictEqual(actual, expected[, message])\n"})}),(0,r.jsx)(s.h3,{id:"non-matching",children:"Non-Matching"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.doesNotMatch(string, regexp[, message])\n"})}),(0,r.jsx)(s.h3,{id:"failure",children:"Failure"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.rejects(asyncFn[, error][, message])\n"})}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.throws(fn[, error][, message])\n"})})]}),"\n",(0,r.jsxs)(l.T,{title:"Error Handling",children:[(0,r.jsx)(s.h3,{id:"falsy",children:"Falsy"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.ifError(value);\n"})}),(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:(0,r.jsx)(s.em,{children:"Tests for a error value, useful in callbacks"})}),"\n"]}),(0,r.jsx)(s.h3,{id:"forces-a-failure",children:"Forces a failure"}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"assert.fail([message]);\n"})})]}),"\n",(0,r.jsxs)(s.p,{children:["You can follow the ",(0,r.jsx)(s.a,{href:"https://nodejs.org/api/assert.html",children:(0,r.jsx)(s.strong,{children:"assert documentation"})})," from ",(0,r.jsx)(s.strong,{children:"Node.js"}),"'s documentation."]}),"\n",(0,r.jsx)(s.admonition,{type:"note",children:(0,r.jsxs)(s.p,{children:["For ",(0,r.jsx)(s.strong,{children:"Node.js"}),", the ",(0,r.jsx)(s.code,{children:"assert.match"})," and ",(0,r.jsx)(s.code,{children:"assert.doesNotMatch"})," methods are available from version 12 or higher."]})}),"\n",(0,r.jsxs)(s.admonition,{type:"info",children:[(0,r.jsxs)(s.p,{children:["To compile tests using ",(0,r.jsx)(s.code,{children:"assert"})," with ",(0,r.jsx)(s.strong,{children:"TypeScript"}),", you may will need to install ",(0,r.jsx)(s.strong,{children:"@types/node"}),":"]}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"npm i -D @types/node\n"})})]})]})}function h(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},1622:(e,s,t)=>{t.d(s,{A:()=>x});var n=t(6540),r=t(4164),a=t(3427),l=t(2303),i=t(1422);const o={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=t(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function u(e,s){return!!e&&(e===s||u(e.parentElement,s))}function h(e){let{summary:s,children:t,...h}=e;(0,a.A)().collectAnchor(h.id);const p=(0,l.A)(),m=(0,n.useRef)(null),{collapsed:x,setCollapsed:g}=(0,i.u)({initialState:!h.open}),[j,f]=(0,n.useState)(h.open),b=n.isValidElement(s)?s:(0,c.jsx)("summary",{children:s??"Details"});return(0,c.jsxs)("details",{...h,ref:m,open:j,"data-collapsed":x,className:(0,r.A)(o.details,p&&o.isBrowser,h.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const s=e.target;d(s)&&u(s,m.current)&&(e.preventDefault(),x?(g(!1),f(!0)):g(!0))},children:[b,(0,c.jsx)(i.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),f(!e)},children:(0,c.jsx)("div",{className:o.collapsibleContent,children:t})})]})}const p={details:"details_b_Ee"},m="alert alert--info";function x(e){let{...s}=e;return(0,c.jsx)(h,{...s,className:(0,r.A)(m,p.details,s.className)})}},9365:(e,s,t)=>{t.d(s,{A:()=>l});t(6540);var n=t(4164);const r={tabItem:"tabItem_Ymn6"};var a=t(4848);function l(e){let{children:s,hidden:t,className:l}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,n.A)(r.tabItem,l),hidden:t,children:s})}},1470:(e,s,t)=>{t.d(s,{A:()=>N});var n=t(6540),r=t(4164),a=t(3104),l=t(6347),i=t(205),o=t(7485),c=t(1682),d=t(679);function u(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:s}=e;return!!s&&"object"==typeof s&&"value"in s}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:s,children:t}=e;return(0,n.useMemo)((()=>{const e=s??function(e){return u(e).map((e=>{let{props:{value:s,label:t,attributes:n,default:r}}=e;return{value:s,label:t,attributes:n,default:r}}))}(t);return function(e){const s=(0,c.XI)(e,((e,s)=>e.value===s.value));if(s.length>0)throw new Error(`Docusaurus error: Duplicate values "${s.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[s,t])}function p(e){let{value:s,tabValues:t}=e;return t.some((e=>e.value===s))}function m(e){let{queryString:s=!1,groupId:t}=e;const r=(0,l.W6)(),a=function(e){let{queryString:s=!1,groupId:t}=e;if("string"==typeof s)return s;if(!1===s)return null;if(!0===s&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:s,groupId:t});return[(0,o.aZ)(a),(0,n.useCallback)((e=>{if(!a)return;const s=new URLSearchParams(r.location.search);s.set(a,e),r.replace({...r.location,search:s.toString()})}),[a,r])]}function x(e){const{defaultValue:s,queryString:t=!1,groupId:r}=e,a=h(e),[l,o]=(0,n.useState)((()=>function(e){let{defaultValue:s,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(s){if(!p({value:s,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${s}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return s}const n=t.find((e=>e.default))??t[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:s,tabValues:a}))),[c,u]=m({queryString:t,groupId:r}),[x,g]=function(e){let{groupId:s}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(s),[r,a]=(0,d.Dv)(t);return[r,(0,n.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:r}),j=(()=>{const e=c??x;return p({value:e,tabValues:a})?e:null})();(0,i.A)((()=>{j&&o(j)}),[j]);return{selectedValue:l,selectValue:(0,n.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),g(e)}),[u,g,a]),tabValues:a}}var g=t(2303);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=t(4848);function b(e){let{className:s,block:t,selectedValue:n,selectValue:l,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),d=e=>{const s=e.currentTarget,t=o.indexOf(s),r=i[t].value;r!==n&&(c(s),l(r))},u=e=>{let s=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;s=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;s=o[t]??o[o.length-1];break}}s?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":t},s),children:i.map((e=>{let{value:s,label:t,attributes:a}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:n===s?0:-1,"aria-selected":n===s,ref:e=>o.push(e),onKeyDown:u,onClick:d,...a,className:(0,r.A)("tabs__item",j.tabItem,a?.className,{"tabs__item--active":n===s}),children:t??s},s)}))})}function v(e){let{lazy:s,children:t,selectedValue:a}=e;const l=(Array.isArray(t)?t:[t]).filter(Boolean);if(s){const e=l.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:l.map(((e,s)=>(0,n.cloneElement)(e,{key:s,hidden:e.props.value!==a})))})}function y(e){const s=x(e);return(0,f.jsxs)("div",{className:(0,r.A)("tabs-container",j.tabList),children:[(0,f.jsx)(b,{...s,...e}),(0,f.jsx)(v,{...s,...e})]})}function N(e){const s=(0,g.A)();return(0,f.jsx)(y,{...e,children:u(e.children)},String(s))}},185:(e,s,t)=>{t.d(s,{T:()=>a});var n=t(1622),r=t(4848);const a=e=>{let{children:s,open:t,title:a}=e;return(0,r.jsx)(n.A,{open:t,className:"faq",summary:(0,r.jsx)("summary",{children:(0,r.jsx)("strong",{children:a})}),children:(0,r.jsx)("section",{children:s})})}},8453:(e,s,t)=>{t.d(s,{R:()=>l,x:()=>i});var n=t(6540);const r={},a=n.createContext(r);function l(e){const s=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),n.createElement(a.Provider,{value:s},e.children)}}}]);