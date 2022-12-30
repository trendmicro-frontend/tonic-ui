import { ensureString } from 'ensure-type';
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const BASE_PATH = ensureString(process.env.BASE_PATH);
const MATOMO_URL = ensureString(process.env.MATOMO_URL);
const MATOMO_CONTAINER_ID = ensureString(process.env.MATOMO_CONTAINER_ID);
const TONIC_UI_REACT_DOCS_VERSION = ensureString(process.env.TONIC_UI_REACT_DOCS_VERSION);

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
          {(MATOMO_URL && MATOMO_CONTAINER_ID) && (
          <script
            data-matomo-tag-manager
            dangerouslySetInnerHTML={{
              __html: `
              var _mtm = window._mtm = window._mtm || [];
              _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='${MATOMO_URL}/js/container_${MATOMO_CONTAINER_ID}.js'; s.parentNode.insertBefore(g,s);
              _mtm.push({ version: '${TONIC_UI_REACT_DOCS_VERSION}' });
              `,
            }}
          />
          )}
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
