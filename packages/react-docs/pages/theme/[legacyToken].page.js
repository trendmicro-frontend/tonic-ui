import Head from 'next/head';
import { useEffect } from 'react';

const legacyTokens = ['borders', 'colors', 'fonts', 'fontSizes', 'fontWeights', 'lineHeights', 'outlines', 'radii', 'shadows', 'sizes', 'space', 'zIndices'];

export function getStaticPaths() {
  return {
    paths: legacyTokens.map(legacyToken => ({ params: { legacyToken } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { token: params.legacyToken } };
}

export default function LegacyTokenPage({ token }) {
  const basePath = process.env.TONIC_UI_REACT_DOCS_BASE_PATH || '';
  const destination = `${basePath}/theme/design-tokens/${token}/`;

  useEffect(() => {
    const { search, hash } = window.location;
    window.location.replace(`${destination}${search}${hash}`);
  }, [destination]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=${destination}`} />
        </noscript>
      </Head>
      <p>This design token page has moved. <a href={destination}>View the {token} tokens</a>.</p>
    </>
  );
}
