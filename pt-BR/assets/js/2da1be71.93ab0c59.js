"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8548],{9016:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>u,contentTitle:()=>d,default:()=>p,frontMatter:()=>c,metadata:()=>r,toc:()=>h});const r=JSON.parse('{"id":"tutorials/good-practices","title":"\ud83e\udeb4 Boas Pr\xe1ticas","description":"Organizando testes para diferentes necessidades, requisitos e abordagens.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/version-2.x.x/tutorials/good-practices.mdx","sourceDirName":"tutorials","slug":"/tutorials/good-practices","permalink":"/pt-BR/docs/2.x.x/tutorials/good-practices","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/tutorials/good-practices.mdx","tags":[{"inline":true,"label":"assert","permalink":"/pt-BR/docs/2.x.x/tags/assert"},{"inline":true,"label":"assertion","permalink":"/pt-BR/docs/2.x.x/tags/assertion"},{"inline":true,"label":"test","permalink":"/pt-BR/docs/2.x.x/tags/test"},{"inline":true,"label":"describe","permalink":"/pt-BR/docs/2.x.x/tags/describe"},{"inline":true,"label":"it","permalink":"/pt-BR/docs/2.x.x/tags/it"},{"inline":true,"label":"tutorial","permalink":"/pt-BR/docs/2.x.x/tags/tutorial"},{"inline":true,"label":"roadmap","permalink":"/pt-BR/docs/2.x.x/tags/roadmap"}],"version":"2.x.x","sidebarPosition":1,"frontMatter":{"title":"\ud83e\udeb4 Boas Pr\xe1ticas","description":"Organizando testes para diferentes necessidades, requisitos e abordagens.","tags":["assert","assertion","test","describe","it","tutorial","roadmap"],"sidebar_position":1},"sidebar":"docs","previous":{"title":"\ud83d\udc23 Iniciantes","permalink":"/pt-BR/docs/2.x.x/tutorials/beginner"},"next":{"title":"\ud83d\udc69\ud83c\udffc\u200d\ud83d\ude80 Testando em Diferentes Plataformas","permalink":"/pt-BR/docs/2.x.x/tutorials/cross-platform"}}');var n=t(4848),a=t(8453),o=t(5537),i=t(9329),l=t(6273);const c={title:"\ud83e\udeb4 Boas Pr\xe1ticas",description:"Organizando testes para diferentes necessidades, requisitos e abordagens.",tags:["assert","assertion","test","describe","it","tutorial","roadmap"],sidebar_position:1},d="\ud83e\udeb4 Boas Pr\xe1ticas",u={},h=[{value:"Organizando Testes",id:"organizando-testes",level:2},{value:"Separando testes com responsabilidades diferentes",id:"separando-testes-com-responsabilidades-diferentes",level:3},{value:"Categorizando testes com responsabilidades diferentes",id:"categorizando-testes-com-responsabilidades-diferentes",level:3},{value:"Descrevendo testes com responsabilidades diferentes",id:"descrevendo-testes-com-responsabilidades-diferentes",level:3}];function m(e){const s={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"title-section",children:[(0,n.jsxs)("aside",{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"-boas-pr\xe1ticas",children:"\ud83e\udeb4 Boas Pr\xe1ticas"})}),(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Organizando testes para diferentes necessidades, requisitos e abordagens."}),"\n"]})]}),(0,n.jsx)("aside",{children:(0,n.jsx)(l.A,{className:"logo",height:"128"})})]}),"\n",(0,n.jsx)("hr",{}),"\n",(0,n.jsx)(s.h2,{id:"organizando-testes",children:"Organizando Testes"}),"\n",(0,n.jsx)(s.p,{children:"Existem diversas motiva\xe7\xf5es para organizar os testes de forma mais eficiente:"}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:"Testes diferentes geralmente t\xeam seus pr\xf3prios arquivos."}),"\n",(0,n.jsx)(s.li,{children:"Uso de escopos isolados para declarar as mesmas vari\xe1veis ou isolamento de um teste do outro no mesmo arquivo."}),"\n",(0,n.jsx)(s.li,{children:"Agrupamento de m\xfaltiplos testes do mesmo m\xe9todo."}),"\n"]}),"\n",(0,n.jsxs)(s.p,{children:["Vamos criar dois m\xe9todos b\xe1sicos (",(0,n.jsx)(s.strong,{children:"soma"})," e ",(0,n.jsx)(s.strong,{children:"sub"}),") para serem testados:"]}),"\n",(0,n.jsx)(o.A,{children:(0,n.jsx)(i.A,{default:!0,value:"./src/calc.mjs",children:(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:"export const soma = (a, b) => a + b;\nexport const sub = (a, b) => a - b;\n"})})})}),"\n",(0,n.jsx)(s.h3,{id:"separando-testes-com-responsabilidades-diferentes",children:"Separando testes com responsabilidades diferentes"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:["Crie um arquivo para testar o m\xe9todo ",(0,n.jsx)(s.code,{children:"soma"})," e outro para o m\xe9todo ",(0,n.jsx)(s.code,{children:"sub"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(o.A,{children:[(0,n.jsx)(i.A,{default:!0,value:"./test/unit/soma.test.mjs",children:(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:"import { test, assert } from 'poku';\nimport { soma } from '../../src/calc.mjs';\n\ntest('Testando o m\xe9todo \"soma\"', () => {\n  assert(soma(0, 0), 0, 'deve retornar zero');\n  assert(soma(0, 1), 1, 'deve retornar um');\n  assert(soma(1, 1), 2, 'deve retornar dois');\n});\n"})})}),(0,n.jsx)(i.A,{default:!0,value:"./test/unit/sub.test.mjs",children:(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:"import { test, assert } from 'poku';\nimport { sub } from '../../src/calc.mjs';\n\ntest('Testando o m\xe9todo \"sub\"', () => {\n  assert(sub(1, 1), 0, 'deve retornar zero');\n  assert(sub(2, 1), 1, 'deve retornar um');\n  assert(sub(3, 1), 2, 'deve retornar dois');\n});\n"})})})]}),"\n",(0,n.jsx)("hr",{}),"\n",(0,n.jsx)(s.h3,{id:"categorizando-testes-com-responsabilidades-diferentes",children:"Categorizando testes com responsabilidades diferentes"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:["Crie um arquivo \xfanico para testar tanto o m\xe9todo ",(0,n.jsx)(s.code,{children:"soma"})," quanto o ",(0,n.jsx)(s.code,{children:"sub"}),"."]}),"\n"]}),"\n",(0,n.jsx)(o.A,{children:(0,n.jsx)(i.A,{default:!0,value:"./test/unit/calc.test.mjs",children:(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:"import { test, assert } from 'poku';\nimport { soma, sub } from '../../src/calc.mjs';\n\ntest('Testando o m\xe9todo \"soma\"', () => {\n  assert(soma(0, 0), 0, 'deve retornar zero');\n  assert(soma(0, 1), 1, 'deve retornar um');\n  assert(soma(1, 1), 2, 'deve retornar dois');\n});\n\ntest('Testando o m\xe9todo \"sub\"', () => {\n  assert(sub(1, 1), 0, 'deve retornar zero');\n  assert(sub(2, 1), 1, 'deve retornar um');\n  assert(sub(3, 1), 2, 'deve retornar dois');\n});\n"})})})}),"\n",(0,n.jsx)("hr",{}),"\n",(0,n.jsx)(s.h3,{id:"descrevendo-testes-com-responsabilidades-diferentes",children:"Descrevendo testes com responsabilidades diferentes"}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:["Crie um arquivo \xfanico para testar tanto o m\xe9todo ",(0,n.jsx)(s.code,{children:"soma"})," quanto o ",(0,n.jsx)(s.code,{children:"sub"}),"."]}),"\n"]}),"\n",(0,n.jsx)(o.A,{children:(0,n.jsx)(i.A,{default:!0,value:"./test/unit/calc.test.mjs",children:(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:"import { describe, it, assert } from 'poku';\nimport { soma, sub } from '../../src/calc.mjs';\n\ndescribe('Testando m\xe9todos de c\xe1lculo', () => {\n  it('M\xe9todo \"soma\"', () => {\n    assert(soma(0, 0), 0, 'deve retornar zero');\n    assert(soma(0, 1), 1, 'deve retornar um');\n    assert(soma(1, 1), 2, 'deve retornar dois');\n  });\n\n  it('M\xe9todo \"sub\"', () => {\n    assert(sub(1, 1), 0, 'deve retornar zero');\n    assert(sub(2, 1), 1, 'deve retornar um');\n    assert(sub(3, 1), 2, 'deve retornar dois');\n  });\n});\n"})})})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Ao usar ",(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"it"})," com mensagens, \xe9 comum n\xe3o incluir a mensagem no ",(0,n.jsx)(s.code,{children:"assert"}),"."]}),"\n"]}),"\n",(0,n.jsx)("hr",{}),"\n",(0,n.jsxs)(s.admonition,{type:"tip",children:[(0,n.jsxs)(s.p,{children:["Voc\xea pode escolher usar ",(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"it"}),", ou ",(0,n.jsx)(s.code,{children:"test"})," + ",(0,n.jsx)(s.code,{children:"describe"}),", ou ",(0,n.jsx)(s.code,{children:"test"})," + ",(0,n.jsx)(s.code,{children:"it"})," e assim por diante, mas observe que, se voc\xea usar mensagens, elas s\xf3 ser\xe3o formatadas corretamente para:"]}),(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.code,{children:"assert"})}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.code,{children:"test"})}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"test"})," + ",(0,n.jsx)(s.code,{children:"assert"})]}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.code,{children:"it"})}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"it"})," + ",(0,n.jsx)(s.code,{children:"assert"})]}),"\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.code,{children:"describe"})}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"assert"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"it"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"it"})," + ",(0,n.jsx)(s.code,{children:"assert"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"assert"})," + ",(0,n.jsx)(s.code,{children:"it"})," + ",(0,n.jsx)(s.code,{children:"assert"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"test"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"test"})," + ",(0,n.jsx)(s.code,{children:"assert"})]}),"\n",(0,n.jsxs)(s.li,{children:[(0,n.jsx)(s.code,{children:"describe"})," + ",(0,n.jsx)(s.code,{children:"assert"})," + ",(0,n.jsx)(s.code,{children:"test"})," + ",(0,n.jsx)(s.code,{children:"assert"})]}),"\n"]})]}),"\n",(0,n.jsx)(s.admonition,{title:"Cuidado",type:"danger",children:(0,n.jsxs)(s.p,{children:["Evite combinar ",(0,n.jsx)(s.code,{children:"test"})," e ",(0,n.jsx)(s.code,{children:"it"})," ao usar hooks como ",(0,n.jsx)(s.code,{children:"beforeEach"})," (por exemplo, ",(0,n.jsx)(s.code,{children:"test + test"}),", ",(0,n.jsx)(s.code,{children:"it + it"}),", ",(0,n.jsx)(s.code,{children:"test + it"}),", etc.)."]})}),"\n",(0,n.jsx)("hr",{}),"\n",(0,n.jsx)(s.admonition,{type:"note",children:(0,n.jsxs)(s.p,{children:["Se voc\xea encontrar algum erro de digita\xe7\xe3o, sinta-se \xe0 vontade para abrir um ",(0,n.jsx)(s.strong,{children:"Pull Request"})," corrigindo-o."]})})]})}function p(e={}){const{wrapper:s}={...(0,a.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},6273:(e,s,t)=>{t.d(s,{A:()=>a});var r=t(6540);function n(){return n=Object.assign?Object.assign.bind():function(e){for(var s=1;s<arguments.length;s++){var t=arguments[s];for(var r in t)({}).hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},n.apply(null,arguments)}const a=e=>{let{title:s,titleId:t,...a}=e;return r.createElement("svg",n({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 438.99 503.89","aria-labelledby":t},a),s?r.createElement("title",{id:t},s):null,r.createElement("path",{d:"M1.87 315.02c-.34 13.25 6.74 27.4 14.37 37.46 12.02 15.86 29.5 27.13 47.35 35.42 59.43 27.63 127.73 26.22 193.22 23.6 37.05-1.48 75.19-3.43 108.81-19.08 31.95-14.87 58.38-42.71 68.29-76.53 6.33-21.62 5.9-44.67 3.3-67.05-2.11-18.13-6.23-37.33-19.3-50.07-13.58-13.24-36.75-20.23-39.1-39.05-1.08-8.64 3-16.95 5.65-25.24 11.34-35.49-4.61-75.98-32.93-100.2C323.2 10.08 284.78.35 247.52 0 166.04-.74 86.78 41.47 36.36 105.48 23.03 122.4 11.43 141 5.05 161.57s-7.24 43.3.46 63.41c6.59 17.19 19.42 34.4 14.25 52.07-2.57 8.77-9.23 15.64-13.89 23.5-2.67 4.51-3.88 9.43-4.01 14.47Z",style:{fill:"#8d8dff",strokeWidth:0}}),r.createElement("path",{d:"M352.99 414.69c-4.1-6.93-8.39-13.74-13.14-20.24-.32-.88-.95-1.55-1.47-2.3-7.03-10.23-14.42-20.17-22.82-29.33-2.63-2.87-5.28-5.74-8.41-8.1 2.31-.88 4.7-1.51 7.1-2.1.55-.36 1.15-.56 1.8-.64 4.44-1.73 8.91-3.38 13.3-5.22 11.16-4.68 21.51-10.72 30.59-18.79 4.66-4.15 8.71-8.85 12.45-13.84 9.06-12.09 15.22-25.55 19.03-40.11 1.49-5.69 2.22-11.5 2.7-17.36.47-5.81.34-11.61.22-17.42-.01-.63.03-1.26.05-1.89-.41-1.98-.34-4-.52-6.01-.63-6.94-1.95-13.75-3.48-20.55-1.69-7.52-3.62-14.96-5.68-22.38-1.04-3.78-2.75-7.31-4.02-11-.79-2.27-1.5-4.55-2.29-6.93 1.88-.28 3.58-.53 5.27-.77l4.08-1.29c7.9-2.46 14.79-6.66 20.98-12.09.42-.37.71-1.15 1.53-.78-.11-.94.55-1.46 1.12-2.01 2.87-2.81 5.49-5.82 7.57-9.29 3.01-5 5.18-10.3 6.24-16.06.27-1.49.09-2.98.38-4.43.34-1.72.3-3.41.13-5.12-.7-1.96-.79-4.05-1.26-6.06-1.19-5.04-2.84-9.88-6.02-14.11-3.09-4.1-7.65-6.81-12.65-7.96-4.75-1.09-8.98-3.18-12.82-6.24-5.62-4.47-10.32-9.82-15.16-15.06-4.52-4.9-8.75-10.07-13.51-14.76-4.5-4.44-9.48-8.19-15.22-10.87-6.17-2.88-12.54-3.94-19.28-2.25-8.13 2.03-15.1 6.04-21.13 11.8-.54.51-.98 1.13-1.65 1.5-5.19 5.49-9.88 11.37-13.69 17.92-1.39 2.39-2.67 4.83-3.61 7.44-.42 1.16-.53 1.22-1.75.78-2.65-.95-5.27-2-7.93-2.89-10.54-3.54-21.32-6.07-32.31-7.75-13.18-2.01-26.43-2.8-39.74-2.25-20.6.86-40.66 4.39-59.78 12.43-.26.11-.54.2-.8.33-.45.21-.77.14-.96-.35-.04-.11-.08-.21-.13-.32-3.5-8.59-8.82-15.98-15-22.8-.96-1.06-1.93-2.12-2.9-3.19-.86-.49-1.47-1.28-2.19-1.92-6.21-5.57-13.3-9.36-21.53-11.03-6.45-1.31-12.42.07-18.23 2.81-8.25 3.9-14.62 10.09-20.56 16.8-5.26 5.94-10.55 11.87-16.06 17.59-2.8 2.91-5.91 5.48-9.18 7.83-3.12 2.24-6.65 3.68-10.4 4.45-7.37 1.51-12.24 6-15.46 12.55-1.95 3.95-3.04 8.18-3.8 12.5-.2 1.13-.39 2.26-.58 3.38-.28 1.77-.24 3.54-.08 5.29.43 4.7 2.5 12.04 4.61 16.26 2.05 4.11 4.57 7.91 7.85 11.18.69.69 1.52 1.42 1.68 2.52.8-.17 1.08.56 1.5.95 6.44 6.03 13.86 10.61 22.47 13.45.64.21 2.05.53 2.7.71.45.12.88.3 1.31.45 1.65.16 3.26.61 4.99.64.05.76-.24 1.33-.41 1.91-1.36 4.64-3.43 9.02-4.9 13.61-2.5 7.83-4.55 15.78-6.24 23.83-.79 3.77-1.84 7.48-2.43 11.29-.99 6.37-1.72 12.76-1.8 19.21 0 .63-.09 1.26-.13 1.89.19.51.08 1.03.07 1.54-.84 24.17 5.6 46.24 19.09 66.3 3.8 5.65 7.98 10.99 12.89 15.71 6.88 6.62 14.65 12.01 23.12 16.43 7.2 3.76 14.73 6.73 22.34 9.52.26.1.57.1.77.34.5.05.97.17 1.37.49 2.18.61 4.35 1.22 6.53 1.82.32.09.66.13.99.2.21.09.43.15.64.22-.22-.06-.43-.12-.64-.22.22.51-.2.71-.47.98-1.37 1.31-2.78 2.57-4.1 3.93-7.12 7.34-13.53 15.29-19.62 23.5-2.42 3.27-4.91 6.49-7.02 9.98-.06.04-.1.1-.1.17.13.24.04.32-.21.28l-.03.04c.08.24-.01.38-.24.44-3.89 5.6-9.92 14.76-13.53 20.55 0 0 141.25 99.19 269.6.38Z",style:{fill:"#ffd6e7",strokeWidth:0}}),r.createElement("path",{d:"M305.43 442.67c-.15-38.89-40.28-70.39-89.76-70.39s-85.61 28.48-89.43 64.71c42.02 17.79 109.73 35.07 179.19 5.68",style:{fill:"#ffe6f3",strokeWidth:0}}),r.createElement("path",{d:"M62.72 168.99c1.85.39 3.65.51 5.49.55 4.77.1 9-1.55 13.04-3.84 5.36-3.03 9.88-7.1 13.99-11.61 3.2-3.51 6.06-7.31 8.74-11.25 3.64-5.34 6.6-11.04 9.37-16.84 1.35-2.84 2.52-5.79 3.63-8.74 2.1-5.59 3.68-11.34 4.77-17.19.71-3.81 1.33-7.68 1.16-11.6-.07-1.61-.06-3.22 0-4.83.1-3.02-.41-5.93-1.33-8.79-.12-.38-.57-.84-.07-1.25.39-.32 1.25.03 1.57.71.54 1.14.95 2.33 1.19 3.58.75 3.82 1.2 7.66 1.48 11.56.2 2.82.3 5.62.21 8.42-.11 3.19-.47 6.37-.89 9.55-.42 3.24-1.06 6.42-1.74 9.61-.64 2.99-1.62 5.86-2.6 8.73a75.5 75.5 0 0 1-4.19 9.79c-2.2 4.29-4.71 8.4-7.65 12.25-2.65 3.48-5.52 6.77-8.74 9.72-5.62 5.15-11.71 9.58-19 12.16-4.36 1.54-8.87 1.85-13.41 1.51-1.84-.14-3.66-.73-5.02-2.18ZM372.91 169.58c-1.37 1.02-2.93 1.5-4.57 1.63-6.58.49-12.4-1.75-17.94-5.04-6.24-3.7-11.54-8.52-16.42-13.81-3.89-4.22-7.27-8.86-10.15-13.84-3.15-5.44-5.66-11.15-7.69-17.1-1.39-4.08-2.38-8.26-3.12-12.48-.43-2.46-.59-5-.87-7.49-.48-4.2-.27-8.38-.25-12.57.02-4.7.69-9.35 1.74-13.94.19-.84.48-1.66.94-2.4.18-.29.38-.57.62-.82.25-.26.59-.41.92-.17.27.2.18.5.1.79-.23.89-.36 1.81-.68 2.66-.78 2.09-.66 4.29-.88 6.44-.16 1.6-.06 3.22-.03 4.83.07 3.61.52 7.2 1.14 10.74.96 5.53 2.39 10.96 4.25 16.27 2.38 6.79 5.27 13.34 8.75 19.64 2.09 3.78 4.38 7.41 6.79 10.98 4.17 6.16 9.12 11.67 14.6 16.68 3.66 3.34 7.77 6.08 12.45 7.85 2.97 1.12 6.01 1.37 9.13.82.37-.07.78-.28 1.17.31Z",style:{fill:"#eda2c8",strokeWidth:0}}),r.createElement("path",{d:"M296.86 176.79c4.45.03 8.49 1.05 11.98 3.34.49.32.94.7 1.35 1.1.45.45.48.97.02 1.42-.44.44-.94.29-1.52.08-1.94-.72-3.98-1.04-6.13-1.13-5.78-.23-11.24.86-16.51 2.58-2.47.8-4.9 1.82-6.72 3.52-.37.34-.78.66-1.31.86-.47.18-.9.34-1.36-.02-.36-.29-.56-.56-.51-1.04.19-1.64 1.27-2.92 2.53-4.06 3.86-3.48 8.58-5.74 14.4-6.34.63-.07 1.24-.25 1.86-.3.63-.05 1.28-.01 1.91-.01ZM150.33 184.3c1.99.07 4-.27 5.91-1.15.45-.21.89-.31 1.25.12.43.53.13.95-.25 1.35-2.24 2.39-4.99 3.66-8.23 4.23-2.63.46-5.17.23-7.62-.47-4.79-1.36-8.68-4.08-11.23-8.49-.2-.34-.4-.71-.39-1.13.01-.56-.16-1.2.46-1.56.67-.39 1.04.17 1.46.55 3.56 3.19 7.81 4.91 12.43 5.83 2.01.4 4.05.74 6.22.71Z",style:{fill:"#ffb8d8",strokeWidth:0}}),r.createElement("path",{d:"M127.12 259.04c-.05.12-.13.4-.28.65-1.43 2.55-2.86 5.1-4.3 7.65-.15.26-.32.51-.49.76-.39.57-1.05.58-1.66.39-.71-.22-.55-.73-.36-1.17.26-.59.55-1.18.87-1.75 1.24-2.24 2.49-4.48 3.76-6.72.14-.25.38-.48.62-.69.33-.28.67-.68 1.24-.48.62.22.64.71.6 1.34ZM114.2 258.92c.83.04 1.35.54 1.02 1.17-.57 1.11-.96 2.29-1.81 3.28-.31.36-.7.82-1.38.51-.57-.26-1.01-.63-.67-1.26.56-1.05 1.05-2.12 1.61-3.17.22-.41.69-.55 1.23-.53ZM137.35 263.62c-.59.96-.94 2.32-2.07 3.38-.27.26-.62.54-1.09.39-.52-.17-.67-.57-.64-.99.02-.28.02-.6.18-.83.67-.93.87-2.06 1.77-2.89.32-.29.68-.68 1.23-.51.62.19.69.68.6 1.45ZM310.72 257.37c-.05.12-.13.4-.28.65-1.43 2.55-2.86 5.1-4.3 7.65-.15.26-.32.51-.49.76-.39.57-1.05.58-1.66.39-.71-.22-.55-.73-.36-1.17.26-.59.55-1.18.87-1.75 1.24-2.24 2.49-4.48 3.76-6.72.14-.25.38-.48.62-.69.33-.28.67-.68 1.24-.48.62.22.64.71.6 1.34ZM297.79 257.25c.83.04 1.35.54 1.02 1.17-.57 1.11-.96 2.29-1.81 3.28-.31.36-.7.82-1.38.51-.57-.26-1.01-.63-.67-1.26.56-1.05 1.05-2.12 1.61-3.17.22-.41.69-.55 1.23-.53ZM320.94 261.95c-.59.96-.94 2.32-2.07 3.38-.27.26-.62.54-1.09.39-.52-.17-.67-.57-.64-.99.02-.28.02-.6.18-.83.67-.93.87-2.06 1.77-2.89.32-.29.68-.68 1.23-.51.62.19.69.68.6 1.45Z",style:{fill:"#ffcce3",stroke:"#ffcce3",strokeMiterlimit:10,strokeWidth:2}}),r.createElement("path",{d:"M212.76 324.17c-4.11-.64-7.71-2.01-10.66-4.31a7.5 7.5 0 0 1-1.11-1.06c-.36-.42-.33-.83.15-1.13.46-.29.9-.1 1.41.15 1.71.84 3.55 1.38 5.52 1.74 5.3.98 10.48.87 15.55.25 2.37-.29 4.74-.77 6.62-1.86.38-.22.8-.42 1.31-.5.46-.08.88-.15 1.25.2.3.28.45.52.34.9-.37 1.27-1.52 2.14-2.82 2.86-3.98 2.22-8.61 3.36-14.05 3.03-.59-.04-1.17.03-1.76-.02s-1.18-.17-1.77-.26Z",style:{fill:"#ffb8d5",strokeWidth:0}}),r.createElement("path",{d:"M183.08 306.02c10.85 2.7 22.2 1.15 32.51-2.76 1.55-.57 2.71.29 4.19.77 10.28 3.52 21.24 3.65 31.93 1.98.1-.03.23.03.24.14 0 .08-.04.15-.11.18-11.23 4.23-24.05 4.57-35.28.15h.27c-1.99.68-4.18 1.42-6.24 1.9-6.32 1.58-13.01 1.91-19.42.66-2.84-.57-5.65-1.39-8.25-2.74-.08-.04-.12-.15-.07-.23.06-.09.15-.11.24-.07Z",style:{fill:"#d873a1",strokeWidth:0}}),r.createElement("path",{d:"M214.9 223.38c-12.06.4-23.98 3.72-33.53 9.89-10.55 6.81-19.53 18.12-19.47 29.74.05 8.32 4.74 16.54 12.18 21.86 5.41 3.87 12.22 6.48 19.2 7.15 7.47.72 12.04-.71 20.07-1.72 2.5-.31 7.04-.42 9.52-.02 4.59.74 6.08 1.23 9.18 1.59 3.09.36 6.23.36 9.33.04 7.44-.78 14.85-3.46 20.2-8 19.18-16.25 7.41-42.81-13.21-53.44-9.99-5.15-21.83-7.48-33.47-7.09",style:{fill:"#ffafca",strokeWidth:0}}),r.createElement("path",{d:"M214.91 223.5c-17.8.7-36.41 7.96-46.56 23.14-3.28 4.9-5.51 10.63-5.34 16.4.36 11.88 9.98 21.26 20.76 24.95a38.54 38.54 0 0 0 16.99 2.15c4.4-.44 8.9-1.47 13.43-1.95 3.19-.27 6.37-.36 9.53.2 4.36.78 8.69 1.9 13.1 1.86 14 .29 29.97-7.42 32.86-22.19 1.65-8.71-1.58-17.59-6.82-24.62-10.85-14.77-30.24-20.26-47.94-19.91Zm0-.23c17.84-.53 37.36 4.97 48.65 19.6 5.55 7.1 9.09 16.33 7.55 25.41-2.7 15.74-19.42 24.33-34.28 24.08-6.08.22-11.91-2.12-17.93-2.11-6.06-.12-11.93 1.47-17.94 2.01-6.04.55-12.2-.28-17.87-2.42-11.3-4.03-21.24-14.28-21.33-26.8-.03-6.12 2.43-11.99 5.88-16.92 10.6-15.06 29.34-22.32 47.28-22.86Z",style:{fill:"#fcc8df",strokeWidth:0}}),r.createElement("path",{d:"M190.61 237.58c13.77-9.45 35.51-10.27 49.72-1.39.98.64 1.94 1.29 2.85 2l-.15.34-3.14-1.14c-1.75-.71-4.55-1.37-6.39-1.91-9.74-2.22-19.96-2.29-29.81-.72-1.89.34-4.69.85-6.54 1.33-2.17.51-4.32 1.1-6.41 1.83z",style:{fill:"#ffcce6",strokeWidth:0}}),r.createElement("path",{d:"M240.01 255.93c-.21 1.86-.24 3.75-1.36 5.53-.28.45-.64.89-.98 1.33-.42.55-1.14.92-2.12.92-1.06 0-1.72-.42-2.26-.97-1.11-1.13-1.51-2.39-1.91-3.65-.43-1.34-.48-2.71-.32-4.06.22-1.87.51-3.74 2.07-5.43.56-.61 1.19-1.17 2.43-1.15 1.23.02 1.84.58 2.38 1.2 1.06 1.19 1.44 2.47 1.74 3.79.19.83.44 1.65.33 2.49M204.08 256.49c.18 1.82-.22 3.78-1.38 5.66q-.33.54-.78 1.05c-.97 1.07-3.34 1.04-4.35-.01-1-1.04-1.44-2.18-1.79-3.35-.54-1.8-.38-3.62-.29-5.42.07-1.32.6-2.61 1.39-3.85.16-.26.43-.49.69-.72 1.55-1.38 3.43-1.31 4.72.16 1.21 1.39 1.58 2.89 1.79 4.42.08.62.01 1.26.01 2.07Z",style:{fill:"#d873a1",strokeWidth:0}}),r.createElement("path",{d:"M152.89 214.02c.04 9.65-5.08 18.31-11.77 19.92-6.55 1.58-12.46-4.12-13.67-13.19-1.43-10.71 4.25-21.96 12.05-23.39 8.18-1.5 13.09 7.16 13.39 15.28.02.46 0 .92 0 1.38",style:{fill:"#873c64",strokeWidth:0}}),r.createElement("path",{d:"M147.37 208.13c.01 2.06-1.04 2.99-2.28 2.02-1.14-.89-2.05-2.13-2.59-3.81-.2-.61-.3-1.24-.12-1.91.21-.81.69-1.26 1.3-1.1 1.57.39 2.68 1.68 3.52 3.48.2.42.18.93.17 1.32",style:{fill:"#fff",strokeWidth:0}}),r.createElement("path",{d:"M284.29 214.04c-.04 9.65 5.08 18.31 11.77 19.92 6.55 1.58 12.46-4.12 13.67-13.19 1.43-10.71-4.25-21.96-12.05-23.39-8.18-1.5-13.09 7.16-13.39 15.28-.02.46 0 .92 0 1.38",style:{fill:"#873c64",strokeWidth:0}}),r.createElement("path",{d:"M304.44 208.14c.01 2.06-1.04 2.99-2.28 2.02-1.14-.89-2.05-2.13-2.59-3.81-.2-.61-.3-1.24-.12-1.91.21-.81.69-1.26 1.3-1.1 1.57.39 2.68 1.68 3.52 3.48.2.42.18.93.17 1.32",style:{fill:"#fff",strokeWidth:0}}),r.createElement("path",{d:"M270.79 359.26c3.57-.44 7.14-.79 10.71-1.28 2.71-.37 5.45-.63 8.19-.83 3.3-.24 6.57-.85 9.83-1.43 2.53-.45 5.08-.77 7.64-1 3.13 2.36 5.78 5.23 8.41 8.1 8.4 9.16 15.79 19.1 22.82 29.33.52.75 1.15 1.43 1.47 2.3-.69.09-1.01-.46-1.42-.85-4.23-4.04-8.7-7.79-13.33-11.36-4.89-3.76-10.2-6.8-15.62-9.69-6.51-3.48-13.33-6.18-20.35-8.37-4.31-1.34-8.7-2.51-13.17-3.13M97.5 392.82c2.11-3.49 4.6-6.71 7.02-9.98 6.09-8.21 12.49-16.15 19.62-23.5 1.32-1.36 2.73-2.62 4.1-3.93.28-.27.7-.47.47-.98 1.12.5 2.36.5 3.53.61 3.7.35 7.32 1.22 10.99 1.71 1.47.2 2.96.27 4.44.43 2.44.27 4.88.56 7.31.84 1.47.17 2.95.36 4.42.53l7.48.9c1.69.2 3.37.38 5.06.74-.21.03-.42.08-.63.08-7.1-.11-14.02 1.04-20.81 2.99-6.23 1.78-12.34 3.91-18.24 6.65-6.57 3.05-12.9 6.53-18.83 10.69-3.37 2.36-6.68 4.82-9.71 7.64-1.76 1.63-3.71 3.05-5.58 4.56-.2.16-.41.16-.63.02Z",style:{fill:"#ffc5df",strokeWidth:0}}),r.createElement("path",{d:"M352.96 415.31c-9.66-16.43-21.13-31.74-33.64-46.11-4.18-4.77-8.46-9.48-12.88-13.98-.59-.58-.32-1.6.44-1.86 9.04-3.17 18.21-5.8 26.8-9.68 8.6-3.77 16.59-8.88 23.43-15.31 8.56-7.89 15.53-17.75 21.41-27.82 3.41-6.15 6.79-12.38 9-19.03 1.48-4.43 2.59-8.96 3.41-13.56 3.89-23.29.4-47.17-5.66-69.8a243 243 0 0 0-4.12-13.55c-1.51-4.46-3.14-8.94-4.95-13.19-.77-1.64.71-3.57 2.46-3.36 11.7.31 28.55-12.15 35.37-21.11 4.38-5.65 7.58-12.18 8.68-19.11 1.54-10-.9-21.72-7.74-29.39-3.53-3.81-9.01-5.37-13.93-6.98-5.64-2.21-10.39-5.73-14.64-10-10.1-10.95-20.38-21.77-31.21-31.92-5.83-4.23-14.38-8.05-22.64-6.91-2.29.3-4.59.94-6.65 1.96-8.28 2.5-15.05 8.25-20.67 14.71-5.68 6.6-10.52 14.22-14.22 22.08a1.8 1.8 0 0 1-2.21.94c-11.51-4-23.43-6.93-35.49-8.99-33.04-5.44-67.96-5.1-99.79 6.13l-4.32 1.56-.54.19s-.33.13-.51.13c-.84.11-1.64-.63-1.93-1.21-1.27-2.26-3.23-5.77-4.52-8.01-1.23-1.95-2.54-4.05-3.67-5.83-5.05-7.51-10.83-14.96-18.45-20.01-3.8-2.44-8.1-4.06-12.6-4.62-4.43-.52-9.27-.25-13.72-.5-7.55.8-13.53 6.59-18.94 11.52-6.46 6.08-12.7 13.74-18.62 20.42-4.07 4.68-8.26 9.34-13.26 13.11-2.65 1.9-5.49 3.94-8.8 4.45-9.5.3-17.65 7.62-20.1 16.71-2.55 8.97-2.72 19.24.66 28.03 7.3 17.88 25.93 28.75 43.44 34.94 1.13.35 1.71 1.64 1.23 2.72-9.36 21.37-14.57 44.62-15.34 67.95-1.45 51.06 24.23 89.92 72.05 108.19 4.37 1.63 8.88 3.08 13.36 4.07.92.11 1.25 1.37.61 1.97-4.41 4.5-8.7 9.21-12.88 13.97-8.34 9.57-16.22 19.56-23.41 30.03-3.64 5.2-7 10.6-10.27 16.05a.23.23 0 0 1-.32.08c-.11-.06-.14-.2-.08-.31 3.1-5.56 6.28-11.1 9.8-16.41 10.52-16 22.34-31.13 35.49-45.07l.61 1.97c-27.93-6.34-54.14-22.46-70.49-46.22-27.2-40.22-21.38-95.31-2.78-137.92l1.23 2.72c-18.57-6.66-37.84-18.47-45.26-37.61-3.48-9.64-3.17-20.26-.26-30.01 3.25-10.58 12.17-17.88 23.05-18.18 2.65-.7 4.99-2.23 7.22-3.82 4.91-3.59 9.1-8.07 13.15-12.62 6.1-6.64 12.3-14.23 18.92-20.33 4.56-4.23 9.33-8.44 15.22-10.79 2.92-1.31 6.33-1.05 9.37-.89 6.15-.03 12.65.22 18.36 2.93.58.19 1.53.79 2.1 1.08.68.39 1.4.73 2.05 1.17l1.92 1.35c1.84 1.28 3.75 2.98 5.37 4.53 5.47 5.4 10.15 11.87 14.18 18.39 1.41 2.11 3.41 5.74 4.7 8l1.15 2.02c.1.2.29.34.34.35 2.19-.81 6.89-2.54 9.3-3.41 2.25-.62 6.67-2.01 8.91-2.64 40.56-10.23 84.06-7.5 123.76 5.32l-2.22.97c6.87-14.39 16.24-28.49 30.42-36.51a40 40 0 0 1 6.55-2.75l-.44.19c.46-.25.77-.4 1.14-.56 5.2-2.23 11.12-2.45 16.6-1.38 5.83 1.21 11.24 3.96 16.04 7.44 5.58 5.13 10.87 10.39 16.14 15.74 5.24 5.34 10.44 10.79 15.5 16.24 1.14 1.2 2.56 2.4 3.94 3.49 2.75 2.14 5.77 4.07 9.01 5.27l1.21.41 1.35.42c.91.28 1.82.58 2.75.91 7.99 2.52 13.91 8.67 16.8 16.53 8.06 19.46.64 39.86-14.91 53.02-7.86 6.7-21.02 15.21-31.78 14.46l2.53-3.35c3.73 9 6.64 18.09 9.17 27.45 6.15 23.25 9.36 47.86 5.12 71.74-1.37 7.18-3.39 14.26-6.44 20.91-2.04 4.3-4.41 8.7-6.78 12.82-6.18 10.28-13.37 20.33-22.42 28.35-14.5 13.59-33.27 19-51.66 24.73l.44-1.86c13.14 13.95 24.98 29.05 35.5 45.05 3.52 5.31 6.71 10.84 9.82 16.4.06.11.02.25-.09.31a.23.23 0 0 1-.31-.09Z",style:{fill:"#d37aa3",strokeWidth:0}}),r.createElement("path",{d:"M188.88 459.97c.79-4.28 1.6-8.56 2.4-12.84.81-4.34 1.6-8.68 2.43-13.01 1.1-5.8 2.25-11.59 3.34-17.39 1.34-7.09 2.58-14.2 3.97-21.29.54-2.75.86-5.55 1.72-8.24 1.34.54 2.4 1.52 3.62 2.26 5.05 3.07 10.4 4.08 16.13 2.56 3.17-.84 6.26-1.94 8.5-4.58.26-.31.58-.56 1.01-.59.79 2.76 1.2 5.59 1.76 8.4 1.06 5.33 2.04 10.68 3.04 16.02 1.39 7.42 2.78 14.84 4.18 22.26 1.25 6.63 2.56 13.25 3.73 19.9.48 2.71 1.06 5.39 1.53 8.09.19 1.11.35 2.24.58 3.35.13.65.14 1.32.03 1.98-.12.72-.37 1.41-.69 2.06-1.03 2.14-2.43 4.03-3.87 5.9-4.49 5.79-8.97 11.59-13.45 17.38-2.26 2.93-4.63 5.79-7.15 8.5-.39.42-.79.84-1.19 1.24-2.94 2.94-3.88 2.44-6.87-.85-2.48-2.72-4.83-5.57-7.04-8.51-4.09-5.44-8.26-10.83-12.33-16.28-1.92-2.57-4.1-4.97-5.43-7.96-.64-1.45-1.19-2.88-.68-4.48",style:{fill:"#d3a9ff",strokeWidth:0}}),r.createElement("path",{d:"M218.04 396.87c1.38 14.85 1.63 30.37 1.72 45.3-.08 14.94-.33 30.44-1.72 45.3-1.39-14.85-1.64-30.37-1.72-45.3.09-14.94.34-30.44 1.72-45.3M202.65 385.86c.75-.03 1.47 0 2.19.29 3.09 1.26 6.29 1.9 9.63 2.2 4.29.39 8.41-.04 12.48-1.32 1.05-.33 2.05-.78 2.95-1.38.57-.38 1.13-.52 1.77-.5.07.58.47 1.09.32 1.71-.44.03-.75.28-1.01.59-2.23 2.64-5.32 3.74-8.5 4.58-5.73 1.52-11.08.51-16.13-2.56-1.21-.74-2.28-1.72-3.62-2.26l-.09-1.35Z",style:{fill:"#9c78d6",strokeWidth:0}}),r.createElement("path",{d:"M202.65 385.86c-1.35.02-2.19-.97-3.11-1.69-1.37-1.08-2.38-2.51-3-4.15-1.66-4.39-2.45-8.94-2.46-13.65 0-3.25 1.26-4.45 4.35-4.33 8.97.35 17.94.19 26.91.42 3.73.1 7.47.13 11.2.23.58.02 1.13.06 1.68.29.96.4 1.42 1.07 1.45 2.12.16 5.37-.84 10.52-3.09 15.4-1 2.17-2.77 3.62-4.9 4.66-.64-.03-1.2.12-1.77.5-.9.6-1.9 1.05-2.95 1.38-4.07 1.28-8.19 1.71-12.48 1.32-3.35-.3-6.54-.94-9.63-2.2-.72-.29-1.44-.33-2.19-.29Z",style:{fill:"#d3a9ff",strokeWidth:0}}),r.createElement("path",{d:"M164.06 110.62c6.34-10.01 15.24-17.59 28.99-20.48.66-.14 1.53.42 2.3.65-.41.52-.68 1.22-1.25 1.52-1.65.86-3.38 1.63-5.15 2.32-8.82 3.4-16.01 8.5-22.16 14.69-.65.65-1.4 1.24-2.11 1.85-.21-.18-.42-.37-.63-.55Z",style:{fill:"#fcc8dd",strokeWidth:0}}),r.createElement("path",{d:"M163.96 110.63c2.85-5.92 7.35-11.21 12.95-14.73 2.78-1.67 5.96-2.96 9-4.04 1.15-.4 3.5-1.16 4.67-1.51 1.21-.25 2.65-1.05 3.83-.49.58.31 1.63.21 1.53 1.02-.2.43-.42.73-.72 1.24-.17.28-.52.64-.84.81-2.07 1.26-4.42 2.26-6.61 3.18-6.98 3.16-13.41 7.38-19.28 12.3-1.14 1.04-2.44 1.98-3.71 2.91-.35.15-.58-.56-.82-.69m.2-.03.65.42h-.25c1.08-1.12 2.13-2.22 3.17-3.4a52.3 52.3 0 0 1 10.83-9.06c4.69-3.06 10.11-4.64 15.18-6.85.55-.26.7-.78 1.16-1.29l.28.9c-.69-.23-1.42-.77-2.06-.75-2.39.39-4.74 1.01-6.99 1.88-8.89 3.78-15.94 10.77-21.98 18.14ZM192.93 86.25c-1.64.58-2.57 1.19-3.5 1.19-12.13-.05-23.41 2.5-33.98 7.39-.13.06-.4-.08-.61-.13 7.29-8.05 28.41-12.63 38.09-8.45",style:{fill:"#fcc8dd",strokeWidth:0}}),r.createElement("path",{d:"M193.03 86.25c-.11.12-.44.28-.62.37-.55.29-1.09.59-1.65.86-.61.38-1.79.45-2.54.5-4.87.35-9.71.97-14.52 1.79-5.62.81-11.31 2.12-16.42 4.69-.31.16-1.36.68-1.68.84-.55.11-.54-.05-.88-.09-.41-.04-.58-.58-.27-.85 7.77-8.98 27.95-13.65 38.58-8.1Zm-.2 0c-10.66-2.6-29.4 1.41-37.61 8.81l-.27-.85c.15.04.25.09.33.12.06.04.19.02-.02.06.3-.12 1.36-.53 1.69-.66 8.43-3.19 17.13-6.78 26.29-6.84 1.66-.05 3.32-.06 4.97.04.66.03 1.64.18 2.31-.07.74-.17 1.54-.62 2.3-.61ZM199.74 94.1c-.85 4.1-4.86 5.96-6.62 8.91-1.76 2.96-3.39 5.97-5.16 9.11-.59-6.79 5.01-15.77 11.78-18.03Z",style:{fill:"#fcc8dd",strokeWidth:0}}),r.createElement("path",{d:"M199.8 94.03c.09 3.99-3.71 6.43-5.76 9.13-2.08 2.87-4.27 5.88-5.65 9.21-.21.47-.91.31-.92-.2-1.19-7.71 4.48-16.78 12.33-18.14m-.13.15c-1.58 1.01-3 2.12-4.29 3.44-3.66 3.97-6.61 8.98-6.93 14.47l-.92-.2c2.24-2.98 3.5-6.31 5.1-9.67 1.99-3.06 5.48-4.7 7.04-8.04",style:{fill:"#fcc8dd",strokeWidth:0}}),r.createElement("path",{d:"M288.18 387.26c-11.82.76-22.75 4.93-31.88 15.62-.44.51-.37 1.54-.54 2.33.65-.11 1.4-.01 1.94-.37 1.55-1.03 3.05-2.18 4.5-3.4 7.22-6.11 15.14-9.97 23.52-12.4.89-.26 1.76-.64 2.64-.96l-.18-.81Z",style:{fill:"#ffe6f3",strokeWidth:0}}),r.createElement("path",{d:"M288.09 387.38c-4.64 1.25-9.26 2.27-13.69 4.09-4.37 1.86-8.89 3.5-12.64 6.57-1.86 1.53-3.5 3.33-4.95 5.25-.22.51-.11 1.39-.21 2.09l-.98-1.02c.62-.15 1.06-.1 1.46-.33 4.29-3.54 8.32-7.61 13.29-10.28 5.52-3.18 11.69-4.74 17.88-5.93l-.18.32v-.75Zm.18-.24c.14.3.31.7.43 1.06l-.24.13c-5.49 2.79-11.27 4.92-16.48 8.19-4.78 2.54-8.75 6.2-13.41 8.99l-.26.15c-.65.46-1.77.39-2.4.39l-1.35.08c.24-.72.5-1.44.62-2.24.1-.42.19-.95.64-1.47 1.75-1.74 3.52-3.44 5.34-5.11 2.43-2.19 4.89-4.48 7.77-6.21 5.76-3.34 12.78-4.7 19.36-3.97Z",style:{fill:"#ffe6f3",strokeWidth:0}}),r.createElement("path",{d:"M260.72 412.18c1.07-1.37 1.95-2.05 2.25-2.94 3.84-11.5 9.86-21.38 17.88-29.83.1-.11.05-.41.07-.62-9.96 4.33-21.06 22.88-20.2 33.39",style:{fill:"#ffe6f3",strokeWidth:0}}),r.createElement("path",{d:"M260.76 412.04c.03-.12-.02-.19 0-.23.26-.49.85-1.35 1.16-1.83.48-.71.47-1.37.7-2.14.78-3.25 1.94-6.39 3.35-9.41 2.69-6.05 7.64-10.97 11.63-16.14l1.56-1.93c.17-.2.95-1.17 1.12-1.39l.02-.03s.03-.04-.02.02c-.12.16-.1.2-.11.21-.02-.11-.03-.22-.02-.44l1.08.78c-.68.45-1.39.82-2.02 1.33-4.52 3.53-8.01 8.2-11 13.07-3.45 5.58-6.41 11.6-7.44 18.13Zm-.09.29c-2.1-9.56 4.54-21.73 11.2-28.33 2.9-3.08 6.69-5.41 10.79-6.66l-.99 1.54c-.01.02-.02.12-.03.24 0 .22-.07.59-.31.81-.1.09-.31.29-.42.39-4.62 4.08-7.77 9.48-10.36 14.98-2.15 4.16-4.5 8.78-6.46 13.07-.31.69-.81 1.84-1.39 2.28-.46.44-.95.82-1.42 1.23-.16.13-.45.42-.62.46ZM273.21 397.33c3.59 2.15 7.67.45 11.04 1.15s6.69 1.54 10.2 2.36c-4.61-5.03-15-6.97-21.24-3.51",style:{fill:"#ffe6f3",strokeWidth:0}}),r.createElement("path",{d:"M273.36 397.33c.54.08.74-.02 1.26.09 3.19.41 6.22-.97 9.45-.27.89.21 1.82.67 2.64.98 2.52 1.13 5.16 1.78 7.92 1.99l-.71 1.22c-4.73-3.37-10.75-4.46-16.47-4.44-.69.03-2.06.17-2.74.28-.46.07-.83 0-1.33.15Zm-.3 0c5.4-5 14.51-3.76 19.88.72 1.33 1.15 2.66 3.13 3.8 4.47-2.44-.96-5.1-2.05-7.69-2.4-1.71-.24-3.68-.28-5.38-.44-3.21-.18-8.16.66-10.61-2.35",style:{fill:"#ffe6f3",strokeWidth:0}}))}},9329:(e,s,t)=>{t.d(s,{A:()=>o});t(6540);var r=t(4164);const n={tabItem:"tabItem_Ymn6"};var a=t(4848);function o(e){let{children:s,hidden:t,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.A)(n.tabItem,o),hidden:t,children:s})}},5537:(e,s,t)=>{t.d(s,{A:()=>y});var r=t(6540),n=t(4164),a=t(5627),o=t(6347),i=t(372),l=t(604),c=t(1861),d=t(8749);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:s}=e;return!!s&&"object"==typeof s&&"value"in s}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:s,children:t}=e;return(0,r.useMemo)((()=>{const e=s??function(e){return u(e).map((e=>{let{props:{value:s,label:t,attributes:r,default:n}}=e;return{value:s,label:t,attributes:r,default:n}}))}(t);return function(e){const s=(0,c.XI)(e,((e,s)=>e.value===s.value));if(s.length>0)throw new Error(`Docusaurus error: Duplicate values "${s.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[s,t])}function m(e){let{value:s,tabValues:t}=e;return t.some((e=>e.value===s))}function p(e){let{queryString:s=!1,groupId:t}=e;const n=(0,o.W6)(),a=function(e){let{queryString:s=!1,groupId:t}=e;if("string"==typeof s)return s;if(!1===s)return null;if(!0===s&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:s,groupId:t});return[(0,l.aZ)(a),(0,r.useCallback)((e=>{if(!a)return;const s=new URLSearchParams(n.location.search);s.set(a,e),n.replace({...n.location,search:s.toString()})}),[a,n])]}function f(e){const{defaultValue:s,queryString:t=!1,groupId:n}=e,a=h(e),[o,l]=(0,r.useState)((()=>function(e){let{defaultValue:s,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(s){if(!m({value:s,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${s}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return s}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:s,tabValues:a}))),[c,u]=p({queryString:t,groupId:n}),[f,x]=function(e){let{groupId:s}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(s),[n,a]=(0,d.Dv)(t);return[n,(0,r.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:n}),b=(()=>{const e=c??f;return m({value:e,tabValues:a})?e:null})();(0,i.A)((()=>{b&&l(b)}),[b]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),x(e)}),[u,x,a]),tabValues:a}}var x=t(9136);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var j=t(4848);function v(e){let{className:s,block:t,selectedValue:r,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),d=e=>{const s=e.currentTarget,t=l.indexOf(s),n=i[t].value;n!==r&&(c(s),o(n))},u=e=>{let s=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;s=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;s=l[t]??l[l.length-1];break}}s?.focus()};return(0,j.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,n.A)("tabs",{"tabs--block":t},s),children:i.map((e=>{let{value:s,label:t,attributes:a}=e;return(0,j.jsx)("li",{role:"tab",tabIndex:r===s?0:-1,"aria-selected":r===s,ref:e=>{l.push(e)},onKeyDown:u,onClick:d,...a,className:(0,n.A)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":r===s}),children:t??s},s)}))})}function g(e){let{lazy:s,children:t,selectedValue:a}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(s){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:(0,n.A)("margin-top--md",e.props.className)}):null}return(0,j.jsx)("div",{className:"margin-top--md",children:o.map(((e,s)=>(0,r.cloneElement)(e,{key:s,hidden:e.props.value!==a})))})}function k(e){const s=f(e);return(0,j.jsxs)("div",{className:(0,n.A)("tabs-container",b.tabList),children:[(0,j.jsx)(v,{...s,...e}),(0,j.jsx)(g,{...s,...e})]})}function y(e){const s=(0,x.A)();return(0,j.jsx)(k,{...e,children:u(e.children)},String(s))}},8453:(e,s,t)=>{t.d(s,{R:()=>o,x:()=>i});var r=t(6540);const n={},a=r.createContext(n);function o(e){const s=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),r.createElement(a.Provider,{value:s},e.children)}}}]);