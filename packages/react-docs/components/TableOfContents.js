import {
  Box,
  Link,
} from '@tonic-ui/react';
import { canUseDOM } from '@tonic-ui/utils';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useThrottledCallbackOnScroll from '../hooks/useThrottledCallbackOnScroll';
import x from '../utils/json-stringify';
 
const TableOfContents = (props) => {
  const router = useRouter();
  const [nodes, setNodes] = useState([]);
  const tree = useMemo(() => {
    const rootNode = {
      children: [],
      parent: null,
    };

    let currentNode = rootNode;
    for (const node of nodes) {
      const newNode = {
        id: node.id,
        tagName: node.tagName,
        textContent: node.textContent,
        children: [],
        parent: currentNode,
      };

      if (currentNode && currentNode.tagName && node.tagName > currentNode.tagName) {
        currentNode.children.push(newNode);
      } else {
        while (currentNode && currentNode.tagName && node.tagName <= currentNode.tagName) {
          currentNode = currentNode.parent;
        }
        if (currentNode) {
          currentNode.children.push(newNode);
        }
      }

      currentNode = newNode;
    }

    return rootNode;
  }, [nodes]);

  useEffect(() => {
    if (!canUseDOM()) {
      return null;
    }

    setActiveIndex(null);

    const mainContent = document.querySelector('#main > .main-content');
    if (mainContent) {
      // Use the `:scope` pseudo-class to select all direct child heading elements of the main content, excluding h1
      const headingSelectors = ['h2', 'h3', 'h4', 'h5', 'h6'].map(h => `:scope>${h}`).join(',');
      setNodes(Array.from(mainContent.querySelectorAll(headingSelectors)));
    }

    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]); // update nodes on routing change

  const [activeIndex, setActiveIndex] = useState(null);
  const clickTargetRef = useRef(null);
  const clickTimeoutRef = useRef(null);
  const findActiveIndex = useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickTargetRef.current) {
      return;
    }

    let activeNode;
    for (let i = nodes.length - 1; i >= 0; i -= 1) {
      const node = nodes[i];
      const el = document.getElementById(node.id);

      if (process.env.NODE_ENV !== 'production') {
        if (!el) {
          console.error(`Element with ID ${x(node.id)} not found`);
        }
      }

      const headerHeight = 48;
      const paddingY = 12;
      const thresholdTopOffset = document.documentElement.scrollTop + headerHeight + paddingY;
      if (el && (el.offsetTop <= thresholdTopOffset)) {
        activeNode = node;
        break;
      }
    }

    if (activeNode && activeIndex !== activeNode.id) {
      setActiveIndex(activeNode.id);
    }
  }, [activeIndex, nodes]);

  useThrottledCallbackOnScroll(nodes.length > 0 ? findActiveIndex : null, 1000 / 60);

  const handleClick = (id) => (event) => {
    // Ignore click for new tab/new window behavior
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
      return;
    }

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    // Used to disable `findActiveIndex()` if the page scrolls due to a click
    clickTargetRef.current = event.target;
    clickTimeoutRef.current = setTimeout(() => {
      clickTargetRef.current = null;
    }, 1000);

    if (activeIndex !== id) {
      setActiveIndex(id);
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
    };
  }, []);

  const NavList = ({ nodes }) => {
    return (
      <Box as="ul" className="toc-list">
        {nodes.map(node => {
          return (
            <NavItem
              key={node.id}
              nodes={node.children}
              className={`toc-item toc-item-${node.tagName.toLowerCase()}`}
            >
              <Link
                className={activeIndex === node.id ? `toc-link toc-link-${node.tagName.toLowerCase()} active` : `toc-link toc-link-${node.tagName.toLowerCase()}`}
                href={`#${node.id}`}
                onClick={handleClick(node.id)}
              >
                {node.textContent}
              </Link>
            </NavItem>
          );
        })}
      </Box>
    );
  };

  const NavItem = ({ children, nodes }) => {
    return (
      <Box as="li">
        {children}
        {(nodes.length > 0) && (
          <NavList nodes={nodes} />
        )}
      </Box>
    );
  };

  return (
    <Box as="nav" className="toc" id="toc">
      <Box className="toc-heading">
        Contents
      </Box>
      <NavList nodes={tree.children} />
    </Box>
  );
};

TableOfContents.displayName = 'TableOfContents';

export default TableOfContents;
