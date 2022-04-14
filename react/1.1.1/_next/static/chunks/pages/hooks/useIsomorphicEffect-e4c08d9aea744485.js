(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6857],{61124:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return r}});var o=t(7896),s=t(59740),u=(t(2784),t(30876)),c=["components"],f={};function r(e){var n=e.components,t=(0,s.Z)(e,c);return(0,u.kt)("wrapper",(0,o.Z)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,u.kt)("h1",null,"useIsomorphicEffect"),(0,u.kt)("p",null,"A custom Hook that resolves to ",(0,u.kt)("inlineCode",{parentName:"p"},"useEffect"),' when "window" is not in scope and ',(0,u.kt)("inlineCode",{parentName:"p"},"useLayoutEffect")," in the browser."),(0,u.kt)("h2",null,"Import"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-js"},"import { useIsomorphicEffect } from '@tonic-ui/react-hooks';\n")),(0,u.kt)("h3",null,"useIsomorphicEffect"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-js"},"import { useEffect, useLayoutEffect } from 'react';\n\nconst useIsomorphicEffect =\n  (typeof window === 'undefined') ? useEffect : useLayoutEffect;\n")),(0,u.kt)("h2",null,"Usage"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-jsx"},"function Component() {\n  useIsomorphicEffect(() => {\n    console.log('useIsomorphicEffect executed');\n  }, []);\n\n  return (\n    <Text>\n      <Code>useIsomorphicEffect()</Code> resolves to <Code>{useIsomorphicEffect === React.useEffect ? 'useEffect()' : 'useLayoutEffect()'}</Code>\n    </Text>\n  );\n}\n")))}r.isMDXComponent=!0},29086:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useIsomorphicEffect",function(){return t(61124)}])}},function(e){e.O(0,[9774,2888,179],(function(){return n=29086,e(e.s=n);var n}));var n=e.O();_N_E=n}]);