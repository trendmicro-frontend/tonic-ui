(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3113],{71654:function(e,n,i){"use strict";i.r(n);var o=i(52322),t=i(45392);function _createMdxContent(e){var n=Object.assign({div:"div",h1:"h1",h2:"h2",a:"a",svg:"svg",use:"use",p:"p",code:"code",h3:"h3",pre:"pre"},(0,t.ah)(),e.components);return(0,o.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,o.jsx)(n.h1,{id:"security",children:"Security"}),"\n",(0,o.jsxs)(n.h2,{id:"content-security-policy",children:["Content Security Policy",(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#content-security-policy",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsxs)(n.p,{children:["Content Security Policy (CSP) plays a critical role in protecting against various attacks, most notably Cross-Site Scripting (XSS) and data injections. Its core function involves the inclusion of either a ",(0,o.jsx)(n.code,{children:"Content-Security-Policy"})," header in the HTTP response or ",(0,o.jsx)(n.code,{children:"<meta>"})," tags within the HTML of a page."]}),"\n",(0,o.jsxs)(n.p,{children:["Tonic UI relies on ",(0,o.jsx)(n.a,{href:"https://emotion.sh/",children:"Emotion"})," for its styling system. To seamless integrate ",(0,o.jsx)(n.a,{href:"https://emotion.sh/",children:"Emotion"})," with CSP, it is essential to provide a ",(0,o.jsx)(n.code,{children:"nonce"})," value to the ",(0,o.jsx)(n.code,{children:"CacheProvider"})," component. Detailed instruction can be found in the ",(0,o.jsx)(n.a,{href:"https://emotion.sh/docs/@emotion/cache",children:"Emotion documentation"}),"."]}),"\n",(0,o.jsxs)(n.h3,{id:"step-1-implement-a-emotioncacheprovider-component",children:["Step 1: Implement a ",(0,o.jsx)(n.code,{children:"EmotionCacheProvider"})," component",(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#step-1-implement-a-emotioncacheprovider-component",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsx)(n.pre,{disabled:!0,children:(0,o.jsx)(n.code,{className:"language-jsx",children:"const EmotionCacheProvider = ({\n  children,\n  nonce,\n}) => {\n  const cache = createCache({ key: 'tonic-ui', nonce });\n  return (\n    <CacheProvider value={cache}>\n      {children}\n    </CacheProvider>\n  );\n};\n"})}),"\n",(0,o.jsxs)(n.h3,{id:"step-2-integrate-the-emotioncacheprovider-component-with-tonicprovider",children:["Step 2: Integrate the ",(0,o.jsx)(n.code,{children:"EmotionCacheProvider"})," component with ",(0,o.jsx)(n.code,{children:"TonicProvider"}),(0,o.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#step-2-integrate-the-emotioncacheprovider-component-with-tonicprovider",children:(0,o.jsx)(n.svg,{children:(0,o.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,o.jsxs)(n.p,{children:["Wrap the ",(0,o.jsx)(n.code,{children:"TonicProvider"})," component with the ",(0,o.jsx)(n.code,{children:"EmotionCacheProvider"})," and provide the relevant ",(0,o.jsx)(n.code,{children:"nonce"})," value. This value will be utilized by ",(0,o.jsx)(n.a,{href:"https://emotion.sh/",children:"Emotion"})," to generate a style tag with the necessary ",(0,o.jsx)(n.code,{children:"nonce"})," attribute."]}),"\n",(0,o.jsx)(n.pre,{disabled:!0,children:(0,o.jsx)(n.code,{className:"language-jsx",children:"<EmotionCacheProvider nonce={nonce}>\n  <TonicProvider\n    colorMode={colorMode}\n    useCSSBaseline\n  >\n    <PortalManager>\n      <ToastManager>\n        <App />\n      </ToastManager>\n    </PortalManager>\n  </TonicProvider>\n</EmotionCacheProvider>\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,t.ah)(),e.components).wrapper;return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(_createMdxContent,e)})):_createMdxContent(e)}},39536:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/getting-started/security",function(){return i(71654)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=39536)}),_N_E=e.O()}]);