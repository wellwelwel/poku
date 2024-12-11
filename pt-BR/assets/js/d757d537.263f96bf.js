"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8075],{7766:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>r,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"documentation/helpers/skip","title":"\u23ed\ufe0f skip","description":"Voc\xea pode pular testes quando necess\xe1rio:","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/version-2.x.x/documentation/helpers/skip.mdx","sourceDirName":"documentation/helpers","slug":"/documentation/helpers/skip","permalink":"/pt-BR/docs/documentation/helpers/skip","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/helpers/skip.mdx","tags":[],"version":"2.x.x","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"docs","previous":{"title":"\u2699\ufe0f env","permalink":"/pt-BR/docs/documentation/helpers/env"},"next":{"title":"\ud83e\uddd9\ud83c\udffb Before and After Each","permalink":"/pt-BR/docs/category/-before-and-after-each"}}');var t=o(4848),i=o(8453);const r={sidebar_position:4},a="\u23ed\ufe0f skip",c={},d=[{value:"Exemplos",id:"exemplos",level:2}];function p(e){const n={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",hr:"hr",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"\ufe0f-skip",children:"\u23ed\ufe0f skip"})}),"\n",(0,t.jsx)(n.p,{children:"Voc\xea pode pular testes quando necess\xe1rio:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { skip } from 'poku';\n\nskip();\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Voc\xea tamb\xe9m pode passar uma mensagem opcional para o m\xe9todo ",(0,t.jsx)(n.code,{children:"skip"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { skip } from 'poku';\n\nskip('Pulando por algum motivo');\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"important",children:(0,t.jsx)(n.p,{children:"Isto pular\xe1 o arquivo inteiro e \xe9 recomend\xe1vel us\xe1-lo no in\xedcio do arquivo de teste."})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"exemplos",children:"Exemplos"}),"\n",(0,t.jsxs)(n.p,{children:["Imagine que um teste espec\xedfico n\xe3o funcione em um ",(0,t.jsx)(n.em,{children:"SO"})," espec\xedfico:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { test, skip } from 'poku';\n// highlight-start\nimport { platform } from 'node:process';\n\nconst isWindows = platform === 'win32';\n\n// highlight-end\nif (isWindows) skip('Pulando devido \xe0 incompatibilidade com o Windows');\n\n// Executa testes normalmente em outros sistemas operacionais\n// highlight-start\ntest(() => {\n  // ...\n});\n// highlight-end\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"Testes pulados s\xe3o considerados testes bem-sucedidos."})})]})}function l(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>a});var s=o(6540);const t={},i=s.createContext(t);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);