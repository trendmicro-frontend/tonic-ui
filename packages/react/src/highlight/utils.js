import React from 'react';

/**
 * Transforms text nodes (string content) in JSX children while preserving JSX elements
 * @param {React.ReactNode} children - JSX children
 * @param {(text: string) => React.ReactNode | null} callback - Function to transform text content
 * @returns {React.ReactNode} - JSX with transformed text nodes
 */
function transformTextNodes(children, callback) {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') {
        // Apply callback to text nodes
        return callback(child);
      } else if (React.isValidElement(child)) {
        // Recursively transform nested children
        return React.cloneElement(child, {
          children: transformTextNodes(child.props.children, callback),
        });
      }
      return child; // leave non-text, non-element nodes as-is
    })
    .filter((child) => child != null); // remove null/undefined if callback returns null
}

export {
  transformTextNodes,
};
