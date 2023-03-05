import { ensureString } from 'ensure-type';
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const BASE_PATH = ensureString(process.env.BASE_PATH);
const MATOMO_URL = ensureString(process.env.MATOMO_URL);
const MATOMO_CONTAINER_ID = ensureString(process.env.MATOMO_CONTAINER_ID);
const TONIC_UI_REACT_DOCS_VERSION = ensureString(process.env.TONIC_UI_REACT_DOCS_VERSION);

const MATOMO_TAG_MANAGER_SCRIPT = `
(function () {
var _mtm = window._mtm = window._mtm || [];
_mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
_mtm.push({ version: '${TONIC_UI_REACT_DOCS_VERSION}' });
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
g.async=true; g.src='${MATOMO_URL}/js/container_${MATOMO_CONTAINER_ID}.js?_=${TONIC_UI_REACT_DOCS_VERSION}'; s.parentNode.insertBefore(g,s);
})();
`.trim();

const COLOR_MODE_SCRIPT = `
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
`.trim();

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
              dangerouslySetInnerHTML={{ __html: MATOMO_TAG_MANAGER_SCRIPT }}
            />
          )}
          <script
            data-tonic-ui
            dangerouslySetInnerHTML={{ __html: COLOR_MODE_SCRIPT }}
          />
        </Head>
        <body>
          <Main />
          <svg
            xmlms="http://www.w3.org/2000/svg"
            style={{
              display: 'none',
            }}
          >
            <symbol id="anchor-link-icon" viewBox="0 0 16 16">
              <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
            </symbol>
          </svg>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
