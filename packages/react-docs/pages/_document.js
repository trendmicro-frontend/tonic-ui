import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="tonic-favicon-dark.ico" />
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

                var customProperty = {
                  'background-color': {
                    light: 'white',
                    dark: '#151515',
                  }[colorMode],
                  'color': {
                    light: 'rgba(0, 0, 0, .92)',
                    dark: 'rgba(255, 255, 255, .92)',
                  }[colorMode],
                  'color-scheme': colorMode,
                };
                var rootStyle = '';
                for (const [key, value] of Object.entries(customProperty)) {
                  rootStyle += key + ':' + value + ';';
                }

                document.head.insertAdjacentHTML('beforeend', '<style data-tonic-ui="true">:root{' + rootStyle + '}</style>');
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
