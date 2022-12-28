import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  TonicProvider,
  colorStyle, // [optional] It's required only when you want to customize the color style
} from '@tonic-ui/react';
import App from './App';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <TonicProvider
      colorMode={{
        defaultValue: 'dark', // One of: 'dark', 'light'
      }}
      colorStyle={{
        defaultValue: colorStyle, // Custom color style
      }}
      useCSSBaseline={true} // If `true`, apply CSS reset and base styles
    >
      <Layout>
        <App />
      </Layout>
    </TonicProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
