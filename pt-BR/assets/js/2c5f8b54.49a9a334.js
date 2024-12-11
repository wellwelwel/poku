"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4790],{5193:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>l,frontMatter:()=>r,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"documentation/poku/options/exclude","title":"exclude","description":"Exclui de acordo com o caminho usando Regex para corresponder apenas aos arquivos que devem ser executados.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/documentation/poku/options/exclude.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/exclude","permalink":"/pt-BR/docs/documentation/poku/options/exclude","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/options/exclude.mdx","tags":[{"inline":true,"label":"invert","permalink":"/pt-BR/docs/tags/invert"}],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4,"tags":["invert"]},"sidebar":"docs","previous":{"title":"filter","permalink":"/pt-BR/docs/documentation/poku/options/filter"},"next":{"title":"quiet","permalink":"/pt-BR/docs/documentation/poku/options/quiet"}}');var o=s(4848),i=s(8453);const r={sidebar_position:4,tags:["invert"]},c="exclude",a={},d=[{value:"CLI",id:"cli",level:2},{value:"API",id:"api",level:2}];function u(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"exclude",children:(0,o.jsx)(n.code,{children:"exclude"})})}),"\n",(0,o.jsxs)(n.p,{children:["Exclui de acordo com o caminho usando ",(0,o.jsx)(n.strong,{children:"Regex"})," para corresponder apenas aos arquivos que devem ser executados."]}),"\n",(0,o.jsx)(n.h2,{id:"cli",children:"CLI"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Exclui diret\xf3rios e arquivos dos testes\n\nnpx poku --exclude='algum-arquivo-ou-diretorio' ./test\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"# Exclui diret\xf3rios e arquivos dos testes\n\nnpx poku --exclude='algum-arquivo-ou-diretorio|outro-arquivo-ou-diretorio' ./test\n"})}),"\n",(0,o.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"/**\n * Exclui diret\xf3rios dos testes\n */\n\nawait poku('./test', {\n  exclude: /\\/(helpers|tools)\\//,\n});\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"/**\n * Exclui diret\xf3rios dos testes\n */\n\nawait poku('./test', {\n  exclude: [/\\/helpers\\//, /\\/tools\\//],\n});\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"/**\n * Exclui arquivos espec\xedficos dos testes\n */\n\nawait poku('./test', {\n  exclude: /(index|common).test.ts/,\n});\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"/**\n * Exclui arquivos espec\xedficos dos testes\n */\n\nawait poku('./test', {\n  exclude: [/index.test.ts/, /common.test.ts/],\n});\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"/**\n * Exclui diret\xf3rios e arquivos dos testes\n */\n\nawait poku('./test', {\n  exclude: /\\/(helpers|tools)\\/|(index|common).test.ts/,\n});\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"/**\n * Exclui diret\xf3rios e arquivos dos testes\n */\n\nawait poku('./test', {\n  exclude: [/\\/helpers\\//, /\\/tools\\//, /index.test.ts/, /common.test.ts/],\n});\n"})})]})}function l(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>c});var t=s(6540);const o={},i=t.createContext(o);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);