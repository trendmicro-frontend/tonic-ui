(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2763],{8060:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return u}});t(2784);var r=t(876),a=["components"];function o(){return o=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},o.apply(this,arguments)}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l={};function u(e){var n=e.components,t=i(e,a);return(0,r.kt)("wrapper",o({},l,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",null,"useHydrated"),(0,r.kt)("p",null,"A custom Hook that returns a boolean indicating if the component is hydrated."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"// import\nimport { useHydrated } from '@tonic-ui/react-hooks';\n\n// usage\nconst isHydrated = useHydrated();\n")),(0,r.kt)("h3",null,"Returns"),(0,r.kt)("p",null,"Returns a boolean indicating if the component is hydrated."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"When doing Server-Side Rendering (SSR), the result will always be ",(0,r.kt)("inlineCode",{parentName:"li"},"false"),"."),(0,r.kt)("li",{parentName:"ul"},"When doing Client-Side Rendering (CSR), the result will always be ",(0,r.kt)("inlineCode",{parentName:"li"},"false")," on the first render, and ",(0,r.kt)("inlineCode",{parentName:"li"},"true")," on subsequent renders.")),(0,r.kt)("h2",null,"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"function Component() {\n  const isHydrated = useHydrated();\n\n  return (\n    <>\n      {isHydrated ? 'Hydrated' : 'Not hydrated'}\n    </>\n  );\n}\n")))}u.isMDXComponent=!0},1091:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useHydrated",function(){return t(8060)}])}},function(e){e.O(0,[9774,2888,179],(function(){return n=1091,e(e.s=n);var n}));var n=e.O();_N_E=n}]);