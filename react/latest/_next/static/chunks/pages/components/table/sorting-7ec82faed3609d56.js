(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5029],{45429:function(e,t,n){"use strict";n.r(t);var r=n(95412),o=n(73705),l=n(98922),c=n(49427),a=n(2784);function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach(function(t){var r,o;r=e,o=n[t],t in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var l=[],c=!0,a=!1;try{for(o=o.call(e);!(c=(n=o.next()).done)&&(l.push(n.value),!t||l.length!==t);c=!0);}catch(e){a=!0,r=e}finally{try{c||null==o.return||o.return()}finally{if(a)throw r}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m=[{id:1,eventType:"Virus/Malware",affectedDevices:20,detections:634},{id:2,eventType:"Spyware/Grayware",affectedDevices:20,detections:634},{id:3,eventType:"URL Filtering",affectedDevices:15,detections:598},{id:4,eventType:"Web Reputation",affectedDevices:15,detections:598},{id:5,eventType:"Network Virus",affectedDevices:15,detections:497},{id:6,eventType:"Application Control",affectedDevices:0,detections:0}];t.default=function(){var e=f((0,l.useColorMode)(),1)[0],t=f((0,l.useColorStyle)({colorMode:e}),1)[0],n={dark:"rgba(255, 255, 255, 0.12)",light:"rgba(0, 0, 0, 0.12)"}[e],u=f((0,a.useState)([{id:"eventType",desc:!1}]),2),d=u[0],g=u[1],p=f((0,c.useToggle)(!1),2),b=p[0],y=p[1];(0,a.useEffect)(function(){b&&g([])},[b]);var h=(0,a.useMemo)(function(){return[{header:"Event Type",accessorKey:"eventType",size:240},{header:"Affected Devices",accessorKey:"affectedDevices",size:150,style:{textAlign:"right"}},{header:"Detections",accessorKey:"detections",size:150,style:{textAlign:"right"}}]},[]),v=(0,r.b7)({data:m,columns:h,defaultColumn:{minSize:40},state:{sorting:d},enableSorting:!0,enableSortingRemoval:b,getCoreRowModel:(0,o.sC)(),getSortedRowModel:(0,o.tj)(),onSortingChange:function(e){g(e)}}),E=a.createElement(l.Box,{p:"1x"},a.createElement(l.Text,null,"If ",a.createElement(l.Code,null,"true")," then changing sort order will circle like: `none` → `desc` → `asc` → `none` → ..."),a.createElement(l.Text,null,"If ",a.createElement(l.Code,null,"false")," then changing sort order will circle like: `none` → `desc` → `asc` → `desc` → `asc` → ..."));return a.createElement(a.Fragment,null,a.createElement(l.Box,{mb:"4x",px:"3x"},a.createElement(l.Checkbox,{checked:b,onChange:function(){y()}},a.createElement(l.Flex,{alignItems:"center"},"Enables/Disables the ability to remove sorting for the table",a.createElement(l.Space,{width:"2x"}),a.createElement(l.Tooltip,{label:"dark"===e?a.createElement(l.LightMode,null,E):a.createElement(l.DarkMode,null,E)},a.createElement(l.Icon,{icon:"info-o"}))))),a.createElement(l.Table,{layout:"flexbox"},a.createElement(l.TableHeader,null,v.getHeaderGroups().map(function(e){return a.createElement(l.TableHeaderRow,{key:e.id},e.headers.map(function(e){var o,c=s({minWidth:e.column.columnDef.minSize,width:e.getSize()},e.column.columnDef.style);return e.column.getCanSort()&&(c=s(s({},c),{},{cursor:"pointer",userSelect:"none",_hover:{backgroundColor:n}})),e.column.getIsSorted()&&(c=s(s({},c),{},{color:t.color.emphasis})),a.createElement(l.TableHeaderCell,i({key:e.id,onClick:e.column.getToggleSortingHandler()},c),e.isPlaceholder?null:a.createElement(l.Flex,{alignItems:"center"},a.createElement(l.Truncate,null,(0,r.ie)(e.column.columnDef.header,e.getContext())),null!==(o=({asc:a.createElement(l.Icon,{icon:"sort-up",size:20,ml:"1x"}),desc:a.createElement(l.Icon,{icon:"sort-down",size:20,ml:"1x"})})[e.column.getIsSorted()])&&void 0!==o?o:null))}))})),a.createElement(l.TableBody,null,v.getRowModel().rows.map(function(e){return a.createElement(l.TableRow,{key:e.id,_hover:{backgroundColor:n}},e.getVisibleCells().map(function(e){var t=s({minWidth:e.column.columnDef.minSize,width:e.column.getSize()},e.column.columnDef.style);return a.createElement(l.TableCell,i({key:e.id},t),a.createElement(l.Truncate,null,(0,r.ie)(e.column.columnDef.cell,e.getContext())))}))}))))}},44369:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/table/sorting",function(){return n(45429)}])}},function(e){e.O(0,[5412,9774,2888,179],function(){return e(e.s=44369)}),_N_E=e.O()}]);