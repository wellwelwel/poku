"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2330],{62:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>a,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"documentation/poku/options/no-exit","title":"noExit","description":"Definindo noExit como true, o Poku n\xe3o ir\xe1 encerrar o processo e ir\xe1 retornar o c\xf3digo de sa\xedda (0 ou 1).","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/documentation/poku/options/no-exit.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/no-exit","permalink":"/pt-BR/docs/documentation/poku/options/no-exit","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/options/no-exit.mdx","tags":[],"version":"current","sidebarPosition":99,"frontMatter":{"sidebar_position":99},"sidebar":"docs","previous":{"title":"deno","permalink":"/pt-BR/docs/documentation/poku/options/deno"},"next":{"title":"\ud83d\udd75\ud83c\udffb Assert","permalink":"/pt-BR/docs/documentation/assert/"}}');var s=n(4848),i=n(8453);const r={sidebar_position:99},c="noExit",a={},d=[{value:"API",id:"api",level:2}];function u(e){const o={code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.header,{children:(0,s.jsx)(o.h1,{id:"noexit",children:(0,s.jsx)(o.code,{children:"noExit"})})}),"\n",(0,s.jsxs)(o.p,{children:["Definindo ",(0,s.jsx)(o.code,{children:"noExit"})," como ",(0,s.jsx)(o.code,{children:"true"}),", o ",(0,s.jsx)(o.strong,{children:"Poku"})," n\xe3o ir\xe1 encerrar o processo e ir\xe1 retornar o c\xf3digo de sa\xedda (",(0,s.jsx)(o.code,{children:"0"})," ou ",(0,s.jsx)(o.code,{children:"1"}),").",(0,s.jsx)("br",{}),"\nVoc\xea pode combinar essa op\xe7\xe3o com o m\xe9todo ",(0,s.jsx)(o.code,{children:"exit"})," do ",(0,s.jsx)(o.strong,{children:"Poku"})," ou apenas usar o resultado, por exemplo: ",(0,s.jsx)(o.code,{children:"process.exit(code)"}),"."]}),"\n",(0,s.jsx)(o.h2,{id:"api",children:"API"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-ts",children:"import { poku, exit } from 'poku';\n\nconst unit = await poku('test/unit', {\n  noExit: true,\n  quiet: true,\n});\n\n// Fa\xe7a algo\n\nconst integration = await poku('test/integration', {\n  noExit: true,\n  quiet: true,\n});\n\n// Fa\xe7a algo mais\n\nconst code = unit === 0 && integration === 0 ? 0 : 1;\n\n// Fa\xe7a algo mais novamente\n\nexit(code);\n"})}),"\n",(0,s.jsxs)("blockquote",{children:[(0,s.jsx)(o.p,{children:"Em seguida, execute o arquivo diretamente com a plataforma de sua escolha, por exemplo:"}),(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"node test/run.test.js\n"})}),(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-bash",children:"npx tsx test/run.test.ts\n"})})]})]})}function p(e={}){const{wrapper:o}={...(0,i.R)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},8453:(e,o,n)=>{n.d(o,{R:()=>r,x:()=>c});var t=n(6540);const s={},i=t.createContext(s);function r(e){const o=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function c(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(i.Provider,{value:o},e.children)}}}]);