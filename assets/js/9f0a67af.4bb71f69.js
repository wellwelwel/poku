"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3811],{9742:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>u,default:()=>m,frontMatter:()=>c,metadata:()=>r,toc:()=>h});const r=JSON.parse('{"id":"examples/local-server","title":"Local Server","description":"Let\'s create a simple server:","source":"@site/docs/examples/local-server.mdx","sourceDirName":"examples","slug":"/examples/local-server","permalink":"/docs/examples/local-server","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/examples/local-server.mdx","tags":[{"inline":true,"label":"background","permalink":"/docs/tags/background"},{"inline":true,"label":"server","permalink":"/docs/tags/server"},{"inline":true,"label":"service","permalink":"/docs/tags/service"},{"inline":true,"label":"package.json","permalink":"/docs/tags/package-json"},{"inline":true,"label":"scripts","permalink":"/docs/tags/scripts"},{"inline":true,"label":"supertest","permalink":"/docs/tags/supertest"}],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"tags":["background","server","service","package.json","scripts","supertest"]},"sidebar":"docs","previous":{"title":"Parameterized Tests","permalink":"/docs/examples/parameterized-tests"},"next":{"title":"Browser (E2E)","permalink":"/docs/category/browser-e2e"}}');var s=n(4848),a=n(8453),o=n(5537),l=n(9329),i=n(5397);const c={sidebar_position:1,tags:["background","server","service","package.json","scripts","supertest"]},u="Local Server",d={},h=[];function p(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"local-server",children:"Local Server"})}),"\n",(0,s.jsx)(t.p,{children:"Let's create a simple server:"}),"\n",(0,s.jsxs)(o.A,{children:[(0,s.jsx)(l.A,{default:!0,value:"server.js (Node.js)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"// highlight-start\nimport { createServer } from 'node:http';\n\ncreateServer((_, res) => {\n  res.writeHead(200, { 'Content-Type': 'application/json' });\n  res.end(JSON.stringify({ name: 'Poku' }));\n}).listen(4000, () => console.log('ready'));\n\n// highlight-end\n"})})}),(0,s.jsx)(l.A,{default:!0,value:"server.js (Bun)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"// highlight-start\nBun.serve({\n  port: 4000,\n  fetch: () =>\n    new Response(JSON.stringify({ name: 'Poku' }), {\n      headers: { 'Content-Type': 'application/json' },\n    }),\n});\n\nconsole.log('ready');\n// highlight-end\n"})})}),(0,s.jsx)(l.A,{default:!0,value:"server.js (Deno)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-ts",children:"// highlight-start\nDeno.serve({\n  port: 4000,\n  handler: () =>\n    new Response(JSON.stringify({ name: 'Poku' }), {\n      headers: { 'Content-Type': 'application/json' },\n    }),\n  onListen: () => console.log('ready'),\n});\n// highlight-end\n"})})})]}),"\n",(0,s.jsx)(t.p,{children:"And now, test it:"}),"\n",(0,s.jsx)(o.A,{children:(0,s.jsx)(l.A,{default:!0,value:"test/server.test.js",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import { assert, startService } from 'poku';\n\nconst server = await startService('server.js', {\n  // Wait for the \"ready\" console output\n  startAfter: 'ready',\n});\n\n// Use the requester you want\n// highlight-start\nconst res = await fetch('http://localhost:4000');\nconst data = await res.json();\n// highlight-end\n\nassert.strictEqual(res.status, 200, 'Server is on');\nassert.deepStrictEqual(data, { name: 'Poku' }, 'Poku is here');\n\nserver.end();\n"})})})}),"\n",(0,s.jsxs)(i.T,{title:"Need to test using a consistent session? \ud83c\udf6a",children:[(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:"Just do it"})," \ud83d\ude80"]}),(0,s.jsxs)(t.p,{children:["Here's an example using ",(0,s.jsx)(t.a,{href:"https://github.com/axios/axios",children:(0,s.jsx)(t.strong,{children:"Axios"})}),":"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import { assert, startService } from 'poku';\n// highlight-start\nimport axios from 'axios';\nimport axiosCookieJarSupport from 'axios-cookiejar-support';\nimport { CookieJar } from 'tough-cookie';\n\n// highlight-end\nconst server = await startService('server.js');\n\n// highlight-start\naxiosCookieJarSupport(axios);\n\nconst cookieJar = new CookieJar();\n\nexport const api = axios.create({\n  withCredentials: true,\n  jar: cookieJar,\n});\n\nconst { data } = await api.get('http://localhost:4000');\n// highlight-end\n\nassert.deepStrictEqual(data, { name: 'Poku' }, 'Poku is here');\n"})})]}),"\n",(0,s.jsx)(t.admonition,{type:"tip",children:(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Requester:"})," You can use ",(0,s.jsx)(t.a,{href:"https://github.com/axios/axios",children:(0,s.jsx)(t.strong,{children:"Axios"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/node-fetch/node-fetch",children:(0,s.jsx)(t.strong,{children:"Node Fetch"})})," and everyone you want \ud83d\udc99"]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:"Server:"})," you can use every server you want, such as ",(0,s.jsx)(t.a,{href:"https://github.com/expressjs/express",children:(0,s.jsx)(t.strong,{children:"Express"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/koajs/koa",children:(0,s.jsx)(t.strong,{children:"Koa"})}),", etc."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.a,{href:"https://github.com/vercel/next.js",children:(0,s.jsx)(t.strong,{children:"NextJS"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/vitejs/vite",children:(0,s.jsx)(t.strong,{children:"ViteJS"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/remy/nodemon",children:(0,s.jsx)(t.strong,{children:"nodemon"})})," and more? See bellow \ud83d\udc47\ud83c\udffb"]}),"\n"]})}),"\n",(0,s.jsx)("hr",{}),"\n",(0,s.jsxs)(t.p,{children:["You also can start your server using the ",(0,s.jsx)(t.code,{children:"startScript"}),"."]}),"\n",(0,s.jsxs)(o.A,{children:[(0,s.jsx)(l.A,{default:!0,value:"test/server.test.js",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import { assert, startScript } from 'poku';\n\nconst server = await startScript('start', {\n  // Wait for the \"ready\" console output\n  startAfter: 'ready',\n});\n\n// Use the requester you want\n// highlight-start\nconst res = await fetch('http://localhost:4000');\nconst data = await res.json();\n// highlight-end\n\nassert.strictEqual(res.status, 200, 'Server is on');\nassert.deepStrictEqual(data, { name: 'Poku' }, 'Poku is here');\n\nserver.end();\n"})})}),(0,s.jsx)(l.A,{default:!0,value:"package.json (Node.js)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "script": {\n    "start": "node server.js"\n  }\n}\n'})})}),(0,s.jsx)(l.A,{value:"package.json (Bun)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "script": {\n    "start": "bun server.js"\n  }\n}\n'})})}),(0,s.jsx)(l.A,{value:"deno.json (Deno)",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'{\n  "tasks": {\n    "start": "deno run --allow-net server.js"\n  }\n}\n'})})})]}),"\n",(0,s.jsx)(t.admonition,{type:"tip",children:(0,s.jsxs)(t.p,{children:["Using ",(0,s.jsx)(t.code,{children:"startScript"}),", you can execute ",(0,s.jsx)(t.a,{href:"https://github.com/vercel/next.js",children:(0,s.jsx)(t.strong,{children:"NextJS"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/sveltejs/svelte",children:(0,s.jsx)(t.strong,{children:"SvelteJS"})}),", ",(0,s.jsx)(t.a,{href:"https://github.com/remy/nodemon",children:(0,s.jsx)(t.strong,{children:"nodemon"})})," and all the scripts you've always used \ud83d\udc37"]})})]})}function m(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},6701:(e,t,n)=>{n.d(t,{A:()=>g});var r=n(6540),s=n(4164),a=n(5246),o=n(9136),l=n(3535);const i={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=n(4848);function u(e){return!!e&&("SUMMARY"===e.tagName||u(e.parentElement))}function d(e,t){return!!e&&(e===t||d(e.parentElement,t))}function h(e){let{summary:t,children:n,...h}=e;(0,a.A)().collectAnchor(h.id);const p=(0,o.A)(),m=(0,r.useRef)(null),{collapsed:g,setCollapsed:x}=(0,l.u)({initialState:!h.open}),[j,f]=(0,r.useState)(h.open),v=r.isValidElement(t)?t:(0,c.jsx)("summary",{children:t??"Details"});return(0,c.jsxs)("details",{...h,ref:m,open:j,"data-collapsed":g,className:(0,s.A)(i.details,p&&i.isBrowser,h.className),onMouseDown:e=>{u(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;u(t)&&d(t,m.current)&&(e.preventDefault(),g?(x(!1),f(!0)):x(!0))},children:[v,(0,c.jsx)(l.N,{lazy:!1,collapsed:g,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{x(e),f(!e)},children:(0,c.jsx)("div",{className:i.collapsibleContent,children:n})})]})}const p={details:"details_b_Ee"},m="alert alert--info";function g(e){let{...t}=e;return(0,c.jsx)(h,{...t,className:(0,s.A)(m,p.details,t.className)})}},9329:(e,t,n)=>{n.d(t,{A:()=>o});n(6540);var r=n(4164);const s={tabItem:"tabItem_Ymn6"};var a=n(4848);function o(e){let{children:t,hidden:n,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.A)(s.tabItem,o),hidden:n,children:t})}},5537:(e,t,n)=>{n.d(t,{A:()=>k});var r=n(6540),s=n(4164),a=n(5627),o=n(6347),l=n(372),i=n(604),c=n(1861),u=n(8749);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:s}}=e;return{value:t,label:n,attributes:r,default:s}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const s=(0,o.W6)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i.aZ)(a),(0,r.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(s.location.search);t.set(a,e),s.replace({...s.location,search:t.toString()})}),[a,s])]}function g(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,a=h(e),[o,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:a}))),[c,d]=m({queryString:n,groupId:s}),[g,x]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,a]=(0,u.Dv)(n);return[s,(0,r.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:s}),j=(()=>{const e=c??g;return p({value:e,tabValues:a})?e:null})();(0,l.A)((()=>{j&&i(j)}),[j]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),x(e)}),[d,x,a]),tabValues:a}}var x=n(9136);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=n(4848);function v(e){let{className:t,block:n,selectedValue:r,selectValue:o,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),u=e=>{const t=e.currentTarget,n=i.indexOf(t),s=l[n].value;s!==r&&(c(t),o(s))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:a}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>{i.push(e)},onKeyDown:d,onClick:u,...a,className:(0,s.A)("tabs__item",j.tabItem,a?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function b(e){let{lazy:t,children:n,selectedValue:a}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function y(e){const t=g(e);return(0,f.jsxs)("div",{className:(0,s.A)("tabs-container",j.tabList),children:[(0,f.jsx)(v,{...t,...e}),(0,f.jsx)(b,{...t,...e})]})}function k(e){const t=(0,x.A)();return(0,f.jsx)(y,{...e,children:d(e.children)},String(t))}},5397:(e,t,n)=>{n.d(t,{T:()=>a});var r=n(6701),s=n(4848);const a=e=>{let{children:t,open:n,title:a}=e;return(0,s.jsx)(r.A,{open:n,className:"faq",summary:(0,s.jsx)("summary",{children:(0,s.jsx)("strong",{children:a})}),children:(0,s.jsx)("section",{children:t})})}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>l});var r=n(6540);const s={},a=r.createContext(s);function o(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);