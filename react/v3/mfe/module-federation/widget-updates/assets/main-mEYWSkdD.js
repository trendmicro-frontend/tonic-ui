import { _ as __mf_1, a as __mf_2 } from './_virtual_mf___mfe_internal__widget_updates__loadShare__react_mf_1_jsx_mf_2_runtime__loadShare__.js-DJVUU5ri.js';
import { R as React, a as __mf_33, b as __mf_13, c as __mf_16, d as __mf_25, e as __mf_14, f as __mf_3, g as __mf_37, h as __mf_36, i as __mf_28, j as __mf_24, k as __mf_38, l as __mf_34 } from './_virtual_mf___mfe_internal__widget_updates__loadShare__react__loadShare__.js-D6hxoBD0.js';

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/

function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  } // this function should always return with a value
  // TS can't understand it though so we make it stop complaining here


  return undefined;
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    this.tags.forEach(function (tag) {
      var _tag$parentNode;

      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';

var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var IMPORT = '@import';
var KEYFRAMES = '@keyframes';
var LAYER = '@layer';

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode;

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign;

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

var line = 1;
var column = 1;
var length = 0;
var position$2 = 0;
var character = 0;
var characters = '';

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return assign(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position$2 > 0 ? charat(characters, --position$2) : 0;

	if (column--, character === 10)
		column = 1, line--;

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position$2 < length ? charat(characters, position$2++) : 0;

	if (column++, character === 10)
		column = 1, line++;

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position$2)
}

/**
 * @return {number}
 */
function caret () {
	return position$2
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = strlen(characters = value), position$2 = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position$2 - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next();
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position$2
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character);
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type);
				break
			// \
			case 92:
				next();
				break
		}

	return position$2
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position$2 - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next();

	return slice(index, position$2)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = '';
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && charat(characters, length - 1) == 58) {
					if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1;
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character);
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous);
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7);
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent), declarations);
						break
					default:
						characters += '/';
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand;
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0;
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '');
						if (property > 0 && (strlen(characters) - length))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations);
						break
					// @ ;
					case 59: characters += ';';
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children);
							else
								switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children);
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous;
			default:
				if (variable < 1)
					if (character == 123)
						--variable;
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1);
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next());

						atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0;
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [''];
	var size = sizeof(rule);

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z;

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length)
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = '';
	var length = sizeof(children);

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || '';

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify$1 (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case RULESET: element.value = element.props.join(',');
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection);

	return function (element, index, children, callback) {
		var output = '';

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || '';

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element);
	}
}

var weakMemoize = function weakMemoize(func) {
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // Use non-null assertion because we just checked that the cache `has` it
      // This allows us to remove `undefined` from the return value
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize$2(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (token(character)) {
      break;
    }

    next();
  }

  return slice(begin, position$2);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (token(character)) {
      case 0:
        // &\f
        if (character === 38 && peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(position$2 - 1, points, index);
        break;

      case 2:
        parsed[index] += delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += from(character);
    }
  } while (character = next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return dealloc(toRules(alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value;
  var parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch (hash(value, length)) {
    // color-adjust
    case 5103:
      return WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order

    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return replace(value, ':', ':' + WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return WEBKIT + value + MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case KEYFRAMES:
      return serialize([copy(element, {
        value: replace(element.value, '@', '@' + WEBKIT)
      })], callback);

    case RULESET:
      if (element.length) return combine(element.props, function (value) {
        switch (match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return serialize([copy(element, {
              props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return serialize([copy(element, {
              props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]
            }), copy(element, {
              props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]
            }), copy(element, {
              props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if (key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }

      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' ');

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  {
    var currentSheet;
    var finalizingPlugins = [stringify$1, rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return serialize(compile(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var reactIs$1 = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;

{
  reactIs$1.exports = reactIs_production_min;
}

var reactIsExports = reactIs$1.exports;

var reactIs = reactIsExports;
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

var isBrowser = true;

function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else if (className) {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false ) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize$2(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  var componentSelector = interpolation;

  if (componentSelector.__emotion_styles !== undefined) {

    return componentSelector;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        var keyframes = interpolation;

        if (keyframes.anim === 1) {
          cursor = {
            name: keyframes.name,
            styles: keyframes.styles,
            next: cursor
          };
          return keyframes.name;
        }

        var serializedStyles = interpolation;

        if (serializedStyles.styles !== undefined) {
          var next = serializedStyles.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = serializedStyles.styles + ";";
          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }

        break;
      }
  } // finalize string values (regular strings and functions interpolated into css calls)


  var asString = interpolation;

  if (registered == null) {
    return asString;
  }

  var cached = registered[asString];
  return cached !== undefined ? cached : asString;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];

      if (typeof value !== 'object') {
        var asString = value;

        if (registered != null && registered[asString] !== undefined) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(key) + ":" + interpolated + ";";
                break;
              }

            default:
              {

                string += key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g; // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list

var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;

    styles += asTemplateStringsArr[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      var templateStringsArr = strings;

      styles += templateStringsArr[i];
    }
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + match[1];
  }

  var name = murmur2(styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
}

var syncFallback = function syncFallback(create) {
  return create();
};

var useInsertionEffect = React['useInsertion' + 'Effect'] ? React['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback = useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || __mf_33;

var EmotionCacheContext = /* #__PURE__ */__mf_13( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);

var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  return /*#__PURE__*/__mf_16(function (props, ref) {
    // the cache will never be null in the browser
    var cache = __mf_25(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

var ThemeContext = /* #__PURE__ */__mf_13({});

var useTheme$2 = function useTheme() {
  return __mf_25(ThemeContext);
};

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    return mergedTheme;
  }

  return _extends({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */weakMemoize(function (outerTheme) {
  return weakMemoize(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider$2 = function ThemeProvider(props) {
  var theme = __mf_25(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/__mf_14(ThemeContext.Provider, {
    value: theme
  }, props.children);
};

var hasOwn$1 = {}.hasOwnProperty;

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {

  var newProps = {};

  for (var _key in props) {
    if (hasOwn$1.call(props, _key)) {
      newProps[_key] = props[_key];
    }
  }

  newProps[typePropName] = type; // Runtime labeling is an opt-in feature because:

  return newProps;
};

var Insertion$1 = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function () {
    return insertStyles(cache, serialized, isStringTag);
  });

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles, undefined, __mf_25(ThemeContext));

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var _key2 in props) {
    if (hasOwn$1.call(props, _key2) && _key2 !== 'css' && _key2 !== typePropName && (true )) {
      newProps[_key2] = props[_key2];
    }
  }

  newProps.className = className;

  if (ref) {
    newProps.ref = ref;
  }

  return /*#__PURE__*/__mf_14(__mf_3, null, /*#__PURE__*/__mf_14(Insertion$1, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/__mf_14(WrappedComponent, newProps));
});

var Emotion$1 = Emotion;

var jsx$1 = function jsx(type, props) {
  // eslint-disable-next-line prefer-rest-params
  var args = arguments;

  if (props == null || !hasOwn$1.call(props, 'css')) {
    return __mf_14.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion$1;
  createElementArgArray[1] = createEmotionProps(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  }

  return __mf_14.apply(null, createElementArgArray);
};

(function (_jsx) {
  var JSX;

  (function (_JSX) {})(JSX || (JSX = _jsx.JSX || (_jsx.JSX = {})));
})(jsx$1 || (jsx$1 = {}));

// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, __mf_25(ThemeContext));
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = __mf_37();
  useInsertionEffectWithLayoutFallback(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false;
    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffectWithLayoutFallback(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

function _arrayLikeToArray$3(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles$3(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty$4(e, r, t) {
  return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArrayLimit$3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function (r) {
      _defineProperty$4(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray$3(r, e) {
  return _arrayWithHoles$3(r) || _iterableToArrayLimit$3(r, e) || _unsupportedIterableToArray$3(r, e) || _nonIterableRest$3();
}
function _toPrimitive$4(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof$3(o) {
  "@babel/helpers - typeof";

  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof$3(o);
}
function _unsupportedIterableToArray$3(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$3(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0;
  }
}

/**
 * A custom Hook that runs a callback at most once when a condition becomes true.
 *
 * @param {function} callback - The callback to run.
 * @param {boolean} when - The condition to run the callback.
 */
var useOnceWhen = function useOnceWhen(callback) {
  var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var ref = __mf_37(false);
  if (when && !ref.current) {
    if (typeof callback === 'function') {
      callback();
    }
    ref.current = true;
  }
};
var useOnceWhen$1 = useOnceWhen;

function _arrayLikeToArray$2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles$2(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles$1(r) {
  if (Array.isArray(r)) return _arrayLikeToArray$2(r);
}
function _createForOfIteratorHelper$1(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray$2(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty$3(e, r, t) {
  return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray$1(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit$2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function (r) {
      _defineProperty$3(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _slicedToArray$2(r, e) {
  return _arrayWithHoles$2(r) || _iterableToArrayLimit$2(r, e) || _unsupportedIterableToArray$2(r, e) || _nonIterableRest$2();
}
function _toConsumableArray$1(r) {
  return _arrayWithoutHoles$1(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$2(r) || _nonIterableSpread$1();
}
function _toPrimitive$3(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof$2(o) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof$2(o);
}
function _unsupportedIterableToArray$2(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0;
  }
}

var isNullish = function isNullish(value) {
  return value === null || value === undefined;
};

// https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
var isPlainObject$1 = function isPlainObject(value) {
  if (_typeof$2(value) !== 'object' || value === null) {
    return false;
  }
  var prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};

var canUseDOM = function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

var ensureArray = function ensureArray(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (value === undefined || value === null) {
    return [].concat(defaultValue);
  }

  return Array.isArray(value) ? value : [].concat(value);
};

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
var isPlainObject = function isPlainObject(obj) {
  if (_typeof$1(obj) !== 'object' || obj === null) {
    return false;
  }

  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
};

var ensurePlainObject = function ensurePlainObject(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (value === undefined || value === null) {
    return ensurePlainObject(defaultValue);
  }

  return isPlainObject(value) ? value : ensurePlainObject(defaultValue);
};

var ensureString = function ensureString(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (value === undefined || value === null) {
    return String(defaultValue);
  }

  return typeof value === 'string' ? value : String(value); // string coercible value
};

var _deepClone = function _deepClone2(source) {
  var seen = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new WeakMap();
  if (seen.has(source)) {
    return seen.get(source);
  }
  if (Array.isArray(source)) {
    var clonedArray = [];
    seen.set(source, clonedArray);
    for (var i = 0; i < source.length; ++i) {
      clonedArray[i] = _deepClone2(source[i], seen);
    }
    return clonedArray;
  }
  if (isPlainObject$1(source)) {
    var clonedObject = {};
    seen.set(source, clonedObject);
    for (var _i = 0, _Object$entries = Object.entries(source); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray$2(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
      clonedObject[key] = _deepClone2(value, seen);
    }
    return clonedObject;
  }
  return source;
};
function _parsePath(path) {
  var pattern = /[^.[\]'"]+|\[(-?\d+(?:\.\d*)?)\]|\["([^"]*)"\]|\['([^']*)'\]/g;
  var parts = [];
  var match;
  while (match = pattern.exec(path)) {
    var _ref, _ref2, _match$;
    parts.push((_ref = (_ref2 = (_match$ = match[1]) !== null && _match$ !== void 0 ? _match$ : match[2]) !== null && _ref2 !== void 0 ? _ref2 : match[3]) !== null && _ref !== void 0 ? _ref : match[0]);
  }
  return parts;
}
var get = function get2(object, path, defaultValue) {
  if (!isPlainObject$1(object) && !Array.isArray(object)) {
    return defaultValue;
  }
  if (!Array.isArray(path)) {
    var pathStr = String(path);
    if (Object.prototype.hasOwnProperty.call(object, pathStr)) {
      return object[pathStr];
    }
  }
  var keys = Array.isArray(path) ? path : _parsePath(String(path));
  if (keys.length === 0) {
    return defaultValue;
  }
  var current = object;
  var _iterator = _createForOfIteratorHelper$1(keys), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var key = _step.value;
      if (current === void 0) {
        return defaultValue;
      }
      current = current[key];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return current === void 0 ? defaultValue : current;
};
var merge = function merge2(target, source) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    clone: true
  };
  if (Array.isArray(target) && Array.isArray(source)) {
    var output = options.clone ? _toConsumableArray$1(target) : target;
    source.forEach(function(item, index) {
      if (isPlainObject$1(item) && isPlainObject$1(output[index])) {
        output[index] = merge2(output[index], item, options);
      } else {
        output[index] = options.clone ? _deepClone(item) : item;
      }
    });
    return output;
  }
  if (isPlainObject$1(target) && isPlainObject$1(source)) {
    var _output = options.clone ? _objectSpread2$3({}, target) : target;
    for (var _i2 = 0, _Object$entries2 = Object.entries(source); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray$2(_Object$entries2[_i2], 2), key = _Object$entries2$_i[0], value = _Object$entries2$_i[1];
      if (isPlainObject$1(value) && Object.prototype.hasOwnProperty.call(_output, key) && isPlainObject$1(_output[key])) {
        _output[key] = merge2(_output[key], value, options);
      } else {
        _output[key] = options.clone ? _deepClone(value) : value;
      }
    }
    return _output;
  }
  return options.clone ? _deepClone(source) : source;
};
var noop = function noop2() {
};
var runIfFn = function runIfFn2(valueOrFn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }
  return typeof valueOrFn === "function" ? valueOrFn.apply(void 0, args) : valueOrFn;
};

var DefaultPropsContext = /*#__PURE__*/__mf_13({});

/**
 * Add keys, values of `defaultProps` that does not exist in `props`
 * @param defaultProps
 * @param props
 * @returns resolved props
 */
var resolveProps = function resolveProps(defaultProps, props) {
  var output = _objectSpread2$4({}, props);
  for (var _i = 0, _Object$entries = Object.entries(defaultProps); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray$3(_Object$entries[_i], 2),
      propName = _Object$entries$_i[0],
      defaultValue = _Object$entries$_i[1];
    if (propName === 'slots') {
      output[propName] = _objectSpread2$4(_objectSpread2$4({}, defaultValue || {}), output[propName] || {});
    } else if (propName === 'slotProps') {
      var defaultSlotProps = defaultValue;
      var slotProps = props[propName];
      if (!slotProps) {
        output[propName] = defaultSlotProps || {};
      } else if (!defaultSlotProps) {
        output[propName] = slotProps;
      } else {
        output[propName] = _objectSpread2$4({}, slotProps);
        for (var slotKey in defaultSlotProps) {
          if (Object.prototype.hasOwnProperty.call(defaultSlotProps, slotKey)) {
            var slotPropName = slotKey;
            output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
          }
        }
      }
    } else if (output[propName] === undefined) {
      output[propName] = defaultValue;
    }
  }
  return output;
};
var resolveProps$1 = resolveProps;

var getThemeProps = function getThemeProps(_ref) {
  var _theme$components;
  var props = _ref.props,
    name = _ref.name,
    theme = _ref.theme;
  var config = theme === null || theme === void 0 ? void 0 : (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : _theme$components[name];
  if (config === undefined) {
    return props;
  }
  if (config !== null && config !== void 0 && config.defaultProps) {
    return resolveProps$1(config.defaultProps, props);
  }
  if (!(config !== null && config !== void 0 && config.styleOverrides) && !(config !== null && config !== void 0 && config.variants)) {
    // no property 'defaultProps'
    return resolveProps$1(config, props);
  }
  return props;
};
var useDefaultProps = function useDefaultProps(_ref2) {
  var props = _ref2.props,
    name = _ref2.name;
  if (!name || typeof name !== 'string') {
    throw new Error('Invalid or missing component name provided to `useDefaultProps`');
  }
  var context = __mf_25(DefaultPropsContext);
  var defaultProps = {
    'data-tonic': name
  };
  if (!context) {
    return resolveProps$1(defaultProps, props);
  }
  var theme = {
    components: context
  };
  return resolveProps$1(defaultProps, getThemeProps({
    props: props,
    name: name,
    theme: theme
  }));
};
var useDefaultProps$1 = useDefaultProps;

var jsx = function jsx(type, props, key) {
  if (!hasOwn$1.call(props, 'css')) {
    return __mf_1(type, props, key);
  }

  return __mf_1(Emotion$1, createEmotionProps(type, props), key);
};
var jsxs = function jsxs(type, props, key) {
  if (!hasOwn$1.call(props, 'css')) {
    return __mf_2(type, props, key);
  }

  return __mf_2(Emotion$1, createEmotionProps(type, props), key);
};

function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles$1(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function (r) {
      _defineProperty$2(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _slicedToArray$1(r, e) {
  return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest$1();
}
function _toPrimitive$2(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}

// eslint-disable-next-line no-undef
var reactPropsRegex$1 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid$1 = /* #__PURE__ */memoize$2(function (prop) {
  return reactPropsRegex$1.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

var testOmitPropsOnStringTag = isPropValid$1;

var testOmitPropsOnComponent = function testOmitPropsOnComponent(key) {
  return key !== 'theme';
};

var getDefaultShouldForwardProp = function getDefaultShouldForwardProp(tag) {
  return typeof tag === 'string' && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps(tag, options, isReal) {
  var shouldForwardProp;

  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function (propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }

  if (typeof shouldForwardProp !== 'function' && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }

  return shouldForwardProp;
};

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  useInsertionEffectAlwaysWithSyncFallback(function () {
    return insertStyles(cache, serialized, isStringTag);
  });

  return null;
};

var createStyled = function createStyled(tag, options) {

  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;

  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp('as');
  return function () {
    // eslint-disable-next-line prefer-rest-params
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== undefined ? tag.__emotion_styles.slice(0) : [];

    if (identifierName !== undefined) {
      styles.push("label:" + identifierName + ";");
    }

    if (args[0] == null || args[0].raw === undefined) {
      // eslint-disable-next-line prefer-spread
      styles.push.apply(styles, args);
    } else {
      var templateStringsArr = args[0];

      styles.push(templateStringsArr[0]);
      var len = args.length;
      var i = 1;

      for (; i < len; i++) {

        styles.push(args[i], templateStringsArr[i]);
      }
    }

    var Styled = withEmotionCache(function (props, cache, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = '';
      var classInterpolations = [];
      var mergedProps = props;

      if (props.theme == null) {
        mergedProps = {};

        for (var key in props) {
          mergedProps[key] = props[key];
        }

        mergedProps.theme = __mf_25(ThemeContext);
      }

      if (typeof props.className === 'string') {
        className = getRegisteredStyles(cache.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }

      var serialized = serializeStyles(styles.concat(classInterpolations), cache.registered, mergedProps);
      className += cache.key + "-" + serialized.name;

      if (targetClassName !== undefined) {
        className += " " + targetClassName;
      }

      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === undefined ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};

      for (var _key in props) {
        if (shouldUseAs && _key === 'as') continue;

        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }

      newProps.className = className;

      if (ref) {
        newProps.ref = ref;
      }

      return /*#__PURE__*/__mf_14(__mf_3, null, /*#__PURE__*/__mf_14(Insertion, {
        cache: cache,
        serialized: serialized,
        isStringTag: typeof FinalTag === 'string'
      }), /*#__PURE__*/__mf_14(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== undefined ? identifierName : "Styled(" + (typeof baseTag === 'string' ? baseTag : baseTag.displayName || baseTag.name || 'Component') + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, 'toString', {
      value: function value() {

        return "." + targetClassName;
      }
    });

    Styled.withComponent = function (nextTag, nextOptions) {
      var newStyled = createStyled(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      }));
      return newStyled.apply(void 0, styles);
    };

    return Styled;
  };
};

function memoize$1(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize$1(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function (r) {
      _defineProperty$1(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive$1(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var createSelectorFunction = function createSelectorFunction2(name) {
  if (Array.isArray(name)) {
    name = name.join(",");
  }
  if (!name || typeof name !== "string") {
    return noop;
  }
  return function(props) {
    var result = {};
    if (props && _typeof(props) === "object") {
      result[name] = props;
    }
    return Object.entries(result);
  };
};
var createFunctionalSelectorFunction = function createFunctionalSelectorFunction2(name) {
  if (Array.isArray(name)) {
    name = name.join(",");
  }
  if (!name || typeof name !== "string") {
    return noop;
  }
  return function(props) {
    var result = {};
    if (props && _typeof(props) === "object") {
      for (var _i = 0, _Object$entries = Object.entries(props); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
        result["".concat(name, "(").concat(key, ")")] = value;
      }
    }
    return Object.entries(result);
  };
};
var pseudoClassSelector = {
  _active: createSelectorFunction(["&:active", "&[data-active]"]),
  _checked: createSelectorFunction(["&:checked", "&[aria-checked=true]", "&[data-checked]"]),
  _disabled: createSelectorFunction(["&:disabled", "&:disabled:focus", "&:disabled:hover", "&[aria-disabled=true]", "&[aria-disabled=true]:focus", "&[aria-disabled=true]:hover", "&[data-disabled]"]),
  _empty: createSelectorFunction("&:empty"),
  _enabled: createSelectorFunction(["&:enabled", "&:enabled:focus", "&:enabled:hover"]),
  _firstChild: createSelectorFunction("&:first-child"),
  _firstOfType: createSelectorFunction("&:first-of-type"),
  _fullscreen: createSelectorFunction("&:fullscreen"),
  _focus: createSelectorFunction(["&:focus", "&[data-focus]"]),
  _focusActive: function() {
    var selectorFunction = createSelectorFunction("&:focus:active");
    return function(props) {
      return selectorFunction(props);
    };
  }(),
  _focusHover: function() {
    var selectorFunction = createSelectorFunction("&:focus:hover");
    return function(props) {
      return selectorFunction(props);
    };
  }(),
  _focusVisible: createSelectorFunction("&:focus-visible"),
  _focusWithin: createSelectorFunction("&:focus-within"),
  _has: createFunctionalSelectorFunction("&:has"),
  _hover: createSelectorFunction(["&:hover", "&[data-hover]"]),
  _indeterminate: createSelectorFunction(["&:indeterminate"]),
  _invalid: createSelectorFunction(["&:invalid", "&[aria-invalid=true]"]),
  _is: createFunctionalSelectorFunction("&:is"),
  _lastChild: createSelectorFunction("&:last-child"),
  _lastOfType: createSelectorFunction("&:last-of-type"),
  _not: createFunctionalSelectorFunction("&:not"),
  _nthOfType: createFunctionalSelectorFunction("&:nth-of-type"),
  _optional: createSelectorFunction("&:optional"),
  _placeholderShown: createSelectorFunction("&:placeholder-shown"),
  _readOnly: createSelectorFunction(["&:read-only", "&[aria-readonly=true]", "&[data-readonly]"]),
  _required: createSelectorFunction("&:required"),
  _selected: createSelectorFunction(["&[aria-selected=true]", "&[data-selected]"]),
  _valid: createSelectorFunction(["&[aria-invalid=false]", "&:valid"]),
  _visited: createSelectorFunction("&:visited")
};
var pseudoElementSelector = {
  __after: createSelectorFunction("&::after"),
  __backdrop: createSelectorFunction("&::backdrop"),
  __before: createSelectorFunction("&::before"),
  __cue: createSelectorFunction("&::cue"),
  __firstLetter: createSelectorFunction("&::first-letter"),
  __firstLine: createSelectorFunction("&::first-line"),
  __marker: createSelectorFunction("&::marker"),
  __placeholder: createSelectorFunction("&::placeholder"),
  __selection: createSelectorFunction("&::selection")
};

var defaultBreakpoints = [];
var createMediaQuery = function createMediaQuery(n) {
  return "@media screen and (min-width: ".concat(n, ")");
};
var parseResponsiveStyle = function parseResponsiveStyle(mediaQueries, sx, scale, raw, _props) {
  var styles = {};
  raw.slice(0, mediaQueries.length).forEach(function (value, i) {
    var media = mediaQueries[i];
    var style = sx(scale, value, _props);
    if (!media) {
      Object.assign(styles, style);
    } else {
      Object.assign(styles, _defineProperty$1({}, media, Object.assign({}, styles[media], style)));
    }
  });
  return styles;
};
var parseResponsiveObject = function parseResponsiveObject(breakpoints, sx, scale, raw, _props) {
  var styles = {};
  for (var key in raw) {
    if (!Object.prototype.hasOwnProperty.call(raw, key)) {
      continue;
    }
    var breakpoint = breakpoints[key];
    var value = raw[key];
    var style = sx(scale, value, _props);
    if (!breakpoint) {
      Object.assign(styles, style);
    } else {
      var media = createMediaQuery(breakpoint);
      Object.assign(styles, _defineProperty$1({}, media, Object.assign({}, styles[media], style)));
    }
  }
  return styles;
};

// sort object-value responsive styles
var sortObject = function sortObject(obj) {
  var next = {};
  Object.keys(obj).sort(function (a, b) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  }).forEach(function (key) {
    next[key] = obj[key];
  });
  return next;
};
var parser = function parser(config) {
  var cache = {};
  var parse = function parse(props) {
    var styles = {};
    var shouldSort = false;
    var isCacheDisabled = props.theme && props.theme.disableStyledSystemCache;
    for (var key in props) {
      if (!config[key]) {
        continue;
      }
      var sx = config[key];
      var raw = props[key];
      var scale = get(props.theme, sx.scale, sx.defaultScale);
      if (_typeof(raw) === 'object') {
        cache.breakpoints = !isCacheDisabled && cache.breakpoints || get(props.theme, 'breakpoints', defaultBreakpoints);
        if (Array.isArray(raw)) {
          cache.media = !isCacheDisabled && cache.media || [null].concat(_toConsumableArray(cache.breakpoints.map(createMediaQuery)));
          styles = merge(styles, parseResponsiveStyle(cache.media, sx, scale, raw, props));
          continue;
        }
        if (raw !== null) {
          styles = merge(styles, parseResponsiveObject(cache.breakpoints, sx, scale, raw, props));
          shouldSort = true;
        }
        continue;
      }
      Object.assign(styles, sx(scale, raw, props));
    }
    if (shouldSort) {
      // sort object-based responsive styles
      styles = sortObject(styles);
    }
    return styles;
  };
  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;
  var keys = Object.keys(config).filter(function (k) {
    return k !== 'config';
  });
  if (keys.length > 1) {
    keys.forEach(function (key) {
      parse[key] = parser(_defineProperty$1({}, key, config[key]));
    });
  }
  return parse;
};
var parser$1 = parser;

var compose = function compose() {
  var config = {};
  for (var _len = arguments.length, parsers = new Array(_len), _key = 0; _key < _len; _key++) {
    parsers[_key] = arguments[_key];
  }
  parsers.forEach(function (p) {
    if (!p || !p.config) {
      return;
    }
    Object.assign(config, p.config);
  });
  return parser$1(config);
};
var compose$1 = compose;

/**
 * Resolve token references in any value.
 *
 * Handles single references (`{red.600}`), cross-domain references
 * (`{colors.red.600}`), inline references in strings
 * (`color-mix(in srgb, {colors.red.600} 24%, transparent)`), and
 * `_dark`/`_light` mode pairs — preserving the pair structure while
 * resolving the references inside.
 *
 * When a reference resolves to a plain object with a `main` property
 * (e.g. a primitive color like `{ main: '#dd1128', lighten: { ... } }`),
 * the `main` value is extracted automatically so that string references
 * always resolve to a scalar.
 *
 * @param {any} value - Value that may contain token references like {red.600}
 * @param {Object} allTokens - Complete token object for reference resolution
 * @param {string} [currentDomain=''] - Current domain being processed (e.g., 'colors', 'spacing')
 * @returns {any} - Value with resolved references
 */
function resolveTokenReferences(value, allTokens) {
  var currentDomain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  // First try the current domain for performance, fallback to global scope for cross-domain references
  var domainTheme = allTokens[currentDomain];
  var globalTheme = allTokens;

  // Recursive resolution function
  var resolveValue = function resolveValue(value) {
    var visited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
      var tokenPath = value.slice(1, -1);

      // Handle empty token references
      if (tokenPath === '') {
        return value;
      }
      if (visited.has(tokenPath)) {
        return value;
      }
      visited.add(tokenPath);

      // First try to resolve in current domain for performance
      var resolvedValue = domainTheme ? get(domainTheme, tokenPath) : undefined;

      // If not found and we have a domain theme, try global scope for cross-domain references
      if (resolvedValue === undefined && domainTheme) {
        resolvedValue = get(globalTheme, tokenPath);
      }

      // If still not found and no domain theme, use global scope
      if (resolvedValue === undefined && !domainTheme) {
        resolvedValue = get(globalTheme, tokenPath);
      }

      // Final fallback: try to resolve with currentDomain prefix for cross-domain references
      if (resolvedValue === undefined && currentDomain) {
        var domainPrefixedPath = "".concat(currentDomain, ".").concat(tokenPath);
        resolvedValue = get(globalTheme, domainPrefixedPath);
      }

      // If still not found and no domain theme, use global scope
      if (resolvedValue === undefined && !domainTheme) {
        resolvedValue = get(globalTheme, tokenPath);
      }
      if (resolvedValue !== undefined) {
        var finalValue = resolveValue(resolvedValue, visited);

        // If the reference resolved to a primitive color object with a `main` default value
        // (e.g. {red.600} → { main: '#dd1128', L80: '#e02439', ... }), extract the main
        // value so that string references always resolve to a scalar color string.
        if (isPlainObject$1(finalValue)) {
          var _finalValue$main;
          finalValue = (_finalValue$main = finalValue.main) !== null && _finalValue$main !== void 0 ? _finalValue$main : finalValue;
        }

        // Remove from visited only after complete resolution
        visited["delete"](tokenPath);
        return finalValue;
      }

      // Remove from visited if resolution failed
      visited["delete"](tokenPath);
      return value;
    }

    // Handle strings with multiple token references (like color-mix syntax)
    if (typeof value === 'string' && value.includes('{')) {
      var result = value;
      var tokenPattern = /\{[^{}]+\}/g;
      var matches = value.match(tokenPattern);
      if (matches) {
        var _iterator = _createForOfIteratorHelper$1(matches),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var match = _step.value;
            var resolvedToken = resolveValue(match, visited);
            if (resolvedToken !== match) {
              result = result.replace(match, resolvedToken);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return result;
    }
    if (isPlainObject$1(value)) {
      // Handle _dark/_light objects: resolve the token references inside them but preserve the structure
      if (value._dark !== undefined || value._light !== undefined) {
        var _resolved = {};
        for (var _i = 0, _Object$entries = Object.entries(value); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray$2(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            val = _Object$entries$_i[1];
          // Resolve token references inside _dark/_light values
          var resolvedVal = resolveValue(val, visited);

          // Special handling: if we're resolving a reference that returns another _dark/_light object,
          // extract the appropriate value for the current key instead of creating nested structure
          if (isPlainObject$1(resolvedVal) && (resolvedVal._dark !== undefined || resolvedVal._light !== undefined)) {
            _resolved[key] = resolvedVal[key] !== undefined ? resolvedVal[key] : resolvedVal._dark || resolvedVal._light;
          } else {
            _resolved[key] = resolvedVal;
          }
        }
        return _resolved;
      }

      // Process other objects recursively
      var resolved = {};
      for (var _i2 = 0, _Object$entries2 = Object.entries(value); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray$2(_Object$entries2[_i2], 2),
          _key = _Object$entries2$_i[0],
          _val = _Object$entries2$_i[1];
        resolved[_key] = resolveValue(_val, visited);
      }
      return resolved;
    }
    return value;
  };
  return resolveValue(value);
}

/**
 * Resolves `_dark`/`_light` tokens in a theme based on the current color mode,
 * then attaches a `get(path, defaultValue)` helper for convenient token access.
 */
function applyColorMode(theme, colorMode) {
  function resolveTokenValue(value) {
    // Only descend into plain objects. Non-plain objects (DOM nodes, React refs,
    // class instances) may be present in the theme (e.g. `containerRef` in a
    // component's `defaultProps`) and can hold circular references, which would
    // otherwise cause infinite recursion. They are leaves and returned as-is.
    if (isPlainObject$1(value)) {
      if (value._dark !== undefined || value._light !== undefined) {
        var selectedValue = colorMode === 'dark' ? value._dark : value._light;
        if (selectedValue !== undefined) {
          return resolveTokenValue(selectedValue);
        }
        var fallbackValue = value._light !== undefined ? value._light : value._dark;
        return fallbackValue !== undefined ? resolveTokenValue(fallbackValue) : value;
      }
      var resolved = {};
      for (var _i3 = 0, _Object$entries3 = Object.entries(value); _i3 < _Object$entries3.length; _i3++) {
        var _Object$entries3$_i = _slicedToArray$2(_Object$entries3[_i3], 2),
          key = _Object$entries3$_i[0],
          val = _Object$entries3$_i[1];
        resolved[key] = resolveTokenValue(val);
      }
      return resolved;
    }
    return value;
  }
  var colorModeTheme = resolveTokenValue(theme);
  Object.defineProperty(colorModeTheme, 'get', {
    /**
     * Retrieves a value from the theme by path, automatically extracting `main`
     * from nested primitive color objects (e.g. `red.600` → `{ main: '#dd1128', ... }` → `'#dd1128'`).
     *
     * @param {string} path - Dot-separated path to the theme value (e.g. 'colors.red.600', 'sizes.4x').
     * @param {any} [defaultValue] - Fallback value if the path is not found.
     * @returns {any} The resolved theme value.
     */
    value: function value(path, defaultValue) {
      var value = get(colorModeTheme, path, defaultValue);
      if (isPlainObject$1(value) && value.main) {
        value = value.main;
      }
      return value;
    },
    enumerable: false
  });
  return colorModeTheme;
}

/**
 * @typedef {Object} ColorModeTheme
 * @property {function(string, any=): any} get - Retrieves a value by path, extracting `main` from primitive color objects.
 */

/**
 * @typedef {Object} ResolvedTheme
 * @property {function('light'|'dark'=): ColorModeTheme} toColorMode - Returns the theme resolved for the given color mode.
 */

/**
 * Resolves all `{...}` token references in a theme object and attaches a
 * `toColorMode(colorMode)` method for resolving `_dark`/`_light` tokens on demand.
 *
 * @param {Record<string, unknown>} theme - The theme object to resolve.
 * @returns {ResolvedTheme} - A new theme object with all token references resolved.
 */
function resolveTheme(theme) {
  var resolved = {};
  for (var _i4 = 0, _Object$keys = Object.keys(theme); _i4 < _Object$keys.length; _i4++) {
    var domain = _Object$keys[_i4];
    resolved[domain] = resolveTokenReferences(theme[domain], theme, domain);
  }

  // Pre-build both color-mode variants so toColorMode() is only a cache lookup.
  // Each variant uses a Proxy to delegate missing properties back to the base theme,
  // including properties added later by createTheme(), such as `cssVariables`,
  // `cssVariablePrefix`, and `rootSelector`.
  // A Proxy is used instead of a prototype link so the variant remains a plain object,
  // preserving the `isPlainObject` checks used by `get()` and styled-system.
  var proxyVariant = function proxyVariant(variant) {
    return new Proxy(variant, {
      get: function get(target, key, receiver) {
        return Reflect.has(target, key) ? Reflect.get(target, key, receiver) : resolved[key];
      }
    });
  };
  var colorModeCache = {
    light: proxyVariant(applyColorMode(resolved, 'light')),
    dark: proxyVariant(applyColorMode(resolved, 'dark'))
  };
  Object.defineProperty(resolved, 'toColorMode', {
    value: function value() {
      var colorMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';
      return colorModeCache[colorMode];
    },
    enumerable: true // Must be enumerable to remain accessible in `useTheme()` after theme propagation.
  });
  return resolved;
}

/**
 * Returns a CSS variable name formatted from the given name and options.
 *
 * Semantic separator strategy:
 * - Hyphens (-): Object hierarchy (colors.white → colors-white)
 * - Underscores (_): Within-token separators (colons, spaces, special chars)
 *
 * Examples:
 *   colors: { white: { primary: '#fff' } }           → colors-white-primary
 *   colors: { 'white:primary': '#fff' }              → colors-white_primary
 *   colors: { 'light gray': '#eee' }                 → colors-light_gray
 *   colors: { 'blue-50': '#abc' }                    → colors-blue-50 (preserved)
 *
 * @param {string} name - The name of the variable.
 * @param {object} [options] - The options object.
 * @param {string} [options.prefix=''] - The prefix to use for the variable name.
 * @param {string} [options.delimiter='-'] - The delimiter to use between the prefix and name.
 * @return {string} The CSS variable name.
 */
var toCSSVariable = function toCSSVariable(name, options) {
  var _options = _objectSpread2$3({}, options),
    _options$prefix = _options.prefix,
    prefix = _options$prefix === void 0 ? '' : _options$prefix,
    _options$delimiter = _options.delimiter,
    delimiter = _options$delimiter === void 0 ? '-' : _options$delimiter;
  var variableName = [prefix, name].filter(Boolean).join(delimiter).replace(/\./g, delimiter) // dots → hyphen (hierarchy)
  .replace(/:/g, '_') // colons → underscore (variants)
  .replace(/\s+/g, '_') // spaces → underscore
  .replace(/[^a-zA-Z0-9-_]/g, '_'); // replace non-alphanumeric, non-hyphen, non-underscore characters

  return "--".concat(variableName);
};

var getter = function getter(scale, value, options) {
  var _options$props;
  var result = get(scale, value);
  if (result === undefined) {
    return value; // fallback to value if result is undefined
  }
  // Gate-keeper: an object is only resolvable if it carries at least one of the
  // four recognized properties that the resolver below knows how to extract:
  //   _dark / _light  — semantic color-mode pair
  //   main            — color-mode-neutral primitive default
  //   value           — single-value token
  // Anything else (e.g. a plain nested object like { foo: 'bar' }) falls back to
  // the original path string to avoid silently returning undefined.
  if (_typeof(result) === 'object') {
    var isNonCompatibleObject = ['_dark', '_light', 'main', 'value'].every(function (k) {
      return isNullish(result[k]);
    });
    if (isNonCompatibleObject) {
      return value; // fallback to value if result is a non-compatible object
    }
  }
  var theme = options === null || options === void 0 ? void 0 : (_options$props = options.props) === null || _options$props === void 0 ? void 0 : _options$props.theme;

  // Priority 1: Check if `useCSSVariables` is enabled
  if (theme !== null && theme !== void 0 && theme.useCSSVariables) {
    var _options$context;
    var cssVariablePrefix = theme === null || theme === void 0 ? void 0 : theme.cssVariablePrefix;
    var cssVariables = theme === null || theme === void 0 ? void 0 : theme.cssVariables;
    var contextScale = options === null || options === void 0 ? void 0 : (_options$context = options.context) === null || _options$context === void 0 ? void 0 : _options$context.scale;
    var cssVariable = toCSSVariable(
    // | contextScale | value                   |
    // | ------------ | ----------------------- |
    // | colors       | 'text.normal.primary'   |
    // | space        | 0                       |
    [contextScale, String(value !== null && value !== void 0 ? value : '')].filter(Boolean).join('.'),
    // => 'colors.text.normal.primary'
    {
      prefix: cssVariablePrefix,
      delimiter: '-'
    }); // => '--tonic-colors-text-normal-primary'

    var cssVariableValue = cssVariables === null || cssVariables === void 0 ? void 0 : cssVariables[cssVariable]; // => '#578aef' or 'var(--tonic-colors-gray-60-light)'

    if (cssVariableValue !== undefined) {
      var _result, _result2, _actualValue;
      // If cssVariableValue is already a CSS variable reference, return the CSS variable directly
      if (typeof cssVariableValue === 'string' && cssVariableValue.startsWith('var(--')) {
        return "var(".concat(cssVariable, ")");
      }
      // Otherwise, replace the value with the CSS variable reference
      // For _dark/_light objects, we need to extract the actual value first
      var actualValue = result;
      if (_typeof(result) === 'object' && (((_result = result) === null || _result === void 0 ? void 0 : _result._dark) !== undefined || ((_result2 = result) === null || _result2 === void 0 ? void 0 : _result2._light) !== undefined)) {
        var _result$_light;
        // In CSS Variables mode, we use the light value as reference for replacement
        actualValue = (_result$_light = result._light) !== null && _result$_light !== void 0 ? _result$_light : result._dark;
      } else if (_typeof(result) === 'object') {
        var _result3;
        actualValue = (_result3 = result) === null || _result3 === void 0 ? void 0 : _result3.value;
      }
      return String((_actualValue = actualValue) !== null && _actualValue !== void 0 ? _actualValue : '').replaceAll(cssVariableValue, "var(".concat(cssVariable, ")"));
    }
    // fallback to processing below
  }

  // Priority 2: Extract the `value` property or handle _dark/_light tokens
  //
  // Handle token objects (for non-CSS Variables mode):
  // - If either _dark or _light is defined, resolves using props.__colorMode (injected from ColorModeContext
  //   via Box wrapper), falling back to 'light' if not available.
  // - Otherwise, falls back to `main` (color-mode-neutral default) or `value`.
  //
  // Example usage:
  // ```
  // <Box color="text.normal.primary" />
  // ```
  //
  // The `colors` scale in the theme with color mode tokens:
  // ```js
  // {
  //   colors: {
  //     text: {
  //       normal: {
  //         primary: {
  //           _dark: 'rgba(255, 255, 255, .92)',
  //           _light: 'rgba(0, 0, 0, .92)',
  //         },
  //       },
  //     },
  //   },
  // }
  // ```
  //
  // Or with the `main` property as the color-mode-neutral default and `_dark`/`_light` as overrides:
  // ```js
  // {
  //   colors: {
  //     red: {
  //       600: {
  //         main: '#dd1128',  // default value — color mode is not a factor
  //         'L80': '#e02439',
  //         'D80': '#cf1025',
  //       },
  //     },
  //   },
  // }
  // ```
  //
  // Or with the `value` property as a fallback if `main` is not provided:
  // ```js
  // {
  //   colors: {
  //     white: {
  //       primary: {
  //         value: 'rgba(255, 255, 255, .92)',
  //       },
  //     },
  //   },
  // }
  // ```
  // Resolver: extract the scalar value from a compatible object.
  // By this point the gate-keeper above has already confirmed at least one
  // recognized property is present, so this block will always produce a value.
  if (_typeof(result) === 'object') {
    var _result4, _result5;
    // Handle _dark/_light color mode tokens (for non-CSS Variables mode)
    if (((_result4 = result) === null || _result4 === void 0 ? void 0 : _result4._dark) !== undefined || ((_result5 = result) === null || _result5 === void 0 ? void 0 : _result5._light) !== undefined) {
      var _options$props$__colo, _options$props2;
      // Resolve color mode: props.__colorMode (from ColorModeContext) or default to 'light'
      var colorMode = (_options$props$__colo = options === null || options === void 0 ? void 0 : (_options$props2 = options.props) === null || _options$props2 === void 0 ? void 0 : _options$props2.__colorMode) !== null && _options$props$__colo !== void 0 ? _options$props$__colo : 'light';
      result = colorMode === 'dark' ? result._dark : result._light;
    } else {
      var _result$main, _result6, _result7;
      // `main` — color-mode-neutral primitive default (e.g. red.600.main)
      // `value` — single-value token fallback
      result = (_result$main = (_result6 = result) === null || _result6 === void 0 ? void 0 : _result6.main) !== null && _result$main !== void 0 ? _result$main : (_result7 = result) === null || _result7 === void 0 ? void 0 : _result7.value;
    }
  }
  return result;
};
var getter$1 = getter;

var system$2 = function system(config, options) {
  var group = options === null || options === void 0 ? void 0 : options.group;
  var styleConfig = Object.keys(_objectSpread2$1({}, config)).reduce(function (acc, key) {
    var value = config[key];
    if (typeof value === 'function') {
      acc[key] = value;
      return acc;
    }
    if (value === true) {
      // shortcut definition
      acc[key] = createStyleFunction({
        group: group,
        property: key
      });
      return acc;
    }
    acc[key] = createStyleFunction(_objectSpread2$1({
      group: group
    }, value));
    return acc;
  }, {});
  return parser$1(styleConfig);
};
var createStyleFunction = function createStyleFunction(_ref) {
  var groupProp = _ref.group,
    propertiesProp = _ref.properties,
    propertyProp = _ref.property,
    aliasProp = _ref.alias,
    scaleProp = _ref.scale,
    defaultScaleProp = _ref.defaultScale,
    _ref$transform = _ref.transform,
    transform = _ref$transform === void 0 ? getter$1 : _ref$transform;
  var properties = [].concat(_toConsumableArray(ensureArray(propertiesProp)), _toConsumableArray(ensureArray(propertyProp)));
  var context = {
    group: groupProp,
    properties: properties,
    alias: aliasProp,
    scale: scaleProp,
    defaultScale: defaultScaleProp !== null && defaultScaleProp !== void 0 ? defaultScaleProp : {}
  };

  /**
   * A utility function to transform style values based on a scale and apply them to a set of properties.
   *
   * @param {object} scale - The scale used to transform the value.
   * @param {string|number} value - The style value to be transformed.
   * @param {object} props - Additional props that may affect the transformation.
   *
   * @return {object} An object containing the transformed style properties.
   */
  var sx = function sx(scale, value, props) {
    var transformOptions = {
      context: context,
      props: props
    };
    var transformedValue = transform(scale, value, transformOptions);
    if (isNullish(transformedValue)) {
      return {};
    }
    var result = properties.reduce(function (acc, property) {
      if (_typeof(transformedValue) === 'object') {
        var _transformedValue$pro;
        // If the transformed value is an object, it may contain multiple style properties that need to be applied individually.
        // For example, `{ outline: 0 }` will be transformed into `{ outline: '2px solid transparent', outlineOffset: '2px' }`.
        acc[property] = (_transformedValue$pro = transformedValue === null || transformedValue === void 0 ? void 0 : transformedValue[property]) !== null && _transformedValue$pro !== void 0 ? _transformedValue$pro : acc[property];
      } else {
        acc[property] = transformedValue;
      }
      return acc;
    }, {});
    return result;
  };
  Object.assign(sx, _objectSpread2$1({}, context));
  return sx;
};
var system$1$1 = system$2;

var group$n = 'animation';
var config$n = {
  animation: true,
  animationDelay: true,
  animationDirection: true,
  animationDuration: true,
  animationFillMode: true,
  animationIterationCount: true,
  animationName: true,
  animationPlayState: true,
  animationTimingFunction: true
};
var animation = system$1$1(config$n, {
  group: group$n
});
var animation$1 = animation;

var hasOwnSafe = function hasOwnSafe(obj, key) {
  if (isNullish(obj)) {
    return false;
  }
  return Object.hasOwn ? Object.hasOwn(obj, key) : Object.prototype.hasOwnProperty.call(obj, key);
};

// Check if a value is a simple CSS variable
// e.g. var(--tonic-spacing-1)
var isSimpleCSSVariable = function isSimpleCSSVariable(value) {
  var re = /^var\(\s*([a-zA-Z0-9\-_]+)\s*\)$/;
  return re.test(String(value !== null && value !== void 0 ? value : '').trim());
};

// Negate the value, handling CSS variables and numeric values
var toNegativeValue = function toNegativeValue(scale, absoluteValue, options) {
  var _options$props;
  var theme = options === null || options === void 0 ? void 0 : (_options$props = options.props) === null || _options$props === void 0 ? void 0 : _options$props.theme;
  var n = getter$1(scale, absoluteValue, options);

  // Handle CSS variables for negative values
  if (theme !== null && theme !== void 0 && theme.useCSSVariables && isPlainObject$1(theme === null || theme === void 0 ? void 0 : theme.cssVariables) && isSimpleCSSVariable(n)) {
    // https://stackoverflow.com/questions/49469344/using-negative-css-custom-properties
    return "calc(0px - ".concat(n, ")");
  }

  // Handle numeric value
  if (typeof n === 'number' && Number.isFinite(n)) {
    return n * -1;
  }
  return "-".concat(n);
};
var positiveOrNegative = function positiveOrNegative(scale, value, options) {
  /**
   * Scale object
   *
   * ```js
   * {
   *   '1x': '0.25rem',
   *   '2x': 8,
   * }
   * ```
   *
   * Example
   *
   * ```jsx
   * <Box margin="1x" />
   * // => margin: 0.25rem
   * <Box margin="2x" />
   * // => margin: 8px
   * <Box margin="-1x" />
   * // => margin: -0.25rem
   * <Box margin="-2x" />
   * // => margin: -8px
   * ```
   */
  if (typeof value === 'string') {
    var absoluteValue = value.startsWith('+') || value.startsWith('-') ? value.slice(1) : value;
    var isNonNegative = !value.startsWith('-');

    // Return the result if the scale object does not contain the absolute value
    if (!hasOwnSafe(scale, absoluteValue)) {
      return getter$1(scale, value, options);
    }

    // Return the result if the value is non-negative
    if (isNonNegative) {
      return getter$1(scale, value, options);
    }
    return toNegativeValue(scale, absoluteValue, options);
  }

  /**
   * Scale object
   *
   * ```js
   * {
   *   4: '0.25rem',
   *   8: 8,
   * }
   * ```
   *
   * Example
   *
   * ```jsx
   * <Box margin={4} />
   * // => margin: 0.25rem
   * <Box margin={8} />
   * // => margin: 8px
   * <Box margin={-4} />
   * // => margin: -0.25rem
   * <Box margin={-8} />
   * // => margin: -8px
   * ```
   */
  if (typeof value === 'number' && Number.isFinite(value)) {
    var _absoluteValue = Math.abs(value);
    var _isNonNegative = !(value < 0);

    // Return the result if the scale object does not contain the absolute value
    if (!hasOwnSafe(scale, _absoluteValue)) {
      return getter$1(scale, value, options);
    }

    // Return the result if the value is non-negative
    if (_isNonNegative) {
      return getter$1(scale, value, options);
    }
    return toNegativeValue(scale, _absoluteValue, options);
  }
  return getter$1(scale, value, options);
};
var positiveOrNegativeTransform = positiveOrNegative;

var group$m = 'background';
var config$m = {
  background: {
    property: 'background',
    scale: 'colors'
  },
  backgroundAttachment: {
    property: 'backgroundAttachment'
  },
  backgroundClip: {
    property: 'backgroundClip'
  },
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors'
  },
  backgroundImage: {
    property: 'backgroundImage'
  },
  backgroundPosition: {
    property: 'backgroundPosition',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  backgroundPositionX: {
    property: 'backgroundPositionX',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  backgroundPositionY: {
    property: 'backgroundPositionY',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  backgroundRepeat: {
    property: 'backgroundRepeat'
  },
  backgroundSize: {
    property: 'backgroundSize',
    scale: 'sizes'
  }
};
config$m.bg = _objectSpread2$1(_objectSpread2$1({}, config$m.background), {}, {
  alias: 'background'
});
config$m.bgAttachment = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundAttachment), {}, {
  alias: 'backgroundAttachment'
});
config$m.bgClip = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundClip), {}, {
  alias: 'backgroundClip'
});
config$m.bgColor = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundColor), {}, {
  alias: 'backgroundColor'
});
config$m.bgImage = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundImage), {}, {
  alias: 'backgroundImage'
});
config$m.bgPosition = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundPosition), {}, {
  alias: 'backgroundPosition'
});
config$m.bgPositionX = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundPositionX), {}, {
  alias: 'backgroundPositionX'
});
config$m.bgPositionY = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundPositionY), {}, {
  alias: 'backgroundPositionY'
});
config$m.bgRepeat = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundRepeat), {}, {
  alias: 'backgroundRepeat'
});
config$m.bgSize = _objectSpread2$1(_objectSpread2$1({}, config$m.backgroundSize), {}, {
  alias: 'backgroundSize'
});
var background$1 = system$1$1(config$m, {
  group: group$m
});
var background$1$1 = background$1;

var _border = {
  /**
   * The border shorthand CSS property sets an element's border.
   * It sets the values of border-width, border-style, and border-color.
   */
  border: {
    property: 'border',
    scale: 'borders'
  },
  borderColor: {
    property: 'borderColor',
    scale: 'colors'
  },
  borderStyle: true,
  borderWidth: {
    property: 'borderWidth',
    scale: 'sizes'
  }
};
var _borderTop = {
  /**
   * The border-top shorthand CSS property sets all the properties of an element's top border.
   * It sets the values of border-top-width, border-top-style and border-top-color.
   */
  borderTop: {
    property: 'borderTop',
    scale: 'borders'
  },
  borderTopColor: {
    property: 'borderTopColor',
    scale: 'colors'
  },
  borderTopStyle: true,
  borderTopWidth: {
    property: 'borderTopWidth',
    scale: 'sizes'
  }
};
var _borderRight = {
  /**
   * The border-right shorthand CSS property sets all the properties of an element's right border.
   * It sets the values of border-right-width, border-right-style and border-right-color.
   */
  borderRight: {
    property: 'borderRight',
    scale: 'borders'
  },
  borderRightColor: {
    property: 'borderRightColor',
    scale: 'colors'
  },
  borderRightStyle: true,
  borderRightWidth: {
    property: 'borderRightWidth',
    scale: 'sizes'
  }
};
var _borderBottom = {
  /**
   * The border-bottom shorthand CSS property sets an element's bottom border.
   * It sets the values of border-bottom-width, border-bottom-style and border-bottom-color.
   */
  borderBottom: {
    property: 'borderBottom',
    scale: 'borders'
  },
  borderBottomColor: {
    property: 'borderBottomColor',
    scale: 'colors'
  },
  borderBottomStyle: true,
  borderBottomWidth: {
    property: 'borderBottomWidth',
    scale: 'sizes'
  }
};
var _borderLeft = {
  /**
   * The border-left shorthand CSS property sets all the properties of an element's left border.
   * It sets the values of border-left-width, border-left-style and border-left-color.
   */
  borderLeft: {
    property: 'borderLeft',
    scale: 'borders'
  },
  borderLeftColor: {
    property: 'borderLeftColor',
    scale: 'colors'
  },
  borderLeftStyle: true,
  borderLeftWidth: {
    property: 'borderLeftWidth',
    scale: 'sizes'
  }
};
var _borderRadius = {
  /**
   * The border-radius shorthand CSS property sets the rounding of an element's corners.
   * It sets the values of border-top-left-radius, border-top-right-radius, border-bottom-right-radius, and border-bottom-left-radius.
   */
  borderRadius: {
    property: 'borderRadius',
    scale: 'radii'
  },
  borderTopLeftRadius: {
    property: 'borderTopLeftRadius',
    scale: 'radii'
  },
  borderTopRightRadius: {
    property: 'borderTopRightRadius',
    scale: 'radii'
  },
  borderBottomLeftRadius: {
    property: 'borderBottomLeftRadius',
    scale: 'radii'
  },
  borderBottomRightRadius: {
    property: 'borderBottomRightRadius',
    scale: 'radii'
  },
  borderEndEndRadius: {
    property: 'borderEndEndRadius',
    scale: 'radii'
  },
  borderEndStartRadius: {
    property: 'borderEndStartRadius',
    scale: 'radii'
  },
  borderStartEndRadius: {
    property: 'borderStartEndRadius',
    scale: 'radii'
  },
  borderStartStartRadius: {
    property: 'borderStartStartRadius',
    scale: 'radii'
  }
};
var _borderBlock = {
  /**
   * The border-block CSS property is a shorthand property for setting the individual logical block border property values in a single place in the style sheet.
   */
  borderBlock: {
    property: 'borderBlock',
    scale: 'borders'
  },
  borderBlockColor: {
    property: 'borderBlockColor',
    scale: 'colors'
  },
  borderBlockStyle: true,
  borderBlockWidth: {
    property: 'borderBlockWidth',
    scale: 'sizes'
  },
  borderBlockEnd: {
    property: 'borderBlockEnd',
    scale: 'borders'
  },
  borderBlockEndColor: {
    property: 'borderBlockEndColor',
    scale: 'colors'
  },
  borderBlockEndStyle: true,
  borderBlockEndWidth: {
    property: 'borderBlockEndWidth',
    scale: 'sizes'
  },
  borderBlockStart: {
    property: 'borderBlockStart',
    scale: 'borders'
  },
  borderBlockStartColor: {
    property: 'borderBlockStartColor',
    scale: 'colors'
  },
  borderBlockStartStyle: true,
  borderBlockStartWidth: {
    property: 'borderBlockStartWidth',
    scale: 'sizes'
  }
};
var _borderImage = {
  /**
   * The border-image shorthand CSS property draws an image around a given element. It replaces the element's regular border.
   */
  borderImage: true,
  borderImageOutset: {
    property: 'borderImageOutset',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  borderImageRepeat: true,
  borderImageSlice: {
    property: 'borderImageSlice',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  borderImageSource: true,
  borderImageWidth: {
    property: 'borderImageWidth',
    scale: 'sizes'
  }
};
var _borderInline = {
  /**
   * The border-inline CSS property is a shorthand property for setting the individual logical inline border property values in a single place in the style sheet.
   */
  borderInline: {
    property: 'borderInline',
    scale: 'borders'
  },
  borderInlineColor: {
    property: 'borderInlineColor',
    scale: 'colors'
  },
  borderInlineStyle: true,
  borderInlineWidth: {
    property: 'borderInlineWidth',
    scale: 'sizes'
  },
  borderInlineEnd: {
    property: 'borderInlineEnd',
    scale: 'borders'
  },
  borderInlineEndColor: {
    property: 'borderInlineEndColor',
    scale: 'colors'
  },
  borderInlineEndStyle: true,
  borderInlineEndWidth: {
    property: 'borderInlineEndWidth',
    scale: 'sizes'
  },
  borderInlineStart: {
    property: 'borderInlineStart',
    scale: 'borders'
  },
  borderInlineStartColor: {
    property: 'borderInlineStartColor',
    scale: 'colors'
  },
  borderInlineStartStyle: true,
  borderInlineStartWidth: {
    property: 'borderInlineStartWidth',
    scale: 'sizes'
  }
};
var group$l = 'border';
var config$l = _objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, _border), _borderTop), _borderRight), _borderBottom), _borderLeft), _borderRadius), _borderBlock), _borderImage), _borderInline), {}, {
  borderCollapse: true,
  borderSpacing: {
    property: 'borderSpacing',
    scale: 'sizes'
  },
  borderX: {
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders'
  },
  borderY: {
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders'
  }
});
var border$1 = system$1$1(config$l, {
  group: group$l
});
var border$1$1 = border$1;

var group$k = 'color';
var config$k = {
  color: {
    property: 'color',
    scale: 'colors'
  },
  colorScheme: true
};
var color = system$1$1(config$k, {
  group: group$k
});
var color$1 = color;

var group$j = 'containment';
var config$j = {
  contain: true,
  containIntrinsicSize: {
    property: 'containIntrinsicSize',
    scale: 'sizes'
  },
  contentVisibility: true
};
var containment = system$1$1(config$j, {
  group: group$j
});
var containment$1 = containment;

var group$i = 'effect';
var config$i = {
  backdropFilter: true,
  backgroundBlendMode: true,
  boxShadow: {
    property: 'boxShadow',
    scale: 'shadows'
  },
  filter: true,
  mixBlendMode: true,
  opacity: true
};
var effect = system$1$1(config$i, {
  group: group$i
});
var effect$1 = effect;

var group$h = 'flexbox';
var config$h = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  flex: true,
  flexGrow: true,
  flexShrink: true,
  flexBasis: {
    property: 'flexBasis',
    scale: 'sizes'
  },
  justifySelf: true,
  alignSelf: true,
  order: true
};
var flexbox = system$1$1(config$h, {
  group: group$h
});
var flexbox$1 = flexbox;

var group$g = 'gap';
var config$g = {
  gap: {
    property: 'gap',
    scale: 'sizes'
  },
  columnGap: {
    property: 'columnGap',
    scale: 'sizes'
  },
  rowGap: {
    property: 'rowGap',
    scale: 'sizes'
  }
};
var gap = system$1$1(config$g, {
  group: group$g
});
var gap$1 = gap;

var group$f = 'grid';
var config$f = {
  gridArea: true,
  gridAutoColumns: true,
  gridAutoFlow: true,
  gridAutoRows: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  gridTemplate: true,
  gridTemplateAreas: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  // The following properties are renamed in CSS3 and will be deprecated or removed in the next major release
  gridGap: {
    // `gridGap` is an alias for `gap`
    property: 'gridGap',
    scale: 'sizes'
  },
  gridColumnGap: {
    // `gridColumnGap` is an alias for `columnGap`
    property: 'gridColumnGap',
    scale: 'sizes'
  },
  gridRowGap: {
    // `gridRowGap` is an alias for `rowGap`
    property: 'gridRowGap',
    scale: 'sizes'
  }
};
var grid = system$1$1(config$f, {
  group: group$f
});
var grid$1 = grid;

var group$e = 'image';
var config$e = {
  imageOrientation: true,
  imageRendering: true
};
var image = system$1$1(config$e, {
  group: group$e
});
var image$1 = image;

var group$d = 'interactivity';
var config$d = {
  appearance: true,
  caretColor: {
    property: 'caretColor',
    scale: 'colors'
  },
  cursor: true,
  pointerEvents: true,
  resize: true,
  userSelect: true
};
var interactivity = system$1$1(config$d, {
  group: group$d
});
var interactivity$1 = interactivity;

var group$c = 'layout';
var config$c = {
  width: {
    property: 'width',
    scale: 'sizes'
  },
  height: {
    property: 'height',
    scale: 'sizes'
  },
  minWidth: {
    property: 'minWidth',
    scale: 'sizes'
  },
  minHeight: {
    property: 'minHeight',
    scale: 'sizes'
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'sizes'
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'sizes'
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
  aspectRatio: true,
  boxSizing: true,
  "float": true,
  objectFit: true,
  objectPosition: true,
  visibility: true
};
config$c.w = _objectSpread2$1(_objectSpread2$1({}, config$c.width), {}, {
  alias: 'width'
});
config$c.h = _objectSpread2$1(_objectSpread2$1({}, config$c.height), {}, {
  alias: 'height'
});
var layout = system$1$1(config$c, {
  group: group$c
});
var layout$1 = layout;

var group$b = 'list-style';
var config$b = {
  listStyleImage: true,
  listStylePosition: true,
  listStyleType: true
};
var listStyle = system$1$1(config$b, {
  group: group$b
});
var listStyle$1 = listStyle;

var group$a = 'margin';
var config$a = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginBlock: {
    property: 'marginBlock',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginBlockStart: {
    property: 'marginBlockStart',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginBlockEnd: {
    property: 'marginBlockEnd',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginInline: {
    property: 'marginInline',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginInlineStart: {
    property: 'marginInlineStart',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  marginInlineEnd: {
    property: 'marginInlineEnd',
    scale: 'space',
    transform: positiveOrNegativeTransform
  }
};
config$a.marginX = {
  properties: ['marginLeft', 'marginRight'],
  scale: 'space',
  transform: positiveOrNegativeTransform
};
config$a.marginY = {
  properties: ['marginTop', 'marginBottom'],
  scale: 'space',
  transform: positiveOrNegativeTransform
};
config$a.m = _objectSpread2$1(_objectSpread2$1({}, config$a.margin), {}, {
  alias: 'margin'
});
config$a.mt = _objectSpread2$1(_objectSpread2$1({}, config$a.marginTop), {}, {
  alias: 'marginTop'
});
config$a.mr = _objectSpread2$1(_objectSpread2$1({}, config$a.marginRight), {}, {
  alias: 'marginRight'
});
config$a.mb = _objectSpread2$1(_objectSpread2$1({}, config$a.marginBottom), {}, {
  alias: 'marginBottom'
});
config$a.ml = _objectSpread2$1(_objectSpread2$1({}, config$a.marginLeft), {}, {
  alias: 'marginLeft'
});
config$a.mx = _objectSpread2$1(_objectSpread2$1({}, config$a.marginX), {}, {
  alias: 'marginX'
});
config$a.my = _objectSpread2$1(_objectSpread2$1({}, config$a.marginY), {}, {
  alias: 'marginY'
});
var margin = system$1$1(config$a, {
  group: group$a
});
var margin$1 = margin;

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Masking
 */
var group$9 = 'masking';
var config$9 = {
  clip: true,
  // deprecated: This feature is no longer recommended
  clipPath: true,
  mask: true,
  maskBorder: true,
  maskType: true,
  // The mask property is a shorthand for the following CSS properties:
  maskClip: true,
  maskComposite: true,
  maskImage: true,
  maskMode: true,
  maskOrigin: true,
  maskPosition: true,
  maskRepeat: true,
  maskSize: true,
  // The `mask-border` property is a shorthand for the following CSS properties:
  maskBorderMode: true,
  maskBorderOutset: true,
  maskBorderRepeat: true,
  maskBorderSlice: true,
  maskBorderSource: true,
  maskBorderWidth: true
};
var masking = system$1$1(config$9, {
  group: group$9
});
var masking$1 = masking;

var group$8 = 'outline';
var config$8 = {
  outline: {
    property: 'outline',
    scale: 'outlines'
  },
  outlineColor: {
    property: 'outlineColor',
    scale: 'colors'
  },
  outlineOffset: {
    property: 'outlineOffset',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  outlineWidth: {
    property: 'outlineWidth',
    scale: 'sizes'
  },
  outlineStyle: true
};
var outline = system$1$1(config$8, {
  group: group$8
});
var outline$1 = outline;

var group$7 = 'padding';
var config$7 = {
  padding: {
    property: 'padding',
    scale: 'space'
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space'
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space'
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space'
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space'
  }
};
config$7.paddingX = {
  properties: ['paddingLeft', 'paddingRight'],
  scale: 'space'
};
config$7.paddingY = {
  properties: ['paddingTop', 'paddingBottom'],
  scale: 'space'
};
config$7.p = _objectSpread2$1(_objectSpread2$1({}, config$7.padding), {}, {
  alias: 'padding'
});
config$7.pt = _objectSpread2$1(_objectSpread2$1({}, config$7.paddingTop), {}, {
  alias: 'paddingTop'
});
config$7.pr = _objectSpread2$1(_objectSpread2$1({}, config$7.paddingRight), {}, {
  alias: 'paddingRight'
});
config$7.pb = _objectSpread2$1(_objectSpread2$1({}, config$7.paddingBottom), {}, {
  alias: 'paddingBottom'
});
config$7.pl = _objectSpread2$1(_objectSpread2$1({}, config$7.paddingLeft), {}, {
  alias: 'paddingLeft'
});
config$7.px = _objectSpread2$1(_objectSpread2$1({}, config$7.paddingX), {}, {
  alias: 'paddingX'
});
config$7.py = _objectSpread2$1(_objectSpread2$1({}, config$7.paddingY), {}, {
  alias: 'paddingY'
});
var padding = system$1$1(config$7, {
  group: group$7
});
var padding$1 = padding;

var group$6 = 'position';
var config$6 = {
  inset: {
    property: 'inset',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  insetBlock: {
    property: 'insetBlock',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  insetBlockEnd: {
    property: 'insetBlockEnd',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  insetBlockStart: {
    property: 'insetBlockStart',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  insetInline: {
    property: 'insetInline',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  insetInlineEnd: {
    property: 'insetInlineEnd',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  insetInlineStart: {
    property: 'insetInlineStart',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  position: true,
  top: {
    property: 'top',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  right: {
    property: 'right',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  bottom: {
    property: 'bottom',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  left: {
    property: 'left',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  zIndex: {
    property: 'zIndex',
    scale: 'zIndices'
  }
};
var position = system$1$1(config$6, {
  group: group$6
});
var position$1 = position;

var group$5 = 'scroll';
var config$5 = {
  scrollBehavior: true,
  scrollMargin: {
    property: 'scrollMargin',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  scrollMarginBlock: {
    property: 'scrollMarginBlock',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  scrollMarginBlockEnd: {
    property: 'scrollMarginBlockEnd',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  scrollMarginBlockStart: {
    property: 'scrollMarginBlockStart',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  scrollMarginInline: {
    property: 'scrollMarginInline',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  scrollMarginInlineEnd: {
    property: 'scrollMarginInlineEnd',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  scrollMarginInlineStart: {
    property: 'scrollMarginInlineStart',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  scrollMarginTop: {
    property: 'scrollMarginTop',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  scrollMarginRight: {
    property: 'scrollMarginRight',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  scrollMarginBottom: {
    property: 'scrollMarginBottom',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  scrollMarginLeft: {
    property: 'scrollMarginLeft',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  scrollPadding: {
    property: 'scrollPadding',
    scale: 'space'
  },
  scrollPaddingTop: {
    property: 'scrollPaddingTop',
    scale: 'space'
  },
  scrollPaddingRight: {
    property: 'scrollPaddingRight',
    scale: 'space'
  },
  scrollPaddingBottom: {
    property: 'scrollPaddingBottom',
    scale: 'space'
  },
  scrollPaddingLeft: {
    property: 'scrollPaddingLeft',
    scale: 'space'
  },
  scrollSnapAlign: true,
  scrollSnapStop: true,
  scrollSnapType: true
};
config$5.scrollMarginX = {
  properties: ['scrollMarginLeft', 'scrollMarginRight'],
  scale: 'space',
  transform: positiveOrNegativeTransform
};
config$5.scrollMarginY = {
  properties: ['scrollMarginTop', 'scrollMarginBottom'],
  scale: 'space',
  transform: positiveOrNegativeTransform
};
config$5.scrollPaddingX = {
  properties: ['scrollPaddingLeft', 'scrollPaddingRight'],
  scale: 'space'
};
config$5.scrollPaddingY = {
  properties: ['scrollPaddingTop', 'scrollPaddingBottom'],
  scale: 'space'
};
var scroll = system$1$1(config$5, {
  group: group$5
});
var scroll$1 = scroll;

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Shapes
 */
var group$4 = 'shape';
var config$4 = {
  shapeImageThreshold: true,
  shapeMargin: {
    property: 'shapeMargin',
    scale: 'space',
    transform: positiveOrNegativeTransform // multi-value
  },
  shapeOutside: true
};
var shape = system$1$1(config$4, {
  group: group$4
});
var shape$1 = shape;

var group$3 = 'text';
var config$3 = {
  textCombineUpright: true,
  textDecoration: true,
  textDecorationColor: {
    property: 'textDecorationColor',
    scale: 'colors'
  },
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationThickness: {
    property: 'textDecorationThickness',
    scale: 'sizes'
  },
  textOrientation: true,
  textShadow: {
    property: 'textShadow',
    scale: 'shadows'
  },
  textUnderlineOffset: {
    property: 'textUnderlineOffset',
    scale: 'space',
    transform: positiveOrNegativeTransform
  },
  writingMode: true
};
var textDecoration = system$1$1(config$3, {
  group: group$3
});
var text$1 = textDecoration;

var group$2 = 'transform';
var config$2 = {
  backfaceVisibility: true,
  perspective: true,
  perspectiveOrigin: true,
  transform: true,
  transformBox: true,
  transformOrigin: true,
  transformStyle: true
};
var transform = system$1$1(config$2, {
  group: group$2
});
var transform$1 = transform;

var group$1 = 'transition';
var config$1 = {
  transition: true,
  transitionDelay: true,
  transitionDuration: true,
  transitionProperty: true,
  transitionTimingFunction: true,
  willChange: true
};
var transition = system$1$1(config$1, {
  group: group$1
});
var transition$1 = transition;

var group = 'typography';
var config = {
  fontFamily: {
    property: 'fontFamily',
    scale: 'fonts'
  },
  fontSize: {
    property: 'fontSize',
    scale: 'fontSizes'
  },
  fontStyle: true,
  fontWeight: {
    property: 'fontWeight',
    scale: 'fontWeights'
  },
  letterSpacing: {
    property: 'letterSpacing',
    scale: 'letterSpacings'
  },
  lineBreak: true,
  lineHeight: {
    property: 'lineHeight',
    scale: 'lineHeights'
  },
  overflowWrap: true,
  textAlign: true,
  textEmphasis: true,
  textIndent: true,
  textJustify: true,
  textOverflow: true,
  textTransform: true,
  whiteSpace: true,
  wordBreak: true,
  wordSpacing: true
};
var typography = system$1$1(config, {
  group: group
});
var typography$1 = typography;

var system = compose$1(animation$1, background$1$1, border$1$1, color$1, containment$1, effect$1, flexbox$1, gap$1, grid$1, image$1, interactivity$1, layout$1, listStyle$1, margin$1, masking$1, outline$1, padding$1, position$1, scroll$1, shape$1, text$1, transform$1, transition$1, typography$1);
var system$1 = system;

var createPseudoResolver = function createPseudoResolver(theme) {
  return function (styleProps) {
    if (isNullish(styleProps)) {
      return {};
    }

    /**
     * Pseudo-classes must be declared in a specific order, as shown below:
     *
     * ```
     * :link
     * :visited
     * :hover
     * :active
     * ```
     *
     * Each pseudo-class corresponds to an event which can only happen later in the timeline than the one before.
     * 1. A link is unvisited before it is visited.
     * 2. A link is visited before it is hovered over.
     * 3. A link is hovered over before it is in active use.
     */
    var orderList = ['_focus', '_visited', '_hover', '_focusHover', '_active', '_focusActive', '_focusSelected', '_focusWithin', '_disabled',
    // `_disabled` must be placed after above pseudo-classes
    '_enabled'];
    var orderedEntries = Object.entries(styleProps).sort(function (a, b) {
      var aIndex = orderList.indexOf(a[0]);
      var bIndex = orderList.indexOf(b[0]);
      return aIndex - bIndex;
    });
    var entries = [];
    var _iterator = _createForOfIteratorHelper(orderedEntries),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _pseudoClassSelector$;
        var _step$value = _slicedToArray(_step.value, 2),
          name = _step$value[0],
          value = _step$value[1];
        var selectorFunction = (_pseudoClassSelector$ = pseudoClassSelector[name]) !== null && _pseudoClassSelector$ !== void 0 ? _pseudoClassSelector$ : pseudoElementSelector[name];
        if (typeof selectorFunction === 'function') {
          entries = entries.concat(selectorFunction(value));
        } else {
          entries = entries.concat([[name, value]]);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return Object.fromEntries(entries);
  };
};
var createResponsiveResolver = function createResponsiveResolver(theme) {
  return function (styleProps) {
    var next = {};
    var breakpoints = ensureArray(get(theme, 'breakpoints'));
    var mediaQueries = [null].concat(_toConsumableArray(breakpoints.map(function (n) {
      return "@media screen and (min-width: ".concat(n, ")");
    })));
    for (var key in styleProps) {
      if (!Object.prototype.hasOwnProperty.call(styleProps, key)) {
        continue;
      }
      var value = typeof styleProps[key] === 'function' ? styleProps[key](theme) : styleProps[key];
      if (isNullish(value)) {
        continue;
      }
      if (!Array.isArray(value)) {
        next[key] = value;
        continue;
      }
      for (var i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
        var media = mediaQueries[i];
        if (!media) {
          next[key] = value[i];
          continue;
        }
        next[media] = next[media] || {};
        if (value[i] === null || value[i] === undefined) {
          continue;
        }
        next[media][key] = value[i];
      }
    }
    return next;
  };
};

// Merges two already-resolved sx() results for the array-composition branch below. Deep,
// not shallow: when both sides have a plain object at the same key (a nested selector, a
// media query, ...), recurses into it instead of letting `resolved`'s value replace `acc`'s
// wholesale -- this is what makes two array items that both touch the same nested selector
// compose per-declaration rather than the later one discarding the earlier one's rules. A
// non-object value (or a type mismatch) is a plain last-write-wins overwrite, same as before.
var mergeResolvedSx = function mergeResolvedSx(acc, resolved) {
  var next = _objectSpread2$1({}, acc);
  for (var key in resolved) {
    if (!Object.prototype.hasOwnProperty.call(resolved, key)) {
      continue;
    }
    var accValue = next[key];
    var resolvedValue = resolved[key];
    next[key] = isPlainObject$1(accValue) && isPlainObject$1(resolvedValue) ? mergeResolvedSx(accValue, resolvedValue) : resolvedValue;
  }
  return next;
};
var sx = function sx(valueOrFn) {
  return function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (isNullish(valueOrFn)) {
      return {};
    }

    /**
     * If an array is provided, each item is resolved independently and merged left to right,
     * per declaration -- a later item overrides an earlier one's individual properties without
     * discarding the rest. For a flat property this is a plain last-write-wins overwrite. For a
     * nested rule (a pseudo-selector, media query, or any other plain-object value), the merge
     * recurses instead of replacing the whole nested object, so two array items that both touch
     * the SAME nested selector (e.g. two peer contributors both declaring `&:hover`) compose
     * their declarations together rather than the later one silently discarding everything the
     * earlier one declared under that selector.
     *
     * ```js
     * sx([
     *   { color: 'red:50' },
     *   { bg: 'gray:80' },
     *   (theme) => ({ fontSize: theme.fontSizes.sm }),
     * ])
     * ```
     */
    if (Array.isArray(valueOrFn)) {
      return valueOrFn.reduce(function (acc, item) {
        return mergeResolvedSx(acc, sx(item)(props));
      }, {});
    }
    var theme = _objectSpread2$1({}, props.theme || props);
    var resolvePseudo = createPseudoResolver();
    var resolveResponsive = createResponsiveResolver(theme);
    var originalStyleProps = typeof valueOrFn === 'function' ? valueOrFn(theme) : valueOrFn;
    var resolvedStyleProps = resolveResponsive(resolvePseudo(originalStyleProps));
    var result = {};
    for (var key in resolvedStyleProps) {
      if (!Object.prototype.hasOwnProperty.call(resolvedStyleProps, key)) {
        continue;
      }
      var styleValueOrFn = resolvedStyleProps[key];
      var value = typeof styleValueOrFn === 'function' ? styleValueOrFn(theme) : styleValueOrFn;
      if (isPlainObject$1(value)) {
        /**
         * An object value indicates a nested rule whose inner style tokens are resolved recursively against the theme.
         *
         * ```js
         * sx({ '&:hover': { color: 'red:50', bg: 'gray:80' } })
         * // key   → '&:hover'
         * // value → { color: 'red:50', bg: 'gray:80' }
         * ```
         *
         * `__colorMode` is forwarded so color tokens resolve correctly in dark mode.
         */
        result[key] = sx(value)({
          theme: theme,
          __colorMode: props.__colorMode
        });
        continue;
      }

      /**
       * The system config is a map of all style props with its corresponding "sx" function and properties.
       *
       * {
       *   background: f sx(scale, value, props)
       *     alias: undefined
       *     defaultScale: {}
       *     group: "background"
       *     properties: ['background']
       *     scale: "colors"
       *   bg: f sx(scale, value, props)
       *     alias: "background"
       *     defaultScale: {}
       *     group: "background"
       *     properties: ['background']
       *     scale: "colors"
       * }
       */
      var _sx = system$1.config[key];
      if (typeof _sx !== 'function') {
        // pass them through to the result for unknown props
        result[key] = value;
        continue;
      }
      var scale = get(theme, _sx.scale, _sx.defaultScale);
      result = _objectSpread2$1(_objectSpread2$1({}, result), _sx(scale, value, _objectSpread2$1(_objectSpread2$1({}, resolvedStyleProps), {}, {
        theme: theme,
        __colorMode: props.__colorMode
      })));
    }
    return result;
  };
};
var sx$1 = sx;

var shouldForwardProp = function() {
  var stylePropMap = ensureArray(system$1.propNames).reduce(function(acc, val) {
    acc[val] = true;
    return acc;
  }, {});
  var omittedStylePropMap = _objectSpread2$2(_objectSpread2$2({}, stylePropMap), {}, {
    // The `as` prop is supported by Emotion
    "as": true,
    // Internal prop for color mode injection, should not be forwarded to DOM
    "__colorMode": true,
    // Internal prop for base styles at the lowest priority, should not be forwarded to DOM
    "__sx": true
  });
  return function(prop) {
    return isPropValid(prop) && !omittedStylePropMap[prop];
  };
}();
var transformCSSPseudoSelectors = function transformCSSPseudoSelectors2(props) {
  var entries = Object.entries(ensurePlainObject(props)).filter(function(_ref) {
    var _ref2 = _slicedToArray$1(_ref, 2), name = _ref2[0];
    _ref2[1];
    return Object.prototype.hasOwnProperty.call(pseudoClassSelector, name) || Object.prototype.hasOwnProperty.call(pseudoElementSelector, name);
  });
  return sx$1(Object.fromEntries(entries));
};
var transformBaseSxProp = function transformBaseSxProp2(props) {
  return sx$1(props === null || props === void 0 ? void 0 : props.__sx);
};
var transformSxProp = function transformSxProp2(props) {
  return sx$1(props === null || props === void 0 ? void 0 : props.sx);
};
var Box$1 = /* @__PURE__ */ createStyled("div", {
  shouldForwardProp,
  target: "eecupy40"
} )(
  transformBaseSxProp,
  // `__sx` — base styles, LOWEST priority
  system$1,
  // style props
  transformCSSPseudoSelectors,
  // pseudo props (unchanged)
  transformSxProp,
  "" 
);
Box$1.displayName = "Box";
var BaseBox = Box$1;

var ColorModeContext = /*#__PURE__*/__mf_13();

var Box = /*#__PURE__*/__mf_16(function (props, ref) {
  var context = __mf_25(ColorModeContext);

  // Inject __colorMode from ColorModeContext if available
  if (context !== null && context !== void 0 && context.colorMode) {
    return jsx(BaseBox, _objectSpread2$2(_objectSpread2$2({
      ref: ref
    }, props), {}, {
      __colorMode: context.colorMode
    }));
  }
  return jsx(BaseBox, _objectSpread2$2({
    ref: ref
  }, props));
});
Box.displayName = 'Box';

var EnvironmentContext = /*#__PURE__*/__mf_13();

var defaultContext = {
  getRootNode: function getRootNode() {
    return document;
  },
  getDocument: function getDocument() {
    return document;
  },
  getWindow: function getWindow() {
    return window;
  }
};
var useEnvironment = function useEnvironment() {
  var context = __mf_25(EnvironmentContext);
  // Return default context if not within EnvironmentProvider
  // This makes the hook non-strict, allowing usage outside the provider
  return context !== null && context !== void 0 ? context : defaultContext;
};
var useEnvironment$1 = useEnvironment;

const { getOwnPropertyNames, getOwnPropertySymbols } = Object;
// eslint-disable-next-line @typescript-eslint/unbound-method
const { hasOwnProperty } = Object.prototype;
/**
 * Combine two comparators into a single comparators.
 */
function combineComparators(comparatorA, comparatorB) {
    return function isEqual(a, b, state) {
        return comparatorA(a, b, state) && comparatorB(a, b, state);
    };
}
/**
 * Wrap the provided `areItemsEqual` method to manage the circular state, allowing
 * for circular references to be safely included in the comparison without creating
 * stack overflows.
 */
function createIsCircular(areItemsEqual) {
    return function isCircular(a, b, state) {
        if (!a || !b || typeof a !== 'object' || typeof b !== 'object') {
            return areItemsEqual(a, b, state);
        }
        const { cache } = state;
        const cachedA = cache.get(a);
        const cachedB = cache.get(b);
        if (cachedA && cachedB) {
            return cachedA === b && cachedB === a;
        }
        cache.set(a, b);
        cache.set(b, a);
        const result = areItemsEqual(a, b, state);
        cache.delete(a);
        cache.delete(b);
        return result;
    };
}
/**
 * Get the `@@toStringTag` of the value, if it exists.
 */
function getShortTag(value) {
    return value != null ? value[Symbol.toStringTag] : undefined;
}
/**
 * Get the properties to strictly examine, which include both own properties that are
 * not enumerable and symbol properties.
 */
function getStrictProperties(object) {
    return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
/**
 * Whether the object contains the property passed as an own property.
 */
const hasOwn = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
Object.hasOwn || ((object, property) => hasOwnProperty.call(object, property));
/**
 * Whether the values passed are strictly equal or both NaN.
 */
function sameValueZeroEqual(a, b) {
    return a === b || (!a && !b && a !== a && b !== b);
}

const PREACT_VNODE = '__v';
const PREACT_OWNER = '__o';
const REACT_OWNER = '_owner';
const { getOwnPropertyDescriptor, keys } = Object;
/**
 * Whether the array buffers are equal in value.
 */
function areArrayBuffersEqual(a, b) {
    return a.byteLength === b.byteLength && areTypedArraysEqual(new Uint8Array(a), new Uint8Array(b));
}
/**
 * Whether the arrays are equal in value.
 */
function areArraysEqual(a, b, state) {
    let index = a.length;
    if (b.length !== index) {
        return false;
    }
    while (index-- > 0) {
        if (!state.equals(a[index], b[index], index, index, a, b, state)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the dataviews are equal in value.
 */
function areDataViewsEqual(a, b) {
    return (a.byteLength === b.byteLength
        && areTypedArraysEqual(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)));
}
/**
 * Whether the dates passed are equal in value.
 */
function areDatesEqual(a, b) {
    return sameValueZeroEqual(a.getTime(), b.getTime());
}
/**
 * Whether the errors passed are equal in value.
 */
function areErrorsEqual(a, b) {
    return a.name === b.name && a.message === b.message && a.cause === b.cause && a.stack === b.stack;
}
/**
 * Whether the functions passed are equal in value.
 */
function areFunctionsEqual(a, b) {
    return a === b;
}
/**
 * Whether the `Map`s are equal in value.
 */
function areMapsEqual(a, b, state) {
    const size = a.size;
    if (size !== b.size) {
        return false;
    }
    if (!size) {
        return true;
    }
    const matchedIndices = new Array(size);
    const aIterable = a.entries();
    let aResult;
    let bResult;
    let index = 0;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while ((aResult = aIterable.next())) {
        if (aResult.done) {
            break;
        }
        const bIterable = b.entries();
        let hasMatch = false;
        let matchIndex = 0;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        while ((bResult = bIterable.next())) {
            if (bResult.done) {
                break;
            }
            if (matchedIndices[matchIndex]) {
                matchIndex++;
                continue;
            }
            const aEntry = aResult.value;
            const bEntry = bResult.value;
            if (state.equals(aEntry[0], bEntry[0], index, matchIndex, a, b, state)
                && state.equals(aEntry[1], bEntry[1], aEntry[0], bEntry[0], a, b, state)) {
                hasMatch = matchedIndices[matchIndex] = true;
                break;
            }
            matchIndex++;
        }
        if (!hasMatch) {
            return false;
        }
        index++;
    }
    return true;
}
/**
 * Whether the numbers are equal in value.
 */
const areNumbersEqual = sameValueZeroEqual;
/**
 * Whether the objects are equal in value.
 */
function areObjectsEqual(a, b, state) {
    const properties = keys(a);
    let index = properties.length;
    if (keys(b).length !== index) {
        return false;
    }
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        if (!isPropertyEqual(a, b, state, properties[index])) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the objects are equal in value with strict property checking.
 */
function areObjectsEqualStrict(a, b, state) {
    const properties = getStrictProperties(a);
    let index = properties.length;
    if (getStrictProperties(b).length !== index) {
        return false;
    }
    let property;
    let descriptorA;
    let descriptorB;
    // Decrementing `while` showed faster results than either incrementing or
    // decrementing `for` loop and than an incrementing `while` loop. Declarative
    // methods like `some` / `every` were not used to avoid incurring the garbage
    // cost of anonymous callbacks.
    while (index-- > 0) {
        property = properties[index];
        if (!isPropertyEqual(a, b, state, property)) {
            return false;
        }
        descriptorA = getOwnPropertyDescriptor(a, property);
        descriptorB = getOwnPropertyDescriptor(b, property);
        if ((descriptorA || descriptorB)
            && (!descriptorA
                || !descriptorB
                || descriptorA.configurable !== descriptorB.configurable
                || descriptorA.enumerable !== descriptorB.enumerable
                || descriptorA.writable !== descriptorB.writable)) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the primitive wrappers passed are equal in value.
 */
function arePrimitiveWrappersEqual(a, b) {
    return sameValueZeroEqual(a.valueOf(), b.valueOf());
}
/**
 * Whether the regexps passed are equal in value.
 */
function areRegExpsEqual(a, b) {
    return a.source === b.source && a.flags === b.flags;
}
/**
 * Whether the `Set`s are equal in value.
 */
function areSetsEqual(a, b, state) {
    const size = a.size;
    if (size !== b.size) {
        return false;
    }
    if (!size) {
        return true;
    }
    const matchedIndices = new Array(size);
    const aIterable = a.values();
    let aResult;
    let bResult;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while ((aResult = aIterable.next())) {
        if (aResult.done) {
            break;
        }
        const bIterable = b.values();
        let hasMatch = false;
        let matchIndex = 0;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        while ((bResult = bIterable.next())) {
            if (bResult.done) {
                break;
            }
            if (!matchedIndices[matchIndex]
                && state.equals(aResult.value, bResult.value, aResult.value, bResult.value, a, b, state)) {
                hasMatch = matchedIndices[matchIndex] = true;
                break;
            }
            matchIndex++;
        }
        if (!hasMatch) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the TypedArray instances are equal in value.
 */
function areTypedArraysEqual(a, b) {
    let index = a.byteLength;
    if (b.byteLength !== index || a.byteOffset !== b.byteOffset) {
        return false;
    }
    while (index-- > 0) {
        if (a[index] !== b[index]) {
            return false;
        }
    }
    return true;
}
/**
 * Whether the URL instances are equal in value.
 */
function areUrlsEqual(a, b) {
    return (a.hostname === b.hostname
        && a.pathname === b.pathname
        && a.protocol === b.protocol
        && a.port === b.port
        && a.hash === b.hash
        && a.username === b.username
        && a.password === b.password);
}
function isPropertyEqual(a, b, state, property) {
    if ((property === REACT_OWNER || property === PREACT_OWNER || property === PREACT_VNODE)
        && (a.$$typeof || b.$$typeof)) {
        return true;
    }
    return hasOwn(b, property) && state.equals(a[property], b[property], property, property, a, b, state);
}

const ARRAY_BUFFER_TAG = '[object ArrayBuffer]';
const ARGUMENTS_TAG = '[object Arguments]';
const BOOLEAN_TAG = '[object Boolean]';
const DATA_VIEW_TAG = '[object DataView]';
const DATE_TAG = '[object Date]';
const ERROR_TAG = '[object Error]';
const MAP_TAG = '[object Map]';
const NUMBER_TAG = '[object Number]';
const OBJECT_TAG = '[object Object]';
const REG_EXP_TAG = '[object RegExp]';
const SET_TAG = '[object Set]';
const STRING_TAG = '[object String]';
const TYPED_ARRAY_TAGS = {
    '[object Int8Array]': true,
    '[object Uint8Array]': true,
    '[object Uint8ClampedArray]': true,
    '[object Int16Array]': true,
    '[object Uint16Array]': true,
    '[object Int32Array]': true,
    '[object Uint32Array]': true,
    '[object Float16Array]': true,
    '[object Float32Array]': true,
    '[object Float64Array]': true,
    '[object BigInt64Array]': true,
    '[object BigUint64Array]': true,
};
const URL_TAG = '[object URL]';
// eslint-disable-next-line @typescript-eslint/unbound-method
const toString = Object.prototype.toString;
/**
 * Create a comparator method based on the type-specific equality comparators passed.
 */
function createEqualityComparator({ areArrayBuffersEqual, areArraysEqual, areDataViewsEqual, areDatesEqual, areErrorsEqual, areFunctionsEqual, areMapsEqual, areNumbersEqual, areObjectsEqual, arePrimitiveWrappersEqual, areRegExpsEqual, areSetsEqual, areTypedArraysEqual, areUrlsEqual, unknownTagComparators, }) {
    /**
     * compare the value of the two objects and return true if they are equivalent in values
     */
    return function comparator(a, b, state) {
        // If the items are strictly equal, no need to do a value comparison.
        if (a === b) {
            return true;
        }
        // If either of the items are nullish and fail the strictly equal check
        // above, then they must be unequal.
        if (a == null || b == null) {
            return false;
        }
        const type = typeof a;
        if (type !== typeof b) {
            return false;
        }
        if (type !== 'object') {
            if (type === 'number') {
                return areNumbersEqual(a, b, state);
            }
            if (type === 'function') {
                return areFunctionsEqual(a, b, state);
            }
            // If a primitive value that is not strictly equal, it must be unequal.
            return false;
        }
        const constructor = a.constructor;
        // Checks are listed in order of commonality of use-case:
        //   1. Common complex object types (plain object, array)
        //   2. Common data values (date, regexp)
        //   3. Less-common complex object types (map, set)
        //   4. Less-common data values (promise, primitive wrappers)
        // Inherently this is both subjective and assumptive, however
        // when reviewing comparable libraries in the wild this order
        // appears to be generally consistent.
        // Constructors should match, otherwise there is potential for false positives
        // between class and subclass or custom object and POJO.
        if (constructor !== b.constructor) {
            return false;
        }
        // `isPlainObject` only checks against the object's own realm. Cross-realm
        // comparisons are rare, and will be handled in the ultimate fallback, so
        // we can avoid capturing the string tag.
        if (constructor === Object) {
            return areObjectsEqual(a, b, state);
        }
        // `isArray()` works on subclasses and is cross-realm, so we can avoid capturing
        // the string tag or doing an `instanceof` check.
        if (Array.isArray(a)) {
            return areArraysEqual(a, b, state);
        }
        // Try to fast-path equality checks for other complex object types in the
        // same realm to avoid capturing the string tag. Strict equality is used
        // instead of `instanceof` because it is more performant for the common
        // use-case. If someone is subclassing a native class, it will be handled
        // with the string tag comparison.
        if (constructor === Date) {
            return areDatesEqual(a, b, state);
        }
        if (constructor === RegExp) {
            return areRegExpsEqual(a, b, state);
        }
        if (constructor === Map) {
            return areMapsEqual(a, b, state);
        }
        if (constructor === Set) {
            return areSetsEqual(a, b, state);
        }
        // Since this is a custom object, capture the string tag to determing its type.
        // This is reasonably performant in modern environments like v8 and SpiderMonkey.
        const tag = toString.call(a);
        if (tag === DATE_TAG) {
            return areDatesEqual(a, b, state);
        }
        // For RegExp, the properties are not enumerable, and therefore will give false positives if
        // tested like a standard object.
        if (tag === REG_EXP_TAG) {
            return areRegExpsEqual(a, b, state);
        }
        if (tag === MAP_TAG) {
            return areMapsEqual(a, b, state);
        }
        if (tag === SET_TAG) {
            return areSetsEqual(a, b, state);
        }
        if (tag === OBJECT_TAG) {
            // The exception for value comparison is custom `Promise`-like class instances. These should
            // be treated the same as standard `Promise` objects, which means strict equality, and if
            // it reaches this point then that strict equality comparison has already failed.
            return typeof a.then !== 'function' && typeof b.then !== 'function' && areObjectsEqual(a, b, state);
        }
        // If a URL tag, it should be tested explicitly. Like RegExp, the properties are not
        // enumerable, and therefore will give false positives if tested like a standard object.
        if (tag === URL_TAG) {
            return areUrlsEqual(a, b, state);
        }
        // If an error tag, it should be tested explicitly. Like RegExp, the properties are not
        // enumerable, and therefore will give false positives if tested like a standard object.
        if (tag === ERROR_TAG) {
            return areErrorsEqual(a, b, state);
        }
        // If an arguments tag, it should be treated as a standard object.
        if (tag === ARGUMENTS_TAG) {
            return areObjectsEqual(a, b, state);
        }
        if (TYPED_ARRAY_TAGS[tag]) {
            return areTypedArraysEqual(a, b, state);
        }
        if (tag === ARRAY_BUFFER_TAG) {
            return areArrayBuffersEqual(a, b, state);
        }
        if (tag === DATA_VIEW_TAG) {
            return areDataViewsEqual(a, b, state);
        }
        // As the penultimate fallback, check if the values passed are primitive wrappers. This
        // is very rare in modern JS, which is why it is deprioritized compared to all other object
        // types.
        if (tag === BOOLEAN_TAG || tag === NUMBER_TAG || tag === STRING_TAG) {
            return arePrimitiveWrappersEqual(a, b, state);
        }
        if (unknownTagComparators) {
            let unknownTagComparator = unknownTagComparators[tag];
            if (!unknownTagComparator) {
                const shortTag = getShortTag(a);
                if (shortTag) {
                    unknownTagComparator = unknownTagComparators[shortTag];
                }
            }
            // If the custom config has an unknown tag comparator that matches the captured tag or the
            // @@toStringTag, it is the source of truth for whether the values are equal.
            if (unknownTagComparator) {
                return unknownTagComparator(a, b, state);
            }
        }
        // If not matching any tags that require a specific type of comparison, then we hard-code false because
        // the only thing remaining is strict equality, which has already been compared. This is for a few reasons:
        //   - Certain types that cannot be introspected (e.g., `WeakMap`). For these types, this is the only
        //     comparison that can be made.
        //   - For types that can be introspected, but rarely have requirements to be compared
        //     (`ArrayBuffer`, `DataView`, etc.), the cost is avoided to prioritize the common
        //     use-cases (may be included in a future release, if requested enough).
        //   - For types that can be introspected but do not have an objective definition of what
        //     equality is (`Error`, etc.), the subjective decision is to be conservative and strictly compare.
        // In all cases, these decisions should be reevaluated based on changes to the language and
        // common development practices.
        return false;
    };
}
/**
 * Create the configuration object used for building comparators.
 */
function createEqualityComparatorConfig({ circular, createCustomConfig, strict, }) {
    let config = {
        areArrayBuffersEqual,
        areArraysEqual: strict ? areObjectsEqualStrict : areArraysEqual,
        areDataViewsEqual,
        areDatesEqual: areDatesEqual,
        areErrorsEqual: areErrorsEqual,
        areFunctionsEqual: areFunctionsEqual,
        areMapsEqual: strict ? combineComparators(areMapsEqual, areObjectsEqualStrict) : areMapsEqual,
        areNumbersEqual: areNumbersEqual,
        areObjectsEqual: strict ? areObjectsEqualStrict : areObjectsEqual,
        arePrimitiveWrappersEqual: arePrimitiveWrappersEqual,
        areRegExpsEqual: areRegExpsEqual,
        areSetsEqual: strict ? combineComparators(areSetsEqual, areObjectsEqualStrict) : areSetsEqual,
        areTypedArraysEqual: strict
            ? combineComparators(areTypedArraysEqual, areObjectsEqualStrict)
            : areTypedArraysEqual,
        areUrlsEqual: areUrlsEqual,
        unknownTagComparators: undefined,
    };
    if (createCustomConfig) {
        config = Object.assign({}, config, createCustomConfig(config));
    }
    if (circular) {
        const areArraysEqual = createIsCircular(config.areArraysEqual);
        const areMapsEqual = createIsCircular(config.areMapsEqual);
        const areObjectsEqual = createIsCircular(config.areObjectsEqual);
        const areSetsEqual = createIsCircular(config.areSetsEqual);
        config = Object.assign({}, config, {
            areArraysEqual,
            areMapsEqual,
            areObjectsEqual,
            areSetsEqual,
        });
    }
    return config;
}
/**
 * Default equality comparator pass-through, used as the standard `isEqual` creator for
 * use inside the built comparator.
 */
function createInternalEqualityComparator(compare) {
    return function (a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, state) {
        return compare(a, b, state);
    };
}
/**
 * Create the `isEqual` function used by the consuming application.
 */
function createIsEqual({ circular, comparator, createState, equals, strict }) {
    if (createState) {
        return function isEqual(a, b) {
            const { cache = circular ? new WeakMap() : undefined, meta } = createState();
            return comparator(a, b, {
                cache,
                equals,
                meta,
                strict,
            });
        };
    }
    if (circular) {
        return function isEqual(a, b) {
            return comparator(a, b, {
                cache: new WeakMap(),
                equals,
                meta: undefined,
                strict,
            });
        };
    }
    const state = {
        cache: undefined,
        equals,
        meta: undefined,
        strict,
    };
    return function isEqual(a, b) {
        return comparator(a, b, state);
    };
}

/**
 * Whether the items passed are deeply-equal in value.
 */
const deepEqual = createCustomEqual();
/**
 * Whether the items passed are deeply-equal in value based on strict comparison.
 */
createCustomEqual({ strict: true });
/**
 * Whether the items passed are deeply-equal in value, including circular references.
 */
createCustomEqual({ circular: true });
/**
 * Whether the items passed are deeply-equal in value, including circular references,
 * based on strict comparison.
 */
createCustomEqual({
    circular: true,
    strict: true,
});
/**
 * Whether the items passed are shallowly-equal in value.
 */
const shallowEqual = createCustomEqual({
    createInternalComparator: () => sameValueZeroEqual,
});
/**
 * Whether the items passed are shallowly-equal in value based on strict comparison
 */
createCustomEqual({
    strict: true,
    createInternalComparator: () => sameValueZeroEqual,
});
/**
 * Whether the items passed are shallowly-equal in value, including circular references.
 */
createCustomEqual({
    circular: true,
    createInternalComparator: () => sameValueZeroEqual,
});
/**
 * Whether the items passed are shallowly-equal in value, including circular references,
 * based on strict comparison.
 */
createCustomEqual({
    circular: true,
    createInternalComparator: () => sameValueZeroEqual,
    strict: true,
});
/**
 * Create a custom equality comparison method.
 *
 * This can be done to create very targeted comparisons in extreme hot-path scenarios
 * where the standard methods are not performant enough, but can also be used to provide
 * support for legacy environments that do not support expected features like
 * `RegExp.prototype.flags` out of the box.
 */
function createCustomEqual(options = {}) {
    const { circular = false, createInternalComparator: createCustomInternalComparator, createState, strict = false, } = options;
    const config = createEqualityComparatorConfig(options);
    const comparator = createEqualityComparator(config);
    const equals = createCustomInternalComparator
        ? createCustomInternalComparator(comparator)
        : createInternalEqualityComparator(comparator);
    return createIsEqual({ circular, comparator, createState, equals, strict });
}

/**
 * Consistent reference for no options passed, to avoid garbage.
 */
var DEFAULT_OPTIONS = {};
/**
 * Stringifier that handles circular values.
 */
function stringify(value, _a) {
    var _b = _a === void 0 ? DEFAULT_OPTIONS : _a, indent = _b.indent, replacer = _b.replacer, circularReplacer = _b.circularReplacer, stable = _b.stable, stabilizer = _b.stabilizer;
    var cache = [];
    var keys = [];
    var getStableSorter = stable && stabilizer
        ? function (object) {
            var options = {
                get: function (key) { return object[key]; },
            };
            return function (a, b) {
                return stabilizer({ key: a, value: object[a] }, { key: b, value: object[b] }, options);
            };
        }
        : undefined;
    return JSON.stringify(value, function replace(key, rawValue) {
        var value = rawValue;
        if (typeof value === 'object' && value !== null) {
            if (cache.length) {
                var thisCutoff = cache.indexOf(this) + 1;
                if (thisCutoff === 0) {
                    cache[cache.length] = this;
                }
                else {
                    cache.splice(thisCutoff);
                    keys.splice(thisCutoff);
                }
                keys[keys.length] = key;
                var valueCutoff = cache.indexOf(value) + 1;
                if (valueCutoff > 0) {
                    var referenceKey = keys.slice(0, valueCutoff).join('.') || '.';
                    return circularReplacer
                        ? circularReplacer.call(this, key, value, referenceKey)
                        : '[ref=' + referenceKey + ']';
                }
            }
            else {
                cache[0] = value;
                keys[0] = key;
            }
            if (stable && !Array.isArray(value)) {
                value = Object.keys(value)
                    .sort(getStableSorter === null || getStableSorter === void 0 ? void 0 : getStableSorter(value))
                    .reduce(function (sorted, key) {
                    sorted[key] = value[key];
                    return sorted;
                }, {});
            }
        }
        return replacer ? replacer.call(this, key, value) : value;
    }, indent);
}

class CacheEventEmitter {
    constructor(cache) {
        /**
         * The list of [l]isteners for the given [t]ype.
         */
        this.l = {};
        this.c = cache;
    }
    /**
     * Method to [a]dd a listener for the given cache change event.
     */
    a(type, listener) {
        const listeners = this.l[type];
        if (!listeners) {
            this.l[type] = new Set([listener]);
        }
        else if (!listeners.has(listener)) {
            listeners.add(listener);
        }
    }
    /**
     * Method to [n]otify all listeners for the given cache change event.
     */
    n(type, node, reason) {
        const listeners = this.l[type];
        if (!listeners) {
            return;
        }
        listeners.forEach((listener) => {
            listener({
                cache: this.c,
                key: node.k,
                reason,
                value: node.v,
                type,
            });
        });
    }
    /**
     * Method to [r]emove a listener for the given cache change event.
     */
    r(type, listener) {
        const listeners = this.l[type];
        if (!listeners) {
            return;
        }
        listeners.delete(listener);
        if (!listeners.size) {
            this.l[type] = undefined;
        }
    }
}

/**
 * Create a method that takes the first N number of items from the array (faster than slice).
 */
function getMaxArgsTransformKey(maxArgs) {
    if (maxArgs === 1) {
        return (args) => (maxArgs >= args.length ? args : [args[0]]);
    }
    if (maxArgs === 2) {
        return (args) => (maxArgs >= args.length ? args : [args[0], args[1]]);
    }
    return (args) => {
        if (maxArgs >= args.length) {
            return args;
        }
        const clone = new Array(maxArgs);
        for (let index = 0; index < maxArgs; ++index) {
            clone[index] = args[index];
        }
        return clone;
    };
}

/**
 * Default replacer used when stringifying to ensure values that would normally be
 * ignored are respected.
 */
function replacer(_key, value) {
    const type = typeof value;
    return type === 'function' || type === 'symbol' ? value.toString() : value;
}
/**
 * Default serializer used when `serialize` option set to `true`.
 */
function transformKeySerialized(args) {
    return [stringify(args, { replacer })];
}
/**
 * Determines whether the serialized keys are equal to one another.
 */
function isSerializedKeyEqual(prevKey, nextKey) {
    return prevKey[0] === nextKey[0];
}

/**
 * Whether the value passed is a memoized function via `micro-memoize`.
 */
function isMemoized(fn) {
    return typeof fn === 'function' && fn.isMemoized;
}
/**
 * Determine whether the value passed is a numeric value for usage in common contexts.
 * This is a positive, finite integer.
 */
function isNumericValueValid(value) {
    return typeof value === 'number' && value >= 0 && Number.isFinite(value);
}

class Cache {
    constructor(options) {
        /**
         * The current [c]ount of entries in the cache.
         */
        this.c = 0;
        const { async, maxSize } = options;
        this.e = getIsKeyEqual(options);
        this.k = getTransformKey(options);
        this.p = typeof async === 'boolean' && async;
        this.s = isNumericValueValid(maxSize) ? maxSize : 1;
    }
    /**
     * The size of the populated cache.
     */
    get size() {
        return this.c;
    }
    /**
     * The [key, value] pairs for the existing entries in cache.
     */
    get snapshot() {
        const entries = [];
        const keys = [];
        const values = [];
        let node = this.h;
        let size = 0;
        while (node != null) {
            keys.push(node.k);
            values.push(node.v);
            entries.push([node.k, node.v]);
            ++size;
            node = node.n;
        }
        return { entries, keys, size, values };
    }
    /**
     * Clear the cache.
     */
    clear(reason = 'explicit clear') {
        if (!this.h) {
            return;
        }
        const emitter = this.o;
        let nodes;
        if (emitter) {
            nodes = [];
            let node = this.h;
            while (node != null) {
                nodes.push(node);
                node = node.n;
            }
        }
        this.h = this.t = undefined;
        this.c = 0;
        if (emitter && nodes) {
            for (let index = 0; index < nodes.length; ++index) {
                emitter.n('delete', nodes[index], reason);
            }
        }
    }
    /**
     * Delete the entry for the key based on the given `args` in cache.
     */
    delete(args, reason = 'explicit delete') {
        const node = this.g(this.k ? this.k(args) : args);
        if (node) {
            this.d(node, reason);
            return true;
        }
        return false;
    }
    /**
     * Get the value in cache based on the given `args`.
     */
    get(args, reason = 'explicit get') {
        const node = this.g(this.k ? this.k(args) : args);
        if (node) {
            if (node !== this.h) {
                this.u(node, reason, true);
            }
            else if (this.o) {
                this.o.n('hit', node, reason);
            }
            return node.v;
        }
    }
    /**
     * Determine whether the given `args` have a related entry in the cache.
     */
    has(args) {
        return !!this.g(this.k ? this.k(args) : args);
    }
    /**
     * Remove the given `listener` for the given `type` of cache event.
     */
    off(type, listener) {
        this.o && this.o.r(type, listener);
    }
    /**
     * Add the given `listener` for the given `type` of cache event.
     */
    on(type, listener) {
        if (!this.o) {
            this.o = new CacheEventEmitter(this);
        }
        this.o.a(type, listener);
    }
    /**
     * Add or update the cache entry for the given `key`.
     */
    set(key, value, reason = 'explicit set') {
        const normalizedKey = this.k ? this.k(key) : key;
        let node = this.g(normalizedKey);
        if (node) {
            const prevValue = node.v;
            node.v = value;
            if (this.p && value !== prevValue) {
                node.v = this.w(node);
            }
            node !== this.h && this.u(node, reason, false);
        }
        else {
            node = this.n(normalizedKey, value);
        }
    }
    /**
     * Method to [d]elete the given `node` from the cache.
     */
    d(node, reason) {
        const next = node.n;
        const prev = node.p;
        if (next) {
            next.p = prev;
        }
        else {
            this.t = prev;
        }
        if (prev) {
            prev.n = next;
        }
        else {
            this.h = next;
        }
        --this.c;
        node.r = true;
        this.o && this.o.n('delete', node, reason);
    }
    /**
     * Method to [g]et an existing node from cache based on the given `key`.
     */
    g(key) {
        let node = this.h;
        if (!node || node.r) {
            return;
        }
        if (this.e(node.k, key)) {
            return node;
        }
        if (this.h === this.t) {
            return;
        }
        node = node.n;
        while (node) {
            if (node.r) {
                return;
            }
            if (this.e(node.k, key)) {
                return node;
            }
            node = node.n;
        }
    }
    /**
     * Method to create a new [n]ode and set it at the head of the linked list.
     */
    n(key, value, reason) {
        const prevHead = this.h;
        const prevTail = this.t;
        const node = { k: key, n: prevHead, p: undefined, v: value };
        if (this.p) {
            node.v = this.w(node);
        }
        this.h = node;
        if (prevHead) {
            prevHead.p = node;
        }
        else {
            this.t = node;
        }
        if (++this.c > this.s && prevTail) {
            this.d(prevTail, 'evicted');
        }
        this.o && this.o.n('add', node, reason);
        return node;
    }
    /**
     * Method to [u]date the location of the given `node` in cache.
     */
    u(node, reason, hit) {
        const next = node.n;
        const prev = node.p;
        if (next) {
            next.p = prev;
        }
        if (prev) {
            prev.n = next;
        }
        if (this.h) {
            this.h.p = node;
        }
        node.n = this.h;
        node.p = undefined;
        this.h = node;
        if (node === this.t) {
            this.t = prev;
        }
        if (this.o) {
            hit && this.o.n('hit', node, reason);
            this.o.n('update', node, reason);
        }
    }
    /**
     * Method to [w]rap the promise in a handler to automatically delete the
     * entry if it rejects.
     */
    w(node) {
        const { v: value } = node;
        // If the method does not return a promise for some reason, just keep the
        // original value.
        if (value == null || typeof value.then !== 'function') {
            return value;
        }
        return value.then((value) => {
            !node.r && this.o && this.o.n('update', node, 'resolved');
            return value;
        }, (error) => {
            !node.r && this.d(node, 'rejected');
            throw error;
        });
    }
}
function getIsKeyEqual({ isKeyEqual, isKeyItemEqual, serialize, }) {
    if (typeof isKeyEqual === 'function') {
        return isKeyEqual;
    }
    if (serialize) {
        return isSerializedKeyEqual;
    }
    const isItemEqual = typeof isKeyItemEqual === 'function'
        ? isKeyItemEqual
        : isKeyItemEqual === 'deep'
            ? deepEqual
            : isKeyItemEqual === 'shallow'
                ? shallowEqual
                : Object.is;
    return function isKeyEqual(prevKey, nextKey) {
        const length = nextKey.length;
        if (prevKey.length !== length) {
            return false;
        }
        if (length === 1) {
            return isItemEqual(prevKey[0], nextKey[0], 0);
        }
        for (let index = 0; index < length; ++index) {
            if (!isItemEqual(prevKey[index], nextKey[index], index)) {
                return false;
            }
        }
        return true;
    };
}
/**
 * Get the `transformKey` option based on the options provided.
 */
function getTransformKey(options) {
    const { maxArgs, serialize, transformKey } = options;
    const transformers = [
        serialize ? (typeof serialize === 'function' ? serialize : transformKeySerialized) : undefined,
        isNumericValueValid(maxArgs) ? getMaxArgsTransformKey(maxArgs) : undefined,
        typeof transformKey === 'function' ? transformKey : undefined,
    ].filter(Boolean);
    return transformers.length
        ? transformers.reduce((f, g) => (...args) => 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        f(g(...args)))
        : undefined;
}

class ExpirationManager {
    constructor(cache, expires) {
        /**
         * Map of [e]xpiration timeouts.
         */
        this.e = new Map();
        this.c = cache;
        if (typeof expires === 'object') {
            this.t = expires.after;
            this.p = expires.shouldPersist;
            this.r = expires.shouldRemove;
            this.u = !!expires.update;
        }
        else {
            this.t = expires;
            this.u = false;
        }
        this.c.on('add', ({ key, value }) => {
            this.a(key, value) && this.s(key, value);
        });
        if (this.u) {
            // Set up a `hit` listener if we care about updating the expiration.
            this.c.on('hit', ({ key, value }) => {
                this.a(key, value) && this.s(key, value);
            });
            if (this.c.p) {
                const onResolved = ({ key, reason, value }) => {
                    if (reason === 'resolved' && this.a(key, value)) {
                        this.s(key, value);
                        // Automatically remove the listener to avoid unnecessary work on updates after
                        // the item is resolved, as that can only ever happen once.
                        this.c.off('update', onResolved);
                    }
                };
                // If the method is also async, then when the value resolved update the expiration cache.
                this.c.on('update', onResolved);
            }
        }
        this.c.on('delete', ({ key }) => {
            this.e.has(key) && this.d(key);
        });
    }
    get size() {
        return this.e.size;
    }
    /**
     * Whether the cache expiration should be set [a]gain, generally after some cache change.
     */
    a(key, value) {
        var _a;
        return !!(this.c.g(key) && !((_a = this.p) === null || _a === void 0 ? void 0 : _a.call(this, key, value, this.c)));
    }
    /**
     * Method to [d]elete the expiration.
     */
    d(key) {
        const expiration = this.e.get(key);
        if (expiration) {
            clearTimeout(expiration);
            this.e.delete(key);
        }
    }
    /**
     * Method to [s]et the new expiration. If one is present for the given `key`, it will delete
     * the existing expiration before creating the new one.
     */
    s(key, value) {
        if (this.e.has(key)) {
            this.d(key);
        }
        const cache = this.c;
        const time = typeof this.t === 'function' ? this.t(key, value, cache) : this.t;
        if (!isNumericValueValid(time)) {
            throw new TypeError(`The expiration time must be a finite, non-negative number; received ${time}`);
        }
        const timeout = setTimeout(() => {
            this.d(key);
            const node = cache.g(key);
            if (!node) {
                return;
            }
            if (typeof this.r === 'function' && !this.r(key, node.v, time, cache)) {
                if (node !== cache.h) {
                    cache.u(node, 'expiration reset', false);
                }
                else if (cache.o) {
                    // Always notify, even if at the top of the cache.
                    cache.o.n('update', node, 'expiration reset');
                }
                this.s(key, node.v);
            }
            else {
                cache.d(node, 'expired');
            }
        }, time);
        if (typeof timeout.unref === 'function') {
            // If done in NodeJS, the timeout should have its reference removed to avoid
            // hanging timers if collected while running.
            timeout.unref();
        }
        this.e.set(key, timeout);
    }
}

const nameToProfile = new Map();
class StatsManager {
    constructor(cache, statsName) {
        /**
         * The counts for the stats [p]rofile.
         */
        this.p = { c: 0, h: 0 };
        this.c = cache;
        this.n = statsName;
        nameToProfile.set(statsName, this);
    }
    /**
     * Method to compute the [m]etrics for the profile stats.
     */
    m() {
        const { c: calls, h: hits } = this.p;
        const usage = calls ? `${((hits / calls) * 100).toFixed(4)}%` : '0.0000%';
        return { calls, hits, name: this.n, usage };
    }
    /**
     * Method to [r]eset the counts.
     */
    r() {
        this.p = { c: 0, h: 0 };
    }
    /**
     * Method to [s]tart the collection of stats for the given profile.
     */
    s() {
        const onAdd = () => {
            ++this.p.c;
        };
        const onHit = () => {
            ++this.p.c;
            ++this.p.h;
        };
        this.d = () => {
            this.c.off('add', onAdd);
            this.c.off('hit', onHit);
            this.d = undefined;
            this.p.c = this.p.h = 0;
        };
        this.c.on('add', onAdd);
        this.c.on('hit', onHit);
    }
}

const memoize = function memoize(fn, options = {}) {
    if (isMemoized(fn)) {
        return memoize(fn.fn, Object.assign({}, fn.options, options));
    }
    if (typeof fn !== 'function') {
        throw new TypeError(`Expected first parameter to be function; received ${typeof fn}`);
    }
    const cache = new Cache(options);
    const memoized = createMemoizedMethod(fn, cache, options.forceUpdate);
    const { expires, statsName } = options;
    memoized.cache = cache;
    memoized.expirationManager = expires != null ? new ExpirationManager(cache, expires) : null;
    memoized.fn = fn;
    memoized.isMemoized = true;
    memoized.options = options;
    memoized.statsManager = statsName != null ? new StatsManager(cache, statsName) : null;
    return memoized;
};
function createMemoizedMethod(fn, cache, forceUpdate) {
    const memoized = function memoized(...args) {
        const key = cache.k ? cache.k(args) : args;
        let node = cache.g(key);
        if (!node) {
            node = cache.n(key, fn.apply(this, args));
        }
        else if (node !== cache.h) {
            cache.u(node, undefined, true);
        }
        else if (cache.o) {
            cache.o.n('hit', node);
        }
        return node.v;
    };
    if (!forceUpdate) {
        return memoized;
    }
    return function wrappedMemoized(...args) {
        if (!forceUpdate(args) || !cache.has(args)) {
            return memoized.apply(this, args);
        }
        const value = fn.apply(this, args);
        cache.set(args, value, 'forced');
        return value;
    };
}

var useShallowMemo = function useShallowMemo() {
  return __mf_37(memoize(function (v) {
    return v;
  }, {
    isKeyItemEqual: 'shallow'
  })).current;
};
var useShallowMemo$1 = useShallowMemo;

/**
 * @typedef {Object} useThemeOptions
 * @property {'light' | 'dark'} [colorMode] - The color mode to use for resolving theme tokens. If not specified, uses the current color mode from ColorModeContext.
 */

/**
 * Returns the theme object with color mode tokens (_dark/_light) resolved based on the current or specified color mode.
 *
 * This hook wraps Emotion's useTheme and automatically resolves color mode-specific tokens.
 * Components using this hook will receive a theme where all _dark and _light properties are
 * resolved to their appropriate values based on the active color mode.
 *
 * @param {useThemeOptions} [options] - Optional configuration for the hook.
 * @returns {ThemeScales & { get: (path: string, defaultValue?: string) => string }} The resolved theme object with color mode tokens resolved.
 *
 * @example
 * // Using current color mode from context
 * const theme = useTheme();
 * console.log(theme.get('colors.text.primary')); // Resolved color token for current mode
 *
 * @example
 * // Specifying a color mode
 * const theme = useTheme({ colorMode: 'dark' });
 * console.log(theme.get('colors.text.primary')); // Always uses _dark value
 */
var useTheme = function useTheme(options) {
  var theme = useTheme$2();
  var _ensurePlainObject = ensurePlainObject(options),
    specifiedColorMode = _ensurePlainObject.colorMode;
  var _ensurePlainObject2 = ensurePlainObject(__mf_25(ColorModeContext)),
    currentColorMode = _ensurePlainObject2.colorMode;
  var colorMode = specifiedColorMode !== null && specifiedColorMode !== void 0 ? specifiedColorMode : currentColorMode;
  return theme.toColorMode(colorMode);
};
var useTheme$1 = useTheme;

var useTextStyle = function useTextStyle(_ref) {
  var size = _ref.size;
  var _useTheme = useTheme$1(),
    fontSizes = _useTheme.fontSizes,
    lineHeights = _useTheme.lineHeights;
  return {
    display: 'block',
    // Apply 'display: block' to ensure Text-based components behave as block-level elements
    fontSize: fontSizes === null || fontSizes === void 0 ? void 0 : fontSizes[size],
    lineHeight: lineHeights === null || lineHeights === void 0 ? void 0 : lineHeights[size]
  };
};

var _excluded$3 = ["size"];
var Text = /*#__PURE__*/__mf_16(function (inProps, ref) {
  var _useDefaultProps = useDefaultProps$1({
      props: inProps,
      name: 'Text'
    }),
    size = _useDefaultProps.size,
    rest = _objectWithoutProperties(_useDefaultProps, _excluded$3);
  var styleProps = useTextStyle({
    size: size
  });
  return jsx(Box, _objectSpread2$4(_objectSpread2$4({
    ref: ref
  }, styleProps), rest));
});
Text.displayName = 'Text';
var Text$1 = Text;

// The `win` argument provides the window context (e.g. from `useEnvironment`)
// so these helpers do not reference the global `window` directly.
var matchMediaQuery = function matchMediaQuery(query) {
  var _win$matchMedia;
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var mediaQueryList = win === null || win === void 0 ? void 0 : (_win$matchMedia = win.matchMedia) === null || _win$matchMedia === void 0 ? void 0 : _win$matchMedia.call(win, query);
  if (!mediaQueryList) {
    return undefined;
  }
  return mediaQueryList.matches;
};
var colorSchemeQuery = {
  dark: '(prefers-color-scheme: dark)'};
var getColorScheme = function getColorScheme(fallbackColorMode) {
  var _matchMediaQuery;
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var isDarkColorScheme = (_matchMediaQuery = matchMediaQuery(colorSchemeQuery.dark, win)) !== null && _matchMediaQuery !== void 0 ? _matchMediaQuery : fallbackColorMode === 'dark';
  return isDarkColorScheme ? 'dark' : 'light';
};

var ensureColorMode = function ensureColorMode(colorMode) {
  return colorMode === 'dark' ? 'dark' : 'light';
};
var colorModeReducer = function colorModeReducer(state, nextValue) {
  if (nextValue === undefined) {
    var colorMode = state;
    return colorMode === 'dark' ? 'light' : 'dark';
  }
  return ensureColorMode(nextValue);
};

/**
 * @typedef {Object} ColorModeProviderProps
 * @property {React.ReactNode} [children] - The content of the provider.
 * @property {'dark' | 'light'} [defaultValue] - The default color mode.
 * @property {'dark' | 'light'} [value] - The controlled color mode.
 * @property {(mode: 'dark' | 'light') => void} [onChange] - Callback fired when the color mode changes.
 * @property {boolean} [useSystemColorMode] - Whether to use the system color mode.
 */

/**
 * @type {React.FC<ColorModeProviderProps>}
 */
var ColorModeProvider = function ColorModeProvider(inProps) {
  var _useDefaultProps = useDefaultProps$1({
      props: inProps,
      name: 'ColorModeProvider'
    }),
    children = _useDefaultProps.children,
    defaultValueProp = _useDefaultProps.defaultValue,
    valueProp = _useDefaultProps.value,
    onChangeProp = _useDefaultProps.onChange,
    useSystemColorMode = _useDefaultProps.useSystemColorMode;
  var _useEnvironment = useEnvironment$1(),
    getWindow = _useEnvironment.getWindow;
  var shallowMemo = useShallowMemo$1();
  var defaultColorMode = defaultValueProp === 'dark' ? 'dark' : 'light';
  var _useReducer = __mf_36(colorModeReducer, ensureColorMode(valueProp !== null && valueProp !== void 0 ? valueProp : defaultColorMode)),
    _useReducer2 = _slicedToArray$3(_useReducer, 2),
    colorMode = _useReducer2[0],
    setColorMode = _useReducer2[1];
  __mf_28(function () {
    if (valueProp !== undefined) {
      setColorMode(valueProp);
    }
  }, [valueProp]);
  var onChange = __mf_24(function (nextValue) {
    if (valueProp !== undefined) {
      setColorMode(valueProp);
    } else {
      setColorMode(nextValue);
    }
    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue); // Pass original value to the onChange callback
    }
  }, [valueProp, onChangeProp]);
  __mf_28(function () {
    var _ownerWindow$matchMed;
    if (valueProp !== null && valueProp !== undefined) {
      // bypass the system color mode if `valueProp` is set
      return noop;
    }
    if (!useSystemColorMode) {
      return noop;
    }
    if (!canUseDOM()) {
      return noop;
    }
    var ownerWindow = getWindow();
    var systemColorMode = getColorScheme(defaultColorMode, ownerWindow);
    onChange(systemColorMode);
    var mediaQueryList = ownerWindow === null || ownerWindow === void 0 ? void 0 : (_ownerWindow$matchMed = ownerWindow.matchMedia) === null || _ownerWindow$matchMed === void 0 ? void 0 : _ownerWindow$matchMed.call(ownerWindow, colorSchemeQuery.dark);
    var listener = function listener() {
      onChange(mediaQueryList.matches ? 'dark' : 'light');
    };
    mediaQueryList.addEventListener('change', listener);
    return function () {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [defaultValueProp, valueProp, useSystemColorMode, defaultColorMode, onChange, getWindow]);
  var colorModeState = shallowMemo({
    colorMode: colorMode,
    onChange: onChange
  });
  return jsx(ColorModeContext.Provider, {
    value: colorModeState,
    children: children
  });
};
ColorModeProvider.displayName = 'ColorModeProvider';
var ColorModeProvider$1 = ColorModeProvider;

var colorStyle = {
  dark: {
    background: {
      primary: 'background.low',
      secondary: 'background.high',
      tertiary: 'background.highest',
      inverted: 'background._fixed.light.low',
      inverse: 'background._fixed.light.low',
      // alias for inverted
      highlighted: 'actions.hovered',
      selected: 'actions.selected'
    },
    color: {
      emphasis: 'text.accent',
      primary: 'text.primary',
      secondary: 'text.secondary',
      tertiary: 'text.tertiary',
      disabled: 'text.disabled',
      success: 'success.icon',
      info: 'info.icon',
      warning: 'warning.icon',
      error: 'error.icon'
    },
    divider: 'border.tertiary',
    text: {
      selection: '_foreground.primary.enabled',
      highlight: '_highlight'
    },
    shadow: {
      thin: 'high',
      medium: 'medium',
      thick: 'low'
    }
  },
  light: {
    background: {
      primary: 'background.low',
      secondary: 'background.high',
      tertiary: 'background.highest',
      inverted: 'background._fixed.dark.low',
      inverse: 'background._fixed.light.low',
      // alias for inverted
      highlighted: 'actions.hovered',
      selected: 'actions.selected'
    },
    color: {
      emphasis: 'text.accent',
      primary: 'text.primary',
      secondary: 'text.secondary',
      tertiary: 'text.tertiary',
      disabled: 'text.disabled',
      success: 'success.icon',
      info: 'info.icon',
      warning: 'warning.icon',
      error: 'error.icon'
    },
    divider: 'border.tertiary',
    text: {
      selection: '_foreground.primary.enabled',
      highlight: '_highlight'
    },
    shadow: {
      thin: 'high',
      medium: 'medium',
      thick: 'low'
    }
  }
};
var defaultColorStyle = colorStyle;

var ColorStyleContext = /*#__PURE__*/__mf_13();

var ensureColorStyle = function ensureColorStyle(colorStyle) {
  return ensurePlainObject(colorStyle);
};
var ColorStyleProvider = function ColorStyleProvider(inProps) {
  var _useDefaultProps = useDefaultProps$1({
      props: inProps,
      name: 'ColorStyleProvider'
    }),
    children = _useDefaultProps.children,
    defaultValueProp = _useDefaultProps.defaultValue,
    valueProp = _useDefaultProps.value,
    onChangeProp = _useDefaultProps.onChange;
  var shallowMemo = useShallowMemo$1();
  var _useState = __mf_38(ensureColorStyle(valueProp !== null && valueProp !== void 0 ? valueProp : defaultValueProp !== null && defaultValueProp !== void 0 ? defaultValueProp : defaultColorStyle)),
    _useState2 = _slicedToArray$3(_useState, 2),
    colorStyle = _useState2[0],
    setColorStyle = _useState2[1];
  __mf_28(function () {
    if (valueProp !== undefined) {
      setColorStyle(ensureColorStyle(valueProp));
    }
  }, [valueProp]);
  var onChange = __mf_24(function (nextValue) {
    if (valueProp !== undefined) {
      setColorStyle(ensureColorStyle(valueProp));
    } else {
      setColorStyle(ensureColorStyle(nextValue));
    }
    if (typeof onChangeProp === 'function') {
      onChangeProp(nextValue); // Pass original value to the onChange callback
    }
  }, [valueProp, onChangeProp]);
  var colorStyleState = shallowMemo({
    colorStyle: colorStyle,
    onChange: onChange
  });
  return jsx(ColorStyleContext.Provider, {
    value: colorStyleState,
    children: children
  });
};
ColorStyleProvider.displayName = 'ColorStyleProvider';
var ColorStyleProvider$1 = ColorStyleProvider;

var baseCSS = function baseCSS2(theme) {
  var _theme$fonts$base, _theme$fonts, _theme$fonts$mono, _theme$fonts2;
  var baseFonts = (_theme$fonts$base = theme === null || theme === void 0 ? void 0 : (_theme$fonts = theme.fonts) === null || _theme$fonts === void 0 ? void 0 : _theme$fonts.base) !== null && _theme$fonts$base !== void 0 ? _theme$fonts$base : "inherit";
  var monoFonts = (_theme$fonts$mono = theme === null || theme === void 0 ? void 0 : (_theme$fonts2 = theme.fonts) === null || _theme$fonts2 === void 0 ? void 0 : _theme$fonts2.mono) !== null && _theme$fonts$mono !== void 0 ? _theme$fonts$mono : "inherit";
  return /* @__PURE__ */ css("html{box-sizing:border-box;}*,*:before,*:after{box-sizing:inherit;}html{font-family:", baseFonts, ";}pre,code,kbd,samp{font-family:", monoFonts, ";}" + ("" ), "" );
};
var baseCSS$1 = baseCSS;

var _ref = {
  name: "1h74bwz",
  styles: 'html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0;}main{display:block;}h1{font-size:2em;margin:0.67em 0;}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace,monospace;font-size:1em;}a{background-color:transparent;}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted;}b,strong{font-weight:bolder;}code,kbd,samp{font-family:monospace,monospace;font-size:1em;}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sub{bottom:-0.25em;}sup{top:-0.5em;}img{border-style:none;}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible;}button,select{text-transform:none;}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button;}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0;}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText;}fieldset{padding:0.35em 0.75em 0.625em;}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline;}textarea{overflow:auto;}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto;}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none;}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block;}summary{display:list-item;}template{display:none;}[hidden]{display:none;}'
} ;
var normalizeCSS = function normalizeCSS2(theme) {
  return _ref;
};
var normalizeCSS$1 = normalizeCSS;

var globalStyles = function globalStyles2(theme) {
  return /* @__PURE__ */ css([normalizeCSS$1(), baseCSS$1(theme)], "" , "" );
};
var CSSBaseline = function CSSBaseline2() {
  return jsx(Global, {
    styles: globalStyles
  });
};
CSSBaseline.displayName = "CSSBaseline";
var CSSBaseline$1 = CSSBaseline;

var CSSVariables = function CSSVariables() {
  var styles = __mf_24(function (theme) {
    var rootSelector = theme === null || theme === void 0 ? void 0 : theme.rootSelector;
    var cssVariables = ensurePlainObject(theme === null || theme === void 0 ? void 0 : theme.cssVariables);
    if (!rootSelector || Object.keys(cssVariables).length === 0) {
      return {};
    }

    // Separate variable types
    var rootVariables = {}; // All original variables (includes -dark/-light and non color mode variables)
    var colorModeVariables = {}; // Track variables that need color mode switching

    // First, find all paired -dark/-light variables
    for (var _i = 0, _Object$keys = Object.keys(cssVariables); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      if (key.endsWith('-dark')) {
        var baseKey = key.slice(0, -5); // Remove '-dark'
        var lightKey = "".concat(baseKey, "-light");

        // Add to switching if corresponding -light variable exists
        if (cssVariables[lightKey]) {
          colorModeVariables[baseKey] = {
            light: lightKey,
            dark: key
          };
        }
      }
    }

    // Place variables in root (exclude base variables that need color mode switching)
    for (var _i2 = 0, _Object$entries = Object.entries(cssVariables); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray$3(_Object$entries[_i2], 2),
        _key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      // If this key is not a baseKey in colorModeVariables, put it in root
      if (!colorModeVariables[_key]) {
        rootVariables[_key] = value;
      }
    }

    // Build CSS rules
    var cssRules = _defineProperty$4({}, rootSelector, rootVariables);

    // :root [data-color-scheme="dark"] - Use -dark variables
    var darkSelector = '[data-color-scheme="dark"]';
    cssRules[darkSelector] = {};
    for (var _i3 = 0, _Object$entries2 = Object.entries(colorModeVariables); _i3 < _Object$entries2.length; _i3++) {
      var _Object$entries2$_i = _slicedToArray$3(_Object$entries2[_i3], 2),
        _baseKey = _Object$entries2$_i[0],
        variants = _Object$entries2$_i[1];
      cssRules[darkSelector][_baseKey] = "var(".concat(variants.dark, ")");
    }

    // :root [data-color-scheme="light"] - Use -light variables
    var lightSelector = '[data-color-scheme="light"]';
    cssRules[lightSelector] = {};
    for (var _i4 = 0, _Object$entries3 = Object.entries(colorModeVariables); _i4 < _Object$entries3.length; _i4++) {
      var _Object$entries3$_i = _slicedToArray$3(_Object$entries3[_i4], 2),
        _baseKey2 = _Object$entries3$_i[0],
        _variants = _Object$entries3$_i[1];
      cssRules[lightSelector][_baseKey2] = "var(".concat(_variants.light, ")");
    }
    return cssRules;
  }, []);
  return jsx(Global, {
    styles: styles
  });
};
CSSVariables.displayName = 'CSSVariables';
var CSSVariables$1 = CSSVariables;

var DefaultPropsProvider = function DefaultPropsProvider(_ref) {
  var value = _ref.value,
    children = _ref.children;
  return jsx(DefaultPropsContext.Provider, {
    value: value,
    children: children
  });
};
var DefaultPropsProvider$1 = DefaultPropsProvider;

var _getDocument = function getDocument(node) {
  var _node$ownerDocument;
  // If node is a Document, return it directly
  if ((node === null || node === void 0 ? void 0 : node.nodeType) === Node.DOCUMENT_NODE) {
    return node;
  }

  // If node is a ShadowRoot or Element, return ownerDocument
  return (_node$ownerDocument = node === null || node === void 0 ? void 0 : node.ownerDocument) !== null && _node$ownerDocument !== void 0 ? _node$ownerDocument : document;
};
var _getWindow = function getWindow(node) {
  var _doc$defaultView;
  var doc = _getDocument(node);
  return (_doc$defaultView = doc === null || doc === void 0 ? void 0 : doc.defaultView) !== null && _doc$defaultView !== void 0 ? _doc$defaultView : window;
};
var EnvironmentProvider = function EnvironmentProvider(props) {
  var value = props.value,
    children = props.children;
  var getRootNode = __mf_34(function () {
    return function () {
      var _runIfFn;
      return (_runIfFn = runIfFn(value)) !== null && _runIfFn !== void 0 ? _runIfFn : document;
    };
  }, [value]);
  var environment = __mf_34(function () {
    return {
      getRootNode: getRootNode,
      getWindow: function getWindow() {
        return _getWindow(getRootNode());
      },
      getDocument: function getDocument() {
        return _getDocument(getRootNode());
      }
    };
  }, [getRootNode]);
  return jsx(EnvironmentContext.Provider, {
    value: environment,
    children: children
  });
};
EnvironmentProvider.displayName = 'EnvironmentProvider';
var EnvironmentProvider$1 = EnvironmentProvider;

var _excluded$2 = ["direction", "wrap", "align", "justify"];
var Flex = /*#__PURE__*/__mf_16(function (inProps, ref) {
  var _useDefaultProps = useDefaultProps$1({
      props: inProps,
      name: 'Flex'
    }),
    direction = _useDefaultProps.direction,
    wrap = _useDefaultProps.wrap,
    align = _useDefaultProps.align,
    justify = _useDefaultProps.justify,
    rest = _objectWithoutProperties(_useDefaultProps, _excluded$2);
  return jsx(Box, _objectSpread2$4({
    ref: ref,
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    alignItems: align,
    justifyContent: justify
  }, rest));
});
Flex.displayName = 'Flex';
var Flex$1 = Flex;

/**
 * A symbol marker used to identify themes created with `createTheme()`.
 * ThemeProvider and TonicProvider use this to distinguish createTheme output
 * from plain objects, avoiding unnecessary re-processing.
 */
var TONIC_THEME = Symbol('tonic-theme');

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var borders$1 = {
  rem: {
    1: '.0625rem solid',
    2: '.125rem solid',
    3: '.1875rem solid',
    4: '.25rem solid',
    5: '.3125rem solid'
  },
  px: {
    1: '1px solid',
    2: '2px solid',
    3: '3px solid',
    4: '4px solid',
    5: '5px solid'
  }
};
var borders$1$1 = borders$1;

var breakpoints$1 = ['320px', '640px', '1024px', '1280px', '1680px'];
// @media screen and (min-width: 320px)
// @media screen and (min-width: 640px)
// @media screen and (min-width: 1024px)
// @media screen and (min-width: 1280px)
// @media screen and (min-width: 1680px)

// aliases
breakpoints$1.sm = breakpoints$1[0];
breakpoints$1.md = breakpoints$1[1];
breakpoints$1.lg = breakpoints$1[2];
breakpoints$1.xl = breakpoints$1[3];
breakpoints$1['2xl'] = breakpoints$1[4];
var breakpoints$1$1 = breakpoints$1;

var colors$2 = {
  transparent: 'transparent',
  current: 'currentColor',
  'red:100': '#6e0002',
  'red:90': '#9d0003',
  'red:80': '#b80003',
  'red:70': '#d71920',
  'red:60': '#e52630',
  'red:50': '#f24c4f',
  'red:40': '#f46f71',
  'red:30': '#fd999a',
  'red:20': '#fcc3c4',
  'red:10': '#fee1e2',
  'magenta:100': '#750037',
  'magenta:90': '#960043',
  'magenta:80': '#b3004c',
  'magenta:70': '#ca0455',
  'magenta:60': '#dc1d68',
  'magenta:50': '#e94181',
  'magenta:40': '#f36fa0',
  'magenta:30': '#f9a0c1',
  'magenta:20': '#fcc3d8',
  'magenta:10': '#fee1ec',
  'purple:100': '#460086',
  'purple:90': '#5300a5',
  'purple:80': '#6304ca',
  'purple:70': '#771ddc',
  'purple:60': '#8f41e9',
  'purple:50': '#ab6ff3',
  'purple:40': '#bb89f6',
  'purple:30': '#cca6f9',
  'purple:20': '#ddc3fc',
  'purple:10': '#eee1fe',
  'blue:100': '#002a7e',
  'blue:90': '#00349d',
  'blue:80': '#003db8',
  'blue:70': '#0547cd',
  'blue:60': '#1e5ede',
  'blue:50': '#578aef',
  'blue:40': '#6f9bf4',
  'blue:30': '#95b7fc',
  'blue:20': '#c3d6fc',
  'blue:10': '#e1ebfe',
  'green:100': '#003011',
  'green:90': '#00461a',
  'green:80': '#005c24',
  'green:70': '#00712e',
  'green:60': '#008539',
  'green:50': '#00a94f',
  'green:40': '#04c45a',
  'green:30': '#40e884',
  'green:20': '#89f6b2',
  'green:10': '#c3fcd8',
  'teal:100': '#004034',
  'teal:90': '#005242',
  'teal:80': '#006451',
  'teal:70': '#00755f',
  'teal:60': '#00866c',
  'teal:50': '#00a584',
  'teal:40': '#04caa1',
  'teal:30': '#41e9c5',
  'teal:20': '#89f6df',
  'teal:10': '#c3fcf0',
  'cyan:100': '#003664',
  'cyan:90': '#004575',
  'cyan:80': '#005486',
  'cyan:70': '#006496',
  'cyan:60': '#0075a5',
  'cyan:50': '#0095bf',
  'cyan:40': '#10b4d3',
  'cyan:30': '#41d8e9',
  'cyan:20': '#89f0f6',
  'cyan:10': '#c3f9fc',
  'gray:100': '#151515',
  'gray:90': '#212121',
  'gray:80': '#303030',
  'gray:70': '#424242',
  'gray:60': '#5e5e5e',
  'gray:50': '#8a8a8a',
  'gray:40': '#adadad',
  'gray:30': '#c9c9c9',
  'gray:20': '#e0e0e0',
  'gray:10': '#f2f2f2',
  'orange:50': '#ff7633',
  'yellow:50': '#faba2a',
  'white:emphasis': 'rgba(255, 255, 255, 1.0)',
  'white:primary': 'rgba(255, 255, 255, .92)',
  'white:secondary': 'rgba(255, 255, 255, .60)',
  'white:tertiary': 'rgba(255, 255, 255, .47)',
  'white:disabled': 'rgba(255, 255, 255, .28)',
  'black:emphasis': 'rgba(0, 0, 0, 1.0)',
  'black:primary': 'rgba(0, 0, 0, .92)',
  'black:secondary': 'rgba(0, 0, 0, .65)',
  'black:tertiary': 'rgba(0, 0, 0, .54)',
  'black:disabled': 'rgba(0, 0, 0, .30)'
};
var colors$1$1 = colors$2;

/**
 * A generic font family should be the last item in the list of font family names:
 * - serif
 * - sans-serif
 * - monospace
 * - cursive
 * - fantasy
 * - system-ui
 * - math
 * - emoji
 * - fangsong
 */
var fonts$1 = {
  base: '"Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"Segoe UI Mono", "SFMono-Medium", "SF Mono", Menlo, Consolas, Courier, monospace'
};
var fonts$1$1 = fonts$1;

var fontSizes$1 = {
  rem: {
    xs: '.75rem',
    sm: '.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem'
  },
  px: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px'
  }
};
var fontSizes$1$1 = fontSizes$1;

var fontWeights$1 = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};
var fontWeights$1$1 = fontWeights$1;

var lineHeights$1 = {
  rem: {
    normal: 'normal',
    base: '1.5',
    xs: '1.125rem',
    sm: '1.25rem',
    md: '1.375rem',
    lg: '1.5rem',
    xl: '1.75rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem'
  },
  px: {
    normal: 'normal',
    base: '1.5',
    xs: '18px',
    sm: '20px',
    md: '22px',
    lg: '24px',
    xl: '28px',
    '2xl': '32px',
    '3xl': '36px',
    '4xl': '40px'
  }
};
var lineHeights$1$1 = lineHeights$1;

var outlines$1 = {
  rem: {
    1: '.0625rem solid',
    2: '.125rem solid',
    3: '.1875rem solid',
    4: '.25rem solid',
    5: '.3125rem solid'
  },
  px: {
    1: '1px solid',
    2: '2px solid',
    3: '3px solid',
    4: '4px solid',
    5: '5px solid'
  }
};
var outlines$1$1 = outlines$1;

var radii$1 = {
  rem: {
    circle: '50%',
    none: 0,
    sm: '0.1875rem',
    md: '0.375rem',
    lg: '0.75rem'
  },
  px: {
    circle: '50%',
    none: 0,
    sm: '3px',
    md: '6px',
    lg: '12px'
  }
};
var radii$1$1 = radii$1;

var shadows$1 = {
  none: 'none'
};
var shadows$1$1 = shadows$1;

var definition = {
  px: {
    quarter: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      notation: 'q',
      value: 1
    },
    half: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      notation: 'h',
      value: 2
    },
    whole: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 32, 40, 48, 56, 64],
      notation: 'x',
      value: 4
    }
  },
  rem: {
    quarter: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      notation: 'q',
      value: 0.0625
    },
    half: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      notation: 'h',
      value: 0.125
    },
    whole: {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 32, 40, 48, 56, 64],
      notation: 'x',
      value: 0.25
    }
  }
};
var getUnitTokens = function getUnitTokens(unit) {
  var _px$rem$unit;
  var config = (_px$rem$unit = {
    'px': definition.px,
    'rem': definition.rem
  }[unit]) !== null && _px$rem$unit !== void 0 ? _px$rem$unit : {};
  var accumulatedResult = {};
  Object.keys(config).forEach(function (key) {
    var _config$key = _objectSpread2({}, config[key]),
      list = _config$key.list,
      notation = _config$key.notation,
      value = _config$key.value;
    var reducer = function reducer(acc, n) {
      var k = "".concat(n).concat(notation);
      var v = "".concat(value * n).concat(unit).replace(/^0+/, ''); // omitting leading '0's
      acc[k] = v;
      return acc;
    };
    var initialValue = {};
    accumulatedResult = _objectSpread2(_objectSpread2({}, accumulatedResult), list.reduce(reducer, initialValue));
  });
  return accumulatedResult;
};
var getUnitTokens$1 = getUnitTokens;

var sizes$1 = {
  rem: getUnitTokens$1('rem'),
  px: getUnitTokens$1('px')
};
var sizes$1$1 = sizes$1;

var space$1 = {
  rem: getUnitTokens$1('rem'),
  px: getUnitTokens$1('px')
};
var space$1$1 = space$1;

var zIndices$1 = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  drawer: 1400,
  modal: 1500,
  popover: 1600,
  toast: 1700,
  tooltip: 1800
};
var zIndices$1$1 = zIndices$1;

var createTheme$4 = function createTheme(unit) {
  return {
    borders: borders$1$1[unit],
    breakpoints: breakpoints$1$1,
    colors: colors$1$1,
    fonts: fonts$1$1,
    fontSizes: fontSizes$1$1[unit],
    fontWeights: fontWeights$1$1,
    lineHeights: lineHeights$1$1[unit],
    outlines: outlines$1$1[unit],
    radii: radii$1$1[unit],
    shadows: shadows$1$1,
    sizes: sizes$1$1[unit],
    space: space$1$1[unit],
    zIndices: zIndices$1$1
  };
};
var createV2Theme = createTheme$4;

var borders = {
  rem: {
    '0.5': '0.0313rem solid',
    1: '0.0625rem solid',
    '1.5': '0.0938rem solid',
    2: '0.125rem solid',
    3: '0.1875rem solid',
    4: '0.25rem solid',
    5: '0.3125rem solid',
    6: '0.375rem solid',
    7: '0.4375rem solid',
    8: '0.5rem solid',
    9: '0.5625rem solid',
    10: '0.625rem solid'
  },
  px: {
    '0.5': '0.5px solid',
    1: '1px solid',
    '1.5': '1.5px solid',
    2: '2px solid',
    3: '3px solid',
    4: '4px solid',
    5: '5px solid',
    6: '6px solid',
    7: '7px solid',
    8: '8px solid',
    9: '9px solid',
    10: '10px solid'
  }
};

var breakpoints = ['320px', '744px', '1440px', '1680px', '1920px'];

// aliases
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
breakpoints['2xl'] = breakpoints[4];

var colors$1 = {
  transparent: 'transparent',
  current: 'currentColor',
  red: {
    100: '#ffe4e1',
    200: '#fed2cd',
    300: '#feaea7',
    400: '#ff847d',
    500: '#fe4648',
    550: '#e32631',
    600: {
      main: '#dd1128',
      lighten: {
        80: '#e02439',
        160: '#e2374a',
        240: '#e54a5c',
        320: '#e85d6d',
        400: '#eb707e'
      },
      darken: {
        80: '#cf1025',
        160: '#c20f22',
        240: '#b40d1f',
        320: '#a70c1c',
        400: '#990b1a'
      }
    },
    650: {
      main: '#c70721',
      lighten: {
        80: '#cb1b33',
        160: '#d02f45',
        240: '#d44356',
        320: '#d95668',
        400: '#dd6a7a'
      },
      darken: {
        80: '#bb071f',
        160: '#af061c',
        240: '#a4061a',
        320: '#980518',
        400: '#8c0515'
      }
    },
    700: {
      main: '#a9071b',
      lighten: {
        80: '#b01b2d',
        160: '#b72f3f',
        240: '#be4352',
        320: '#c55664',
        400: '#cb6a76'
      },
      darken: {
        80: '#a00719',
        160: '#960617',
        240: '#8d0615',
        320: '#840514',
        400: '#7a0512'
      }
    },
    800: '#790410',
    900: '#530309',
    1000: '#340204'
  },
  magenta: {
    100: '#fde3eb',
    200: '#fed0dd',
    300: '#fea9c3',
    400: '#fe83ad',
    500: '#fe3b8f',
    550: '#e40378',
    600: '#d70371',
    650: '#bd0d63',
    700: '#a30755',
    800: '#74033b',
    900: '#4f0327',
    1000: '#310417'
  },
  orange: {
    100: '#fce2d3',
    150: '#fed9c4',
    200: '#fed2b9',
    250: '#fec4a3',
    300: '#feb073',
    350: '#fba156',
    400: '#fe8b3f',
    450: '#f67915',
    500: '#df6b05',
    550: '#bd5a06',
    600: '#a54e05',
    650: '#94480f',
    700: '#84400d',
    800: '#5f2b03',
    900: '#421b01',
    1000: '#290f01'
  },
  yellow: {
    100: '#feecbc',
    150: '#fce190',
    200: '#fdd76f',
    250: '#f5c847',
    300: '#eebd10',
    350: '#dcb319',
    400: '#cfa609',
    500: '#aa8804',
    550: '#907202',
    600: '#7f6401',
    700: '#65500b',
    800: '#493802',
    900: '#312500',
    1000: '#1d1500'
  },
  green: {
    100: '#d4f8d8',
    200: '#aeebb6',
    300: '#7fd78d',
    400: '#48bf63',
    500: '#1fa246',
    550: '#0d8937',
    600: '#078032',
    650: '#1b6b30',
    700: '#096025',
    800: '#094319',
    900: '#072c10',
    1000: '#051a09'
  },
  blue: {
    100: '#e2ecfd',
    200: '#cbddfe',
    300: '#a6c5fc',
    400: '#7aa8fe',
    500: '#4c88fc',
    550: '#266cf8',
    600: {
      main: '#1362fc',
      lighten: {
        80: '#266ffc',
        160: '#397bfc',
        240: '#4c88fd',
        320: '#5f94fd',
        400: '#71a1fd'
      },
      darken: {
        80: '#115ced',
        160: '#1055de',
        240: '#0e4fcf',
        320: '#0d48c0',
        400: '#0b42b1'
      }
    },
    650: {
      main: '#0150e1',
      lighten: {
        80: '#155ee3',
        160: '#2a6ce6',
        240: '#3e7ae8',
        320: '#5288eb',
        400: '#6796ed'
      },
      darken: {
        80: '#014bd4',
        160: '#0146c7',
        240: '#0141bb',
        320: '#013cae',
        400: '#0137a1'
      }
    },
    700: '#0548c6',
    800: '#013090',
    900: '#011f63',
    1000: '#001141'
  },
  teal: {
    100: '#c9fff7',
    200: '#a4e9df',
    300: '#6bd4c8',
    400: '#33bcae',
    500: '#099e91',
    550: '#10857a',
    600: '#107c73',
    700: '#035d55',
    800: '#0a413c',
    900: '#022c28',
    1000: '#061916'
  },
  cyan: {
    100: '#dff2fd',
    200: '#c0e7fc',
    300: '#72cdfd',
    400: '#3bb3ea',
    500: '#1c96ca',
    550: '#137faa',
    600: '#0277a2',
    650: '#086a91',
    700: '#025a7c',
    800: '#0b3e55',
    900: '#012a3d',
    1000: '#011925'
  },
  purple: {
    100: '#ece8fe',
    200: '#dbd2fd',
    300: {
      main: '#c9bbfb',
      lighten: {
        80: '#cdc0fb',
        160: '#d2c6fc',
        240: '#d6cbfc',
        320: '#dad1fc',
        400: '#dfd6fd'
      },
      darken: {
        80: '#bbaced',
        160: '#ae9dde',
        240: '#b4a4e5',
        320: '#937fc1',
        400: '#8571b3'
      }
    },
    400: '#b398fe',
    500: '#9e71fd',
    550: '#8d4efe',
    600: {
      main: '#883ff9',
      lighten: {
        80: '#8c45f9',
        160: '#904bf9',
        240: '#9351fa',
        320: '#9758fa',
        400: '#9b5efa'
      },
      darken: {
        80: '#803aeb',
        160: '#7735dd',
        240: '#6f30ce',
        320: '#672bc0',
        400: '#5e26b2'
      }
    },
    650: {
      main: '#772bdf',
      lighten: {
        80: '#823ce2',
        160: '#8d4de4',
        240: '#985ee7',
        320: '#a36fe9',
        400: '#ad80ec'
      },
      darken: {
        80: '#6d28cd',
        160: '#6424bb',
        240: '#5a21a9',
        320: '#511d98',
        400: '#471a86'
      }
    },
    700: '#6b23ca',
    800: '#4c1494',
    900: '#35076c',
    1000: '#200147'
  },
  gray: {
    100: '#ffffff',
    200: '#e1e1e1',
    250: {
      main: '#cfcfcf',
      lighten: {
        80: '#d3d3d3',
        160: '#d7d7d7',
        240: '#dbdbdb',
        320: '#dedede',
        400: '#e2e2e2'
      },
      darken: {
        80: '#bebebe',
        160: '#aeaeae',
        240: '#9d9d9d',
        320: '#8d8d8d',
        400: '#7c7c7c'
      }
    },
    300: '#c2c2c2',
    350: '#b6b6b6',
    400: '#a9a9a9',
    500: '#8c8c8c',
    550: '#767676',
    600: '#6f6f6f',
    650: '#5f5f5f',
    700: {
      main: '#525252',
      lighten: {
        80: '#606060',
        160: '#6e6e6e',
        240: '#7c7c7c',
        320: '#898989',
        400: '#979797'
      },
      darken: {
        80: '#4b4b4b',
        160: '#454545',
        240: '#3e3e3e',
        320: '#383838',
        400: '#313131'
      }
    },
    800: {
      main: '#393939',
      lighten: {
        80: '#494949',
        160: '#595959',
        240: '#696969',
        320: '#787878',
        400: '#888888'
      },
      darken: {
        80: '#343434',
        160: '#303030',
        240: '#2e2e2e',
        320: '#272727',
        400: '#222222'
      }
    },
    900: '#262626',
    1000: '#000000'
  },
  white: {
    100: '#ffffff',
    150: '#fcfcfc',
    200: '#f8f8f8',
    250: '#f5f5f5',
    300: '#f2f2f2',
    350: '#eeeeee',
    400: '#ebebeb',
    450: '#e8e8e8',
    500: '#e4e4e4',
    550: '#e1e1e1',
    600: '#dedede'
  },
  black: {
    100: '#2e2e2e',
    150: '#292929',
    200: '#242424',
    250: '#1f1f1f',
    300: '#1b1b1b',
    350: '#161616',
    400: '#121212',
    450: '#0d0d0d',
    500: '#070707',
    550: '#030303',
    600: '#000000'
  }
};

var fonts = {
  base: 'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"DM Mono", "SFMono-Medium", "SF Mono", Menlo, Consolas, Courier, monospace'
};

var fontSizes = {
  rem: {
    xs: '.75rem',
    sm: '.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem'
  },
  px: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px'
  }
};

var fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
};

var lineHeights = {
  rem: {
    normal: 'normal',
    base: '1.5',
    xs: '1.125rem',
    sm: '1.25rem',
    md: '1.375rem',
    lg: '1.5rem',
    xl: '1.75rem',
    '2xl': '2rem',
    '3xl': '2.25rem',
    '4xl': '2.5rem'
  },
  px: {
    normal: 'normal',
    base: '1.5',
    xs: '18px',
    sm: '20px',
    md: '22px',
    lg: '24px',
    xl: '28px',
    '2xl': '32px',
    '3xl': '36px',
    '4xl': '40px'
  }
};

var outlines = {
  rem: {
    1: '0.0625rem solid',
    2: '0.125rem solid',
    3: '0.1875rem solid',
    4: '0.25rem solid',
    5: '0.3125rem solid'
  },
  px: {
    1: '1px solid',
    2: '2px solid',
    3: '3px solid',
    4: '4px solid',
    5: '5px solid'
  }
};

var radii = {
  rem: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem'
  },
  px: {
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px'
  }
};

var sizes = {
  rem: getUnitTokens$1('rem'),
  px: getUnitTokens$1('px')
};

var space = {
  rem: getUnitTokens$1('rem'),
  px: getUnitTokens$1('px')
};

var zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  drawer: 1400,
  modal: 1500,
  popover: 1600,
  toast: 1700,
  tooltip: 1800
};

var createPrimitiveTokens = function createPrimitiveTokens(unit) {
  return {
    borders: borders[unit],
    breakpoints: breakpoints,
    colors: colors$1,
    fonts: fonts,
    fontSizes: fontSizes[unit],
    fontWeights: fontWeights,
    lineHeights: lineHeights[unit],
    outlines: outlines[unit],
    radii: radii[unit],
    sizes: sizes[unit],
    space: space[unit],
    zIndices: zIndices
  };
};

var actions = {
  enabled: {
    _dark: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)'
  },
  hovered: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.600} 8%, transparent)'
  },
  active: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)'
  },
  selected: {
    _dark: 'color-mix(in srgb, {colors.blue.500} 12%, transparent)',
    _light: 'color-mix(in srgb, {colors.blue.600} 8%, transparent)'
  },
  selectedHovered: {
    _dark: 'color-mix(in srgb, {colors.blue.500} 20%, transparent)',
    _light: 'color-mix(in srgb, {colors.blue.650} 16%, transparent)'
  },
  disabled: {
    _dark: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)'
  },
  dragged: {
    _dark: 'color-mix(in srgb, {colors.blue.600} 16%, transparent)',
    _light: 'color-mix(in srgb, {colors.blue.600} 12%, transparent)'
  },
  current: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)'
  },
  _fixed: {
    dark: {
      enabled: {
        _dark: '{actions.enabled}',
        _light: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)'
      },
      hovered: {
        _dark: '{actions.hovered}',
        _light: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)'
      },
      active: {
        _dark: '{actions.active}',
        _light: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)'
      },
      disabled: {
        _dark: '{actions.disabled}',
        _light: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)'
      },
      selected: {
        _dark: '{actions.selected}',
        _light: 'color-mix(in srgb, {colors.blue.800} 32%, transparent)'
      },
      selectedHovered: {
        _dark: '{actions.selectedHovered}',
        _light: 'color-mix(in srgb, {colors.blue.500} 16%, transparent)'
      },
      current: {
        _dark: '{actions.current}',
        _light: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)'
      },
      dragged: {
        _dark: '{actions.dragged}',
        _light: 'color-mix(in srgb, {colors.blue.600} 16%, transparent)'
      }
    },
    light: {
      enabled: {
        _dark: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)',
        _light: '{actions.enabled}'
      },
      hovered: {
        _dark: 'color-mix(in srgb, {colors.gray.600} 8%, transparent)',
        _light: '{actions.hovered}'
      },
      active: {
        _dark: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)',
        _light: '{actions.active}'
      },
      disabled: {
        _dark: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)',
        _light: '{actions.disabled}'
      },
      selected: {
        _dark: 'color-mix(in srgb, {colors.blue.500} 12%, transparent)',
        _light: '{actions.selected}'
      },
      selectedHovered: {
        _dark: 'color-mix(in srgb, {colors.blue.500} 20%, transparent)',
        _light: '{actions.selectedHovered}'
      },
      current: {
        _dark: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)',
        _light: '{actions.current}'
      },
      dragged: {
        _dark: 'color-mix(in srgb, {colors.blue.600} 12%, transparent)',
        _light: '{actions.dragged}'
      }
    }
  },
  _inverse: {
    enabled: {
      _dark: '{actions._fixed.light.enabled}',
      _light: '{actions._fixed.dark.enabled}'
    },
    hovered: {
      _dark: '{actions._fixed.light.hovered}',
      _light: '{actions._fixed.dark.hovered}'
    },
    active: {
      _dark: '{actions._fixed.light.active}',
      _light: '{actions._fixed.dark.active}'
    },
    disabled: {
      _dark: '{actions._fixed.light.disabled}',
      _light: '{actions._fixed.dark.disabled}'
    },
    selected: {
      _dark: '{actions._fixed.light.selected}',
      _light: '{actions._fixed.dark.selected}'
    },
    selectedHovered: {
      _dark: '{actions._fixed.light.selectedHovered}',
      _light: '{actions._fixed.dark.selectedHovered}'
    },
    current: {
      _dark: '{actions._fixed.light.current}',
      _light: '{actions._fixed.dark.current}'
    },
    dragged: {
      _dark: '{actions._fixed.light.dragged}',
      _light: '{actions._fixed.dark.dragged}'
    }
  }
};

var background = {
  highest: {
    _dark: '{black.300}',
    _light: '{white.150}'
  },
  high: {
    _dark: '{black.350}',
    _light: '{white.200}'
  },
  medium: {
    _dark: '{black.400}',
    _light: '{white.250}'
  },
  low: {
    _dark: '{black.500}',
    _light: '{white.350}'
  },
  _fixed: {
    dark: {
      highest: {
        _dark: '{background.highest}',
        _light: '{black.300}'
      },
      high: {
        _dark: '{background.high}',
        _light: '{black.350}'
      },
      medium: {
        _dark: '{background.medium}',
        _light: '{black.400}'
      },
      low: {
        _dark: '{background.low}',
        _light: '{black.500}'
      }
    },
    light: {
      highest: {
        _dark: '{white.150}',
        _light: '{background.highest}'
      },
      high: {
        _dark: '{white.200}',
        _light: '{background.high}'
      },
      medium: {
        _dark: '{white.250}',
        _light: '{background.medium}'
      },
      low: {
        _dark: '{white.350}',
        _light: '{background.low}'
      }
    }
  },
  _inverse: {
    highest: {
      _dark: '{background._fixed.light.highest}',
      _light: '{background._fixed.dark.highest}'
    },
    high: {
      _dark: '{background._fixed.light.high}',
      _light: '{background._fixed.dark.high}'
    },
    medium: {
      _dark: '{background._fixed.light.medium}',
      _light: '{background._fixed.dark.medium}'
    },
    low: {
      _dark: '{background._fixed.light.low}',
      _light: '{background._fixed.dark.low}'
    }
  }
};

var border = {
  accent: {
    _dark: '{gray.100}',
    _light: '{gray.1000}'
  },
  primary: {
    _dark: '{gray.400}',
    _light: '{gray.700}'
  },
  secondary: {
    _dark: '{gray.700}',
    _light: '{gray.400}'
  },
  tertiary: {
    _dark: '{gray.800}',
    _light: '{gray.250}'
  },
  subtle: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 12%, transparent)'
  },
  _primary: {
    enabled: {
      _dark: '{gray.600}',
      _light: '{gray.400}'
    },
    hovered: {
      _dark: '{blue.500}',
      _light: '{blue.500}'
    },
    active: {
      _dark: '{blue.600}',
      _light: '{blue.600}'
    },
    focused: {
      _dark: '{blue.600}',
      _light: '{blue.600}'
    },
    selected: {
      _dark: '{_foreground.primaryVariant.selected}',
      _light: '{_foreground.primaryVariant.selected}'
    },
    selectedHovered: {
      _dark: '{_foreground.primaryVariant.selectedHovered}',
      _light: '{_foreground.primaryVariant.selectedHovered}'
    },
    selectedDisabled: {
      _dark: '{_foreground.primaryVariant.selectedDisabled}',
      _light: '{_foreground.primaryVariant.selectedDisabled}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  },
  _negative: {
    enabled: {
      _dark: '{_foreground.negative.enabled}',
      _light: '{_foreground.negative.enabled}'
    },
    hovered: {
      _dark: '{_foreground.negative.hovered}',
      _light: '{_foreground.negative.hovered}'
    },
    active: {
      _dark: '{_foreground.negative.active}',
      _light: '{_foreground.negative.active}'
    },
    disabled: {
      _dark: '{_foreground.negative.disabled}',
      _light: '{_foreground.negative.disabled}'
    }
  },
  _promotion: {
    enabled: {
      _dark: '{_foreground.promotion.enabled}',
      _light: '{_foreground.promotion.enabled}'
    },
    hovered: {
      _dark: '{_foreground.promotion.hovered}',
      _light: '{_foreground.promotion.hovered}'
    },
    active: {
      _dark: '{_foreground.promotion.active}',
      _light: '{_foreground.promotion.active}'
    },
    disabled: {
      _dark: '{_foreground.promotion.disabled}',
      _light: '{_foreground.promotion.disabled}'
    }
  },
  _fixed: {
    dark: {
      accent: {
        _dark: '{border.accent}',
        _light: '{gray.100}'
      },
      primary: {
        _dark: '{border.primary}',
        _light: '{gray.400}'
      },
      secondary: {
        _dark: '{border.secondary}',
        _light: '{gray.700}'
      },
      tertiary: {
        _dark: '{border.tertiary}',
        _light: '{gray.800}'
      },
      subtle: {
        _dark: '{border.subtle}',
        _light: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)'
      }
    },
    light: {
      accent: {
        _dark: '{gray.1000}',
        _light: '{border.accent}'
      },
      primary: {
        _dark: '{gray.700}',
        _light: '{border.primary}'
      },
      secondary: {
        _dark: '{gray.400}',
        _light: '{border.secondary}'
      },
      tertiary: {
        _dark: '{gray.250}',
        _light: '{border.tertiary}'
      },
      subtle: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 12%, transparent)',
        _light: '{border.subtle}'
      }
    }
  },
  _inverse: {
    accent: {
      _dark: '{border._fixed.light.accent}',
      _light: '{border._fixed.dark.accent}'
    },
    primary: {
      _dark: '{border._fixed.light.primary}',
      _light: '{border._fixed.dark.primary}'
    },
    secondary: {
      _dark: '{border._fixed.light.secondary}',
      _light: '{border._fixed.dark.secondary}'
    },
    tertiary: {
      _dark: '{border._fixed.light.tertiary}',
      _light: '{border._fixed.dark.tertiary}'
    },
    subtle: {
      _dark: '{border._fixed.light.subtle}',
      _light: '{border._fixed.dark.subtle}'
    }
  }
};

var error = {
  text: {
    _dark: '{red.500}',
    _light: '{red.700}'
  },
  icon: {
    _dark: '{red.550}',
    _light: '{red.550}'
  },
  border: {
    _dark: '{red.550}',
    _light: '{red.550}'
  },
  _overlay: {
    _dark: 'color-mix(in srgb, {colors.red.700} 24%, transparent)',
    _light: 'color-mix(in srgb, {colors.red.300} 24%, transparent)'
  },
  _onOverlay: {
    text: {
      _dark: '{red.400}',
      _light: '{red.700}'
    },
    icon: {
      _dark: '{red.400}',
      _light: '{red.700}'
    }
  }
};

var info = {
  icon: {
    _dark: '{blue.500}',
    _light: '{blue.650}'
  },
  border: {
    _dark: '{blue.500}',
    _light: '{blue.650}'
  },
  _overlay: {
    _dark: 'color-mix(in srgb, {colors.blue.600} 20%, transparent)',
    _light: 'color-mix(in srgb, {colors.blue.200} 40%, transparent)'
  },
  _onOverlay: {
    text: {
      _dark: '{blue.200}',
      _light: '{blue.700}'
    },
    icon: {
      _dark: '{blue.200}',
      _light: '{blue.700}'
    }
  }
};

var minorWarning = {
  icon: {
    _dark: '{yellow.200}',
    _light: '{yellow.550}'
  },
  border: {
    _dark: '{yellow.200}',
    _light: '{yellow.550}'
  },
  _overlay: {
    _dark: 'color-mix(in srgb, {colors.yellow.400} 16%, transparent)',
    _light: 'color-mix(in srgb, {colors.yellow.200} 24%, transparent)'
  },
  _onOverlay: {
    text: {
      _dark: '{yellow.100}',
      _light: '{yellow.700}'
    },
    icon: {
      _dark: '{yellow.100}',
      _light: '{yellow.700}'
    }
  }
};

var neutral = {
  icon: {
    _dark: '{gray.350}',
    _light: '{gray.600}'
  },
  border: {
    _dark: '{gray.350}',
    _light: '{gray.600}'
  },
  _overlay: {
    _dark: 'color-mix(in srgb, {colors.gray.600} 24%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.300} 28%, transparent)'
  },
  _onOverlay: {
    text: {
      _dark: '{gray.200}',
      _light: '{gray.700}'
    },
    icon: {
      _dark: '{gray.200}',
      _light: '{gray.700}'
    }
  }
};

var promotion = {
  icon: {
    _dark: '{purple.400}',
    _light: '{purple.650}'
  },
  border: {
    _dark: '{purple.400}',
    _light: '{purple.650}'
  },
  _overlay: {
    _dark: 'color-mix(in srgb, {colors.purple.600} 24%, transparent)',
    _light: 'color-mix(in srgb, {colors.purple.600} 12%, transparent)'
  }
};

var riskLevel = {
  high: {
    text: {
      _dark: '{red.500}',
      _light: '{red.700}'
    },
    chart: {
      _dark: '{red.550}',
      _light: '{red.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.red.600} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.red.300} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{red.200}',
        _light: '{red.700}'
      }
    },
    _gradient: {
      opaque: {
        _dark: '{alert.riskLevel.high.chart}',
        _light: '{alert.riskLevel.high.chart}'
      },
      none: {
        _dark: 'color-mix(in srgb, {colors.red.550} 0%, transparent)',
        _light: 'color-mix(in srgb, {colors.red.550} 0%, transparent)'
      }
    }
  },
  medium: {
    text: {
      _dark: '{yellow.200}',
      _light: '{yellow.600}'
    },
    chart: {
      _dark: '{yellow.200}',
      _light: '{yellow.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.yellow.400} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.yellow.200} 24%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{yellow.100}',
        _light: '{yellow.600}'
      }
    },
    _gradient: {
      opaque: {
        _dark: '{alert.riskLevel.medium.chart}',
        _light: '{alert.riskLevel.medium.chart}'
      },
      none: {
        _dark: 'color-mix(in srgb, {colors.yellow.200} 0%, transparent)',
        _light: 'color-mix(in srgb, {colors.yellow.500} 0%, transparent)'
      }
    }
  },
  low: {
    text: {
      _dark: '{green.400}',
      _light: '{green.650}'
    },
    chart: {
      _dark: '{green.400}',
      _light: '{green.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.green.500} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.green.200} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{green.100}',
        _light: '{green.700}'
      }
    },
    _gradient: {
      opaque: {
        _dark: '{alert.riskLevel.low.chart}',
        _light: '{alert.riskLevel.low.chart}'
      },
      none: {
        _dark: 'color-mix(in srgb, {colors.green.400} 0%, transparent)',
        _light: 'color-mix(in srgb, {colors.green.500} 0%, transparent)'
      }
    }
  },
  uta: {
    text: {
      _dark: '{gray.350}',
      _light: '{gray.650}'
    },
    chart: {
      _dark: '{gray.350}',
      _light: '{gray.600}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.gray.700} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.300} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{gray.300}',
        _light: '{gray.700}'
      }
    }
  }
};
var severity = {
  critical: {
    text: {
      _dark: '{magenta.400}',
      _light: '{magenta.650}'
    },
    chart: {
      _dark: '{magenta.400}',
      _light: '{magenta.650}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.magenta.600} 32%, transparent)',
      _light: 'color-mix(in srgb, {colors.magenta.400} 28%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{magenta.200}',
        _light: '{magenta.700}'
      }
    }
  },
  high: {
    text: {
      _dark: '{red.500}',
      _light: '{red.700}'
    },
    chart: {
      _dark: '{red.550}',
      _light: '{red.600}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.red.600} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.red.300} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{red.200}',
        _light: '{red.700}'
      }
    }
  },
  medium: {
    text: {
      _dark: '{orange.400}',
      _light: '{orange.600}'
    },
    chart: {
      _dark: '{orange.400}',
      _light: '{orange.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.orange.500} 40%, transparent)',
      _light: 'color-mix(in srgb, {colors.orange.300} 20%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{orange.100}',
        _light: '{orange.600}'
      }
    }
  },
  low: {
    text: {
      _dark: '{yellow.200}',
      _light: '{yellow.600}'
    },
    chart: {
      _dark: '{yellow.200}',
      _light: '{yellow.550}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.yellow.300} 24%, transparent)',
      _light: 'color-mix(in srgb, {colors.yellow.100} 72%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{yellow.100}',
        _light: '{yellow.600}'
      }
    }
  },
  informational: {
    text: {
      _dark: '{gray.350}',
      _light: '{gray.650}'
    },
    chart: {
      _dark: '{gray.350}',
      _light: '{gray.600}'
    },
    _overlay: {
      _dark: 'color-mix(in srgb, {colors.gray.700} 40%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.300} 40%, transparent)'
    },
    _onOverlay: {
      text: {
        _dark: '{gray.300}',
        _light: '{gray.700}'
      }
    }
  }
};

var success = {
  icon: {
    _dark: '{green.400}',
    _light: '{green.550}'
  },
  border: {
    _dark: '{green.400}',
    _light: '{green.550}'
  },
  _overlay: {
    _dark: 'color-mix(in srgb, {colors.green.600} 24%, transparent)',
    _light: 'color-mix(in srgb, {colors.green.200} 24%, transparent)'
  },
  _onOverlay: {
    text: {
      _dark: '{green.300}',
      _light: '{green.650}'
    },
    icon: {
      _dark: '{green.300}',
      _light: '{green.650}'
    }
  }
};

var text = {
  accent: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 96%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 96%, transparent)'
  },
  primary: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 80%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 80%, transparent)'
  },
  secondary: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 64%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 64%, transparent)'
  },
  tertiary: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 56%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 56%, transparent)'
  },
  disabled: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 24%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 24%, transparent)'
  },
  _fixed: {
    dark: {
      accent: {
        _dark: '{text.accent}',
        _light: 'color-mix(in srgb, {colors.gray.100} 96%, transparent)'
      },
      primary: {
        _dark: '{text.primary}',
        _light: 'color-mix(in srgb, {colors.gray.100} 80%, transparent)'
      },
      secondary: {
        _dark: '{text.secondary}',
        _light: 'color-mix(in srgb, {colors.gray.100} 64%, transparent)'
      },
      tertiary: {
        _dark: '{text.tertiary}',
        _light: 'color-mix(in srgb, {colors.gray.100} 56%, transparent)'
      },
      disabled: {
        _dark: '{text.disabled}',
        _light: 'color-mix(in srgb, {colors.gray.100} 24%, transparent)'
      }
    },
    light: {
      accent: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 96%, transparent)',
        _light: '{text.accent}'
      },
      primary: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 80%, transparent)',
        _light: '{text.primary}'
      },
      secondary: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 64%, transparent)',
        _light: '{text.secondary}'
      },
      tertiary: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 56%, transparent)',
        _light: '{text.tertiary}'
      },
      disabled: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 24%, transparent)',
        _light: '{text.disabled}'
      }
    }
  },
  _inverse: {
    accent: {
      _dark: '{text._fixed.light.accent}',
      _light: '{text._fixed.dark.accent}'
    },
    primary: {
      _dark: '{text._fixed.light.primary}',
      _light: '{text._fixed.dark.primary}'
    },
    secondary: {
      _dark: '{text._fixed.light.secondary}',
      _light: '{text._fixed.dark.secondary}'
    },
    tertiary: {
      _dark: '{text._fixed.light.tertiary}',
      _light: '{text._fixed.dark.tertiary}'
    },
    disabled: {
      _dark: '{text._fixed.light.disabled}',
      _light: '{text._fixed.dark.disabled}'
    }
  }
};

var warning = {
  icon: {
    _dark: '{orange.400}',
    _light: '{orange.550}'
  },
  border: {
    _dark: '{orange.400}',
    _light: '{orange.550}'
  },
  _overlay: {
    _dark: 'color-mix(in srgb, {colors.orange.400} 16%, transparent)',
    _light: 'color-mix(in srgb, {colors.orange.300} 20%, transparent)'
  },
  _onOverlay: {
    text: {
      _dark: '{orange.300}',
      _light: '{orange.650}'
    },
    icon: {
      _dark: '{orange.300}',
      _light: '{orange.650}'
    }
  }
};

var _chart = {
  categorical: {
    unpredictable: {
      'chart-1': {
        _dark: '{purple.600}',
        _light: '{purple.650}'
      },
      'chart-2': {
        _dark: '{cyan.400}',
        _light: '{cyan.500}'
      },
      'chart-3': {
        _dark: '{teal.600}',
        _light: '{teal.550}'
      },
      'chart-4': {
        _dark: '{magenta.400}',
        _light: '{magenta.500}'
      },
      'chart-5': {
        _dark: '{red.500}',
        _light: '{red.550}'
      },
      'chart-6': {
        _dark: '{red.100}',
        _light: '{red.800}'
      },
      'chart-7': {
        _dark: '{green.300}',
        _light: '{green.550}'
      },
      'chart-8': {
        _dark: '{blue.500}',
        _light: '{blue.550}'
      },
      'chart-9': {
        _dark: '{magenta.600}',
        _light: '{magenta.600}'
      },
      'chart-10': {
        _dark: '{purple.300}',
        _light: '{purple.500}'
      },
      'chart-11': {
        _dark: '{yellow.400}',
        _light: '{yellow.500}'
      },
      'chart-12': {
        _dark: '{cyan.200}',
        _light: '{cyan.700}'
      },
      'chart-13': {
        _dark: '{teal.400}',
        _light: '{teal.500}'
      },
      'chart-14': {
        _dark: '{orange.400}',
        _light: '{orange.500}'
      },
      chartOther: {
        _dark: '{gray.500}',
        _light: '{gray.600}'
      },
      chartEmpty: {
        _dark: 'color-mix(in srgb, {colors.gray.600} 16%, transparent)',
        _light: 'color-mix(in srgb, {colors.gray.600} 16%, transparent)'
      },
      _overlay: {
        'chart-1': {
          none: {
            _dark: 'color-mix(in srgb, {colors.purple.600} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.purple.650} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.purple.600} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.purple.650} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.purple.600} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.purple.650} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.purple.600} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.purple.650} 64%, transparent)'
          }
        },
        'chart-2': {
          none: {
            _dark: 'color-mix(in srgb, {colors.cyan.400} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.cyan.500} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.cyan.400} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.cyan.500} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.cyan.400} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.cyan.500} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.cyan.400} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.cyan.500} 64%, transparent)'
          }
        },
        'chart-3': {
          none: {
            _dark: 'color-mix(in srgb, {colors.teal.600} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.teal.550} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.teal.600} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.teal.550} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.teal.600} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.teal.550} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.teal.600} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.teal.550} 64%, transparent)'
          }
        },
        'chart-4': {
          none: {
            _dark: 'color-mix(in srgb, {colors.magenta.400} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.magenta.500} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.magenta.400} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.magenta.500} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.magenta.400} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.magenta.500} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.magenta.400} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.magenta.500} 64%, transparent)'
          }
        },
        'chart-5': {
          none: {
            _dark: 'color-mix(in srgb, {colors.red.500} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.red.550} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.red.500} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.red.550} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.red.500} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.red.550} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.red.500} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.red.550} 64%, transparent)'
          }
        },
        'chart-6': {
          none: {
            _dark: 'color-mix(in srgb, {colors.red.100} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.red.800} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.red.100} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.red.800} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.red.100} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.red.800} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.red.100} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.red.800} 64%, transparent)'
          }
        },
        'chart-7': {
          none: {
            _dark: 'color-mix(in srgb, {colors.green.300} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.green.550} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.green.300} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.green.550} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.green.300} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.green.550} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.green.300} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.green.550} 64%, transparent)'
          }
        },
        'chart-8': {
          none: {
            _dark: 'color-mix(in srgb, {colors.blue.500} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.blue.550} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.blue.500} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.blue.550} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.blue.500} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.blue.550} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.blue.500} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.blue.550} 64%, transparent)'
          }
        },
        'chart-9': {
          none: {
            _dark: 'color-mix(in srgb, {colors.magenta.600} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.magenta.600} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.magenta.600} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.magenta.600} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.magenta.600} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.magenta.600} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.magenta.600} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.magenta.600} 64%, transparent)'
          }
        },
        'chart-10': {
          none: {
            _dark: 'color-mix(in srgb, {colors.purple.300} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.purple.500} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.purple.300} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.purple.500} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.purple.300} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.purple.500} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.purple.300} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.purple.500} 64%, transparent)'
          }
        },
        'chart-11': {
          none: {
            _dark: 'color-mix(in srgb, {colors.yellow.400} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.yellow.500} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.yellow.400} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.yellow.500} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.yellow.400} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.yellow.500} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.yellow.400} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.yellow.500} 64%, transparent)'
          }
        },
        'chart-12': {
          none: {
            _dark: 'color-mix(in srgb, {colors.cyan.200} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.cyan.700} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.cyan.200} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.cyan.700} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.cyan.200} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.cyan.700} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.cyan.200} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.cyan.700} 64%, transparent)'
          }
        },
        'chart-13': {
          none: {
            _dark: 'color-mix(in srgb, {colors.teal.400} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.teal.500} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.teal.400} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.teal.500} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.teal.400} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.teal.500} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.teal.400} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.teal.500} 64%, transparent)'
          }
        },
        'chart-14': {
          none: {
            _dark: 'color-mix(in srgb, {colors.orange.400} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.orange.500} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.orange.400} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.orange.500} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.orange.400} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.orange.500} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.orange.400} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.orange.500} 64%, transparent)'
          }
        },
        chartOther: {
          none: {
            _dark: 'color-mix(in srgb, {colors.gray.500} 0%, transparent)',
            _light: 'color-mix(in srgb, {colors.gray.600} 0%, transparent)'
          },
          thin: {
            _dark: 'color-mix(in srgb, {colors.gray.500} 16%, transparent)',
            _light: 'color-mix(in srgb, {colors.gray.600} 16%, transparent)'
          },
          medium: {
            _dark: 'color-mix(in srgb, {colors.gray.500} 40%, transparent)',
            _light: 'color-mix(in srgb, {colors.gray.600} 40%, transparent)'
          },
          thick: {
            _dark: 'color-mix(in srgb, {colors.gray.500} 64%, transparent)',
            _light: 'color-mix(in srgb, {colors.gray.600} 64%, transparent)'
          }
        }
      }
    },
    predictable: {
      '1ColorGroup': {
        'option-1': {
          'chart-1': {
            _dark: '{purple.300}',
            _light: '{purple.700}'
          }
        },
        'option-2': {
          'chart-1': {
            _dark: '{blue.500}',
            _light: '{blue.800}'
          }
        },
        'option-3': {
          'chart-1': {
            _dark: '{cyan.400}',
            _light: '{cyan.500}'
          }
        },
        'option-4': {
          'chart-1': {
            _dark: '{teal.400}',
            _light: '{teal.700}'
          }
        }
      },
      '2ColorGroup': {
        'option-1': {
          'chart-1': {
            _dark: '{purple.600}',
            _light: '{purple.700}'
          },
          'chart-2': {
            _dark: '{teal.400}',
            _light: '{teal.500}'
          }
        },
        'option-2': {
          'chart-1': {
            _dark: '{purple.600}',
            _light: '{purple.600}'
          },
          'chart-2': {
            _dark: '{magenta.400}',
            _light: '{red.900}'
          }
        },
        'option-3': {
          'chart-1': {
            _dark: '{magenta.400}',
            _light: '{magenta.700}'
          },
          'chart-2': {
            _dark: '{red.100}',
            _light: '{red.900}'
          }
        },
        'option-4': {
          'chart-1': {
            _dark: '{blue.500}',
            _light: '{cyan.500}'
          },
          'chart-2': {
            _dark: '{cyan.200}',
            _light: '{teal.700}'
          }
        },
        'option-5': {
          'chart-1': {
            _dark: '{teal.600}',
            _light: '{teal.500}'
          },
          'chart-2': {
            _dark: '{green.300}',
            _light: '{blue.800}'
          }
        }
      },
      '3ColorGroup': {
        'option-1': {
          'chart-1': {
            _dark: '{purple.600}',
            _light: '{purple.500}'
          },
          'chart-2': {
            _dark: '{teal.400}',
            _light: '{teal.700}'
          },
          'chart-3': {
            _dark: '{cyan.200}',
            _light: '{magenta.700}'
          }
        },
        'option-2': {
          'chart-1': {
            _dark: '{purple.600}',
            _light: '{magenta.700}'
          },
          'chart-2': {
            _dark: '{magenta.400}',
            _light: '{red.500}'
          },
          'chart-3': {
            _dark: '{red.100}',
            _light: '{red.900}'
          }
        },
        'option-3': {
          'chart-1': {
            _dark: '{blue.500}',
            _light: '{purple.500}'
          },
          'chart-2': {
            _dark: '{teal.400}',
            _light: '{teal.700}'
          },
          'chart-3': {
            _dark: '{purple.300}',
            _light: '{blue.800}'
          }
        },
        'option-4': {
          'chart-1': {
            _dark: '{blue.500}',
            _light: '{magenta.500}'
          },
          'chart-2': {
            _dark: '{green.300}',
            _light: '{cyan.500}'
          },
          'chart-3': {
            _dark: '{red.100}',
            _light: '{purple.700}'
          }
        },
        'option-5': {
          'chart-1': {
            _dark: '{teal.600}',
            _light: '{cyan.900}'
          },
          'chart-2': {
            _dark: '{green.300}',
            _light: '{purple.700}'
          },
          'chart-3': {
            _dark: '{cyan.200}',
            _light: '{teal.500}'
          }
        }
      },
      '4ColorGroup': {
        'option-1': {
          'chart-1': {
            _dark: '{purple.600}',
            _light: '{magenta.700}'
          },
          'chart-2': {
            _dark: '{teal.400}',
            _light: '{red.500}'
          },
          'chart-3': {
            _dark: '{cyan.200}',
            _light: '{red.900}'
          },
          'chart-4': {
            _dark: '{blue.500}',
            _light: '{purple.500}'
          }
        },
        'option-2': {
          'chart-1': {
            _dark: '{blue.500}',
            _light: '{purple.700}'
          },
          'chart-2': {
            _dark: '{teal.400}',
            _light: '{cyan.900}'
          },
          'chart-3': {
            _dark: '{purple.300}',
            _light: '{teal.500}'
          },
          'chart-4': {
            _dark: '{red.100}',
            _light: '{magenta.500}'
          }
        },
        'option-3': {
          'chart-1': {
            _dark: '{teal.600}',
            _light: '{teal.500}'
          },
          'chart-2': {
            _dark: '{red.100}',
            _light: '{blue.800}'
          },
          'chart-3': {
            _dark: '{cyan.400}',
            _light: '{purple.500}'
          },
          'chart-4': {
            _dark: '{green.300}',
            _light: '{magenta.700}'
          }
        }
      },
      '5ColorGroup': {
        'option-1': {
          'chart-1': {
            _dark: '{purple.600}',
            _light: '{purple.700}'
          },
          'chart-2': {
            _dark: '{teal.400}',
            _light: '{cyan.500}'
          },
          'chart-3': {
            _dark: '{cyan.200}',
            _light: '{teal.700}'
          },
          'chart-4': {
            _dark: '{blue.500}',
            _light: '{magenta.700}'
          },
          'chart-5': {
            _dark: '{magenta.400}',
            _light: '{red.900}'
          }
        },
        'option-2': {
          'chart-1': {
            _dark: '{blue.500}',
            _light: '{blue.800}'
          },
          'chart-2': {
            _dark: '{teal.400}',
            _light: '{teal.500}'
          },
          'chart-3': {
            _dark: '{purple.300}',
            _light: '{magenta.700}'
          },
          'chart-4': {
            _dark: '{red.100}',
            _light: '{red.900}'
          },
          'chart-5': {
            _dark: '{green.300}',
            _light: '{purple.400}'
          }
        }
      }
    }
  },
  sequential: {
    attackIntensity: {
      'lv-1': {
        _dark: '{red.100}',
        _light: '{red.1000}'
      },
      'lv-2': {
        _dark: '{red.200}',
        _light: '{red.900}'
      },
      'lv-3': {
        _dark: '{red.300}',
        _light: '{red.800}'
      },
      'lv-4': {
        _dark: '{red.400}',
        _light: '{red.700}'
      },
      'lv-5': {
        _dark: '{red.500}',
        _light: '{red.600}'
      },
      'lv-6': {
        _dark: '{red.600}',
        _light: '{red.500}'
      },
      'lv-7': {
        _dark: '{red.700}',
        _light: '{red.400}'
      },
      'lv-8': {
        _dark: '{red.800}',
        _light: '{red.300}'
      },
      'lv-9': {
        _dark: '{red.900}',
        _light: '{red.200}'
      },
      'lv-10': {
        _dark: '{red.1000}',
        _light: '{red.100}'
      }
    },
    'option-1': {
      'lv-1': {
        _dark: '{blue.100}',
        _light: '{blue.1000}'
      },
      'lv-2': {
        _dark: '{blue.200}',
        _light: '{blue.900}'
      },
      'lv-3': {
        _dark: '{blue.300}',
        _light: '{blue.800}'
      },
      'lv-4': {
        _dark: '{blue.400}',
        _light: '{blue.700}'
      },
      'lv-5': {
        _dark: '{blue.500}',
        _light: '{blue.600}'
      },
      'lv-6': {
        _dark: '{blue.600}',
        _light: '{blue.500}'
      },
      'lv-7': {
        _dark: '{blue.700}',
        _light: '{blue.400}'
      },
      'lv-8': {
        _dark: '{blue.800}',
        _light: '{blue.300}'
      },
      'lv-9': {
        _dark: '{blue.900}',
        _light: '{blue.200}'
      },
      'lv-10': {
        _dark: '{blue.1000}',
        _light: '{blue.100}'
      }
    },
    'option-2': {
      'lv-1': {
        _dark: '{purple.100}',
        _light: '{purple.1000}'
      },
      'lv-2': {
        _dark: '{purple.200}',
        _light: '{purple.900}'
      },
      'lv-3': {
        _dark: '{purple.300}',
        _light: '{purple.800}'
      },
      'lv-4': {
        _dark: '{purple.400}',
        _light: '{purple.700}'
      },
      'lv-5': {
        _dark: '{purple.500}',
        _light: '{purple.600}'
      },
      'lv-6': {
        _dark: '{purple.600}',
        _light: '{purple.500}'
      },
      'lv-7': {
        _dark: '{purple.700}',
        _light: '{purple.400}'
      },
      'lv-8': {
        _dark: '{purple.800}',
        _light: '{purple.300}'
      },
      'lv-9': {
        _dark: '{purple.900}',
        _light: '{purple.200}'
      },
      'lv-10': {
        _dark: '{purple.1000}',
        _light: '{purple.100}'
      }
    },
    'option-3': {
      'lv-1': {
        _dark: '{cyan.100}',
        _light: '{cyan.1000}'
      },
      'lv-2': {
        _dark: '{cyan.200}',
        _light: '{cyan.900}'
      },
      'lv-3': {
        _dark: '{cyan.300}',
        _light: '{cyan.800}'
      },
      'lv-4': {
        _dark: '{cyan.400}',
        _light: '{cyan.700}'
      },
      'lv-5': {
        _dark: '{cyan.500}',
        _light: '{cyan.600}'
      },
      'lv-6': {
        _dark: '{cyan.600}',
        _light: '{cyan.500}'
      },
      'lv-7': {
        _dark: '{cyan.700}',
        _light: '{cyan.400}'
      },
      'lv-8': {
        _dark: '{cyan.800}',
        _light: '{cyan.300}'
      },
      'lv-9': {
        _dark: '{cyan.900}',
        _light: '{cyan.200}'
      },
      'lv-10': {
        _dark: '{cyan.1000}',
        _light: '{cyan.100}'
      }
    },
    'option-4': {
      'lv-1': {
        _dark: '{teal.100}',
        _light: '{teal.1000}'
      },
      'lv-2': {
        _dark: '{teal.200}',
        _light: '{teal.900}'
      },
      'lv-3': {
        _dark: '{teal.300}',
        _light: '{teal.800}'
      },
      'lv-4': {
        _dark: '{teal.400}',
        _light: '{teal.700}'
      },
      'lv-5': {
        _dark: '{teal.500}',
        _light: '{teal.600}'
      },
      'lv-6': {
        _dark: '{teal.600}',
        _light: '{teal.500}'
      },
      'lv-7': {
        _dark: '{teal.700}',
        _light: '{teal.400}'
      },
      'lv-8': {
        _dark: '{teal.800}',
        _light: '{teal.300}'
      },
      'lv-9': {
        _dark: '{teal.900}',
        _light: '{teal.200}'
      },
      'lv-10': {
        _dark: '{teal.1000}',
        _light: '{teal.100}'
      }
    },
    'option-5': {
      'lv-1': {
        _dark: '{orange.100}',
        _light: '{orange.1000}'
      },
      'lv-2': {
        _dark: '{orange.200}',
        _light: '{orange.900}'
      },
      'lv-3': {
        _dark: '{orange.300}',
        _light: '{orange.800}'
      },
      'lv-4': {
        _dark: '{orange.400}',
        _light: '{orange.700}'
      },
      'lv-5': {
        _dark: '{orange.500}',
        _light: '{orange.600}'
      },
      'lv-6': {
        _dark: '{orange.600}',
        _light: '{orange.500}'
      },
      'lv-7': {
        _dark: '{orange.700}',
        _light: '{orange.400}'
      },
      'lv-8': {
        _dark: '{orange.800}',
        _light: '{orange.300}'
      },
      'lv-9': {
        _dark: '{orange.900}',
        _light: '{orange.200}'
      },
      'lv-10': {
        _dark: '{orange.1000}',
        _light: '{orange.100}'
      }
    }
  },
  divergent: {
    'option-1': {
      'lv-1': {
        _dark: '{red.800}',
        _light: '{red.800}'
      },
      'lv-2': {
        _dark: '{red.700}',
        _light: '{red.700}'
      },
      'lv-3': {
        _dark: '{red.600}',
        _light: '{red.600}'
      },
      'lv-4': {
        _dark: '{red.500}',
        _light: '{red.500}'
      },
      'lv-5': {
        _dark: '{red.400}',
        _light: '{red.400}'
      },
      'lv-6': {
        _dark: '{red.300}',
        _light: '{red.300}'
      },
      'lv-7': {
        _dark: '{red.200}',
        _light: '{red.200}'
      },
      'lv-8': {
        _dark: '{red.100}',
        _light: '{red.100}'
      },
      'lv-9': {
        _dark: '{blue.100}',
        _light: '{blue.100}'
      },
      'lv-10': {
        _dark: '{blue.200}',
        _light: '{blue.200}'
      },
      'lv-11': {
        _dark: '{blue.300}',
        _light: '{blue.300}'
      },
      'lv-12': {
        _dark: '{blue.400}',
        _light: '{blue.400}'
      },
      'lv-13': {
        _dark: '{blue.500}',
        _light: '{blue.500}'
      },
      'lv-14': {
        _dark: '{blue.600}',
        _light: '{blue.600}'
      },
      'lv-15': {
        _dark: '{blue.700}',
        _light: '{blue.700}'
      },
      'lv-16': {
        _dark: '{blue.800}',
        _light: '{blue.800}'
      }
    },
    'option-2': {
      'lv-1': {
        _dark: '{purple.800}',
        _light: '{purple.800}'
      },
      'lv-2': {
        _dark: '{purple.700}',
        _light: '{purple.700}'
      },
      'lv-3': {
        _dark: '{purple.600}',
        _light: '{purple.600}'
      },
      'lv-4': {
        _dark: '{purple.500}',
        _light: '{purple.500}'
      },
      'lv-5': {
        _dark: '{purple.400}',
        _light: '{purple.400}'
      },
      'lv-6': {
        _dark: '{purple.300}',
        _light: '{purple.300}'
      },
      'lv-7': {
        _dark: '{purple.200}',
        _light: '{purple.300}'
      },
      'lv-8': {
        _dark: '{purple.100}',
        _light: '{purple.200}'
      },
      'lv-9': {
        _dark: '{teal.100}',
        _light: '{teal.100}'
      },
      'lv-10': {
        _dark: '{teal.200}',
        _light: '{teal.200}'
      },
      'lv-11': {
        _dark: '{teal.300}',
        _light: '{teal.300}'
      },
      'lv-12': {
        _dark: '{teal.400}',
        _light: '{teal.400}'
      },
      'lv-13': {
        _dark: '{teal.500}',
        _light: '{teal.500}'
      },
      'lv-14': {
        _dark: '{teal.600}',
        _light: '{teal.600}'
      },
      'lv-15': {
        _dark: '{teal.700}',
        _light: '{teal.700}'
      },
      'lv-16': {
        _dark: '{teal.800}',
        _light: '{teal.800}'
      }
    }
  }
};

var _component = {
  scrollbar: {
    thumb: {
      enabled: {
        _dark: '{gray.600}',
        _light: '{gray.400}'
      },
      hovered: {
        _dark: '{gray.500}',
        _light: '{gray.500}'
      },
      active: {
        _dark: '{gray.400}',
        _light: '{gray.600}'
      }
    },
    track: {
      enabled: {
        _dark: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)',
        _light: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)'
      },
      hovered: {
        _dark: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)',
        _light: 'color-mix(in srgb, {colors.gray.1000} 8%, transparent)'
      },
      active: {
        _dark: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)',
        _light: 'color-mix(in srgb, {colors.gray.1000} 8%, transparent)'
      }
    }
  },
  tags: {
    onBackground: {
      gray: {
        _dark: '{gray.400}',
        _light: '{gray.700}'
      },
      blue: {
        _dark: '{blue.400}',
        _light: '{blue.650}'
      },
      cyan: {
        _dark: '{cyan.400}',
        _light: '{cyan.700}'
      },
      green: {
        _dark: '{green.400}',
        _light: '{green.700}'
      },
      teal: {
        _dark: '{teal.400}',
        _light: '{teal.700}'
      },
      magenta: {
        _dark: '{magenta.400}',
        _light: '{magenta.700}'
      },
      purple: {
        _dark: '{purple.400}',
        _light: '{purple.700}'
      }
    },
    foreground: {
      gray: {
        _dark: '{gray.800}',
        _light: '{gray.300}'
      },
      blue: {
        _dark: '{blue.700}',
        _light: '{blue.300}'
      },
      cyan: {
        _dark: '{cyan.700}',
        _light: '{cyan.300}'
      },
      green: {
        _dark: '{green.700}',
        _light: '{green.300}'
      },
      teal: {
        _dark: '{teal.700}',
        _light: '{teal.300}'
      },
      magenta: {
        _dark: '{magenta.700}',
        _light: '{magenta.300}'
      },
      purple: {
        _dark: '{purple.700}',
        _light: '{purple.300}'
      }
    },
    onForeground: {
      gray: {
        _dark: '{gray.200}',
        _light: '{gray.800}'
      },
      green: {
        _dark: '{green.200}',
        _light: '{green.800}'
      },
      blue: {
        _dark: '{blue.200}',
        _light: '{blue.800}'
      },
      cyan: {
        _dark: '{cyan.200}',
        _light: '{cyan.800}'
      },
      magenta: {
        _dark: '{magenta.200}',
        _light: '{magenta.800}'
      },
      purple: {
        _dark: '{purple.200}',
        _light: '{purple.800}'
      },
      teal: {
        _dark: '{teal.200}',
        _light: '{teal.800}'
      }
    },
    border: {
      gray: {
        _dark: '{border._primary.enabled}',
        _light: '{border._primary.enabled}'
      },
      green: {
        _dark: '{green.400}',
        _light: '{green.600}'
      },
      blue: {
        _dark: '{blue.400}',
        _light: '{blue.650}'
      },
      cyan: {
        _dark: '{cyan.400}',
        _light: '{cyan.600}'
      },
      magenta: {
        _dark: '{magenta.400}',
        _light: '{magenta.500}'
      },
      purple: {
        _dark: '{purple.400}',
        _light: '{purple.700}'
      },
      teal: {
        _dark: '{teal.400}',
        _light: '{teal.500}'
      }
    }
  },
  keyboardFocused: {
    outerFocusRing: {
      _dark: '{gray.100}',
      _light: '{gray.1000}'
    },
    innerFocusRing: {
      _dark: '{gray.1000}',
      _light: '{gray.100}'
    },
    transparentForeground: {
      _dark: 'rgba(0, 0, 0, 0)',
      _light: 'rgba(255, 255, 255, 0)'
    }
  }
};

var _foreground = {
  primary: {
    enabled: {
      _dark: '{blue.650}',
      _light: '{blue.600}'
    },
    hovered: {
      _dark: '{blue.650.lighten.160}',
      _light: '{blue.600.darken.160}'
    },
    active: {
      _dark: '{blue.650.darken.80}',
      _light: '{blue.600.darken.320}'
    },
    disabled: {
      _dark: 'color-mix(in srgb, {colors.gray.800} 48%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.250} 48%, transparent)'
    }
  },
  primaryVariant: {
    enabled: {
      _dark: '{_foreground.secondary.enabled}',
      _light: '{_foreground.secondary.enabled}'
    },
    hovered: {
      _dark: '{_foreground.secondary.hovered}',
      _light: '{_foreground.secondary.hovered}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    },
    selected: {
      _dark: '{_foreground.primary.enabled}',
      _light: '{_foreground.primary.enabled}'
    },
    selectedHovered: {
      _dark: '{_foreground.primary.hovered}',
      _light: '{_foreground.primary.hovered}'
    },
    selectedDisabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  },
  secondary: {
    enabled: {
      _dark: '{gray.800}',
      _light: '{gray.250}'
    },
    hovered: {
      _dark: '{gray.800.lighten.160}',
      _light: '{gray.250.darken.80}'
    },
    active: {
      _dark: '{gray.800.darken.80}',
      _light: '{gray.250.darken.160}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  },
  tertiary: {
    enabled: {
      _dark: 'color-mix(in srgb, {colors.gray.500} 16%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.500} 16%, transparent)'
    },
    hovered: {
      _dark: 'color-mix(in srgb, {colors.gray.500} 28%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.500} 28%, transparent)'
    },
    active: {
      _dark: 'color-mix(in srgb, {colors.gray.500} 20%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.500} 20%, transparent)'
    },
    disabled: {
      _dark: 'color-mix(in srgb, {colors.gray.500} 8%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.500} 8%, transparent)'
    },
    selected: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 72%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.800} 68%, transparent)'
    },
    selectedHovered: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 80%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.800} 76%, transparent)'
    },
    selectedDisabled: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.800} 24%, transparent)'
    }
  },
  subtle: {
    enabled: {
      _dark: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)'
    },
    hovered: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 12%, transparent)'
    },
    active: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 4%, transparent)'
    },
    disabled: {
      _dark: 'color-mix(in srgb, {colors.gray.1000} 0%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.100} 0%, transparent)'
    },
    selected: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 12%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 20%, transparent)'
    },
    selectedHovered: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 16%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 24%, transparent)'
    },
    selectedDisabled: {
      _dark: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)',
      _light: 'color-mix(in srgb, {colors.gray.600} 8%, transparent)'
    }
  },
  negative: {
    enabled: {
      _dark: '{red.650}',
      _light: '{red.650}'
    },
    hovered: {
      _dark: '{red.650.lighten.160}',
      _light: '{red.650.darken.160}'
    },
    active: {
      _dark: '{red.650.darken.160}',
      _light: '{red.650.darken.320}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  },
  promotion: {
    enabled: {
      _dark: '{purple.650}',
      _light: '{purple.600}'
    },
    hovered: {
      _dark: '{purple.650.lighten.160}',
      _light: '{purple.600.darken.160}'
    },
    active: {
      _dark: '{purple.650.darken.160}',
      _light: '{purple.600.darken.320}'
    },
    disabled: {
      _dark: '{_foreground.primary.disabled}',
      _light: '{_foreground.primary.disabled}'
    }
  }
};

var _highlight = {
  _dark: '{yellow.100}',
  _light: '{yellow.100}'
};

var _link = {
  enabled: {
    _dark: '{blue.300}',
    _light: '{blue.700}'
  },
  hovered: {
    _dark: '{blue.200}',
    _light: '{blue.650}'
  },
  active: {
    _dark: '{blue.400}',
    _light: '{blue.800}'
  },
  visited: {
    _dark: '{purple.500}',
    _light: '{purple.650}'
  },
  disabled: {
    _dark: '{text.disabled}',
    _light: '{text.disabled}'
  },
  _fixed: {
    dark: {
      enabled: {
        _dark: '{_link.enabled}',
        _light: '{blue.300}'
      },
      hovered: {
        _dark: '{_link.hovered}',
        _light: '{blue.200}'
      },
      active: {
        _dark: '{_link.active}',
        _light: '{blue.400}'
      },
      visited: {
        _dark: '{_link.visited}',
        _light: '{purple.400}'
      },
      disabled: {
        _dark: '{text._fixed.dark.disabled}',
        _light: '{text._fixed.dark.disabled}'
      }
    },
    light: {
      enabled: {
        _dark: '{blue.700}',
        _light: '{_link.enabled}'
      },
      hovered: {
        _dark: '{blue.650}',
        _light: '{_link.hovered}'
      },
      active: {
        _dark: '{blue.800}',
        _light: '{_link.active}'
      },
      visited: {
        _dark: '{purple.700}',
        _light: '{_link.visited}'
      },
      disabled: {
        _dark: '{text._fixed.light.disabled}',
        _light: '{text._inverse.disabled}'
      }
    }
  },
  _inverse: {
    enabled: {
      _dark: '{_link._fixed.light.enabled}',
      _light: '{_link._fixed.dark.enabled}'
    },
    hovered: {
      _dark: '{_link._fixed.light.hovered}',
      _light: '{_link._fixed.dark.hovered}'
    },
    active: {
      _dark: '{_link._fixed.light.active}',
      _light: '{_link._fixed.dark.active}'
    },
    visited: {
      _dark: '{_link._fixed.dark.visited}',
      _light: '{_link._fixed.dark.visited}'
    },
    disabled: {
      _dark: '{_link._fixed.light.disabled}',
      _light: '{_link._fixed.dark.disabled}'
    }
  }
};

var _overlay = {
  thinest: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 4%, transparent)'
  },
  thinner: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 8%, transparent)'
  },
  thin: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 16%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 16%, transparent)'
  },
  medium: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 40%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 40%, transparent)'
  },
  thick: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 64%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 64%, transparent)'
  },
  thicker: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 72%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 72%, transparent)'
  },
  thickest: {
    _dark: 'color-mix(in srgb, {colors.gray.100} 76%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 76%, transparent)'
  },
  inverse: {
    thinest: {
      _dark: '{_overlay._fixed.light.thinest}',
      _light: '{_overlay._fixed.dark.thinest}'
    },
    thinner: {
      _dark: '{_overlay._fixed.light.thinner}',
      _light: '{_overlay._fixed.dark.thinner}'
    },
    thin: {
      _dark: '{_overlay._fixed.light.thin}',
      _light: '{_overlay._fixed.dark.thin}'
    },
    medium: {
      _dark: '{_overlay._fixed.light.medium}',
      _light: '{_overlay._fixed.dark.medium}'
    },
    thick: {
      _dark: '{_overlay._fixed.light.thick}',
      _light: '{_overlay._fixed.dark.thick}'
    },
    thicker: {
      _dark: '{_overlay._fixed.light.thicker}',
      _light: '{_overlay._fixed.dark.thicker}'
    },
    thickest: {
      _dark: '{_overlay._fixed.light.thickest}',
      _light: '{_overlay._fixed.dark.thickest}'
    }
  },
  _fixed: {
    dark: {
      thinest: {
        _dark: '{_overlay.thinest}',
        _light: 'color-mix(in srgb, {colors.gray.100} 4%, transparent)'
      },
      thinner: {
        _dark: '{_overlay.thinner}',
        _light: 'color-mix(in srgb, {colors.gray.100} 8%, transparent)'
      },
      thin: {
        _dark: '{_overlay.thin}',
        _light: 'color-mix(in srgb, {colors.gray.100} 16%, transparent)'
      },
      medium: {
        _dark: '{_overlay.medium}',
        _light: 'color-mix(in srgb, {colors.gray.100} 40%, transparent)'
      },
      thick: {
        _dark: '{_overlay.thick}',
        _light: 'color-mix(in srgb, {colors.gray.100} 64%, transparent)'
      },
      thicker: {
        _dark: '{_overlay.thicker}',
        _light: 'color-mix(in srgb, {colors.gray.100} 72%, transparent)'
      },
      thickest: {
        _dark: '{_overlay.thickest}',
        _light: 'color-mix(in srgb, {colors.gray.100} 76%, transparent)'
      }
    },
    light: {
      thinest: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 4%, transparent)',
        _light: '{_overlay.thinest}'
      },
      thinner: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 8%, transparent)',
        _light: '{_overlay.thinner}'
      },
      thin: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 16%, transparent)',
        _light: '{_overlay.thin}'
      },
      medium: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 40%, transparent)',
        _light: '{_overlay.medium}'
      },
      thick: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 64%, transparent)',
        _light: '{_overlay.thick}'
      },
      thicker: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 72%, transparent)',
        _light: '{_overlay.thicker}'
      },
      thickest: {
        _dark: 'color-mix(in srgb, {colors.gray.1000} 76%, transparent)',
        _light: '{_overlay.thickest}'
      }
    }
  }
};

var _shadow = {
  low: {
    _dark: 'color-mix(in srgb, {colors.gray.1000} 80%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 16%, transparent)'
  },
  medium: {
    _dark: 'color-mix(in srgb, {colors.gray.1000} 76%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 12%, transparent)'
  },
  high: {
    _dark: 'color-mix(in srgb, {colors.gray.1000} 72%, transparent)',
    _light: 'color-mix(in srgb, {colors.gray.1000} 8%, transparent)'
  }
};

var colors = {
  actions: actions,
  background: background,
  border: border,
  error: error,
  info: info,
  minorWarning: minorWarning,
  neutral: neutral,
  promotion: promotion,
  riskLevel: riskLevel,
  severity: severity,
  success: success,
  text: text,
  warning: warning,
  _chart: _chart,
  _component: _component,
  _foreground: _foreground,
  _highlight: _highlight,
  _link: _link,
  _overlay: _overlay,
  _shadow: _shadow
};

var shadows = {
  low: {
    main: '{low.down}',
    down: {
      _dark: '0px 4px 8px 0px {colors._shadow.low._dark}',
      _light: '0px 4px 8px 0px {colors._shadow.low._light}'
    },
    up: {
      _dark: '0px -4px 8px 0px {colors._shadow.low._dark}',
      _light: '0px -4px 8px 0px {colors._shadow.low._light}'
    },
    left: {
      _dark: '-4px 0px 8px 0px {colors._shadow.low._dark}',
      _light: '-4px 0px 8px 0px {colors._shadow.low._light}'
    },
    right: {
      _dark: '4px 0px 8px 0px {colors._shadow.low._dark}',
      _light: '4px 0px 8px 0px {colors._shadow.low._light}'
    }
  },
  medium: {
    main: '{medium.down}',
    down: {
      _dark: '0px 8px 16px 0px {colors._shadow.medium._dark}',
      _light: '0px 8px 16px 0px {colors._shadow.medium._light}'
    },
    up: {
      _dark: '0px -8px 16px 0px {colors._shadow.medium._dark}',
      _light: '0px -8px 16px 0px {colors._shadow.medium._light}'
    },
    left: {
      _dark: '-8px 0px 16px 0px {colors._shadow.medium._dark}',
      _light: '-8px 0px 16px 0px {colors._shadow.medium._light}'
    },
    right: {
      _dark: '8px 0px 16px 0px {colors._shadow.medium._dark}',
      _light: '8px 0px 16px 0px {colors._shadow.medium._light}'
    }
  },
  high: {
    main: '{high.down}',
    down: {
      _dark: '0px 10px 24px 0px {colors._shadow.high._dark}',
      _light: '0px 10px 24px 0px {colors._shadow.high._light}'
    },
    up: {
      _dark: '0px -10px 24px 0px {colors._shadow.high._dark}',
      _light: '0px -10px 24px 0px {colors._shadow.high._light}'
    },
    left: {
      _dark: '-10px 0px 24px 0px {colors._shadow.high._dark}',
      _light: '-10px 0px 24px 0px {colors._shadow.high._light}'
    },
    right: {
      _dark: '10px 0px 24px 0px {colors._shadow.high._dark}',
      _light: '10px 0px 24px 0px {colors._shadow.high._light}'
    }
  }
};

// Semantic tokens provide contextual meaning to primitive tokens
// They support light/dark mode switching and are organized by usage context

/**
 * Create semantic theme object
 * Organize all semantic tokens by styled-system property categories
 *
 * @param {string} unit - Unit type (px, rem, em, etc.)
 * @returns {Object} Semantic theme object organized by styled-system properties
 */
var createSemanticTokens = function createSemanticTokens(unit) {
  // Organize into styled-system property structure
  return {
    colors: colors,
    shadows: shadows
  };
};

/**
 * Create v3 theme combining v2, primitives and semantic tokens
 *
 * @param {string} unit - Unit type ('px' or 'rem')
 * @returns {Object} Combined v3 theme object
 */
var createTheme$3 = function createTheme() {
  var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rem';
  var deprecatedTheme = createV2Theme(unit);
  var primitiveTokens = createPrimitiveTokens(unit);
  var semanticTokens = createSemanticTokens();

  // Merge strategy: deprecated provides base, primitive overrides conflicts
  // This way primitive tokens naturally override deprecated tokens with same names
  return {
    colors: _objectSpread2(_objectSpread2(_objectSpread2({}, deprecatedTheme.colors), primitiveTokens.colors), semanticTokens.colors),
    borders: _objectSpread2(_objectSpread2({}, deprecatedTheme.borders), primitiveTokens.borders),
    fonts: _objectSpread2(_objectSpread2({}, deprecatedTheme.fonts), primitiveTokens.fonts),
    fontSizes: _objectSpread2(_objectSpread2({}, deprecatedTheme.fontSizes), primitiveTokens.fontSizes),
    fontWeights: _objectSpread2(_objectSpread2({}, deprecatedTheme.fontWeights), primitiveTokens.fontWeights),
    radii: _objectSpread2(_objectSpread2({}, deprecatedTheme.radii), primitiveTokens.radii),
    // breakpoints must be an array, cannot use object spread
    // Start with deprecated array, then override with primitive values
    breakpoints: function () {
      var merged = [];
      // Copy all properties from deprecated (numeric indices and named properties)
      Object.keys(deprecatedTheme.breakpoints).forEach(function (key) {
        merged[key] = deprecatedTheme.breakpoints[key];
      });
      // Override with primitive values (both array indices and named properties)
      if (primitiveTokens.breakpoints) {
        Object.keys(primitiveTokens.breakpoints).forEach(function (key) {
          merged[key] = primitiveTokens.breakpoints[key];
        });
      }
      return merged;
    }(),
    lineHeights: _objectSpread2(_objectSpread2({}, deprecatedTheme.lineHeights), primitiveTokens.lineHeights),
    outlines: _objectSpread2(_objectSpread2({}, deprecatedTheme.outlines), primitiveTokens.outlines),
    space: _objectSpread2(_objectSpread2({}, deprecatedTheme.space), primitiveTokens.space),
    sizes: _objectSpread2(_objectSpread2({}, deprecatedTheme.sizes), primitiveTokens.sizes),
    zIndices: _objectSpread2(_objectSpread2({}, deprecatedTheme.zIndices), primitiveTokens.zIndices),
    shadows: _objectSpread2(_objectSpread2({}, deprecatedTheme.shadows), semanticTokens.shadows)
  };
};
var createV3Theme = createTheme$3;

/**
 * Create theme object with unified systems
 *
 * Usage:
 * - createTheme('rem')  -> Returns v3 theme (rem units)
 * - createTheme('px')   -> Returns v3 theme (px units)
 *
 * Strategy:
 * - v3 integrates v2 (deprecated) + primitives + semantic tokens
 */
var createTheme$2 = function createTheme() {
  var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rem';
  return createV3Theme(unit);
};
var createTheme$1$1 = createTheme$2;

var theme$1 = createTheme$1$1('rem');

/**
 * Recursively processes theme object and converts _dark/_light structure to variables
 */
var processColorModeTokens = function processColorModeTokens(obj) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var result = {};
  for (var _i = 0, _Object$entries = Object.entries(obj); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray$3(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    var currentPath = path ? "".concat(path, ".").concat(key) : key;
    if (_typeof$3(value) === 'object' && value !== null && !Array.isArray(value)) {
      // Check if it's a _dark/_light structure (must have both _dark and _light properties)
      if (Object.prototype.hasOwnProperty.call(value, '_dark') && Object.prototype.hasOwnProperty.call(value, '_light')) {
        // Generate variables with -dark/-light suffixes
        result["".concat(currentPath, "-dark")] = value._dark;
        result["".concat(currentPath, "-light")] = value._light;
        // Also generate base variable that defaults to light mode
        var baseVarName = toCSSVariable("".concat(currentPath, "-light"), {
          prefix: prefix
        });
        result[currentPath] = "var(".concat(baseVarName, ")");
      } else if (Object.prototype.hasOwnProperty.call(value, 'main')) {
        // Primitive color object with a `main` default and lighten/darken variants.
        // Example input:  red.600 = { main: '#dd1128', lighten: { 80: '#e02439', ... }, darken: { 80: '#cf1025', ... } }
        // Generated vars: --tonic-colors-red-600-main:       #dd1128
        //                 --tonic-colors-red-600-lighten-80:  #e02439
        //                 --tonic-colors-red-600-darken-80:   #cf1025
        //                 --tonic-colors-red-600:             var(--tonic-colors-red-600-main)  ← alias
        var nestedResults = processColorModeTokens(value, currentPath, prefix);
        Object.assign(result, nestedResults);
        var mainVarName = toCSSVariable("".concat(currentPath, ".main"), {
          prefix: prefix
        }); // --tonic-colors-red-600: var(--tonic-colors-red-600-main)
        result[currentPath] = "var(".concat(mainVarName, ")");
      } else {
        // Recursively process nested objects (not a complete _dark/_light structure)
        var _nestedResults = processColorModeTokens(value, currentPath, prefix);
        Object.assign(result, _nestedResults);
      }
    } else {
      // Regular value, assign directly
      result[currentPath] = value;
    }
  }
  return result;
};

/**
 * Generates CSS variables from a theme object.
 *
 * @param {{ [key: string]: * }} theme - The theme object containing key-value pairs for the variables.
 * @param {{ prefix?: string }} [options] - Optional configuration for variable generation.
 * @param {string} [options.prefix] - A prefix to prepend to each generated CSS variable.
 *
 * @example
 * ```js
 * const theme = {
 *   colors: {
 *     'blue:50': '#578aef',
 *   },
 * };
 * mapThemeToCSSVariables(theme, { prefix: 'tonic' });
 * // => {
 * //   '--tonic-colors-blue-50': '#578aef'
 * // }
 * ```
 */
var mapThemeToCSSVariables = function mapThemeToCSSVariables(theme, options) {
  var prefix = ensureString(options === null || options === void 0 ? void 0 : options.prefix);

  // Process _dark/_light structure and generate base variables
  var processedTokens = processColorModeTokens(theme, '', prefix);
  var cssVariables = {};
  for (var _i2 = 0, _Object$entries2 = Object.entries(processedTokens); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray$3(_Object$entries2[_i2], 2),
      name = _Object$entries2$_i[0],
      value = _Object$entries2$_i[1];
    if (!name) {
      // Skip if name is empty
      continue;
    }
    var variable = toCSSVariable(name, {
      prefix: prefix
    });
    cssVariables[variable] = value;
  }
  return cssVariables;
};

var _excluded$1 = ["cssVariables"];
var defaultCSSVariablePrefix = 'tonic';
var defaultCSSVariableRootSelector = ':root';

/**
 * @typedef {Object} CSSVariableConfig
 * @property {string} [prefix='tonic'] - Custom prefix for CSS variables.
 * @property {string} [rootSelector=':root'] - Root selector where CSS variables are defined.
 */

/**
 * @typedef {Object} CreateThemeOptions
 * @property {CSSVariableConfig} [cssVariables={}] - CSS variables configuration. CSS variables are generated by default. To apply them at runtime, pass `useCSSVariables` to `TonicProvider`.
 */

/**
 * Creates a theme object with CSS variable configuration.
 *
 * To enable CSS variables, pass `useCSSVariables` to `TonicProvider`:
 * ```jsx
 * <TonicProvider theme={theme} useCSSVariables>
 *   {children}
 * </TonicProvider>
 * ```
 *
 * @param {CreateThemeOptions & ThemeScales} [options={}] - Theme configuration options.
 * @param {...ThemeScales} args - Additional theme objects to merge.
 * @returns {ThemeScales & { cssVariablePrefix: string, cssVariables: ThemeScales, rootSelector: string }} The created theme object with CSS variables, prefix, and root selector.
 */
var createTheme = function createTheme() {
  var _cssVariableConfig$pr, _cssVariableConfig$ro;
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$cssVariables = options.cssVariables,
    cssVariableConfig = _options$cssVariables === void 0 ? {} : _options$cssVariables,
    rest = _objectWithoutProperties(options, _excluded$1);
  if (typeof cssVariableConfig === 'boolean') {
    console.warn('[Tonic One] The "cssVariables" option in createTheme() no longer accepts a boolean value.\n' + '\n' + 'To enable CSS variables, you should pass "useCSSVariables" to TonicProvider:\n' + '  <TonicProvider theme={theme} useCSSVariables>\n' + '\n' + 'To customize CSS variable configuration, pass a configuration object:\n' + '  createTheme({ cssVariables: { prefix: "tonic", rootSelector: ":root" } })');
  }
  var theme = merge(_objectSpread2$4({}, theme$1), rest);

  // Merge additional arguments into the theme
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  theme = args.reduce(function (acc, arg) {
    return merge(acc, arg);
  }, theme);

  // Resolve token references (e.g., {colors.primary} → actual value)
  // Note: Preserves _dark/_light structure for color mode handling
  theme = resolveTheme(theme);

  // Configure the prefix and root selector for CSS variables
  var cssVariablePrefix = (_cssVariableConfig$pr = cssVariableConfig === null || cssVariableConfig === void 0 ? void 0 : cssVariableConfig.prefix) !== null && _cssVariableConfig$pr !== void 0 ? _cssVariableConfig$pr : defaultCSSVariablePrefix;
  var rootSelector = (_cssVariableConfig$ro = cssVariableConfig === null || cssVariableConfig === void 0 ? void 0 : cssVariableConfig.rootSelector) !== null && _cssVariableConfig$ro !== void 0 ? _cssVariableConfig$ro : defaultCSSVariableRootSelector;

  // Generate a theme object filtered to include only scales supported by CSS variables
  var cssVariableScales = Object.keys(theme$1);
  var cssVariableTheme = Object.fromEntries(Object.entries(ensurePlainObject(theme)).filter(function (_ref) {
    var _ref2 = _slicedToArray$3(_ref, 1),
      key = _ref2[0];
    return cssVariableScales.includes(key);
  }));

  // Create CSS variables with the appropriate prefix (preserve _dark/_light structure for CSS variables)
  // Frozen so the shared map cannot be mutated by consumers — it's a flat name→value map, so a shallow freeze suffices.
  var cssVariables = Object.freeze(mapThemeToCSSVariables(cssVariableTheme, {
    prefix: cssVariablePrefix
  }));
  Object.defineProperties(theme, _defineProperty$4(_defineProperty$4(_defineProperty$4(_defineProperty$4({}, TONIC_THEME, {
    value: true,
    enumerable: false
  }), "cssVariablePrefix", {
    value: cssVariablePrefix,
    enumerable: true
  }), "cssVariables", {
    value: cssVariables,
    enumerable: true
  }), "rootSelector", {
    value: rootSelector,
    enumerable: true
  }));
  return theme;
};
var createTheme$1 = createTheme;

var theme = createTheme$1();
var defaultTheme = theme;

var ThemeProvider = function ThemeProvider(_ref) {
  var children = _ref.children,
    themeProp = _ref.theme,
    _ref$useCSSVariables = _ref.useCSSVariables,
    useCSSVariables = _ref$useCSSVariables === void 0 ? false : _ref$useCSSVariables;
  var theme = __mf_34(function () {
    var baseTheme = defaultTheme;
    if (!isNullish(themeProp)) {
      baseTheme = themeProp[TONIC_THEME] === true ? themeProp : createTheme$1(themeProp);
    }
    return _objectSpread2$4(_objectSpread2$4({}, baseTheme), {}, {
      useCSSVariables: useCSSVariables
    });
  }, [themeProp, useCSSVariables]);
  return jsx(ThemeProvider$2, {
    theme: theme,
    children: jsx(DefaultPropsProvider$1, {
      value: theme === null || theme === void 0 ? void 0 : theme.components,
      children: children
    })
  });
};
ThemeProvider.displayName = 'ThemeProvider';
var ThemeProvider$1 = ThemeProvider;

var _excluded = ["children", "colorMode", "colorStyle", "environment", "theme", "useCSSBaseline", "useCSSVariables"];
var TonicProvider = function TonicProvider2(_ref) {
  var children = _ref.children, _ref$colorMode = _ref.colorMode, colorModeProps = _ref$colorMode === void 0 ? {} : _ref$colorMode, _ref$colorStyle = _ref.colorStyle, colorStyleProps = _ref$colorStyle === void 0 ? {} : _ref$colorStyle, _ref$environment = _ref.environment, environmentProps = _ref$environment === void 0 ? {} : _ref$environment, theme = _ref.theme, _ref$useCSSBaseline = _ref.useCSSBaseline, useCSSBaseline = _ref$useCSSBaseline === void 0 ? false : _ref$useCSSBaseline, _ref$useCSSVariables = _ref.useCSSVariables, useCSSVariables = _ref$useCSSVariables === void 0 ? false : _ref$useCSSVariables; _objectWithoutProperties(_ref, _excluded);
  useOnceWhen$1(function() {
    console.error('TonicProvider: "useCssBaseline" is not a valid prop. Did you mean "useCSSBaseline"?');
  }, false);
  useOnceWhen$1(function() {
    console.error('TonicProvider: "useCssVariables" is not a valid prop. Did you mean "useCSSVariables"?');
  }, false);
  useOnceWhen$1(function() {
    console.error('TonicProvider: "colorMode" prop must be an object if provided.');
  }, !isPlainObject$1(colorModeProps));
  useOnceWhen$1(function() {
    console.error('TonicProvider: "colorStyle" prop must be an object if provided.');
  }, !isPlainObject$1(colorStyleProps));
  useOnceWhen$1(function() {
    console.error('TonicProvider: "environment" prop must be an object if provided.');
  }, !isPlainObject$1(environmentProps));
  useOnceWhen$1(function() {
    console.error('TonicProvider: "theme" prop should be created using createTheme() for optimal performance. Pass a stable reference to avoid re-running createTheme() on every render.');
  }, false);
  return (
    // useCSSVariables serves two purposes:
    // 1. Pass to ThemeProvider to inject into the theme — styled-system reads theme.useCSSVariables
    //    to decide whether to output var(--tonic-...) references instead of raw token values.
    // 2. Render <CSSVariables />, which injects the CSS variable definitions into the DOM.
    jsx(EnvironmentProvider$1, _objectSpread2$4(_objectSpread2$4({}, environmentProps), {}, {
      children: jsxs(ThemeProvider$1, {
        theme,
        useCSSVariables,
        children: [!!useCSSBaseline && jsx(CSSBaseline$1, {}), !!useCSSVariables && jsx(CSSVariables$1, {}), jsx(ColorModeProvider$1, _objectSpread2$4(_objectSpread2$4({}, colorModeProps), {}, {
          children: jsx(ColorStyleProvider$1, _objectSpread2$4(_objectSpread2$4({}, colorStyleProps), {}, {
            children
          }))
        }))]
      })
    }))
  );
};
var TonicProvider$1 = TonicProvider;

// Deterministic synthetic device inventory — shared between module-federation and wujie demos.
//
// Deterministic on purpose: a seeded LCG (no Date.now / Math.random) so the demo
// renders the same rows every time and tests are stable. ~10k rows is enough to
// make DataGrid virtualization meaningful (only visible rows should hit the DOM).
//
// Realistic data model:
//   1. OS type vs OS name: "Windows 10" / "Windows 11" belong to the same OS
//      type ("Windows") and share one agent binary family. Each OS TYPE (Windows,
//      macOS, Linux) ships a separate agent binary, so "latest version" build
//      numbers differ per type.
//   2. "Unknown" means the agent stopped reporting. When Unknown: agentVersion is
//      null (the server has no version data) and lastSeenMinutes is large (7+ days).

// ── Version series helper ─────────────────────────────────────────────────────

/**
 * Build a weighted OS name list from a version range.
 *
 * Weight peaks at `peakIdx` (the most-deployed version in real fleets).
 * Older versions decay linearly; newer versions decay faster because enterprise
 * adoption always lags behind the latest release.
 *
 * @param {string}          prefix   - e.g. 'macOS', 'Ubuntu', 'RHEL'
 * @param {Array<string|number>} versions - ordered oldest → newest
 * @param {number}          peakIdx  - index of the most-deployed version
 * @param {number}          step     - weight lost per step away from peak
 */
function versionSeries(prefix, versions, peakIdx, step = 12) {
  return versions.map((v, i) => {
    const dist = i - peakIdx;
    // Newer-than-peak versions lose weight 1.5× faster (enterprise lags releases).
    const penalty = dist > 0 ? dist * step * 1.5 : Math.abs(dist) * step;
    return { name: `${prefix} ${v}`, weight: Math.max(1, 40 - penalty) };
  });
}

// ── OS taxonomy ───────────────────────────────────────────────────────────────

// Each OS type ships its own agent binary. "Latest" and "Controlled latest"
// build numbers are fixed per type — all up-to-date machines of the same type
// show the same version string, matching real endpoint security deployments.
//
// `weight` on an OS type controls how often that platform is picked overall.
// `names` uses `{ name, weight }` entries so pickWeighted() handles distribution.
const OS_TYPES = [
  {
    type: 'Windows',
    weight: 60, // dominant in enterprise fleets
    // Windows has a heterogeneous mix (desktop / server), so names are
    // defined explicitly rather than generated from a version series.
    // Distribution reflects June 2026: Win10 went EOL Oct 2025, Win11 now dominant.
    // Many enterprises still running Win10 (LTSC or migration in progress).
    names: [
      { name: 'Windows 11', weight: 55 }, // dominant post-Win10 EOL
      { name: 'Windows 10', weight: 25 }, // EOL Oct 2025, enterprises still migrating
      { name: 'Windows Server 2022', weight: 8 }, // current enterprise standard
      { name: 'Windows Server 2019', weight: 7 }, // established, very common in prod
      { name: 'Windows Server 2025', weight: 3 }, // newer deployments
      { name: 'Windows Server 2016', weight: 2 }, // legacy, EOL Jan 2022, still lingers
    ],
    latestBuild: 9050, // the current GA build for Windows
    controlledBuild: 8659, // the IT-pinned "controlled latest" build
    outdatedBuildMin: 1000,
    outdatedBuildMax: 7500,
  },
  {
    type: 'macOS',
    weight: 25,
    // Sequential version numbers → versionSeries() with peak at Sonoma (14).
    // Sequoia (15) is just GA so adoption is still low in corporate fleets.
    names: versionSeries('macOS', [12, 13, 14, 15], 2),
    latestBuild: 6215,
    controlledBuild: 5944,
    outdatedBuildMin: 1000,
    outdatedBuildMax: 5500,
  },
  {
    type: 'Linux',
    weight: 15,
    // Combine Ubuntu LTS (biennial), RHEL, and other distros. Each sub-series
    // peaks at its current most-deployed version in enterprise environments.
    names: [
      ...versionSeries('Ubuntu', ['20.04', '22.04', '24.04'], 1), // 22.04 LTS is the peak
      ...versionSeries('RHEL', [8, 9], 1), // RHEL 9 is the current standard
      { name: 'Debian 12', weight: 5 },
      { name: 'CentOS 7', weight: 5 }, // EOL, still lingers in legacy infra
    ],
    latestBuild: 7388,
    controlledBuild: 7100,
    outdatedBuildMin: 1000,
    outdatedBuildMax: 6800,
  },
];

const RISKS = ['Critical', 'High', 'Medium', 'Low'];

// Statuses that only apply to agents actively reporting back.
const REACHABLE_STATUSES = [
  'Latest version',
  'Controlled latest version',
  'Update recommended',
];

const PATTERN_NAMES = [
  'Smart Scan Agent Pattern',
  'Virus Pattern',
  'IntelliTrap Pattern',
  'Spyware Active-monitoring Pattern',
];

// ── LCG RNG ───────────────────────────────────────────────────────────────────

// Linear congruential generator (numerical-recipes constants) seeded to a fixed value.
function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

// Weighted pick: each item must have a `weight` property.
// Weights are relative — they don't need to sum to any fixed value.
function pickWeighted(rng, items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let r = rng() * total;
  for (const item of items) {
    r -= item.weight;
    if (r < 0) {
      return item;
    }
  }
  return items[items.length - 1];
}

// ── Version helpers ───────────────────────────────────────────────────────────

// All platforms share major version 14 (product generation).
// The build number differs per OS type (each ships its own binary).
function makeVersionForStatus(rng, cfg, status) {
  let build;
  if (status === 'Latest version') {
    build = cfg.latestBuild;
  } else if (status === 'Controlled latest version') {
    build = cfg.controlledBuild;
  } else {
    // "Update recommended" — random older build within the outdated range.
    const span = cfg.outdatedBuildMax - cfg.outdatedBuildMin;
    build = cfg.outdatedBuildMin + Math.floor(rng() * span);
  }
  return `14.0.0.${build}`;
}

// ── Last-seen helpers ─────────────────────────────────────────────────────────

const SEVEN_DAYS_MIN = 7 * 24 * 60;

// Buckets mirror real fleet behavior: most agents report frequently;
// only ~15% go silent long enough to become Unknown.
const LAST_SEEN_BUCKETS = [
  { weight: 20, min: 0, max: 60 }, // < 1 h — servers, always-on
  { weight: 30, min: 60, max: 24 * 60 }, // 1 h–1 d — normal laptop cadence
  { weight: 25, min: 24 * 60, max: 3 * 24 * 60 }, // 1–3 d — off overnight / weekends
  { weight: 10, min: 3 * 24 * 60, max: SEVEN_DAYS_MIN }, // 3–7 d — traveling / part-time
  { weight: 15, min: SEVEN_DAYS_MIN, max: 90 * 24 * 60 }, // 7–90 d — stale → Unknown
];

function makeLastSeenMinutes(rng) {
  const bucket = pickWeighted(rng, LAST_SEEN_BUCKETS);
  return bucket.min + Math.floor(rng() * (bucket.max - bucket.min));
}

// ── Out-of-date pattern entries ───────────────────────────────────────────────

function makeOutOfDatePatterns(rng) {
  const count = rng() < 0.5 ? 1 : 2;
  const entries = [];
  for (let j = 0; j < count; j += 1) {
    const minor = 100 + Math.floor(rng() * 900);
    entries.push({ name: pick(rng, PATTERN_NAMES), version: `17.${minor}.00` });
  }
  return entries;
}

// ── Row generator ─────────────────────────────────────────────────────────────

/**
 * Generate `count` device rows.
 *
 * Row shape:
 *   { id, hostname, osType, os, risk, lastSeenMinutes,
 *     agentVersionStatus, agentVersion, outOfDatePatterns }
 *
 * - `osType`       — 'Windows' | 'macOS' | 'Linux' (for grouping/filtering)
 * - `os`           — display name, e.g. 'Windows 11'
 * - `agentVersion` — null when status is 'Unknown' (agent not reporting)
 */
function generateDevices(count = 10000) {
  const rng = makeRng(20260619);
  const rows = new Array(count);

  for (let i = 0; i < count; i += 1) {
    const n = String(i + 1).padStart(5, '0');
    const cfg = pickWeighted(rng, OS_TYPES);
    const os = pickWeighted(rng, cfg.names).name;
    const risk = pick(rng, RISKS);
    const lastSeenMinutes = makeLastSeenMinutes(rng);

    // Agents silent for 7+ days cannot report their version — status is Unknown.
    const isStale = lastSeenMinutes >= SEVEN_DAYS_MIN;
    const agentVersionStatus = isStale ? 'Unknown' : pick(rng, REACHABLE_STATUSES);
    const agentVersion = isStale ? null : makeVersionForStatus(rng, cfg, agentVersionStatus);
    const outOfDatePatterns =
      agentVersionStatus === 'Update recommended' ? makeOutOfDatePatterns(rng) : [];

    rows[i] = {
      id: `dev-${n}`,
      hostname: `host-${n}`,
      osType: cfg.type,
      os,
      risk,
      lastSeenMinutes,
      agentVersionStatus,
      agentVersion,
      outOfDatePatterns,
    };
  }

  return rows;
}

// ── Mock API ──────────────────────────────────────────────────────────────────

// Pre-generate once at module load; all API calls serve from this in-memory dataset.
const _devices = generateDevices(10000);

/**
 * Mock API for the Inventory micro-app.
 *
 * Every method returns a Promise so callers are structured identically to real
 * fetch-based API calls. Swapping this module for a real HTTP client requires
 * no changes to the calling components.
 */
const inventoryApi = {
  /** Returns { items: Device[], total: number } */
  getDevices() {
    return Promise.resolve({ items: _devices, total: _devices.length });
  },

  /** Returns a single Device by id. Rejects if not found. */
  getDevice(id) {
    const device = _devices.find((d) => d.id === id);
    if (!device) {
      return Promise.reject(new Error(`Device not found: ${id}`));
    }
    return Promise.resolve(device);
  },
};
[...REACHABLE_STATUSES, 'Unknown'];
OS_TYPES.map((t) => t.type);

const URGENCY = [
  "Update recommended",
  "Unknown",
  "Controlled latest version",
  "Latest version"
];
const STATUS_COLOR = {
  "Update recommended": "warning.icon",
  "Unknown": "neutral.icon",
  "Controlled latest version": "info.icon",
  "Latest version": "success.icon"
};
function App() {
  const [rows, setRows] = __mf_38([]);
  __mf_28(() => {
    inventoryApi.getDevices().then(({ items }) => setRows(items));
  }, []);
  const counts = {};
  for (const status of URGENCY) {
    counts[status] = 0;
  }
  for (const d of rows) {
    const s = d.agentVersionStatus;
    if (counts[s] !== void 0) {
      counts[s] += 1;
    }
  }
  const total = rows.length;
  const updateCount = counts["Update recommended"];
  return /* @__PURE__ */ __mf_2(
    Box,
    {
      sx: {
        backgroundColor: "background.primary",
        border: 1,
        borderColor: "border.secondary",
        borderRadius: "md",
        px: "4x",
        py: "3x",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      },
      children: [
        /* @__PURE__ */ __mf_1(Text$1, { sx: { fontSize: "sm", color: "text.secondary", mb: "2x" }, children: "Endpoint update status" }),
        /* @__PURE__ */ __mf_1(Text$1, { sx: { fontSize: "3xl", fontWeight: "semibold", color: "text.primary", lineHeight: 1 }, children: updateCount.toLocaleString() }),
        /* @__PURE__ */ __mf_1(Text$1, { sx: { fontSize: "sm", color: "text.secondary", mt: "2x" }, children: "devices need an update" }),
        /* @__PURE__ */ __mf_2(Flex$1, { sx: { flex: 1, flexDirection: "column", justifyContent: "center", mt: "3x" }, children: [
          /* @__PURE__ */ __mf_1(
            Flex$1,
            {
              sx: {
                width: "100%",
                height: "10px",
                borderRadius: "full",
                overflow: "hidden",
                mb: "3x"
              },
              children: URGENCY.map((status) => {
                const pct = total > 0 ? counts[status] / total * 100 : 0;
                if (pct === 0) {
                  return null;
                }
                return /* @__PURE__ */ __mf_1(
                  Box,
                  {
                    sx: { width: `${pct}%`, height: "100%", backgroundColor: STATUS_COLOR[status] }
                  },
                  status
                );
              })
            }
          ),
          /* @__PURE__ */ __mf_1(Flex$1, { sx: { flexDirection: "column", rowGap: "1x" }, children: URGENCY.map((status) => /* @__PURE__ */ __mf_2(Flex$1, { sx: { alignItems: "center", columnGap: "2x" }, children: [
            /* @__PURE__ */ __mf_1(
              Box,
              {
                sx: {
                  width: "8px",
                  height: "8px",
                  borderRadius: "full",
                  flexShrink: 0,
                  backgroundColor: STATUS_COLOR[status]
                }
              }
            ),
            /* @__PURE__ */ __mf_1(Text$1, { sx: { fontSize: "xs", color: "text.secondary", flex: 1 }, children: status }),
            /* @__PURE__ */ __mf_1(Text$1, { sx: { fontSize: "xs", color: "text.primary", fontWeight: "medium" }, children: counts[status].toLocaleString() })
          ] }, status)) })
        ] })
      ]
    }
  );
}

const cache = createCache({ key: "widget-updates", prepend: true });
function RemoteApp({ colorMode = "light" }) {
  return /* @__PURE__ */ __mf_1(CacheProvider, { value: cache, children: /* @__PURE__ */ __mf_1(TonicProvider$1, { colorMode: { value: colorMode }, children: /* @__PURE__ */ __mf_1(App, {}) }) });
}

export { RemoteApp as default };
