/*! For license information please see f0d38772.56a87068.js.LICENSE.txt */
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[1150],{2982:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"documentation/poku/options/enforce","title":"enforce","description":"Ensures that the execution is valid and safe before proceeding with the tests.","source":"@site/versioned_docs/version-2.x.x/documentation/poku/options/enforce.mdx","sourceDirName":"documentation/poku/options","slug":"/documentation/poku/options/enforce","permalink":"/docs/documentation/poku/options/enforce","draft":false,"unlisted":false,"editUrl":"https://github.com/wellwelwel/poku/tree/main/website/versioned_docs/version-2.x.x/documentation/poku/options/enforce.mdx","tags":[],"version":"2.x.x","sidebarPosition":10,"frontMatter":{"sidebar_position":10},"sidebar":"docs","previous":{"title":"watch","permalink":"/docs/documentation/poku/options/watch"},"next":{"title":"deno","permalink":"/docs/documentation/poku/options/deno"}}');var o=n(4848),i=n(8453),r=n(8215),a=n(2467);const l={sidebar_position:10},c="enforce",d={},h=[{value:"CLI",id:"cli",level:2}];function p(e){const t={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",input:"input",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"enforce",children:(0,o.jsx)(t.code,{children:"enforce"})})}),"\n",(0,o.jsx)(t.p,{children:"Ensures that the execution is valid and safe before proceeding with the tests."}),"\n",(0,o.jsx)(a.k,{level:1.1}),"\n",(0,o.jsx)(r.B,{records:[{version:"2.5.0",changes:[(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.strong,{children:"CLI:"})," Add ",(0,o.jsx)(t.code,{children:"enforce"})," option."]})]}]}),"\n",(0,o.jsxs)(t.ul,{className:"contains-task-list",children:["\n",(0,o.jsxs)(t.li,{className:"task-list-item",children:[(0,o.jsx)(t.input,{type:"checkbox",checked:!0,disabled:!0})," ","Forces an error if any ",(0,o.jsx)(t.em,{children:"CLI"})," flags are invalid."]}),"\n",(0,o.jsxs)(t.li,{className:"task-list-item",children:[(0,o.jsx)(t.input,{type:"checkbox",disabled:!0})," ","Forces an error if no file is found ",(0,o.jsx)(t.em,{children:"(soon)"}),"."]}),"\n",(0,o.jsxs)(t.li,{className:"task-list-item",children:[(0,o.jsx)(t.input,{type:"checkbox",disabled:!0})," ","Forces an error if the environment has multiple platforms and the ",(0,o.jsx)(t.code,{children:"--platform"})," option isn't explicit ",(0,o.jsx)(t.em,{children:"(soon)"}),"."]}),"\n"]}),"\n",(0,o.jsx)(t.h2,{id:"cli",children:"CLI"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:"npx poku --enforce ./test\n"})}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["Short flag: ",(0,o.jsx)(t.code,{children:"-x"}),"."]}),"\n"]}),"\n",(0,o.jsx)(t.admonition,{type:"info",children:(0,o.jsx)(t.p,{children:"This feature will be included in the configuration file when the development stage is stable."})})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},1622:(e,t,n)=>{n.d(t,{A:()=>x});var s=n(6540),o=n(4164),i=n(3427),r=n(2303),a=n(1422);const l={details:"details_lb9f",isBrowser:"isBrowser_bmU9",collapsibleContent:"collapsibleContent_i85q"};var c=n(4848);function d(e){return!!e&&("SUMMARY"===e.tagName||d(e.parentElement))}function h(e,t){return!!e&&(e===t||h(e.parentElement,t))}function p(e){let{summary:t,children:n,...p}=e;(0,i.A)().collectAnchor(p.id);const u=(0,r.A)(),m=(0,s.useRef)(null),{collapsed:x,setCollapsed:k}=(0,a.u)({initialState:!p.open}),[f,j]=(0,s.useState)(p.open),y=s.isValidElement(t)?t:(0,c.jsx)("summary",{children:t??"Details"});return(0,c.jsxs)("details",{...p,ref:m,open:f,"data-collapsed":x,className:(0,o.A)(l.details,u&&l.isBrowser,p.className),onMouseDown:e=>{d(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;d(t)&&h(t,m.current)&&(e.preventDefault(),x?(k(!1),j(!0)):k(!0))},children:[y,(0,c.jsx)(a.N,{lazy:!1,collapsed:x,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{k(e),j(!e)},children:(0,c.jsx)("div",{className:l.collapsibleContent,children:n})})]})}const u={details:"details_b_Ee"},m="alert alert--info";function x(e){let{...t}=e;return(0,c.jsx)(p,{...t,className:(0,o.A)(m,u.details,t.className)})}},8215:(e,t,n)=>{n.d(t,{B:()=>r});var s=n(1622);const o=(0,n(4722).A)("FileClock",[["path",{d:"M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"37hlfg"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"8",cy:"16",r:"6",key:"10v15b"}],["path",{d:"M9.5 17.5 8 16.25V14",key:"1o80t2"}]]);var i=n(4848);const r=e=>{let{records:t,open:n}=e;return(0,i.jsx)(s.A,{open:n,summary:(0,i.jsxs)("summary",{children:[(0,i.jsx)(o,{})," History"]}),className:"history",children:(0,i.jsxs)("table",{children:[(0,i.jsx)("thead",{children:(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:"Version"}),(0,i.jsx)("th",{children:"Changes"})]})}),(0,i.jsx)("tbody",{children:t.map(((e,t)=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsxs)("strong",{children:["v",e.version.replace(/[^0-9.]/g,"")]})}),(0,i.jsx)("td",{children:(0,i.jsx)("div",{className:"changes",children:e.changes.map(((e,t)=>(0,i.jsx)("section",{children:e},`change:${t}`)))})})]},`record:${t}`)))})]})})}},2467:(e,t,n)=>{n.d(t,{k:()=>h});var s=n(4722);const o=(0,s.A)("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),i=(0,s.A)("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]),r=(0,s.A)("Microscope",[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]]),a=(0,s.A)("PackageSearch",[["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}],["circle",{cx:"18.5",cy:"15.5",r:"2.5",key:"b5zd12"}],["path",{d:"M20.27 17.27 22 19",key:"1l4muz"}]]),l=(0,s.A)("PackageCheck",[["path",{d:"m16 16 2 2 4-4",key:"gfu2re"}],["path",{d:"M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",key:"e7tb2h"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["line",{x1:"12",x2:"12",y1:"22",y2:"12",key:"a4e8g8"}]]),c=(0,s.A)("LightbulbOff",[["path",{d:"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5",key:"1fkcox"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5",key:"10m8kw"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);var d=n(4848);const h=e=>{let{level:t,message:n}=e;const s={0:{title:"Deprecated",icon:(0,d.jsx)(o,{})},1:{title:"Experimental",icon:(0,d.jsx)(i,{})},1.1:{title:"Early Development",icon:(0,d.jsx)(r,{})},1.2:{title:"Release Candidate",icon:(0,d.jsx)(a,{})},2:{title:"Stable",icon:(0,d.jsx)(l,{})},3:{title:"Legacy",icon:(0,d.jsx)(c,{})}};return(0,d.jsxs)("section",{className:"stability","data-level":t,children:[(0,d.jsxs)("header",{children:[(0,d.jsx)("strong",{children:t}),(0,d.jsx)("span",{children:s[t].title}),s[t].icon]}),n?(0,d.jsx)("p",{children:n}):null]})}},4722:(e,t,n)=>{n.d(t,{A:()=>a});var s=n(6540);const o=(...e)=>e.filter(((e,t,n)=>Boolean(e)&&""!==e.trim()&&n.indexOf(e)===t)).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const r=(0,s.forwardRef)((({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:a="",children:l,iconNode:c,...d},h)=>(0,s.createElement)("svg",{ref:h,...i,width:t,height:t,stroke:e,strokeWidth:r?24*Number(n)/Number(t):n,className:o("lucide",a),...d},[...c.map((([e,t])=>(0,s.createElement)(e,t))),...Array.isArray(l)?l:[l]]))),a=(e,t)=>{const n=(0,s.forwardRef)((({className:n,...i},a)=>{return(0,s.createElement)(r,{ref:a,iconNode:t,className:o(`lucide-${l=e,l.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,n),...i});var l}));return n.displayName=`${e}`,n}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>a});var s=n(6540);const o={},i=s.createContext(o);function r(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);