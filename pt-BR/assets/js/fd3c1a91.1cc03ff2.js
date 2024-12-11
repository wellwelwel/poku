"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7467],{8030:(e,s,a)=>{a.r(s),a.d(s,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"documentation/assert/index","title":"\ud83d\udd75\ud83c\udffb Assert","description":"O Poku inclui o m\xe9todo assert nativo do Node.js, mantendo tudo como est\xe1, mas fornecendo legibilidade para humanos.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/version-2.x.x/documentation/assert/index.mdx","sourceDirName":"documentation/assert","slug":"/documentation/assert/","permalink":"/pt-BR/docs/2.x.x/documentation/assert/","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/assert/index.mdx","tags":[{"inline":true,"label":"assert","permalink":"/pt-BR/docs/2.x.x/tags/assert"},{"inline":true,"label":"assertions","permalink":"/pt-BR/docs/2.x.x/tags/assertions"},{"inline":true,"label":"expect","permalink":"/pt-BR/docs/2.x.x/tags/expect"}],"version":"2.x.x","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"tags":["assert","assertions","expect"]},"sidebar":"docs","previous":{"title":"noExit","permalink":"/pt-BR/docs/2.x.x/documentation/poku/options/no-exit"},"next":{"title":"\u26a1\ufe0f Helpers","permalink":"/pt-BR/docs/2.x.x/category/\ufe0f-helpers"}}');var n=a(4848),t=a(8453),o=(a(1470),a(9365),a(185));const l={sidebar_position:2,tags:["assert","assertions","expect"]},i="\ud83d\udd75\ud83c\udffb Assert",d={},c=[{value:"Migrando para o <code>assert</code> do <strong>Poku</strong>",id:"migrando-para-o-assert-do-poku",level:2},{value:"M\xe9todos Dispon\xedveis",id:"m\xe9todos-dispon\xedveis",level:2},{value:"Verdadeira",id:"verdadeira",level:3},{value:"Igualdade",id:"igualdade",level:3},{value:"Igualdade Profunda",id:"igualdade-profunda",level:3},{value:"Correspondente",id:"correspondente",level:3},{value:"Sucesso",id:"sucesso",level:3},{value:"Desigualdade",id:"desigualdade",level:3},{value:"Desigualdade Profunda",id:"desigualdade-profunda",level:3},{value:"N\xe3o Correspondente",id:"n\xe3o-correspondente",level:3},{value:"Falha",id:"falha",level:3},{value:"Falso",id:"falso",level:3},{value:"Falha For\xe7ada",id:"falha-for\xe7ada",level:3}];function u(e){const s={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.header,{children:(0,n.jsx)(s.h1,{id:"-assert",children:"\ud83d\udd75\ud83c\udffb Assert"})}),"\n",(0,n.jsxs)(s.p,{children:["O ",(0,n.jsx)(s.strong,{children:"Poku"})," inclui o m\xe9todo ",(0,n.jsx)(s.code,{children:"assert"})," nativo do ",(0,n.jsx)(s.a,{href:"https://github.com/nodejs/node",children:(0,n.jsx)(s.strong,{children:"Node.js"})}),", mantendo tudo como est\xe1, mas fornecendo legibilidade para humanos.",(0,n.jsx)("br",{}),"\nSuporta tanto o ",(0,n.jsx)(s.a,{href:"https://github.com/oven-sh/bun",children:(0,n.jsx)(s.strong,{children:"Bun"})})," quanto o ",(0,n.jsx)(s.a,{href:"https://github.com/denoland/deno",children:(0,n.jsx)(s.strong,{children:"Deno"})}),"."]}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["Compat\xedvel com ",(0,n.jsx)(s.a,{href:"https://github.com/nodejs/node",children:(0,n.jsx)(s.strong,{children:"Node.js"})}),", ",(0,n.jsx)(s.a,{href:"https://github.com/oven-sh/bun",children:(0,n.jsx)(s.strong,{children:"Bun"})})," e ",(0,n.jsx)(s.a,{href:"https://github.com/denoland/deno",children:(0,n.jsx)(s.strong,{children:"Deno"})})]}),"\n"]}),"\n",(0,n.jsxs)(s.blockquote,{children:["\n",(0,n.jsxs)(s.p,{children:["O ",(0,n.jsx)(s.code,{children:"assert"})," \xe9 usado para escrever testes e verificar se seu c\xf3digo funciona como esperado, comparando valores e lan\xe7ando erros \ud83e\uddd1\ud83c\udffb\u200d\ud83c\udf93"]}),"\n"]}),"\n",(0,n.jsxs)(s.h2,{id:"migrando-para-o-assert-do-poku",children:["Migrando para o ",(0,n.jsx)(s.code,{children:"assert"})," do ",(0,n.jsx)(s.strong,{children:"Poku"})]}),"\n",(0,n.jsx)(s.p,{children:(0,n.jsx)(s.em,{children:"Mas apenas se voc\xea quiser, \xe9 claro."})}),"\n",(0,n.jsx)(s.p,{children:"Asser\xe7\xf5es padr\xf5es:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-diff",children:"- import assert from 'node:assert';\n+ import { assert } from 'poku';\n"})}),"\n",(0,n.jsx)(s.p,{children:"Asser\xe7\xf5es estritas:"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-diff",children:"- import assert from 'node:assert/strict';\n+ import { strict as assert } from 'poku';\n"})}),"\n",(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsxs)(s.li,{children:["O m\xe9todo ",(0,n.jsx)(s.code,{children:"strict"})," est\xe1 dispon\xedvel para ",(0,n.jsx)(s.strong,{children:"Node.js 16"})," em diante, ",(0,n.jsx)(s.strong,{children:"Bun"})," e ",(0,n.jsx)(s.strong,{children:"Deno"}),"."]}),"\n"]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert(true, 'Isso \xe9 v\xe1lido \ud83e\uddea');\nassert.strictEqual(1, '1', 'O Poku ir\xe1 descrever isso e mostrar um erro \ud83d\udc37');\n// ...\n"})}),"\n",(0,n.jsx)(s.admonition,{type:"tip",children:(0,n.jsxs)(s.p,{children:["O ",(0,n.jsx)(s.code,{children:"assert"})," do ",(0,n.jsx)(s.strong,{children:"Poku"})," usar\xe1 a mensagem exatamente como seria ao usar ",(0,n.jsx)(s.code,{children:"describe"})," e ",(0,n.jsx)(s.code,{children:"it"}),". ",(0,n.jsx)("br",{}),"\nSeu ",(0,n.jsx)(s.strong,{children:"Poku"})," est\xe1 esperando por voc\xea \ud83d\udc37\u2728"]})}),"\n",(0,n.jsx)("hr",{}),"\n",(0,n.jsxs)(s.p,{children:["\ud83d\udcd8 Para aprender sobre asser\xe7\xf5es, veja o tutorial r\xe1pido: ",(0,n.jsx)(s.a,{href:"/docs/tutorials/beginner",children:"De um teste de asser\xe7\xe3o b\xe1sico \xe0 sua execu\xe7\xe3o"}),"."]}),"\n",(0,n.jsx)("hr",{}),"\n",(0,n.jsx)(s.h2,{id:"m\xe9todos-dispon\xedveis",children:"M\xe9todos Dispon\xedveis"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"import { assert } from 'poku';\n// import { strict as assert } from 'poku';\n"})}),"\n",(0,n.jsxs)(o.T,{title:"Asser\xe7\xf5es positivas",open:!0,children:[(0,n.jsx)(s.h3,{id:"verdadeira",children:"Verdadeira"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert(valor[, mensagem])\n"})}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.ok(valor[, mensagem])\n"})}),(0,n.jsx)(s.h3,{id:"igualdade",children:"Igualdade"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.equal(atual, esperado[, mensagem])\n"})}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.strictEqual(atual, esperado[, mensagem])\n"})}),(0,n.jsx)(s.h3,{id:"igualdade-profunda",children:"Igualdade Profunda"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.deepEqual(atual, esperado[, mensagem])\n"})}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.deepStrictEqual(atual, esperado[, mensagem])\n"})}),(0,n.jsx)(s.h3,{id:"correspondente",children:"Correspondente"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.match(string, regexp[, mensagem])\n"})}),(0,n.jsx)(s.h3,{id:"sucesso",children:"Sucesso"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.doesNotReject(asyncFn[, erro][, mensagem])\n"})}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.doesNotThrow(fn[, erro][, mensagem])\n"})})]}),"\n",(0,n.jsxs)(o.T,{title:"Asser\xe7\xf5es Negativas",children:[(0,n.jsx)(s.h3,{id:"desigualdade",children:"Desigualdade"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.notEqual(atual, esperado[, mensagem])\n"})}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.notStrictEqual(atual, esperado[, mensagem])\n"})}),(0,n.jsx)(s.h3,{id:"desigualdade-profunda",children:"Desigualdade Profunda"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.notDeepEqual(atual, esperado[, mensagem])\n"})}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.notDeepStrictEqual(atual, esperado[, mensagem])\n"})}),(0,n.jsx)(s.h3,{id:"n\xe3o-correspondente",children:"N\xe3o Correspondente"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.doesNotMatch(string, regexp[, mensagem])\n"})}),(0,n.jsx)(s.h3,{id:"falha",children:"Falha"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.rejects(asyncFn[, erro][, mensagem])\n"})}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.throws(fn[, erro][, mensagem])\n"})})]}),"\n",(0,n.jsxs)(o.T,{title:"Tratamento de Erro",children:[(0,n.jsx)(s.h3,{id:"falso",children:"Falso"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.ifError(valor);\n"})}),(0,n.jsxs)(s.ul,{children:["\n",(0,n.jsx)(s.li,{children:(0,n.jsx)(s.em,{children:"Teste para um valor de erro, \xfatil em callbacks"})}),"\n"]}),(0,n.jsx)(s.h3,{id:"falha-for\xe7ada",children:"Falha For\xe7ada"}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-ts",children:"assert.fail([mensagem]);\n"})})]}),"\n",(0,n.jsxs)(s.p,{children:["Voc\xea pode seguir a ",(0,n.jsx)(s.a,{href:"https://nodejs.org/api/assert.html",children:(0,n.jsx)(s.strong,{children:"documenta\xe7\xe3o do assert"})})," da documenta\xe7\xe3o do ",(0,n.jsx)(s.strong,{children:"Node.js"}),"."]}),"\n",(0,n.jsx)(s.admonition,{type:"note",children:(0,n.jsxs)(s.p,{children:["Para o ",(0,n.jsx)(s.strong,{children:"Node.js"}),", os m\xe9todos ",(0,n.jsx)(s.code,{children:"assert.match"})," e ",(0,n.jsx)(s.code,{children:"assert.doesNotMatch"})," est\xe3o dispon\xedveis a partir da vers\xe3o 12 ou superior."]})}),"\n",(0,n.jsxs)(s.admonition,{type:"info",children:[(0,n.jsxs)(s.p,{children:["Para compilar testes usando ",(0,n.jsx)(s.code,{children:"assert"})," com ",(0,n.jsx)(s.strong,{children:"TypeScript"}),", voc\xea pode precisar instalar o ",(0,n.jsx)(s.strong,{children:"@types/node"}),":"]}),(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-bash",children:"npm i -D @types/node\n"})})]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(u,{...e})}):u(e)}},1622:(e,s,a)=>{a.d(s,{A:()=>x});var r=a(6540),n=a(4164),t=a(3427),o=a(2303),l=a(1422);const i={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var d=a(4848);function c(e){return!!e&&("SUMMARY"===e.tagName||c(e.parentElement))}function u(e,s){return!!e&&(e===s||u(e.parentElement,s))}function h(e){let{summary:s,children:a,...h}=e;(0,t.A)().collectAnchor(h.id);const p=(0,o.A)(),m=(0,r.useRef)(null),{collapsed:x,setCollapsed:g}=(0,l.u)({initialState:!h.open}),[j,f]=(0,r.useState)(h.open),v=r.isValidElement(s)?s:(0,d.jsx)("summary",{children:s??"Details"});return(0,d.jsxs)("details",{...h,ref:m,open:j,"data-collapsed":x,className:(0,n.A)(i.details,p&&i.isBrowser,h.className),onMouseDown:e=>{c(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const s=e.target;c(s)&&u(s,m.current)&&(e.preventDefault(),x?(g(!1),f(!0)):g(!0))},children:[v,(0,d.jsx)(l.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{g(e),f(!e)},children:(0,d.jsx)("div",{className:i.collapsibleContent,children:a})})]})}const p={details:"details_b_Ee"},m="alert alert--info";function x(e){let{...s}=e;return(0,d.jsx)(h,{...s,className:(0,n.A)(m,p.details,s.className)})}},9365:(e,s,a)=>{a.d(s,{A:()=>o});a(6540);var r=a(4164);const n={tabItem:"tabItem_Ymn6"};var t=a(4848);function o(e){let{children:s,hidden:a,className:o}=e;return(0,t.jsx)("div",{role:"tabpanel",className:(0,r.A)(n.tabItem,o),hidden:a,children:s})}},1470:(e,s,a)=>{a.d(s,{A:()=>k});var r=a(6540),n=a(4164),t=a(3104),o=a(6347),l=a(205),i=a(7485),d=a(1682),c=a(679);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:s}=e;return!!s&&"object"==typeof s&&"value"in s}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:s,children:a}=e;return(0,r.useMemo)((()=>{const e=s??function(e){return u(e).map((e=>{let{props:{value:s,label:a,attributes:r,default:n}}=e;return{value:s,label:a,attributes:r,default:n}}))}(a);return function(e){const s=(0,d.XI)(e,((e,s)=>e.value===s.value));if(s.length>0)throw new Error(`Docusaurus error: Duplicate values "${s.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[s,a])}function p(e){let{value:s,tabValues:a}=e;return a.some((e=>e.value===s))}function m(e){let{queryString:s=!1,groupId:a}=e;const n=(0,o.W6)(),t=function(e){let{queryString:s=!1,groupId:a}=e;if("string"==typeof s)return s;if(!1===s)return null;if(!0===s&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:s,groupId:a});return[(0,i.aZ)(t),(0,r.useCallback)((e=>{if(!t)return;const s=new URLSearchParams(n.location.search);s.set(t,e),n.replace({...n.location,search:s.toString()})}),[t,n])]}function x(e){const{defaultValue:s,queryString:a=!1,groupId:n}=e,t=h(e),[o,i]=(0,r.useState)((()=>function(e){let{defaultValue:s,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(s){if(!p({value:s,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${s}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return s}const r=a.find((e=>e.default))??a[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:s,tabValues:t}))),[d,u]=m({queryString:a,groupId:n}),[x,g]=function(e){let{groupId:s}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(s),[n,t]=(0,c.Dv)(a);return[n,(0,r.useCallback)((e=>{a&&t.set(e)}),[a,t])]}({groupId:n}),j=(()=>{const e=d??x;return p({value:e,tabValues:t})?e:null})();(0,l.A)((()=>{j&&i(j)}),[j]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:t}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),g(e)}),[u,g,t]),tabValues:t}}var g=a(2303);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=a(4848);function v(e){let{className:s,block:a,selectedValue:r,selectValue:o,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:d}=(0,t.a_)(),c=e=>{const s=e.currentTarget,a=i.indexOf(s),n=l[a].value;n!==r&&(d(s),o(n))},u=e=>{let s=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const a=i.indexOf(e.currentTarget)+1;s=i[a]??i[0];break}case"ArrowLeft":{const a=i.indexOf(e.currentTarget)-1;s=i[a]??i[i.length-1];break}}s?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,n.A)("tabs",{"tabs--block":a},s),children:l.map((e=>{let{value:s,label:a,attributes:t}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:r===s?0:-1,"aria-selected":r===s,ref:e=>i.push(e),onKeyDown:u,onClick:c,...t,className:(0,n.A)("tabs__item",j.tabItem,t?.className,{"tabs__item--active":r===s}),children:a??s},s)}))})}function b(e){let{lazy:s,children:a,selectedValue:t}=e;const o=(Array.isArray(a)?a:[a]).filter(Boolean);if(s){const e=o.find((e=>e.props.value===t));return e?(0,r.cloneElement)(e,{className:(0,n.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:o.map(((e,s)=>(0,r.cloneElement)(e,{key:s,hidden:e.props.value!==t})))})}function N(e){const s=x(e);return(0,f.jsxs)("div",{className:(0,n.A)("tabs-container",j.tabList),children:[(0,f.jsx)(v,{...s,...e}),(0,f.jsx)(b,{...s,...e})]})}function k(e){const s=(0,g.A)();return(0,f.jsx)(N,{...e,children:u(e.children)},String(s))}},185:(e,s,a)=>{a.d(s,{T:()=>t});var r=a(1622),n=a(4848);const t=e=>{let{children:s,open:a,title:t}=e;return(0,n.jsx)(r.A,{open:a,className:"faq",summary:(0,n.jsx)("summary",{children:(0,n.jsx)("strong",{children:t})}),children:(0,n.jsx)("section",{children:s})})}},8453:(e,s,a)=>{a.d(s,{R:()=>o,x:()=>l});var r=a(6540);const n={},t=r.createContext(n);function o(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);