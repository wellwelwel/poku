"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7534],{3225:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>u,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"examples/mock/esm","title":"Mock using ESM","description":"You can use your favorite Mock framework or tool and Poku together \ud83d\udc37\u2795","source":"@site/docs/examples/mock/esm.mdx","sourceDirName":"examples/mock","slug":"/examples/mock/esm","permalink":"/docs/examples/mock/esm","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/examples/mock/esm.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docs","previous":{"title":"Mock using CJS","permalink":"/docs/examples/mock/cjs"},"next":{"title":"Use Cases","permalink":"/docs/category/use-cases"}}');var s=n(4848),a=n(8453),o=n(1470),l=n(9365);const u={},i="Mock using ESM",c={},d=[];function h(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.header,{children:(0,s.jsx)(t.h1,{id:"mock-using-esm",children:"Mock using ESM"})}),"\n",(0,s.jsxs)(t.p,{children:["You can use your favorite ",(0,s.jsx)(t.strong,{children:"Mock"})," framework or tool and ",(0,s.jsx)(t.strong,{children:"Poku"})," together \ud83d\udc37\u2795"]}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:["By not locking you into a specific set of plugins or mocking/spying tools, ",(0,s.jsx)(t.strong,{children:"Poku"})," promotes an open ecosystem where developers are free to integrate the tools that best suit their needs."]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["For this example, let's use the ",(0,s.jsx)(t.a,{href:"https://github.com/testdouble/quibble",children:(0,s.jsx)(t.strong,{children:"quibble"})}),", then testing its results with ",(0,s.jsx)(t.strong,{children:"Poku"}),":"]}),"\n",(0,s.jsxs)(o.A,{children:[(0,s.jsx)(l.A,{default:!0,value:"./test/withdraw.test.js",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import { assert } from 'poku';\nimport quibble from 'quibble';\n\nawait quibble.esm('../lib/funds.js', {\n  // Original: 100\n  getFunds: () => 200,\n});\n\nconst { withdraw } = await import('../lib/withdraw.test.js');\n\nassert.strictEqual(withdraw(200), true, 'Mocking my funds to 200');\n\nassert.strictEqual(withdraw(300), false, \"I can't get more than I have\");\n\nawait quibble.reset();\n"})})}),(0,s.jsx)(l.A,{value:"./lib/funds.js",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"export const getFunds = () => 100;\n"})})}),(0,s.jsx)(l.A,{value:"./lib/withdraw.js",children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"import { getFunds } from './funds.js';\n\nexport const withdraw = (value) => {\n  const wallet = getFunds();\n\n  return value <= wallet;\n};\n"})})})]}),"\n",(0,s.jsx)(t.p,{children:"Then:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"npx poku\n"})})]})}function m(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},9365:(e,t,n)=>{n.d(t,{A:()=>o});n(6540);var r=n(4164);const s={tabItem:"tabItem_Ymn6"};var a=n(4848);function o(e){let{children:t,hidden:n,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.A)(s.tabItem,o),hidden:n,children:t})}},1470:(e,t,n)=>{n.d(t,{A:()=>k});var r=n(6540),s=n(4164),a=n(3104),o=n(6347),l=n(205),u=n(7485),i=n(1682),c=n(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:s}}=e;return{value:t,label:n,attributes:r,default:s}}))}(n);return function(e){const t=(0,i.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:n}=e;const s=(0,o.W6)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,u.aZ)(a),(0,r.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(s.location.search);t.set(a,e),s.replace({...s.location,search:t.toString()})}),[a,s])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:s}=e,a=h(e),[o,u]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:a}))),[i,d]=p({queryString:n,groupId:s}),[b,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,a]=(0,c.Dv)(n);return[s,(0,r.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:s}),g=(()=>{const e=i??b;return m({value:e,tabValues:a})?e:null})();(0,l.A)((()=>{g&&u(g)}),[g]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);u(e),d(e),f(e)}),[d,f,a]),tabValues:a}}var f=n(2303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=n(4848);function v(e){let{className:t,block:n,selectedValue:r,selectValue:o,tabValues:l}=e;const u=[],{blockElementScrollPositionUntilNextRender:i}=(0,a.a_)(),c=e=>{const t=e.currentTarget,n=u.indexOf(t),s=l[n].value;s!==r&&(i(t),o(s))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:a}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>u.push(e),onKeyDown:d,onClick:c,...a,className:(0,s.A)("tabs__item",g.tabItem,a?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function w(e){let{lazy:t,children:n,selectedValue:a}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function j(e){const t=b(e);return(0,x.jsxs)("div",{className:(0,s.A)("tabs-container",g.tabList),children:[(0,x.jsx)(v,{...t,...e}),(0,x.jsx)(w,{...t,...e})]})}function k(e){const t=(0,f.A)();return(0,x.jsx)(j,{...e,children:d(e.children)},String(t))}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>l});var r=n(6540);const s={},a=r.createContext(s);function o(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);