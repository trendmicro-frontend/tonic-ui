// Original: https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css
export const codeBlockLight = {
  plain: {
    color: '#393A34',
    backgroundColor: '#f2f2f2'
  },
  styles: [{
    types: ['comment', 'prolog', 'doctype', 'cdata'],
    style: {
      color: '#999988',
      fontStyle: 'italic'
    }
  }, {
    types: ['namespace'],
    style: {
      opacity: 0.7
    }
  }, {
    types: ['string', 'attr-value'],
    style: {
      color: '#e3116c'
    }
  }, {
    types: ['punctuation', 'operator'],
    style: {
      color: '#393A34'
    }
  }, {
    types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
    style: {
      color: '#36acaa'
    }
  }, {
    types: ['atrule', 'keyword', 'attr-name', 'selector'],
    style: {
      color: '#00a4db'
    }
  }, {
    types: ['function', 'deleted', 'tag'],
    style: {
      color: '#d73a49'
    }
  }, {
    types: ['function-variable'],
    style: {
      color: '#6f42c1'
    }
  }, {
    types: ['tag', 'selector', 'keyword'],
    style: {
      color: '#00009f'
    }
  }]
};

export const codeBlockDark = {
  plain: {
    color: '#9CDCFE',
    backgroundColor: 'black'
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(0, 0, 128)'
      }
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(106, 153, 85)'
      }
    },
    {
      types: ['builtin', 'changed', 'keyword'],
      style: {
        color: 'rgb(86, 156, 214)'
      }
    },
    {
      types: ['number', 'inserted'],
      style: {
        color: 'rgb(181, 206, 168)'
      }
    },
    {
      types: ['constant'],
      style: {
        color: 'rgb(100, 102, 149)'
      }
    },
    {
      types: ['attr-name', 'variable'],
      style: {
        color: 'rgb(156, 220, 254)'
      }
    },
    {
      types: ['deleted', 'string', 'attr-value'],
      style: {
        color: 'rgb(206, 145, 120)'
      }
    },
    {
      types: ['selector'],
      style: {
        color: 'rgb(215, 186, 125)'
      }
    },
    {
      // Fix tag color
      types: ['tag'],
      style: {
        color: 'rgb(78, 201, 176)'
      }
    },
    {
      // Fix tag color for HTML
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: 'rgb(86, 156, 214)'
      }
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'rgb(212, 212, 212)'
      }
    },
    {
      // Fix punctuation color for HTML
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: '#808080'
      }
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(220, 220, 170)'
      }
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(78, 201, 176)'
      }
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(209, 105, 105)'
      }
    }
  ]
};
