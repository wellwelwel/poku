/*! For license information please see 655d8cd8.08c2cb87.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5568],{872:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"documentation/helpers/processes/kill","title":"Killing Processes","description":"Terminates the specified ports, port ranges and process IDs.","source":"@site/versioned_docs/version-2.x.x/documentation/helpers/processes/kill.mdx","sourceDirName":"documentation/helpers/processes","slug":"/documentation/helpers/processes/kill","permalink":"/docs/2.x.x/documentation/helpers/processes/kill","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/helpers/processes/kill.mdx","tags":[{"inline":true,"label":"processes","permalink":"/docs/2.x.x/tags/processes"},{"inline":true,"label":"ports","permalink":"/docs/2.x.x/tags/ports"}],"version":"2.x.x","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"tags":["processes","ports"]},"sidebar":"docs","previous":{"title":"\ud83d\udeaa Processes","permalink":"/docs/2.x.x/category/-processes"},"next":{"title":"Waiting For Ports","permalink":"/docs/2.x.x/documentation/helpers/processes/wait-for-port"}}');var l=n(4848),i=n(8453),t=n(8215);const o={sidebar_position:1,tags:["processes","ports"]},c="Killing Processes",a={},d=[{value:"kill.port",id:"killport",level:2},{value:"CLI",id:"cli",level:3},{value:"API",id:"api",level:3},{value:"kill.range",id:"killrange",level:2},{value:"CLI",id:"cli-1",level:3},{value:"API",id:"api-1",level:3},{value:"kill.pid",id:"killpid",level:2},{value:"CLI",id:"cli-2",level:3},{value:"API",id:"api-2",level:3}];function h(e){const s={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.header,{children:(0,l.jsx)(s.h1,{id:"killing-processes",children:"Killing Processes"})}),"\n",(0,l.jsx)(s.p,{children:"Terminates the specified ports, port ranges and process IDs."}),"\n",(0,l.jsx)(t.B,{records:[{version:"2.5.0",changes:[(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.strong,{children:"CLI:"})," deprecate ",(0,l.jsx)(s.code,{children:"--kill-port"})," in order to"," ",(0,l.jsx)(s.code,{children:"--killPort"}),"."]}),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.strong,{children:"CLI:"})," deprecate ",(0,l.jsx)(s.code,{children:"--kill-range"})," in order to"," ",(0,l.jsx)(s.code,{children:"--killRange"}),"."]}),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.strong,{children:"CLI:"})," deprecate ",(0,l.jsx)(s.code,{children:"--kill-pid"})," in order to"," ",(0,l.jsx)(s.code,{children:"--killPid"}),"."]})]}]}),"\n",(0,l.jsx)(s.h2,{id:"killport",children:"kill.port"}),"\n",(0,l.jsxs)(s.blockquote,{children:["\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.code,{children:"kill.port(port: number | number[])"})}),"\n"]}),"\n",(0,l.jsx)(s.p,{children:"Terminates the specified ports."}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["Requires ",(0,l.jsx)(s.code,{children:"lsof"})," for ",(0,l.jsx)(s.strong,{children:"Unix"})," and ",(0,l.jsx)(s.code,{children:"netstat"})," for ",(0,l.jsx)(s.strong,{children:"Windows"}),"."]}),"\n"]}),"\n",(0,l.jsx)(s.h3,{id:"cli",children:"CLI"}),"\n",(0,l.jsx)(s.p,{children:"Terminates the specified ports before running the test suite."}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:'npx poku --killPort="4000" targetPath\n'})}),"\n",(0,l.jsx)(s.p,{children:"Also, terminating multiple ports:"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:'npx poku --killPort="4000,4001" targetPath\n'})}),"\n",(0,l.jsx)(s.h3,{id:"api",children:"API"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-ts",children:"import { kill } from 'poku';\n\nawait kill.port(4000);\n"})}),"\n",(0,l.jsx)(s.p,{children:"Also, terminating multiple ports:"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-ts",children:"await kill.port([4000, 4001]);\n"})}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsx)(s.h2,{id:"killrange",children:"kill.range"}),"\n",(0,l.jsxs)(s.blockquote,{children:["\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.code,{children:"kill.range(startsAt: number, endsAt: number)"})}),"\n"]}),"\n",(0,l.jsx)(s.p,{children:"Terminates the specified port range."}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:["Requires ",(0,l.jsx)(s.code,{children:"lsof"})," for ",(0,l.jsx)(s.strong,{children:"Unix"})," and ",(0,l.jsx)(s.code,{children:"netstat"})," for ",(0,l.jsx)(s.strong,{children:"Windows"}),"."]}),"\n"]}),"\n",(0,l.jsx)(s.h3,{id:"cli-1",children:"CLI"}),"\n",(0,l.jsx)(s.p,{children:"Terminates the specified port range before running the test suite."}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:'npx poku --killRange="4000-4100" targetPath\n'})}),"\n",(0,l.jsx)(s.p,{children:"Also, terminating multiple port ranges:"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:'npx poku --killRange="4000-4100,5000-5100" targetPath\n'})}),"\n",(0,l.jsx)(s.h3,{id:"api-1",children:"API"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-ts",children:"import { kill } from 'poku';\n\nawait kill.range(4000, 4100);\n"})}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsx)(s.h2,{id:"killpid",children:"kill.pid"}),"\n",(0,l.jsxs)(s.blockquote,{children:["\n",(0,l.jsx)(s.p,{children:(0,l.jsx)(s.code,{children:"kill.pid(PID: number | number[])"})}),"\n"]}),"\n",(0,l.jsx)(s.p,{children:"Terminates the specified processes."}),"\n",(0,l.jsx)(s.h3,{id:"cli-2",children:"CLI"}),"\n",(0,l.jsx)(s.p,{children:"Terminates the specified processes before running the test suite"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:'npx poku --killPid="100" targetPath\n'})}),"\n",(0,l.jsx)(s.p,{children:"Also, terminating multiple processes:"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-bash",children:'npx poku --killPid="100,200" targetPath\n'})}),"\n",(0,l.jsx)(s.h3,{id:"api-2",children:"API"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-ts",children:"import { kill } from 'poku';\n\nawait kill.pid(100);\n"})}),"\n",(0,l.jsx)(s.p,{children:"Also, terminating multiple processes:"}),"\n",(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-ts",children:"await kill.pid([100, 200]);\n"})}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsxs)(s.admonition,{type:"tip",children:[(0,l.jsxs)(s.p,{children:["If your environment doesn't include ",(0,l.jsx)(s.code,{children:"lsof"})," by default:"]}),(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"macOS (Homebrew)"})}),(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-sh",children:"brew install lsof\n"})}),(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"Debian, Ubuntu, etc."})}),(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-sh",children:"sudo apt-get install lsof\n"})}),(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"Arch Linux, etc."})}),(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-sh",children:"sudo pacman -S lsof\n"})}),(0,l.jsx)(s.p,{children:(0,l.jsx)(s.strong,{children:"Alpine Linux, etc."})}),(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-sh",children:"apk add lsof\n"})})]})]})}function p(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,l.jsx)(s,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},1622:(e,s,n)=>{n.d(s,{A:()=>j});var r=n(6540),l=n(4164),i=n(3427),t=n(2303),o=n(1422);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var a=n(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function h(e,s){return!!e&&(e===s||h(e.parentElement,s))}function p(e){let{summary:s,children:n,...p}=e;(0,i.A)().collectAnchor(p.id);const x=(0,t.A)(),u=(0,r.useRef)(null),{collapsed:j,setCollapsed:m}=(0,o.u)({initialState:!p.open}),[g,k]=(0,r.useState)(p.open),f=r.isValidElement(s)?s:(0,a.jsx)("summary",{children:s??"Details"});return(0,a.jsxs)("details",{...p,ref:u,open:g,"data-collapsed":j,className:(0,l.A)(c.details,x&&c.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const s=e.target;d(s)&&h(s,u.current)&&(e.preventDefault(),j?(m(!1),k(!0)):m(!0))},children:[f,(0,a.jsx)(o.N,{lazy:!1,collapsed:j,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{m(e),k(!e)},children:(0,a.jsx)("div",{className:c.collapsibleContent,children:n})})]})}const x={details:"details_b_Ee"},u="alert alert--info";function j(e){let{...s}=e;return(0,a.jsx)(p,{...s,className:(0,l.A)(u,x.details,s.className)})}},8215:(e,s,n)=>{n.d(s,{B:()=>t});var r=n(1622);const l=(0,n(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var i=n(4848);const t=e=>{let{records:s,open:n}=e;return(0,i.jsx)(r.A,{open:n,summary:(0,i.jsxs)("summary",{children:[(0,i.jsx)(l,{})," History"]}),className:"history",children:(0,i.jsxs)("table",{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"Version"}),(0,i.jsx)("th",{children:"Changes"})]})}),(0,i.jsx)("tbody",{children:s.map(((e,s)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,i.jsx)("td",{children:(0,i.jsx)("div",{className:"changes",children:e.changes.map(((e,s)=>(0,i.jsx)("section",{children:e},`change:${s}`)))})})]},`record:${s}`)))})]})})}},4722:(e,s,n)=>{n.d(s,{A:()=>o});var r=n(6540);const l=(...e)=>e.filter(((e,s,n)=>Boolean(e)&&""!==e.trim()&&n.indexOf(e)===s)).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const t=(0,r.forwardRef)((({color:e="currentColor",size:s=24,strokeWidth:n=2,absoluteStrokeWidth:t,className:o="",children:c,iconNode:a,...d},h)=>(0,r.createElement)("svg",{ref:h,...i,width:s,height:s,stroke:e,strokeWidth:t?24*Number(n)/Number(s):n,className:l("lucide",o),...d},[...a.map((([e,s])=>(0,r.createElement)(e,s))),...Array.isArray(c)?c:[c]]))),o=(e,s)=>{const n=(0,r.forwardRef)((({className:n,...i},o)=>{return(0,r.createElement)(t,{ref:o,iconNode:s,className:l(`lucide-${c=e,c.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,n),...i});var c}));return n.displayName=`${e}`,n}},8453:(e,s,n)=>{n.d(s,{R:()=>t,x:()=>o});var r=n(6540);const l={},i=r.createContext(l);function t(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);