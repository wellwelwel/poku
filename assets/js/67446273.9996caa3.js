"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4220],{3287:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>d,metadata:()=>o,toc:()=>t});const o=JSON.parse('{"id":"documentation/poku/options/deno","title":"deno","description":"Exclusive options for Deno platform.","source":"@site/docs/documentation/poku/options/deno.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/deno","permalink":"/docs/next/documentation/poku/options/deno","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/options/deno.mdx","tags":[],"version":"current","sidebarPosition":98,"frontMatter":{"sidebar_position":98},"sidebar":"docs","previous":{"title":"enforce","permalink":"/docs/next/documentation/poku/options/enforce"},"next":{"title":"noExit","permalink":"/docs/next/documentation/poku/options/no-exit"}}');var l=s(4848),i=s(8453);const d={sidebar_position:98},r="deno",c={},t=[{value:"<code>allow</code>",id:"allow",level:2},{value:"CLI",id:"cli",level:3},{value:"API",id:"api",level:3},{value:"<code>deny</code>",id:"deny",level:2},{value:"CLI",id:"cli-1",level:3},{value:"API",id:"api-1",level:3},{value:"<code>cjs</code>",id:"cjs",level:2},{value:"CLI",id:"cli-2",level:3},{value:"API",id:"api-2",level:3}];function a(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"deno",children:(0,l.jsx)(n.code,{children:"deno"})})}),"\n",(0,l.jsxs)(n.p,{children:["Exclusive options for ",(0,l.jsx)(n.strong,{children:"Deno"})," platform."]}),"\n",(0,l.jsx)(n.h2,{id:"allow",children:(0,l.jsx)(n.code,{children:"allow"})}),"\n",(0,l.jsxs)(n.p,{children:["Change permissions for ",(0,l.jsx)(n.strong,{children:"Deno"}),"."]}),"\n",(0,l.jsxs)(n.p,{children:["By default ",(0,l.jsx)(n.strong,{children:"Poku"})," uses ",(0,l.jsx)(n.code,{children:"--allow-run"}),", ",(0,l.jsx)(n.code,{children:"--allow-env"}),", ",(0,l.jsx)(n.code,{children:"--allow-read"})," and ",(0,l.jsx)(n.code,{children:"--allow-net"}),"."]}),"\n",(0,l.jsx)(n.h3,{id:"cli",children:"CLI"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku --denoAllow='read, run'\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku --denoAllow='read=file.js, run'\n"})}),"\n",(0,l.jsx)(n.p,{children:"Clear all permissions:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku --denoAllow=''\n"})}),"\n",(0,l.jsx)(n.h3,{id:"api",children:"API"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"poku('./test', {\n  deno: {\n    allow: ['read', 'run' /* ... */],\n  },\n});\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"poku('./test', {\n  deno: {\n    allow: ['read=file.js', 'run' /* ... */],\n  },\n});\n"})}),"\n",(0,l.jsx)(n.p,{children:"Clear all permissions:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"poku('./test', {\n  deno: {\n    allow: [],\n  },\n});\n"})}),"\n",(0,l.jsx)("hr",{}),"\n",(0,l.jsx)(n.h2,{id:"deny",children:(0,l.jsx)(n.code,{children:"deny"})}),"\n",(0,l.jsxs)(n.p,{children:["Change permissions for ",(0,l.jsx)(n.strong,{children:"Deno"}),"."]}),"\n",(0,l.jsx)(n.h3,{id:"cli-1",children:"CLI"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku --denoDeny='write, sys'\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku --denoDeny='env=HOME, write'\n"})}),"\n",(0,l.jsx)(n.h3,{id:"api-1",children:"API"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"poku('./test', {\n  deno: {\n    deny: ['write', 'sys' /* ... */],\n  },\n});\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"poku('./test', {\n  deno: {\n    deny: ['env=HOME', 'write' /* ... */],\n  },\n});\n"})}),"\n",(0,l.jsx)("hr",{}),"\n",(0,l.jsx)(n.h2,{id:"cjs",children:(0,l.jsx)(n.code,{children:"cjs"})}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.code,{children:"poku(targetPaths: string | string[], configs?: Configs)"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.code,{children:"cjs: boolean | string[]"})}),"\n"]}),"\n",(0,l.jsxs)(n.admonition,{title:"Important",type:"danger",children:[(0,l.jsxs)(n.p,{children:["From ",(0,l.jsx)(n.strong,{children:"Deno"})," ",(0,l.jsx)(n.code,{children:"v2"}),", simply set the type to ",(0,l.jsx)(n.code,{children:"commonjs"})," in your ",(0,l.jsx)(n.strong,{children:"package.json"})," or use the ",(0,l.jsx)(n.code,{children:".cjs"})," extension."]}),(0,l.jsxs)(n.p,{children:["For ",(0,l.jsx)(n.strong,{children:"Deno"})," ",(0,l.jsx)(n.code,{children:"v1"}),", you can follow the instructions bellow."]})]}),"\n",(0,l.jsxs)(n.p,{children:["Now, it's possible to run tests that use ",(0,l.jsx)(n.code,{children:"require"}),", ",(0,l.jsx)(n.code,{children:"module.exports"})," and ",(0,l.jsx)(n.code,{children:"module"})," directly with ",(0,l.jsx)(n.strong,{children:"Deno"})," \ud83c\udf89"]}),"\n",(0,l.jsxs)(n.p,{children:["It's a great feature to test if a project created primarily in ",(0,l.jsx)(n.strong,{children:"Node.js"})," or ",(0,l.jsx)(n.strong,{children:"Bun"})," is also compatible with ",(0,l.jsx)(n.strong,{children:"Deno"})," without the need to transpile the code or use workarounds."]}),"\n",(0,l.jsxs)(n.p,{children:["To run ",(0,l.jsx)(n.strong,{children:"CommonJS"})," with ",(0,l.jsx)(n.strong,{children:"Deno"}),", you can use:"]}),"\n",(0,l.jsx)(n.h3,{id:"cli-2",children:"CLI"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku --denoCjs\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku --denoCjs='.js,.cjs'\n"})}),"\n",(0,l.jsx)(n.h3,{id:"api-2",children:"API"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"await poku('./test', {\n  deno: {\n    cjs: true,\n  },\n});\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"await poku('./test', {\n  deno: {\n    cjs: ['.js', '.cjs' /* ... */],\n  },\n});\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>r});var o=s(6540);const l={},i=o.createContext(l);function d(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:d(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);