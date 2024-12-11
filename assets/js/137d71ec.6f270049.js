"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9266],{4307:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"documentation/helpers/before-after-each/in-code","title":"In-Code","description":"beforeEach and afterEach","source":"@site/docs/documentation/helpers/before-after-each/in-code.mdx","sourceDirName":"documentation/helpers/before-after-each","slug":"/documentation/helpers/before-after-each/in-code","permalink":"/docs/next/documentation/helpers/before-after-each/in-code","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/helpers/before-after-each/in-code.mdx","tags":[{"inline":true,"label":"hooks","permalink":"/docs/next/tags/hooks"},{"inline":true,"label":"setup","permalink":"/docs/next/tags/setup"},{"inline":true,"label":"teardown","permalink":"/docs/next/tags/teardown"}],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"tags":["hooks","setup","teardown"]},"sidebar":"docs","previous":{"title":"Per File","permalink":"/docs/next/documentation/helpers/before-after-each/per-file"},"next":{"title":"\ud83d\udc33 Containers","permalink":"/docs/next/documentation/helpers/containers"}}');var a=n(4848),o=n(8453);n(1470),n(9365);const s={sidebar_position:2,tags:["hooks","setup","teardown"]},i="In-Code",c={},l=[{value:"<code>beforeEach</code> and <code>afterEach</code>",id:"beforeeach-and-aftereach",level:2},{value:"Basic usage",id:"basic-usage",level:3},{value:"By using promises",id:"by-using-promises",level:3}];function u(e){const t={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"in-code",children:"In-Code"})}),"\n",(0,a.jsxs)(t.h2,{id:"beforeeach-and-aftereach",children:[(0,a.jsx)(t.code,{children:"beforeEach"})," and ",(0,a.jsx)(t.code,{children:"afterEach"})]}),"\n",(0,a.jsxs)(t.p,{children:["Both ",(0,a.jsx)(t.code,{children:"beforeEach"}),", ",(0,a.jsx)(t.code,{children:"afterEach"})," are recommended for tests that consume a particular global state for each test.",(0,a.jsx)("br",{}),"\nFor example, by populating or resetting a database before and/or after multiple assertions."]}),"\n",(0,a.jsx)(t.h3,{id:"basic-usage",children:"Basic usage"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-ts",children:"import { test, beforeEach, afterEach } from 'poku';\n\nconst prepareService = () => true;\nconst resetService = () => true;\n\nbeforeEach(() => prepareService());\n\nafterEach(() => resetService());\n\ntest(() => {\n  // do anything you want\n});\n\ntest(() => {\n  // do anything you want\n});\n"})}),"\n",(0,a.jsx)(t.h3,{id:"by-using-promises",children:"By using promises"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-ts",children:"import { test, beforeEach, afterEach } from 'poku';\n\nconst prepareService = () => new Promise((resolve) => resolve(true));\n\nconst resetService = () => new Promise((resolve) => resolve(true));\n\nbeforeEach(async () => await prepareService());\nafterEach(async () => await resetService());\n\nawait test(async () => {\n  // do anything you want\n});\n\nawait test(async () => {\n  // do anything you want\n});\n"})}),"\n",(0,a.jsxs)(t.admonition,{type:"tip",children:[(0,a.jsxs)(t.p,{children:["You can overwriting both ",(0,a.jsx)(t.code,{children:"beforeEach"})," and ",(0,a.jsx)(t.code,{children:"afterEach"})," by declaring them again anytime."]}),(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"Poku"})," provides three optional methods from both ",(0,a.jsx)(t.code,{children:"beforeEach"})," and ",(0,a.jsx)(t.code,{children:"afterEach"}),":"]}),(0,a.jsxs)(t.ul,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:".pause()"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:".continue()"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:".reset()"})}),"\n"]})]})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},9365:(e,t,n)=>{n.d(t,{A:()=>s});n(6540);var r=n(4164);const a={tabItem:"tabItem_Ymn6"};var o=n(4848);function s(e){let{children:t,hidden:n,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,s),hidden:n,children:t})}},1470:(e,t,n)=>{n.d(t,{A:()=>w});var r=n(6540),a=n(4164),o=n(3104),s=n(6347),i=n(205),c=n(7485),l=n(1682),u=n(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,l.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,s.W6)(),o=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,c.aZ)(o),(0,r.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,o=h(e),[s,c]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:o}))),[l,d]=f({queryString:n,groupId:a}),[b,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,u.Dv)(n);return[a,(0,r.useCallback)((e=>{n&&o.set(e)}),[n,o])]}({groupId:a}),v=(()=>{const e=l??b;return p({value:e,tabValues:o})?e:null})();(0,i.A)((()=>{v&&c(v)}),[v]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);c(e),d(e),m(e)}),[d,m,o]),tabValues:o}}var m=n(2303);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=n(4848);function x(e){let{className:t,block:n,selectedValue:r,selectValue:s,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:l}=(0,o.a_)(),u=e=>{const t=e.currentTarget,n=c.indexOf(t),a=i[n].value;a!==r&&(l(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=c.indexOf(e.currentTarget)+1;t=c[n]??c[0];break}case"ArrowLeft":{const n=c.indexOf(e.currentTarget)-1;t=c[n]??c[c.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:o}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>c.push(e),onKeyDown:d,onClick:u,...o,className:(0,a.A)("tabs__item",v.tabItem,o?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:o}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==o})))})}function j(e){const t=b(e);return(0,g.jsxs)("div",{className:(0,a.A)("tabs-container",v.tabList),children:[(0,g.jsx)(x,{...t,...e}),(0,g.jsx)(y,{...t,...e})]})}function w(e){const t=(0,m.A)();return(0,g.jsx)(j,{...e,children:d(e.children)},String(t))}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>i});var r=n(6540);const a={},o=r.createContext(a);function s(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);