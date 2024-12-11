/*! For license information please see ea616145.90b7bb18.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7940],{4649:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"documentation/poku/options/fail-fast","title":"failFast","description":"By using failFast, Poku will stop the tests at the first failure.","source":"@site/docs/documentation/poku/options/fail-fast.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/fail-fast","permalink":"/docs/next/documentation/poku/options/fail-fast","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/options/fail-fast.mdx","tags":[{"inline":true,"label":"bail","permalink":"/docs/next/tags/bail"}],"version":"current","sidebarPosition":7,"frontMatter":{"sidebar_position":7,"tags":["bail"]},"sidebar":"docs","previous":{"title":"debug","permalink":"/docs/next/documentation/poku/options/debug"},"next":{"title":"concurrency","permalink":"/docs/next/documentation/poku/options/concurrency"}}');var r=s(4848),o=s(8453),a=s(8215);const i={sidebar_position:7,tags:["bail"]},l="failFast",c={},d=[{value:"CLI",id:"cli",level:2},{value:"API",id:"api",level:2}];function u(e){const t={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"failfast",children:(0,r.jsx)(t.code,{children:"failFast"})})}),"\n",(0,r.jsxs)(t.p,{children:["By using ",(0,r.jsx)(t.code,{children:"failFast"}),", ",(0,r.jsx)(t.strong,{children:"Poku"})," will stop the tests at the first failure."]}),"\n",(0,r.jsx)(a.B,{records:[{version:"2.5.0",changes:[(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.strong,{children:"CLI:"})," deprecate ",(0,r.jsx)(t.code,{children:"--fail-fast"})," in order to"," ",(0,r.jsx)(t.code,{children:"--failFast"}),"."]})]}]}),"\n",(0,r.jsx)(t.h2,{id:"cli",children:"CLI"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"npx poku --failFast ./test\n"})}),"\n",(0,r.jsx)(t.h2,{id:"api",children:"API"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"await poku('./test', {\n  failFast: true,\n});\n"})})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},1622:(e,t,s)=>{s.d(t,{A:()=>f});var n=s(6540),r=s(4164),o=s(3427),a=s(2303),i=s(1422);const l={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=s(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function u(e,t){return!!e&&(e===t||u(e.parentElement,t))}function h(e){let{summary:t,children:s,...h}=e;(0,o.A)().collectAnchor(h.id);const p=(0,a.A)(),m=(0,n.useRef)(null),{collapsed:f,setCollapsed:x}=(0,i.u)({initialState:!h.open}),[j,g]=(0,n.useState)(h.open),k=n.isValidElement(t)?t:(0,c.jsx)("summary",{children:t??"Details"});return(0,c.jsxs)("details",{...h,ref:m,open:j,"data-collapsed":f,className:(0,r.A)(l.details,p&&l.isBrowser,h.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;d(t)&&u(t,m.current)&&(e.preventDefault(),f?(x(!1),g(!0)):x(!0))},children:[k,(0,c.jsx)(i.N,{lazy:!1,collapsed:f,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{x(e),g(!e)},children:(0,c.jsx)("div",{className:l.collapsibleContent,children:s})})]})}const p={details:"details_b_Ee"},m="alert alert--info";function f(e){let{...t}=e;return(0,c.jsx)(h,{...t,className:(0,r.A)(m,p.details,t.className)})}},8215:(e,t,s)=>{s.d(t,{B:()=>a});var n=s(1622);const r=(0,s(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var o=s(4848);const a=e=>{let{records:t,open:s}=e;return(0,o.jsx)(n.A,{open:s,summary:(0,o.jsxs)("summary",{children:[(0,o.jsx)(r,{})," History"]}),className:"history",children:(0,o.jsxs)("table",{children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Version"}),(0,o.jsx)("th",{children:"Changes"})]})}),(0,o.jsx)("tbody",{children:t.map(((e,t)=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,o.jsx)("td",{children:(0,o.jsx)("div",{className:"changes",children:e.changes.map(((e,t)=>(0,o.jsx)("section",{children:e},`change:${t}`)))})})]},`record:${t}`)))})]})})}},4722:(e,t,s)=>{s.d(t,{A:()=>i});var n=s(6540);const r=(...e)=>e.filter(((e,t,s)=>Boolean(e)&&""!==e.trim()&&s.indexOf(e)===t)).join(" ").trim();var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const a=(0,n.forwardRef)((({color:e="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:i="",children:l,iconNode:c,...d},u)=>(0,n.createElement)("svg",{ref:u,...o,width:t,height:t,stroke:e,strokeWidth:a?24*Number(s)/Number(t):s,className:r("lucide",i),...d},[...c.map((([e,t])=>(0,n.createElement)(e,t))),...Array.isArray(l)?l:[l]]))),i=(e,t)=>{const s=(0,n.forwardRef)((({className:s,...o},i)=>{return(0,n.createElement)(a,{ref:i,iconNode:t,className:r(`lucide-${l=e,l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,s),...o});var l}));return s.displayName=`${e}`,s}},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>i});var n=s(6540);const r={},o=n.createContext(r);function a(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);