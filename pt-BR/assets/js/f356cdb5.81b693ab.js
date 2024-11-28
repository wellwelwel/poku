/*! For license information please see f356cdb5.81b693ab.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7693],{308:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>u});const o=JSON.parse('{"id":"documentation/poku/config-files","title":"\u2699\ufe0f Arquivos de configura\xe7\xe3o","description":"Por padr\xe3o, o Poku vem com as configura\xe7\xf5es de uso mais comuns predefinidas, mas voc\xea pode ajust\xe1-las como desejar.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/documentation/poku/config-files.mdx","sourceDirName":"documentation/poku","slug":"/documentation/poku/config-files","permalink":"/pt-BR/docs/documentation/poku/config-files","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/config-files.mdx","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"docs","previous":{"title":"\ud83d\udce6 Incluir Diret\xf3rios e Arquivos","permalink":"/pt-BR/docs/documentation/poku/include-files"},"next":{"title":"\ud83e\udde9 Options","permalink":"/pt-BR/docs/category/-options"}}');var r=s(4848),i=s(8453),a=s(8215),t=s(2467);const l={sidebar_position:2},c="\u2699\ufe0f Arquivos de configura\xe7\xe3o",d={},u=[{value:"JavaScript",id:"javascript",level:2},{value:"JSON and JSONC",id:"json-and-jsonc",level:2},{value:"Arquivos de Configura\xe7\xe3o Padr\xe3o",id:"arquivos-de-configura\xe7\xe3o-padr\xe3o",level:2},{value:"Arquivo Personalizado",id:"arquivo-personalizado",level:2}];function p(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"\ufe0f-arquivos-de-configura\xe7\xe3o",children:"\u2699\ufe0f Arquivos de configura\xe7\xe3o"})}),"\n",(0,r.jsxs)(n.p,{children:["Por padr\xe3o, o ",(0,r.jsx)(n.strong,{children:"Poku"})," vem com as configura\xe7\xf5es de uso mais comuns predefinidas, mas voc\xea pode ajust\xe1-las como desejar."]}),"\n",(0,r.jsx)(a.B,{records:[{version:"2.2.0",changes:[(0,r.jsxs)(r.Fragment,{children:["Suporte para a flag curta ",(0,r.jsx)(n.code,{children:"-c"}),"."]})]},{version:"2.1.0",changes:[(0,r.jsxs)(r.Fragment,{children:["Suporte para arquivos de configura\xe7\xe3o (",(0,r.jsx)(n.code,{children:"js"})," e"," ",(0,r.jsx)(n.code,{children:"cjs"}),")."]}),(0,r.jsxs)(r.Fragment,{children:["Suporte para arquivos de configura\xe7\xe3o (",(0,r.jsx)(n.code,{children:"json"})," e"," ",(0,r.jsx)(n.code,{children:"jsonc"}),")."]})]}]}),"\n",(0,r.jsx)(n.h2,{id:"javascript",children:"JavaScript"}),"\n",(0,r.jsx)(t.k,{level:2,message:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.div,{children:[(0,r.jsx)(n.strong,{children:"Pr\xf3s:"})," Suporta fun\xe7\xf5es e regex."]}),(0,r.jsxs)(n.div,{children:[(0,r.jsx)(n.strong,{children:"Contras:"})," Precisa ser um arquivo CommonJS."]})]})}),"\n",(0,r.jsxs)(n.p,{children:["Crie um arquivo ",(0,r.jsx)(n.code,{children:"poku.config.js"})," (ou ",(0,r.jsx)(n.code,{children:"poku.config.cjs"})," quando estiver usando ",(0,r.jsx)(n.code,{children:'"type": "module"'})," no seu ",(0,r.jsx)(n.em,{children:"package.json"}),") no diret\xf3rio raiz do seu projeto, por exemplo:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const { defineConfig } = require('poku');\n\nmodule.exports = defineConfig({\n  include: ['.'], // N\xe3o suporta padr\xf5es glob\n  parallel: false,\n  debug: false,\n  filter: /\\.(test.|.spec)\\./,\n  exclude: [], // regex\n  failFast: false,\n  concurrency: 0, // Sem limite\n  quiet: false,\n  envFile: '.env',\n  kill: {\n    port: [3000],\n    range: [\n      [3000, 3003],\n      [4000, 4002],\n    ],\n    pid: [612],\n  },\n  platform: 'node', // \"node\", \"bun\" e \"deno\"\n  deno: {\n    allow: ['run', 'env', 'read', 'hrtime', 'net'],\n    deny: [], // O mesmo que allow\n    cjs: ['.js', '.cjs'], // extens\xf5es espec\xedficas\n    // \"cjs\": true // todas as extens\xf5es\n    // \"cjs\": false // sem polyfill\n  },\n  beforeEach: () => true, // Antes de cada arquivo de teste\n  afterEach: () => true, // Depois de cada arquivo de teste\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"json-and-jsonc",children:"JSON and JSONC"}),"\n",(0,r.jsx)(t.k,{level:2,message:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.div,{children:[(0,r.jsx)(n.strong,{children:"Pr\xf3s:"})," Arquivo universal para CommonJS, ES Modules e TypeScript."]}),(0,r.jsxs)(n.div,{children:[(0,r.jsx)(n.strong,{children:"Contras:"})," N\xe3o suporta fun\xe7\xf5es e regex."]})]})}),"\n",(0,r.jsxs)(n.p,{children:["Crie um arquivo ",(0,r.jsx)(n.code,{children:".pokurc.json"})," (ou ",(0,r.jsx)(n.code,{children:".pokurc.jsonc"}),") no diret\xf3rio raiz do seu projeto, por exemplo:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'{\n  "$schema": "https://poku.io/schemas/configs.json",\n  "include": ["."], // N\xe3o suporta padr\xf5es glob\n  "parallel": false,\n  "debug": false,\n  "filter": ".test.|.spec.", // regex como string\n  "exclude": "", // regex como string\n  "failFast": false,\n  "concurrency": 0, // Sem limite\n  "quiet": false,\n  "envFile": ".env",\n  "kill": {\n    "port": [3000],\n    "range": [\n      [3000, 3003],\n      [4000, 4002],\n    ],\n    "pid": [612],\n  },\n  "platform": "node", // "node", "bun" e "deno"\n  "deno": {\n    "allow": ["run", "env", "read", "hrtime", "net"],\n    "deny": [], // O mesmo que allow\n    "cjs": [".js", ".cjs"], // extens\xf5es espec\xedficas\n    // "cjs": true // todas as extens\xf5es\n    // "cjs": false // sem polyfill\n  }\n}\n'})}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["A propriedade ",(0,r.jsx)(n.code,{children:"$schema"})," permite sugest\xf5es inteligentes no ",(0,r.jsx)(n.em,{children:"JSON"})," para te ajudar a personalizar o ",(0,r.jsx)(n.strong,{children:"Poku"}),"."]}),"\n",(0,r.jsx)(n.li,{children:"Todas as op\xe7\xf5es s\xe3o opcionais."}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"/docs/category/-options",children:"Veja os detalhes de todas as op\xe7\xf5es"}),"."]}),"\n"]})}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:["Compartilha as mesmas limita\xe7\xf5es das flags do ",(0,r.jsx)(n.em,{children:"CLI"}),"."]})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"arquivos-de-configura\xe7\xe3o-padr\xe3o",children:"Arquivos de Configura\xe7\xe3o Padr\xe3o"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Em ordem de prioridade."}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"poku.config.js"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"poku.config.cjs"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:".pokurc.json"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:".pokurc.jsonc"})}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Usar uma configura\xe7\xe3o duplicada via CLI ir\xe1 sobrescrever a op\xe7\xe3o no arquivo de configura\xe7\xe3o."}),"\n",(0,r.jsxs)(n.li,{children:["Se houver m\xfaltiplos arquivos de configura\xe7\xe3o no mesmo diret\xf3rio, o ",(0,r.jsx)(n.strong,{children:"Poku"})," ir\xe1 procurar \u2014 e usar\xe1 \u2014 apenas um."]}),"\n"]})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"arquivo-personalizado",children:"Arquivo Personalizado"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"npx poku --config='meu-arquivo.json'\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"npx poku --config='meu-arquivo.jsonc'\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"npx poku --config='meu-arquivo'\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Flag curta: ",(0,r.jsx)(n.code,{children:"-c"}),"."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},1622:(e,n,s)=>{s.d(n,{A:()=>m});var o=s(6540),r=s(4164),i=s(3427),a=s(2303),t=s(1422);const l={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=s(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function u(e,n){return!!e&&(e===n||u(e.parentElement,n))}function p(e){let{summary:n,children:s,...p}=e;(0,i.A)().collectAnchor(p.id);const h=(0,a.A)(),j=(0,o.useRef)(null),{collapsed:m,setCollapsed:x}=(0,t.u)({initialState:!p.open}),[g,f]=(0,o.useState)(p.open),v=o.isValidElement(n)?n:(0,c.jsx)("summary",{children:n??"Details"});return(0,c.jsxs)("details",{...p,ref:j,open:g,"data-collapsed":m,className:(0,r.A)(l.details,h&&l.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;d(n)&&u(n,j.current)&&(e.preventDefault(),m?(x(!1),f(!0)):x(!0))},children:[v,(0,c.jsx)(t.N,{lazy:!1,collapsed:m,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{x(e),f(!e)},children:(0,c.jsx)("div",{className:l.collapsibleContent,children:s})})]})}const h={details:"details_b_Ee"},j="alert alert--info";function m(e){let{...n}=e;return(0,c.jsx)(p,{...n,className:(0,r.A)(j,h.details,n.className)})}},8215:(e,n,s)=>{s.d(n,{B:()=>a});var o=s(1622);const r=(0,s(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var i=s(4848);const a=e=>{let{records:n,open:s}=e;return(0,i.jsx)(o.A,{open:s,summary:(0,i.jsxs)("summary",{children:[(0,i.jsx)(r,{})," History"]}),className:"history",children:(0,i.jsxs)("table",{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"Version"}),(0,i.jsx)("th",{children:"Changes"})]})}),(0,i.jsx)("tbody",{children:n.map(((e,n)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,i.jsx)("td",{children:(0,i.jsx)("div",{className:"changes",children:e.changes.map(((e,n)=>(0,i.jsx)("section",{children:e},`change:${n}`)))})})]},`record:${n}`)))})]})})}},2467:(e,n,s)=>{s.d(n,{k:()=>u});var o=s(4722);const r=(0,o.A)("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),i=(0,o.A)("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]),a=(0,o.A)("Microscope",[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]]),t=(0,o.A)("PackageSearch",[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}],["circle",{cx:"18.5",cy:"15.5",r:"2.5",key:"b5zd12"}],["path",{d:"M20.27 17.27 22 19",key:"1l4muz"}]]),l=(0,o.A)("PackageCheck",[["path",{d:"m16 16 2 2 4-4",key:"gfu2re"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]),c=(0,o.A)("LightbulbOff",[["path",{d:"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5",key:"1fkcox"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5",key:"10m8kw"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);var d=s(4848);const u=e=>{let{level:n,message:s}=e;const o={0:{title:"Deprecated",icon:(0,d.jsx)(r,{})},1:{title:"Experimental",icon:(0,d.jsx)(i,{})},1.1:{title:"Early Development",icon:(0,d.jsx)(a,{})},1.2:{title:"Release Candidate",icon:(0,d.jsx)(t,{})},2:{title:"Stable",icon:(0,d.jsx)(l,{})},3:{title:"Legacy",icon:(0,d.jsx)(c,{})}};return(0,d.jsxs)("section",{className:"stability","data-level":n,children:[(0,d.jsxs)("header",{children:[(0,d.jsx)("strong",{children:n}),(0,d.jsx)("span",{children:o[n].title}),o[n].icon]}),s?(0,d.jsx)("p",{children:s}):null]})}},4722:(e,n,s)=>{s.d(n,{A:()=>t});var o=s(6540);const r=(...e)=>e.filter(((e,n,s)=>Boolean(e)&&""!==e.trim()&&s.indexOf(e)===n)).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const a=(0,o.forwardRef)((({color:e="currentColor",size:n=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:t="",children:l,iconNode:c,...d},u)=>(0,o.createElement)("svg",{ref:u,...i,width:n,height:n,stroke:e,strokeWidth:a?24*Number(s)/Number(n):s,className:r("lucide",t),...d},[...c.map((([e,n])=>(0,o.createElement)(e,n))),...Array.isArray(l)?l:[l]]))),t=(e,n)=>{const s=(0,o.forwardRef)((({className:s,...i},t)=>{return(0,o.createElement)(a,{ref:t,iconNode:n,className:r(`lucide-${l=e,l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,s),...i});var l}));return s.displayName=`${e}`,s}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>t});var o=s(6540);const r={},i=o.createContext(r);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);