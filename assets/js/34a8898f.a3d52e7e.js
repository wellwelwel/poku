"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1910],{2316:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>h,contentTitle:()=>p,default:()=>b,frontMatter:()=>d,metadata:()=>r,toc:()=>f});const r=JSON.parse('{"id":"documentation/helpers/before-after-each/per-file","title":"Per File","description":"Running a callback before and after each test file","source":"@site/versioned_docs/version-2.x.x/documentation/helpers/before-after-each/per-file.mdx","sourceDirName":"documentation/helpers/before-after-each","slug":"/documentation/helpers/before-after-each/per-file","permalink":"/docs/2.x.x/documentation/helpers/before-after-each/per-file","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/helpers/before-after-each/per-file.mdx","tags":[{"inline":true,"label":"hooks","permalink":"/docs/2.x.x/tags/hooks"},{"inline":true,"label":"setup","permalink":"/docs/2.x.x/tags/setup"},{"inline":true,"label":"teardown","permalink":"/docs/2.x.x/tags/teardown"}],"version":"2.x.x","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"tags":["hooks","setup","teardown"]},"sidebar":"docs","previous":{"title":"\ud83e\uddd9\ud83c\udffb Before and After Each","permalink":"/docs/2.x.x/category/-before-and-after-each"},"next":{"title":"In-Code","permalink":"/docs/2.x.x/documentation/helpers/before-after-each/in-code"}}');var a=n(4848),s=n(8453),l=n(5537),o=n(9329),i=n(5397),c=n(8637),u=n(6090);const d={sidebar_position:1,tags:["hooks","setup","teardown"]},p="Per File",h={},f=[{value:"Running a callback before and after each test file",id:"running-a-callback-before-and-after-each-test-file",level:2}];function m(e){const t={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",input:"input",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"per-file",children:"Per File"})}),"\n",(0,a.jsx)(t.h2,{id:"running-a-callback-before-and-after-each-test-file",children:"Running a callback before and after each test file"}),"\n",(0,a.jsxs)(t.ul,{className:"contains-task-list",children:["\n",(0,a.jsxs)(t.li,{className:"task-list-item",children:[(0,a.jsx)(t.input,{type:"checkbox",checked:!0,disabled:!0})," ",(0,a.jsx)(t.code,{children:"poku"})," ",(0,a.jsx)(t.strong,{children:"API"})]}),"\n",(0,a.jsxs)(t.li,{className:"task-list-item",children:[(0,a.jsx)(t.input,{type:"checkbox",disabled:!0})," ",(0,a.jsx)(t.code,{children:"poku"})," ",(0,a.jsx)(t.strong,{children:"CLI"})]}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:"Poku"})," brings a simple way to perform a callback before and/or after every test file."]}),"\n",(0,a.jsx)(l.A,{children:(0,a.jsxs)(o.A,{default:!0,value:"test/run.test.js",children:[(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-ts",children:"import { poku } from 'poku';\n\nconst prepareService = () => new Promise((resolve) => resolve(undefined));\nconst resetService = () => new Promise((_, reject) => reject('Let\\'s crash it'));\n\nawait poku('test/unit', {\n  beforeEach: prepareService,\n  afterEach: resetService,\n});\n"})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-bash",children:"npx poku test/run.test.js\n"})})]})}),"\n",(0,a.jsx)(i.T,{title:"Success Case",children:(0,a.jsx)("img",{src:c.A})}),"\n",(0,a.jsx)(i.T,{title:"Failure Case (check the debug)",children:(0,a.jsx)("img",{src:u.A})}),"\n",(0,a.jsx)("hr",{}),"\n",(0,a.jsx)(t.admonition,{type:"tip",children:(0,a.jsx)(t.p,{children:'The "per-file" mode comes close to plugins, even though that wasn\'t the original intention.'})}),"\n",(0,a.jsx)(t.admonition,{type:"danger",children:(0,a.jsxs)(t.p,{children:["Although it also works with ",(0,a.jsx)(t.code,{children:"parallel"})," runs, it's strongly discouraged to use these features for concurrent tests."]})})]})}function b(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}},6701:(e,t,n)=>{n.d(t,{A:()=>m});var r=n(6540),a=n(4164),s=n(5246),l=n(9136),o=n(3535);const i={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=n(4848);function u(e){return!!e&&("SUMMARY"===e.tagName||u(e.parentElement))}function d(e,t){return!!e&&(e===t||d(e.parentElement,t))}function p(e){let{summary:t,children:n,...p}=e;(0,s.A)().collectAnchor(p.id);const h=(0,l.A)(),f=(0,r.useRef)(null),{collapsed:m,setCollapsed:b}=(0,o.u)({initialState:!p.open}),[x,g]=(0,r.useState)(p.open),v=r.isValidElement(t)?t:(0,c.jsx)("summary",{children:t??"Details"});return(0,c.jsxs)("details",{...p,ref:f,open:x,"data-collapsed":m,className:(0,a.A)(i.details,h&&i.isBrowser,p.className),onMouseDown:e=>{u(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;u(t)&&d(t,f.current)&&(e.preventDefault(),m?(b(!1),g(!0)):b(!0))},children:[v,(0,c.jsx)(o.N,{lazy:!1,collapsed:m,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{b(e),g(!e)},children:(0,c.jsx)("div",{className:i.collapsibleContent,children:n})})]})}const h={details:"details_b_Ee"},f="alert alert--info";function m(e){let{...t}=e;return(0,c.jsx)(p,{...t,className:(0,a.A)(f,h.details,t.className)})}},9329:(e,t,n)=>{n.d(t,{A:()=>l});n(6540);var r=n(4164);const a={tabItem:"tabItem_Ymn6"};var s=n(4848);function l(e){let{children:t,hidden:n,className:l}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,l),hidden:n,children:t})}},5537:(e,t,n)=>{n.d(t,{A:()=>w});var r=n(6540),a=n(4164),s=n(5627),l=n(6347),o=n(372),i=n(604),c=n(1861),u=n(8749);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,l.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,i.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(a.location.search);t.set(s,e),a.replace({...a.location,search:t.toString()})}),[s,a])]}function m(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,s=p(e),[l,i]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[c,d]=f({queryString:n,groupId:a}),[m,b]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,s]=(0,u.Dv)(n);return[a,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:a}),x=(()=>{const e=c??m;return h({value:e,tabValues:s})?e:null})();(0,o.A)((()=>{x&&i(x)}),[x]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),b(e)}),[d,b,s]),tabValues:s}}var b=n(9136);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=n(4848);function v(e){let{className:t,block:n,selectedValue:r,selectValue:l,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.a_)(),u=e=>{const t=e.currentTarget,n=i.indexOf(t),a=o[n].value;a!==r&&(c(t),l(a))},d=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;t=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;t=i[n]??i[i.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":n},t),children:o.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>{i.push(e)},onKeyDown:d,onClick:u,...s,className:(0,a.A)("tabs__item",x.tabItem,s?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function j(e){let{lazy:t,children:n,selectedValue:s}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=l.find((e=>e.props.value===s));return e?(0,r.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:l.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function k(e){const t=m(e);return(0,g.jsxs)("div",{className:(0,a.A)("tabs-container",x.tabList),children:[(0,g.jsx)(v,{...t,...e}),(0,g.jsx)(j,{...t,...e})]})}function w(e){const t=(0,b.A)();return(0,g.jsx)(k,{...e,children:d(e.children)},String(t))}},5397:(e,t,n)=>{n.d(t,{T:()=>s});var r=n(6701),a=n(4848);const s=e=>{let{children:t,open:n,title:s}=e;return(0,a.jsx)(r.A,{open:n,className:"faq",summary:(0,a.jsx)("summary",{children:(0,a.jsx)("strong",{children:s})}),children:(0,a.jsx)("section",{children:t})})}},6090:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/each-fail-87e8df43af61144ac0deb85924b13b0c.png"},8637:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/each-success-4a5464737509b17e87d12988ff841b15.png"},8453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>o});var r=n(6540);const a={},s=r.createContext(a);function l(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);