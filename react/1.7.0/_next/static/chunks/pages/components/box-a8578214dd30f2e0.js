(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1045],{2071:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return B}});var o=n(7896),r=n(9740),a=n(2784),i=n(876),s=n(2215),l=n(1171),p=n(8165),u=n(3921),c=n(5081),x=["size"],d=a.createContext(),m=function(t){var e=t.size,n=(0,r.Z)(t,x);return(e=Number(e)||0)<0&&(e=0),(0,p.tZ)(d.Provider,{value:e},(0,p.tZ)(f,n))},f=function(t){var e=(0,a.useContext)(d);return(0,p.tZ)(u.Box,(0,o.Z)({position:"relative",width:e,height:e,my:0,mx:"auto",transformStyle:"preserve-3d"},t))},g=function(t){var e=(0,u.useColorMode)(),n=(0,s.Z)(e,1)[0],r="dark"===n?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)",a="dark"===n?"dark.sm":"light.sm";return(0,p.tZ)(u.Box,(0,o.Z)({position:"absolute",top:0,right:0,bottom:0,left:0,backgroundColor:r,boxShadow:a,display:"flex",justifyContent:"center",alignItems:"center",backfaceVisibility:"hidden"},t))};m.Front=function(t){var e=(0,a.useContext)(d);return(0,p.tZ)(g,(0,o.Z)({transform:"translateZ(".concat(e/2,"px)")},t))},m.Back=function(t){var e=(0,a.useContext)(d);return(0,p.tZ)(g,(0,o.Z)({transform:"translateZ(-".concat(e/2,"px) rotateY(180deg)")},t))},m.Top=function(t){var e=(0,a.useContext)(d);return(0,p.tZ)(g,(0,o.Z)({transform:"rotateX(-90deg) translateY(-".concat(e/2,"px)"),transformOrigin:"top center"},t))},m.Bottom=function(t){var e=(0,a.useContext)(d);return(0,p.tZ)(g,(0,o.Z)({transform:"rotateX(90deg) translateY(".concat(e/2,"px)"),transformOrigin:"bottom center"},t))},m.Left=function(t){var e=(0,a.useContext)(d);return(0,p.tZ)(g,(0,o.Z)({transform:"rotateY(270deg) translateX(-".concat(e/2,"px)"),transformOrigin:"center left"},t))},m.Right=function(t){var e=(0,a.useContext)(d);return(0,p.tZ)(g,(0,o.Z)({transform:"rotateY(-270deg) translateX(".concat(e/2,"px)"),transformOrigin:"top right"},t))};var Z,h=m,k=["size"],y=(0,c.Zs)("/tonic-ui/react/1.7.0"),b=(0,p.F4)(Z||(Z=(0,l.Z)(["\n  from { transform: rotateY(360deg); }\n  to { transform: rotateY(0deg); }\n"]))),v=function(t){var e=t.size,n=void 0===e?128:e,a=(0,r.Z)(t,k),i=(0,u.useColorMode)(),l=(0,s.Z)(i,1)[0],c="dark"===l?"\n      -1px -1px 2px rgba(0,0,0,.4),\n      1px -1px 2px rgba(0,0,0,.4),\n      -1px 1px 2px rgba(0,0,0,.4),\n      1px 1px 2px rgba(0,0,0,.4)\n      ":"none";return(0,p.tZ)(u.Box,(0,o.Z)({display:"inline-block",py:"16x",px:"8x",perspective:"100vw",perspectiveOrigin:"center 250%"},a),(0,p.tZ)(h,{animation:"".concat(b," 8s infinite linear"),size:n},(0,p.tZ)(h.Front,{backgroundColor:"white"},(0,p.tZ)(u.Image,{alt:"",src:"".concat(y,"/images/Trend-Micro-Logo.svg"),width:"80%"})),(0,p.tZ)(h.Back,null,(0,p.tZ)(u.Box,{textShadow:c},"dark"===l&&(0,p.tZ)(u.Flex,{direction:"column",spacing:"3x"},(0,p.tZ)(u.Icon,{icon:"moon",size:24,mx:"auto"}),(0,p.tZ)(u.Text,null,"Dark Mode")),"light"===l&&(0,p.tZ)(u.Flex,{direction:"column",spacing:"3x"},(0,p.tZ)(u.Icon,{icon:"sun",size:24,mx:"auto"}),(0,p.tZ)(u.Text,null,"Light Mode")))),(0,p.tZ)(h.Top,{backfaceVisibility:"visible"}),(0,p.tZ)(h.Bottom,{backfaceVisibility:"visible"}),(0,p.tZ)(h.Left,null,(0,p.tZ)(u.Text,{fontSize:"2xl",fontWeight:"semibold",textShadow:c},"Box")),(0,p.tZ)(h.Right,null,(0,p.tZ)(u.Text,{fontSize:"lg",textShadow:c},"Tonic UI"))))},C=["components"],w={};function B(t){var e=t.components,n=(0,r.Z)(t,C);return(0,i.kt)("wrapper",(0,o.Z)({},w,n,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("h1",null,"Box"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Box")," component serves as a wrapper component for most of the CSS utility needs. It allows you to control styling using style props to build a variety of components."),(0,i.kt)(v,{mdxType:"AnimatedCubeDemo"}),(0,i.kt)("h2",null,"Import"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import { Box } from '@tonic-ui/react';\n")),(0,i.kt)("h2",null,"Usage"),(0,i.kt)("h3",null,"The ",(0,i.kt)("inlineCode",{parentName:"h3"},"as")," prop"),(0,i.kt)("p",null,"By default, the ",(0,i.kt)("inlineCode",{parentName:"p"},"Box")," component renders a ",(0,i.kt)("inlineCode",{parentName:"p"},"div")," element. There might be cases where you want to render a different element, you can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"as")," prop to do that."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Box\n  as="button"\n  backgroundColor="blue:70"\n  color="white:primary"\n  border="none"\n  borderRadius="sm"\n  cursor="pointer"\n  px="2x"\n  py="1x"\n>\n  Button\n</Box>\n')),(0,i.kt)("h3",null,"Using style props"),(0,i.kt)("p",null,"See the ",(0,i.kt)("a",{parentName:"p",href:"../styled-system/style-props"},"Styled Props")," page to learn how to use style props."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'<Box\n  backgroundColor="blue:50"\n  color="black:primary"\n  display="inline-flex"\n  px="4x"\n  py="3x"\n  fontSize="xl"\n  lineHeight="xl"\n>\n  My component\n</Box>\n')),(0,i.kt)("h3",null,"Using pseudo style props"),(0,i.kt)("p",null,"See the ",(0,i.kt)("a",{parentName:"p",href:"../styled-system/pseudo-style-props"},"Pseudo Styled Props")," page to learn how to use pseudo style props."))}B.isMDXComponent=!0},1250:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/box",function(){return n(2071)}])}},function(t){t.O(0,[9774,2888,179],(function(){return e=1250,t(t.s=e);var e}));var e=t.O();_N_E=e}]);