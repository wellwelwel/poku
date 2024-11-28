/*! For license information please see 32fe6e67.93adde38.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8009],{368:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"documentation/poku/options/platform","title":"platform","description":"By default, Poku tries to identify the platform automatically, but you can set it manually.","source":"@site/docs/documentation/poku/options/platform.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/platform","permalink":"/docs/documentation/poku/options/platform","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/options/platform.mdx","tags":[{"inline":true,"label":"require","permalink":"/docs/tags/require"},{"inline":true,"label":"import","permalink":"/docs/tags/import"},{"inline":true,"label":"loader","permalink":"/docs/tags/loader"}],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"tags":["require","import","loader"]},"sidebar":"docs","previous":{"title":"filter","permalink":"/docs/documentation/poku/options/filter"},"next":{"title":"exclude","permalink":"/docs/documentation/poku/options/exclude"}}');var r=t(4848),s=t(8453),a=t(8215);const l={sidebar_position:3,tags:["require","import","loader"]},i="platform",c={},d=[{value:"CLI",id:"cli",level:2},{value:"API",id:"api",level:2}];function u(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"platform",children:(0,r.jsx)(n.code,{children:"platform"})})}),"\n",(0,r.jsxs)(n.p,{children:["By default, ",(0,r.jsx)(n.strong,{children:"Poku"})," tries to identify the platform automatically, but you can set it manually."]}),"\n",(0,r.jsx)(a.B,{records:[{version:"2.2.0",changes:[(0,r.jsxs)(r.Fragment,{children:["Support for ",(0,r.jsx)(n.code,{children:"--node"}),", ",(0,r.jsx)(n.code,{children:"--bun"}),", and"," ",(0,r.jsx)(n.code,{children:"--deno"})," alternative flags."]})]}]}),"\n",(0,r.jsx)(n.h2,{id:"cli",children:"CLI"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# Common usage\n\nnpx      poku      --platform=node  ./test\nbun      poku      --platform=bun   ./test\ndeno run npm:poku  --platform=deno  ./test\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# Custom usage\n## E.g., when you're developing using a platform, but maintain compatibility with others\n\nnpx      poku      --platform=bun   ./test\nbun      poku      --platform=deno  ./test\ndeno run npm:poku  --platform=node  ./test\n\n# ...\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Alternative flags: ",(0,r.jsx)(n.code,{children:"--node"}),", ",(0,r.jsx)(n.code,{children:"--bun"}),", and ",(0,r.jsx)(n.code,{children:"--deno"}),".","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"It's only possible to use one per command."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"/**\n * Force Node.js (or tsx for TypeScript)\n *\n * @default 'node'\n */\n\nawait poku('./test', {\n  platform: 'node',\n});\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"/**\n * Force Bun\n */\n\nawait poku('./test', {\n  platform: 'bun',\n});\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"/**\n * Force Deno\n */\n\nawait poku('./test', {\n  platform: 'deno',\n});\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsx)(n.p,{children:"Useful when there is more than one common platform installed."})})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},1622:(e,n,t)=>{t.d(n,{A:()=>f});var o=t(6540),r=t(4164),s=t(3427),a=t(2303),l=t(1422);const i={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=t(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function u(e,n){return!!e&&(e===n||u(e.parentElement,n))}function p(e){let{summary:n,children:t,...p}=e;(0,s.A)().collectAnchor(p.id);const m=(0,a.A)(),h=(0,o.useRef)(null),{collapsed:f,setCollapsed:x}=(0,l.u)({initialState:!p.open}),[j,g]=(0,o.useState)(p.open),k=o.isValidElement(n)?n:(0,c.jsx)("summary",{children:n??"Details"});return(0,c.jsxs)("details",{...p,ref:h,open:j,"data-collapsed":f,className:(0,r.A)(i.details,m&&i.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;d(n)&&u(n,h.current)&&(e.preventDefault(),f?(x(!1),g(!0)):x(!0))},children:[k,(0,c.jsx)(l.N,{lazy:!1,collapsed:f,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{x(e),g(!e)},children:(0,c.jsx)("div",{className:i.collapsibleContent,children:t})})]})}const m={details:"details_b_Ee"},h="alert alert--info";function f(e){let{...n}=e;return(0,c.jsx)(p,{...n,className:(0,r.A)(h,m.details,n.className)})}},8215:(e,n,t)=>{t.d(n,{B:()=>a});var o=t(1622);const r=(0,t(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var s=t(4848);const a=e=>{let{records:n,open:t}=e;return(0,s.jsx)(o.A,{open:t,summary:(0,s.jsxs)("summary",{children:[(0,s.jsx)(r,{})," History"]}),className:"history",children:(0,s.jsxs)("table",{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Version"}),(0,s.jsx)("th",{children:"Changes"})]})}),(0,s.jsx)("tbody",{children:n.map(((e,n)=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:(0,s.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,s.jsx)("td",{children:(0,s.jsx)("div",{className:"changes",children:e.changes.map(((e,n)=>(0,s.jsx)("section",{children:e},`change:${n}`)))})})]},`record:${n}`)))})]})})}},4722:(e,n,t)=>{t.d(n,{A:()=>l});var o=t(6540);const r=(...e)=>e.filter(((e,n,t)=>Boolean(e)&&""!==e.trim()&&t.indexOf(e)===n)).join(" ").trim();var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const a=(0,o.forwardRef)((({color:e="currentColor",size:n=24,strokeWidth:t=2,absoluteStrokeWidth:a,className:l="",children:i,iconNode:c,...d},u)=>(0,o.createElement)("svg",{ref:u,...s,width:n,height:n,stroke:e,strokeWidth:a?24*Number(t)/Number(n):t,className:r("lucide",l),...d},[...c.map((([e,n])=>(0,o.createElement)(e,n))),...Array.isArray(i)?i:[i]]))),l=(e,n)=>{const t=(0,o.forwardRef)((({className:t,...s},l)=>{return(0,o.createElement)(a,{ref:l,iconNode:n,className:r(`lucide-${i=e,i.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,t),...s});var i}));return t.displayName=`${e}`,t}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>l});var o=t(6540);const r={},s=o.createContext(r);function a(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);