import CodeBlock from '@/components/CodeBlock';

// Self-corrects across environments: TONIC_UI_REACT_DOCS_BASE_PATH is baked
// in per deployment (dev server has none, PR previews and production each
// get their own), and window.location.origin is always correct at runtime.
const InstallCommand = () => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const basePath = process.env.TONIC_UI_REACT_DOCS_BASE_PATH || '';
  const command = `curl -fsSL ${origin}${basePath}/tonic-ui-pr-install.sh | bash`;

  return (
    <CodeBlock code={command} language="bash" />
  );
};

export default InstallCommand;
