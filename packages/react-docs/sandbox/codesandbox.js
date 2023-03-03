import LZString from 'lz-string';
import { getHtml, getRootIndex, getDefaultComponent } from './create-react-app';

const createReactApp = (options) => {
  const {
    title = 'React demo app',
    code, 
  } = { ...options };

  const language = 'en';
  const files = {
    'public/index.html': {
      content: getHtml({ language, title }),
    },
    [`index.js`]: {
      content: getRootIndex(),
    },
    [`demo.js`]: {
      content: code ?? getDefaultComponent(),
    },
  };
  const description = 'React demo app';
  const dependencies = {
    '@tonic-ui/react': 'latest',
    '@tonic-ui/react-hooks': 'latest',
    'react': 'latest',
    'react-dom': 'latest',
  };
  const devDependencies = {
  };

  files['package.json'] = {
    content: {
      description,
      dependencies,
      devDependencies,
    },
  };

  return { title, description, files, dependencies, devDependencies };
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

const open = ({ title, code }) => {
  const { files } = createReactApp({ title, code });
  const parameters = compress({ files });              
    
  // ref: https://codesandbox.io/docs/api/#define-api                                    
  const form = document.createElement('form');                                                 
  form.method = 'POST';                           
  form.target = '_blank';               
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
  addHiddenInput(form, 'parameters', parameters);
  addHiddenInput(                 
    form,       
    'query',                      
    'file=/demo.js',
  );
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export {
  open,
};
