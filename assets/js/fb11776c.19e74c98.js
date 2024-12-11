"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5382],{6489:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>p,frontMatter:()=>l,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"documentation/poku/options/filter","title":"filter","description":"Filter by path using Regex to match only the files that should be performed.","source":"@site/versioned_docs/version-2.x.x/documentation/poku/options/filter.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/filter","permalink":"/docs/2.x.x/documentation/poku/options/filter","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/poku/options/filter.mdx","tags":[{"inline":true,"label":"grep","permalink":"/docs/2.x.x/tags/grep"}],"version":"2.x.x","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"tags":["grep"]},"sidebar":"docs","previous":{"title":"parallel","permalink":"/docs/2.x.x/documentation/poku/options/parallel"},"next":{"title":"platform","permalink":"/docs/2.x.x/documentation/poku/options/platform"}}');var i=t(4848),o=t(8453);const l={sidebar_position:2,tags:["grep"]},r="filter",a={},c=[{value:"CLI",id:"cli",level:2},{value:"Environment Variable",id:"environment-variable",level:3},{value:"API",id:"api",level:2}];function d(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"filter",children:(0,i.jsx)(n.code,{children:"filter"})})}),"\n",(0,i.jsxs)(n.p,{children:["Filter by path using ",(0,i.jsx)(n.strong,{children:"Regex"})," to match only the files that should be performed. ",(0,i.jsx)("br",{}),"\nBy default, ",(0,i.jsx)(n.strong,{children:"Poku"})," searches for ",(0,i.jsx)(n.em,{children:(0,i.jsx)(n.code,{children:".test."})})," and ",(0,i.jsx)(n.code,{children:".spec."})," files, but you can customize it using the ",(0,i.jsx)(n.code,{children:"filter"})," option."]}),"\n",(0,i.jsx)(n.h2,{id:"cli",children:"CLI"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Default\n\nnpx poku --filter='.test.|.spec.' ./test\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Testing only a specific file\n\nnpx poku --filter='some-file' ./test\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Testing only specific files\n\nnpx poku --filter='some-file|other-file' ./test\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Testing only paths that contains \"unit\"\n\nnpx poku --filter='unit' ./test\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Testing only paths that contains \"unit\" by using Poku as a NPM script\n\nnpm run tests -- --filter='unit'\n"})}),"\n",(0,i.jsx)(n.h3,{id:"environment-variable",children:"Environment Variable"}),"\n",(0,i.jsxs)(n.p,{children:["By using ",(0,i.jsx)(n.code,{children:"FILTER"})," from ",(0,i.jsx)(n.strong,{children:"Environment Variable"}),", it will overwrite the ",(0,i.jsx)(n.code,{children:"filter"})," option."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Testing only a specific file\n\nFILTER='some-file' npx poku ./test\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Testing only specific files\n\nFILTER='some-file|other-file' npx poku ./test\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Testing only paths that contains \"unit\"\n\nFILTER='unit' npx poku ./test\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# Testing only paths that contains \"unit\" by using Poku as a NPM script\n\nFILTER='unit' npm run tests\n"})}),"\n",(0,i.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"/**\n * @default\n *\n * Testing all `*.test.*` files.\n */\n\nawait poku('./test', {\n  filter: /\\.test\\./,\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"/**\n * Testing all `ts`, `js`, `mts` and `mjs` files\n */\n\nawait poku('./test', {\n  filter: /\\.(m)?(j|t)s$/,\n  // filter: /\\.(js|ts|mjs|mts)$/,\n});\n"})})]})}function p(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>r});var s=t(6540);const i={},o=s.createContext(i);function l(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);