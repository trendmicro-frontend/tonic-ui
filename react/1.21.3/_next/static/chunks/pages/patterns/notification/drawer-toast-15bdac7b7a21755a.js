(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9331],{79913:function(e,t,n){"use strict";n.r(t);var r=n(98922),o=n(2784),l=n(60258),a=["onClose"];function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function u(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m=(0,o.forwardRef)(function(e,t){var n,m=e.onClose,p=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,a),d=(0,o.useRef)(0),b=function(e){if(Array.isArray(e))return e}(n=(0,o.useState)([]))||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var l=[],a=!0,i=!1;try{for(o=o.call(e);!(a=(n=o.next()).done)&&(l.push(n.value),!t||l.length!==t);a=!0);}catch(e){i=!0,r=e}finally{try{a||null==o.return||o.return()}finally{if(i)throw r}}return l}}(n,2)||u(n,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),E=b[0],y=b[1],v=function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e),n=t.appearance,r=t.content,o=t.duration,l=void 0===o?null:o,a=t.isClosable,i=void 0===a||a;y(function(e){var t,o=++d.current;return[].concat(function(e){if(Array.isArray(e))return s(e)}(t=e.slice(e.length))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||u(t)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[{id:o,appearance:n,content:r,duration:l,isClosable:i,onClose:function(){y(function(e){return e.filter(function(e){return e.id!==o})})}}])})},h=function(e){return function(t){t.currentTarget.blur();var n={success:o.createElement(o.Fragment,null,o.createElement(r.Text,null,"This is a success message."),o.createElement(r.Text,null,"The toast will be automatically dismissed after 5 seconds.")),info:o.createElement(o.Fragment,null,o.createElement(r.Text,null,"This is an info message."),o.createElement(r.Text,null,"The toast will remain visible until the user dismisses it.")),warning:o.createElement(o.Fragment,null,o.createElement(r.Text,null,"This is a warning message."),o.createElement(r.Text,null,"The toast will remain visible until the user dismisses it.")),error:o.createElement(o.Fragment,null,o.createElement(r.Text,null,"This is an error message."),o.createElement(r.Text,null,"The toast will remain visible until the user dismisses it."))}[e];v({appearance:e,content:n,duration:"success"===e?5e3:void 0})}};return o.createElement(r.Drawer,i({ref:t,backdrop:!0,closeOnEsc:!0,closeOnOutsideClick:!0,isClosable:!0,isOpen:!0,onClose:m,size:"md"},p),o.createElement(r.DrawerOverlay,null),o.createElement(r.DrawerContent,null,o.createElement(f,null,o.createElement(l.Z,{component:null},E.map(function(e){return o.createElement(r.ToastTransition,{key:null==e?void 0:e.id,in:!0,unmountOnExit:!0},o.createElement(r.ToastController,{duration:null==e?void 0:e.duration,onClose:null==e?void 0:e.onClose},o.createElement(r.Toast,{appearance:null==e?void 0:e.appearance,isClosable:null==e?void 0:e.isClosable,onClose:null==e?void 0:e.onClose,mb:"2x",minWidth:280,width:"fit-content"},null==e?void 0:e.content)))}))),o.createElement(r.DrawerHeader,null,"Drawer"),o.createElement(r.DrawerBody,null,o.createElement(r.Box,{mb:"8x"},o.createElement(r.Stack,{direction:"column",spacing:"4x"},o.createElement(r.Skeleton,{width:160}),o.createElement(r.Skeleton,{width:240}),o.createElement(r.Skeleton,{width:240}))),o.createElement(r.ButtonGroup,{variant:"secondary",sx:{"> *:not(:first-of-type)":{marginLeft:-1}}},o.createElement(r.Button,{columnGap:"2x",onClick:h("success")},o.createElement(r.Icon,{icon:"success"}),"Success"),o.createElement(r.Button,{columnGap:"2x",onClick:h("info")},o.createElement(r.Icon,{icon:"info"}),"Info"),o.createElement(r.Button,{columnGap:"2x",onClick:h("warning")},o.createElement(r.Icon,{icon:"warning-triangle"}),"Warning"),o.createElement(r.Button,{columnGap:"2x",onClick:h("error")},o.createElement(r.Icon,{icon:"error"}),"Error"))),o.createElement(r.DrawerFooter,null,o.createElement(r.Grid,{templateColumns:"repeat(2, 1fr)",columnGap:"2x"},o.createElement(r.Button,{variant:"primary",onClick:m},"OK"),o.createElement(r.Button,{onClick:m},"Cancel")))))});m.displayName="DrawerExample";var f=function(e){return o.createElement(r.Flex,i({flexDirection:"column",alignItems:"center",position:"absolute",top:"12x",left:"50%",transform:"translateX(-50%)",width:"max-content",maxWidth:"80%",zIndex:"toast"},e))};t.default=function(){var e=(0,r.usePortalManager)();return o.createElement(o.Fragment,null,o.createElement(r.Button,{variant:"secondary",onClick:function(){e(function(e){return o.createElement(m,{onClose:e})})}},"Open Drawer"))}},47203:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/patterns/notification/drawer-toast",function(){return n(79913)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=47203)}),_N_E=e.O()}]);