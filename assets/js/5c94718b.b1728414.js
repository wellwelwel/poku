"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3402],{2457:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"documentation/helpers/containers","title":"\ud83d\udc33 Containers","description":"A minimal API to assist tests that require containers or tests that run inside containers.","source":"@site/docs/documentation/helpers/containers.mdx","sourceDirName":"documentation/helpers","slug":"/documentation/helpers/containers","permalink":"/docs/documentation/helpers/containers","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/helpers/containers.mdx","tags":[{"inline":true,"label":"containers","permalink":"/docs/tags/containers"}],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6,"tags":["containers"]},"sidebar":"docs","previous":{"title":"In-Code","permalink":"/docs/documentation/helpers/before-after-each/in-code"},"next":{"title":"\ud83d\udd01 Start Script","permalink":"/docs/documentation/helpers/startScript"}}');var o=t(4848),i=t(8453),r=t(5397);const a={sidebar_position:6,tags:["containers"]},c="\ud83d\udc33 Containers",l={},d=[{value:"docker",id:"docker",level:2},{value:"compose",id:"compose",level:3},{value:"dockerfile",id:"dockerfile",level:3},{value:"Real Examples",id:"real-examples",level:2}];function h(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"-containers",children:"\ud83d\udc33 Containers"})}),"\n",(0,o.jsxs)(n.p,{children:["A minimal ",(0,o.jsx)(n.em,{children:"API"})," to assist tests that require containers or tests that run inside containers."]}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["This helper assumes that you already have a basic understanding of how ",(0,o.jsx)(n.strong,{children:"Docker"})," works."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"docker",children:"docker"}),"\n",(0,o.jsx)(n.h3,{id:"compose",children:"compose"}),"\n",(0,o.jsxs)(n.p,{children:["Start containers from a ",(0,o.jsx)(n.strong,{children:"docker-compose.yml"})," in background."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { docker } from 'poku';\n\nconst compose = docker.compose();\n\n// Starts the container(s)\nawait compose.up();\n\n/**\n * Tests come here \ud83e\uddea\n */\n\n// Stops the container(s)\nawait compose.down();\n"})}),"\n",(0,o.jsx)(r.T,{title:"Options",children:(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'export type DockerComposeConfigs = {\n  /**\n   * Specifies the **docker-compose.yml** path\n   *\n   * ---\n   *\n   * @default "./docker-compose.yml"\n   */\n  file?: string;\n\n  /**\n   * Specifies the project name.\n   */\n  projectName?: string;\n\n  /**\n   * Specifies a `.env` path to **docker-compose.yml**.\n   */\n  envFile?: string;\n\n  /**\n   * Defines the root directory where the process will run.\n   *\n   * ---\n   *\n   * @default "."\n   */\n  cwd?: string;\n\n  /**\n   * Forces the images (**Dockerfile**) to be rebuilt.\n   */\n  build?: boolean;\n\n  /**\n   * Starts only a specific **docker-compose.yml** service.\n   */\n  serviceName?: string;\n\n  /**\n   * Doesn\'t run the container in the background and returns the container\'s process exit result (boolean).\n   *\n   * - Set to `false` to test whether a container was executed and finished successfully.\n   *\n   * ---\n   *\n   * @default true\n   */\n  detach?: boolean;\n\n  /**\n   * Show logs from **Docker** in real time.\n   */\n  verbose?: boolean;\n};\n'})})}),"\n",(0,o.jsx)("hr",{}),"\n",(0,o.jsx)(n.h3,{id:"dockerfile",children:"dockerfile"}),"\n",(0,o.jsxs)(n.p,{children:["Build and start containers from ",(0,o.jsx)(n.strong,{children:"Dockerfiles"})," in background."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { docker } from 'poku';\n\nconst dockerfile = docker.dockerfile({\n  containerName: 'container-name',\n  tagName: 'image-name',\n});\n\n// Builds the image from the Dockerfile\nawait dockerfile.build();\n\n// Starts the container\nawait dockerfile.start();\n\n/**\n * Tests come here \ud83e\uddea\n */\n\n// Stops and removes both the container and image\nawait dockerfile.remove();\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["You can also use ",(0,o.jsx)(n.code,{children:".stop()"})," to graceful stop the container without removing it."]}),"\n"]}),"\n",(0,o.jsx)(r.T,{title:"Options",children:(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'export type DockerfileConfigs = {\n  /**\n   * Specifies the imange name\n   *\n   * E.g., `"name"`, `"name:tag"`.\n   */\n  tagName: string;\n\n  /**\n   * Specifies the container name.\n   */\n  containerName: string;\n\n  /**\n   * Specifies the **Dockerfile** path\n   *\n   * ---\n   *\n   * @default "./Dockerfile"\n   */\n  file?: string;\n\n  /**\n   * Specifies the context path of the Dockerfile\n   *\n   * - It\'s different from `cwd`.\n   *\n   * ---\n   *\n   * @default "."\n   */\n  context?: string;\n\n  /**\n   * Specifies the ports to expose.\n   *\n   * E.g., `"6000:6000"`, `"8080:80"`, `"127.0.0.1:3306:3306"`.\n   */\n  ports?: string[];\n\n  /**\n   * Specifies the container environments variables.\n   *\n   * E.g, `"VAR1"`, `"VAR1=value1"`\n   */\n  environments?: string[];\n\n  /**\n   * Specifies a `.env` path to **Dockerfile**.\n   */\n  envFile?: string;\n\n  /**\n   * Forces the image build without cache.\n   */\n  cache?: boolean;\n\n  /**\n   * Doesn\'t run the container in the background and returns the container\'s process exit result (boolean).\n   *\n   * - Set to `false` to test whether a container was executed and finished successfully.\n   *\n   * ---\n   *\n   * @default true\n   */\n  detach?: boolean;\n\n  /**\n   * Defines the root directory where the process will run.\n   *\n   * ---\n   *\n   * @default "."\n   */\n  cwd?: string;\n\n  /**\n   * Show logs from **Docker** in real time.\n   */\n  verbose?: boolean;\n};\n'})})}),"\n",(0,o.jsx)("hr",{}),"\n",(0,o.jsx)(n.h2,{id:"real-examples",children:"Real Examples"}),"\n",(0,o.jsxs)(n.p,{children:["Tests performed inside a container (",(0,o.jsx)(n.strong,{children:"docker-compose.yml"}),") in a specific service with customized images (",(0,o.jsx)(n.strong,{children:"Dockerfile"}),"), returning the output, stopping the containers and cleaning up the images:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/wellwelwel/poku/blob/main/test/compatibility/by-docker-compose/node-20.test.ts",children:"test/compatibility/bun-canary.test.ts"})}),"\n"]}),"\n",(0,o.jsx)("hr",{}),"\n",(0,o.jsxs)(n.p,{children:["Tests performed inside a container (",(0,o.jsx)(n.strong,{children:"Dockerfile"}),"), returning the output, stopping the container and cleaning up the image:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/wellwelwel/poku/blob/main/test/compatibility/by-dockerfile/node-20.test.ts",children:"test/compatibility-by-dockerfile/bun-canary.test.ts"})}),"\n"]}),"\n",(0,o.jsx)("hr",{}),"\n",(0,o.jsx)(n.p,{children:"Starts a container before the entire test suite and stops it on finishing:"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Poku"})," ",(0,o.jsx)(n.em,{children:"API"})," example."]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { poku, docker, exit } from 'poku';\n\nconst compose = docker.compose({ cwd: './test/docker' });\n\n// Removes the container if it already exists before to start\nawait compose.down();\n\n// Starts the container\nawait compose.up();\n\nconst result = await poku('./test/integration', {\n  noExit: true,\n});\n\n// Stops the container\nawait compose.down();\n\n// Shows the test results and ends the process with the test exit code.\nexit(result);\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"node run.test.mjs\n"})}),"\n",(0,o.jsx)("hr",{}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.p,{children:["This isn't a complete and robust ",(0,o.jsx)(n.em,{children:"API"})," designed to create an ",(0,o.jsx)(n.em,{children:"ORM"})," for ",(0,o.jsx)(n.strong,{children:"Docker"}),", but a minimal ",(0,o.jsx)(n.strong,{children:"API"})," focused on common ",(0,o.jsx)(n.strong,{children:"integration"})," and ",(0,o.jsx)(n.strong,{children:"end-to-end"})," testing needs."]})})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},6701:(e,n,t)=>{t.d(n,{A:()=>f});var s=t(6540),o=t(4164),i=t(5246),r=t(9136),a=t(3535);const c={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var l=t(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function h(e,n){return!!e&&(e===n||h(e.parentElement,n))}function p(e){let{summary:n,children:t,...p}=e;(0,i.A)().collectAnchor(p.id);const m=(0,r.A)(),u=(0,s.useRef)(null),{collapsed:f,setCollapsed:x}=(0,a.u)({initialState:!p.open}),[g,j]=(0,s.useState)(p.open),k=s.isValidElement(n)?n:(0,l.jsx)("summary",{children:n??"Details"});return(0,l.jsxs)("details",{...p,ref:u,open:g,"data-collapsed":f,className:(0,o.A)(c.details,m&&c.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;d(n)&&h(n,u.current)&&(e.preventDefault(),f?(x(!1),j(!0)):x(!0))},children:[k,(0,l.jsx)(a.N,{lazy:!1,collapsed:f,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{x(e),j(!e)},children:(0,l.jsx)("div",{className:c.collapsibleContent,children:t})})]})}const m={details:"details_b_Ee"},u="alert alert--info";function f(e){let{...n}=e;return(0,l.jsx)(p,{...n,className:(0,o.A)(u,m.details,n.className)})}},5397:(e,n,t)=>{t.d(n,{T:()=>i});var s=t(6701),o=t(4848);const i=e=>{let{children:n,open:t,title:i}=e;return(0,o.jsx)(s.A,{open:t,className:"faq",summary:(0,o.jsx)("summary",{children:(0,o.jsx)("strong",{children:i})}),children:(0,o.jsx)("section",{children:n})})}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var s=t(6540);const o={},i=s.createContext(o);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);