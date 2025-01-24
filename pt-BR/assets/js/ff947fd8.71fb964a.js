/*! For license information please see ff947fd8.71fb964a.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1631],{744:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"documentation/poku/options/debug","title":"debug","description":"Por padr\xe3o, o Poku n\xe3o exibe logs que n\xe3o v\xeam do assert do Poku, mas voc\xea pode habilit\xe1-los.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/documentation/poku/options/debug.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/debug","permalink":"/pt-BR/docs/documentation/poku/options/debug","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/options/debug.mdx","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"docs","previous":{"title":"quiet","permalink":"/pt-BR/docs/documentation/poku/options/quiet"},"next":{"title":"failFast","permalink":"/pt-BR/docs/documentation/poku/options/fail-fast"}}');var o=n(4848),r=n(8453),i=n(3872);const a={sidebar_position:6},l="debug",c={},d=[{value:"CLI",id:"cli",level:2},{value:"API",id:"api",level:2}];function u(e){const t={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"debug",children:(0,o.jsx)(t.code,{children:"debug"})})}),"\n",(0,o.jsxs)(t.p,{children:["Por padr\xe3o, o ",(0,o.jsx)(t.strong,{children:"Poku"})," n\xe3o exibe logs que n\xe3o v\xeam do ",(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:"assert"})})," do ",(0,o.jsx)(t.strong,{children:"Poku"}),", mas voc\xea pode habilit\xe1-los."]}),"\n",(0,o.jsx)(i.B,{records:[{version:"2.2.0",changes:[(0,o.jsxs)(o.Fragment,{children:["Suporte para a flag curta ",(0,o.jsx)(t.code,{children:"-d"}),"."]})]}]}),"\n",(0,o.jsx)(t.h2,{id:"cli",children:"CLI"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:"npx poku --debug ./test\n"})}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["Flag curta: ",(0,o.jsx)(t.code,{children:"-d"}),"."]}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"api",children:"API"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"await poku('./test', {\n  debug: true,\n});\n"})})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},6701:(e,t,n)=>{n.d(t,{A:()=>x});var s=n(6540),o=n(4164),r=n(5246),i=n(9136),a=n(3535);const l={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=n(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function u(e,t){return!!e&&(e===t||u(e.parentElement,t))}function p(e){let{summary:t,children:n,...p}=e;(0,r.A)().collectAnchor(p.id);const h=(0,i.A)(),m=(0,s.useRef)(null),{collapsed:x,setCollapsed:g}=(0,a.u)({initialState:!p.open}),[j,b]=(0,s.useState)(p.open),f=s.isValidElement(t)?t:(0,c.jsx)("summary",{children:t??"Details"});return(0,c.jsxs)("details",{...p,ref:m,open:j,"data-collapsed":x,className:(0,o.A)(l.details,h&&l.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;d(t)&&u(t,m.current)&&(e.preventDefault(),x?(g(!1),b(!0)):g(!0))},children:[f,(0,c.jsx)(a.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),b(!e)},children:(0,c.jsx)("div",{className:l.collapsibleContent,children:n})})]})}const h={details:"details_b_Ee"},m="alert alert--info";function x(e){let{...t}=e;return(0,c.jsx)(p,{...t,className:(0,o.A)(m,h.details,t.className)})}},3872:(e,t,n)=>{n.d(t,{B:()=>i});var s=n(6701);const o=(0,n(5395).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var r=n(4848);const i=e=>{let{records:t,open:n}=e;return(0,r.jsx)(s.A,{open:n,summary:(0,r.jsxs)("summary",{children:[(0,r.jsx)(o,{})," History"]}),className:"history",children:(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Version"}),(0,r.jsx)("th",{children:"Changes"})]})}),(0,r.jsx)("tbody",{children:t.map(((e,t)=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,r.jsx)("td",{children:(0,r.jsx)("div",{className:"changes",children:e.changes.map(((e,t)=>(0,r.jsx)("section",{children:e},`change:${t}`)))})})]},`record:${t}`)))})]})})}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var s=n(6540);const o={},r=s.createContext(o);function i(e){const t=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:t},e.children)}},5395:(e,t,n)=>{n.d(t,{A:()=>a});var s=n(6540);const o=(...e)=>e.filter(((e,t,n)=>Boolean(e)&&""!==e.trim()&&n.indexOf(e)===t)).join(" ").trim();var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const i=(0,s.forwardRef)((({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:a="",children:l,iconNode:c,...d},u)=>(0,s.createElement)("svg",{ref:u,...r,width:t,height:t,stroke:e,strokeWidth:i?24*Number(n)/Number(t):n,className:o("lucide",a),...d},[...c.map((([e,t])=>(0,s.createElement)(e,t))),...Array.isArray(l)?l:[l]]))),a=(e,t)=>{const n=(0,s.forwardRef)((({className:n,...r},a)=>{return(0,s.createElement)(i,{ref:a,iconNode:t,className:o(`lucide-${l=e,l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,n),...r});var l}));return n.displayName=`${e}`,n}}}]);