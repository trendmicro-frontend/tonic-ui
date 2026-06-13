import { runIfFn } from '@tonic-ui/utils';
import React, { useMemo } from 'react';
import { EnvironmentContext } from './context';

const getDocument = (node) => {
  // If node is a Document, return it directly
  if (node?.nodeType === Node.DOCUMENT_NODE) {
    return node;
  }

  // If node is a ShadowRoot or Element, return ownerDocument
  return node?.ownerDocument ?? document;
};

const getWindow = (node) => {
  const doc = getDocument(node);
  return doc?.defaultView ?? window;
};

const EnvironmentProvider = (props) => {
  const { value, children } = props;

  const getRootNode = useMemo(() => {
    return () => runIfFn(value) ?? document;
  }, [value]);

  const environment = useMemo(
    () => ({
      getRootNode,
      getWindow: () => getWindow(getRootNode()),
      getDocument: () => getDocument(getRootNode()),
    }),
    [getRootNode],
  );

  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
};

EnvironmentProvider.displayName = 'EnvironmentProvider';

export default EnvironmentProvider;
