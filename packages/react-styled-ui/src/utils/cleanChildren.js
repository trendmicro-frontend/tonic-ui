
import { Children, isValidElement } from 'react';

export default function cleanChildren (children) {
  return Children.toArray(children).filter(child => isValidElement(child));
}
