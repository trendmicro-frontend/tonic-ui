(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4842],{78839:function(e,t,n){"use strict";n.r(t);var r=n(95412),l=n(73705),i=n(98922),o=n(1582),c=n(2784);function a(){return(a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,l=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=l){var i=[],o=!0,c=!1;try{for(l=l.call(e);!(o=(n=l.next()).done)&&(i.push(n.value),!t||i.length!==t);o=!0);}catch(e){c=!0,r=e}finally{try{o||null==l.return||l.return()}finally{if(c)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m=[{id:1,eventType:"Virus/Malware",affectedDevices:20,detections:634},{id:2,eventType:"Spyware/Grayware",affectedDevices:20,detections:634},{id:3,eventType:"URL Filtering",affectedDevices:15,detections:598},{id:4,eventType:"Web Reputation",affectedDevices:15,detections:598},{id:5,eventType:"Network Virus",affectedDevices:15,detections:497},{id:6,eventType:"Application Control",affectedDevices:0,detections:0}];t.default=function(){var e=f((0,i.useColorMode)(),1)[0],t={dark:"rgba(255, 255, 255, 0.12)",light:"rgba(0, 0, 0, 0.12)"}[e],n={dark:"rgba(255, 255, 255, 0.08)",light:"rgba(0, 0, 0, 0.08)"}[e],u=f((0,c.useState)({}),2),d=u[0],b=u[1],y=(0,c.useMemo)(function(){return[{header:"Event Type",accessorKey:"eventType",size:240},{header:"Affected Devices",accessorKey:"affectedDevices",size:150,style:{textAlign:"right"}},{header:"Detections",accessorKey:"detections",size:150,style:{textAlign:"right"}}]},[]),g=(0,r.b7)({data:m,columns:y,defaultColumn:{minSize:40},state:{columnVisibility:d},onColumnVisibilityChange:b,getCoreRowModel:(0,l.sC)()});return c.createElement(c.Fragment,null,c.createElement(i.Box,{mb:"4x",px:"3x"},c.createElement(i.Flex,{display:"inline-flex",flexDirection:"column"},c.createElement(i.Checkbox,{checked:g.getIsAllColumnsVisible(),indeterminate:g.getIsSomeColumnsVisible()&&!g.getIsAllColumnsVisible(),onChange:g.getToggleAllColumnsVisibilityHandler()},"Toggle All"),c.createElement(i.Divider,{my:"2x"}),c.createElement(i.Stack,{spacing:"1x"},g.getAllLeafColumns().map(function(e){return c.createElement(c.Fragment,{key:e.id},c.createElement(i.Checkbox,{checked:e.getIsVisible(),onChange:e.getToggleVisibilityHandler()},e.columnDef.header))})))),c.createElement(i.Table,{layout:"flexbox"},c.createElement(i.TableHeader,null,g.getHeaderGroups().map(function(e){return c.createElement(i.TableHeaderRow,{key:e.id},e.headers.map(function(e){var t=s({minWidth:e.column.columnDef.minSize,width:e.getSize()},e.column.columnDef.style);return c.createElement(i.TableHeaderCell,a({key:e.id},t),e.isPlaceholder?null:c.createElement(i.Truncate,null,(0,r.ie)(e.column.columnDef.header,e.getContext())))}))})),c.createElement(i.TableBody,null,g.getRowModel().rows.map(function(e){return c.createElement(i.TableRow,{key:e.id,"data-selected":(0,o.dataAttr)(e.getIsSelected()),_hover:{backgroundColor:t},_selected:{backgroundColor:n}},e.getVisibleCells().map(function(e){var t=s({minWidth:e.column.columnDef.minSize,width:e.column.getSize()},e.column.columnDef.style);return c.createElement(i.TableCell,a({key:e.id},t),c.createElement(i.Truncate,null,(0,r.ie)(e.column.columnDef.cell,e.getContext())))}))}))))}},81536:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/table/column-visibility",function(){return n(78839)}])}},function(e){e.O(0,[5412,9774,2888,179],function(){return e(e.s=81536)}),_N_E=e.O()}]);