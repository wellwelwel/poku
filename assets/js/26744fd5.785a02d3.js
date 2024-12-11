"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3389],{302:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"documentation/helpers/test","title":"\ud83e\uddea test","description":"test(message () => void) | test(cb: () => void)","source":"@site/docs/documentation/helpers/test.mdx","sourceDirName":"documentation/helpers","slug":"/documentation/helpers/test","permalink":"/docs/documentation/helpers/test","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/helpers/test.mdx","tags":[{"inline":true,"label":"boilerplate","permalink":"/docs/tags/boilerplate"},{"inline":true,"label":"tdd","permalink":"/docs/tags/tdd"},{"inline":true,"label":"bdd","permalink":"/docs/tags/bdd"}],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"tags":["boilerplate","tdd","bdd"]},"sidebar":"docs","previous":{"title":"\u26a1\ufe0f Helpers","permalink":"/docs/category/\ufe0f-helpers"},"next":{"title":"\ud83e\uddea describe","permalink":"/docs/documentation/helpers/describe"}}');var i=s(4848),r=s(8453);const o={sidebar_position:1,tags:["boilerplate","tdd","bdd"]},a="\ud83e\uddea test",l={},d=[{value:"Basic Usage",id:"basic-usage",level:2},{value:"Isolating scopes",id:"isolating-scopes",level:3},{value:"Grouping tests",id:"grouping-tests",level:3},{value:"Waiting for promises",id:"waiting-for-promises",level:3},{value:"Running in parallel",id:"running-in-parallel",level:3},{value:"Waiting for multiple promises",id:"waiting-for-multiple-promises",level:3}];function c(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"-test",children:"\ud83e\uddea test"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"test(message: string, cb: () => void)"})," | ",(0,i.jsx)(n.code,{children:"test(cb: () => void)"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"test"})," is a helper to assist you in such cases:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Use the ",(0,i.jsxs)(n.a,{href:"/docs/documentation/helpers/before-after-each/in-code",children:[(0,i.jsx)(n.code,{children:"beforeEach"})," and ",(0,i.jsx)(n.code,{children:"afterEach"})]})," for each ",(0,i.jsx)(n.code,{children:"test"})," performed"]}),"\n",(0,i.jsx)(n.li,{children:"Isolate or group your tests in the same file"}),"\n",(0,i.jsx)(n.li,{children:"Run tests in the same file in parallel"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"basic-usage",children:"Basic Usage"}),"\n",(0,i.jsx)(n.h3,{id:"isolating-scopes",children:"Isolating scopes"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { test, assert } from 'poku';\n\ntest(() => {\n  const myVar = 'a';\n\n  assert.strictEqual(myVar, 'a', 'My first test helper');\n});\n\ntest(() => {\n  const myVar = 'b';\n\n  assert.strictEqual(myVar, 'b', 'My second test helper');\n});\n"})}),"\n",(0,i.jsx)(n.h3,{id:"grouping-tests",children:"Grouping tests"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { test, assert } from 'poku';\n\ntest(() => {\n  assert.equal(1 + 1, 2, '1 + 1 should be 2');\n  assert.equal(2 + 2, 4, '2 + 2 should be 4');\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { test, assert } from 'poku';\n\ntest('Sum tests', () => {\n  assert.equal(1 + 1, 2);\n  assert.equal(2 + 2, 4);\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { test, assert } from 'poku';\n\ntest('Sum tests', () => {\n  assert.equal(1 + 1, 2, '1 + 1 should be 2');\n  assert.equal(2 + 2, 4, '2 + 2 should be 4');\n});\n"})}),"\n",(0,i.jsx)(n.h3,{id:"waiting-for-promises",children:"Waiting for promises"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { test } from 'poku';\n\nawait test(async () => {\n  // do anything you want\n});\n\nawait test(async () => {\n  // do anything you want\n});\n"})}),"\n",(0,i.jsx)(n.h3,{id:"running-in-parallel",children:"Running in parallel"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { test } from 'poku';\n\ntest(async () => {\n  // do anything you want\n});\n\ntest(async () => {\n  // do anything you want\n});\n"})}),"\n",(0,i.jsx)(n.h3,{id:"waiting-for-multiple-promises",children:"Waiting for multiple promises"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { test } from 'poku';\n\n// do something before\n\nawait Promise.all([\n  test(async () => {\n    // do anything you want\n  }),\n\n  test(async () => {\n    // do anything you want\n  }),\n]);\n\n// do something after\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["You can think on it as ",(0,i.jsx)(n.code,{children:"beforeAll"})," and ",(0,i.jsx)(n.code,{children:"afterAll"}),"."]})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var t=s(6540);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);