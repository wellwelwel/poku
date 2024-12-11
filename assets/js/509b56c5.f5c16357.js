"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7520],{8367:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>i,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"examples/cases/complexity-no-exit","title":"A Complex Case","description":"Imagine these steps to perform a test:","source":"@site/docs/examples/cases/complexity-no-exit.mdx","sourceDirName":"examples/cases","slug":"/examples/cases/complexity-no-exit","permalink":"/docs/examples/cases/complexity-no-exit","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/examples/cases/complexity-no-exit.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docs","previous":{"title":"Use Cases","permalink":"/docs/category/use-cases"},"next":{"title":"CJS and ESM","permalink":"/docs/examples/cjs-esm"}}');var r=n(4848),o=n(8453);const i={},c="A Complex Case",a={},l=[{value:"Poku&#39;s Solution \u2728",id:"pokus-solution-",level:3}];function u(e){const s={blockquote:"blockquote",code:"code",h1:"h1",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"a-complex-case",children:"A Complex Case"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Imagine these steps to perform a test:"})}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsxs)(s.li,{children:["Perform ",(0,r.jsx)(s.strong,{children:"Unit Tests"})," suite in parallel"]}),"\n",(0,r.jsx)(s.li,{children:"Clear and Populate the Database"}),"\n",(0,r.jsxs)(s.li,{children:["Check for ",(0,r.jsx)(s.strong,{children:"Expected Successes Integration"})," suite sequentially"]}),"\n",(0,r.jsx)(s.li,{children:"Clear and Populate the Database \u2014 again"}),"\n",(0,r.jsxs)(s.li,{children:["Check for ",(0,r.jsx)(s.strong,{children:"Expected Failures Integration"})," suite sequentially"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Requirements:"})}),"\n",(0,r.jsx)(s.p,{children:"Each step requires success to be processed."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Directory Structure:"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"\u251c\u2500\u2500 .\n\u251c\u2500\u2500 test\n\u2502 \u251c\u2500\u2500 unit\n\u2502 \u251c\u2500\u2500 integration\n\u2502 \u2502 \u251c\u2500\u2500 successes\n\u2502 \u2502 \u2502 \u2514\u2500\u2500 **/.spec.js\n\u2502 \u2502 \u2514\u2500\u2500 failures\n\u2502 \u2502   \u2514\u2500\u2500 **/.spec.js\n\u2502 \u251c\u2500 run.test.js # The runner\n\u2502 \u251c\u2500 tools.test.js\n"})}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsx)(s.p,{children:"Do we really need to complicate things even more by creating advanced tests runs to run our already complex tests? \ud83d\ude05"}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"pokus-solution-",children:"Poku's Solution \u2728"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"import { poku, assert } from 'poku';\nimport { recreateDatabase } from './tools.test.js';\n\nconst unitCode = await poku('test/unit', {\n  noExit: true,\n});\n\nassert.strictEqual(0, unitCode, 'Running Unit Tests');\n\nawait assert.doesNotReject(\n  recreateDatabase(),\n  'Preparing DB for Successes Integration Tests'\n);\n\nconst successesCode = await poku('test/integration/successes', {\n  noExit: true,\n});\n\nassert.strictEqual(0, successesCode, 'Running Successes Integration Tests');\n\nawait assert.doesNotReject(\n  recreateDatabase(),\n  'Preparing DB for Successes Integration Tests'\n);\n\nconst failuresCode = await poku('test/integration/failures', {\n  noExit: true,\n});\n\nassert.strictEqual(0, failuresCode, 'Running Failures Integration Tests');\n"})}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsx)(s.p,{children:"Why comment the code if we can do it better? \ud83e\uddd9\ud83c\udffb"}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Finally"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"npx poku test/run.test.js\n"})}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsxs)(s.p,{children:["Or ",(0,r.jsx)(s.code,{children:"npx poku test/run.test.ts"})," for ",(0,r.jsx)(s.strong,{children:"TypeScript"}),"."]}),"\n"]})]})}function d(e={}){const{wrapper:s}={...(0,o.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>i,x:()=>c});var t=n(6540);const r={},o=t.createContext(r);function i(e){const s=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(o.Provider,{value:s},e.children)}}}]);