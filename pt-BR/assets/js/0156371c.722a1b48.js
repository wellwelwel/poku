/*! For license information please see 0156371c.722a1b48.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8173],{7947:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"documentation/helpers/list-files","title":"\ud83d\uddc4\ufe0f List Files","description":"Retorna todos os arquivos em um diret\xf3rio (independente de sua profundidade) ou o pr\xf3prio arquivo.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/version-2.x.x/documentation/helpers/list-files.mdx","sourceDirName":"documentation/helpers","slug":"/documentation/helpers/list-files","permalink":"/pt-BR/docs/documentation/helpers/list-files","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/helpers/list-files.mdx","tags":[],"version":"2.x.x","frontMatter":{},"sidebar":"docs","previous":{"title":"\ud83c\udf0c only","permalink":"/pt-BR/docs/documentation/helpers/only"},"next":{"title":"\ud83d\udcdd Log","permalink":"/pt-BR/docs/documentation/helpers/log"}}');var r=n(4848),t=n(8453),o=n(8215);const l={},c="\ud83d\uddc4\ufe0f List Files",a={},d=[{value:"CLI",id:"cli",level:2},{value:"API",id:"api",level:2}];function h(e){const s={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"\ufe0f-list-files",children:"\ud83d\uddc4\ufe0f List Files"})}),"\n",(0,r.jsx)(s.p,{children:"Retorna todos os arquivos em um diret\xf3rio (independente de sua profundidade) ou o pr\xf3prio arquivo."}),"\n",(0,r.jsx)(o.B,{records:[{version:"2.4.0",changes:[(0,r.jsx)(r.Fragment,{children:"Suporte para uso via CLI."})]}]}),"\n",(0,r.jsx)(s.h2,{id:"cli",children:"CLI"}),"\n",(0,r.jsx)(s.p,{children:"Exibe todos os arquivos retornados no terminal, sem executar os testes."}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"npx poku --listFiles\n"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"npx poku ./test --listFiles\n"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"npx poku ./packages/**/test --listFiles\n"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"npx poku ./test/unit ./test/e2e --listFiles\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Voc\xea pode usar as flags ",(0,r.jsx)(s.code,{children:"--filter"})," e ",(0,r.jsx)(s.code,{children:"--exclude"})," e incluir m\xfaltiplos caminhos."]}),"\n"]}),"\n",(0,r.jsxs)(s.admonition,{type:"note",children:[(0,r.jsxs)(s.p,{children:["Os arquivos retornados pelo ",(0,r.jsx)(s.code,{children:"--listFiles"})," n\xe3o refletem os caminhos exibidos pelo ",(0,r.jsx)(s.code,{children:"--debug"}),":"]}),(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsxs)(s.strong,{children:[(0,r.jsx)(s.code,{children:"--debug"}),":"]})," os caminhos a serem pesquisados."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsxs)(s.strong,{children:[(0,r.jsx)(s.code,{children:"--listFiles"}),":"]})," os caminhos encontrados."]}),"\n"]})]}),"\n",(0,r.jsx)(s.admonition,{type:"tip",children:(0,r.jsxs)(s.p,{children:["Se voc\xea passar flags diferentes de ",(0,r.jsx)(s.code,{children:"--filter"})," e ",(0,r.jsx)(s.code,{children:"--exclude"}),", elas ser\xe3o ignoradas."]})}),"\n",(0,r.jsx)(s.h2,{id:"api",children:"API"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"listFiles(diret\xf3rioDeDestino: string, configs?: ListFilesConfigs)"})}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"import { listFiles } from 'poku';\n\nawait listFiles('algum-diret\xf3rio');\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Voc\xea pode usar as op\xe7\xf5es ",(0,r.jsx)(s.code,{children:"filter"})," e ",(0,r.jsx)(s.code,{children:"exclude"}),", assim como s\xe3o usadas no m\xe9todo ",(0,r.jsx)(s.strong,{children:(0,r.jsx)(s.code,{children:"poku"})}),"."]}),"\n"]}),"\n",(0,r.jsxs)(s.admonition,{type:"info",children:[(0,r.jsxs)(s.p,{children:["Para compilar testes usando ",(0,r.jsx)(s.code,{children:"listFiles"})," com ",(0,r.jsx)(s.strong,{children:"TypeScript"}),", voc\xea pode precisar instalar o ",(0,r.jsx)(s.strong,{children:"@types/node"}),":"]}),(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"npm i -D @types/node\n"})})]})]})}function p(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},1622:(e,s,n)=>{n.d(s,{A:()=>m});var i=n(6540),r=n(4164),t=n(3427),o=n(2303),l=n(1422);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var a=n(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function h(e,s){return!!e&&(e===s||h(e.parentElement,s))}function p(e){let{summary:s,children:n,...p}=e;(0,t.A)().collectAnchor(p.id);const u=(0,o.A)(),x=(0,i.useRef)(null),{collapsed:m,setCollapsed:j}=(0,l.u)({initialState:!p.open}),[f,g]=(0,i.useState)(p.open),v=i.isValidElement(s)?s:(0,a.jsx)("summary",{children:s??"Details"});return(0,a.jsxs)("details",{...p,ref:x,open:f,"data-collapsed":m,className:(0,r.A)(c.details,u&&c.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const s=e.target;d(s)&&h(s,x.current)&&(e.preventDefault(),m?(j(!1),g(!0)):j(!0))},children:[v,(0,a.jsx)(l.N,{lazy:!1,collapsed:m,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{j(e),g(!e)},children:(0,a.jsx)("div",{className:c.collapsibleContent,children:n})})]})}const u={details:"details_b_Ee"},x="alert alert--info";function m(e){let{...s}=e;return(0,a.jsx)(p,{...s,className:(0,r.A)(x,u.details,s.className)})}},8215:(e,s,n)=>{n.d(s,{B:()=>o});var i=n(1622);const r=(0,n(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var t=n(4848);const o=e=>{let{records:s,open:n}=e;return(0,t.jsx)(i.A,{open:n,summary:(0,t.jsxs)("summary",{children:[(0,t.jsx)(r,{})," History"]}),className:"history",children:(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Version"}),(0,t.jsx)("th",{children:"Changes"})]})}),(0,t.jsx)("tbody",{children:s.map(((e,s)=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,t.jsx)("td",{children:(0,t.jsx)("div",{className:"changes",children:e.changes.map(((e,s)=>(0,t.jsx)("section",{children:e},`change:${s}`)))})})]},`record:${s}`)))})]})})}},4722:(e,s,n)=>{n.d(s,{A:()=>l});var i=n(6540);const r=(...e)=>e.filter(((e,s,n)=>Boolean(e)&&""!==e.trim()&&n.indexOf(e)===s)).join(" ").trim();var t={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const o=(0,i.forwardRef)((({color:e="currentColor",size:s=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:l="",children:c,iconNode:a,...d},h)=>(0,i.createElement)("svg",{ref:h,...t,width:s,height:s,stroke:e,strokeWidth:o?24*Number(n)/Number(s):n,className:r("lucide",l),...d},[...a.map((([e,s])=>(0,i.createElement)(e,s))),...Array.isArray(c)?c:[c]]))),l=(e,s)=>{const n=(0,i.forwardRef)((({className:n,...t},l)=>{return(0,i.createElement)(o,{ref:l,iconNode:s,className:r(`lucide-${c=e,c.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,n),...t});var c}));return n.displayName=`${e}`,n}},8453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>l});var i=n(6540);const r={},t=i.createContext(r);function o(e){const s=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(t.Provider,{value:s},e.children)}}}]);