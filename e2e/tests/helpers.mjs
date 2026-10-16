// Every CDN load in the demos resolves through esm.sh (builds) or raw.esm.sh
// (published-tarball files). Matching both hosts covers the import-map entries
// and the sub-requests the modules make.
export const CDN_HOSTS = /https:\/\/(?:raw\.)?esm\.sh\//;

// Abort every CDN request so the apps exercise their local path or fail
// deterministically without touching the network.
export async function blockCdn(page) {
  await page.route(CDN_HOSTS, route => route.abort());
}

