"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[140],{954:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"documentation/poku/options/filter","title":"filter","description":"Filtra por caminho usando Regex para corresponder apenas aos arquivos que devem ser executados.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/documentation/poku/options/filter.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/filter","permalink":"/pt-BR/docs/documentation/poku/options/filter","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/options/filter.mdx","tags":[{"inline":true,"label":"grep","permalink":"/pt-BR/docs/tags/grep"}],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"tags":["grep"]},"sidebar":"docs","previous":{"title":"sequential","permalink":"/pt-BR/docs/documentation/poku/options/sequential"},"next":{"title":"exclude","permalink":"/pt-BR/docs/documentation/poku/options/exclude"}}');var o=s(4848),i=s(8453);const a={sidebar_position:2,tags:["grep"]},r="filter",c={},l=[{value:"CLI",id:"cli",level:2},{value:"Vari\xe1vel de Ambiente",id:"vari\xe1vel-de-ambiente",level:3},{value:"API",id:"api",level:2}];function d(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"filter",children:(0,o.jsx)(n.code,{children:"filter"})})}),"\n",(0,o.jsxs)(n.p,{children:["Filtra por caminho usando ",(0,o.jsx)(n.strong,{children:"Regex"})," para corresponder apenas aos arquivos que devem ser executados. ",(0,o.jsx)("br",{}),"\nPor padr\xe3o, o ",(0,o.jsx)(n.strong,{children:"Poku"})," procura os arquivos ",(0,o.jsx)(n.em,{children:(0,o.jsx)(n.code,{children:".test."})})," e ",(0,o.jsx)(n.code,{children:".spec."}),", mas voc\xea pode customiz\xe1-lo usando a op\xe7\xe3o ",(0,o.jsx)(n.code,{children:"filter"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"cli",children:"CLI"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Padr\xe3o\n\nnpx poku --filter='.test.|.spec.' ./test\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Testa apenas um arquivo espec\xedfico\n\nnpx poku --filter='some-file' ./test\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Testa apenas arquivos espec\xedficos\n\nnpx poku --filter='some-file|other-file' ./test\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Testa apenas caminhos que contenham \u201cunit\u201d\n\nnpx poku --filter='unit' ./test\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Testa somente os caminhos que cont\xeam \u201cunit\u201d usando o Poku como um script NPM\n\nnpm run tests -- --filter='unit'\n"})}),"\n",(0,o.jsx)(n.h3,{id:"vari\xe1vel-de-ambiente",children:"Vari\xe1vel de Ambiente"}),"\n",(0,o.jsxs)(n.p,{children:["Ao usar o ",(0,o.jsx)(n.code,{children:"FILTER"})," da ",(0,o.jsx)(n.strong,{children:"Vari\xe1vel de Ambiente"}),", ele substituir\xe1 a op\xe7\xe3o ",(0,o.jsx)(n.code,{children:"filter"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Testa apenas um arquivo espec\xedfico\n\nFILTER='some-file' npx poku ./test\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Testa apenas arquivos espec\xedficos\n\nFILTER='some-file|other-file' npx poku ./test\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Testa apenas caminhos que contenham \u201cunit\u201d\n\nFILTER='unit' npx poku ./test\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Testa somente os caminhos que cont\xeam \u201cunit\u201d usando o Poku como um script NPM\n\nFILTER='unit' npm run tests\n"})}),"\n",(0,o.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"/**\n * @default\n *\n * Testa todos os arquivos `*.test.*`.\n */\n\nawait poku('./test', {\n  filter: /\\.test\\./,\n});\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"/**\n * Testa todos os arquivos `ts`, `js`, `mts` e `mjs`\n */\n\nawait poku('./test', {\n  filter: /\\.(m)?(j|t)s$/,\n  // filter: /\\.(js|ts|mjs|mts)$/,\n});\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>a,x:()=>r});var t=s(6540);const o={},i=t.createContext(o);function a(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);