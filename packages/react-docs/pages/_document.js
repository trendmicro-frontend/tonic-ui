import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const BASE_PATH = process.env.BASE_PATH;

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href={`${BASE_PATH}/tonic-favicon-dark.ico`} />
          <script
            data-tonic-ui
            dangerouslySetInnerHTML={{
              __html: `
              (function (initialValue) {
                var mql = window.matchMedia('(prefers-color-scheme: dark)');
                var systemPreference = mql.matches ? 'dark' : 'light';
                var persistedPreference;

                try {
                  persistedPreference = localStorage.getItem('tonic-ui-color-mode');
                } catch (e) {
                  console.log('Tonic UI: localStorage is not available. Color mode persistence might not work properly in this environment.');
                }

                var colorMode;
                if (persistedPreference) {
                  colorMode = persistedPreference;
                } else {
                  colorMode = initialValue === 'system' ? systemPreference : initialValue;
                }

                var root = document.documentElement;
                root.style.setProperty('color-scheme', colorMode);
              })('system');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
