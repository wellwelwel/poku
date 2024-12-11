/*! For license information please see 5738b4db.bacf0199.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7886],{5579:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"documentation/poku/options/debug","title":"debug","description":"By default Poku doesn\'t shows logs that doesn\'t comes from Poku\'s assert, but you can enable them.","source":"@site/versioned_docs/version-2.x.x/documentation/poku/options/debug.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/debug","permalink":"/docs/documentation/poku/options/debug","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/poku/options/debug.mdx","tags":[],"version":"2.x.x","sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"docs","previous":{"title":"quiet","permalink":"/docs/documentation/poku/options/quiet"},"next":{"title":"failFast","permalink":"/docs/documentation/poku/options/fail-fast"}}');var o=s(4848),r=s(8453),i=s(8215);const a={sidebar_position:6},l="debug",c={},d=[{value:"CLI",id:"cli",level:2},{value:"API",id:"api",level:2}];function u(e){const t={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"debug",children:(0,o.jsx)(t.code,{children:"debug"})})}),"\n",(0,o.jsxs)(t.p,{children:["By default ",(0,o.jsx)(t.strong,{children:"Poku"})," doesn't shows logs that doesn't comes from ",(0,o.jsx)(t.strong,{children:"Poku"}),"'s ",(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:"assert"})}),", but you can enable them."]}),"\n",(0,o.jsx)(i.B,{records:[{version:"2.2.0",changes:[(0,o.jsxs)(o.Fragment,{children:["Support for ",(0,o.jsx)(t.code,{children:"-d"})," short flag."]})]}]}),"\n",(0,o.jsx)(t.h2,{id:"cli",children:"CLI"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:"npx poku --debug ./test\n"})}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["Short flag: ",(0,o.jsx)(t.code,{children:"-d"}),"."]}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"api",children:"API"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"await poku('./test', {\n  debug: true,\n});\n"})})]})}function h(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},1622:(e,t,s)=>{s.d(t,{A:()=>x});var n=s(6540),o=s(4164),r=s(3427),i=s(2303),a=s(1422);const l={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=s(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function u(e,t){return!!e&&(e===t||u(e.parentElement,t))}function h(e){let{summary:t,children:s,...h}=e;(0,r.A)().collectAnchor(h.id);const p=(0,i.A)(),m=(0,n.useRef)(null),{collapsed:x,setCollapsed:f}=(0,a.u)({initialState:!h.open}),[g,j]=(0,n.useState)(h.open),b=n.isValidElement(t)?t:(0,c.jsx)("summary",{children:t??"Details"});return(0,c.jsxs)("details",{...h,ref:m,open:g,"data-collapsed":x,className:(0,o.A)(l.details,p&&l.isBrowser,h.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;d(t)&&u(t,m.current)&&(e.preventDefault(),x?(f(!1),j(!0)):f(!0))},children:[b,(0,c.jsx)(a.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{f(e),j(!e)},children:(0,c.jsx)("div",{className:l.collapsibleContent,children:s})})]})}const p={details:"details_b_Ee"},m="alert alert--info";function x(e){let{...t}=e;return(0,c.jsx)(h,{...t,className:(0,o.A)(m,p.details,t.className)})}},8215:(e,t,s)=>{s.d(t,{B:()=>i});var n=s(1622);const o=(0,s(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var r=s(4848);const i=e=>{let{records:t,open:s}=e;return(0,r.jsx)(n.A,{open:s,summary:(0,r.jsxs)("summary",{children:[(0,r.jsx)(o,{})," History"]}),className:"history",children:(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Version"}),(0,r.jsx)("th",{children:"Changes"})]})}),(0,r.jsx)("tbody",{children:t.map(((e,t)=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,r.jsx)("td",{children:(0,r.jsx)("div",{className:"changes",children:e.changes.map(((e,t)=>(0,r.jsx)("section",{children:e},`change:${t}`)))})})]},`record:${t}`)))})]})})}},4722:(e,t,s)=>{s.d(t,{A:()=>a});var n=s(6540);const o=(...e)=>e.filter(((e,t,s)=>Boolean(e)&&""!==e.trim()&&s.indexOf(e)===t)).join(" ").trim();var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const i=(0,n.forwardRef)((({color:e="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:i,className:a="",children:l,iconNode:c,...d},u)=>(0,n.createElement)("svg",{ref:u,...r,width:t,height:t,stroke:e,strokeWidth:i?24*Number(s)/Number(t):s,className:o("lucide",a),...d},[...c.map((([e,t])=>(0,n.createElement)(e,t))),...Array.isArray(l)?l:[l]]))),a=(e,t)=>{const s=(0,n.forwardRef)((({className:s,...r},a)=>{return(0,n.createElement)(i,{ref:a,iconNode:t,className:o(`lucide-${l=e,l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,s),...r});var l}));return s.displayName=`${e}`,s}},8453:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>a});var n=s(6540);const o={},r=n.createContext(o);function i(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);