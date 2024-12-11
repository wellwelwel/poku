/*! For license information please see 0175a18c.85aa7047.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[4631],{6214:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"documentation/poku/include-files","title":"\ud83d\udce6 Include Directories and Files","description":"By default, Poku searches for .test. and .spec. files, but you can customize it using the filter option.","source":"@site/docs/documentation/poku/include-files.mdx","sourceDirName":"documentation/poku","slug":"/documentation/poku/include-files","permalink":"/docs/documentation/poku/include-files","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/docs/documentation/poku/include-files.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"docs","previous":{"title":"\ud83d\udc37 Poku","permalink":"/docs/category/-poku"},"next":{"title":"\u2699\ufe0f Config Files","permalink":"/docs/documentation/poku/config-files"}}');var l=t(4848),a=t(8453),i=t(8215);t(2467);const r={sidebar_position:1},o="\ud83d\udce6 Include Directories and Files",c={},d=[{value:"CLI",id:"cli",level:2},{value:"Common usage",id:"common-usage",level:3},{value:"By setting multiple paths",id:"by-setting-multiple-paths",level:3},{value:"By extending Glob patterns from shell",id:"by-extending-glob-patterns-from-shell",level:3},{value:"API",id:"api",level:2}];function h(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"-include-directories-and-files",children:"\ud83d\udce6 Include Directories and Files"})}),"\n",(0,l.jsxs)(n.p,{children:["By default, ",(0,l.jsx)(n.strong,{children:"Poku"})," searches for ",(0,l.jsx)(n.em,{children:(0,l.jsx)(n.code,{children:".test."})})," and ",(0,l.jsx)(n.code,{children:".spec."})," files, but you can customize it using the ",(0,l.jsx)(n.a,{href:"/docs/documentation/poku/options/filter",children:(0,l.jsx)(n.code,{children:"filter"})})," option."]}),"\n",(0,l.jsx)(i.B,{records:[{version:"2.1.0",changes:[(0,l.jsx)(l.Fragment,{children:"Support for multiple paths in any order."}),(0,l.jsxs)(l.Fragment,{children:["Deprecate ",(0,l.jsx)(n.code,{children:"--include"})," flag."]}),(0,l.jsx)(l.Fragment,{children:"Maintains retroactive support for multiple comma-separated paths to avoid breaking changes."})]}]}),"\n",(0,l.jsx)(n.h2,{id:"cli",children:"CLI"}),"\n",(0,l.jsx)(n.h3,{id:"common-usage",children:"Common usage"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# Same as ./\nnpx poku\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Run all tests in parallel."}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"# Same as ./\nnpx poku --sequential\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Run all tests sequentially."}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku ./test\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Run all tests in ",(0,l.jsx)(n.code,{children:"./test"})," directory."]}),"\n"]}),"\n",(0,l.jsx)(n.admonition,{type:"tip",children:(0,l.jsx)(n.p,{children:"You can pass both directories and files."})}),"\n",(0,l.jsx)(n.admonition,{type:"note",children:(0,l.jsxs)(n.p,{children:["It's not possible to run tests in the ",(0,l.jsx)(n.code,{children:".git"})," and ",(0,l.jsx)(n.code,{children:"node_modules"})," directories."]})}),"\n",(0,l.jsx)("hr",{}),"\n",(0,l.jsx)(n.h3,{id:"by-setting-multiple-paths",children:"By setting multiple paths"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx poku targetPathA targetPathB\n"})}),"\n",(0,l.jsx)("hr",{}),"\n",(0,l.jsx)(n.h3,{id:"by-extending-glob-patterns-from-shell",children:"By extending Glob patterns from shell"}),"\n",(0,l.jsxs)(n.p,{children:["You can also extend ",(0,l.jsx)(n.strong,{children:"Glob patterns"})," with ",(0,l.jsx)(n.code,{children:"npx"}),", ",(0,l.jsx)(n.code,{children:"bun"}),", ",(0,l.jsx)(n.code,{children:"yarn"}),", etc."]}),"\n",(0,l.jsxs)(n.p,{children:["For example, by running all the unit tests of a ",(0,l.jsx)(n.em,{children:"monorepo"}),":"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sh",children:"npx poku ./packages/**/test/unit\n"})}),"\n",(0,l.jsxs)(n.p,{children:["Now, listing all ",(0,l.jsx)(n.code,{children:".js"})," files instead of the default ",(0,l.jsx)(n.code,{children:".test.|.spec."}),":"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sh",children:"npx poku --filter='.js' ./packages/**/test/unit\n"})}),"\n",(0,l.jsx)(n.p,{children:"Also, by bypassing the filter:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-sh",children:"npx poku --filter='' ./packages/**/test/unit/*.js\n"})}),"\n",(0,l.jsx)("hr",{}),"\n",(0,l.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,l.jsxs)(n.blockquote,{children:["\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.code,{children:"poku(targetPaths: string | string[])"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"await poku('targetPath');\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"await poku(['targetPathA', 'targetPathB']);\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"await poku('./');\n"})}),"\n",(0,l.jsxs)("blockquote",{children:[(0,l.jsx)(n.p,{children:"Then, run the file directly with the preferred platform, for example:"}),(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"node test/run.test.js\n"})}),(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npx tsx test/run.test.ts\n"})})]})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},1622:(e,n,t)=>{t.d(n,{A:()=>m});var s=t(6540),l=t(4164),a=t(3427),i=t(2303),r=t(1422);const o={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=t(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function h(e,n){return!!e&&(e===n||h(e.parentElement,n))}function p(e){let{summary:n,children:t,...p}=e;(0,a.A)().collectAnchor(p.id);const u=(0,i.A)(),x=(0,s.useRef)(null),{collapsed:m,setCollapsed:j}=(0,r.u)({initialState:!p.open}),[g,k]=(0,s.useState)(p.open),y=s.isValidElement(n)?n:(0,c.jsx)("summary",{children:n??"Details"});return(0,c.jsxs)("details",{...p,ref:x,open:g,"data-collapsed":m,className:(0,l.A)(o.details,u&&o.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const n=e.target;d(n)&&h(n,x.current)&&(e.preventDefault(),m?(j(!1),k(!0)):j(!0))},children:[y,(0,c.jsx)(r.N,{lazy:!1,collapsed:m,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{j(e),k(!e)},children:(0,c.jsx)("div",{className:o.collapsibleContent,children:t})})]})}const u={details:"details_b_Ee"},x="alert alert--info";function m(e){let{...n}=e;return(0,c.jsx)(p,{...n,className:(0,l.A)(x,u.details,n.className)})}},8215:(e,n,t)=>{t.d(n,{B:()=>i});var s=t(1622);const l=(0,t(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var a=t(4848);const i=e=>{let{records:n,open:t}=e;return(0,a.jsx)(s.A,{open:t,summary:(0,a.jsxs)("summary",{children:[(0,a.jsx)(l,{})," History"]}),className:"history",children:(0,a.jsxs)("table",{children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:"Version"}),(0,a.jsx)("th",{children:"Changes"})]})}),(0,a.jsx)("tbody",{children:n.map(((e,n)=>(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{children:(0,a.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,a.jsx)("td",{children:(0,a.jsx)("div",{className:"changes",children:e.changes.map(((e,n)=>(0,a.jsx)("section",{children:e},`change:${n}`)))})})]},`record:${n}`)))})]})})}},2467:(e,n,t)=>{t.d(n,{k:()=>h});var s=t(4722);const l=(0,s.A)("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),a=(0,s.A)("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]),i=(0,s.A)("Microscope",[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]]),r=(0,s.A)("PackageSearch",[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}],["circle",{cx:"18.5",cy:"15.5",r:"2.5",key:"b5zd12"}],["path",{d:"M20.27 17.27 22 19",key:"1l4muz"}]]),o=(0,s.A)("PackageCheck",[["path",{d:"m16 16 2 2 4-4",key:"gfu2re"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]),c=(0,s.A)("LightbulbOff",[["path",{d:"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5",key:"1fkcox"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5",key:"10m8kw"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);var d=t(4848);const h=e=>{let{level:n,message:t}=e;const s={0:{title:"Deprecated",icon:(0,d.jsx)(l,{})},1:{title:"Experimental",icon:(0,d.jsx)(a,{})},1.1:{title:"Early Development",icon:(0,d.jsx)(i,{})},1.2:{title:"Release Candidate",icon:(0,d.jsx)(r,{})},2:{title:"Stable",icon:(0,d.jsx)(o,{})},3:{title:"Legacy",icon:(0,d.jsx)(c,{})}};return(0,d.jsxs)("section",{className:"stability","data-level":n,children:[(0,d.jsxs)("header",{children:[(0,d.jsx)("strong",{children:n}),(0,d.jsx)("span",{children:s[n].title}),s[n].icon]}),t?(0,d.jsx)("p",{children:t}):null]})}},4722:(e,n,t)=>{t.d(n,{A:()=>r});var s=t(6540);const l=(...e)=>e.filter(((e,n,t)=>Boolean(e)&&""!==e.trim()&&t.indexOf(e)===n)).join(" ").trim();var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const i=(0,s.forwardRef)((({color:e="currentColor",size:n=24,strokeWidth:t=2,absoluteStrokeWidth:i,className:r="",children:o,iconNode:c,...d},h)=>(0,s.createElement)("svg",{ref:h,...a,width:n,height:n,stroke:e,strokeWidth:i?24*Number(t)/Number(n):t,className:l("lucide",r),...d},[...c.map((([e,n])=>(0,s.createElement)(e,n))),...Array.isArray(o)?o:[o]]))),r=(e,n)=>{const t=(0,s.forwardRef)((({className:t,...a},r)=>{return(0,s.createElement)(i,{ref:r,iconNode:n,className:l(`lucide-${o=e,o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,t),...a});var o}));return t.displayName=`${e}`,t}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>r});var s=t(6540);const l={},a=s.createContext(l);function i(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);