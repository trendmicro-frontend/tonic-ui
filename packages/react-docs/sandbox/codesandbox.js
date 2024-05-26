import LZString from 'lz-string';
import { ensureArray, ensurePlainObject, ensureString } from 'ensure-type';
import { getHtml, getJSConfigJSON, getRootIndex, getDefaultComponent } from './create-react-app';
import pkg from '../package.json';

const resolveDependencies = (contents) => {
  const getTonicUIPackageVersion = (packageName, defaultPackageVersion = 'latest') => {
    const commitShort = process.env.CI_PULL_REQUEST_NUMBER ? process.env.CI_COMMIT_SHORT : undefined;
    if (!commitShort) {
      return defaultPackageVersion;
    }
    return `https://pkg.csb.dev/trendmicro-frontend/tonic-ui/commit/${commitShort}/@tonic-ui/${packageName}`;
  };

  const versionMap = {
    ...pkg.devDependencies,
    '@tonic-ui/react': getTonicUIPackageVersion('react', '3.x'),
    '@tonic-ui/react-base': getTonicUIPackageVersion('react-base', '3.x'),
    '@tonic-ui/react-hooks': getTonicUIPackageVersion('react-hooks', '3.x'),
    '@tonic-ui/react-icons': getTonicUIPackageVersion('react-icons', '3.x'),
    '@tonic-ui/styled-system': getTonicUIPackageVersion('styled-system', '3.x'),
    '@tonic-ui/theme': getTonicUIPackageVersion('theme', '3.x'),
    '@tonic-ui/utils': getTonicUIPackageVersion('utils', '3.x'),
  };

  const extractDependenciesFromContent = (content) => {
    const dependencies = {};

    let r = null;
    const reImportStatement = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)'/gm;
    while ((r = reImportStatement.exec(content))) {
      const fullName = ensureString(r[2] ?? r[1]);

      if (fullName.startsWith('@/')) {
        // Ignore absolute imports
        continue;
      }

      const name = fullName[0] === '@'
        ? fullName.split('/', 2).join('/') // scoped package
        : fullName.split('/', 1)[0];

      if (!dependencies[name] && !name.startsWith('.')) {
        dependencies[name] = versionMap[name] ?? 'latest';
      }
    }

    return dependencies;
  };

  return ensureArray(contents).reduce((dependencies, content) => {
    return {
      ...dependencies,
      ...extractDependenciesFromContent(content),
    };
  }, {});
};

const createReactApp = (sandboxOptions) => {
  const {
    files,
    language = 'en',
    raw,
    title = '',
  } = { ...sandboxOptions };

  const rootContent = getRootIndex();
  const appContent = raw ?? getDefaultComponent();

  // Resolve dependencies from all files
  const resolvedDependencies = resolveDependencies([
    rootContent,
    appContent,
    ...Object.values(ensurePlainObject(files)),
  ]);

  return {
    ...Object.entries(ensurePlainObject(files)).reduce((acc, [path, content]) => {
      acc[path] = { content };
      return acc;
    }, {}),
    'public/index.html': {
      content: getHtml({ language, title }),
    },
    'src/app.js': {
      content: appContent,
    },
    'src/index.js': {
      content: rootContent,
    },
    'jsconfig.json': {
      content: getJSConfigJSON(),
    },
    'package.json': {
      content: {
        description: title,
        dependencies: {
          ...resolvedDependencies,
        },
      },
    },
  };
};

const compress = (object) => {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
};

const addHiddenInput = (form, name, value) => {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
};

const open = (sandboxOptions) => {
  const parameters = compress({
    files: createReactApp(sandboxOptions),
  });

  // ref: https://codesandbox.io/docs/api/#define-api                                    
  const form = document.createElement('form');                                                 
  form.method = 'POST';                           
  form.target = '_blank';               
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
  addHiddenInput(form, 'parameters', parameters);
  addHiddenInput(form, 'query', 'file=/src/app.js');
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export {
  open,
};
