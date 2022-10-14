(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7322],{82715:function(n,t,o){"use strict";o.r(t),o.d(t,{default:function(){return s}});var e=o(7896),i=o(59740),u=(o(2784),o(30876)),p=["components"],l={};function s(n){var t=n.components,o=(0,i.Z)(n,p);return(0,u.kt)("wrapper",(0,e.Z)({},l,o,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h1",null,"useCopyToClipboard"),(0,u.kt)("p",null,"A custom Hook that provides a ",(0,u.kt)("inlineCode",{parentName:"p"},"copy")," method to copy text to the clipboard. If anything does not work, it will output an error message and the value will be set to ",(0,u.kt)("inlineCode",{parentName:"p"},"null"),"."),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-js"},"// import\nimport { useCopyToClipboard } from '@tonic-ui/react-hooks';\n\n// usage\nconst [value, copy] = useCopyToClipboard();\n")),(0,u.kt)("h3",null,"Returns"),(0,u.kt)("p",null,"Returns an array with the value and the copy function."),(0,u.kt)("h3",null,"Example"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-jsx"},"function Component() {\n  const [buttonIsCopied, setButtonIsCopied] = React.useState(null);\n  const [linkIsCopied, setLinkIsCopied] = React.useState(null);\n  const [value, copy] = useCopyToClipboard();\n\n  return (\n    <>\n      <Flex columnGap=\"2x\" mb=\"2x\">\n        <Button\n          minWidth={120}\n          onClick={async function () {\n            const ok = await copy('https://github.com/trendmicro-frontend/tonic-ui')\n            setButtonIsCopied(!!ok);\n            setTimeout(() => setButtonIsCopied(null), 1000);\n          }}\n        >\n          {buttonIsCopied === null && 'Click to copy'}\n          {buttonIsCopied === true && 'Copied'}\n          {buttonIsCopied === false && 'Copy failed'}\n        </Button>\n        <LinkButton\n          onClick={async function () {\n            const ok = await copy('https://github.com/trendmicro-frontend/tonic-ui')\n            setLinkIsCopied(!!ok);\n            setTimeout(() => setLinkIsCopied(null), 1000);\n          }}\n        >\n          {linkIsCopied === null && 'Click to copy'}\n          {linkIsCopied === true && 'Copied'}\n          {linkIsCopied === false && 'Copy failed'}\n        </LinkButton>\n      </Flex>\n      <Text>Copied value: {value}</Text>\n    </>\n  );\n}\n")))}s.isMDXComponent=!0},11952:function(n,t,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useCopyToClipboard",function(){return o(82715)}])}},function(n){n.O(0,[9774,2888,179],(function(){return t=11952,n(n.s=t);var t}));var t=n.O();_N_E=t}]);