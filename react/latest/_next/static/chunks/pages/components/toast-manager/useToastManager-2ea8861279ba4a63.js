(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5769],{51411:function(e,s,n){"use strict";n.r(s);var i=n(52322),t=n(45392);function a(e){var s=Object.assign({div:"div",h1:"h1",p:"p",code:"code",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",h3:"h3",h4:"h4",em:"em",nav:"nav",ul:"ul",li:"li"},(0,t.ah)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.div,{className:"main-content",id:"main-content",children:[(0,i.jsx)(s.h1,{id:"usetoastmanager",children:"useToastManager"}),"\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"useToastManager"})," Hook provides several methods and properties for managing toasts in a React application."]}),"\n",(0,i.jsxs)(s.h2,{id:"import",children:["Import",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-js",children:"import { useToastManager } from '@tonic-ui/react';\n"})}),"\n",(0,i.jsxs)(s.h2,{id:"usage",children:["Usage",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-js",children:"const toast = useToastManager();\n"})}),"\n",(0,i.jsxs)(s.p,{children:["The ",(0,i.jsx)(s.code,{children:"useToastManager"})," Hook returns an object with the following methods and properties:"]}),"\n",(0,i.jsxs)(s.h3,{id:"toastmessage-options",children:["toast(message, [options=","{}","])",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#toastmessage-options",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.p,{children:"Create a toast at the specified placement and return the toast id."}),"\n",(0,i.jsxs)(s.h4,{id:"aliases",children:["Aliases",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#aliases",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsx)("dd",{children:(0,i.jsxs)(s.em,{children:["toast.notify(message, [options=","{}","])"]})})}),"\n",(0,i.jsxs)(s.h4,{id:"parameters",children:["Parameters",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)("dl",{children:[(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"message"})," ",(0,i.jsx)(s.em,{children:"(Function|string)"}),": The toast message to render."]}),(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options={}]"})," ",(0,i.jsx)(s.em,{children:"(Object)"}),": The options object."]}),(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options.duration=null]"})," ",(0,i.jsx)(s.em,{children:"(number)"}),": The duration (in milliseconds) that the toast should remain on the screen. If set to null, toast will never dismiss."]}),(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options.id]"})," ",(0,i.jsx)(s.em,{children:"(string)"}),": A unique ID of the toast."]}),(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options.placement]"})," ",(0,i.jsx)(s.em,{children:"(string)"}),": The placement of the toast."]})]}),"\n",(0,i.jsxs)(s.h4,{id:"returns",children:["Returns",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.em,{children:"(string)"}),": Returns the toast id."]})}),"\n",(0,i.jsxs)(s.h3,{id:"toastcloseid",children:["toast.close(id)",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#toastcloseid",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.p,{children:"Close a toast at its placement."}),"\n",(0,i.jsxs)(s.h4,{id:"parameters-1",children:["Parameters",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters-1",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"id"})," ",(0,i.jsx)(s.em,{children:"(string)"}),": The id to close the toast."]})}),"\n",(0,i.jsxs)(s.h4,{id:"returns-1",children:["Returns",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns-1",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsx)("dd",{children:"This method does not return anything."})}),"\n",(0,i.jsxs)(s.h3,{id:"toastclosealloptions",children:["toast.closeAll([options=","{}","])",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#toastclosealloptions",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(s.p,{children:["Close all toasts at once with the given placements, including ",(0,i.jsx)(s.code,{children:"top"}),", ",(0,i.jsx)(s.code,{children:"top-left"}),", ",(0,i.jsx)(s.code,{children:"top-right"}),", ",(0,i.jsx)(s.code,{children:"bottom"}),", ",(0,i.jsx)(s.code,{children:"bottom-left"}),", ",(0,i.jsx)(s.code,{children:"bottom-right"}),"."]}),"\n",(0,i.jsxs)(s.h4,{id:"parameters-2",children:["Parameters",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters-2",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)("dl",{children:[(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options={}]"})," ",(0,i.jsx)(s.em,{children:"(Object)"}),": The options object."]}),(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options.placements=[]]"})," ",(0,i.jsx)(s.em,{children:"(Array)"}),": An array of placements to close toasts."]})]}),"\n",(0,i.jsxs)(s.h4,{id:"returns-2",children:["Returns",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns-2",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsx)("dd",{children:"This method does not return anything."})}),"\n",(0,i.jsxs)(s.h3,{id:"toastfindid",children:["toast.find(id)",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#toastfindid",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)(s.p,{children:["Find the first toast in the array that matches the provided toast id. Otherwise, ",(0,i.jsx)(s.code,{children:"undefined"})," is returned if not found."]}),"\n",(0,i.jsxs)(s.h4,{id:"parameters-3",children:["Parameters",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters-3",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"id"})," ",(0,i.jsx)(s.em,{children:"(string)"}),": The id to find the toast."]})}),"\n",(0,i.jsxs)(s.h4,{id:"returns-3",children:["Returns",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns-3",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.em,{children:"(Object)"}),": Returns the toast object."]})}),"\n",(0,i.jsxs)(s.h3,{id:"toastfindindexid",children:["toast.findIndex(id)",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#toastfindindexid",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.p,{children:"Find the first toast in the array that matches the provided toast id. Otherwise, -1 is returned if not found."}),"\n",(0,i.jsxs)(s.h4,{id:"parameters-4",children:["Parameters",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters-4",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"id"})," ",(0,i.jsx)(s.em,{children:"(string)"}),": The id to find the toast."]})}),"\n",(0,i.jsxs)(s.h4,{id:"returns-4",children:["Returns",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns-4",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.em,{children:"(number)"}),": Returns the array index."]})}),"\n",(0,i.jsxs)(s.h3,{id:"toastupdateid-options",children:["toast.update(id, [options=","{}","])",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#toastupdateid-options",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.p,{children:"Update a specific toast with new options based on the given toast id."}),"\n",(0,i.jsxs)(s.h4,{id:"parameters-5",children:["Parameters",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters-5",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsxs)("dl",{children:[(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"id"})," ",(0,i.jsx)(s.em,{children:"(string)"}),": The id to update the toast."]}),(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options={}]"})," ",(0,i.jsx)(s.em,{children:"(Object)"}),": The options object."]}),(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options.duration=null]"})," ",(0,i.jsx)(s.em,{children:"(number)"}),": The duration (in milliseconds) that the toast should remain on the screen. If set to null, toast will never dismiss."]}),(0,i.jsxs)("dd",{children:[(0,i.jsx)(s.code,{children:"[options.message]"})," ",(0,i.jsx)(s.em,{children:"(Function|string)"}),": The toast message to render."]})]}),"\n",(0,i.jsxs)(s.h4,{id:"returns-5",children:["Returns",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns-5",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)("dl",{children:(0,i.jsxs)("dd",{children:["Returns ",(0,i.jsx)(s.code,{children:"true"})," if the toast exists, else ",(0,i.jsx)(s.code,{children:"false"}),"."]})}),"\n",(0,i.jsxs)(s.h3,{id:"toastplacement",children:["toast.placement",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#toastplacement",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.p,{children:"Specify the placement to place the toast. The default placement will be used if the placement option is not explicitly specified."}),"\n",(0,i.jsxs)(s.h3,{id:"toaststate",children:["toast.state",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#toaststate",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.p,{children:"The toast state is a placement object, each placement contains an array of objects representing the current toasts."}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-js",children:"{\n  'top': [\n    {\n      id: '1', // A unique identifier that represents the toast message\n      message: ({ id, onClose, placement }) => <Toast />, // The toast message to render\n      placement: 'top', // The placement of the toast\n      duration: null, // The duration (in milliseconds) that the toast should remain on the screen. If set to null, toast will never dismiss.\n      onClose: () => toast.close(id, placement), // The function to close the toast\n    },\n  ],\n  'top-left': [],\n  'top-right': [],\n  'bottom': [],\n  'bottom-left': [],\n  'bottom-right': [],\n}\n"})}),"\n",(0,i.jsxs)(s.h2,{id:"demos",children:["Demos",(0,i.jsx)(s.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,i.jsx)(s.svg,{children:(0,i.jsx)(s.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-jsx",children:"function Example() {\n  const toast = useToastManager();\n  const handleClickOpenToast = () => {\n    const render = ({ onClose, placement }) => {\n      const styleProps = {\n        'top-left': { pt: '2x', px: '4x' },\n        'top': { pt: '2x', px: '4x' },\n        'top-right': { pt: '2x', px: '4x' },\n        'bottom-left': { pb: '2x', px: '4x' },\n        'bottom': { pb: '2x', px: '4x' },\n        'bottom-right': { pb: '2x', px: '4x' },\n      }[placement];\n\n      return (\n        <Box\n          {...styleProps}\n          width={320}\n        >\n          <Toast isClosable onClose={onClose}>\n            <Text>This is a toast notification</Text>\n          </Toast>\n        </Box>\n      );\n    };\n    const options = {\n      placement: 'bottom-right',\n      duration: 5000,\n    };\n    toast(render, options);\n  };\n\n  return (\n    <Button onClick={handleClickOpenToast}>\n      Open Toast\n    </Button>\n  );\n}\n"})})]}),(0,i.jsxs)(s.nav,{className:"toc",id:"toc",children:[(0,i.jsx)(s.div,{className:"toc-heading",children:"Contents"}),(0,i.jsxs)(s.ul,{className:"toc-level toc-level-1",children:[(0,i.jsx)(s.li,{className:"toc-item toc-item-h2",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h2",href:"#import",children:"Import"})}),(0,i.jsxs)(s.li,{className:"toc-item toc-item-h2",children:[(0,i.jsx)(s.a,{className:"toc-link toc-link-h2",href:"#usage",children:"Usage"}),(0,i.jsxs)(s.ul,{className:"toc-level toc-level-2",children:[(0,i.jsxs)(s.li,{className:"toc-item toc-item-h3",children:[(0,i.jsx)(s.a,{className:"toc-link toc-link-h3",href:"#toastmessage-options",children:"toast(message, [options=])"}),(0,i.jsxs)(s.ul,{className:"toc-level toc-level-3",children:[(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#aliases",children:"Aliases"})}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#parameters",children:"Parameters"})}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#returns",children:"Returns"})})]})]}),(0,i.jsxs)(s.li,{className:"toc-item toc-item-h3",children:[(0,i.jsx)(s.a,{className:"toc-link toc-link-h3",href:"#toastcloseid",children:"toast.close(id)"}),(0,i.jsxs)(s.ul,{className:"toc-level toc-level-3",children:[(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#parameters-1",children:"Parameters"})}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#returns-1",children:"Returns"})})]})]}),(0,i.jsxs)(s.li,{className:"toc-item toc-item-h3",children:[(0,i.jsx)(s.a,{className:"toc-link toc-link-h3",href:"#toastclosealloptions",children:"toast.closeAll([options=])"}),(0,i.jsxs)(s.ul,{className:"toc-level toc-level-3",children:[(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#parameters-2",children:"Parameters"})}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#returns-2",children:"Returns"})})]})]}),(0,i.jsxs)(s.li,{className:"toc-item toc-item-h3",children:[(0,i.jsx)(s.a,{className:"toc-link toc-link-h3",href:"#toastfindid",children:"toast.find(id)"}),(0,i.jsxs)(s.ul,{className:"toc-level toc-level-3",children:[(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#parameters-3",children:"Parameters"})}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#returns-3",children:"Returns"})})]})]}),(0,i.jsxs)(s.li,{className:"toc-item toc-item-h3",children:[(0,i.jsx)(s.a,{className:"toc-link toc-link-h3",href:"#toastfindindexid",children:"toast.findIndex(id)"}),(0,i.jsxs)(s.ul,{className:"toc-level toc-level-3",children:[(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#parameters-4",children:"Parameters"})}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#returns-4",children:"Returns"})})]})]}),(0,i.jsxs)(s.li,{className:"toc-item toc-item-h3",children:[(0,i.jsx)(s.a,{className:"toc-link toc-link-h3",href:"#toastupdateid-options",children:"toast.update(id, [options=])"}),(0,i.jsxs)(s.ul,{className:"toc-level toc-level-3",children:[(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#parameters-5",children:"Parameters"})}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h4",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h4",href:"#returns-5",children:"Returns"})})]})]}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h3",href:"#toastplacement",children:"toast.placement"})}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h3",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h3",href:"#toaststate",children:"toast.state"})})]})]}),(0,i.jsx)(s.li,{className:"toc-item toc-item-h2",children:(0,i.jsx)(s.a,{className:"toc-link toc-link-h2",href:"#demos",children:"Demos"})})]})]})]})}s.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=Object.assign({},(0,t.ah)(),e.components).wrapper;return s?(0,i.jsx)(s,Object.assign({},e,{children:(0,i.jsx)(a,e)})):a(e)}},68904:function(e,s,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/toast-manager/useToastManager",function(){return n(51411)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=68904)}),_N_E=e.O()}]);