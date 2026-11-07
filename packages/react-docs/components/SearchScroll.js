import { useEffect } from 'react';
import { ensureString } from 'ensure-type';
import { useSearchQuery } from './SearchQueryProvider';

/**
 * Marks rendered by the `Highlight` component (see `MDXComponents.js`).
 */
const MARK_SELECTOR = 'mark[data-tonic="Mark"]';
const BLOCK_SELECTOR = 'p, li, pre, table, h1, h2, h3, h4, h5, h6';
const CHECK_INTERVAL = 100;
const MAX_WAIT = 3000;

/**
 * Returns the heading for the URL anchor and every element that belongs to that
 * section, stopping at the next heading of the same or higher level.
 */
const getSection = (anchorId) => {
  const heading = document.getElementById(anchorId);

  if (!heading) {
    return null;
  }

  const level = Number(heading.tagName.slice(1));
  const elements = [heading];
  let element = heading.nextElementSibling;

  while (element) {
    if (/^H[1-6]$/.test(element.tagName) && Number(element.tagName.slice(1)) <= level) {
      break;
    }

    elements.push(element);
    element = element.nextElementSibling;
  }

  return elements;
};

const isInSection = (node, sectionElements) => {
  const section = new Set(sectionElements);
  let current = node;

  while (current) {
    if (section.has(current)) {
      return true;
    }

    current = current.parentElement;
  }

  return false;
};

const getBlock = (element) => {
  return element.closest(BLOCK_SELECTOR) ?? element;
};

const scrollToElement = (element, headerHeight, attempts = 4) => {
  if (!element) {
    return;
  }

  const top = window.scrollY + element.getBoundingClientRect().top - headerHeight;

  window.scrollTo({
    top: Math.max(0, top),
  });

  // Next.js scrolls to the top after a route change, which can override this
  // position; re-align until the element stays under the header.
  if (attempts > 1) {
    setTimeout(() => {
      if (Math.abs(element.getBoundingClientRect().top - headerHeight) > 4) {
        scrollToElement(element, headerHeight, attempts - 1);
      }
    }, 100);
  }
};

/**
 * Scrolls to the first highlighted word of the active search query. The scroll
 * position is measured from the matched element at scroll time, so it stays
 * correct whatever the viewport width is.
 */
const SearchScroll = ({ headerHeight = 0 }) => {
  const { query } = useSearchQuery();

  useEffect(() => {
    if (!query) {
      return undefined;
    }

    const anchor = ensureString(window.location.hash).slice(1);
    let elapsed = 0;
    let timer = null;

    const scrollToMatch = () => {
      const mainContent = document.querySelector('#main > .main-content');
      const anchorElement = anchor ? document.getElementById(anchor) : null;
      const marks = mainContent ? Array.from(mainContent.querySelectorAll(MARK_SELECTOR)) : [];

      // The MDX content renders progressively and the marks only exist once the
      // content is rendered, so keep looking until both are available.
      if (!mainContent || marks.length === 0 || (anchor && !anchorElement)) {
        elapsed += CHECK_INTERVAL;

        if (elapsed < MAX_WAIT) {
          timer = setTimeout(scrollToMatch, CHECK_INTERVAL);
        } else {
          timer = null;
          // Nothing matched: land on the section heading instead.
          scrollToElement(anchorElement, headerHeight);
        }

        return;
      }

      timer = null;

      const section = getSection(anchor);
      const mark = section
        ? marks.find((element) => isInSection(element, section)) ?? marks[0]
        : marks[0];

      scrollToElement(getBlock(mark), headerHeight);
    };

    scrollToMatch();

    return () => {
      clearTimeout(timer);
    };
  }, [query, headerHeight]);

  return null;
};

SearchScroll.displayName = 'SearchScroll';

export default SearchScroll;
