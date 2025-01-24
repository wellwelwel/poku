"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6475],{2188:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>u});const s=JSON.parse('{"id":"documentation/poku/options/reporter","title":"reporter","description":"Specify the reporter for test execution.","source":"@site/docs/documentation/poku/options/reporter.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/reporter","permalink":"/pt-BR/docs/documentation/poku/options/reporter","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/options/reporter.mdx","tags":[{"inline":true,"label":"reporter","permalink":"/pt-BR/docs/tags/reporter"},{"inline":true,"label":"reporters","permalink":"/pt-BR/docs/tags/reporters"},{"inline":true,"label":"dot","permalink":"/pt-BR/docs/tags/dot"},{"inline":true,"label":"tap","permalink":"/pt-BR/docs/tags/tap"}],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"tags":["reporter","reporters","dot","tap"]},"sidebar":"docs","previous":{"title":"\ud83e\udde9 Options","permalink":"/pt-BR/docs/category/-options"},"next":{"title":"sequential","permalink":"/pt-BR/docs/documentation/poku/options/sequential"}}');var t=r(4848),o=r(8453),l=r(5537),a=r(9329);const i={sidebar_position:1,tags:["reporter","reporters","dot","tap"]},c="reporter",d={},u=[{value:"Reporters",id:"reporters",level:2},{value:"<code>poku</code> <em>(default)</em>",id:"poku-default",level:3},{value:"<code>dot</code> (inspired by Mocha)",id:"dot-inspired-by-mocha",level:3},{value:"<code>compact</code> (partially inspired by modern Tap)",id:"compact-partially-inspired-by-modern-tap",level:3},{value:"<code>focus</code>",id:"focus",level:3},{value:"<code>verbose</code>",id:"verbose",level:3},{value:"<code>classic</code>",id:"classic",level:3},{value:"Usage",id:"usage",level:2},{value:"CLI",id:"cli",level:3},{value:"Config File",id:"config-file",level:3},{value:"API",id:"api",level:3}];function p(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"reporter",children:(0,t.jsx)(n.code,{children:"reporter"})})}),"\n",(0,t.jsx)(n.p,{children:"Specify the reporter for test execution."}),"\n",(0,t.jsx)(n.h2,{id:"reporters",children:"Reporters"}),"\n",(0,t.jsxs)(n.h3,{id:"poku-default",children:[(0,t.jsx)(n.code,{children:"poku"})," ",(0,t.jsx)(n.em,{children:"(default)"})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Logs all ",(0,t.jsx)(n.code,{children:"describe"}),", ",(0,t.jsx)(n.code,{children:"it"}),", ",(0,t.jsx)(n.code,{children:"test"})," and ",(0,t.jsx)(n.code,{children:"assert"})," titles and messages, including their modifiers."]}),"\n",(0,t.jsx)(n.li,{children:"Logs only the file name for errors during the execution, then lists all logs for each failed file at the running end."}),"\n"]}),"\n",(0,t.jsxs)(n.h3,{id:"dot-inspired-by-mocha",children:[(0,t.jsx)(n.code,{children:"dot"})," (inspired by ",(0,t.jsx)(n.a,{href:"https://github.com/mochajs/mocha",children:"Mocha"}),")"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Logs a dot for each success file test and ",(0,t.jsx)(n.code,{children:"F"})," for each failed file."]}),"\n",(0,t.jsx)(n.li,{children:"Lists all logs for each failed file at the running end."}),"\n"]}),"\n",(0,t.jsxs)(n.h3,{id:"compact-partially-inspired-by-modern-tap",children:[(0,t.jsx)(n.code,{children:"compact"})," (partially inspired by modern ",(0,t.jsx)(n.a,{href:"https://github.com/tapjs/tapjs",children:"Tap"}),")"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Lists only file paths with ",(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"PASS"})})," or ",(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"FAIL"})})," and, in case of failures, lists all logs for each failed file at the running end."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"focus",children:(0,t.jsx)(n.code,{children:"focus"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Logs only errors (in real time). If there is no error, it just logs a small footnote resume."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"verbose",children:(0,t.jsx)(n.code,{children:"verbose"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Just like the default (",(0,t.jsx)(n.code,{children:"poku"}),"), but logs errors both in real time and also at the running end."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"classic",children:(0,t.jsx)(n.code,{children:"classic"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The standard report style from ",(0,t.jsx)(n.strong,{children:"version 2"})," to preserve our history \ud83d\udc37"]}),"\n"]}),"\n",(0,t.jsx)("hr",{}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.h3,{id:"cli",children:"CLI"}),"\n",(0,t.jsxs)(l.A,{groupId:"reporters",children:[(0,t.jsx)(a.A,{default:!0,value:"poku",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx poku --reporter=poku # default\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"dot",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx poku --reporter=dot\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"compact",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx poku --reporter=compact\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"focus",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx poku --reporter=focus\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"verbose",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx poku --reporter=verbose\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"classic",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npx poku --reporter=classic\n"})})})]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Short flag: ",(0,t.jsx)(n.code,{children:"-r"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"config-file",children:"Config File"}),"\n",(0,t.jsxs)(l.A,{groupId:"reporters",children:[(0,t.jsxs)(a.A,{default:!0,value:"poku",children:[(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'{\n  // "$schema": "https://poku.io/schemas/configs.json",\n  "reporter": "poku" // default\n}\n'})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const { defineConfig } = require('poku');\n\nmodule.exports = defineConfig({\n  reporter: 'poku', // default\n});\n"})})]}),(0,t.jsxs)(a.A,{default:!0,value:"dot",children:[(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'{\n  // "$schema": "https://poku.io/schemas/configs.json",\n  "reporter": "dot"\n}\n'})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const { defineConfig } = require('poku');\n\nmodule.exports = defineConfig({\n  reporter: 'dot',\n});\n"})})]}),(0,t.jsxs)(a.A,{default:!0,value:"compact",children:[(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'{\n  // "$schema": "https://poku.io/schemas/configs.json",\n  "reporter": "compact"\n}\n'})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const { defineConfig } = require('poku');\n\nmodule.exports = defineConfig({\n  reporter: 'compact',\n});\n"})})]}),(0,t.jsxs)(a.A,{default:!0,value:"focus",children:[(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'{\n  // "$schema": "https://poku.io/schemas/configs.json",\n  "reporter": "focus"\n}\n'})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const { defineConfig } = require('poku');\n\nmodule.exports = defineConfig({\n  reporter: 'focus',\n});\n"})})]}),(0,t.jsxs)(a.A,{default:!0,value:"verbose",children:[(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'{\n  // "$schema": "https://poku.io/schemas/configs.json",\n  "reporter": "verbose"\n}\n'})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const { defineConfig } = require('poku');\n\nmodule.exports = defineConfig({\n  reporter: 'verbose',\n});\n"})})]}),(0,t.jsxs)(a.A,{default:!0,value:"classic",children:[(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'{\n  // "$schema": "https://poku.io/schemas/configs.json",\n  "reporter": "classic"\n}\n'})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const { defineConfig } = require('poku');\n\nmodule.exports = defineConfig({\n  reporter: 'classic',\n});\n"})})]})]}),"\n",(0,t.jsx)(n.h3,{id:"api",children:"API"}),"\n",(0,t.jsxs)(l.A,{groupId:"reporters",children:[(0,t.jsx)(a.A,{default:!0,value:"poku",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"await poku('./test', {\n  reporter: 'poku', // default\n});\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"dot",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"await poku('./test', {\n  reporter: 'dot',\n});\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"compact",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"await poku('./test', {\n  reporter: 'compact',\n});\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"focus",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"await poku('./test', {\n  reporter: 'focus',\n});\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"verbose",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"await poku('./test', {\n  reporter: 'verbose',\n});\n"})})}),(0,t.jsx)(a.A,{default:!0,value:"classic",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"await poku('./test', {\n  reporter: 'classic',\n});\n"})})})]}),"\n",(0,t.jsx)("hr",{}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["To debug, see ",(0,t.jsx)(n.a,{href:"/docs/documentation/poku/options/debug",children:(0,t.jsx)(n.code,{children:"debug"})})," option."]}),"\n",(0,t.jsxs)(n.li,{children:["To quiet the output, see ",(0,t.jsx)(n.a,{href:"/docs/documentation/poku/options/quiet",children:(0,t.jsx)(n.code,{children:"quiet"})})," option."]}),"\n",(0,t.jsxs)(n.li,{children:["Both the ",(0,t.jsx)(n.code,{children:"--debug"})," and ",(0,t.jsx)(n.code,{children:"--quiet"})," options work with all reporters."]}),"\n"]})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},9329:(e,n,r)=>{r.d(n,{A:()=>l});r(6540);var s=r(4164);const t={tabItem:"tabItem_Ymn6"};var o=r(4848);function l(e){let{children:n,hidden:r,className:l}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,s.A)(t.tabItem,l),hidden:r,children:n})}},5537:(e,n,r)=>{r.d(n,{A:()=>y});var s=r(6540),t=r(4164),o=r(5627),l=r(6347),a=r(372),i=r(604),c=r(1861),d=r(8749);function u(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:r}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:r,attributes:s,default:t}}=e;return{value:n,label:r,attributes:s,default:t}}))}(r);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function h(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function f(e){let{queryString:n=!1,groupId:r}=e;const t=(0,l.W6)(),o=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,i.aZ)(o),(0,s.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(t.location.search);n.set(o,e),t.replace({...t.location,search:n.toString()})}),[o,t])]}function x(e){const{defaultValue:n,queryString:r=!1,groupId:t}=e,o=p(e),[l,i]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=r.find((e=>e.default))??r[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:o}))),[c,u]=f({queryString:r,groupId:t}),[x,j]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[t,o]=(0,d.Dv)(r);return[t,(0,s.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:t}),m=(()=>{const e=c??x;return h({value:e,tabValues:o})?e:null})();(0,a.A)((()=>{m&&i(m)}),[m]);return{selectedValue:l,selectValue:(0,s.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),j(e)}),[u,j,o]),tabValues:o}}var j=r(9136);const m={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=r(4848);function b(e){let{className:n,block:r,selectedValue:s,selectValue:l,tabValues:a}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.a_)(),d=e=>{const n=e.currentTarget,r=i.indexOf(n),t=a[r].value;t!==s&&(c(n),l(t))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const r=i.indexOf(e.currentTarget)+1;n=i[r]??i[0];break}case"ArrowLeft":{const r=i.indexOf(e.currentTarget)-1;n=i[r]??i[i.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,t.A)("tabs",{"tabs--block":r},n),children:a.map((e=>{let{value:n,label:r,attributes:o}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>{i.push(e)},onKeyDown:u,onClick:d,...o,className:(0,t.A)("tabs__item",m.tabItem,o?.className,{"tabs__item--active":s===n}),children:r??n},n)}))})}function v(e){let{lazy:n,children:r,selectedValue:o}=e;const l=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===o));return e?(0,s.cloneElement)(e,{className:(0,t.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==o})))})}function k(e){const n=x(e);return(0,g.jsxs)("div",{className:(0,t.A)("tabs-container",m.tabList),children:[(0,g.jsx)(b,{...n,...e}),(0,g.jsx)(v,{...n,...e})]})}function y(e){const n=(0,j.A)();return(0,g.jsx)(k,{...e,children:u(e.children)},String(n))}},8453:(e,n,r)=>{r.d(n,{R:()=>l,x:()=>a});var s=r(6540);const t={},o=s.createContext(t);function l(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);