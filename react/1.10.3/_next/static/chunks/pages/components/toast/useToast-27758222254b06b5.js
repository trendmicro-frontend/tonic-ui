(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3944],{85497:function(e,n,s){"use strict";s.r(n);var t=s(52322),i=s(45392);function d(e){var n=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre",h3:"h3",h4:"h4",em:"em"},(0,i.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{children:"useToast"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"useToast"})," Hook provides several methods and properties for managing toasts in a React application."]}),"\n",(0,t.jsx)(n.h2,{children:"Import"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"import { useToast } from '@tonic-ui/react';\n"})}),"\n",(0,t.jsx)(n.h2,{children:"Usage"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"const toast = useToast();\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"useToast"})," Hook returns an object with the following methods and properties:"]}),"\n",(0,t.jsxs)(n.h3,{children:["toast(message, [options=","{}","])"]}),"\n",(0,t.jsx)(n.p,{children:"Create a toast at the specified placement and return the toast id."}),"\n",(0,t.jsx)(n.h4,{children:"Aliases"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsx)("dd",{children:(0,t.jsxs)(n.em,{children:["toast.notify(message, [options=","{}","])"]})})}),"\n",(0,t.jsx)(n.h4,{children:"Parameters"}),"\n",(0,t.jsxs)("dl",{children:[(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"message"})," ",(0,t.jsx)(n.em,{children:"(Function|string)"}),": The toast message to render."]}),"\n",(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options={}]"})," ",(0,t.jsx)(n.em,{children:"(Object)"}),": The options object."]}),"\n",(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options.duration=null]"})," ",(0,t.jsx)(n.em,{children:"(number)"}),": The duration (in milliseconds) that the toast should remain on the screen. If set to null, toast will never dismiss."]}),"\n",(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options.id]"})," ",(0,t.jsx)(n.em,{children:"(string)"}),": A unique ID of the toast."]}),"\n",(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options.placement]"})," ",(0,t.jsx)(n.em,{children:"(string)"}),": The placement of the toast."]})]}),"\n",(0,t.jsx)(n.h4,{children:"Returns"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.em,{children:"(string)"}),": Returns the toast id."]})}),"\n",(0,t.jsx)(n.h3,{children:"toast.close(id)"}),"\n",(0,t.jsx)(n.p,{children:"Close a toast at its placement."}),"\n",(0,t.jsx)(n.h4,{children:"Parameters"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"id"})," ",(0,t.jsx)(n.em,{children:"(string)"}),": The id to close the toast."]})}),"\n",(0,t.jsx)(n.h4,{children:"Returns"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsx)("dd",{children:"This method does not return anything."})}),"\n",(0,t.jsxs)(n.h3,{children:["toast.closeAll([options=","{}","])"]}),"\n",(0,t.jsxs)(n.p,{children:["Close all toasts at once with the given placements, including ",(0,t.jsx)(n.code,{children:"top"}),", ",(0,t.jsx)(n.code,{children:"top-left"}),", ",(0,t.jsx)(n.code,{children:"top-right"}),", ",(0,t.jsx)(n.code,{children:"bottom"}),", ",(0,t.jsx)(n.code,{children:"bottom-left"}),", ",(0,t.jsx)(n.code,{children:"bottom-right"}),"."]}),"\n",(0,t.jsx)(n.h4,{children:"Parameters"}),"\n",(0,t.jsxs)("dl",{children:[(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options={}]"})," ",(0,t.jsx)(n.em,{children:"(Object)"}),": The options object."]}),"\n",(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options.placements=[]]"})," ",(0,t.jsx)(n.em,{children:"(Array)"}),": An array of placements to close toasts."]})]}),"\n",(0,t.jsx)(n.h4,{children:"Returns"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsx)("dd",{children:"This method does not return anything."})}),"\n",(0,t.jsx)(n.h3,{children:"toast.find(id)"}),"\n",(0,t.jsxs)(n.p,{children:["Find the first toast in the array that matches the provided toast id. Otherwise, ",(0,t.jsx)(n.code,{children:"undefined"})," is returned if not found."]}),"\n",(0,t.jsx)(n.h4,{children:"Parameters"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"id"})," ",(0,t.jsx)(n.em,{children:"(string)"}),": The id to find the toast."]})}),"\n",(0,t.jsx)(n.h4,{children:"Returns"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.em,{children:"(Object)"}),": Returns the toast object."]})}),"\n",(0,t.jsx)(n.h3,{children:"toast.findIndex(id)"}),"\n",(0,t.jsx)(n.p,{children:"Find the first toast in the array that matches the provided toast id. Otherwise, -1 is returned if not found."}),"\n",(0,t.jsx)(n.h4,{children:"Parameters"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"id"})," ",(0,t.jsx)(n.em,{children:"(string)"}),": The id to find the toast."]})}),"\n",(0,t.jsx)(n.h4,{children:"Returns"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.em,{children:"(number)"}),": Returns the array index."]})}),"\n",(0,t.jsxs)(n.h3,{children:["toast.update(id, [options=","{}","])"]}),"\n",(0,t.jsx)(n.p,{children:"Update a specific toast with new options based on the given toast id."}),"\n",(0,t.jsx)(n.h4,{children:"Parameters"}),"\n",(0,t.jsxs)("dl",{children:[(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"id"})," ",(0,t.jsx)(n.em,{children:"(string)"}),": The id to update the toast."]}),"\n",(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options={}]"})," ",(0,t.jsx)(n.em,{children:"(Object)"}),": The options object."]}),"\n",(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options.duration=null]"})," ",(0,t.jsx)(n.em,{children:"(number)"}),": The duration (in milliseconds) that the toast should remain on the screen. If set to null, toast will never dismiss."]}),"\n",(0,t.jsxs)("dd",{children:[(0,t.jsx)(n.code,{children:"[options.message]"})," ",(0,t.jsx)(n.em,{children:"(Function|string)"}),": The toast message to render."]})]}),"\n",(0,t.jsx)(n.h4,{children:"Returns"}),"\n",(0,t.jsx)("dl",{children:(0,t.jsxs)("dd",{children:["Returns ",(0,t.jsx)(n.code,{children:"true"})," if the toast exists, else ",(0,t.jsx)(n.code,{children:"false"}),"."]})}),"\n",(0,t.jsx)(n.h3,{children:"toast.placement"}),"\n",(0,t.jsx)(n.p,{children:"Specify the placement to place the toast. The default placement will be used if the placement option is not explicitly specified."}),"\n",(0,t.jsx)(n.h3,{children:"toast.state"}),"\n",(0,t.jsx)(n.p,{children:"The toast state is a placement object, each placement contains an array of objects representing the current toasts."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"{\n  'top': [\n    {\n      id: '1', // A unique identifier that represents the toast message\n      message: ({ id, onClose, placement }) => <Toast />, // The toast message to render\n      placement: 'top', // The placement of the toast\n      duration: null, // The duration (in milliseconds) that the toast should remain on the screen. If set to null, toast will never dismiss.\n      onClose: () => toast.close(id, placement), // The function to close the toast\n    },\n  ],\n  'top-left': [],\n  'top-right': [],\n  'bottom': [],\n  'bottom-left': [],\n  'bottom-right': [],\n}\n"})}),"\n",(0,t.jsx)(n.h2,{children:"Demos"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:"function Example() {\n  const toast = useToast();\n  const handleClickOpenToast = () => {\n    const render = ({ onClose, placement }) => {\n      const styleProps = {\n        'top-left': { pt: '2x', px: '4x' },\n        'top': { pt: '2x', px: '4x' },\n        'top-right': { pt: '2x', px: '4x' },\n        'bottom-left': { pb: '2x', px: '4x' },\n        'bottom': { pb: '2x', px: '4x' },\n        'bottom-right': { pb: '2x', px: '4x' },\n      }[placement];\n\n      return (\n        <Box\n          {...styleProps}\n          width={320}\n        >\n          <Toast isClosable onClose={onClose}>\n            <Text>This is a toast notification</Text>\n          </Toast>\n        </Box>\n      );\n    };\n    const options = {\n      placement: 'bottom-right',\n      duration: 5000,\n    };\n    toast(render, options);\n  };\n\n  return (\n    <Button onClick={handleClickOpenToast}>\n      Open Toast\n    </Button>\n  );\n}\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,i.ah)(),e.components).wrapper;return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(d,e)})):d(e)}},98921:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/toast/useToast",function(){return s(85497)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=98921)}),_N_E=e.O()}]);