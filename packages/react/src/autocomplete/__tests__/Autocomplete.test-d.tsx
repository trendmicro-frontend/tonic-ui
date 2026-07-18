import { Autocomplete, AutocompleteInput } from '@tonic-ui/react';
import React, { createRef } from 'react';

interface Item {
  value: string;
  label: string;
}

const items: Item[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
];

// Basic usage — `renderInput` defaults to <AutocompleteInput {...params} />
<Autocomplete items={items} />;

// With onChange
<Autocomplete items={items} onChange={(item) => console.log(item)} />;

// Controlled input value
<Autocomplete
  items={items}
  inputValue="apple"
  onInputChange={(next) => console.log(next)}
/>;

// With onClearInput
<Autocomplete items={items} onClearInput={() => console.log('cleared')} />;

// With onOpen / onClose
<Autocomplete
  items={items}
  onOpen={() => console.log('open')}
  onClose={() => console.log('close')}
/>;

// With onHighlightChange
<Autocomplete
  items={items}
  onHighlightChange={({ item, index, reason }) => console.log(item, index, reason)}
/>;

// With filterItems
<Autocomplete
  items={items}
  filterItems={(list, { inputValue, getItemLabel }) => list.filter(
    (item) => getItemLabel(item).toLowerCase().includes(inputValue.toLowerCase())
  )}
/>;

// With getItemLabel
<Autocomplete items={items} getItemLabel={(item) => item.label} />;

// With autoHighlight
<Autocomplete items={items} autoHighlight />;
<Autocomplete items={items} autoHighlight={false} />;

// With closeBehavior
<Autocomplete items={items} closeBehavior="restore" />;
<Autocomplete items={items} closeBehavior="clear" />;
<Autocomplete items={items} closeBehavior="keep" />;

// With isClearable
<Autocomplete items={items} isClearable />;
<Autocomplete items={items} isClearable={false} />;

// With isLoading
<Autocomplete items={items} isLoading />;
<Autocomplete items={items} isLoading={false} />;

// With selectOnFocus
<Autocomplete items={items} selectOnFocus />;
<Autocomplete items={items} selectOnFocus={false} />;

// AutocompleteInput — visual/HTML props (error, disabled, placeholder, etc.) live here, passed via renderInput
<Autocomplete
  items={items}
  renderInput={(params) => <AutocompleteInput {...params} error />}
/>;
<Autocomplete
  items={items}
  renderInput={(params) => <AutocompleteInput {...params} disabled />}
/>;
<Autocomplete
  items={items}
  renderInput={(params) => (
    <AutocompleteInput
      {...params}
      placeholder="Pick one"
      id="my-autocomplete"
      name="flavor"
      autoFocus
      required
    />
  )}
/>;

// AutocompleteInput inputProps for additive HTML attrs (consumer manually merges with params.inputProps)
<Autocomplete
  items={items}
  renderInput={(params) => (
    <AutocompleteInput
      {...params}
      inputProps={{
        ...params.inputProps,
        className: 'my-class',
        'data-testid': 'autocomplete',
      }}
    />
  )}
/>;

// Custom renderInput (no AutocompleteInput) — must forward ref + spread inputProps
<Autocomplete
  items={items}
  renderInput={({ ref, inputProps, isClearable, onClearInput, isLoading }) => (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <input {...inputProps} />
      {isClearable ? <button type="button" onClick={() => onClearInput()}>×</button> : null}
      {isLoading ? <span>...</span> : null}
    </div>
  )}
/>;

// With renderContent
<Autocomplete
  items={items}
  isLoading
  renderContent={({ items: list, renderItems, inputValue, isLoading }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (list.length === 0) {
      return <div>No items for {inputValue}</div>;
    }
    return renderItems(list);
  }}
/>;

// renderContent receives getItemProps and AutocompleteItem for custom layouts
// (destructured names use a `_` prefix so the unused-args rule ignores them).
<Autocomplete
  items={items}
  renderContent={({ items: _list, renderItem: _renderItem, getItemProps: _getItemProps, AutocompleteItem: _AutocompleteItem }) => null}
/>;

// renderContent returning null hides the popup
<Autocomplete items={items} renderContent={() => null} />;

// With renderItem
<Autocomplete
  items={items}
  renderItem={(item, { inputValue }) => `${item.label} — ${inputValue}`}
/>;

// With portalled
<Autocomplete items={items} portalled />;
<Autocomplete items={items} portalled={false} />;

// With placement
<Autocomplete items={items} placement="top" />;
<Autocomplete items={items} placement="top-start" />;
<Autocomplete items={items} placement="top-end" />;
<Autocomplete items={items} placement="bottom" />;
<Autocomplete items={items} placement="bottom-start" />;
<Autocomplete items={items} placement="bottom-end" />;

// With matchWidth
<Autocomplete items={items} matchWidth />;
<Autocomplete items={items} matchWidth={false} />;

// With slotProps
<Autocomplete items={items} slotProps={{ content: { width: 320 } }} />;
<Autocomplete items={items} slotProps={{ content: { width: '100%' } }} />;
<Autocomplete items={items} slotProps={{ content: { overflowY: 'hidden' } }} />;

// Ref
const rootRef = createRef<HTMLDivElement>();
<Autocomplete items={items} ref={rootRef} />;

// Wrong ref type
const wrongRef = createRef<SVGSVGElement>();
// @ts-expect-error - SVGSVGElement is not assignable to HTMLDivElement
<Autocomplete items={items} ref={wrongRef} />;

// Negative tests
// @ts-expect-error - `items` is required
<Autocomplete />;

// @ts-expect-error - 'center' is not a valid placement
<Autocomplete items={items} placement="center" />;

// @ts-expect-error - 'reset' is not a valid closeBehavior
<Autocomplete items={items} closeBehavior="reset" />;

// @ts-expect-error - isLoading must be boolean
<Autocomplete items={items} isLoading="true" />;

// @ts-expect-error - autoHighlight must be boolean
<Autocomplete items={items} autoHighlight="yes" />;
