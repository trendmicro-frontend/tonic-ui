(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7380],{3751:function(e,n,o){"use strict";o.r(n);var r=o(2322),t=o(5392);function l(e){var n=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",ul:"ul",li:"li",pre:"pre",h3:"h3",h4:"h4",strong:"strong",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,t.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{children:"Popover"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Popover"})," is a non-modal dialog that floats around a trigger. ",(0,r.jsx)(n.code,{children:"Popover"})," is used to display contextual information to users, and should be paired with a clickable trigger element."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Popover"})," is built on top of the ",(0,r.jsx)(n.a,{href:"https://popper.js.org/",children:"Popper.js"})," library, and is composed of the ",(0,r.jsx)(n.code,{children:"Popper"})," component."]}),"\n",(0,r.jsx)("carbon-ad",{}),"\n",(0,r.jsx)(n.h2,{children:"Import"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Popover"}),": The wrapper that provides props, state, and context to its children"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"PopoverTrigger"}),": Used to wrap the reference (or trigger) element"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"PopoverContent"}),": The popover itself"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"PopoverHeader"}),": The header of the popover"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"PopoverBody"}),": The body of the popover"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"PopoverFooter"}),": The footer of the popover"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import {\n  Popover,\n  PopoverTrigger,\n  PopoverContent,\n  PopoverHeader,\n  PopoverBody,\n  PopoverFooter,\n  usePopover,\n} from '@tonic-ui/react';\n"})}),"\n",(0,r.jsx)(n.h2,{children:"Usage"}),"\n",(0,r.jsxs)(n.p,{children:["To create an accessible popover, it should allow users to access it using the tab key on a keyboard. When it opens, the focus status will be set to ",(0,r.jsx)(n.code,{children:"PopoverContent"}),". When it closes, the focus status will return to ",(0,r.jsx)(n.code,{children:"PopoverTrigger"}),"."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Popover>\n  <PopoverTrigger>\n    <Button>Trigger</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <PopoverHeader>Popover Header</PopoverHeader>\n    <PopoverBody>Popover Body</PopoverBody>\n    <PopoverFooter>Popover Footer</PopoverFooter>\n  </PopoverContent>\n</Popover>\n"})}),"\n",(0,r.jsxs)(n.p,{children:["By default, you have to pass a single React element child to the ",(0,r.jsx)(n.code,{children:"PopoverTrigger"})," component."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<PopoverTrigger>\n  <Button>Trigger</Button>\n</PopoverTrigger>\n"})}),"\n",(0,r.jsxs)(n.p,{children:["If you need to pass more than one child element or non-element children, wrap them in an element or pass the ",(0,r.jsx)(n.code,{children:"shouldWrapChildren"})," prop."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<PopoverTrigger>\n  <Text display="inline-block">Text content</Text>\n</PopoverTrigger>\n'})}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<PopoverTrigger shouldWrapChildren>\n  Text content\n</PopoverTrigger>\n"})}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<PopoverTrigger shouldWrapChildren>\n  <Icon icon="menu" height="5x" mr="2x" />\n  <Text display="inline-block">Text content</Text>\n</Popover>\n'})}),"\n",(0,r.jsx)(n.h3,{children:"Controlled usage"}),"\n",(0,r.jsxs)(n.p,{children:["Pass ",(0,r.jsx)(n.code,{children:"isOpen"})," to the ",(0,r.jsx)(n.code,{children:"Popover"})," component to control the state of the popover."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [on, toggle] = useToggle(false);\n\n  return (\n    <>\n      <Flex mb="4x">\n        <Switch checked={on} onChange={toggle} />\n      </Flex>\n      <Popover\n        isOpen={on}\n        placement="bottom"\n      >\n        <PopoverTrigger>\n          <Button onClick={toggle}>\n            Trigger\n          </Button>\n        </PopoverTrigger>\n        <PopoverContent>\n          <Text>This is a controlled popover</Text>\n        </PopoverContent>\n      </Popover>\n    </>\n  );\n}\n'})}),"\n",(0,r.jsx)(n.h3,{children:"Uncontrolled usage"}),"\n",(0,r.jsxs)(n.p,{children:["Popover is uncontrolled by default. You can set ",(0,r.jsx)(n.code,{children:"defaultIsOpen"})," to ",(0,r.jsx)(n.code,{children:"true"})," to have the popover open for the first render."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Popover defaultIsOpen={false}>\n  <PopoverTrigger>\n    <Button>Trigger</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <Text>This is an uncontrolled popover</Text>\n  </PopoverContent>\n</Popover>\n"})}),"\n",(0,r.jsx)(n.h3,{children:"Focus control"}),"\n",(0,r.jsx)(n.h4,{children:"Focus an element when popover opens"}),"\n",(0,r.jsxs)(n.p,{children:["The focus status will send to ",(0,r.jsx)(n.code,{children:"PopoverContent"})," when ",(0,r.jsx)(n.code,{children:"Popover"})," opens. You can send the focus status to a specific element when it opens by passing the ",(0,r.jsx)(n.code,{children:"initialFocusRef"})," prop."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const initialFocusRef = React.useRef();\n\n  return (\n    <Popover\n      initialFocusRef={initialFocusRef}\n    >\n      <PopoverTrigger>\n        <Button>Trigger</Button>\n      </PopoverTrigger>\n      <PopoverContent>\n        <PopoverHeader>\n          Popover Header\n        </PopoverHeader>\n        <PopoverBody>\n          Lorem ipsum dolor sit amet, consectetur adicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n          <Input mt="3x" ref={initialFocusRef} placeholder="Placeholder text" />\n        </PopoverBody>\n        <PopoverFooter\n          border="0"\n          display="flex"\n          alignItems="center"\n          justifyContent="space-between"\n        >\n          <Link fontSize="sm">Learn more</Link>\n          <Stack direction="row" spacing="2x">\n            <Button variant="primary">Setup Email</Button>\n            <Button variant="default">\n              Next\n            </Button>\n          </Stack>\n        </PopoverFooter>\n      </PopoverContent>\n    </Popover>\n  );\n}\n'})}),"\n",(0,r.jsx)(n.h4,{children:"Focus an element when popover closes"}),"\n",(0,r.jsxs)(n.p,{children:["The focus status will send to ",(0,r.jsx)(n.code,{children:"PopoverTrigger"})," when ",(0,r.jsx)(n.code,{children:"Popover"})," closes. You can send the focus status to a specific element when it closes by passing the ",(0,r.jsx)(n.code,{children:"finalFocusRef"})," prop."]}),"\n",(0,r.jsxs)(n.p,{children:["If required, you can set ",(0,r.jsx)(n.code,{children:"returnFocusOnClose"})," to ",(0,r.jsx)(n.code,{children:"false"})," to prevent ",(0,r.jsx)(n.code,{children:"Popover"})," from returning the focus status to ",(0,r.jsx)(n.code,{children:"PopoverTrigger"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'function Example() {\n  const [on, toggle] = useToggle(false);\n\n  return (\n    <>\n      <Flex mb="4x">\n        <Switch checked={on} onChange={toggle} />\n      </Flex>\n      <Popover\n        isOpen={on}\n        placement="bottom"\n        returnFocusOnClose={false}\n      >\n        <PopoverTrigger>\n          <Button onClick={toggle}>\n            Trigger\n          </Button>\n        </PopoverTrigger>\n        <PopoverContent>\n          Popover\n        </PopoverContent>\n      </Popover>\n    </>\n  );\n}\n'})}),"\n",(0,r.jsx)(n.h3,{children:"Hide the arrow of the popover"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Popover\n  hideArrow\n>\n  <PopoverTrigger>\n    <Button>Trigger</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    Popover\n  </PopoverContent>\n</Popover>\n"})}),"\n",(0,r.jsx)(n.h3,{children:"Change popover position"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"offset"})," prop can be used to change the popover position. It accepts an array with two numbers in the form of ",(0,r.jsx)(n.code,{children:"[skidding, distance]"}),"."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Skidding"})}),"\n",(0,r.jsxs)(n.p,{children:["The first number, ",(0,r.jsx)(n.code,{children:"skidding"}),", displaces the ",(0,r.jsx)(n.code,{children:"PopoverContent"})," along the ",(0,r.jsx)(n.code,{children:"PopoverToggle"}),". This value is specified in pixels."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Distance"})}),"\n",(0,r.jsxs)(n.p,{children:["The second number, ",(0,r.jsx)(n.code,{children:"distance"}),", controls the distance between the ",(0,r.jsx)(n.code,{children:"PopoverContent"})," and the ",(0,r.jsx)(n.code,{children:"PopoverToggle"}),". This value is specified in pixels."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Popover offset={[24, 12]}>\n  <PopoverTrigger>\n    <Button>Trigger</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    Popover\n  </PopoverContent>\n</Popover>\n"})}),"\n",(0,r.jsx)(n.h3,{children:"Context API"}),"\n",(0,r.jsxs)(n.p,{children:["To access the internal state of the popover, you can use the Function as Child Component (FaCC) pattern or use the ",(0,r.jsx)(n.code,{children:"usePopover"})," hook."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Popover>\n  {({ isOpen, onClose }) => (\n    <>\n      <PopoverTrigger>\n        <Button>Trigger</Button>\n      </PopoverTrigger>\n      <PopoverContent>\n        <PopoverHeader>\n          Popover Header\n        </PopoverHeader>\n        <PopoverBody>\n          Popover Body\n        </PopoverBody>\n        <PopoverFooter>\n          <Flex\n            justifyContent="space-between"\n            columnGap="4x"\n          >\n            <Link fontSize="sm">Learn more</Link>\n            <Grid\n              templateColumns="1fr 1fr"\n              columnGap="2x"\n            >\n              <Button variant="primary">Submit</Button>\n              <Button variant="default" onClick={onClose}>\n                Cancel\n              </Button>\n            </Grid>\n          </Flex>\n        </PopoverFooter>\n      </PopoverContent>\n    </>\n  )}\n</Popover>\n'})}),"\n",(0,r.jsx)(n.h3,{children:"Trigger the popover on hover"}),"\n",(0,r.jsxs)(n.p,{children:["To trigger the popover on hover, you can set the ",(0,r.jsx)(n.code,{children:"trigger"})," prop to ",(0,r.jsx)(n.code,{children:'"hover"'}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["You can quickly move the cursor from ",(0,r.jsx)(n.code,{children:"PopoverTrigger"})," to ",(0,r.jsx)(n.code,{children:"PopoverContent"})," when the ",(0,r.jsx)(n.code,{children:"Popover"})," is open. ",(0,r.jsx)(n.code,{children:"Popover"})," will remain open until the cursor move away from ",(0,r.jsx)(n.code,{children:"PopoverContent"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Popover\n  hideArrow\n  trigger="hover"\n>\n  <PopoverTrigger>\n    <Text display="inline-block">Hover Me</Text>\n  </PopoverTrigger>\n  <PopoverContent>\n    Popover\n  </PopoverContent>\n</Popover>\n'})}),"\n",(0,r.jsxs)(n.p,{children:["When the trigger is set to ",(0,r.jsx)(n.code,{children:'"hover"'}),", you can pass ",(0,r.jsx)(n.code,{children:"nextToCursor"})," or ",(0,r.jsx)(n.code,{children:"followCursor"})," to ",(0,r.jsx)(n.code,{children:"Popover"})," to control the position of the popover."]}),"\n",(0,r.jsxs)(n.h4,{children:[(0,r.jsx)(n.code,{children:"nextToCursor"})," prop"]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"nextToCursor"})," prop will set the popover position next to the cursor."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Popover trigger="hover" nextToCursor>\n  <PopoverTrigger>\n    <Button>Trigger</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    Popover\n  </PopoverContent>\n</Popover>\n'})}),"\n",(0,r.jsxs)(n.h4,{children:[(0,r.jsx)(n.code,{children:"followCursor"})," prop"]}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"followCursor"})," prop will set the popover position to follow the cursor when it moves."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Popover trigger="hover" followCursor>\n  <PopoverTrigger>\n    <Button>Trigger</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    Popover\n  </PopoverContent>\n</Popover>\n'})}),"\n",(0,r.jsx)(n.h3,{children:"Placement"}),"\n",(0,r.jsxs)(n.p,{children:["Use the ",(0,r.jsx)(n.code,{children:"placement"})," prop to control the placement of the popover."]}),"\n",(0,r.jsx)(n.pre,{disabled:!0,children:(0,r.jsx)(n.code,{className:"language-jsx",children:'<Popover placement="top" trigger="hover">\n  <PopoverTrigger>\n    <LinkButton>Trigger</LinkButton>\n  </PopoverTrigger>\n  <PopoverContent>\n    Popover\n  </PopoverContent>\n</Popover>\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"<Box display=\"inline-block\">\n  <Grid\n    templateColumns=\"repeat(3, minmax(84px,1fr))\"\n    templateRows=\"repeat(4, 84px)\"\n    gap=\"8x\"\n  >\n    {['top-start', 'top', 'top-end',\n      'right-start', 'right', 'right-end',\n      'bottom-start', 'bottom', 'bottom-end',\n      'left-start', 'left', 'left-end'\n    ].map(placement => (\n      <Popover\n        key={placement}\n        placement={placement}\n        trigger=\"hover\"\n      >\n        <PopoverTrigger>\n          <Button width=\"100%\">\n            {placement}\n          </Button>\n        </PopoverTrigger>\n        <PopoverContent>\n          Popover\n        </PopoverContent>\n      </Popover>\n    ))}\n  </Grid>\n</Box>\n"})}),"\n",(0,r.jsx)(n.h2,{children:"Props"}),"\n",(0,r.jsx)(n.h3,{children:"Popover"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"arrowAt"}),(0,r.jsx)(n.td,{align:"left",children:"string"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"The position of the arrow. One of: 'left', 'right', 'top', 'bottom'"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"children"}),(0,r.jsxs)(n.td,{align:"left",children:["ReactNode | ",(0,r.jsx)(n.code,{children:"(context) => ReactNode"})]}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"closeOnBlur"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left",children:"true"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the popover will close when the user clicks outside of the popover."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"closeOnEsc"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left",children:"true"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the popover will close when you press the ",(0,r.jsx)(n.code,{children:"Esc"})," key."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"defaultIsOpen"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left",children:"false"}),(0,r.jsx)(n.td,{align:"left",children:"Whether the popover will be open by default."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"enterDelay"}),(0,r.jsx)(n.td,{align:"left",children:"number"}),(0,r.jsx)(n.td,{align:"left",children:"100"}),(0,r.jsxs)(n.td,{align:"left",children:["The number of milliseconds to wait before showing the popover if ",(0,r.jsx)(n.code,{children:"trigger"})," is hover."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"followCursor"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the popover will follow the cursor."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"hideArrow"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the arrow will not be displayed."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"id"}),(0,r.jsx)(n.td,{align:"left",children:"string"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"The id of the popover."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"initialFocusRef"}),(0,r.jsx)(n.td,{align:"left",children:"RefObject"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"The reference of the element that will be focused when the popover opens."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"isOpen"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the popover will be open."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"leaveDelay"}),(0,r.jsx)(n.td,{align:"left",children:"number"}),(0,r.jsx)(n.td,{align:"left",children:"0"}),(0,r.jsxs)(n.td,{align:"left",children:["The number of milliseconds to wait before hiding the popover if ",(0,r.jsx)(n.code,{children:"trigger"})," is hover."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"nextToCursor"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the popover will be positioned next to the cursor."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"offset"}),(0,r.jsx)(n.td,{align:"left",children:"[skidding, distance]"}),(0,r.jsx)(n.td,{align:"left",children:"[0, 12]"}),(0,r.jsx)(n.td,{align:"left",children:"The skidding and distance of the popover."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"onClose"}),(0,r.jsx)(n.td,{align:"left",children:"() => void"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"Callback when the popover is closed."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"onOpen"}),(0,r.jsx)(n.td,{align:"left",children:"() => void"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"Callback when the popover is opened."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"placement"}),(0,r.jsx)(n.td,{align:"left",children:"string"}),(0,r.jsx)(n.td,{align:"left",children:"'bottom'"}),(0,r.jsx)(n.td,{align:"left",children:"The placement of the popover. One of: 'top', 'bottom', 'right', 'left', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'right-start', 'right-end', 'left-start', 'left-end'"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"returnFocusOnClose"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left",children:"true"}),(0,r.jsxs)(n.td,{align:"left",children:["If ",(0,r.jsx)(n.code,{children:"true"}),", the popover will return the focus status to the trigger when closing."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"trigger"}),(0,r.jsx)(n.td,{align:"left",children:"string"}),(0,r.jsx)(n.td,{align:"left",children:"'click'"}),(0,r.jsx)(n.td,{align:"left",children:"The type of trigger. One of: 'click', 'hover'"})]})]})]}),"\n",(0,r.jsx)(n.h3,{children:"PopoverTrigger"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"children"}),(0,r.jsxs)(n.td,{align:"left",children:["ReactNode | ",(0,r.jsx)(n.code,{children:"({ getPopoverTriggerProps }) => ReactNode"})]}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left"})]})})]}),"\n",(0,r.jsx)(n.h3,{children:"PopoverContent"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"PopperComponent"}),(0,r.jsx)(n.td,{align:"left",children:"ElementType"}),(0,r.jsx)(n.td,{align:"left",children:"Popper"}),(0,r.jsx)(n.td,{align:"left",children:"The component used for the popover."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"PopperProps"}),(0,r.jsx)(n.td,{align:"left",children:"object"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"Props applied to the Popper component."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"PopperArrowComponent"}),(0,r.jsx)(n.td,{align:"left",children:"ElementType"}),(0,r.jsx)(n.td,{align:"left",children:"PopperArrow"}),(0,r.jsx)(n.td,{align:"left",children:"The component used for the popover arrow."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"PopperArrowProps"}),(0,r.jsx)(n.td,{align:"left",children:"object"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"Props applied to the PopoverArrow component."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"TransitionComponent"}),(0,r.jsx)(n.td,{align:"left",children:"ElementType"}),(0,r.jsx)(n.td,{align:"left",children:"Grow"}),(0,r.jsx)(n.td,{align:"left",children:"The component used for the transition."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"TransitionProps"}),(0,r.jsx)(n.td,{align:"left",children:"object"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsxs)(n.td,{align:"left",children:["Props applied to the ",(0,r.jsx)(n.a,{href:"http://reactcommunity.org/react-transition-group/transition#Transition-props",children:"Transition"})," element."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"TransitionProps.appear"}),(0,r.jsx)(n.td,{align:"left",children:"boolean"}),(0,r.jsx)(n.td,{align:"left",children:"true"}),(0,r.jsx)(n.td,{align:"left"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"children"}),(0,r.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"onBlur"}),(0,r.jsx)(n.td,{align:"left",children:"(event: FocusEvent) => void"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"A callback called when the popover loses focus."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"onFocus"}),(0,r.jsx)(n.td,{align:"left",children:"(event: FocusEvent) => void"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"A callback called when the popover gains focus."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"onKeyDown"}),(0,r.jsx)(n.td,{align:"left",children:"(event: KeyboardEvent) => void"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"A callback called when the popover is pressed with any key."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"onMouseEnter"}),(0,r.jsx)(n.td,{align:"left",children:"(event: MouseEvent) => void"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"A callback called when the mouse enters the popover."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"onMouseLeave"}),(0,r.jsx)(n.td,{align:"left",children:"(event: MouseEvent) => void"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left",children:"A callback called when the mouse leaves the popover."})]})]})]}),"\n",(0,r.jsx)(n.h3,{children:"PopoverHeader"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"children"}),(0,r.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left"})]})})]}),"\n",(0,r.jsx)(n.h3,{children:"PopoverBody"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"children"}),(0,r.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left"})]})})]}),"\n",(0,r.jsx)(n.h3,{children:"PopoverFooter"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{align:"left",children:"Name"}),(0,r.jsx)(n.th,{align:"left",children:"Type"}),(0,r.jsx)(n.th,{align:"left",children:"Default"}),(0,r.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{align:"left",children:"children"}),(0,r.jsx)(n.td,{align:"left",children:"ReactNode"}),(0,r.jsx)(n.td,{align:"left"}),(0,r.jsx)(n.td,{align:"left"})]})})]}),"\n",(0,r.jsx)(n.h2,{children:"Accessibility"}),"\n",(0,r.jsx)(n.h3,{children:"Keyboard and focus"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["When ",(0,r.jsx)(n.code,{children:"Popover"})," is opened, the focus status is moved to ",(0,r.jsx)(n.code,{children:"PopoverContent"}),". If ",(0,r.jsx)(n.code,{children:"initialFocusRef"})," is set, then the focus status is moved to the element with the related reference (",(0,r.jsx)(n.code,{children:"ref"}),")."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["When ",(0,r.jsx)(n.code,{children:"Popover"})," is closed, the focus status returns to the trigger. If you set ",(0,r.jsx)(n.code,{children:"returnFocusOnClose"})," to ",(0,r.jsx)(n.code,{children:"false"}),", the focus status will not return."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If ",(0,r.jsx)(n.code,{children:"trigger"})," is set to ",(0,r.jsx)(n.code,{children:"hover"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Focusing on or mousing over the trigger will open ",(0,r.jsx)(n.code,{children:"Popover"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["Blurring or mousing out of the trigger will close ",(0,r.jsx)(n.code,{children:"Popover"}),". If you move your mouse into ",(0,r.jsx)(n.code,{children:"PopoverContent"}),", ",(0,r.jsx)(n.code,{children:"Popover"})," remains visible."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If ",(0,r.jsx)(n.code,{children:"trigger"})," is set to ",(0,r.jsx)(n.code,{children:"click"}),":"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Clicking the trigger or using the ",(0,r.jsx)(n.code,{children:"Space"})," or ",(0,r.jsx)(n.code,{children:"Enter"})," key when the focus status is on the trigger will open ",(0,r.jsx)(n.code,{children:"Popover"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["Clicking the trigger again will close ",(0,r.jsx)(n.code,{children:"Popover"}),"."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Hitting the ",(0,r.jsx)(n.code,{children:"Esc"})," key while ",(0,r.jsx)(n.code,{children:"Popover"})," is open and the focus status is within ",(0,r.jsx)(n.code,{children:"PopoverContent"})," will close ",(0,r.jsx)(n.code,{children:"Popover"}),". If you set ",(0,r.jsx)(n.code,{children:"closeOnEsc"})," to ",(0,r.jsx)(n.code,{children:"false"}),", ",(0,r.jsx)(n.code,{children:"Popover"})," will not close."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Clicking outside or blurring out of ",(0,r.jsx)(n.code,{children:"PopoverContent"})," closes ",(0,r.jsx)(n.code,{children:"Popover"}),". If you set ",(0,r.jsx)(n.code,{children:"closeOnBlur"})," to ",(0,r.jsx)(n.code,{children:"false"}),", ",(0,r.jsx)(n.code,{children:"Popover"})," will not close."]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{children:"ARIA attributes"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If the ",(0,r.jsx)(n.code,{children:"trigger"})," is set to ",(0,r.jsx)(n.code,{children:"click"}),", the ",(0,r.jsx)(n.code,{children:"role"})," of the ",(0,r.jsx)(n.code,{children:"PopoverContent"})," element is set to ",(0,r.jsx)(n.code,{children:"dialog"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["If the ",(0,r.jsx)(n.code,{children:"trigger"})," is set to ",(0,r.jsx)(n.code,{children:"hover"}),", the ",(0,r.jsx)(n.code,{children:"role"})," of the ",(0,r.jsx)(n.code,{children:"PopoverContent"})," element is set to ",(0,r.jsx)(n.code,{children:"tooltip"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"PopoverContent"})," has ",(0,r.jsx)(n.code,{children:"aria-labelledby"})," set to the ",(0,r.jsx)(n.code,{children:"id"})," attribute of ",(0,r.jsx)(n.code,{children:"PopoverHeader"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"PopoverContent"})," has ",(0,r.jsx)(n.code,{children:"aria-describedby"})," set to the ",(0,r.jsx)(n.code,{children:"id"})," attribute of ",(0,r.jsx)(n.code,{children:"PopoverBody"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"PopoverContent"})," has ",(0,r.jsx)(n.code,{children:"aria-hidden"})," set to ",(0,r.jsx)(n.code,{children:"true"})," or ",(0,r.jsx)(n.code,{children:"false"})," depending on the open/closed state of ",(0,r.jsx)(n.code,{children:"Popover"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["The trigger has ",(0,r.jsx)(n.code,{children:"aria-haspopup"})," set to ",(0,r.jsx)(n.code,{children:"dialog"})," to denote the popup is a dialog."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["The trigger has ",(0,r.jsx)(n.code,{children:"aria-controls"})," set to the ",(0,r.jsx)(n.code,{children:"id"})," attribute of ",(0,r.jsx)(n.code,{children:"PopoverContent"})," to associate the popover with the trigger."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["The trigger has ",(0,r.jsx)(n.code,{children:"aria-expanded"})," set to ",(0,r.jsx)(n.code,{children:"true"})," or ",(0,r.jsx)(n.code,{children:"false"})," depending on the open/closed state of the popover."]}),"\n"]}),"\n"]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,t.ah)(),e.components).wrapper;return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(l,e)})):l(e)}},6429:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/popover",function(){return o(3751)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=6429)}),_N_E=e.O()}]);