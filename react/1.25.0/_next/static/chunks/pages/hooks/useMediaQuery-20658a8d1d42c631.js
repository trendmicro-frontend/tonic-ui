(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8372],{13148:function(e,n,a){"use strict";a.r(n);var l=a(52322),s=a(45392);function i(e){var n=Object.assign({div:"div",h1:"h1",p:"p",h2:"h2",a:"a",svg:"svg",use:"use",pre:"pre",code:"code",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,s.ah)(),e.components);return(0,l.jsxs)(n.div,{className:"main-content",id:"main-content",children:[(0,l.jsx)(n.h1,{id:"usemediaquery",children:"useMediaQuery"}),"\n",(0,l.jsx)(n.p,{children:"A cusom Hook that listens for matches to a CSS media query. It allows the rendering of components based on whether the media query matches or not."}),"\n",(0,l.jsxs)(n.h2,{id:"import",children:["Import",(0,l.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#import",children:(0,l.jsx)(n.svg,{children:(0,l.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"import { useMediaQuery } from '@tonic-ui/react-hooks';\n"})}),"\n",(0,l.jsxs)(n.h2,{id:"usage",children:["Usage",(0,l.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#usage",children:(0,l.jsx)(n.svg,{children:(0,l.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"const isMatched = useMediaQuery(query, defaultValue);\n"})}),"\n",(0,l.jsxs)(n.h3,{id:"parameters",children:["Parameters",(0,l.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#parameters",children:(0,l.jsx)(n.svg,{children:(0,l.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsxs)(n.table,{children:[(0,l.jsx)(n.thead,{children:(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.th,{align:"left",children:"Name"}),(0,l.jsx)(n.th,{align:"left",children:"Type"}),(0,l.jsx)(n.th,{align:"left",children:"Default"}),(0,l.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,l.jsxs)(n.tbody,{children:[(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"query"}),(0,l.jsx)(n.td,{align:"left",children:"string"}),(0,l.jsx)(n.td,{align:"left"}),(0,l.jsx)(n.td,{align:"left",children:"The media query to match against."})]}),(0,l.jsxs)(n.tr,{children:[(0,l.jsx)(n.td,{align:"left",children:"defaultValue"}),(0,l.jsx)(n.td,{align:"left",children:"boolean"}),(0,l.jsx)(n.td,{align:"left",children:"false"}),(0,l.jsx)(n.td,{align:"left",children:"The default value to return if the media query is not matched."})]})]})]}),"\n",(0,l.jsxs)(n.h3,{id:"returns",children:["Returns",(0,l.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#returns",children:(0,l.jsx)(n.svg,{children:(0,l.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(n.p,{children:"Returns a boolean value indicating whether the media query matches or not."}),"\n",(0,l.jsxs)(n.h2,{id:"demos",children:["Demos",(0,l.jsx)(n.a,{"aria-hidden":!0,className:"anchor-link",tabIndex:"-1",href:"#demos",children:(0,l.jsx)(n.svg,{children:(0,l.jsx)(n.use,{xlinkHref:"#anchor-link-icon"})})})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"function Component() {\n  const x = (value) => JSON.stringify(value);\n  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');\n  const notLessThan320 = useMediaQuery('(min-width: 320px)');\n  const notLessThan640 = useMediaQuery('(min-width: 640px)');\n  const notLessThan1024 = useMediaQuery('(min-width: 1024px)');\n  const notLessThan1280 = useMediaQuery('(min-width: 1280px)');\n  const notLessThan1680 = useMediaQuery('(min-width: 1680px)');\n\n  return (\n    <Table>\n      <TableHeader>\n        <TableHeaderRow>\n          <TableHeaderCell width={240}>\n            Media Query\n          </TableHeaderCell>\n          <TableHeaderCell>\n            Match Result\n          </TableHeaderCell>\n        </TableHeaderRow>\n      </TableHeader>\n      <TableBody>\n        <TableRow>\n          <TableCell width={240}>\n            <Tag fontFamily=\"mono\">(prefers-color-scheme: dark)</Tag>\n          </TableCell>\n          <TableCell>{x(isDarkMode)}</TableCell>\n        </TableRow>\n        <TableRow>\n          <TableCell width={240}>\n            <Tag fontFamily=\"mono\">(min-width:320px)</Tag>\n          </TableCell>\n          <TableCell>{x(notLessThan320)}</TableCell>\n        </TableRow>\n        <TableRow>\n          <TableCell width={240}>\n            <Tag fontFamily=\"mono\">(min-width:640px)</Tag>\n          </TableCell>\n          <TableCell>{x(notLessThan640)}</TableCell>\n        </TableRow>\n        <TableRow>\n          <TableCell width={240}>\n            <Tag fontFamily=\"mono\">(min-width:1024px)</Tag>\n          </TableCell>\n          <TableCell>{x(notLessThan1024)}</TableCell>\n        </TableRow>\n        <TableRow>\n          <TableCell width={240}>\n            <Tag fontFamily=\"mono\">(min-width:1280px)</Tag>\n          </TableCell>\n          <TableCell>{x(notLessThan1280)}</TableCell>\n        </TableRow>\n        <TableRow>\n          <TableCell width={240}>\n            <Tag fontFamily=\"mono\">(min-width:1680px)</Tag>\n          </TableCell>\n          <TableCell>{x(notLessThan1680)}</TableCell>\n        </TableRow>\n      </TableBody>\n    </Table>\n  );\n}\n"})})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,s.ah)(),e.components).wrapper;return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(i,e)})):i(e)}},31622:function(e,n,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hooks/useMediaQuery",function(){return a(13148)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=31622)}),_N_E=e.O()}]);