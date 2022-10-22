(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8031],{8977:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return p}});var a=n(7896),i=n(9740),r=(n(2784),n(876)),o=["components"],l={};function p(t){var e=t.components,n=(0,i.Z)(t,o);return(0,r.kt)("wrapper",(0,a.Z)({},l,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",null,"Transitions / Grow"),(0,r.kt)("p",null,"Transition helps make a UI expressive and easy to use."),(0,r.kt)("p",null,"The transition components use ",(0,r.kt)("inlineCode",{parentName:"p"},"react-transition-group")," internally to perform animation effects and manage component states (including mounting and unmounting) over time. You can check out all the transition props at ",(0,r.kt)("a",{parentName:"p",href:"https://reactcommunity.org/react-transition-group/transition/#Transition-props"},"https://reactcommunity.org/react-transition-group/transition/#Transition-props"),". For more information, visit ",(0,r.kt)("a",{parentName:"p",href:"http://reactcommunity.org/react-transition-group/transition"},"http://reactcommunity.org/react-transition-group/transition")," for detailed usage."),(0,r.kt)("h2",null,"Import"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  Grow, // internally used in `Popover` and `Tooltip`\n} from '@tonic-ui/react';\n")),(0,r.kt)("h2",null,"Usage"),(0,r.kt)("h3",null,"Grow"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Grow")," transition is used to animate the width and height of a component."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'function Example() {\n  const [isOpen, onToggle] = useToggle(false);\n\n  return (\n    <Flex direction="column" rowGap="4x">\n      <TextLabel display="inline-flex" alignItems="center">\n        <Switch checked={isOpen} onChange={() => onToggle()} size="md" />\n        <Space width="2x" />\n        <Text>Show</Text>\n      </TextLabel>\n      <Grow\n        in={isOpen}\n        unmountOnExit={false}\n      >\n        <SkeletonContent>\n          <SkeletonBody />\n        </SkeletonContent>\n      </Grow>\n    </Flex>\n  );\n}\n')),(0,r.kt)("h2",null,"Props"),(0,r.kt)("h3",null,"Grow"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Default"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"appear"),(0,r.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.kt)("td",{parentName:"tr",align:"left"},"false"),(0,r.kt)("td",{parentName:"tr",align:"left"},"By default the child component does not perform the enter transition when it first mounts, regardless of the value of ",(0,r.kt)("inlineCode",{parentName:"td"},"in"),". If you want this behavior, set both ",(0,r.kt)("inlineCode",{parentName:"td"},"appear")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"in")," to true.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"children"),(0,r.kt)("td",{parentName:"tr",align:"left"},"ReactNode ","|"," (state, props) => ReactNode"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"easing"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string ","|"," { enter?: string, exit?: string }"),(0,r.kt)("td",{parentName:"tr",align:"left"},"{ enter: easing.easeInOut, exit: easing.easeInOut }"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"in"),(0,r.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"If ",(0,r.kt)("inlineCode",{parentName:"td"},"true"),", the component will transition in.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"mountOnEnter"),(0,r.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"If ",(0,r.kt)("inlineCode",{parentName:"td"},"true"),', it will "lazy mount" the component on the first ',(0,r.kt)("inlineCode",{parentName:"td"},"in={true}"),". After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify ",(0,r.kt)("inlineCode",{parentName:"td"},"unmountOnExit"),". By default the child component is mounted immediately along with the parent transition component.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"timeout"),(0,r.kt)("td",{parentName:"tr",align:"left"},"string ","|"," number ","|"," { appear?: number, enter?: number, exit?: number }"),(0,r.kt)("td",{parentName:"tr",align:"left"},"'auto'"),(0,r.kt)("td",{parentName:"tr",align:"left"},"The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},"unmountOnExit"),(0,r.kt)("td",{parentName:"tr",align:"left"},"boolean"),(0,r.kt)("td",{parentName:"tr",align:"left"}),(0,r.kt)("td",{parentName:"tr",align:"left"},"If ",(0,r.kt)("inlineCode",{parentName:"td"},"true"),", it will unmount the child component when ",(0,r.kt)("inlineCode",{parentName:"td"},"in={false}")," and the animation has finished. By default the child component stays mounted after it reaches the 'exited' state.")))))}p.isMDXComponent=!0},5586:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/transitions/grow",function(){return n(8977)}])}},function(t){t.O(0,[9774,2888,179],(function(){return e=5586,t(t.s=e);var e}));var e=t.O();_N_E=e}]);