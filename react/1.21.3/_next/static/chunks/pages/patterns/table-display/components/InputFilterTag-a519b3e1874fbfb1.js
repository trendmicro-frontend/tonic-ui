(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8965],{11073:function(e,r,t){"use strict";t.r(r);var n=t(98922),o=t(2784),l=["disabled"];function a(){return(a=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function u(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=Array(r);t<r;t++)n[t]=e[t];return n}var i=(0,o.forwardRef)(function(e,r){var t,i=e.disabled,c=function(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}(e,l),f=(function(e){if(Array.isArray(e))return e}(t=(0,n.useColorMode)())||function(e,r){var t,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var l=[],a=!0,u=!1;try{for(o=o.call(e);!(a=(t=o.next()).done)&&(l.push(t.value),!r||l.length!==r);a=!0);}catch(e){u=!0,n=e}finally{try{a||null==o.return||o.return()}finally{if(u)throw n}}return l}}(t,1)||function(e,r){if(e){if("string"==typeof e)return u(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(e,r)}}(t,1)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0];return o.createElement(n.Tag,a({disabled:i,isClosable:!0,tabIndex:i?void 0:0,sx:{borderRadius:".75rem",cursor:"pointer",_hover:{backgroundColor:{dark:"gray:60",light:"gray:40"}[f]},_disabled:{cursor:"not-allowed",userSelect:"none"}}},c))});i.displayName="FilterTag",r.default=i},67649:function(e,r,t){"use strict";t.r(r);var n=t(98922),o=t(1582),l=t(5081),a=t(11073),u=t(2784),i=["label","value","onChange","onClose","inputProps"];function c(){return(c=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function f(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t,n,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var l=[],a=!0,u=!1;try{for(o=o.call(e);!(a=(t=o.next()).done)&&(l.push(t.value),!r||l.length!==r);a=!0);}catch(e){u=!0,n=e}finally{try{a||null==o.return||o.return()}finally{if(u)throw n}}return l}}(e,r)||function(e,r){if(e){if("string"==typeof e)return s(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if("Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return s(e,r)}}(e,r)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=Array(r);t<r;t++)n[t]=e[t];return n}var p=(0,u.forwardRef)(function(e,r){var t=e.label,s=e.value,p=void 0===s?"":s,y=e.onChange,b=e.onClose,d=e.inputProps;!function(e,r){if(null!=e){var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)t=l[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)t=l[n],!(r.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}}}(e,i);var m=(0,u.useRef)(!1),v=(0,u.useRef)(null),g=f((0,u.useState)(null!=p?p:""),2),h=g[0],O=g[1],E=f((0,n.useColorStyle)(),1)[0],C=(0,u.useCallback)(function(e){O(e.target.value)},[]),w=(0,u.useCallback)(function(){(0,l.zU)(y)(h),m.current=!0,document.activeElement&&document.activeElement.blur()},[h,y]);return(0,u.useEffect)(function(){var e=setTimeout(function(){var e=v.current;e&&e.focus()},100);return function(){clearTimeout(e)}},[]),u.createElement(n.Popover,{arrow:!1,defaultIsOpen:!p,initialFocusRef:v,offset:[0,4],onClose:function(){m.current||(p?O(p):(0,l.zU)(b)()),m.current=!1},returnFocusOnClose:!1},u.createElement(n.PopoverTrigger,{shouldWrapChildren:!0},u.createElement(a.default,{onClose:function(e){e.stopPropagation(),(0,l.zU)(b)()}},u.createElement(n.Flex,{columnGap:"1x"},u.createElement(n.Text,{color:E.color.secondary},t),u.createElement(n.OverflowTooltip,{label:p},p)))),u.createElement(n.PopoverContent,{PopperProps:{usePortal:!0}},u.createElement(n.Box,{mb:"2x"},u.createElement(n.Input,c({},d,{ref:v,value:h,onChange:(0,o.callEventHandlers)(d.onChange,C)}))),u.createElement(n.Box,null,u.createElement(n.Button,{disabled:!h,variant:"primary",size:"sm",onClick:w},"Apply"))))});p.displayName="InputFilterTag",r.default=p},76340:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/patterns/table-display/components/InputFilterTag",function(){return t(67649)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=76340)}),_N_E=e.O()}]);