"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6599],{1924:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"examples/browser/react","title":"ReactJS","description":"Para testar efetivamente os componentes do React, n\xf3s podemos combinar o Poku com a sua ferramenta de web scraping preferida.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/examples/browser/react.mdx","sourceDirName":"examples/browser","slug":"/examples/browser/react","permalink":"/pt-BR/docs/next/examples/browser/react","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/examples/browser/react.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"docs","previous":{"title":"Browser (E2E)","permalink":"/pt-BR/docs/next/category/browser-e2e"},"next":{"title":"Virtual DOM","permalink":"/pt-BR/docs/next/examples/browser/DOM"}}');var o=n(4848),s=n(8453);const a={sidebar_position:1},i="ReactJS",c={},l=[];function p(e){const t={blockquote:"blockquote",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"reactjs",children:"ReactJS"})}),"\n",(0,o.jsxs)(t.p,{children:["Para testar efetivamente os componentes do ",(0,o.jsx)(t.strong,{children:"React"}),", n\xf3s podemos combinar o ",(0,o.jsx)(t.strong,{children:"Poku"})," com a sua ferramenta de web scraping preferida."]}),"\n",(0,o.jsxs)(t.p,{children:["Para esse exemplo, vamos criar um app simples com ",(0,o.jsx)(t.strong,{children:"Vite React"})," e, em seguida, navegar nele usando o ",(0,o.jsx)(t.strong,{children:"Puppeteer"})," para interagir com a p\xe1gina:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:"# highlight-start\nnpm create vite@latest meu-projeto -- --template react\n# highlight-end\n"})}),"\n",(0,o.jsxs)(t.blockquote,{children:["\n",(0,o.jsxs)(t.p,{children:["Ir\xe1 criar um app ",(0,o.jsx)(t.strong,{children:"Vite React"})," padr\xe3o no diret\xf3rio ",(0,o.jsx)(t.code,{children:"meu-projeto"}),"."]}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"Etapas de teste:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["\u2705 Inicie o script ",(0,o.jsx)(t.code,{children:"dev"})," do arquivo ",(0,o.jsx)(t.code,{children:"meu-projeto/package.json"})," em segundo plano"]}),"\n",(0,o.jsxs)(t.li,{children:["\u2705 Verifique se o contador inicial \xe9 ",(0,o.jsx)(t.strong,{children:"zero"})]}),"\n",(0,o.jsx)(t.li,{children:"\u2705 Clique no bot\xe3o para incrementar o contador"}),"\n",(0,o.jsx)(t.li,{children:"\u2705 Verifique o valor atualizado do contador"}),"\n",(0,o.jsx)(t.li,{children:"\u2705 Feche o processo em segundo plano"}),"\n"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"import { assert, startScript } from 'poku';\n// highlight-start\nimport puppeteer from 'puppeteer';\n// highlight-end\n\nconst server = await startScript('dev', {\n  cwd: 'meu-projeto',\n});\n\n// highlight-start\nconst API = 'http://localhost:5173';\n\nconst browser = await puppeteer.launch();\nconst page = await browser.newPage();\n\nawait page.goto(API);\n\nconst button = await page.waitForSelector('button');\n// highlight-end\n\nassert.strictEqual(\n  await button.evaluate((e) => e.textContent),\n  'O contador \xe9 0',\n  'O contador inicial precisa ser 0'\n);\n\n// highlight-start\nawait button.click();\n// highlight-end\n\nassert.strictEqual(\n  await button.evaluate((e) => e.textContent),\n  'O contador \xe9 1',\n  'Ap\xf3s o clique, precisa ser 1'\n);\n\n// highlight-start\nawait browser.close();\n// highlight-end\nserver.end();\n"})})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>i});var r=n(6540);const o={},s=r.createContext(o);function a(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);