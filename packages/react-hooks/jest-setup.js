import '@testing-library/jest-dom';
import 'jest-extended';

// React 18 requires this global to be set for act() to work in jsdom
global.IS_REACT_ACT_ENVIRONMENT = true;
