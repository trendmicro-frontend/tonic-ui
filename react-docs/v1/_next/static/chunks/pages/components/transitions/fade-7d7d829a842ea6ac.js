(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9679],{18161:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return m}});var r=t(52322),o=t(45392),i=t(16959),l=t(67569),a=t(49427),c=t(2784),s=t(24231),d=t(20233);function u(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var h=function(){var e,n=function(e){if(Array.isArray(e))return e}(e=(0,a.useToggle)(!1))||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i,l,a=[],c=!0,s=!1;try{for(i=(t=t.call(e)).next;!(c=(r=i.call(t)).done)&&(a.push(r.value),2!==a.length);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return a}}(e,2)||function(e,n){if(e){if("string"==typeof e)return u(e,2);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(e,2)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),t=n[0],r=n[1];return c.createElement(l.Flex,{direction:"column",rowGap:"4x"},c.createElement(l.TextLabel,{display:"inline-flex",alignItems:"center"},c.createElement(l.Switch,{checked:t,onChange:function(){return r()},size:"md"}),c.createElement(l.Space,{width:"2x"}),c.createElement(l.Text,null,"Show")),c.createElement(l.Fade,{in:t,unmountOnExit:!1},c.createElement(d.Z,null,c.createElement(s.Z,null))))};function f(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",a:"a",h2:"h2",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,o.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",id:"main-content",children:["\n","\n",(0,r.jsx)(n.h1,{id:"transitions--fade",children:"Transitions / Fade"}),"\n",(0,r.jsx)(n.p,{children:"Transition helps make a UI expressive and easy to use."}),"\n",(0,r.jsxs)(n.p,{children:["The transition components use ",(0,r.jsx)(n.code,{children:"react-transition-group"})," internally to perform animation effects and manage component states (including mounting and unmounting) over time. You can check out all the transition props at ",(0,r.jsx)(n.a,{href:"https://reactcommunity.org/react-transition-group/transition/#Transition-props",children:"https://reactcommunity.org/react-transition-group/transition/#Transition-props"}),". For more information, visit ",(0,r.jsx)(n.a,{href:"http://reactcommunity.org/react-transition-group/transition",children:"http://reactcommunity.org/react-transition-group/transition"})," for detailed usage."]}),"\n",(0,r.jsxs)(n.h2,{id:"import",children:["Import",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import {\n  Fade, // internally used in `Modal`\n} from '@tonic-ui/react';\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"usage",children:["Usage",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.h3,{id:"fade",children:["Fade",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#fade",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Fade"})," transition is used to animate the opacity of a component."]}),"\n",(0,r.jsx)(i.Z,{component:h,file:{data:'import {\n  Fade,\n  Flex,\n  Space,\n  Switch,\n  Text,\n  TextLabel,\n} from \'@tonic-ui/react\';\nimport { useToggle } from \'@tonic-ui/react-hooks\';\nimport React from \'react\';\nimport SkeletonBlock from \'@/components/SkeletonBlock\';\nimport SkeletonContent from \'@/components/SkeletonContent\';\n\nconst App = () => {\n  const [isOpen, onToggle] = useToggle(false);\n\n  return (\n    <Flex direction="column" rowGap="4x">\n      <TextLabel display="inline-flex" alignItems="center">\n        <Switch checked={isOpen} onChange={() => onToggle()} size="md" />\n        <Space width="2x" />\n        <Text>Show</Text>\n      </TextLabel>\n      <Fade\n        in={isOpen}\n        unmountOnExit={false}\n      >\n        <SkeletonContent>\n          <SkeletonBlock />\n        </SkeletonContent>\n      </Fade>\n    </Flex>\n  );\n};\n\nexport default App;',path:"pages/components/transitions/fade/index.page.mdx"},sandbox:{files:{"src/components/SkeletonBlock.js":'import {\n  Flex,\n  Skeleton,\n} from \'@tonic-ui/react\';\nimport React from \'react\';\n\nconst SkeletonBlock = (props) => (\n  <Flex {...props}>\n    <Flex flex="none" mr="4x" alignItems="center">\n      <Skeleton variant="circle" width="10x" height="10x" />\n    </Flex>\n    <Flex flex="auto" flexDirection="column" rowGap="2x">\n      <Skeleton />\n      <Skeleton />\n      <Skeleton />\n    </Flex>\n  </Flex>\n);\n\nexport default SkeletonBlock;',"src/components/SkeletonContent.js":"import {\n  Box,\n  useColorMode,\n  useColorStyle,\n} from '@tonic-ui/react';\nimport React from 'react';\n\nconst SkeletonContent = (props) => {\n  const [colorMode] = useColorMode();\n  const [colorStyle] = useColorStyle({ colorMode });\n  const styleProps = {\n    light: {\n      color: 'black:primary',\n      bg: 'white',\n      borderWidth: 1,\n      borderStyle: 'solid',\n      borderColor: 'gray:20',\n      boxShadow: colorStyle?.shadow?.thick,\n    },\n    dark: {\n      color: 'white:primary',\n      bg: 'gray:90',\n      borderWidth: 1,\n      borderStyle: 'solid',\n      borderColor: 'gray:80',\n      boxShadow: colorStyle?.shadow?.thick,\n    },\n  }[colorMode];\n\n  return (\n    <Box p=\"4x\" {...styleProps} {...props} />\n  );\n};\n\nexport default SkeletonContent;"},raw:'import {\n  Fade,\n  Flex,\n  Space,\n  Switch,\n  Text,\n  TextLabel,\n} from \'@tonic-ui/react\';\nimport { useToggle } from \'@tonic-ui/react-hooks\';\nimport React from \'react\';\nimport SkeletonBlock from \'@/components/SkeletonBlock\';\nimport SkeletonContent from \'@/components/SkeletonContent\';\n\nconst App = () => {\n  const [isOpen, onToggle] = useToggle(false);\n\n  return (\n    <Flex direction="column" rowGap="4x">\n      <TextLabel display="inline-flex" alignItems="center">\n        <Switch checked={isOpen} onChange={() => onToggle()} size="md" />\n        <Space width="2x" />\n        <Text>Show</Text>\n      </TextLabel>\n      <Fade\n        in={isOpen}\n        unmountOnExit={false}\n      >\n        <SkeletonContent>\n          <SkeletonBlock />\n        </SkeletonContent>\n      </Fade>\n    </Flex>\n  );\n};\n\nexport default App;',title:"Tonic UI"}}),"\n",(0,r.jsxs)(n.h2,{id:"props",children:["Props",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.h3,{id:"fade-1",children:["Fade",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#fade-1",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"appear"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left",children:"false"}),(0,r.jsxs)(n.td,{align:"left",children:["By default the child component does not perform the enter transition when it first mounts, regardless of the value of ",(0,r.jsx)(n.code,{children:"in"}),". If you want this behavior, set both ",(0,r.jsx)(n.code,{children:"appear"})," and ",(0,r.jsx)(n.code,{children:"in"})," to true."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"children"}),(0,r.jsxs)(n.td,{align:"left",children:["ReactNode | ",(0,r.jsx)(n.code,{children:"(state, props) => ReactNode"})]}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"easing"}),(0,r.jsxs)(n.td,{align:"left",children:["string | ",(0,r.jsx)(n.code,{children:"{ enter?: string, exit?: string }"})]}),(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"{ enter: easing.easeInOut, exit: easing.easeInOut }"})}),(0,r.jsx)(n.td,{align:"left",children:"The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"in"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the component will transition in."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"mountOnEnter"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),', it will "lazy mount" the component on the first ',(0,r.jsx)(n.code,{children:"in={true}"}),". After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify ",(0,r.jsx)(n.code,{children:"unmountOnExit"}),". By default the child component is mounted immediately along with the parent transition component."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"timeout"}),(0,r.jsxs)(n.td,{align:"left",children:["number | ",(0,r.jsx)(n.code,{children:"{ appear?: number, enter?: number, exit?: number }"})]}),(0,r.jsx)(n.td,{align:"left",children:(0,r.jsx)(n.code,{children:"{ enter: duration.enterScreen, exit: duration.levingScreen }"})}),(0,r.jsx)(n.td,{align:"left",children:"The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"unmountOnExit"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", it will unmount the child component when ",(0,r.jsx)(n.code,{children:"in={false}"})," and the animation has finished. By default the child component stays mounted after it reaches the 'exited' state."]})]})]})]})]})}var m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,o.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(f,e)})):f(e)}},16959:function(e,n,t){"use strict";t.d(n,{Z:function(){return b}});var r=t(67569),o=t(49427),i=t(5632),l=t(2784),a=t(65245),c=t(16245),s=t(76761),d=t(73205),u=t(98107),h=["size"];function f(){return(f=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var m=(0,l.forwardRef)(function(e,n){var t=e.size,o=function(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,h);return l.createElement(r.SVGIcon,f({size:t,viewBox:"0 0 1024 1024"},o),l.createElement("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"}))});m.displayName="CodeSandboxIcon";var p=t(44285);function x(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i,l,a=[],c=!0,s=!1;try{if(i=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;c=!1}else for(;!(c=(r=i.call(t)).done)&&(a.push(r.value),a.length!==n);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return g(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return g(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}var y={fontFamily:'"SFMono-Medium", "SF Mono", "Segoe UI Mono", Menlo, Consolas, Courier, monospace',fontSize:14,overflowX:"auto"},j=function(e){var n=e.component,t=e.file,h=e.sandbox,f=(0,i.useRouter)(),g=x((0,l.useReducer)(function(e){return!e},!1),2),j=g[0],b=g[1],k=x((0,r.useColorMode)(),1)[0],S={dark:s.y,light:s.q}[k],v=x((0,o.useToggle)(!1),2),w=v[0],E=v[1],C=(0,c.Z)(null==t?void 0:t.data),O=C.onCopy,T=C.hasCopied,F=(0,l.useCallback)(function(){O()},[O]),I=(0,l.useCallback)(function(){(0,d.b)(h)},[h]),A=(0,l.useCallback)(function(){b(),E(!1)},[b,E]);return l.createElement(a.nu,{code:null==t?void 0:t.data,disabled:!0,language:"jsx",theme:S},l.createElement(r.Box,{border:1,borderColor:{dark:"gray:70",light:"gray:30"}[k],p:"4x"},l.createElement(r.Box,{fontSize:"sm",lineHeight:"sm"},l.createElement(l.Fragment,{key:j},l.createElement(n,null)))),l.createElement(r.Flex,{columnGap:"2x",justifyContent:"flex-end",mb:"4x"},l.createElement(p.Z,{"data-track":w?"CodeBlock|hide_source|".concat((0,u.Z)({path:f.pathname})):"CodeBlock|show_source|".concat((0,u.Z)({path:f.pathname})),onClick:E},l.createElement(r.Tooltip,{label:w?"Hide the source":"Show the source"},l.createElement(r.Icon,{icon:"code",size:{sm:"5x",md:"4x"}}))),l.createElement(p.Z,{"data-track":"CodeBlock|copy_source|".concat((0,u.Z)({path:f.pathname})),onClick:F},l.createElement(r.Tooltip,{label:T?"Copied":"Copy the source"},l.createElement(r.Icon,{icon:"file-copy-o",size:{sm:"5x",md:"4x"}}))),l.createElement(p.Z,{"data-track":"CodeBlock|edit_in_codesandbox|".concat(f.pathname),onClick:I},l.createElement(r.Tooltip,{label:"Edit in CodeSandbox"},l.createElement(m,{size:{sm:"5x",md:"4x"}}))),l.createElement(p.Z,{"data-track":"CodeBlock|reset|".concat(f.pathname),onClick:A},l.createElement(r.Tooltip,{label:"Reset the demo"},l.createElement(r.Icon,{icon:"redo",size:{sm:"5x",md:"4x"}})))),l.createElement(r.Fade,{in:w},l.createElement(r.Collapse,{in:w,unmountOnExit:!0},l.createElement(a.uz,{style:y}))))};j.displayName="Demo";var b=j},24231:function(e,n,t){"use strict";var r=t(67569),o=t(2784);n.Z=function(e){return o.createElement(r.Flex,e,o.createElement(r.Flex,{flex:"none",mr:"4x",alignItems:"center"},o.createElement(r.Skeleton,{variant:"circle",width:"10x",height:"10x"})),o.createElement(r.Flex,{flex:"auto",flexDirection:"column",rowGap:"2x"},o.createElement(r.Skeleton,null),o.createElement(r.Skeleton,null),o.createElement(r.Skeleton,null)))}},20233:function(e,n,t){"use strict";var r=t(67569),o=t(2784);function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function l(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i,l,a=[],c=!0,s=!1;try{if(i=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;c=!1}else for(;!(c=(r=i.call(t)).done)&&(a.push(r.value),a.length!==n);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=t.return&&(l=t.return(),Object(l)!==l))return}finally{if(s)throw o}}return a}}(e,n)||function(e,n){if(e){if("string"==typeof e)return a(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return a(e,n)}}(e,n)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=Array(n);t<n;t++)r[t]=e[t];return r}n.Z=function(e){var n,t,a=l((0,r.useColorMode)(),1)[0],c=l((0,r.useColorStyle)({colorMode:a}),1)[0],s={light:{color:"black:primary",bg:"white",borderWidth:1,borderStyle:"solid",borderColor:"gray:20",boxShadow:null==c?void 0:null===(n=c.shadow)||void 0===n?void 0:n.thick},dark:{color:"white:primary",bg:"gray:90",borderWidth:1,borderStyle:"solid",borderColor:"gray:80",boxShadow:null==c?void 0:null===(t=c.shadow)||void 0===t?void 0:t.thick}}[a];return o.createElement(r.Box,i({p:"4x"},s,e))}},55154:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/transitions/fade",function(){return t(18161)}])}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=55154)}),_N_E=e.O()}]);