(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5738],{2515:function(e,n,i){"use strict";i.r(n);var d=i(2322),t=i(5392);function l(e){var n=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h2:"h2",h3:"h3",pre:"pre",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td"},(0,t.ah)(),e.components);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.h1,{children:"ControlBox"}),"\n",(0,d.jsxs)(n.p,{children:[(0,d.jsx)(n.code,{children:"ControlBox"})," provides style props to change it's styles based on a sibling ",(0,d.jsx)(n.code,{children:"checkbox"})," or ",(0,d.jsx)(n.code,{children:"radio"})," input. It relies on a ",(0,d.jsx)(n.a,{href:"https://dev.to/lkopacz/create-custom-keyboard-accessible-checkboxes-2036",children:"common CSS technique"})," for styling custom controls."]}),"\n",(0,d.jsxs)(n.p,{children:["For this component to work, it should have a sibling ",(0,d.jsx)(n.code,{children:"input"})," and be contained in a ",(0,d.jsx)(n.code,{children:"label"}),"."]}),"\n",(0,d.jsx)(n.h2,{children:"Usage"}),"\n",(0,d.jsx)(n.h3,{children:"Creating a custom checkbox"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-jsx",children:'<Flex\n  as="label"\n  alignItems="center"\n>\n  <VisuallyHidden\n    as="input"\n    type="checkbox"\n    defaultChecked={false}\n  />\n  <ControlBox\n    border="1"\n    borderRadius="sm"\n    width="6x"\n    height="6x"\n    verticalAlign="middle"\n    _checked={{\n      backgroundColor: \'green:50\',\n      borderColor: \'green:50\',\n      color: \'white\',\n    }}\n    _focus={{\n      borderColor: \'green:60\',\n      boxShadow: \'rgba(66, 153, 225, 0.6) 0px 0px 0px 3px\',\n    }}\n    _disabled={{\n      opacity: \'.3\',\n    }}\n  >\n    <Icon icon="check-s" size="4x" />\n  </ControlBox>\n  <Space width="2x" />\n  <Text userSelect="none">\n    Checkbox\n  </Text>\n</Flex>\n'})}),"\n",(0,d.jsx)(n.h3,{children:"Creating a custom radio button"}),"\n",(0,d.jsx)(n.pre,{children:(0,d.jsx)(n.code,{className:"language-jsx",children:'<Flex\n  as="label"\n  alignItems="center"\n>\n  <VisuallyHidden\n    as="input"\n    type="radio"\n    defaultChecked={false}\n  />\n  <ControlBox\n    type="radio"\n    border="2"\n    borderRadius="circle"\n    borderColor="inherit"\n    bg="inherit"\n    width="6x"\n    height="6x"\n    verticalAlign="middle"\n    _checked={{\n      backgroundColor: \'green:50\',\n      borderColor: \'green:50\',\n    }}\n    _focus={{\n      boxShadow: \'rgba(66, 153, 225, 0.6) 0px 0px 0px 3px\',\n    }}\n    _hover={{\n      borderColor: \'gray:30\',\n    }}\n    _disabled={{\n      opacity: \'.3\',\n    }}\n  >\n    <Icon icon="circle-o" size="4x" />\n  </ControlBox>\n  <Space width="2x" />\n  <Text userSelect="none">\n    Radio Button\n  </Text>\n</Flex>\n'})}),"\n",(0,d.jsx)(n.h2,{children:"Props"}),"\n",(0,d.jsxs)(n.p,{children:["By default, it toggles the opacity of the ",(0,d.jsx)(n.code,{children:"ControlBox"})," children by setting ",(0,d.jsx)(n.code,{children:"_child"})," to ",(0,d.jsx)(n.code,{children:"{ opacity: 0 }"})," and ",(0,d.jsx)(n.code,{children:"_checkedAndChild"})," to ",(0,d.jsx)(n.code,{children:"{ opacity: 1 }"}),"."]}),"\n",(0,d.jsxs)(n.table,{children:[(0,d.jsx)(n.thead,{children:(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.th,{align:"left",children:"Name"}),(0,d.jsx)(n.th,{align:"left",children:"Selector"}),(0,d.jsx)(n.th,{align:"left",children:"Description"})]})}),(0,d.jsxs)(n.tbody,{children:[(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_child"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input] + & > *"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for the child of the ",(0,d.jsx)(n.code,{children:"ControlBox"}),"."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_disabled"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:disabled + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is disabled."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_focus"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:focus + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is focused."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_hover"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:hover:not(:disabled):not(:checked):not(:focus) + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is hovered."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_checked"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:checked + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is checked."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_checkedAndActive"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:checked:active:not(:disabled):not(:focus) + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is checked and actived."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_checkedAndChild"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:checked + & > *"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for the child of the ",(0,d.jsx)(n.code,{children:"ControlBox"})," when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is checked."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_checkedAndDisabled"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:checked:disabled + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is checked and disabled."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_checkedAndFocus"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:checked:focus + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is checked and focused."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_checkedAndHover"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input]:checked:hover:not(:disabled):not(:focus) + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is checked and hovered."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_indeterminate"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input][data-indeterminate=true] + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is indeterminate."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_indeterminateAndActive"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input][data-indeterminate=true]:active:not(:disabled):not(:focus) + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is indeterminate and actived."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_indeterminateAndChild"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input][data-indeterminate=true] + & > *"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for the child of the ",(0,d.jsx)(n.code,{children:"ControlBox"})," when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is indeterminate."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_indeterminateAndDisabled"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input][data-indeterminate=true]:disabled + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is indeterminate and disabled."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_indeterminateAndFocus"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input][data-indeterminate=true]:focus + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is indeterminate and focused."]})]}),(0,d.jsxs)(n.tr,{children:[(0,d.jsx)(n.td,{align:"left",children:"_indeterminateAndHover"}),(0,d.jsx)(n.td,{align:"left",children:(0,d.jsx)(n.code,{children:"[input][data-indeterminate=true]:hover:not(:disabled):not(:focus) + &"})}),(0,d.jsxs)(n.td,{align:"left",children:["Styles for when the sibling ",(0,d.jsx)(n.code,{children:"input"})," is indeterminate and hovered."]})]})]})]})]})}n.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({},(0,t.ah)(),e.components).wrapper;return n?(0,d.jsx)(n,Object.assign({},e,{children:(0,d.jsx)(l,e)})):l(e)}},338:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/controlbox",function(){return i(2515)}])}},function(e){e.O(0,[9774,2888,179],function(){return e(e.s=338)}),_N_E=e.O()}]);