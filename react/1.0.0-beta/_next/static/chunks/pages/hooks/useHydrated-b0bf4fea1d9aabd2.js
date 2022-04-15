(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2763],{54137:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return d}});var r=t(7896),a=t(59740),s=(t(2784),t(30876)),u=["components"],o={};function d(e){var n=e.components,t=(0,a.Z)(e,u);return(0,s.kt)("wrapper",(0,r.Z)({},o,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("h1",null,"useHydrated"),(0,s.kt)("p",null,"A custom Hook that returns a boolean indicating if the component is hydrated."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"When doing Server-Side Rendering (SSR), the result will always be ",(0,s.kt)("inlineCode",{parentName:"li"},"false"),"."),(0,s.kt)("li",{parentName:"ul"},"When doing Client-Side Rendering (CSR), the result will always be ",(0,s.kt)("inlineCode",{parentName:"li"},"false")," on the first render, and ",(0,s.kt)("inlineCode",{parentName:"li"},"true")," on subsequent renders.")),(0,s.kt)("h2",null,"Import"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"import { useHydrated } from '@tonic-ui/react-hooks';\n")),(0,s.kt)("h3",null,"useHydrated"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"import { useEffect, useState } from 'react';\n\nconst useHydrated = () => {\n  const [isHydrated, setHydrated] = useState(false);\n\n  useEffect(() => {\n    setHydrated(true);\n  }, []);\n\n  return isHydrated;\n};\n")),(0,s.kt)("h2",null,"Usage"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-jsx"},"function Component() {\n  const isHydrated = useHydrated();\n\n  return (\n    <>\n      {isHydrated ? 'Hydrated' : 'Not hydrated'}\n    </>\n  );\n}\n")))}d.isMDXComponent=!0},8876:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useHydrated",function(){return t(54137)}])}},function(e){e.O(0,[9774,2888,179],(function(){return n=8876,e(e.s=n);var n}));var n=e.O();_N_E=n}]);