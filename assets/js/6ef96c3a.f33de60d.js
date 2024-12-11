"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7390],{689:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>t,toc:()=>h});const t=JSON.parse('{"id":"philosophy","title":"Philosophy","description":"Poku\'s philosophy consists of simplicity and efficiency, removing complexities and boilerplate requirements to make testing accessible for the simplest to the most complex projects.","source":"@site/docs/philosophy.mdx","sourceDirName":".","slug":"/philosophy","permalink":"/docs/next/philosophy","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/philosophy.mdx","tags":[],"version":"current","frontMatter":{},"sidebar":"docs","previous":{"title":"Getting Started","permalink":"/docs/next/"},"next":{"title":"Comparing Test Runners","permalink":"/docs/next/comparing"}}');var r=s(4848),i=s(8453),l=s(1470),o=s(9365);const a={},c="Philosophy",d={},h=[{value:"JavaScript Essence for Tests \ud83d\udca1",id:"javascript-essence-for-tests-",level:2},{value:"Making Tests Really Easy \ud83c\udf31",id:"making-tests-really-easy-",level:2},{value:"Special Features \ud83d\udcab",id:"special-features-",level:2},{value:"Development Priorities \ud83d\udd27",id:"development-priorities-",level:2},{value:"Why Not Install External Dependencies? \ud83d\udce6",id:"why-not-install-external-dependencies-",level:2},{value:"TypeScript",id:"typescript",level:3},{value:"Why Maintain Backward Compatibility? \ud83d\udc74\ud83c\udffc",id:"why-maintain-backward-compatibility-",level:2},{value:"Future Plans \ud83d\udcc6",id:"future-plans-",level:2},{value:"Versioning \ud83c\udff7\ufe0f",id:"versioning-\ufe0f",level:2},{value:"Which Poku doesn&#39;t Pretend to be \ud83e\udd1a\ud83c\udffb",id:"which-poku-doesnt-pretend-to-be-",level:2}];function u(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"philosophy",children:"Philosophy"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Poku"}),"'s philosophy consists of simplicity and efficiency, removing complexities and boilerplate requirements to make testing accessible for the simplest to the most complex projects."]}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"javascript-essence-for-tests-",children:"JavaScript Essence for Tests \ud83d\udca1"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.strong,{children:"JavaScript"}),"'s native syntax for tests is what makes it possible to use ",(0,r.jsx)(n.strong,{children:"Poku"})," on multiple platforms."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Imagine you want to execute asynchronous functions, where one runs after the other, and display a message at the beginning and end of the execution:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"console.log('Started');\n\nawait funcA();\nawait funcB();\n\nconsole.log('Done');\n"})}),"\n",(0,r.jsx)(n.p,{children:"Normally, we can't do this with most test runners.\nSee this fictional example:"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:'A popular term for this is "boilerplate", which are extra requirements for structuring and configuring the tests.'}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"describe('My Test', { concurrency: 1 }, () => {\n  // You need to explicitly state what should be run before the tests\n  beforeAll(() => {\n    console.log('Started');\n  });\n\n  // The last step of the script is called before the tests themselves\n  afterAll(() => {\n    console.log('Done');\n  });\n\n  // Asynchronous tests, but they will be executed sequentially even without the use of `await`\n  it(async () => {\n    // async test\n  });\n\n  it(async () => {\n    // async test\n  });\n});\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Also, you can't run this like ",(0,r.jsx)(n.code,{children:"node test.js"})," due to evaluations, global state, or test transformations, where you need to run your test using the test runner."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Poku"})," brings back the ",(0,r.jsx)(n.strong,{children:"JavaScript"})," essence to tests:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { describe, it } from 'poku';\n\ndescribe('My Test', async () => {\n  console.log('Started');\n\n  await it(async () => {\n    // async test\n  });\n\n  await it(async () => {\n    // async test\n  });\n\n  console.log('Done');\n});\n"})}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Poku"})," doesn't use a global state, allowing you to use it how and where you want:"]}),(0,r.jsxs)(l.A,{children:[(0,r.jsx)(o.A,{default:!0,value:"Node.js + Poku",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npx poku test.js\n"})})}),(0,r.jsx)(o.A,{default:!0,value:"Bun + Poku",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"bun poku test.js\n"})})}),(0,r.jsx)(o.A,{default:!0,value:"Deno + Poku",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"deno run npm:poku test.js\n"})})}),(0,r.jsx)(o.A,{default:!0,value:"Node.js",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"node test.js\n"})})}),(0,r.jsx)(o.A,{default:!0,value:"Bun",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"bun test.js\n"})})}),(0,r.jsx)(o.A,{default:!0,value:"Deno",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"deno run test.js\n"})})}),(0,r.jsx)(o.A,{default:!0,value:"Yarn + Poku",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"yarn poku test.js\n"})})}),(0,r.jsx)(o.A,{default:!0,value:"pnpm + Poku",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"pnpm poku test.js\n"})})})]}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Same idea for ",(0,r.jsx)(n.strong,{children:"TypeScript"}),"."]}),"\n"]})]}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"making-tests-really-easy-",children:"Making Tests Really Easy \ud83c\udf31"}),"\n",(0,r.jsx)(n.p,{children:"In many cases, tests lead to the same common objective: the assertion of an expected value with a dynamic value."}),"\n",(0,r.jsx)(n.p,{children:'But tests usually don\'t show enough logs and details if you only focus on assertions. Even if they work, you might easily encounter an error message like "at least one test is necessary" with some test runners.'}),"\n",(0,r.jsxs)(n.p,{children:["An example using the native ",(0,r.jsx)(n.strong,{children:"Node.js"})," ",(0,r.jsx)(n.code,{children:"assert"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import assert from 'node:assert';\n\nconst one = 1;\nassert.equal(one, 1, '1 needs to be equal to 1');\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"The assert message in this example will not be displayed and the test will pass silently."}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Instead of, you will need to use ",(0,r.jsx)(n.code,{children:"test"})," or ",(0,r.jsx)(n.code,{children:"describe"})," and ",(0,r.jsx)(n.code,{children:"it"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import assert from 'node:assert';\nimport test from 'node:test';\n\ntest('one is equal to 1', () => {\n  const one = 1;\n  assert.equal(one, 1, '1 needs to be equal to 1');\n});\n"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Poku"})," allows a test following the ",(0,r.jsx)(n.strong,{children:"BDD"}),"/",(0,r.jsx)(n.strong,{children:"TDD"})," approach using only the ",(0,r.jsx)(n.code,{children:"assert"})," method:"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["\u26a0\ufe0f ",(0,r.jsx)(n.em,{children:"Please, it's not a recommendation, but yes, it would be possible for simpler tests."})]}),"\n"]}),"\n",(0,r.jsx)(l.A,{children:(0,r.jsx)(o.A,{default:!0,value:"test/file.test.mjs",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { assert } from 'poku';\n\nconst one = 1;\nassert.equal(one, 1, 'one is equal to 1');\n"})})})}),"\n",(0,r.jsx)(n.p,{children:"Then:"}),"\n",(0,r.jsxs)(l.A,{children:[(0,r.jsx)(o.A,{default:!0,value:"Node.js and TypeScript (Node.js)",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npx poku\n"})})}),(0,r.jsx)(o.A,{value:"Bun",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"bun poku\n"})})}),(0,r.jsx)(o.A,{value:"Deno",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"deno run npm:poku\n"})})})]}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["This will generate a complete log, both in case of success or failure, maintaining the exact ",(0,r.jsx)(n.strong,{children:"Node.js"})," development style and being compatible with ",(0,r.jsx)(n.strong,{children:"Node.js"}),", ",(0,r.jsx)(n.strong,{children:"Bun"}),", and ",(0,r.jsx)(n.strong,{children:"Deno"}),"."]})}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["Each case can be different. For this, ",(0,r.jsx)(n.strong,{children:"Poku"})," has a completely modular way of using it, allowing you to use ",(0,r.jsx)(n.code,{children:"test"}),", ",(0,r.jsx)(n.code,{children:"describe"}),", ",(0,r.jsx)(n.code,{children:"it"}),", ",(0,r.jsx)(n.code,{children:"beforeEach"}),", ",(0,r.jsx)(n.code,{children:"afterEach"}),", ",(0,r.jsx)(n.code,{children:"--watch"})," mode and more, according to your needs for more complex tests or tests that follow a specified pattern."]})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"special-features-",children:"Special Features \ud83d\udcab"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Poku"})," offers integrated support for common testing challenges, such as starting services, servers and containers needed to run tests and terminating them at the tests' end, in addition to flexibility to handle ports and processes."]}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"development-priorities-",children:"Development Priorities \ud83d\udd27"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Human-friendly usage."}),"\n",(0,r.jsxs)(n.li,{children:["Cross-platform compatibility (",(0,r.jsx)(n.strong,{children:"Node"}),", ",(0,r.jsx)(n.strong,{children:"Bun"}),", and ",(0,r.jsx)(n.strong,{children:"Deno"}),")."]}),"\n",(0,r.jsx)(n.li,{children:"Performance improvements."}),"\n",(0,r.jsx)(n.li,{children:"All functionalities must be documented and have at least a minimum example of use."}),"\n"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"Compatibility with legacy environments whenever possible, documenting when a specific feature only works from a version of the runtime/platform."}),"\n"]}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"why-not-install-external-dependencies-",children:"Why Not Install External Dependencies? \ud83d\udce6"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"In order of relevance"}),"\n"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["By requiring all possible dependencies to be fully compatible with ",(0,r.jsx)(n.strong,{children:"Node.js"}),", ",(0,r.jsx)(n.strong,{children:"Bun"})," and ",(0,r.jsx)(n.strong,{children:"Deno"}),"."]}),"\n",(0,r.jsx)(n.li,{children:"To keep the final installation size as lightweight as possible"}),"\n",(0,r.jsx)(n.li,{children:"To avoid compatibility issues with legacy environments."}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"typescript",children:"TypeScript"}),"\n",(0,r.jsxs)(n.p,{children:["For ",(0,r.jsx)(n.strong,{children:"Node.js"})," + ",(0,r.jsx)(n.strong,{children:"TypeScript"}),", Poku uses ",(0,r.jsx)(n.a,{href:"https://github.com/privatenumber/tsx",children:(0,r.jsx)(n.strong,{children:"tsx"})})," to run the files.\nWhy? Because it follows the same principle as ",(0,r.jsx)(n.strong,{children:"Poku"}),": zero configurations for common needs."]}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"why-maintain-backward-compatibility-",children:"Why Maintain Backward Compatibility? \ud83d\udc74\ud83c\udffc"}),"\n",(0,r.jsx)(n.p,{children:"Several projects still use or support legacy versions. The requirement for legacy versions isn't a strict rule and can change with major releases due to specific features that may require polyfills and impact performance directly."}),"\n",(0,r.jsxs)(n.p,{children:["That's why the limit chosen was ",(0,r.jsx)(n.strong,{children:"Node.js"})," version ",(0,r.jsx)(n.code,{children:"14.x.x"}),"."]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Poku"})," always recommends using supported versions of each runtime."]})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"future-plans-",children:"Future Plans \ud83d\udcc6"}),"\n",(0,r.jsxs)(n.p,{children:["Although not a priority, there are plans to integrate the following features into ",(0,r.jsx)(n.strong,{children:"Poku"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Stub"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Mock"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.strong,{children:"Spies"})}),"\n"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["See ",(0,r.jsx)(n.strong,{children:"mock"})," examples for both ",(0,r.jsx)(n.a,{href:"/docs/examples/mock/cjs",children:(0,r.jsx)(n.strong,{children:"CJS"})})," and ",(0,r.jsx)(n.a,{href:"/docs/examples/mock/esm",children:(0,r.jsx)(n.strong,{children:"ESM"})})," using ",(0,r.jsx)(n.strong,{children:"Poku"})," + ",(0,r.jsx)(n.a,{href:"https://github.com/testdouble/quibble",children:(0,r.jsx)(n.strong,{children:"quibble"})}),"."]}),"\n"]}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"versioning-\ufe0f",children:"Versioning \ud83c\udff7\ufe0f"}),"\n",(0,r.jsx)(n.p,{children:"They aren't considered breaking changes:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Formatting and style changes to outputs ",(0,r.jsx)(n.em,{children:"(including reporters \u2014 soon)"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["New functionalities that depend from a specific platform version:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"As long as it doesn't affect basic usability."}),"\n",(0,r.jsxs)(n.li,{children:["E.g., when using ",(0,r.jsx)(n.strong,{children:"Node.js"})," previous to ",(0,r.jsx)(n.code,{children:"v15.x.x"}),", the ",(0,r.jsx)(n.code,{children:"strict"})," method isn't available."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["If a feature is no longer useful due to a new approach ",(0,r.jsx)(n.em,{children:"(as long as it doesn't affect the end user)"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.em,{children:"JSON"})," intellisense schema changes ",(0,r.jsx)(n.em,{children:"(config files)"}),"."]}),"\n"]}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(n.h2,{id:"which-poku-doesnt-pretend-to-be-",children:"Which Poku doesn't Pretend to be \ud83e\udd1a\ud83c\udffb"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["A replacement for native test runners","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Try and use ",(0,r.jsx)(n.strong,{children:"Poku"})," as an alternative \ud83d\udc37"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["The lightest or the fastest","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Although these points are taken into consideration, the main aim is to maintain a balance between good practices."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"danger",children:(0,r.jsxs)(n.p,{children:["Note that ",(0,r.jsx)(n.strong,{children:"Poku"})," has a different way of being used, inspired entirely by the essence of native ",(0,r.jsx)(n.strong,{children:"JavaScript"}),", which can be both an advantage and a disadvantage for those who are used to the traditional ",(0,r.jsx)(n.em,{children:"hooks"})," of other test runners."]})})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},9365:(e,n,s)=>{s.d(n,{A:()=>l});s(6540);var t=s(4164);const r={tabItem:"tabItem_Ymn6"};var i=s(4848);function l(e){let{children:n,hidden:s,className:l}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,t.A)(r.tabItem,l),hidden:s,children:n})}},1470:(e,n,s)=>{s.d(n,{A:()=>w});var t=s(6540),r=s(4164),i=s(3104),l=s(6347),o=s(205),a=s(7485),c=s(1682),d=s(679);function h(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:s}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:s,attributes:t,default:r}}=e;return{value:n,label:s,attributes:t,default:r}}))}(s);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,s])}function p(e){let{value:n,tabValues:s}=e;return s.some((e=>e.value===n))}function x(e){let{queryString:n=!1,groupId:s}=e;const r=(0,l.W6)(),i=function(e){let{queryString:n=!1,groupId:s}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:n,groupId:s});return[(0,a.aZ)(i),(0,t.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(r.location.search);n.set(i,e),r.replace({...r.location,search:n.toString()})}),[i,r])]}function j(e){const{defaultValue:n,queryString:s=!1,groupId:r}=e,i=u(e),[l,a]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=s.find((e=>e.default))??s[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:i}))),[c,h]=x({queryString:s,groupId:r}),[j,m]=function(e){let{groupId:n}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,i]=(0,d.Dv)(s);return[r,(0,t.useCallback)((e=>{s&&i.set(e)}),[s,i])]}({groupId:r}),g=(()=>{const e=c??j;return p({value:e,tabValues:i})?e:null})();(0,o.A)((()=>{g&&a(g)}),[g]);return{selectedValue:l,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);a(e),h(e),m(e)}),[h,m,i]),tabValues:i}}var m=s(2303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=s(4848);function b(e){let{className:n,block:s,selectedValue:t,selectValue:l,tabValues:o}=e;const a=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.a_)(),d=e=>{const n=e.currentTarget,s=a.indexOf(n),r=o[s].value;r!==t&&(c(n),l(r))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const s=a.indexOf(e.currentTarget)+1;n=a[s]??a[0];break}case"ArrowLeft":{const s=a.indexOf(e.currentTarget)-1;n=a[s]??a[a.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":s},n),children:o.map((e=>{let{value:n,label:s,attributes:i}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>a.push(e),onKeyDown:h,onClick:d,...i,className:(0,r.A)("tabs__item",g.tabItem,i?.className,{"tabs__item--active":t===n}),children:s??n},n)}))})}function y(e){let{lazy:n,children:s,selectedValue:i}=e;const l=(Array.isArray(s)?s:[s]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===i));return e?(0,t.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function v(e){const n=j(e);return(0,f.jsxs)("div",{className:(0,r.A)("tabs-container",g.tabList),children:[(0,f.jsx)(b,{...n,...e}),(0,f.jsx)(y,{...n,...e})]})}function w(e){const n=(0,m.A)();return(0,f.jsx)(v,{...e,children:h(e.children)},String(n))}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>o});var t=s(6540);const r={},i=t.createContext(r);function l(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);