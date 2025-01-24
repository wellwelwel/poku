"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5571],{8365:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>x,frontMatter:()=>c,metadata:()=>t,toc:()=>h});const t=JSON.parse('{"id":"comparing","title":"Comparing Test Runners","description":"| Test Runner           | Isolation | CJS          | ESM            | node_modules                                     | Bun | Deno |","source":"@site/versioned_docs/version-2.x.x/comparing.mdx","sourceDirName":".","slug":"/comparing","permalink":"/docs/2.x.x/comparing","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/comparing.mdx","tags":[{"inline":true,"label":"Jest","permalink":"/docs/2.x.x/tags/jest"},{"inline":true,"label":"Mocha","permalink":"/docs/2.x.x/tags/mocha"},{"inline":true,"label":"Chai","permalink":"/docs/2.x.x/tags/chai"},{"inline":true,"label":"Vitest","permalink":"/docs/2.x.x/tags/vitest"},{"inline":true,"label":"AVA","permalink":"/docs/2.x.x/tags/ava"},{"inline":true,"label":"TypeScript","permalink":"/docs/2.x.x/tags/type-script"}],"version":"2.x.x","frontMatter":{"tags":["Jest","Mocha","Chai","Vitest","AVA","TypeScript"]},"sidebar":"docs","previous":{"title":"Philosophy","permalink":"/docs/2.x.x/philosophy"},"next":{"title":"Documentation","permalink":"/docs/2.x.x/category/documentation"}}');var i=s(4848),r=s(8453),l=s(5537),a=s(9329);const c={tags:["Jest","Mocha","Chai","Vitest","AVA","TypeScript"]},d="Comparing Test Runners",o={},h=[{value:"Quick Comparisons",id:"quick-comparisons",level:2},{value:"Performance",id:"performance",level:3},{value:"Installation Size",id:"installation-size",level:3},{value:"TypeScript Comparison",id:"typescript-comparison",level:2},{value:"Poku",id:"poku",level:2},{value:"Installation",id:"installation",level:3},{value:"Creating the test file",id:"creating-the-test-file",level:3},{value:"Running tests",id:"running-tests",level:3},{value:"Jest",id:"jest",level:2},{value:"Installation",id:"installation-1",level:3},{value:"Configuring TypeScript",id:"configuring-typescript",level:3},{value:"Configuring Jest",id:"configuring-jest",level:3},{value:"Creating the test file",id:"creating-the-test-file-1",level:3},{value:"Running tests",id:"running-tests-1",level:3},{value:"Mocha + Chai",id:"mocha--chai",level:2},{value:"Installation",id:"installation-2",level:3},{value:"Configuring ts-node",id:"configuring-ts-node",level:3},{value:"Configuring Mocha",id:"configuring-mocha",level:3},{value:"Creating the test file",id:"creating-the-test-file-2",level:3},{value:"Running tests",id:"running-tests-2",level:3},{value:"Vitest",id:"vitest",level:2},{value:"Installation",id:"installation-3",level:3},{value:"Configuring Vitest",id:"configuring-vitest",level:3},{value:"Creating the test file",id:"creating-the-test-file-3",level:3},{value:"Running tests",id:"running-tests-3",level:3},{value:"AVA",id:"ava",level:2},{value:"Installation",id:"installation-4",level:3},{value:"Configuring Git",id:"configuring-git",level:3},{value:"Configuring AVA",id:"configuring-ava",level:3},{value:"Creating the test file",id:"creating-the-test-file-4",level:3},{value:"Running tests",id:"running-tests-4",level:3}];function u(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"comparing-test-runners",children:"Comparing Test Runners"})}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"Test Runner"}),(0,i.jsx)(n.th,{children:"Isolation"}),(0,i.jsx)(n.th,{children:"CJS"}),(0,i.jsx)(n.th,{children:"ESM"}),(0,i.jsx)(n.th,{children:"node_modules"}),(0,i.jsx)(n.th,{children:"Bun"}),(0,i.jsx)(n.th,{children:"Deno"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsxs)(n.td,{children:["\ud83d\udc37 ",(0,i.jsx)(n.strong,{children:"Poku"})," ",(0,i.jsx)(n.em,{children:"(2.0.0)"})]}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.img,{src:"https://pkg-size.dev/badge/install/152997",alt:""})}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:"\u2705"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsxs)(n.td,{children:[(0,i.jsx)(n.strong,{children:"Jest"})," ",(0,i.jsx)(n.em,{children:"(29.7.0)"})]}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.em,{children:"experimental"})}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.img,{src:"https://pkg-size.dev/badge/install/21981180",alt:""})}),(0,i.jsx)(n.td,{children:"\u2753"}),(0,i.jsx)(n.td,{children:"\u2753"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsxs)(n.td,{children:[(0,i.jsx)(n.strong,{children:"Mocha"})," ",(0,i.jsx)(n.em,{children:"(10.4.0)"})]}),(0,i.jsx)(n.td,{children:"\u274c"}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.img,{src:"https://pkg-size.dev/badge/install/5548077",alt:""})}),(0,i.jsx)(n.td,{children:"\u2753"}),(0,i.jsx)(n.td,{children:"\u2753"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsxs)(n.td,{children:[(0,i.jsx)(n.strong,{children:"Vitest"})," ",(0,i.jsx)(n.em,{children:"(1.6.0)"})]}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.em,{children:"deprecated"})}),(0,i.jsx)(n.td,{children:"\u2705"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.img,{src:"https://pkg-size.dev/badge/install/38365477",alt:""})}),(0,i.jsx)(n.td,{children:"\u2753"}),(0,i.jsx)(n.td,{children:"\u2753"})]})]})]}),"\n",(0,i.jsx)("hr",{}),"\n",(0,i.jsx)(n.h2,{id:"quick-comparisons",children:"Quick Comparisons"}),"\n",(0,i.jsx)(n.h3,{id:"performance",children:"Performance"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Poku"})," is ",(0,i.jsx)(n.a,{href:"https://github.com/wellwelwel/poku/blob/main/.github/workflows/ci_benchmark.yml",children:"continuously tested"})," to ensure the following expectations for basic usage:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["~",(0,i.jsx)(n.strong,{children:"4x"})," faster than ",(0,i.jsx)(n.a,{href:"https://github.com/jestjs/jest",children:(0,i.jsx)(n.strong,{children:"Jest"})})," (v29.7.0)"]}),"\n",(0,i.jsxs)(n.li,{children:["~",(0,i.jsx)(n.strong,{children:"4x"})," faster than ",(0,i.jsx)(n.a,{href:"https://github.com/vitest-dev/vitest",children:(0,i.jsx)(n.strong,{children:"Vitest"})})," (v2.1.3)"]}),"\n",(0,i.jsxs)(n.li,{children:["~",(0,i.jsx)(n.strong,{children:"2x"})," faster than ",(0,i.jsx)(n.a,{href:"https://github.com/mochajs/mocha",children:(0,i.jsx)(n.strong,{children:"Mocha"})})," (v10.7.3) \u2014 ",(0,i.jsx)(n.em,{children:"even with test file isolation"})]}),"\n"]}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["You can see how the tests are run and compared in the ",(0,i.jsx)(n.a,{href:"https://github.com/wellwelwel/poku/tree/main/benchmark",children:"benchmark"})," directory."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsxs)(n.a,{href:"https://github.com/wellwelwel/poku/discussions/740",children:["Comparing ",(0,i.jsx)(n.strong,{children:"Poku"})," and native test runners ",(0,i.jsx)(n.em,{children:"(discussion)"})]}),"."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("hr",{}),"\n",(0,i.jsx)(n.h3,{id:"installation-size",children:"Installation Size"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://pkg-size.dev/poku",children:(0,i.jsx)(n.img,{src:"https://packagephobia.com/badge?p=poku",alt:"Install Size"})})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsxs)(n.a,{href:"https://pkg-size.dev/vitest",children:["~",(0,i.jsx)(n.strong,{children:"230x"})," lighter than ",(0,i.jsx)(n.strong,{children:"Vitest"})]})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsxs)(n.a,{href:"https://pkg-size.dev/jest",children:["~",(0,i.jsx)(n.strong,{children:"130x"})," lighter than ",(0,i.jsx)(n.strong,{children:"Jest"})]})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsxs)(n.a,{href:"https://pkg-size.dev/mocha%20chai",children:["~",(0,i.jsx)(n.strong,{children:"30x"})," lighter than ",(0,i.jsx)(n.strong,{children:"Mocha"})," + ",(0,i.jsx)(n.strong,{children:"Chai"})]})}),"\n"]}),"\n",(0,i.jsx)("hr",{}),"\n",(0,i.jsx)(n.h2,{id:"typescript-comparison",children:"TypeScript Comparison"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.strong,{children:["Comparison using ",(0,i.jsx)(n.strong,{children:"TypeScript"})," (",(0,i.jsx)(n.em,{children:"no compile"}),") and ",(0,i.jsx)(n.strong,{children:"ESM"})," to show a simple error test:"]})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Let's starting from installation \ud83d\udd2c"}),"\n"]}),"\n",(0,i.jsxs)(l.A,{children:[(0,i.jsxs)(a.A,{default:!0,value:"Poku",children:[(0,i.jsx)(n.h2,{id:"poku",children:(0,i.jsx)(n.a,{href:"https://github.com/wellwelwel/poku",children:"Poku"})}),(0,i.jsx)(n.h3,{id:"installation",children:"Installation"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm i -D poku tsx\n"})}),(0,i.jsx)("a",{href:"https://pkg-size.dev/poku tsx",children:(0,i.jsx)("img",{src:"https://pkg-size.dev/badge/install/22162793",title:"Install size for tsx, and poku"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"creating-the-test-file",children:"Creating the test file"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"test/index.test.ts"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { assert } from 'poku';\n\nassert.deepStrictEqual('1', 1, 'Number should not be a text');\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"running-tests",children:"Running tests"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.p,{children:"That's it \ud83c\udf89"}),(0,i.jsxs)(n.admonition,{type:"tip",children:[(0,i.jsxs)(n.p,{children:["For simple tests, ",(0,i.jsx)(n.strong,{children:"Poku"})," doesn't need to use ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"test"})}),", ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"describe"})})," or ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"it"})}),", since the message is already in the ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"assert"})}),"."]}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Poku"}),"'s ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"assert"})})," is just an abstraction from original ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"assert"})})," from ",(0,i.jsx)(n.strong,{children:"Node.js"}),". ",(0,i.jsx)("br",{})]}),"\n",(0,i.jsxs)(n.li,{children:["It means: ",(0,i.jsx)("ins",{children:(0,i.jsx)(n.strong,{children:"No new learning is needed"})})," \ud83c\udf89"]}),"\n"]})]}),(0,i.jsx)(n.p,{children:"Adopt a Poku for yourself \ud83e\ude75"})]}),(0,i.jsxs)(a.A,{value:"Jest",children:[(0,i.jsx)(n.h2,{id:"jest",children:(0,i.jsx)(n.a,{href:"https://github.com/jestjs/jest",children:"Jest"})}),(0,i.jsx)(n.h3,{id:"installation-1",children:"Installation"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm i -D jest @types/jest ts-jest\n"})}),(0,i.jsx)("a",{href:"https://pkg-size.dev/jest @types/jest ts-jest",children:(0,i.jsx)("img",{src:"https://pkg-size.dev/badge/install/56409485",title:"Install size for ts-jest, @types/jest, and jest"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"configuring-typescript",children:"Configuring TypeScript"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["Add in your ",(0,i.jsx)(n.em,{children:"tsconfig.json"})]}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "compilerOptions": {\n    "esModuleInterop": true\n  }\n}\n'})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"configuring-jest",children:"Configuring Jest"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"jest.config.js"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"export default {\n  preset: 'ts-jest',\n  testEnvironment: 'node',\n  testMatch: ['**/test/**/*.test.ts'],\n};\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"creating-the-test-file-1",children:"Creating the test file"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"test/index.test.ts"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"describe('Type comparison', () => {\n  test('Number should not be a text', () => {\n    expect('1').toStrictEqual(1);\n  });\n});\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"running-tests-1",children:"Running tests"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx jest\n"})})]}),(0,i.jsxs)(a.A,{value:"Mocha + Chai",children:[(0,i.jsxs)(n.h2,{id:"mocha--chai",children:[(0,i.jsx)(n.a,{href:"https://github.com/mochajs/mocha",children:"Mocha"})," + ",(0,i.jsx)(n.a,{href:"https://github.com/chaijs/chai",children:"Chai"})]}),(0,i.jsx)(n.h3,{id:"installation-2",children:"Installation"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm i -D mocha @types/mocha chai @types/chai ts-node\n"})}),(0,i.jsx)("a",{href:"https://pkg-size.dev/mocha @types/mocha chai @types/chai ts-node",children:(0,i.jsx)("img",{src:"https://pkg-size.dev/badge/install/44192453",title:"Install size for mocha, ts-node, chai, @types/mocha, and @types/chai"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"configuring-ts-node",children:"Configuring ts-node"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"ts-loader.js"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import { register } from 'node:module';\nimport { pathToFileURL } from 'node:url';\n\nregister('ts-node/esm', pathToFileURL('./'));\n"})}),(0,i.jsx)(n.h3,{id:"configuring-mocha",children:"Configuring Mocha"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:".mocharc.json"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "spec": "./test/**/*.test.ts",\n  "require": "ts-loader.js"\n}\n'})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"creating-the-test-file-2",children:"Creating the test file"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"test/index.test.ts"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { expect } from 'chai';\n\ndescribe('Type comparison', () => {\n  it('Number should not be a text', () => {\n    expect('1').to.deep.equal(1);\n  });\n});\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"running-tests-2",children:"Running tests"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx mocha\n"})})]}),(0,i.jsxs)(a.A,{value:"Vitest",children:[(0,i.jsx)(n.h2,{id:"vitest",children:(0,i.jsx)(n.a,{href:"https://github.com/vitest-dev/vitest",children:"Vitest"})}),(0,i.jsx)(n.h3,{id:"installation-3",children:"Installation"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm i -D vitest ts-node\n"})}),(0,i.jsx)("a",{href:"https://pkg-size.dev/vitest ts-node",children:(0,i.jsx)("img",{src:"https://pkg-size.dev/badge/install/75811670",title:"Install size for vitest, and ts-node"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"configuring-vitest",children:"Configuring Vitest"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"vitest.config.ts"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { defineConfig } from 'vitest/config';\n\nexport default defineConfig({\n  test: {\n    include: ['test/**/*.test.ts'],\n    globals: true,\n    environment: 'node',\n  },\n});\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"creating-the-test-file-3",children:"Creating the test file"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"test/index.test.ts"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { describe, it, expect } from 'vitest';\n\ndescribe('Type comparison', () => {\n  it('Number should not be a text', () => {\n    expect('1').toStrictEqual(1);\n  });\n});\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"running-tests-3",children:"Running tests"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx vitest run\n"})})]}),(0,i.jsxs)(a.A,{value:"AVA",children:[(0,i.jsx)(n.h2,{id:"ava",children:(0,i.jsx)(n.a,{href:"https://github.com/avajs/ava",children:"AVA"})}),(0,i.jsx)(n.h3,{id:"installation-4",children:"Installation"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm i -D ava tsimp\n"})}),(0,i.jsx)("a",{href:"https://pkg-size.dev/ava tsimp",children:(0,i.jsx)("img",{src:"https://pkg-size.dev/badge/install/45894421",title:"Install size for tsimp, and ava"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"configuring-git",children:"Configuring Git"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["Include in the ",(0,i.jsx)(n.em,{children:".gitignore"}),":"]}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:"/.tsimp\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"configuring-ava",children:"Configuring AVA"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["Include in the ",(0,i.jsx)(n.em,{children:"package.json"}),":"]}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "ava": {\n    "files": ["test/**/*.test.ts"],\n    "extensions": {\n      "ts": "module"\n    },\n    "nodeArguments": ["--import=tsimp"]\n  }\n}\n'})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"creating-the-test-file-4",children:"Creating the test file"}),(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"test/index.test.ts"})}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import test from 'ava';\n\ntest('Number should not be a text', (t) => {\n  t.deepEqual('1', 1);\n});\n"})}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.h3,{id:"running-tests-4",children:"Running tests"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx ava\n"})})]})]})]})}function x(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},9329:(e,n,s)=>{s.d(n,{A:()=>l});s(6540);var t=s(4164);const i={tabItem:"tabItem_Ymn6"};var r=s(4848);function l(e){let{children:n,hidden:s,className:l}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,t.A)(i.tabItem,l),hidden:s,children:n})}},5537:(e,n,s)=>{s.d(n,{A:()=>y});var t=s(6540),i=s(4164),r=s(5627),l=s(6347),a=s(372),c=s(604),d=s(1861),o=s(8749);function h(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:s}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:s,attributes:t,default:i}}=e;return{value:n,label:s,attributes:t,default:i}}))}(s);return function(e){const n=(0,d.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,s])}function x(e){let{value:n,tabValues:s}=e;return s.some((e=>e.value===n))}function j(e){let{queryString:n=!1,groupId:s}=e;const i=(0,l.W6)(),r=function(e){let{queryString:n=!1,groupId:s}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:n,groupId:s});return[(0,c.aZ)(r),(0,t.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(i.location.search);n.set(r,e),i.replace({...i.location,search:n.toString()})}),[r,i])]}function g(e){const{defaultValue:n,queryString:s=!1,groupId:i}=e,r=u(e),[l,c]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!x({value:n,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=s.find((e=>e.default))??s[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:r}))),[d,h]=j({queryString:s,groupId:i}),[g,p]=function(e){let{groupId:n}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,r]=(0,o.Dv)(s);return[i,(0,t.useCallback)((e=>{s&&r.set(e)}),[s,r])]}({groupId:i}),m=(()=>{const e=d??g;return x({value:e,tabValues:r})?e:null})();(0,a.A)((()=>{m&&c(m)}),[m]);return{selectedValue:l,selectValue:(0,t.useCallback)((e=>{if(!x({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);c(e),h(e),p(e)}),[h,p,r]),tabValues:r}}var p=s(9136);const m={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=s(4848);function v(e){let{className:n,block:s,selectedValue:t,selectValue:l,tabValues:a}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,r.a_)(),o=e=>{const n=e.currentTarget,s=c.indexOf(n),i=a[s].value;i!==t&&(d(n),l(i))},h=e=>{let n=null;switch(e.key){case"Enter":o(e);break;case"ArrowRight":{const s=c.indexOf(e.currentTarget)+1;n=c[s]??c[0];break}case"ArrowLeft":{const s=c.indexOf(e.currentTarget)-1;n=c[s]??c[c.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":s},n),children:a.map((e=>{let{value:n,label:s,attributes:r}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>{c.push(e)},onKeyDown:h,onClick:o,...r,className:(0,i.A)("tabs__item",m.tabItem,r?.className,{"tabs__item--active":t===n}),children:s??n},n)}))})}function b(e){let{lazy:n,children:s,selectedValue:r}=e;const l=(Array.isArray(s)?s:[s]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===r));return e?(0,t.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function k(e){const n=g(e);return(0,f.jsxs)("div",{className:(0,i.A)("tabs-container",m.tabList),children:[(0,f.jsx)(v,{...n,...e}),(0,f.jsx)(b,{...n,...e})]})}function y(e){const n=(0,p.A)();return(0,f.jsx)(k,{...e,children:h(e.children)},String(n))}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var t=s(6540);const i={},r=t.createContext(i);function l(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);