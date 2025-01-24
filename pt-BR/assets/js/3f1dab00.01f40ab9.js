"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9130],{4512:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>c});const o=JSON.parse('{"id":"documentation/helpers/processes/wait-for-port","title":"Aguardando Portas","description":"Aguarda as portas especificadas se tornarem ativas.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/documentation/helpers/processes/wait-for-port.mdx","sourceDirName":"documentation/helpers/processes","slug":"/documentation/helpers/processes/wait-for-port","permalink":"/pt-BR/docs/documentation/helpers/processes/wait-for-port","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/helpers/processes/wait-for-port.mdx","tags":[{"inline":true,"label":"flakey","permalink":"/pt-BR/docs/tags/flakey"},{"inline":true,"label":"containers","permalink":"/pt-BR/docs/tags/containers"}],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"tags":["flakey","containers"]},"sidebar":"docs","previous":{"title":"Encerrando Processos","permalink":"/pt-BR/docs/documentation/helpers/processes/kill"},"next":{"title":"Aguardando por Resultados Esperados","permalink":"/pt-BR/docs/documentation/helpers/processes/wait-for-expected-result"}}');var a=t(4848),s=t(8453),r=t(5397);const i={sidebar_position:2,tags:["flakey","containers"]},l="Aguardando Portas",d={},c=[{value:"waitForPort",id:"waitforport",level:2},{value:"Exemplos",id:"exemplos",level:2},{value:"Aguardando M\xfaltiplas Portas",id:"aguardando-m\xfaltiplas-portas",level:3},{value:"Aguardando um Servi\xe7o de Container na Porta 3000",id:"aguardando-um-servi\xe7o-de-container-na-porta-3000",level:3}];function p(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"aguardando-portas",children:"Aguardando Portas"})}),"\n",(0,a.jsx)(n.p,{children:"Aguarda as portas especificadas se tornarem ativas."}),"\n",(0,a.jsx)(n.h2,{id:"waitforport",children:"waitForPort"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"import { waitForPort } from 'poku';\n\nawait waitForPort(3000, {\n  delay: 0,\n  interval: 100,\n  timeout: 60000,\n  host: 'localhost',\n});\n"})}),"\n",(0,a.jsx)("hr",{}),"\n",(0,a.jsx)(r.T,{title:"Options",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:'export type WaitForPortOptions = {\n  /**\n   * Intervalo de tentativa em milissegundos\n   *\n   * ---\n   *\n   * @default 100\n   */\n  interval?: number;\n  /**\n   * Tempo limite em milissegundos\n   *\n   * ---\n   *\n   * @default 60000\n   */\n  timeout?: number;\n  /**\n   * Atrasa o in\xedcio e o fim pelo n\xfamero definido de milissegundos.\n   *\n   * ---\n   *\n   * @default 0\n   */\n  delay?: number;\n  /**\n   * Host para verificar a porta.\n   *\n   * ---\n   *\n   * @default "localhost"\n   */\n  host?: string;\n};\n'})})}),"\n",(0,a.jsx)("hr",{}),"\n",(0,a.jsx)(n.h2,{id:"exemplos",children:"Exemplos"}),"\n",(0,a.jsx)(n.h3,{id:"aguardando-m\xfaltiplas-portas",children:"Aguardando M\xfaltiplas Portas"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"import { waitForPort } from 'poku';\n\nawait Promise.all([\n  waitForPort(3000),\n  waitForPort(4000),\n  waitForPort(5000),\n  waitForPort(6000),\n]);\n"})}),"\n",(0,a.jsx)(n.h3,{id:"aguardando-um-servi\xe7o-de-container-na-porta-3000",children:"Aguardando um Servi\xe7o de Container na Porta 3000"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"import { docker, waitForPort } from 'poku';\n\n// highlight-start\nconst compose = docker.compose();\n\nawait compose.up();\n// highlight-end\nawait waitForPort(3000, { delay: 100 });\n\n// highlight-start\nconst res = await fetch('http://localhost:3000');\n// highlight-end\n\n/**\n * Os testes v\xeam aqui \ud83e\uddea\n */\n\n// highlight-start\nawait compose.down();\n// highlight-end\n"})}),"\n",(0,a.jsx)("hr",{}),"\n",(0,a.jsxs)(n.admonition,{type:"tip",children:[(0,a.jsxs)(n.p,{children:["O ",(0,a.jsx)(n.strong,{children:"Poku"})," exp\xf5e um auxiliar ",(0,a.jsx)(n.code,{children:"sleep"})," m\xednimo que apenas espera por milissegundos, al\xe9m do ",(0,a.jsx)(n.code,{children:"waitForPort"}),":"]}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"import { sleep } from 'poku';\n\n// Aguarda por 1 segundo\nawait sleep(1000);\n"})})]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},6701:(e,n,t)=>{t.d(n,{A:()=>g});var o=t(6540),a=t(4164),s=t(5246),r=t(9136),i=t(3535);const l={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var d=t(4848);function c(e){return!!e&&("SUMMARY"===e.tagName||c(e.parentElement))}function p(e,n){return!!e&&(e===n||p(e.parentElement,n))}function u(e){let{summary:n,children:t,...u}=e;(0,s.A)().collectAnchor(u.id);const m=(0,r.A)(),h=(0,o.useRef)(null),{collapsed:g,setCollapsed:f}=(0,i.u)({initialState:!u.open}),[x,w]=(0,o.useState)(u.open),j=o.isValidElement(n)?n:(0,d.jsx)("summary",{children:n??"Details"});return(0,d.jsxs)("details",{...u,ref:h,open:x,"data-collapsed":g,className:(0,a.A)(l.details,m&&l.isBrowser,u.className),onMouseDown:e=>{c(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;c(n)&&p(n,h.current)&&(e.preventDefault(),g?(f(!1),w(!0)):f(!0))},children:[j,(0,d.jsx)(i.N,{lazy:!1,collapsed:g,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{f(e),w(!e)},children:(0,d.jsx)("div",{className:l.collapsibleContent,children:t})})]})}const m={details:"details_b_Ee"},h="alert alert--info";function g(e){let{...n}=e;return(0,d.jsx)(u,{...n,className:(0,a.A)(h,m.details,n.className)})}},5397:(e,n,t)=>{t.d(n,{T:()=>s});var o=t(6701),a=t(4848);const s=e=>{let{children:n,open:t,title:s}=e;return(0,a.jsx)(o.A,{open:t,className:"faq",summary:(0,a.jsx)("summary",{children:(0,a.jsx)("strong",{children:s})}),children:(0,a.jsx)("section",{children:n})})}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>i});var o=t(6540);const a={},s=o.createContext(a);function r(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);