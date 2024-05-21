import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import { Pagination, PaginationItem } from '@tonic-ui/react/src';
import React from 'react';

describe('Pagination', () => {
  it('should render correctly', async () => {
    const { container } = render(
      <Pagination />
    );
    await testA11y(container);
  });

  it('should have the "aria-current" attribute on the current page', () => {
    const { getAllByRole } = render(
      <Pagination count={3} page={1} />
    );

    // 'previous', page 1, page 2, page 3, 'next'
    // < 1 2 3 >
    const pageItems = getAllByRole('button');
    const pageItem0 = pageItems[0];
    const pageItem1 = pageItems[1];
    const pageItem2 = pageItems[2];
    const pageItem3 = pageItems[3];
    const pageItem4 = pageItems[4];

    expect(pageItems.length).toBe(5);
    expect(pageItem0).not.toHaveAttribute('aria-current');
    expect(pageItem1).toHaveAttribute('aria-current', 'true');

    // Only use `aria-selected` with these roles: `option`, `tab`, `menuitemradio`, `treeitem`, `gridcell`, `row`, `rowheader`, and `columnheader`.
    expect(pageItem1).toHaveAttribute('data-selected', '');

    expect(pageItem2).not.toHaveAttribute('aria-current');
    expect(pageItem3).not.toHaveAttribute('aria-current');
    expect(pageItem4).not.toHaveAttribute('aria-current');
  });

  it('should fire onChange when a different page is clicked', () => {
    const onChange = jest.fn();
    const { getAllByRole } = render(
      <Pagination count={3} onChange={onChange} page={1} />
    );

    // 'previous', page 1, page 2, page 3, 'next'
    // < 1 2 3 >
    const pageItems = getAllByRole('button');
    const pageItem2 = pageItems[2];
    pageItem2.click();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('should render correct amount of controls on correct order', () => {
    const { getAllByRole } = render(
      <Pagination
        count={5}
        page={3}
        slot={{ first: true, last: true }}
        renderItem={(item) => ( // eslint-disable-line react/jsx-no-bind
          <PaginationItem {...item} data-testid={item.type} />
        )}
      />
    );

    // 'first', 'previous', page 1, page 2, page 3, page 4, page 5, 'next', 'last'
    // << < 1 2 3 4 5 > >>
    const pageItems = getAllByRole('button');

    expect(pageItems[0].getAttribute('data-testid')).toBe('first');
    expect(pageItems[1].getAttribute('data-testid')).toBe('previous');
    expect(pageItems[2].getAttribute('data-testid')).toBe('page');
    expect(pageItems[3].getAttribute('data-testid')).toBe('page');
    expect(pageItems[4].getAttribute('data-testid')).toBe('page');
    expect(pageItems[5].getAttribute('data-testid')).toBe('page');
    expect(pageItems[6].getAttribute('data-testid')).toBe('page');
    expect(pageItems[7].getAttribute('data-testid')).toBe('next');
    expect(pageItems[8].getAttribute('data-testid')).toBe('last');
    expect(pageItems[2].textContent).toBe('1');
    expect(pageItems[3].textContent).toBe('2');
    expect(pageItems[4].textContent).toBe('3');
    expect(pageItems[5].textContent).toBe('4');
    expect(pageItems[6].textContent).toBe('5');
  });

  it('should render correct amount of controls on correct order when boundaryCount is zero', () => {
    const { getAllByRole } = render(
      <Pagination
        count={11}
        defaultPage={6}
        boundaryCount={0}
        renderItem={(item) => ( // eslint-disable-line react/jsx-no-bind
          <PaginationItem {...item} data-testid={item.type} />
        )}
      />
    );

    // 'previous', 'start-ellipsis', page 5, page 6, page 7, 'end-ellipsis', 'next'
    // < ... 5 6 7 ... >
    const pageItems = getAllByRole('button');

    expect(pageItems[0].getAttribute('data-testid')).toBe('previous');
    expect(pageItems[1].getAttribute('data-testid')).toBe('start-ellipsis');
    expect(pageItems[2].getAttribute('data-testid')).toBe('page');
    expect(pageItems[3].getAttribute('data-testid')).toBe('page');
    expect(pageItems[4].getAttribute('data-testid')).toBe('page');
    expect(pageItems[5].getAttribute('data-testid')).toBe('end-ellipsis');
    expect(pageItems[6].getAttribute('data-testid')).toBe('next');
    expect(pageItems[2].textContent).toBe('5');
    expect(pageItems[3].textContent).toBe('6');
    expect(pageItems[4].textContent).toBe('7');
  });

  it('should render correct amount of controls on correct order when siblingCount is zero', () => {
    const { getAllByRole } = render(
      <Pagination
        count={11}
        defaultPage={6}
        siblingCount={0}
        renderItem={(item) => ( // eslint-disable-line react/jsx-no-bind
          <PaginationItem {...item} data-testid={item.type} />
        )}
      />
    );

    // 'previous', page 1, 'start-ellipsis', page 6, 'end-ellipsis', page 11, 'next'
    // < 1 ... 6 ... 11 >
    const pageItems = getAllByRole('button');

    expect(pageItems[0].getAttribute('data-testid')).toBe('previous');
    expect(pageItems[1].getAttribute('data-testid')).toBe('page');
    expect(pageItems[2].getAttribute('data-testid')).toBe('start-ellipsis');
    expect(pageItems[3].getAttribute('data-testid')).toBe('page');
    expect(pageItems[4].getAttribute('data-testid')).toBe('end-ellipsis');
    expect(pageItems[5].getAttribute('data-testid')).toBe('page');
    expect(pageItems[6].getAttribute('data-testid')).toBe('next');
    expect(pageItems[1].textContent).toBe('1');
    expect(pageItems[3].textContent).toBe('6');
    expect(pageItems[5].textContent).toBe('11');
  });
});
