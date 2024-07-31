(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5770],{41903:function(e,n,i){"use strict";i.r(n);var r=i(52322),t=i(45392),s=i(19300);function o(e){var n=Object.assign({div:"div",h1:"h1",p:"p",h2:"h2",a:"a",svg:"svg",use:"use",code:"code",ol:"ol",li:"li",strong:"strong",pre:"pre",ul:"ul",img:"img"},(0,t.ah)(),e.components);return(0,r.jsxs)(n.div,{className:"main-content",children:["\n",(0,r.jsx)(n.h1,{id:"publishing",children:"Publishing"}),"\n",(0,r.jsx)(n.p,{children:"This guide will help you publish a package to NPM and create GitHub release notes for a specific version of Tonic UI."}),"\n",(0,r.jsxs)(n.h2,{id:"prerequisites",children:["Prerequisites",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#prerequisites",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["Ensure you have the necessary permissions to publish to the NPM registry and create releases on GitHub. You should also have ",(0,r.jsx)(n.code,{children:"yarn"})," installed globally."]}),"\n",(0,r.jsxs)(n.h2,{id:"publishing-to-npm",children:["Publishing to NPM",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#publishing-to-npm",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.p,{children:"Follow these steps to publish a new version of a Tonic UI package to NPM:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Build the code"}),": Ensure the code is updated without issues."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"yarn build\nyarn test\n"})}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Run the publish command"}),": This will use Lerna to guide you through the publish process."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"yarn lerna-publish\n"})}),"\n",(0,r.jsx)(n.p,{children:"Lerna will prompt you to select the new version for each package that made changes. Follow the prompts to complete the publish process."}),"\n",(0,r.jsxs)(n.p,{children:["Note that you should follow ",(0,r.jsx)(n.a,{href:"https://semver.org/",children:"semantic versioning"})," convention to specify the package version. Given a version number MAJOR.MINOR.PATCH, increment the:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"MAJOR"})," version when you make incompatible API changes"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"MINOR"})," version when you add functionality in a backward compatible manner"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:"PATCH"})," version when you make backward compatible bug fixes"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format."}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Verify the published package"}),": After the publish process is complete, verify that the new version has been published to NPM."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm view @tonic-ui/react version\nnpm view @tonic-ui/react-icons version\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.h2,{id:"generating-github-release-notes",children:["Generating GitHub Release Notes",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#generating-github-release-notes",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsx)(n.p,{children:"After publishing the package to NPM, follow these steps to create GitHub release notes for the new version:"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"Go to the Tonic UI repository on GitHub."}),"\n",(0,r.jsx)(n.li,{children:'Click on the "Releases" link, then click the "Draft a new release" button.'}),"\n",(0,r.jsxs)(n.li,{children:["Select the new version tag (e.g., ",(0,r.jsx)(n.code,{children:"@tonic-ui/react@2.0.1"}),") and the previous tag to compare."]}),"\n",(0,r.jsx)(n.li,{children:'Click the "Generate release notes" button to generate a description of the release. This will consolidate changes in recent PRs.'}),"\n"]}),"\n",(0,r.jsx)(s.Z,{p:"4x",children:(0,r.jsx)(n.img,{src:"https://github.com/trendmicro-frontend/tonic-ui/assets/447801/1e87f134-edc6-427d-8da3-7170881f0570",alt:"tonic-ui-releases"})}),"\n",(0,r.jsxs)(n.h2,{id:"example-release-notes",children:["Example Release Notes",(0,r.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#example-release-notes",children:(0,r.jsx)(n.svg,{children:(0,r.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["Here is an example of how the release notes might look for ",(0,r.jsx)(n.code,{children:"@tonic-ui/react@v2.0.1"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-mdx",children:"## What's Changed\n* ci: set default Tonic UI package version for CodeSandbox integration by @cheton in https://github.com/trendmicro-frontend/tonic-ui/commit/2e6568a9250ac0a90e2fe0c7672be9194553ee11\n* feat(docs): add playground for interactive exploration by @cheton in https://github.com/trendmicro-frontend/tonic-ui/pull/838\n* feat(styled-system): update pseudo class/element selectors by @cheton in https://github.com/trendmicro-frontend/tonic-ui/pull/868\n* fix(styled-system): correct handling of negative margin where `calc()` was erroneously included by @cheton in https://github.com/trendmicro-frontend/tonic-ui/pull/869\n\n**Full Changelog**: https://github.com/trendmicro-frontend/tonic-ui/compare/@tonic-ui/react@2.0.0...@tonic-ui/react@2.0.1\n"})}),"\n",(0,r.jsx)(s.Z,{p:"4x",children:(0,r.jsx)(n.img,{src:"https://github.com/trendmicro-frontend/tonic-ui/assets/447801/0c8c6d59-a166-408b-ac66-3e63ef569d90",alt:"tonic-ui-releases-preview"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,t.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(o,e)})):o(e)}},19300:function(e,n,i){"use strict";var r=i(2784),t=i(40596),s=i(49857);function o(){return(o=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var i=0,r=Array(n);i<n;i++)r[i]=e[i];return r}n.Z=function(e){var n,i=(function(e){if(Array.isArray(e))return e}(n=(0,t.Z)())||function(e,n){var i=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=i){var r,t,s,o,a=[],l=!0,c=!1;try{for(s=(i=i.call(e)).next;!(l=(r=s.call(i)).done)&&(a.push(r.value),1!==a.length);l=!0);}catch(e){c=!0,t=e}finally{try{if(!l&&null!=i.return&&(o=i.return(),Object(o)!==o))return}finally{if(c)throw t}}return a}}(n,1)||function(e,n){if(e){if("string"==typeof e)return a(e,1);var i=Object.prototype.toString.call(e).slice(8,-1);if("Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i)return Array.from(e);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return a(e,1)}}(n,1)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0];return r.createElement(s.Z,o({},{border:1,borderColor:"light"===i?"rgba(0, 0, 0, .12)":"rgba(255, 255, 255, .12)"},e))}},11527:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contributing/publishing",function(){return i(41903)}])}},function(e){e.O(0,[2888,9774,179],function(){return e(e.s=11527)}),_N_E=e.O()}]);