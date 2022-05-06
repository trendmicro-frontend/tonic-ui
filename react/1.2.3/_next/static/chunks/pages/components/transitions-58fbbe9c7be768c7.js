(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[659],{1519:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return p}});var a=n(7896),r=n(59740),l=(n(2784),n(30876)),i=["components"],o={};function p(t){var e=t.components,n=(0,r.Z)(t,i);return(0,l.kt)("wrapper",(0,a.Z)({},o,n,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h1",null,"Transitions"),(0,l.kt)("p",null,"Transition helps make a UI expressive and easy to use."),(0,l.kt)("p",null,"The transition components use ",(0,l.kt)("inlineCode",{parentName:"p"},"react-transition-group")," internally to perform animation effects and manage component states (including mounting and unmounting) over time. You can check out all the transition props at ",(0,l.kt)("a",{parentName:"p",href:"https://reactcommunity.org/react-transition-group/transition/#Transition-props"},"https://reactcommunity.org/react-transition-group/transition/#Transition-props"),". For more information, visit ",(0,l.kt)("a",{parentName:"p",href:"http://reactcommunity.org/react-transition-group/transition"},"http://reactcommunity.org/react-transition-group/transition")," for detailed usage."),(0,l.kt)("h2",null,"Import"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  Collapse, // internally used in `Accordion` and `Menu`\n  Fade, // internally used in `Modal`\n  Grow, // internally used in `Popover` and `Tooltip`\n  Scale,\n  Slide, // internally used in `Drawer`\n  Zoom,\n} from '@tonic-ui/react';\n")),(0,l.kt)("h3",null,"Transition easing & timeout"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"<TransitionComponent\n  easing={{\n    enter: 'ease-in-out',\n    exit: 'cubic-bezier(0.42, 0, 0.58, 1)',\n  }}\n  timeout={{\n    enter: 225,\n    exit: 195,\n  }}\n/>\n")),(0,l.kt)("p",null,"or"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'<TransitionComponent\n  easing="ease-in-out"\n  timeout={300}\n/>\n')),(0,l.kt)("h3",null,"Transition components"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Transition"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Enter Easing"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Exit Easing"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Enter Timeout"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Exit Timeout"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Collapse"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"standard (300ms)"),(0,l.kt)("td",{parentName:"tr",align:"left"},"standard (300ms)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Fade"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"enteringScreen (225ms)"),(0,l.kt)("td",{parentName:"tr",align:"left"},"leavingScreen (195ms)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Grow"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"'auto'"),(0,l.kt)("td",{parentName:"tr",align:"left"},"'auto'")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Scale"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeIn"),(0,l.kt)("td",{parentName:"tr",align:"left"},"150ms"),(0,l.kt)("td",{parentName:"tr",align:"left"},"150ms")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Slide"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"sharp"),(0,l.kt)("td",{parentName:"tr",align:"left"},"enteringScreen (225ms)"),(0,l.kt)("td",{parentName:"tr",align:"left"},"leavingScreen (195ms)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Zoom"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"enteringScreen (225ms)"),(0,l.kt)("td",{parentName:"tr",align:"left"},"leavingScreen (195ms)")))),(0,l.kt)("h3",null,"Transition easing"),(0,l.kt)("p",null,"The timing functions are commonly called ",(0,l.kt)("i",null,"easing functions"),", and can be defined using a predefined keyword value, a stepping function, or a cubic Bezier curve."),(0,l.kt)("p",null,"The following specifies the easing functions that are used internally transition components."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Value"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"easeInOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"'cubic-bezier(0.4, 0, 0.2, 1)'"),(0,l.kt)("td",{parentName:"tr",align:"left"},"This is the most common easing curve.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"easeOut"),(0,l.kt)("td",{parentName:"tr",align:"left"},"'cubic-bezier(0.0, 0, 0.2, 1)'"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Objects enter the screen at full velocity from off-screen and slowly decelerate to a resting point.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"easeIn"),(0,l.kt)("td",{parentName:"tr",align:"left"},"'cubic-bezier(0.4, 0, 1, 1)'"),(0,l.kt)("td",{parentName:"tr",align:"left"},"Objects leave the screen at full velocity. They do not decelerate when off-screen.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"sharp"),(0,l.kt)("td",{parentName:"tr",align:"left"},"'cubic-bezier(0.4, 0, 0.6, 1)'"),(0,l.kt)("td",{parentName:"tr",align:"left"},"The sharp curve is used by objects that may return to the screen at any time.")))),(0,l.kt)("h3",null,"Transition timeout"),(0,l.kt)("p",null,"The duration for the transition, in milliseconds."),(0,l.kt)("p",null,"The following specifies the duration for the transition that is used internally for transition components."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Value"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"shortest"),(0,l.kt)("td",{parentName:"tr",align:"left"},"150ms"),(0,l.kt)("td",{parentName:"tr",align:"left"})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"shorter"),(0,l.kt)("td",{parentName:"tr",align:"left"},"200ms"),(0,l.kt)("td",{parentName:"tr",align:"left"})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"short"),(0,l.kt)("td",{parentName:"tr",align:"left"},"250ms"),(0,l.kt)("td",{parentName:"tr",align:"left"})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"standard"),(0,l.kt)("td",{parentName:"tr",align:"left"},"300ms"),(0,l.kt)("td",{parentName:"tr",align:"left"},"The standard duration for transitions.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"enteringScreen"),(0,l.kt)("td",{parentName:"tr",align:"left"},"225ms"),(0,l.kt)("td",{parentName:"tr",align:"left"},"The duration for the transition when an element is entering the screen.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"leavingScreen"),(0,l.kt)("td",{parentName:"tr",align:"left"},"195ms"),(0,l.kt)("td",{parentName:"tr",align:"left"},"The duration for the transition when an element is leaving the screen.")))),(0,l.kt)("h3",null,"Transition style"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Transition"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Entering"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Entered"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Exiting"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Exited"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Collapse"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"heght: auto;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"heght: auto;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"height: 0")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"height: 0;"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Fade"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"opacity: 1;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"opacity: 1;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"opacity: 0;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"opacity: 0;"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Grow"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"opacity: 1;",(0,l.kt)("br",null),"transform: scale(1, 1);")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"opacity: 1;",(0,l.kt)("br",null),"transform: none;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"opacity: 0;",(0,l.kt)("br",null),"transform: scale(0.75, 0.5625);"),(0,l.kt)("sup",null,(0,l.kt)("inlineCode",{parentName:"td"},"Note: 0.75 x 0.75 = 0.5625"))),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"opacity: 0;",(0,l.kt)("br",null),"transform: scale(0.75, 0.5625);"),(0,l.kt)("sup",null,(0,l.kt)("inlineCode",{parentName:"td"},"Note: 0.75 x 0.75 = 0.5625")))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Scale"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: none;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: none;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: scale(0.95, 0.95);")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: scale(0.95, 0.95)"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Slide"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: none;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: none;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: translateX(+100%); // LEFT",(0,l.kt)("br",null),"transform: translateX(-100%); // RIGHT",(0,l.kt)("br",null),"transform: translateY(+100%); // UP",(0,l.kt)("br",null),"transform: translateY(-100%); // DOWN")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: translateX(+100%); // LEFT",(0,l.kt)("br",null),"transform: translateX(-100%); // RIGHT",(0,l.kt)("br",null),"transform: translateY(+100%); // UP",(0,l.kt)("br",null),"transform: translateY(-100%); // DOWN"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"Zoom"),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: none;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: none;")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: scale(0);")),(0,l.kt)("td",{parentName:"tr",align:"left"},(0,l.kt)("pre",null,"transform: scale(0);"))))),(0,l.kt)("h3",null,"Transition props"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,l.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"appear"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"},"false"),(0,l.kt)("td",{parentName:"tr",align:"left"},"By default the child component does not perform the enter transition when it first mounts, regardless of the value of ",(0,l.kt)("inlineCode",{parentName:"td"},"in"),". If you want this behavior, set both ",(0,l.kt)("inlineCode",{parentName:"td"},"appear")," and ",(0,l.kt)("inlineCode",{parentName:"td"},"in")," to true.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"children"),(0,l.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," (state, props) => ReactNode"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"easing"),(0,l.kt)("td",{parentName:"tr",align:"left"},"string ","|"," { enter?: string, exit?: string }"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"in"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", the component will transition in.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"mountOnEnter"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),', it will "lazy mount" the component on the first ',(0,l.kt)("inlineCode",{parentName:"td"},"in={true}"),". After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify ",(0,l.kt)("inlineCode",{parentName:"td"},"unmountOnExit"),". By default the child component is mounted immediately along with the parent transition component.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"timeout"),(0,l.kt)("td",{parentName:"tr",align:"left"},"number ","|"," { appear?: number, enter?: number, exit?: number }"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:"left"},"unmountOnExit"),(0,l.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,l.kt)("td",{parentName:"tr",align:"left"}),(0,l.kt)("td",{parentName:"tr",align:"left"},"If ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", it will unmount the child component when ",(0,l.kt)("inlineCode",{parentName:"td"},"in={false}")," and the animation has finished. By default the child component stays mounted after it reaches the 'exited' state.")))))}p.isMDXComponent=!0},80816:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/transitions",function(){return n(1519)}])}},function(t){t.O(0,[9774,2888,179],(function(){return e=80816,t(t.s=e);var e}));var e=t.O();_N_E=e}]);