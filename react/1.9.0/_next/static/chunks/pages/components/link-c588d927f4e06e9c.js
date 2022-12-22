(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6572],{6420:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return c}});t(2784);var r=t(876),a=["components"];function i(){return i=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},i.apply(this,arguments)}function l(n,e){if(null==n)return{};var t,r,a=function(n,e){if(null==n)return{};var t,r,a={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(a[t]=n[t]);return a}(n,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(a[t]=n[t])}return a}var o={};function c(n){var e=n.components,t=l(n,a);return(0,r.kt)("wrapper",i({},o,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",null,"Link"),(0,r.kt)("p",null,"Links are accessible elements used primarily for navigation. This component is styled to resemble a hyperlink and semantically renders an ",(0,r.kt)("inlineCode",{parentName:"p"},"<a>"),"."),(0,r.kt)("h2",null,"Import"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { Link } from '@tonic-ui/react';\n")),(0,r.kt)("h2",null,"Usage"),(0,r.kt)("h3",null,"Default"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Link\n  href="https://github.com/trendmicro-frontend"\n>\n  Trend Micro Frontend\n</Link>\n')),(0,r.kt)("h3",null,"Underlined link"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Link\n  href="https://github.com/trendmicro-frontend"\n  textDecoration="underline"\n>\n  Trend Micro Frontend\n</Link>\n')),(0,r.kt)("h3",null,"Link with icon"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack shouldWrapChildren direction="column" spacing="2x">\n  <Link\n    href="https://github.com/trendmicro-frontend"\n  >\n    <Icon icon="t-ball"/>\n    <Space width="2x" />\n    Trend Micro Frontend\n  </Link>\n  <Link\n    href="https://github.com/trendmicro-frontend"\n    textDecoration="underline"\n  >\n    <Icon icon="t-ball"/>\n    <Space width="2x" />\n    Trend Micro Frontend\n  </Link>\n</Stack>\n')),(0,r.kt)("h3",null,"Link with ",(0,r.kt)("inlineCode",{parentName:"h3"},"disabled")," attribute"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Stack shouldWrapChildren direction="column" spacing="2x">\n  <Link\n    href="https://github.com/trendmicro-frontend"\n    disabled\n  >\n    Trend Micro Frontend\n  </Link>\n  <Link\n    href="https://github.com/trendmicro-frontend"\n    textDecoration="underline"\n    disabled\n  >\n    Trend Micro Frontend\n  </Link>\n</Stack>\n')),(0,r.kt)("h3",null,"Link to another page"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<Link\n  href="https://github.com/trendmicro-frontend"\n  target="_blank"\n  rel="noopener noreferrer"\n>\n  Trend Micro Frontend\n</Link>\n')),(0,r.kt)("p",null,"You can also create an\xa0",(0,r.kt)("inlineCode",{parentName:"p"},"ExternalLink"),"\xa0component for enhanced usability."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"noInline",noInline:!0},'const ExternalLink = React.forwardRef((props, ref) => (\n  <Link\n    ref={ref}\n    target="_blank"\n    rel="noopener noreferrer"\n    {...props}\n  />\n));\n\nrender(\n  <ExternalLink href="https://github.com/trendmicro-frontend/tonic-ui">\n    Open link in new window\n    <Space width="2x" />\n    <Icon icon="external-link"/>\n  </ExternalLink>\n);\n')),(0,r.kt)("h2",null,"Props"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"disabled"),(0,r.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"If ",(0,r.kt)("inlineCode",{parentName:"td"},"true"),", the link will be disabled. This sets ",(0,r.kt)("inlineCode",{parentName:"td"},"aria-disabled=true")," and you can style this state by using the ",(0,r.kt)("inlineCode",{parentName:"td"},"_disabled")," prop.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"onClick"),(0,r.kt)("td",{parentName:"tr",align:"left"},"function"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"A callback called when the link is clicked.")))))}c.isMDXComponent=!0},7210:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/link",function(){return t(6420)}])}},function(n){n.O(0,[9774,2888,179],(function(){return e=7210,n(n.s=e);var e}));var e=n.O();_N_E=e}]);