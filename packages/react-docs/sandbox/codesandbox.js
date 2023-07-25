import LZString from 'lz-string';
import { ensurePlainObject } from 'ensure-type';
import { getHtml, getJSConfigJSON, getRootIndex, getDefaultComponent } from './create-react-app';

const createReactApp = (sandboxOptions) => {
  const {
    dependencies = {},
    devDependencies = {},
    files,
    language = 'en',
    raw,
    title = '',
  } = { ...sandboxOptions };

  return {
    ...Object.entries(ensurePlainObject(files)).reduce((acc, [path, content]) => {
      acc[path] = { content };
      return acc;
    }, {}),
    'public/index.html': {
      content: getHtml({ language, title }),
    },
    'src/app.js': {
      content: raw ?? getDefaultComponent(),
    },
    'src/index.js': {
      content: getRootIndex(),
    },
    'jsconfig.json': {
      content: getJSConfigJSON(),
    },
    'package.json': {
      content: {
        description: title,
        dependencies: {
          'react': 'latest',
          'react-dom': 'latest',
          ...dependencies,
        },
        devDependencies: {
          ...devDependencies,
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
