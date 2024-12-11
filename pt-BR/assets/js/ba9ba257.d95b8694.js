"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[296],{1736:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>u,default:()=>m,frontMatter:()=>c,metadata:()=>n,toc:()=>h});const n=JSON.parse('{"id":"examples/local-server","title":"Servidor Local","description":"Vamos criar um servidor simples:","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/current/examples/local-server.mdx","sourceDirName":"examples","slug":"/examples/local-server","permalink":"/pt-BR/docs/next/examples/local-server","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/examples/local-server.mdx","tags":[{"inline":true,"label":"background","permalink":"/pt-BR/docs/next/tags/background"},{"inline":true,"label":"server","permalink":"/pt-BR/docs/next/tags/server"},{"inline":true,"label":"service","permalink":"/pt-BR/docs/next/tags/service"},{"inline":true,"label":"package.json","permalink":"/pt-BR/docs/next/tags/package-json"},{"inline":true,"label":"scripts","permalink":"/pt-BR/docs/next/tags/scripts"},{"inline":true,"label":"supertest","permalink":"/pt-BR/docs/next/tags/supertest"}],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"tags":["background","server","service","package.json","scripts","supertest"]},"sidebar":"docs","previous":{"title":"Testes parametrizados","permalink":"/pt-BR/docs/next/examples/parameterized-tests"},"next":{"title":"Browser (E2E)","permalink":"/pt-BR/docs/next/category/browser-e2e"}}');var s=r(4848),a=r(8453),o=r(1470),i=r(9365),l=r(185);const c={sidebar_position:1,tags:["background","server","service","package.json","scripts","supertest"]},u="Servidor Local",d={},h=[];function p(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"servidor-local",children:"Servidor Local"})}),"\n",(0,s.jsx)(t.p,{children:"Vamos criar um servidor simples:"}),"\n",(0,s.jsxs)(o.A,{children:[(0,s.jsx)(i.A,{default:!0,value:"server.js (Node.js)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"// highlight-start\nimport { createServer } from 'node:http';\n\ncreateServer((_, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ name: 'Poku' }));\n}).listen(4000, () => console.log('ready'));\n\n// highlight-end\n"})})}),(0,s.jsx)(i.A,{default:!0,value:"server.js (Bun)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"// highlight-start\nBun.serve({\n  port: 4000,\n  fetch: () =>\n    new Response(JSON.stringify({ name: 'Poku' }), {\n      headers: { 'Content-Type': 'application/json' },\n    }),\n});\n\nconsole.log('ready');\n// highlight-end\n"})})}),(0,s.jsx)(i.A,{default:!0,value:"server.js (Deno)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"// highlight-start\nDeno.serve({\n  port: 4000,\n  handler: () =>\n    new Response(JSON.stringify({ name: 'Poku' }), {\n      headers: { 'Content-Type': 'application/json' },\n    }),\n  onListen: () => console.log('ready'),\n});\n// highlight-end\n"})})})]}),"\n",(0,s.jsx)(t.p,{children:"E agora, teste-o:"}),"\n",(0,s.jsx)(o.A,{children:(0,s.jsx)(i.A,{default:!0,value:"test/server.test.js",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import { assert, startService } from 'poku';\n\nconst server = await startService('server.js', {\n  // Aguarde pelo \"ready\" na sa\xedda do console\n  startAfter: 'ready',\n});\n\n// Use a biblioteca de requisi\xe7\xf5es que preferir\n// highlight-start\nconst res = await fetch('http://localhost:4000');\nconst data = await res.json();\n// highlight-end\n\nassert.strictEqual(res.status, 200, 'O servidor est\xe1 ativo');\nassert.deepStrictEqual(data, { name: 'Poku' }, 'O Poku est\xe1 aqui');\n\nserver.end();\n"})})})}),"\n",(0,s.jsxs)(l.T,{title:"Precisa testar usando uma sess\xe3o consistente? \ud83c\udf6a",children:[(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Apenas fa\xe7a isso"})," \ud83d\ude80"]}),(0,s.jsxs)(t.p,{children:["Aqui est\xe1 um exemplo usando ",(0,s.jsx)(t.a,{href:"https://github.com/axios/axios",children:(0,s.jsx)(t.strong,{children:"Axios"})}),":"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import { assert, startService } from 'poku';\n// highlight-start\nimport axios from 'axios';\nimport axiosCookieJarSupport from 'axios-cookiejar-support';\nimport { CookieJar } from 'tough-cookie';\n\n// highlight-end\nconst server = await startService('server.js');\n\n// highlight-start\naxiosCookieJarSupport(axios);\n\nconst cookieJar = new CookieJar();\n\nexport const api = axios.create({\n  withCredentials: true,\n  jar: cookieJar,\n});\n\nconst { data } = await api.get('http://localhost:4000');\n// highlight-end\n\nassert.deepStrictEqual(data, { name: 'Poku' }, 'O Poku est\xe1 aqui');\n"})})]}),"\n",(0,s.jsx)(t.admonition,{type:"tip",children:(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Biblioteca de requisi\xe7\xf5es:"})," Voc\xea pode usar ",(0,s.jsx)(t.a,{href:"https://github.com/axios/axios",children:(0,s.jsx)(t.strong,{children:"Axios"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/node-fetch/node-fetch",children:(0,s.jsx)(t.strong,{children:"Node Fetch"})})," ou qualquer outro que quiser \ud83d\udc99"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Servidor:"})," Voc\xea pode usar qualquer servidor que quiser, como ",(0,s.jsx)(t.a,{href:"https://github.com/expressjs/express",children:(0,s.jsx)(t.strong,{children:"Express"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/koajs/koa",children:(0,s.jsx)(t.strong,{children:"Koa"})}),", etc."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.a,{href:"https://github.com/vercel/next.js",children:(0,s.jsx)(t.strong,{children:"NextJS"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/vitejs/vite",children:(0,s.jsx)(t.strong,{children:"ViteJS"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/remy/nodemon",children:(0,s.jsx)(t.strong,{children:"nodemon"})})," e mais? Veja abaixo \ud83d\udc47\ud83c\udffb"]}),"\n"]})}),"\n",(0,s.jsx)("hr",{}),"\n",(0,s.jsxs)(t.p,{children:["Voc\xea tamb\xe9m pode iniciar seu servidor usando o ",(0,s.jsx)(t.code,{children:"startScript"}),"."]}),"\n",(0,s.jsxs)(o.A,{children:[(0,s.jsx)(i.A,{default:!0,value:"test/server.test.js",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import { assert, startScript } from 'poku';\n\nconst server = await startScript('start', {\n  // Aguarde pelo \"ready\" na sa\xedda do console\n  startAfter: 'ready',\n});\n\n// Use a biblioteca de requisi\xe7\xf5es que voc\xea preferir.\n// highlight-start\nconst res = await fetch('http://localhost:4000');\nconst data = await res.json();\n// highlight-end\n\nassert.strictEqual(res.status, 200, 'O servidor est\xe1 ativo');\nassert.deepStrictEqual(data, { name: 'Poku' }, 'O Poku est\xe1 aqui');\n\nserver.end();\n"})})}),(0,s.jsx)(i.A,{default:!0,value:"package.json (Node.js)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "script": {\n    "start": "node server.js"\n  }\n}\n'})})}),(0,s.jsx)(i.A,{value:"package.json (Bun)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "script": {\n    "start": "bun server.js"\n  }\n}\n'})})}),(0,s.jsx)(i.A,{value:"deno.json (Deno)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "tasks": {\n    "start": "deno run --allow-net server.js"\n  }\n}\n'})})})]}),"\n",(0,s.jsx)(t.admonition,{type:"tip",children:(0,s.jsxs)(t.p,{children:["Usando o ",(0,s.jsx)(t.code,{children:"startScript"}),", voc\xea pode executar ",(0,s.jsx)(t.a,{href:"https://github.com/vercel/next.js",children:(0,s.jsx)(t.strong,{children:"NextJS"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/sveltejs/svelte",children:(0,s.jsx)(t.strong,{children:"SvelteJS"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/remy/nodemon",children:(0,s.jsx)(t.strong,{children:"nodemon"})})," e todos os scripts que voc\xea sempre usou \ud83d\udc37"]})})]})}function m(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},1622:(e,t,r)=>{r.d(t,{A:()=>x});var n=r(6540),s=r(4164),a=r(3427),o=r(2303),i=r(1422);const l={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=r(4848);function u(e){return!!e&&("SUMMARY"===e.tagName||u(e.parentElement))}function d(e,t){return!!e&&(e===t||d(e.parentElement,t))}function h(e){let{summary:t,children:r,...h}=e;(0,a.A)().collectAnchor(h.id);const p=(0,o.A)(),m=(0,n.useRef)(null),{collapsed:x,setCollapsed:g}=(0,i.u)({initialState:!h.open}),[j,f]=(0,n.useState)(h.open),v=n.isValidElement(t)?t:(0,c.jsx)("summary",{children:t??"Details"});return(0,c.jsxs)("details",{...h,ref:m,open:j,"data-collapsed":x,className:(0,s.A)(l.details,p&&l.isBrowser,h.className),onMouseDown:e=>{u(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;u(t)&&d(t,m.current)&&(e.preventDefault(),x?(g(!1),f(!0)):g(!0))},children:[v,(0,c.jsx)(i.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),f(!e)},children:(0,c.jsx)("div",{className:l.collapsibleContent,children:r})})]})}const p={details:"details_b_Ee"},m="alert alert--info";function x(e){let{...t}=e;return(0,c.jsx)(h,{...t,className:(0,s.A)(m,p.details,t.className)})}},9365:(e,t,r)=>{r.d(t,{A:()=>o});r(6540);var n=r(4164);const s={tabItem:"tabItem_Ymn6"};var a=r(4848);function o(e){let{children:t,hidden:r,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,n.A)(s.tabItem,o),hidden:r,children:t})}},1470:(e,t,r)=>{r.d(t,{A:()=>y});var n=r(6540),s=r(4164),a=r(3104),o=r(6347),i=r(205),l=r(7485),c=r(1682),u=r(679);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:s}}=e;return{value:t,label:r,attributes:n,default:s}}))}(r);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function p(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:r}=e;const s=(0,o.W6)(),a=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,l.aZ)(a),(0,n.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(s.location.search);t.set(a,e),s.replace({...s.location,search:t.toString()})}),[a,s])]}function x(e){const{defaultValue:t,queryString:r=!1,groupId:s}=e,a=h(e),[o,l]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:a}))),[c,d]=m({queryString:r,groupId:s}),[x,g]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,a]=(0,u.Dv)(r);return[s,(0,n.useCallback)((e=>{r&&a.set(e)}),[r,a])]}({groupId:s}),j=(()=>{const e=c??x;return p({value:e,tabValues:a})?e:null})();(0,i.A)((()=>{j&&l(j)}),[j]);return{selectedValue:o,selectValue:(0,n.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),g(e)}),[d,g,a]),tabValues:a}}var g=r(2303);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=r(4848);function v(e){let{className:t,block:r,selectedValue:n,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),u=e=>{const t=e.currentTarget,r=l.indexOf(t),s=i[r].value;s!==n&&(c(t),o(s))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;t=l[r]??l[0];break}case"ArrowLeft":{const r=l.indexOf(e.currentTarget)-1;t=l[r]??l[l.length-1];break}}t?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":r},t),children:i.map((e=>{let{value:t,label:r,attributes:a}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>l.push(e),onKeyDown:d,onClick:u,...a,className:(0,s.A)("tabs__item",j.tabItem,a?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function b(e){let{lazy:t,children:r,selectedValue:a}=e;const o=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function k(e){const t=x(e);return(0,f.jsxs)("div",{className:(0,s.A)("tabs-container",j.tabList),children:[(0,f.jsx)(v,{...t,...e}),(0,f.jsx)(b,{...t,...e})]})}function y(e){const t=(0,g.A)();return(0,f.jsx)(k,{...e,children:d(e.children)},String(t))}},185:(e,t,r)=>{r.d(t,{T:()=>a});var n=r(1622),s=r(4848);const a=e=>{let{children:t,open:r,title:a}=e;return(0,s.jsx)(n.A,{open:r,className:"faq",summary:(0,s.jsx)("summary",{children:(0,s.jsx)("strong",{children:a})}),children:(0,s.jsx)("section",{children:t})})}},8453:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>i});var n=r(6540);const s={},a=n.createContext(s);function o(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);