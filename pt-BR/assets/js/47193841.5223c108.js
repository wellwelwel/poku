/*! For license information please see 47193841.5223c108.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4310],{1326:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"documentation/poku/include-files","title":"\ud83d\udce6 Incluir Diret\xf3rios e Arquivos","description":"Por padr\xe3o, o Poku busca por arquivos .test. e .spec., mas voc\xea pode customiz\xe1-lo usando a op\xe7\xe3o filter.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/documentation/poku/include-files.mdx","sourceDirName":"documentation/poku","slug":"/documentation/poku/include-files","permalink":"/pt-BR/docs/next/documentation/poku/include-files","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/include-files.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"docs","previous":{"title":"\ud83d\udc37 Poku","permalink":"/pt-BR/docs/next/category/-poku"},"next":{"title":"\u2699\ufe0f Arquivos de configura\xe7\xe3o","permalink":"/pt-BR/docs/next/documentation/poku/config-files"}}');var o=n(4848),a=n(8453),r=n(8215);n(2467);const i={sidebar_position:1},l="\ud83d\udce6 Incluir Diret\xf3rios e Arquivos",c={},d=[{value:"CLI",id:"cli",level:2},{value:"Uso Comum",id:"uso-comum",level:3},{value:"Definindo m\xfaltiplos caminhos",id:"definindo-m\xfaltiplos-caminhos",level:3},{value:"Estendendo padr\xf5es Glob a partir do shell",id:"estendendo-padr\xf5es-glob-a-partir-do-shell",level:3},{value:"API",id:"api",level:2}];function h(e){const s={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.header,{children:(0,o.jsx)(s.h1,{id:"-incluir-diret\xf3rios-e-arquivos",children:"\ud83d\udce6 Incluir Diret\xf3rios e Arquivos"})}),"\n",(0,o.jsxs)(s.p,{children:["Por padr\xe3o, o ",(0,o.jsx)(s.strong,{children:"Poku"})," busca por arquivos ",(0,o.jsx)(s.em,{children:(0,o.jsx)(s.code,{children:".test."})})," e ",(0,o.jsx)(s.code,{children:".spec."}),", mas voc\xea pode customiz\xe1-lo usando a op\xe7\xe3o ",(0,o.jsx)(s.a,{href:"/docs/documentation/poku/options/filter",children:(0,o.jsx)(s.code,{children:"filter"})}),"."]}),"\n",(0,o.jsx)(r.B,{records:[{version:"2.1.0",changes:[(0,o.jsx)(o.Fragment,{children:"Suporte para m\xfaltiplos caminhos em qualquer ordem."}),(0,o.jsxs)(o.Fragment,{children:["Flag ",(0,o.jsx)(s.code,{children:"--include"})," depreciada."]}),(0,o.jsx)(o.Fragment,{children:"Mant\xe9m suporte retroativo para m\xfaltiplos caminhos separados por v\xedrgula para evitar mudan\xe7as incompat\xedveis."})]}]}),"\n",(0,o.jsx)(s.h2,{id:"cli",children:"CLI"}),"\n",(0,o.jsx)(s.h3,{id:"uso-comum",children:"Uso Comum"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-bash",children:"# Equivalente \xe0 ./\nnpx poku\n"})}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsx)(s.li,{children:"Executa todos os testes em paralelo."}),"\n"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-bash",children:"# Equivalente \xe0 ./\nnpx poku --sequential\n"})}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsx)(s.li,{children:"Executa todos os testes sequencialmente."}),"\n"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-bash",children:"npx poku ./test\n"})}),"\n",(0,o.jsxs)(s.ul,{children:["\n",(0,o.jsxs)(s.li,{children:["Executa todos os testes do diret\xf3rio ",(0,o.jsx)(s.code,{children:"./test"}),"."]}),"\n"]}),"\n",(0,o.jsx)(s.admonition,{type:"tip",children:(0,o.jsx)(s.p,{children:"Voc\xea pode passar tanto diret\xf3rios quanto arquivos."})}),"\n",(0,o.jsx)(s.admonition,{type:"note",children:(0,o.jsxs)(s.p,{children:["N\xe3o \xe9 poss\xedvel executar testes nos diret\xf3rios ",(0,o.jsx)(s.code,{children:".git"})," e ",(0,o.jsx)(s.code,{children:"node_modules"}),"."]})}),"\n",(0,o.jsx)("hr",{}),"\n",(0,o.jsx)(s.h3,{id:"definindo-m\xfaltiplos-caminhos",children:"Definindo m\xfaltiplos caminhos"}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-bash",children:"npx poku caminhoDoTesteA caminhoDoTesteB\n"})}),"\n",(0,o.jsx)("hr",{}),"\n",(0,o.jsx)(s.h3,{id:"estendendo-padr\xf5es-glob-a-partir-do-shell",children:"Estendendo padr\xf5es Glob a partir do shell"}),"\n",(0,o.jsxs)(s.p,{children:["Voc\xea tamb\xe9m pode estender os ",(0,o.jsx)(s.strong,{children:"padr\xf5es do Glob"})," com ",(0,o.jsx)(s.code,{children:"npx"}),", ",(0,o.jsx)(s.code,{children:"bun"}),", ",(0,o.jsx)(s.code,{children:"yarn"}),", etc."]}),"\n",(0,o.jsxs)(s.p,{children:["Por exemplo, executando todos os testes unit\xe1rios de um ",(0,o.jsx)(s.em,{children:"monorepo"}),":"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"npx poku ./packages/**/test/unit\n"})}),"\n",(0,o.jsxs)(s.p,{children:["Agora, listando todos os arquivos ",(0,o.jsx)(s.code,{children:".js"})," em vez do padr\xe3o ",(0,o.jsx)(s.code,{children:".test.|.spec."}),":"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"npx poku --filter='.js' ./packages/**/test/unit\n"})}),"\n",(0,o.jsxs)(s.p,{children:["Ou tamb\xe9m, ao anular o ",(0,o.jsx)(s.code,{children:"filter"}),":"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-sh",children:"npx poku --filter='' ./packages/**/test/unit/*.js\n"})}),"\n",(0,o.jsx)("hr",{}),"\n",(0,o.jsx)(s.h2,{id:"api",children:"API"}),"\n",(0,o.jsxs)(s.blockquote,{children:["\n",(0,o.jsx)(s.p,{children:(0,o.jsx)(s.code,{children:"poku(caminhosDoTestes: string | string[])"})}),"\n"]}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-ts",children:"await poku('caminhoDoTeste');\n"})}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-ts",children:"await poku(['caminhoDoTesteA', 'caminhoDoTesteB']);\n"})}),"\n",(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-ts",children:"await poku('./');\n"})}),"\n",(0,o.jsxs)("blockquote",{children:[(0,o.jsx)(s.p,{children:"Em seguida, execute o arquivo diretamente com a plataforma de sua escolha, por exemplo:"}),(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-bash",children:"node test/run.test.js\n"})}),(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:"language-bash",children:"npx tsx test/run.test.ts\n"})})]})]})}function p(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,o.jsx)(s,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},1622:(e,s,n)=>{n.d(s,{A:()=>x});var t=n(6540),o=n(4164),a=n(3427),r=n(2303),i=n(1422);const l={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=n(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function h(e,s){return!!e&&(e===s||h(e.parentElement,s))}function p(e){let{summary:s,children:n,...p}=e;(0,a.A)().collectAnchor(p.id);const u=(0,r.A)(),m=(0,t.useRef)(null),{collapsed:x,setCollapsed:j}=(0,i.u)({initialState:!p.open}),[k,g]=(0,t.useState)(p.open),v=t.isValidElement(s)?s:(0,c.jsx)("summary",{children:s??"Details"});return(0,c.jsxs)("details",{...p,ref:m,open:k,"data-collapsed":x,className:(0,o.A)(l.details,u&&l.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const s=e.target;d(s)&&h(s,m.current)&&(e.preventDefault(),x?(j(!1),g(!0)):j(!0))},children:[v,(0,c.jsx)(i.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{j(e),g(!e)},children:(0,c.jsx)("div",{className:l.collapsibleContent,children:n})})]})}const u={details:"details_b_Ee"},m="alert alert--info";function x(e){let{...s}=e;return(0,c.jsx)(p,{...s,className:(0,o.A)(m,u.details,s.className)})}},8215:(e,s,n)=>{n.d(s,{B:()=>r});var t=n(1622);const o=(0,n(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var a=n(4848);const r=e=>{let{records:s,open:n}=e;return(0,a.jsx)(t.A,{open:n,summary:(0,a.jsxs)("summary",{children:[(0,a.jsx)(o,{})," History"]}),className:"history",children:(0,a.jsxs)("table",{children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:"Version"}),(0,a.jsx)("th",{children:"Changes"})]})}),(0,a.jsx)("tbody",{children:s.map(((e,s)=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:(0,a.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,a.jsx)("td",{children:(0,a.jsx)("div",{className:"changes",children:e.changes.map(((e,s)=>(0,a.jsx)("section",{children:e},`change:${s}`)))})})]},`record:${s}`)))})]})})}},2467:(e,s,n)=>{n.d(s,{k:()=>h});var t=n(4722);const o=(0,t.A)("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),a=(0,t.A)("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]),r=(0,t.A)("Microscope",[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]]),i=(0,t.A)("PackageSearch",[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}],["circle",{cx:"18.5",cy:"15.5",r:"2.5",key:"b5zd12"}],["path",{d:"M20.27 17.27 22 19",key:"1l4muz"}]]),l=(0,t.A)("PackageCheck",[["path",{d:"m16 16 2 2 4-4",key:"gfu2re"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]),c=(0,t.A)("LightbulbOff",[["path",{d:"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5",key:"1fkcox"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5",key:"10m8kw"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);var d=n(4848);const h=e=>{let{level:s,message:n}=e;const t={0:{title:"Deprecated",icon:(0,d.jsx)(o,{})},1:{title:"Experimental",icon:(0,d.jsx)(a,{})},1.1:{title:"Early Development",icon:(0,d.jsx)(r,{})},1.2:{title:"Release Candidate",icon:(0,d.jsx)(i,{})},2:{title:"Stable",icon:(0,d.jsx)(l,{})},3:{title:"Legacy",icon:(0,d.jsx)(c,{})}};return(0,d.jsxs)("section",{className:"stability","data-level":s,children:[(0,d.jsxs)("header",{children:[(0,d.jsx)("strong",{children:s}),(0,d.jsx)("span",{children:t[s].title}),t[s].icon]}),n?(0,d.jsx)("p",{children:n}):null]})}},4722:(e,s,n)=>{n.d(s,{A:()=>i});var t=n(6540);const o=(...e)=>e.filter(((e,s,n)=>Boolean(e)&&""!==e.trim()&&n.indexOf(e)===s)).join(" ").trim();var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const r=(0,t.forwardRef)((({color:e="currentColor",size:s=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:l,iconNode:c,...d},h)=>(0,t.createElement)("svg",{ref:h,...a,width:s,height:s,stroke:e,strokeWidth:r?24*Number(n)/Number(s):n,className:o("lucide",i),...d},[...c.map((([e,s])=>(0,t.createElement)(e,s))),...Array.isArray(l)?l:[l]]))),i=(e,s)=>{const n=(0,t.forwardRef)((({className:n,...a},i)=>{return(0,t.createElement)(r,{ref:i,iconNode:s,className:o(`lucide-${l=e,l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,n),...a});var l}));return n.displayName=`${e}`,n}},8453:(e,s,n)=>{n.d(s,{R:()=>r,x:()=>i});var t=n(6540);const o={},a=t.createContext(o);function r(e){const s=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(a.Provider,{value:s},e.children)}}}]);