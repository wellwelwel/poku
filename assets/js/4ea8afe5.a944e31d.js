"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[8602],{7396:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"documentation/helpers/processes/wait-for-expected-result","title":"Waiting For Expected Results","description":"Similar to assert, but instead of returning an error when comparing, it will retry until success or timeout.","source":"@site/versioned_docs/version-2.x.x/documentation/helpers/processes/wait-for-expected-result.mdx","sourceDirName":"documentation/helpers/processes","slug":"/documentation/helpers/processes/wait-for-expected-result","permalink":"/docs/2.x.x/documentation/helpers/processes/wait-for-expected-result","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/helpers/processes/wait-for-expected-result.mdx","tags":[{"inline":true,"label":"flakey","permalink":"/docs/2.x.x/tags/flakey"},{"inline":true,"label":"containers","permalink":"/docs/2.x.x/tags/containers"}],"version":"2.x.x","sidebarPosition":3,"frontMatter":{"sidebar_position":3,"tags":["flakey","containers"]},"sidebar":"docs","previous":{"title":"Waiting For Ports","permalink":"/docs/2.x.x/documentation/helpers/processes/wait-for-port"},"next":{"title":"Seaching PIDs","permalink":"/docs/2.x.x/documentation/helpers/processes/get-pids"}}');var r=n(4848),o=n(8453),i=n(185);const a={sidebar_position:3,tags:["flakey","containers"]},c="Waiting For Expected Results",l={},d=[{value:"waitForExpectedResult",id:"waitforexpectedresult",level:2},{value:"Examples",id:"examples",level:2}];function u(e){const t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"waiting-for-expected-results",children:"Waiting For Expected Results"})}),"\n",(0,r.jsxs)(t.p,{children:["Similar to ",(0,r.jsx)(t.code,{children:"assert"}),", but instead of returning an error when comparing, it will retry until success or timeout."]}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsx)(t.p,{children:"Wait for connections, external services to be ready, or a specific result from a method before starting the tests."}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"waitforexpectedresult",children:"waitForExpectedResult"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"import { waitForExpectedResult } from 'poku';\n\nawait waitForExpectedResult(() => true, true, {\n  delay: 0,\n  interval: 100,\n  timeout: 60000,\n  strict: false,\n});\n"})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(i.T,{title:"Options",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"export type WaitForExpectedResultOptions = {\n  /**\n   * Retry interval in milliseconds\n   *\n   * ---\n   *\n   * @default 100\n   */\n  interval?: number;\n  /**\n   * Timeout in milliseconds\n   *\n   * ---\n   *\n   * @default 60000\n   */\n  timeout?: number;\n  /**\n   * Delays both the start and end by the defined milliseconds.\n   *\n   * ---\n   *\n   * @default 0\n   */\n  delay?: number;\n  /**\n   * Ensure strict comparisons.\n   *\n   * - For **Bun** users, this option isn't necessary.\n   *\n   * ---\n   *\n   * @default false\n   */\n  strict?: boolean;\n};\n"})})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(t.h2,{id:"examples",children:"Examples"}),"\n",(0,r.jsxs)(t.p,{children:["Waiting for a Database Connection Returning ",(0,r.jsx)(t.code,{children:"true"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"import { waitForExpectedResult } from 'poku';\nimport { db } from './db.js';\n\nawait waitForExpectedResult(() => db.connect(), true);\n// await waitForExpectedResult(async () => await db.connect(), true);\n"})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(t.p,{children:"Waiting for a Database Connection doesn't Throw:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"import { waitForExpectedResult } from 'poku';\nimport { db } from './db.js';\n\nawait waitForExpectedResult(async () => {\n  try {\n    await db.connect();\n    return true;\n  } catch {}\n}, true);\n"})}),"\n",(0,r.jsx)("hr",{}),"\n",(0,r.jsx)(t.p,{children:"Waiting for a database connection from a container before to run the entire test suite and stops it on finishing:"}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Poku"})," ",(0,r.jsx)(t.em,{children:"API"})," example."]}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"import { poku, docker, waitForExpectedResult, exit } from 'poku';\nimport { db } from './db.js';\n\n// Load the docker-compose.yml\nconst compose = docker.compose();\n\n// Starts the container\nawait compose.up();\n\n// Waits for the database\nawait waitForExpectedResult(async () => {\n  try {\n    await db.connect();\n    return true;\n  } catch {}\n}, true);\n\n// Starts the test suite\nconst result = await poku('./test/integration', {\n  noExit: true,\n});\n\n// Stops the container\nawait compose.down();\n\n// Shows the test results and ends the process with the test exit code.\nexit(result);\n"})}),"\n",(0,r.jsxs)("blockquote",{children:[(0,r.jsx)(t.p,{children:"Then:"}),(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-sh",children:"node run.test.js\n"})}),(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-sh",children:"npx tsx run.test.ts\n"})})]}),"\n",(0,r.jsx)(t.admonition,{type:"tip",children:(0,r.jsx)(t.p,{children:(0,r.jsxs)(t.a,{href:"/docs/documentation/helpers/containers#dockerfile",children:["See an example using ",(0,r.jsx)(t.strong,{children:"Dockerfile"}),"."]})})})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},1622:(e,t,n)=>{n.d(t,{A:()=>m});var s=n(6540),r=n(4164),o=n(3427),i=n(2303),a=n(1422);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var l=n(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function u(e,t){return!!e&&(e===t||u(e.parentElement,t))}function p(e){let{summary:t,children:n,...p}=e;(0,o.A)().collectAnchor(p.id);const x=(0,i.A)(),h=(0,s.useRef)(null),{collapsed:m,setCollapsed:f}=(0,a.u)({initialState:!p.open}),[j,w]=(0,s.useState)(p.open),b=s.isValidElement(t)?t:(0,l.jsx)("summary",{children:t??"Details"});return(0,l.jsxs)("details",{...p,ref:h,open:j,"data-collapsed":m,className:(0,r.A)(c.details,x&&c.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;d(t)&&u(t,h.current)&&(e.preventDefault(),m?(f(!1),w(!0)):f(!0))},children:[b,(0,l.jsx)(a.N,{lazy:!1,collapsed:m,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{f(e),w(!e)},children:(0,l.jsx)("div",{className:c.collapsibleContent,children:n})})]})}const x={details:"details_b_Ee"},h="alert alert--info";function m(e){let{...t}=e;return(0,l.jsx)(p,{...t,className:(0,r.A)(h,x.details,t.className)})}},185:(e,t,n)=>{n.d(t,{T:()=>o});var s=n(1622),r=n(4848);const o=e=>{let{children:t,open:n,title:o}=e;return(0,r.jsx)(s.A,{open:n,className:"faq",summary:(0,r.jsx)("summary",{children:(0,r.jsx)("strong",{children:o})}),children:(0,r.jsx)("section",{children:t})})}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>a});var s=n(6540);const r={},o=s.createContext(r);function i(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);