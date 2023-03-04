(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8031],{57987:function(e,n,t){"use strict";t.r(n);var i=t(52322),s=t(45392);function l(e){var n=Object.assign({div:"div",h1:"h1",p:"p",code:"code",a:"a",h2:"h2",svg:"svg",use:"use",pre:"pre",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",nav:"nav",ul:"ul",li:"li"},(0,s.ah)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,i.jsx)(n.h1,{id:"transitions--grow",children:"Transitions / Grow"}),"\n",(0,i.jsx)(n.p,{children:"Transition helps make a UI expressive and easy to use."}),"\n",(0,i.jsxs)(n.p,{children:["The transition components use ",(0,i.jsx)(n.code,{children:"react-transition-group"})," internally to perform animation effects and manage component states (including mounting and unmounting) over time. You can check out all the transition props at ",(0,i.jsx)(n.a,{href:"https://reactcommunity.org/react-transition-group/transition/#Transition-props",children:"https://reactcommunity.org/react-transition-group/transition/#Transition-props"}),". For more information, visit ",(0,i.jsx)(n.a,{href:"http://reactcommunity.org/react-transition-group/transition",children:"http://reactcommunity.org/react-transition-group/transition"})," for detailed usage."]}),"\n",(0,i.jsxs)(n.h2,{id:"import",children:["Import",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"import {\n  Grow, // internally used in `Popover` and `Tooltip`\n} from '@tonic-ui/react';\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"usage",children:["Usage",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"grow",children:["Grow",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#grow",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"Grow"})," transition is used to animate the width and height of a component."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [isOpen, onToggle] = useToggle(false);\n\n  return (\n    <Flex direction="column" rowGap="4x">\n      <TextLabel display="inline-flex" alignItems="center">\n        <Switch checked={isOpen} onChange={() => onToggle()} size="md" />\n        <Space width="2x" />\n        <Text>Show</Text>\n      </TextLabel>\n      <Grow\n        in={isOpen}\n        unmountOnExit={false}\n      >\n        <SkeletonContent>\n          <SkeletonBody />\n        </SkeletonContent>\n      </Grow>\n    </Flex>\n  );\n}\n'})}),"\n",(0,i.jsxs)(n.h2,{id:"props",children:["Props",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#props",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.h3,{id:"grow-1",children:["Grow",(0,i.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#grow-1",children:(0,i.jsx)(n.svg,{children:(0,i.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{align:"left",children:"Name"}),(0,i.jsx)(n.th,{align:"left",children:"Type"}),(0,i.jsx)(n.th,{align:"left",children:"Default"}),(0,i.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"appear"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left",children:"false"}),(0,i.jsxs)(n.td,{align:"left",children:["By default the child component does not perform the enter transition when it first mounts, regardless of the value of ",(0,i.jsx)(n.code,{children:"in"}),". If you want this behavior, set both ",(0,i.jsx)(n.code,{children:"appear"})," and ",(0,i.jsx)(n.code,{children:"in"})," to true."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"children"}),(0,i.jsxs)(n.td,{align:"left",children:["ReactNode | ",(0,i.jsx)(n.code,{children:"(state, props) => ReactNode"})]}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsx)(n.td,{align:"left",children:"A function child can be used instead of a React element. This function is called with the current transition state ('entering', 'entered', 'exiting', 'exited'), ref, style, and context specific props for a component."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"easing"}),(0,i.jsxs)(n.td,{align:"left",children:["string | ",(0,i.jsx)(n.code,{children:"{ enter?: string, exit?: string }"})]}),(0,i.jsx)(n.td,{align:"left",children:(0,i.jsx)(n.code,{children:"{ enter: easing.easeInOut, exit: easing.easeInOut }"})}),(0,i.jsx)(n.td,{align:"left",children:"The timing function that describes how intermediate values are calculated during a transition. You may specify a single timing function for all transitions, or individually with an object."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"in"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", the component will transition in."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"mountOnEnter"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),', it will "lazy mount" the component on the first ',(0,i.jsx)(n.code,{children:"in={true}"}),". After the first enter transition the component will stay mounted, even on the 'exited' state, unless you also specify ",(0,i.jsx)(n.code,{children:"unmountOnExit"}),". By default the child component is mounted immediately along with the parent transition component."]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"timeout"}),(0,i.jsxs)(n.td,{align:"left",children:["string | number | ",(0,i.jsx)(n.code,{children:"{ appear?: number, enter?: number, exit?: number }"})]}),(0,i.jsx)(n.td,{align:"left",children:"'auto'"}),(0,i.jsx)(n.td,{align:"left",children:"The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{align:"left",children:"unmountOnExit"}),(0,i.jsx)(n.td,{align:"left",children:"boolean"}),(0,i.jsx)(n.td,{align:"left"}),(0,i.jsxs)(n.td,{align:"left",children:["If ",(0,i.jsx)(n.code,{children:"true"}),", it will unmount the child component when ",(0,i.jsx)(n.code,{children:"in={false}"})," and the animation has finished. By default the child component stays mounted after it reaches the 'exited' state."]})]})]})]})]}),(0,i.jsxs)(n.nav,{className:"toc",id:"toc",children:[(0,i.jsx)(n.div,{className:"toc-heading",children:"Contents"}),(0,i.jsxs)(n.ul,{className:"toc-level toc-level-1",children:[(0,i.jsx)(n.li,{className:"toc-item toc-item-h2",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h2",href:"#import",children:"Import"})}),(0,i.jsxs)(n.li,{className:"toc-item toc-item-h2",children:[(0,i.jsx)(n.a,{className:"toc-link toc-link-h2",href:"#usage",children:"Usage"}),(0,i.jsx)(n.ul,{className:"toc-level toc-level-2",children:(0,i.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#grow",children:"Grow"})})})]}),(0,i.jsxs)(n.li,{className:"toc-item toc-item-h2",children:[(0,i.jsx)(n.a,{className:"toc-link toc-link-h2",href:"#props",children:"Props"}),(0,i.jsx)(n.ul,{className:"toc-level toc-level-2",children:(0,i.jsx)(n.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(n.a,{className:"toc-link toc-link-h3",href:"#grow-1",children:"Grow"})})})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,s.ah)(),e.components).wrapper;return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(l,e)})):l(e)}},15586:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/transitions/grow",function(){return t(57987)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=15586)}),_N_E=e.O()}]);