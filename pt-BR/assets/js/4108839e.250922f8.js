"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5859],{8988:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>m,frontMatter:()=>u,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"examples/cjs-esm","title":"CJS and ESM","description":"Apenas configure seu package.json como de costume e pronto.","source":"@site/i18n/pt-BR/docusaurus-plugin-content-docs/version-2.x.x/examples/cjs-esm.mdx","sourceDirName":"examples","slug":"/examples/cjs-esm","permalink":"/pt-BR/docs/2.x.x/examples/cjs-esm","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/examples/cjs-esm.mdx","tags":[],"version":"2.x.x","frontMatter":{},"sidebar":"docs","previous":{"title":"Um Caso Complexo","permalink":"/pt-BR/docs/2.x.x/examples/cases/complexity-no-exit"}}');var a=n(4848),s=n(8453),o=n(1470),l=n(9365);const u={},c="CJS and ESM",i={},d=[];function p(e){const t={code:"code",h1:"h1",header:"header",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"cjs-and-esm",children:"CJS and ESM"})}),"\n",(0,a.jsxs)(t.p,{children:["Apenas configure seu ",(0,a.jsx)(t.strong,{children:"package.json"})," como de costume e pronto. ",(0,a.jsx)("br",{}),"\nO ",(0,a.jsx)(t.strong,{children:"Poku"})," n\xe3o requer nenhuma configura\xe7\xe3o para isso \ud83d\udc37"]}),"\n",(0,a.jsxs)(o.A,{children:[(0,a.jsx)(l.A,{default:!0,value:"ESM",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "type": "module"\n}\n'})})}),(0,a.jsx)(l.A,{value:"CJS",children:(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "type": "commonjs"\n}\n'})})})]})]})}function m(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},9365:(e,t,n)=>{n.d(t,{A:()=>o});n(6540);var r=n(4164);const a={tabItem:"tabItem_Ymn6"};var s=n(4848);function o(e){let{children:t,hidden:n,className:o}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,o),hidden:n,children:t})}},1470:(e,t,n)=>{n.d(t,{A:()=>y});var r=n(6540),a=n(4164),s=n(3104),o=n(6347),l=n(205),u=n(7485),c=n(1682),i=n(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,o.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,u.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(a.location.search);t.set(s,e),a.replace({...a.location,search:t.toString()})}),[s,a])]}function h(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,s=p(e),[o,u]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[c,d]=f({queryString:n,groupId:a}),[h,b]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,s]=(0,i.Dv)(n);return[a,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:a}),x=(()=>{const e=c??h;return m({value:e,tabValues:s})?e:null})();(0,l.A)((()=>{x&&u(x)}),[x]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);u(e),d(e),b(e)}),[d,b,s]),tabValues:s}}var b=n(2303);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=n(4848);function g(e){let{className:t,block:n,selectedValue:r,selectValue:o,tabValues:l}=e;const u=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.a_)(),i=e=>{const t=e.currentTarget,n=u.indexOf(t),a=l[n].value;a!==r&&(c(t),o(a))},d=e=>{let t=null;switch(e.key){case"Enter":i(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>u.push(e),onKeyDown:d,onClick:i,...s,className:(0,a.A)("tabs__item",x.tabItem,s?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function j(e){let{lazy:t,children:n,selectedValue:s}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function w(e){const t=h(e);return(0,v.jsxs)("div",{className:(0,a.A)("tabs-container",x.tabList),children:[(0,v.jsx)(g,{...t,...e}),(0,v.jsx)(j,{...t,...e})]})}function y(e){const t=(0,b.A)();return(0,v.jsx)(w,{...e,children:d(e.children)},String(t))}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>l});var r=n(6540);const a={},s=r.createContext(a);function o(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);