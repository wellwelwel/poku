/*! For license information please see 76bcf887.75313a9f.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2391],{5963:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>h,contentTitle:()=>r,default:()=>j,frontMatter:()=>c,metadata:()=>l,toc:()=>a});const l=JSON.parse('{"id":"documentation/helpers/only","title":"\ud83c\udf0c only","description":"The .only helper enables selective execution of tests, allowing you to focus on specific describe, it, and/or test blocks by running only those marked with .only. See the usage to understand the different conditions and behaviors.","source":"@site/docs/documentation/helpers/only.mdx","sourceDirName":"documentation/helpers","slug":"/documentation/helpers/only","permalink":"/docs/documentation/helpers/only","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/helpers/only.mdx","tags":[{"inline":true,"label":"modifiers","permalink":"/docs/tags/modifiers"},{"inline":true,"label":"debugging","permalink":"/docs/tags/debugging"}],"version":"current","sidebarPosition":11,"frontMatter":{"sidebar_position":11,"tags":["modifiers","debugging"]},"sidebar":"docs","previous":{"title":"\ud83d\udccb todo","permalink":"/docs/documentation/helpers/todo"},"next":{"title":"\ud83d\uddc4\ufe0f List Files","permalink":"/docs/documentation/helpers/list-files"}}');var i=s(4848),t=s(8453),o=s(8215),d=s(2467);const c={sidebar_position:11,tags:["modifiers","debugging"]},r="\ud83c\udf0c only",h={},a=[{value:"Usage",id:"usage",level:2},{value:"<code>--only</code>",id:"--only",level:3},{value:"<code>--only=describe</code>",id:"--onlydescribe",level:3},{value:"<code>--only=it</code>",id:"--onlyit",level:3},{value:"Common issues",id:"common-issues",level:2},{value:"<code>.only</code> vs. scope",id:"only-vs-scope",level:3},{value:"Migrating from other Test Runners",id:"migrating-from-other-test-runners",level:2},{value:"Mapped vs. non-mapped tests <em>(advanced concept)</em>",id:"mapped-vs-non-mapped-tests-advanced-concept",level:2},{value:"Complex examples",id:"complex-examples",level:2},{value:"<code>--only=it</code>",id:"--onlyit-1",level:3}];function x(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"-only",children:"\ud83c\udf0c only"})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:".only"})," helper enables selective execution of tests, allowing you to focus on specific ",(0,i.jsx)(n.code,{children:"describe"}),", ",(0,i.jsx)(n.code,{children:"it"}),", and/or ",(0,i.jsx)(n.code,{children:"test"})," blocks by running only those marked with ",(0,i.jsx)(n.code,{children:".only"}),". See the ",(0,i.jsx)(n.a,{href:"#usage",children:"usage"})," to understand the different conditions and behaviors."]}),"\n",(0,i.jsx)(d.k,{level:1,message:"This method can be changed according to users' suggestions and needs. Major changes in this method won't be considered breaking changes while it's in experimental stage."}),"\n",(0,i.jsx)(o.B,{records:[{version:"2.7.0",changes:[(0,i.jsxs)(i.Fragment,{children:["Add ",(0,i.jsx)(n.code,{children:"only"})," modifier to ",(0,i.jsx)(n.code,{children:"describe"}),","," ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods."]})]}]}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(n.p,{children:["To enable the ",(0,i.jsx)(n.code,{children:".only"})," helper, you must to pass one of the following flags to enable it selectively:"]}),"\n",(0,i.jsx)(n.h3,{id:"--only",children:(0,i.jsx)(n.code,{children:"--only"})}),"\n",(0,i.jsxs)(n.p,{children:["Enables the ",(0,i.jsx)(n.code,{children:".only"})," helper for ",(0,i.jsx)(n.code,{children:"describe"}),", ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods."]}),"\n",(0,i.jsx)("blockquote",{children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"describe.only"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"it.only"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"test.only"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u23ed\ufe0f ",(0,i.jsx)(n.code,{children:"describe"})," ",(0,i.jsx)(n.em,{children:"(it will be skipped)"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u23ed\ufe0f ",(0,i.jsx)(n.code,{children:"it"})," ",(0,i.jsx)(n.em,{children:"(it will be skipped)"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u23ed\ufe0f ",(0,i.jsx)(n.code,{children:"test"})," ",(0,i.jsx)(n.em,{children:"(it will be skipped)"})]}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { describe, it, test } from 'poku';\n\ndescribe.only(() => {\n  it.only(() => {\n    // ...\n  });\n\n  test.only(() => {\n    // ...\n  });\n});\n\ntest.only(() => {\n  // ...\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku --only\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"describe"}),", ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods without ",(0,i.jsx)(n.code,{children:".only"})," will be skipped."]}),"\n"]})}),"\n",(0,i.jsx)(n.h3,{id:"--onlydescribe",children:(0,i.jsx)(n.code,{children:"--only=describe"})}),"\n",(0,i.jsxs)(n.p,{children:["Enables the ",(0,i.jsx)(n.code,{children:".only"})," helper for ",(0,i.jsx)(n.code,{children:"describe"})," method."]}),"\n",(0,i.jsx)("blockquote",{children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"describe.only"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"it"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"test"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u23ed\ufe0f ",(0,i.jsx)(n.code,{children:"describe"})," ",(0,i.jsx)(n.em,{children:"(it will be skipped)"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u274c ",(0,i.jsx)(n.code,{children:"it.only"})," ",(0,i.jsxs)(n.em,{children:["(it forces a failure since ",(0,i.jsx)(n.code,{children:"it.only"})," is not enabled in ",(0,i.jsx)(n.code,{children:"--only=describe"}),")"]})]}),"\n",(0,i.jsxs)(n.li,{children:["\u274c ",(0,i.jsx)(n.code,{children:"test.only"})," ",(0,i.jsxs)(n.em,{children:["(it forces a failure since ",(0,i.jsx)(n.code,{children:"test.only"})," is not enabled in ",(0,i.jsx)(n.code,{children:"--only=describe"}),")"]})]}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { describe, it, test } from 'poku';\n\ndescribe.only(() => {\n  it(() => {\n    // ...\n  });\n\n  test(() => {\n    // ...\n  });\n});\n\ntest(() => {\n  // ...\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku --only=describe\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"describe"})," methods without ",(0,i.jsx)(n.code,{children:".only"})," will be skipped."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods without ",(0,i.jsx)(n.code,{children:".only"})," will be executed normally, including outside the scope of ",(0,i.jsx)(n.code,{children:"describe"})," (top-level)."]}),"\n"]})}),"\n",(0,i.jsx)(n.h3,{id:"--onlyit",children:(0,i.jsx)(n.code,{children:"--only=it"})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:["Alternative flag: ",(0,i.jsx)(n.code,{children:"--only=test"})]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Enables the ",(0,i.jsx)(n.code,{children:".only"})," helper for ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods."]}),"\n",(0,i.jsx)("blockquote",{children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"it.only"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"test.only"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u2705 ",(0,i.jsx)(n.code,{children:"describe"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u23ed\ufe0f ",(0,i.jsx)(n.code,{children:"it"})," ",(0,i.jsx)(n.em,{children:"(it will be skipped)"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u23ed\ufe0f ",(0,i.jsx)(n.code,{children:"test"})," ",(0,i.jsx)(n.em,{children:"(it will be skipped)"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u274c ",(0,i.jsx)(n.code,{children:"describe.only"})," ",(0,i.jsxs)(n.em,{children:["(it forces a failure since ",(0,i.jsx)(n.code,{children:"describe.only"})," is not enabled in ",(0,i.jsx)(n.code,{children:"--only=it"}),")"]})]}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { describe, it, test } from 'poku';\n\ndescribe(() => {\n  it.only(() => {\n    // ...\n  });\n\n  test.only(() => {\n    // ...\n  });\n});\n\ntest.only(() => {\n  // ...\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku --only=it\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods without ",(0,i.jsx)(n.code,{children:".only"})," will be skipped."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"describe"})," methods without ",(0,i.jsx)(n.code,{children:".only"})," will be executed normally."]}),"\n"]})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:".only"})," helper works exactly as its respective ",(0,i.jsx)(n.code,{children:"describe"}),", ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods (e.g., by running ",(0,i.jsx)(n.code,{children:"beforeEach"})," and ",(0,i.jsx)(n.code,{children:"afterEach"})," for the ",(0,i.jsx)(n.code,{children:"test.only"})," or ",(0,i.jsx)(n.code,{children:"it.only"}),")."]}),"\n",(0,i.jsx)(n.li,{children:"It works for both sequential and parallel executions normally, including synchronous and asynchronous tests."}),"\n"]})}),"\n",(0,i.jsx)(n.admonition,{title:"Important",type:"danger",children:(0,i.jsxs)(n.p,{children:["It's important to recall that ",(0,i.jsx)(n.strong,{children:"Poku"})," respects conventional ",(0,i.jsx)(n.strong,{children:"JavaScript"})," syntax in tests and doesn't change the order of the executions. See the ",(0,i.jsx)(n.a,{href:"#complex-examples",children:"examples"})," to clarify it."]})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"common-issues",children:"Common issues"}),"\n",(0,i.jsxs)(n.h3,{id:"only-vs-scope",children:[(0,i.jsx)(n.code,{children:".only"})," vs. scope"]}),"\n",(0,i.jsxs)(n.p,{children:["If a ",(0,i.jsx)(n.code,{children:".only"})," method is inside a skipped method, it won't be executed, for example:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { describe, it, test } from 'poku';\n\ndescribe.only(() => {\n  it.only(() => {\n    // ... \u2705\n  });\n\n  // it(() => {\n  //   // ...\n  // });\n\n  // test(() => {\n  //   // ...\n  // });\n});\n\n// describe(() => {\n//   it.only(() => {\n//     // ... \u274c\n//   });\n//\n//   test(() => {\n//     // ...\n//   });\n// });\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku --only\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"migrating-from-other-test-runners",children:"Migrating from other Test Runners"}),"\n",(0,i.jsxs)(n.p,{children:["In ",(0,i.jsx)(n.strong,{children:"Poku"}),", the ",(0,i.jsx)(n.code,{children:".only"})," helper works like a switch:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["To enable the ",(0,i.jsx)(n.code,{children:".only"})," helper for both ",(0,i.jsx)(n.code,{children:"describe"}),", ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods, you need to use the ",(0,i.jsx)(n.code,{children:"--only"})," flag."]}),"\n",(0,i.jsxs)(n.li,{children:["To enable the ",(0,i.jsx)(n.code,{children:".only"})," helper for ",(0,i.jsx)(n.code,{children:"describe"})," methods, you need to use the ",(0,i.jsx)(n.code,{children:"--only=describe"})," flag."]}),"\n",(0,i.jsxs)(n.li,{children:["To enable the ",(0,i.jsx)(n.code,{children:".only"})," helper for ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods, you need to use the ",(0,i.jsx)(n.code,{children:"--only=it"})," flag."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["An example running a ",(0,i.jsx)(n.code,{children:"it.only"})," inside a ",(0,i.jsx)(n.code,{children:"describe"})," method without ",(0,i.jsx)(n.code,{children:".only"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { describe, it } from 'poku';\n\ndescribe(() => {\n  it.only(() => {\n    // ... \u2705\n  });\n\n  // it(() => {\n  //   // ...\n  // });\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku --only=it\n"})}),"\n",(0,i.jsxs)(n.p,{children:["This way, you enable ",(0,i.jsx)(n.code,{children:".only"})," only for ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods, keeping ",(0,i.jsx)(n.code,{children:"describe"})," methods with their default behavior. It means that ",(0,i.jsx)(n.code,{children:"describe"})," methods will run even without ",(0,i.jsx)(n.code,{children:".only"})," due to ",(0,i.jsx)(n.code,{children:"--only=it"}),", while ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"})," methods will only run if you use the ",(0,i.jsx)(n.code,{children:".only"})," helper."]}),"\n",(0,i.jsxs)(n.p,{children:["It's also important to note that the ",(0,i.jsx)(n.code,{children:"--only"})," flag applies to all files to be tested and you can use the flag with or without ",(0,i.jsx)(n.code,{children:"poku"})," command, for example:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku test/my-test.test.js --only\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"node test/my-test.test.js --only\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx tsx test/my-test.test.ts --only\n"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.h2,{id:"mapped-vs-non-mapped-tests-advanced-concept",children:["Mapped vs. non-mapped tests ",(0,i.jsx)(n.em,{children:"(advanced concept)"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Poku"})," doesn't map the tests to determine which ones will be run or not from appending ",(0,i.jsx)(n.code,{children:".only"})," tests, instead, it toggles which methods (",(0,i.jsx)(n.code,{children:"describe"}),", ",(0,i.jsx)(n.code,{children:"it"})," and ",(0,i.jsx)(n.code,{children:"test"}),") will be run according to the flags ",(0,i.jsx)(n.code,{children:"--only"}),", ",(0,i.jsx)(n.code,{children:"--only=describe"})," or ",(0,i.jsx)(n.code,{children:"--only=it"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Why isn't ",(0,i.jsx)(n.code,{children:"it.only"})," executed in the following example?"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"describe(() => {\n  it.only(() => {\n    // ... \u274c\n  });\n});\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku --only\n"})}),"\n",(0,i.jsxs)(n.p,{children:["As the ",(0,i.jsx)(n.code,{children:"describe"})," method isn't using the ",(0,i.jsx)(n.code,{children:".only"})," helper, it will be skipped, including everything within its scope, which includes the ",(0,i.jsx)(n.code,{children:"it.only"})," in this example."]}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h2,{id:"complex-examples",children:"Complex examples"}),"\n",(0,i.jsx)(n.h3,{id:"--onlyit-1",children:(0,i.jsx)(n.code,{children:"--only=it"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"import { describe, it, test, assert, beforeEach, afterEach } from 'poku';\n\nbeforeEach(() => {\n  // It will run normally before all `it.only` and `test.only`.\n});\n\nafterEach(() => {\n  // It will run normally after all `it.only` and `test.only`.\n});\n\nlet counter = 0;\n\n// \u2b07\ufe0f `describe` scopes \u2b07\ufe0f\n\ndescribe('1', () => {\n  counter++; // \u2705 `describe` scope will be executed as it's in \"native\" JavaScript flow\n\n  it.only('2', () => {\n    counter++; // \u2705 `it.only` will be executed\n  });\n\n  it('3', () => {\n    counter++; // \u23ed\ufe0f `it` will be skipped\n  });\n\n  test.only('4', () => {\n    counter++; // \u2705 `test.only` will be executed\n  });\n\n  test('5', () => {\n    counter++; // \u23ed\ufe0f `test` will be skipped\n  });\n});\n\n// \u2b07\ufe0f Top-level or non-`describe` scopes \u2b07\ufe0f\n\ncounter++; // \u2705 Will be executed as it's in \"native\" JavaScript flow\n\ntest('6', () => {\n  counter++; // \u23ed\ufe0f `test` will be skipped\n});\n\ntest.only('7', () => {\n  counter++; // \u2705 `test.only` will be executed\n});\n\nit('8', () => {\n  counter++; // \u23ed\ufe0f `it` will be skipped\n});\n\nit.only('9', () => {\n  counter++; // \u2705 `it.only` will be executed\n});\n\n// describe.only('10', () => {\n//   counter++; // \u274c It would force a failure since `describe.only` is not enabled in `--only=it`\n// });\n\nassert.strictEqual(counter, 6);\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npx poku --only=it\n"})})]})}function j(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(x,{...e})}):x(e)}},1622:(e,n,s)=>{s.d(n,{A:()=>u});var l=s(6540),i=s(4164),t=s(3427),o=s(2303),d=s(1422);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var r=s(4848);function h(e){return!!e&&("SUMMARY"===e.tagName||h(e.parentElement))}function a(e,n){return!!e&&(e===n||a(e.parentElement,n))}function x(e){let{summary:n,children:s,...x}=e;(0,t.A)().collectAnchor(x.id);const j=(0,o.A)(),p=(0,l.useRef)(null),{collapsed:u,setCollapsed:y}=(0,d.u)({initialState:!x.open}),[m,b]=(0,l.useState)(x.open),g=l.isValidElement(n)?n:(0,r.jsx)("summary",{children:n??"Details"});return(0,r.jsxs)("details",{...x,ref:p,open:m,"data-collapsed":u,className:(0,i.A)(c.details,j&&c.isBrowser,x.className),onMouseDown:e=>{h(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;h(n)&&a(n,p.current)&&(e.preventDefault(),u?(y(!1),b(!0)):y(!0))},children:[g,(0,r.jsx)(d.N,{lazy:!1,collapsed:u,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{y(e),b(!e)},children:(0,r.jsx)("div",{className:c.collapsibleContent,children:s})})]})}const j={details:"details_b_Ee"},p="alert alert--info";function u(e){let{...n}=e;return(0,r.jsx)(x,{...n,className:(0,i.A)(p,j.details,n.className)})}},8215:(e,n,s)=>{s.d(n,{B:()=>o});var l=s(1622);const i=(0,s(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var t=s(4848);const o=e=>{let{records:n,open:s}=e;return(0,t.jsx)(l.A,{open:s,summary:(0,t.jsxs)("summary",{children:[(0,t.jsx)(i,{})," History"]}),className:"history",children:(0,t.jsxs)("table",{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Version"}),(0,t.jsx)("th",{children:"Changes"})]})}),(0,t.jsx)("tbody",{children:n.map(((e,n)=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,t.jsx)("td",{children:(0,t.jsx)("div",{className:"changes",children:e.changes.map(((e,n)=>(0,t.jsx)("section",{children:e},`change:${n}`)))})})]},`record:${n}`)))})]})})}},2467:(e,n,s)=>{s.d(n,{k:()=>a});var l=s(4722);const i=(0,l.A)("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),t=(0,l.A)("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]),o=(0,l.A)("Microscope",[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]]),d=(0,l.A)("PackageSearch",[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}],["circle",{cx:"18.5",cy:"15.5",r:"2.5",key:"b5zd12"}],["path",{d:"M20.27 17.27 22 19",key:"1l4muz"}]]),c=(0,l.A)("PackageCheck",[["path",{d:"m16 16 2 2 4-4",key:"gfu2re"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]),r=(0,l.A)("LightbulbOff",[["path",{d:"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5",key:"1fkcox"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5",key:"10m8kw"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);var h=s(4848);const a=e=>{let{level:n,message:s}=e;const l={0:{title:"Deprecated",icon:(0,h.jsx)(i,{})},1:{title:"Experimental",icon:(0,h.jsx)(t,{})},1.1:{title:"Early Development",icon:(0,h.jsx)(o,{})},1.2:{title:"Release Candidate",icon:(0,h.jsx)(d,{})},2:{title:"Stable",icon:(0,h.jsx)(c,{})},3:{title:"Legacy",icon:(0,h.jsx)(r,{})}};return(0,h.jsxs)("section",{className:"stability","data-level":n,children:[(0,h.jsxs)("header",{children:[(0,h.jsx)("strong",{children:n}),(0,h.jsx)("span",{children:l[n].title}),l[n].icon]}),s?(0,h.jsx)("p",{children:s}):null]})}},4722:(e,n,s)=>{s.d(n,{A:()=>d});var l=s(6540);const i=(...e)=>e.filter(((e,n,s)=>Boolean(e)&&""!==e.trim()&&s.indexOf(e)===n)).join(" ").trim();var t={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const o=(0,l.forwardRef)((({color:e="currentColor",size:n=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:d="",children:c,iconNode:r,...h},a)=>(0,l.createElement)("svg",{ref:a,...t,width:n,height:n,stroke:e,strokeWidth:o?24*Number(s)/Number(n):s,className:i("lucide",d),...h},[...r.map((([e,n])=>(0,l.createElement)(e,n))),...Array.isArray(c)?c:[c]]))),d=(e,n)=>{const s=(0,l.forwardRef)((({className:s,...t},d)=>{return(0,l.createElement)(o,{ref:d,iconNode:n,className:i(`lucide-${c=e,c.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,s),...t});var c}));return s.displayName=`${e}`,s}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>d});var l=s(6540);const i={},t=l.createContext(i);function o(e){const n=l.useContext(t);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),l.createElement(t.Provider,{value:n},e.children)}}}]);