"use strict";

/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */

(function (global, factory) {

	if (typeof module === "object" && typeof module.exports === "object") {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};

	var version = "2.2.4",


	// Define a local copy of jQuery
	jQuery = function (selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([\da-z])/gi,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function (all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function () {
			return slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function (num) {
			return num != null ?

			// Return just the one element from the set
			num < 0 ? this[num + this.length] : this[num] :

			// Return all the elements in a clean array
			slice.call(this);
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function (elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function (callback) {
			return jQuery.each(this, callback);
		},

		map: function (callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function () {
			return this.pushStack(slice.apply(this, arguments));
		},

		first: function () {
			return this.eq(0);
		},

		last: function () {
			return this.eq(-1);
		},

		eq: function (i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function () {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function (msg) {
			throw new Error(msg);
		},

		noop: function () {},

		isFunction: function (obj) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function (obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function (obj) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
		},

		isPlainObject: function (obj) {
			var key;

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
				return false;
			}

			// Not own constructor property must be Object
			if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for (key in obj) {}

			return key === undefined || hasOwn.call(obj, key);
		},

		isEmptyObject: function (obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function (obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function (code) {
			var script,
			    indirect = eval;

			code = jQuery.trim(code);

			if (code) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if (code.indexOf("use strict") === 1) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild(script).parentNode.removeChild(script);
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect(code);
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function (string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		nodeName: function (elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function (obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function (text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function (arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function (elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		merge: function (first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function (elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function (elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function (fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = slice.call(arguments, 2);
			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.2.1
  * http://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2015-10-17
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function (a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function (list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,
		    rescape = /'|\\/g,


		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function (_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function () {
			setDocument();
		};

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    nidselect,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rescape, "\\$&");
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
							while (i--) {
								groups[i] = nidselect + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created div and expects a boolean result
   */
		function assert(fn) {
			var div = document.createElement("div");

			try {
				return !!fn(div);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (div.parentNode) {
					div.parentNode.removeChild(div);
				}
				// release memory in IE
				div = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    parent,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if ((parent = document.defaultView) && parent.top !== parent) {
				// Support: IE 11
				if (parent.addEventListener) {
					parent.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (parent.attachEvent) {
					parent.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (div) {
				div.className = "i";
				return !div.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (div) {
				div.appendChild(document.createComment(""));
				return !div.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (div) {
				docElem.appendChild(div).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID find and filter
			if (support.getById) {
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var m = context.getElementById(id);
						return m ? [m] : [];
					}
				};
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
			} else {
				// Support: IE6/7
				// getElementById is not reliable as a find shortcut
				delete Expr.find["ID"];

				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See http://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (div) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// http://bugs.jquery.com/ticket/12359
					docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (div.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!div.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibing-combinator selector` fails
					if (!div.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (div) {
					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					div.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (div.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (!div.querySelectorAll(":enabled").length) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (div) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(div, "div");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function (match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function (match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function (match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function (nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function (className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function (name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function (type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function (pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function (elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function (elem) {
					return elem === docElem;
				},

				"focus": function (elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": function (elem) {
					return elem.disabled === false;
				},

				"disabled": function (elem) {
					return elem.disabled === true;
				},

				"checked": function (elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function (elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function (elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function (elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function (elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function (elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function (elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function (elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    checkNonElements = base && dir === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[dir] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function (seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (div1) {
			// Should return 1, but returns 4 (following)
			return div1.compareDocumentPosition(document.createElement("div")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (div) {
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (div) {
			div.innerHTML = "<input/>";
			div.firstChild.setAttribute("value", "");
			return div.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (div) {
			return div.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;

	var dir = function (elem, dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var siblings = function (n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				/* jshint -W018 */
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		if (typeof qualifier === "string") {
			if (risSimple.test(qualifier)) {
				return jQuery.filter(qualifier, elements, not);
			}

			qualifier = jQuery.filter(qualifier, elements);
		}

		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function (selector) {
			var i,
			    len = this.length,
			    ret = [],
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function (selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function (selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function (selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if (elem && elem.parentNode) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function (target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function (selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;

			for (; i < l; i++) {
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

					// Always skip document fragments
					if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

						matched.push(cur);
						break;
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function (elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function (selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function (selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function (elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function (elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function (elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function (elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function (elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function (elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function (elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function (elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function (elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function (elem) {
			return siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function (elem) {
			return siblings(elem.firstChild);
		},
		contents: function (elem) {
			return elem.contentDocument || jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnotwhite = /\S+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		fired,


		// Flag to prevent firing
		locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function () {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function () {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function () {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function (fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function () {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function () {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function () {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function () {
				locked = queue = [];
				if (!memory) {
					list = memory = "";
				}
				return this;
			},
			locked: function () {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function (context, args) {
				if (!locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function () {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function () {
				return !!fired;
			}
		};

		return self;
	};

	jQuery.extend({

		Deferred: function (func) {
			var tuples = [

			// action, add listener, listener list, final state
			["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]],
			    state = "pending",
			    promise = {
				state: function () {
					return state;
				},
				always: function () {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				then: function () /* fnDone, fnFail, fnProgress */{
					var fns = arguments;
					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {
							var fn = jQuery.isFunction(fns[i]) && fns[i];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function (obj) {
					return obj != null ? jQuery.extend(obj, promise) : promise;
				}
			},
			    deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[3];

				// promise[ done | fail | progress ] = list.add
				promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = [ resolved | rejected ]
						state = stateString;

						// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock);
				}

				// deferred[ resolve | reject | notify ]
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function (subordinate /* , ..., subordinateN */) {
			var i = 0,
			    resolveValues = slice.call(arguments),
			    length = resolveValues.length,


			// the count of uncompleted subordinates
			remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,


			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),


			// Update function for both resolve and progress values
			updateFunc = function (i, contexts, values) {
				return function (value) {
					contexts[i] = this;
					values[i] = arguments.length > 1 ? slice.call(arguments) : value;
					if (values === progressValues) {
						deferred.notifyWith(contexts, values);
					} else if (! --remaining) {
						deferred.resolveWith(contexts, values);
					}
				};
			},
			    progressValues,
			    progressContexts,
			    resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues);
			}

			return deferred.promise();
		}
	});

	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function (fn) {

		// Add the callback
		jQuery.ready.promise().done(fn);

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function (hold) {
			if (hold) {
				jQuery.readyWait++;
			} else {
				jQuery.ready(true);
			}
		},

		// Handle when the DOM is ready
		ready: function (wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);

			// Trigger any bound ready events
			if (jQuery.fn.triggerHandler) {
				jQuery(document).triggerHandler("ready");
				jQuery(document).off("ready");
			}
		}
	});

	/**
  * The ready event handler and self cleanup method
  */
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	jQuery.ready.promise = function (obj) {
		if (!readyList) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout(jQuery.ready);
			} else {

				// Use the handy event callback
				document.addEventListener("DOMContentLoaded", completed);

				// A fallback to window.onload, that will always work
				window.addEventListener("load", completed);
			}
		}
		return readyList.promise(obj);
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function (elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		return chainable ? elems :

		// Gets
		bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function (owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function (owner, initial) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if (owner.nodeType) {
				owner[this.expando] = value;

				// Otherwise secure it in a non-enumerable, non-writable property
				// configurability must be true to allow the property to be
				// deleted with the delete operator
			} else {
				Object.defineProperty(owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				});
			}
			return owner[this.expando];
		},
		cache: function (owner) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if (!acceptData(owner)) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function (owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			if (typeof data === "string") {
				cache[data] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[prop] = data[prop];
				}
			}
			return cache;
		},
		get: function (owner, key) {
			return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
		},
		access: function (owner, key, value) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				stored = this.get(owner, key);

				return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function (owner, key) {
			var i,
			    name,
			    camel,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key === undefined) {
				this.register(owner);
			} else {

				// Support array or space separated string of keys
				if (jQuery.isArray(key)) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat(key.map(jQuery.camelCase));
				} else {
					camel = jQuery.camelCase(key);

					// Try the string as a key before any manipulation
					if (key in cache) {
						name = [key, camel];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ? [name] : name.match(rnotwhite) || [];
					}
				}

				i = name.length;

				while (i--) {
					delete cache[name[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function (owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = data === "true" ? true : data === "false" ? false : data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function (elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function (elem, name, data) {
			return dataUser.access(elem, name, data);
		},

		removeData: function (elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function (elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function (elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function (key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if (typeof key === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get(elem, key) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());

					if (data !== undefined) {
						return data;
					}

					camelKey = jQuery.camelCase(key);

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get(elem, camelKey);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, camelKey, undefined);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase(key);
				this.each(function () {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get(this, camelKey);

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set(this, camelKey, value);

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if (key.indexOf("-") > -1 && data !== undefined) {
						dataUser.set(this, key, value);
					}
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function (key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function (elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function (elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function () {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function (elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function (type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function (type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function (type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function (type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function () {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHidden = function (elem, el) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([\w:-]+)/;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];

		return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if (typeof types === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function (event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function (elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function (elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function (event) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix(event);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue = [],
			    args = slice.call(arguments),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function (event, handlers) {
			var i,
			    matches,
			    sel,
			    handleObj,
			    handlerQueue = [],
			    delegateCount = handlers.delegateCount,
			    cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matches[sel]) {
								matches.push(handleObj);
							}
						}
						if (matches.length) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if (delegateCount < handlers.length) {
				handlerQueue.push({ elem: this, handlers: handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (event, original) {

				// Add which for key events
				if (event.which == null) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
			filter: function (event, original) {
				var eventDoc,
				    doc,
				    body,
				    button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if (!event.which && button !== undefined) {
					event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
				}

				return event;
			}
		},

		fix: function (event) {
			if (event[jQuery.expando]) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i,
			    prop,
			    copy,
			    type = event.type,
			    originalEvent = event,
			    fixHook = this.fixHooks[type];

			if (!fixHook) {
				this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

			event = new jQuery.Event(originalEvent);

			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if (!event.target) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function () {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function () {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function (event) {
					return jQuery.nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function (event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android<4.0
			src.returnValue === false ? returnTrue : returnFalse;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function () {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function () {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function () {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function (event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({
		on: function (types, selector, data, fn) {
			return on(this, types, selector, data, fn);
		},
		one: function (types, selector, data, fn) {
			return on(this, types, selector, data, fn, 1);
		},
		off: function (types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if (typeof types === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,


	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Manipulating tables requires a tbody
	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function (html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function (elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function (elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function (selector) {
			return remove(this, selector, true);
		},

		remove: function (selector) {
			return remove(this, selector);
		},

		text: function (value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function () {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function () {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function () {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function () {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function () {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function (dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function (value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function () {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});

	var iframe,
	    elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

	/**
  * Retrieve the actual display of a element
  * @param {String} name nodeName of the element
  * @param {Object} doc Document object
  */

	// Called only from within defaultDisplay
	function actualDisplay(name, doc) {
		var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
		    display = jQuery.css(elem[0], "display");

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
  * Try to determine the default display value of an element
  * @param {String} nodeName
  */
	function defaultDisplay(nodeName) {
		var doc = document,
		    display = elemdisplay[nodeName];

		if (!display) {
			display = actualDisplay(nodeName, doc);

			// If the simple way fails, read from inside an iframe
			if (display === "none" || !display) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[0].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay(nodeName, doc);
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[nodeName] = display;
		}

		return display;
	}
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function (elem) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	var swap = function (elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	var documentElement = document.documentElement;

	(function () {
		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);
		}

		jQuery.extend(support, {
			pixelPosition: function () {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function () {
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function () {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function () {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function () {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
				    marginDiv = div.appendChild(document.createElement("div"));

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild(container);

				ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);

				documentElement.removeChild(container);
				div.removeChild(marginDiv);

				return ret;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,
		    style = elem.style;

		computed = computed || getStyles(elem);
		ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
			ret = jQuery.style(elem, name);
		}

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if (computed) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function () {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "O", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,
		    val = 0;

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
		    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		    styles = getStyles(elem),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if (val <= 0 || val == null) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name];
			}

			// Computed unit is not pixels. Stop here and return.
			if (rnumnonpx.test(val)) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

			// Normalize "", auto, and prepare for extra
			val = parseFloat(val) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    hidden,
		    values = [],
		    index = 0,
		    length = elements.length;

		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			values[index] = dataPriv.get(elem, "olddisplay");
			display = elem.style.display;
			if (show) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if (!values[index] && display === "none") {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if (elem.style.display === "" && isHidden(elem)) {
					values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			} else {
				hidden = isHidden(elem);

				if (display !== "none" || !hidden) {
					dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") {
				elem.style.display = show ? values[index] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function (elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function (elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    style = elem.style;

			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					style[name] = value;
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function (elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name);

			// Make sure that we're working with the right name
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function (elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function (elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
		if (computed) {
			return swap(elem, { "display": "inline-block" }, curCSS, [elem, "marginRight"]);
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function (value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function (name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		},
		show: function () {
			return showHide(this, true);
		},
		hide: function () {
			return showHide(this);
		},
		toggle: function (state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHidden(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function (elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function () {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function (percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function (tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function (tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function (tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function (p) {
			return p;
		},
		swing: function (p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    timerId,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		/* jshint validthis: true */
		var prop,
		    value,
		    toggle,
		    tween,
		    hooks,
		    oldfire,
		    display,
		    checkDisplay,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHidden(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Handle queue: false promises
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css(elem, "display");

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

			if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
				style.display = "inline-block";
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// show/hide pass
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.exec(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

				// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if (!jQuery.isEmptyObject(orig)) {
			if (dataShow) {
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access(elem, "fxshow", {});
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if (toggle) {
				dataShow.hidden = !hidden;
			}
			if (hidden) {
				jQuery(elem).show();
			} else {
				anim.done(function () {
					jQuery(elem).hide();
				});
			}
			anim.done(function () {
				var prop;

				dataPriv.remove(elem, "fxshow");
				for (prop in orig) {
					jQuery.style(elem, prop, orig[prop]);
				}
			});
			for (prop in orig) {
				tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

			// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
			style.display = display;
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function () {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			if (percent < 1 && length) {
				return remaining;
			} else {
				deferred.resolveWith(elem, [animation]);
				return false;
			}
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function (prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function (gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		// attach callbacks from options
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
	}

	jQuery.Animation = jQuery.extend(Animation, {
		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function (props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnotwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function (callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function (speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHidden).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function (prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function () {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function (type, clearQueue, gotoEnd) {
			var stopQueue = function (hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function (type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Checks the timer has not already been removed
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (!timerId) {
			timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
		}
	};

	jQuery.fx.stop = function () {
		window.clearInterval(timerId);

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function (name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function (name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function (elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function (elem, value) {
					if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function (elem, value) {
			var name,
			    propName,
			    i = 0,
			    attrNames = value && value.match(rnotwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					propName = jQuery.propFix[name] || name;

					// Boolean attributes get special treatment (#10870)
					if (jQuery.expr.match.bool.test(name)) {

						// Set corresponding property to false
						elem[propName] = false;
					}

					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function (elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret, handle;
			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[name];
				attrHandle[name] = ret;
				ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
				attrHandle[name] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function (name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function (name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function (elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function (elem) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function (elem) {
				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function (elem) {
				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	var rclass = /[\t\r\n\f]/g;

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function (value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function (value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnotwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function (value, stateVal) {
			var type = typeof value;

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnotwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function (selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g,
	    rspaces = /[\x20\t\r\n\f]+/g;

	jQuery.fn.extend({
		val: function (value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace(rreturn, "") :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (jQuery.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function (elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
				}
			},
			select: {
				get: function (elem) {
					var value,
					    option,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one" || index < 0,
					    values = one ? null : [],
					    max = one ? index + 1 : options.length,
					    i = index < 0 ? max : one ? index : 0;

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) && (

						// Don't return options that are disabled or in a disabled optgroup
						support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function (elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];
						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function (elem, value) {
				if (jQuery.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function (event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function (type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function (type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function (type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function (fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function (event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function () {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function () {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function (data) {
		return JSON.parse(data + "");
	};

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE9
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rhash = /#.*$/,
	    rts = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function (target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function (url, options) {

			// If url is an object, simulate pre-1.5 signature
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// The jqXHR state
			state = 0,


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function (key) {
					var match;
					if (state === 2) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function () {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function (name, value) {
					var lname = name.toLowerCase();
					if (!state) {
						name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function (type) {
					if (!state) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function (map) {
					var code;
					if (map) {
						if (state < 2) {
							for (code in map) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[code] = [statusCode[code], map[code]];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						}
					}
					return this;
				},

				// Cancel the request
				abort: function (statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (state === 2) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if (!s.hasContent) {

				// If data is available, append data to url
				if (s.data) {
					cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if (s.cache === false) {
					s.url = rts.test(cacheURL) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace(rts, "$1_=" + nonce++) :

					// Otherwise add one to the end
					cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for (i in { success: 1, error: 1, complete: 1 }) {
				jqXHR[i](s[i]);
			}

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (state === 2) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					state = 1;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Propagate exception as error if not done
					if (state < 2) {
						done(-1, e);

						// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Called once
				if (state === 2) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(statusCode);
				statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function (url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function (url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function (html) {
			var wrap;

			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapAll(html.call(this, i));
				});
			}

			if (this[0]) {

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function (html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function (html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function () {
			return this.parent().each(function () {
				if (!jQuery.nodeName(this, "body")) {
					jQuery(this).replaceWith(this.childNodes);
				}
			}).end();
		}
	});

	jQuery.expr.filters.hidden = function (elem) {
		return !jQuery.expr.filters.visible(elem);
	};
	jQuery.expr.filters.visible = function (elem) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};

	var r20 = /%20/g,
	    rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (jQuery.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function (key, value) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	};

	jQuery.fn.extend({
		serialize: function () {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function () {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
					return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
				}) : { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function (headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					callback = function (type) {
						return function () {
							if (callback) {
								callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback("error");

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					callback = callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (callback) {
							throw e;
						}
					}
				},

				abort: function () {
					if (callback) {
						callback();
					}
				}
			};
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function (text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, callback;
			return {
				send: function (_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", callback = function (evt) {
						script.remove();
						callback = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function () {
					if (callback) {
						callback();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (!data || typeof data !== "string") {
			return null;
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec(data),
		    scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		if (typeof url !== "string" && _load) {
			return _load.apply(this, arguments);
		}

		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = jQuery.trim(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && typeof params === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.filters.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	/**
  * Gets a window from an element
  */
	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function (elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function (options) {
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var docElem,
			    win,
			    elem = this[0],
			    box = { top: 0, left: 0 },
			    doc = elem && elem.ownerDocument;

			if (!doc) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if (!jQuery.contains(docElem, elem)) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow(doc);
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function () {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function () {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {
				var win = getWindow(elem);

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable, null);
			};
		});
	});

	jQuery.fn.extend({

		bind: function (types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function (types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function (selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function (selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		},
		size: function () {
			return this.length;
		}
	});

	jQuery.fn.andSelf = jQuery.fn.addBack;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (typeof define === "function" && define.amd) {
		define("jquery", [], function () {
			return jQuery;
		});
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
'use strict';

window.whatInput = function () {

  'use strict';

  /*
    ---------------
    variables
    ---------------
  */

  // array of actively pressed keys

  var activeKeys = [];

  // cache document.body
  var body;

  // boolean: true if touch buffer timer is running
  var buffer = false;

  // the last used input type
  var currentInput = null;

  // `input` types that don't accept text
  var nonTypingInputs = ['button', 'checkbox', 'file', 'image', 'radio', 'reset', 'submit'];

  // detect version of mouse wheel event to use
  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  var mouseWheel = detectWheel();

  // list of modifier keys commonly used with the mouse and
  // can be safely ignored to prevent false keyboard detection
  var ignoreMap = [16, // shift
  17, // control
  18, // alt
  91, // Windows key / left Apple cmd
  93 // Windows menu / right Apple cmd
  ];

  // mapping of events to input types
  var inputMap = {
    'keydown': 'keyboard',
    'keyup': 'keyboard',
    'mousedown': 'mouse',
    'mousemove': 'mouse',
    'MSPointerDown': 'pointer',
    'MSPointerMove': 'pointer',
    'pointerdown': 'pointer',
    'pointermove': 'pointer',
    'touchstart': 'touch'
  };

  // add correct mouse wheel event mapping to `inputMap`
  inputMap[detectWheel()] = 'mouse';

  // array of all used input types
  var inputTypes = [];

  // mapping of key codes to a common name
  var keyMap = {
    9: 'tab',
    13: 'enter',
    16: 'shift',
    27: 'esc',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // map of IE 10 pointer events
  var pointerMap = {
    2: 'touch',
    3: 'touch', // treat pen like touch
    4: 'mouse'
  };

  // touch buffer timer
  var timer;

  /*
    ---------------
    functions
    ---------------
  */

  // allows events that are also triggered to be filtered out for `touchstart`
  function eventBuffer() {
    clearTimer();
    setInput(event);

    buffer = true;
    timer = window.setTimeout(function () {
      buffer = false;
    }, 650);
  }

  function bufferedEvent(event) {
    if (!buffer) setInput(event);
  }

  function unBufferedEvent(event) {
    clearTimer();
    setInput(event);
  }

  function clearTimer() {
    window.clearTimeout(timer);
  }

  function setInput(event) {
    var eventKey = key(event);
    var value = inputMap[event.type];
    if (value === 'pointer') value = pointerType(event);

    // don't do anything if the value matches the input type already set
    if (currentInput !== value) {
      var eventTarget = target(event);
      var eventTargetNode = eventTarget.nodeName.toLowerCase();
      var eventTargetType = eventTargetNode === 'input' ? eventTarget.getAttribute('type') : null;

      if ( // only if the user flag to allow typing in form fields isn't set
      !body.hasAttribute('data-whatinput-formtyping') &&

      // only if currentInput has a value
      currentInput &&

      // only if the input is `keyboard`
      value === 'keyboard' &&

      // not if the key is `TAB`
      keyMap[eventKey] !== 'tab' && (

      // only if the target is a form input that accepts text
      eventTargetNode === 'textarea' || eventTargetNode === 'select' || eventTargetNode === 'input' && nonTypingInputs.indexOf(eventTargetType) < 0) ||
      // ignore modifier keys
      ignoreMap.indexOf(eventKey) > -1) {
        // ignore keyboard typing
      } else {
        switchInput(value);
      }
    }

    if (value === 'keyboard') logKeys(eventKey);
  }

  function switchInput(string) {
    currentInput = string;
    body.setAttribute('data-whatinput', currentInput);

    if (inputTypes.indexOf(currentInput) === -1) inputTypes.push(currentInput);
  }

  function key(event) {
    return event.keyCode ? event.keyCode : event.which;
  }

  function target(event) {
    return event.target || event.srcElement;
  }

  function pointerType(event) {
    if (typeof event.pointerType === 'number') {
      return pointerMap[event.pointerType];
    } else {
      return event.pointerType === 'pen' ? 'touch' : event.pointerType; // treat pen like touch
    }
  }

  // keyboard logging
  function logKeys(eventKey) {
    if (activeKeys.indexOf(keyMap[eventKey]) === -1 && keyMap[eventKey]) activeKeys.push(keyMap[eventKey]);
  }

  function unLogKeys(event) {
    var eventKey = key(event);
    var arrayPos = activeKeys.indexOf(keyMap[eventKey]);

    if (arrayPos !== -1) activeKeys.splice(arrayPos, 1);
  }

  function bindEvents() {
    body = document.body;

    // pointer events (mouse, pen, touch)
    if (window.PointerEvent) {
      body.addEventListener('pointerdown', bufferedEvent);
      body.addEventListener('pointermove', bufferedEvent);
    } else if (window.MSPointerEvent) {
      body.addEventListener('MSPointerDown', bufferedEvent);
      body.addEventListener('MSPointerMove', bufferedEvent);
    } else {

      // mouse events
      body.addEventListener('mousedown', bufferedEvent);
      body.addEventListener('mousemove', bufferedEvent);

      // touch events
      if ('ontouchstart' in window) {
        body.addEventListener('touchstart', eventBuffer);
      }
    }

    // mouse wheel
    body.addEventListener(mouseWheel, bufferedEvent);

    // keyboard events
    body.addEventListener('keydown', unBufferedEvent);
    body.addEventListener('keyup', unBufferedEvent);
    document.addEventListener('keyup', unLogKeys);
  }

  /*
    ---------------
    utilities
    ---------------
  */

  // detect version of mouse wheel event to use
  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  function detectWheel() {
    return mouseWheel = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"

    document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
    'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
  }

  /*
    ---------------
    init
     don't start script unless browser cuts the mustard,
    also passes if polyfills are used
    ---------------
  */

  if ('addEventListener' in window && Array.prototype.indexOf) {

    // if the dom is already ready already (script was placed at bottom of <body>)
    if (document.body) {
      bindEvents();

      // otherwise wait for the dom to load (script was placed in the <head>)
    } else {
      document.addEventListener('DOMContentLoaded', bindEvents);
    }
  }

  /*
    ---------------
    api
    ---------------
  */

  return {

    // returns string: the current input type
    ask: function () {
      return currentInput;
    },

    // returns array: currently pressed keys
    keys: function () {
      return activeKeys;
    },

    // returns array: all the detected input types
    types: function () {
      return inputTypes;
    },

    // accepts string: manually set the input type
    set: switchInput
  };
}();
'use strict';

!function ($) {

  "use strict";

  var FOUNDATION_VERSION = '6.2.4';

  // Global Foundation object
  // This is attached to the window, or used as a module for AMD/Browserify
  var Foundation = {
    version: FOUNDATION_VERSION,

    /**
     * Stores initialized plugins.
     */
    _plugins: {},

    /**
     * Stores generated unique ids for plugin instances
     */
    _uuids: [],

    /**
     * Returns a boolean for RTL support
     */
    rtl: function () {
      return $('html').attr('dir') === 'rtl';
    },
    /**
     * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
     * @param {Object} plugin - The constructor of the plugin.
     */
    plugin: function (plugin, name) {
      // Object key to use when adding to global Foundation object
      // Examples: Foundation.Reveal, Foundation.OffCanvas
      var className = name || functionName(plugin);
      // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
      // Examples: data-reveal, data-off-canvas
      var attrName = hyphenate(className);

      // Add to the Foundation object and the plugins list (for reflowing)
      this._plugins[attrName] = this[className] = plugin;
    },
    /**
     * @function
     * Populates the _uuids array with pointers to each individual plugin instance.
     * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
     * Also fires the initialization event for each plugin, consolidating repetitive code.
     * @param {Object} plugin - an instance of a plugin, usually `this` in context.
     * @param {String} name - the name of the plugin, passed as a camelCased string.
     * @fires Plugin#init
     */
    registerPlugin: function (plugin, name) {
      var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
      plugin.uuid = this.GetYoDigits(6, pluginName);

      if (!plugin.$element.attr('data-' + pluginName)) {
        plugin.$element.attr('data-' + pluginName, plugin.uuid);
      }
      if (!plugin.$element.data('zfPlugin')) {
        plugin.$element.data('zfPlugin', plugin);
      }
      /**
       * Fires when the plugin has initialized.
       * @event Plugin#init
       */
      plugin.$element.trigger('init.zf.' + pluginName);

      this._uuids.push(plugin.uuid);

      return;
    },
    /**
     * @function
     * Removes the plugins uuid from the _uuids array.
     * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
     * Also fires the destroyed event for the plugin, consolidating repetitive code.
     * @param {Object} plugin - an instance of a plugin, usually `this` in context.
     * @fires Plugin#destroyed
     */
    unregisterPlugin: function (plugin) {
      var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

      this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
      plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
      /**
       * Fires when the plugin has been destroyed.
       * @event Plugin#destroyed
       */
      .trigger('destroyed.zf.' + pluginName);
      for (var prop in plugin) {
        plugin[prop] = null; //clean up script to prep for garbage collection.
      }
      return;
    },

    /**
     * @function
     * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
     * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
     * @default If no argument is passed, reflow all currently active plugins.
     */
    reInit: function (plugins) {
      var isJQ = plugins instanceof $;
      try {
        if (isJQ) {
          plugins.each(function () {
            $(this).data('zfPlugin')._init();
          });
        } else {
          var type = typeof plugins,
              _this = this,
              fns = {
            'object': function (plgs) {
              plgs.forEach(function (p) {
                p = hyphenate(p);
                $('[data-' + p + ']').foundation('_init');
              });
            },
            'string': function () {
              plugins = hyphenate(plugins);
              $('[data-' + plugins + ']').foundation('_init');
            },
            'undefined': function () {
              this['object'](Object.keys(_this._plugins));
            }
          };
          fns[type](plugins);
        }
      } catch (err) {
        console.error(err);
      } finally {
        return plugins;
      }
    },

    /**
     * returns a random base-36 uid with namespacing
     * @function
     * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
     * @param {String} namespace - name of plugin to be incorporated in uid, optional.
     * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
     * @returns {String} - unique id
     */
    GetYoDigits: function (length, namespace) {
      length = length || 6;
      return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
    },
    /**
     * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
     * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
     * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
     */
    reflow: function (elem, plugins) {

      // If plugins is undefined, just grab everything
      if (typeof plugins === 'undefined') {
        plugins = Object.keys(this._plugins);
      }
      // If plugins is a string, convert it to an array with one item
      else if (typeof plugins === 'string') {
          plugins = [plugins];
        }

      var _this = this;

      // Iterate through each plugin
      $.each(plugins, function (i, name) {
        // Get the current plugin
        var plugin = _this._plugins[name];

        // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
        var $elem = $(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');

        // For each plugin found, initialize it
        $elem.each(function () {
          var $el = $(this),
              opts = {};
          // Don't double-dip on plugins
          if ($el.data('zfPlugin')) {
            console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
            return;
          }

          if ($el.attr('data-options')) {
            var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
              var opt = e.split(':').map(function (el) {
                return el.trim();
              });
              if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
            });
          }
          try {
            $el.data('zfPlugin', new plugin($(this), opts));
          } catch (er) {
            console.error(er);
          } finally {
            return;
          }
        });
      });
    },
    getFnName: functionName,
    transitionend: function ($elem) {
      var transitions = {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'otransitionend'
      };
      var elem = document.createElement('div'),
          end;

      for (var t in transitions) {
        if (typeof elem.style[t] !== 'undefined') {
          end = transitions[t];
        }
      }
      if (end) {
        return end;
      } else {
        end = setTimeout(function () {
          $elem.triggerHandler('transitionend', [$elem]);
        }, 1);
        return 'transitionend';
      }
    }
  };

  Foundation.util = {
    /**
     * Function for applying a debounce effect to a function call.
     * @function
     * @param {Function} func - Function to be called at end of timeout.
     * @param {Number} delay - Time in ms to delay the call of `func`.
     * @returns function
     */
    throttle: function (func, delay) {
      var timer = null;

      return function () {
        var context = this,
            args = arguments;

        if (timer === null) {
          timer = setTimeout(function () {
            func.apply(context, args);
            timer = null;
          }, delay);
        }
      };
    }
  };

  // TODO: consider not making this a jQuery function
  // TODO: need way to reflow vs. re-initialize
  /**
   * The Foundation jQuery method.
   * @param {String|Array} method - An action to perform on the current jQuery object.
   */
  var foundation = function (method) {
    var type = typeof method,
        $meta = $('meta.foundation-mq'),
        $noJS = $('.no-js');

    if (!$meta.length) {
      $('<meta class="foundation-mq">').appendTo(document.head);
    }
    if ($noJS.length) {
      $noJS.removeClass('no-js');
    }

    if (type === 'undefined') {
      //needs to initialize the Foundation object, or an individual plugin.
      Foundation.MediaQuery._init();
      Foundation.reflow(this);
    } else if (type === 'string') {
      //an individual method to invoke on a plugin or group of plugins
      var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
      var plugClass = this.data('zfPlugin'); //determine the class of plugin

      if (plugClass !== undefined && plugClass[method] !== undefined) {
        //make sure both the class and method exist
        if (this.length === 1) {
          //if there's only one, call it directly.
          plugClass[method].apply(plugClass, args);
        } else {
          this.each(function (i, el) {
            //otherwise loop through the jQuery collection and invoke the method on each
            plugClass[method].apply($(el).data('zfPlugin'), args);
          });
        }
      } else {
        //error for no class or no method
        throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
      }
    } else {
      //error for invalid argument type
      throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
    }
    return this;
  };

  window.Foundation = Foundation;
  $.fn.foundation = foundation;

  // Polyfill for requestAnimationFrame
  (function () {
    if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
      return new Date().getTime();
    };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var lastTime = 0;
      window.requestAnimationFrame = function (callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function () {
          callback(lastTime = nextTime);
        }, nextTime - now);
      };
      window.cancelAnimationFrame = clearTimeout;
    }
    /**
     * Polyfill for performance.now, required by rAF
     */
    if (!window.performance || !window.performance.now) {
      window.performance = {
        start: Date.now(),
        now: function () {
          return Date.now() - this.start;
        }
      };
    }
  })();
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
        return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
      };

      if (this.prototype) {
        // native functions don't have a prototype
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
  // Polyfill to get the name of a function in IE9
  function functionName(fn) {
    if (Function.prototype.name === undefined) {
      var funcNameRegex = /function\s([^(]{1,})\(/;
      var results = funcNameRegex.exec(fn.toString());
      return results && results.length > 1 ? results[1].trim() : "";
    } else if (fn.prototype === undefined) {
      return fn.constructor.name;
    } else {
      return fn.prototype.constructor.name;
    }
  }
  function parseValue(str) {
    if (/true/.test(str)) return true;else if (/false/.test(str)) return false;else if (!isNaN(str * 1)) return parseFloat(str);
    return str;
  }
  // Convert PascalCase to kebab-case
  // Thank you: http://stackoverflow.com/a/8955580
  function hyphenate(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}(jQuery);
'use strict';

!function ($) {

  Foundation.Box = {
    ImNotTouchingYou: ImNotTouchingYou,
    GetDimensions: GetDimensions,
    GetOffsets: GetOffsets

    /**
     * Compares the dimensions of an element to a container and determines collision events with container.
     * @function
     * @param {jQuery} element - jQuery object to test for collisions.
     * @param {jQuery} parent - jQuery object to use as bounding container.
     * @param {Boolean} lrOnly - set to true to check left and right values only.
     * @param {Boolean} tbOnly - set to true to check top and bottom values only.
     * @default if no parent object passed, detects collisions with `window`.
     * @returns {Boolean} - true if collision free, false if a collision in any direction.
     */
  };function ImNotTouchingYou(element, parent, lrOnly, tbOnly) {
    var eleDims = GetDimensions(element),
        top,
        bottom,
        left,
        right;

    if (parent) {
      var parDims = GetDimensions(parent);

      bottom = eleDims.offset.top + eleDims.height <= parDims.height + parDims.offset.top;
      top = eleDims.offset.top >= parDims.offset.top;
      left = eleDims.offset.left >= parDims.offset.left;
      right = eleDims.offset.left + eleDims.width <= parDims.width + parDims.offset.left;
    } else {
      bottom = eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top;
      top = eleDims.offset.top >= eleDims.windowDims.offset.top;
      left = eleDims.offset.left >= eleDims.windowDims.offset.left;
      right = eleDims.offset.left + eleDims.width <= eleDims.windowDims.width;
    }

    var allDirs = [bottom, top, left, right];

    if (lrOnly) {
      return left === right === true;
    }

    if (tbOnly) {
      return top === bottom === true;
    }

    return allDirs.indexOf(false) === -1;
  };

  /**
   * Uses native methods to return an object of dimension values.
   * @function
   * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
   * @returns {Object} - nested object of integer pixel values
   * TODO - if element is window, return only those values.
   */
  function GetDimensions(elem, test) {
    elem = elem.length ? elem[0] : elem;

    if (elem === window || elem === document) {
      throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
    }

    var rect = elem.getBoundingClientRect(),
        parRect = elem.parentNode.getBoundingClientRect(),
        winRect = document.body.getBoundingClientRect(),
        winY = window.pageYOffset,
        winX = window.pageXOffset;

    return {
      width: rect.width,
      height: rect.height,
      offset: {
        top: rect.top + winY,
        left: rect.left + winX
      },
      parentDims: {
        width: parRect.width,
        height: parRect.height,
        offset: {
          top: parRect.top + winY,
          left: parRect.left + winX
        }
      },
      windowDims: {
        width: winRect.width,
        height: winRect.height,
        offset: {
          top: winY,
          left: winX
        }
      }
    };
  }

  /**
   * Returns an object of top and left integer pixel values for dynamically rendered elements,
   * such as: Tooltip, Reveal, and Dropdown
   * @function
   * @param {jQuery} element - jQuery object for the element being positioned.
   * @param {jQuery} anchor - jQuery object for the element's anchor point.
   * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
   * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
   * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
   * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
   * TODO alter/rewrite to work with `em` values as well/instead of pixels
   */
  function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
    var $eleDims = GetDimensions(element),
        $anchorDims = anchor ? GetDimensions(anchor) : null;

    switch (position) {
      case 'top':
        return {
          left: Foundation.rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width : $anchorDims.offset.left,
          top: $anchorDims.offset.top - ($eleDims.height + vOffset)
        };
        break;
      case 'left':
        return {
          left: $anchorDims.offset.left - ($eleDims.width + hOffset),
          top: $anchorDims.offset.top
        };
        break;
      case 'right':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset,
          top: $anchorDims.offset.top
        };
        break;
      case 'center top':
        return {
          left: $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
          top: $anchorDims.offset.top - ($eleDims.height + vOffset)
        };
        break;
      case 'center bottom':
        return {
          left: isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
        break;
      case 'center left':
        return {
          left: $anchorDims.offset.left - ($eleDims.width + hOffset),
          top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
        };
        break;
      case 'center right':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
          top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
        };
        break;
      case 'center':
        return {
          left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2,
          top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - $eleDims.height / 2
        };
        break;
      case 'reveal':
        return {
          left: ($eleDims.windowDims.width - $eleDims.width) / 2,
          top: $eleDims.windowDims.offset.top + vOffset
        };
      case 'reveal full':
        return {
          left: $eleDims.windowDims.offset.left,
          top: $eleDims.windowDims.offset.top
        };
        break;
      case 'left bottom':
        return {
          left: $anchorDims.offset.left,
          top: $anchorDims.offset.top + $anchorDims.height
        };
        break;
      case 'right bottom':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset - $eleDims.width,
          top: $anchorDims.offset.top + $anchorDims.height
        };
        break;
      default:
        return {
          left: Foundation.rtl() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width : $anchorDims.offset.left + hOffset,
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
    }
  }
}(jQuery);
/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/

'use strict';

!function ($) {

  var keyCodes = {
    9: 'TAB',
    13: 'ENTER',
    27: 'ESCAPE',
    32: 'SPACE',
    37: 'ARROW_LEFT',
    38: 'ARROW_UP',
    39: 'ARROW_RIGHT',
    40: 'ARROW_DOWN'
  };

  var commands = {};

  var Keyboard = {
    keys: getKeyCodes(keyCodes),

    /**
     * Parses the (keyboard) event and returns a String that represents its key
     * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
     * @param {Event} event - the event generated by the event handler
     * @return String key - String that represents the key pressed
     */
    parseKey: function (event) {
      var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();
      if (event.shiftKey) key = 'SHIFT_' + key;
      if (event.ctrlKey) key = 'CTRL_' + key;
      if (event.altKey) key = 'ALT_' + key;
      return key;
    },


    /**
     * Handles the given (keyboard) event
     * @param {Event} event - the event generated by the event handler
     * @param {String} component - Foundation component's name, e.g. Slider or Reveal
     * @param {Objects} functions - collection of functions that are to be executed
     */
    handleKey: function (event, component, functions) {
      var commandList = commands[component],
          keyCode = this.parseKey(event),
          cmds,
          command,
          fn;

      if (!commandList) return console.warn('Component not defined!');

      if (typeof commandList.ltr === 'undefined') {
        // this component does not differentiate between ltr and rtl
        cmds = commandList; // use plain list
      } else {
        // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
        if (Foundation.rtl()) cmds = $.extend({}, commandList.ltr, commandList.rtl);else cmds = $.extend({}, commandList.rtl, commandList.ltr);
      }
      command = cmds[keyCode];

      fn = functions[command];
      if (fn && typeof fn === 'function') {
        // execute function  if exists
        var returnValue = fn.apply();
        if (functions.handled || typeof functions.handled === 'function') {
          // execute function when event was handled
          functions.handled(returnValue);
        }
      } else {
        if (functions.unhandled || typeof functions.unhandled === 'function') {
          // execute function when event was not handled
          functions.unhandled();
        }
      }
    },


    /**
     * Finds all focusable elements within the given `$element`
     * @param {jQuery} $element - jQuery object to search within
     * @return {jQuery} $focusable - all focusable elements within `$element`
     */
    findFocusable: function ($element) {
      return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
        if (!$(this).is(':visible') || $(this).attr('tabindex') < 0) {
          return false;
        } //only have visible elements and those that have a tabindex greater or equal 0
        return true;
      });
    },


    /**
     * Returns the component name name
     * @param {Object} component - Foundation component, e.g. Slider or Reveal
     * @return String componentName
     */

    register: function (componentName, cmds) {
      commands[componentName] = cmds;
    }
  };

  /*
   * Constants for easier comparing.
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   */
  function getKeyCodes(kcs) {
    var k = {};
    for (var kc in kcs) {
      k[kcs[kc]] = kcs[kc];
    }return k;
  }

  Foundation.Keyboard = Keyboard;
}(jQuery);
'use strict';

!function ($) {

  // Default set of media queries
  var defaultQueries = {
    'default': 'only screen',
    landscape: 'only screen and (orientation: landscape)',
    portrait: 'only screen and (orientation: portrait)',
    retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
  };

  var MediaQuery = {
    queries: [],

    current: '',

    /**
     * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
     * @function
     * @private
     */
    _init: function () {
      var self = this;
      var extractedStyles = $('.foundation-mq').css('font-family');
      var namedQueries;

      namedQueries = parseStyleToObject(extractedStyles);

      for (var key in namedQueries) {
        if (namedQueries.hasOwnProperty(key)) {
          self.queries.push({
            name: key,
            value: 'only screen and (min-width: ' + namedQueries[key] + ')'
          });
        }
      }

      this.current = this._getCurrentSize();

      this._watcher();
    },


    /**
     * Checks if the screen is at least as wide as a breakpoint.
     * @function
     * @param {String} size - Name of the breakpoint to check.
     * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
     */
    atLeast: function (size) {
      var query = this.get(size);

      if (query) {
        return window.matchMedia(query).matches;
      }

      return false;
    },


    /**
     * Gets the media query of a breakpoint.
     * @function
     * @param {String} size - Name of the breakpoint to get.
     * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
     */
    get: function (size) {
      for (var i in this.queries) {
        if (this.queries.hasOwnProperty(i)) {
          var query = this.queries[i];
          if (size === query.name) return query.value;
        }
      }

      return null;
    },


    /**
     * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
     * @function
     * @private
     * @returns {String} Name of the current breakpoint.
     */
    _getCurrentSize: function () {
      var matched;

      for (var i = 0; i < this.queries.length; i++) {
        var query = this.queries[i];

        if (window.matchMedia(query.value).matches) {
          matched = query;
        }
      }

      if (typeof matched === 'object') {
        return matched.name;
      } else {
        return matched;
      }
    },


    /**
     * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
     * @function
     * @private
     */
    _watcher: function () {
      var _this = this;

      $(window).on('resize.zf.mediaquery', function () {
        var newSize = _this._getCurrentSize(),
            currentSize = _this.current;

        if (newSize !== currentSize) {
          // Change the current media query
          _this.current = newSize;

          // Broadcast the media query change on the window
          $(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
        }
      });
    }
  };

  Foundation.MediaQuery = MediaQuery;

  // matchMedia() polyfill - Test a CSS media type/query in JS.
  // Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
  window.matchMedia || (window.matchMedia = function () {
    'use strict';

    // For browsers that support matchMedium api such as IE 9 and webkit

    var styleMedia = window.styleMedia || window.media;

    // For those that don't support matchMedium
    if (!styleMedia) {
      var style = document.createElement('style'),
          script = document.getElementsByTagName('script')[0],
          info = null;

      style.type = 'text/css';
      style.id = 'matchmediajs-test';

      script && script.parentNode && script.parentNode.insertBefore(style, script);

      // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
      info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;

      styleMedia = {
        matchMedium: function (media) {
          var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

          // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
          if (style.styleSheet) {
            style.styleSheet.cssText = text;
          } else {
            style.textContent = text;
          }

          // Test if media query is true or false
          return info.width === '1px';
        }
      };
    }

    return function (media) {
      return {
        matches: styleMedia.matchMedium(media || 'all'),
        media: media || 'all'
      };
    };
  }());

  // Thank you: https://github.com/sindresorhus/query-string
  function parseStyleToObject(str) {
    var styleObject = {};

    if (typeof str !== 'string') {
      return styleObject;
    }

    str = str.trim().slice(1, -1); // browsers re-quote string style values

    if (!str) {
      return styleObject;
    }

    styleObject = str.split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];
      key = decodeURIComponent(key);

      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
      return ret;
    }, {});

    return styleObject;
  }

  Foundation.MediaQuery = MediaQuery;
}(jQuery);
'use strict';

!function ($) {

  /**
   * Motion module.
   * @module foundation.motion
   */

  var initClasses = ['mui-enter', 'mui-leave'];
  var activeClasses = ['mui-enter-active', 'mui-leave-active'];

  var Motion = {
    animateIn: function (element, animation, cb) {
      animate(true, element, animation, cb);
    },

    animateOut: function (element, animation, cb) {
      animate(false, element, animation, cb);
    }
  };

  function Move(duration, elem, fn) {
    var anim,
        prog,
        start = null;
    // console.log('called');

    function move(ts) {
      if (!start) start = window.performance.now();
      // console.log(start, ts);
      prog = ts - start;
      fn.apply(elem);

      if (prog < duration) {
        anim = window.requestAnimationFrame(move, elem);
      } else {
        window.cancelAnimationFrame(anim);
        elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
      }
    }
    anim = window.requestAnimationFrame(move);
  }

  /**
   * Animates an element in or out using a CSS transition class.
   * @function
   * @private
   * @param {Boolean} isIn - Defines if the animation is in or out.
   * @param {Object} element - jQuery or HTML object to animate.
   * @param {String} animation - CSS class to use.
   * @param {Function} cb - Callback to run when animation is finished.
   */
  function animate(isIn, element, animation, cb) {
    element = $(element).eq(0);

    if (!element.length) return;

    var initClass = isIn ? initClasses[0] : initClasses[1];
    var activeClass = isIn ? activeClasses[0] : activeClasses[1];

    // Set up the animation
    reset();

    element.addClass(animation).css('transition', 'none');

    requestAnimationFrame(function () {
      element.addClass(initClass);
      if (isIn) element.show();
    });

    // Start the animation
    requestAnimationFrame(function () {
      element[0].offsetWidth;
      element.css('transition', '').addClass(activeClass);
    });

    // Clean up the animation when it finishes
    element.one(Foundation.transitionend(element), finish);

    // Hides the element (for out animations), resets the element, and runs a callback
    function finish() {
      if (!isIn) element.hide();
      reset();
      if (cb) cb.apply(element);
    }

    // Resets transitions and removes motion-specific classes
    function reset() {
      element[0].style.transitionDuration = 0;
      element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
    }
  }

  Foundation.Move = Move;
  Foundation.Motion = Motion;
}(jQuery);
'use strict';

!function ($) {

  var Nest = {
    Feather: function (menu) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';

      menu.attr('role', 'menubar');

      var items = menu.find('li').attr({ 'role': 'menuitem' }),
          subMenuClass = 'is-' + type + '-submenu',
          subItemClass = subMenuClass + '-item',
          hasSubClass = 'is-' + type + '-submenu-parent';

      menu.find('a:first').attr('tabindex', 0);

      items.each(function () {
        var $item = $(this),
            $sub = $item.children('ul');

        if ($sub.length) {
          $item.addClass(hasSubClass).attr({
            'aria-haspopup': true,
            'aria-expanded': false,
            'aria-label': $item.children('a:first').text()
          });

          $sub.addClass('submenu ' + subMenuClass).attr({
            'data-submenu': '',
            'aria-hidden': true,
            'role': 'menu'
          });
        }

        if ($item.parent('[data-submenu]').length) {
          $item.addClass('is-submenu-item ' + subItemClass);
        }
      });

      return;
    },
    Burn: function (menu, type) {
      var items = menu.find('li').removeAttr('tabindex'),
          subMenuClass = 'is-' + type + '-submenu',
          subItemClass = subMenuClass + '-item',
          hasSubClass = 'is-' + type + '-submenu-parent';

      menu.find('>li, .menu, .menu > li').removeClass(subMenuClass + ' ' + subItemClass + ' ' + hasSubClass + ' is-submenu-item submenu is-active').removeAttr('data-submenu').css('display', '');

      // console.log(      menu.find('.' + subMenuClass + ', .' + subItemClass + ', .has-submenu, .is-submenu-item, .submenu, [data-submenu]')
      //           .removeClass(subMenuClass + ' ' + subItemClass + ' has-submenu is-submenu-item submenu')
      //           .removeAttr('data-submenu'));
      // items.each(function(){
      //   var $item = $(this),
      //       $sub = $item.children('ul');
      //   if($item.parent('[data-submenu]').length){
      //     $item.removeClass('is-submenu-item ' + subItemClass);
      //   }
      //   if($sub.length){
      //     $item.removeClass('has-submenu');
      //     $sub.removeClass('submenu ' + subMenuClass).removeAttr('data-submenu');
      //   }
      // });
    }
  };

  Foundation.Nest = Nest;
}(jQuery);
'use strict';

!function ($) {

  function Timer(elem, options, cb) {
    var _this = this,
        duration = options.duration,
        //options is an object for easily adding features later.
    nameSpace = Object.keys(elem.data())[0] || 'timer',
        remain = -1,
        start,
        timer;

    this.isPaused = false;

    this.restart = function () {
      remain = -1;
      clearTimeout(timer);
      this.start();
    };

    this.start = function () {
      this.isPaused = false;
      // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
      clearTimeout(timer);
      remain = remain <= 0 ? duration : remain;
      elem.data('paused', false);
      start = Date.now();
      timer = setTimeout(function () {
        if (options.infinite) {
          _this.restart(); //rerun the timer.
        }
        if (cb && typeof cb === 'function') {
          cb();
        }
      }, remain);
      elem.trigger('timerstart.zf.' + nameSpace);
    };

    this.pause = function () {
      this.isPaused = true;
      //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
      clearTimeout(timer);
      elem.data('paused', true);
      var end = Date.now();
      remain = remain - (end - start);
      elem.trigger('timerpaused.zf.' + nameSpace);
    };
  }

  /**
   * Runs a callback function when images are fully loaded.
   * @param {Object} images - Image(s) to check if loaded.
   * @param {Func} callback - Function to execute when image is fully loaded.
   */
  function onImagesLoaded(images, callback) {
    var self = this,
        unloaded = images.length;

    if (unloaded === 0) {
      callback();
    }

    images.each(function () {
      if (this.complete) {
        singleImageLoaded();
      } else if (typeof this.naturalWidth !== 'undefined' && this.naturalWidth > 0) {
        singleImageLoaded();
      } else {
        $(this).one('load', function () {
          singleImageLoaded();
        });
      }
    });

    function singleImageLoaded() {
      unloaded--;
      if (unloaded === 0) {
        callback();
      }
    }
  }

  Foundation.Timer = Timer;
  Foundation.onImagesLoaded = onImagesLoaded;
}(jQuery);
'use strict';

//**************************************************
//**Work inspired by multiple jquery swipe plugins**
//**Done by Yohai Ararat ***************************
//**************************************************
(function ($) {

	$.spotSwipe = {
		version: '1.0.0',
		enabled: 'ontouchstart' in document.documentElement,
		preventDefault: false,
		moveThreshold: 75,
		timeThreshold: 200
	};

	var startPosX,
	    startPosY,
	    startTime,
	    elapsedTime,
	    isMoving = false;

	function onTouchEnd() {
		//  alert(this);
		this.removeEventListener('touchmove', onTouchMove);
		this.removeEventListener('touchend', onTouchEnd);
		isMoving = false;
	}

	function onTouchMove(e) {
		if ($.spotSwipe.preventDefault) {
			e.preventDefault();
		}
		if (isMoving) {
			var x = e.touches[0].pageX;
			var y = e.touches[0].pageY;
			var dx = startPosX - x;
			var dy = startPosY - y;
			var dir;
			elapsedTime = new Date().getTime() - startTime;
			if (Math.abs(dx) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
				dir = dx > 0 ? 'left' : 'right';
			}
			// else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
			//   dir = dy > 0 ? 'down' : 'up';
			// }
			if (dir) {
				e.preventDefault();
				onTouchEnd.call(this);
				$(this).trigger('swipe', dir).trigger('swipe' + dir);
			}
		}
	}

	function onTouchStart(e) {
		if (e.touches.length == 1) {
			startPosX = e.touches[0].pageX;
			startPosY = e.touches[0].pageY;
			isMoving = true;
			startTime = new Date().getTime();
			this.addEventListener('touchmove', onTouchMove, false);
			this.addEventListener('touchend', onTouchEnd, false);
		}
	}

	function init() {
		this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
	}

	function teardown() {
		this.removeEventListener('touchstart', onTouchStart);
	}

	$.event.special.swipe = { setup: init };

	$.each(['left', 'up', 'down', 'right'], function () {
		$.event.special['swipe' + this] = { setup: function () {
				$(this).on('swipe', $.noop);
			} };
	});
})(jQuery);
/****************************************************
 * Method for adding psuedo drag events to elements *
 ***************************************************/
!function ($) {
	$.fn.addTouch = function () {
		this.each(function (i, el) {
			$(el).bind('touchstart touchmove touchend touchcancel', function () {
				//we pass the original event object because the jQuery event
				//object is normalized to w3c specs and does not provide the TouchList
				handleTouch(event);
			});
		});

		var handleTouch = function (event) {
			var touches = event.changedTouches,
			    first = touches[0],
			    eventTypes = {
				touchstart: 'mousedown',
				touchmove: 'mousemove',
				touchend: 'mouseup'
			},
			    type = eventTypes[event.type],
			    simulatedEvent;

			if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {
				simulatedEvent = new window.MouseEvent(type, {
					'bubbles': true,
					'cancelable': true,
					'screenX': first.screenX,
					'screenY': first.screenY,
					'clientX': first.clientX,
					'clientY': first.clientY
				});
			} else {
				simulatedEvent = document.createEvent('MouseEvent');
				simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0 /*left*/, null);
			}
			first.target.dispatchEvent(simulatedEvent);
		};
	};
}(jQuery);
  /**
  * Fires once after all other scripts have loaded
  * @function
  * @private
  */
  $(window).on('load', function () {
    checkListeners();
  });

  function checkListeners() {
    eventsListener();
    resizeListener();
    scrollListener();
    closemeListener();
  }

  //******** only fires this function once on load, if there's something to watch ********
  function closemeListener(pluginName) {
    var yetiBoxes = $('[data-yeti-box]'),
        plugNames = ['dropdown', 'tooltip', 'reveal'];

    if (pluginName) {
      if (typeof pluginName === 'string') {
        plugNames.push(pluginName);
      } else if (typeof pluginName === 'object' && typeof pluginName[0] === 'string') {
        plugNames.concat(pluginName);
      } else {
        console.error('Plugin names must be strings');
      }
    }
    if (yetiBoxes.length) {
      var listeners = plugNames.map(function (name) {
        return 'closeme.zf.' + name;
      }).join(' ');

      $(window).off(listeners).on(listeners, function (e, pluginId) {
        var plugin = e.namespace.split('.')[0];
        var plugins = $('[data-' + plugin + ']').not('[data-yeti-box="' + pluginId + '"]');

        plugins.each(function () {
          var _this = $(this);

          _this.triggerHandler('close.zf.trigger', [_this]);
        });
      });
    }
  }

  function resizeListener(debounce) {
    var timer = void 0,
        $nodes = $('[data-resize]');
    if ($nodes.length) {
      $(window).off('resize.zf.trigger').on('resize.zf.trigger', function (e) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function () {

          if (!MutationObserver) {
            //fallback for IE 9
            $nodes.each(function () {
              $(this).triggerHandler('resizeme.zf.trigger');
            });
          }
          //trigger all listening elements and signal a resize event
          $nodes.attr('data-events', "resize");
        }, debounce || 10); //default time to emit resize event
      });
    }
  }

  function scrollListener(debounce) {
    var timer = void 0,
        $nodes = $('[data-scroll]');
    if ($nodes.length) {
      $(window).off('scroll.zf.trigger').on('scroll.zf.trigger', function (e) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function () {

          if (!MutationObserver) {
            //fallback for IE 9
            $nodes.each(function () {
              $(this).triggerHandler('scrollme.zf.trigger');
            });
          }
          //trigger all listening elements and signal a scroll event
          $nodes.attr('data-events', "scroll");
        }, debounce || 10); //default time to emit scroll event
      });
    }
  }

  function eventsListener() {
    if (!MutationObserver) {
      return false;
    }
    var nodes = document.querySelectorAll('[data-resize], [data-scroll], [data-mutate]');

    //element callback
    var listeningElementsMutation = function (mutationRecordsList) {
      var $target = $(mutationRecordsList[0].target);
      //trigger the event handler for the element depending on type
      switch ($target.attr("data-events")) {

        case "resize":
          $target.triggerHandler('resizeme.zf.trigger', [$target]);
          break;

        case "scroll":
          $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
					break;
					
        default:
          return false;
        //nothing
      }
    };

    if (nodes.length) {
      //for each element that needs to listen for resizing, scrolling, (or coming soon mutation) add a single observer
      for (var i = 0; i <= nodes.length - 1; i++) {
        var elementObserver = new MutationObserver(listeningElementsMutation);
        elementObserver.observe(nodes[i], { attributes: true, childList: false, characterData: false, subtree: false, attributeFilter: ["data-events"] });
      }
    }
  }

  // ------------------------------------

  // [PH]
  // Foundation.CheckWatchers = checkWatchers;


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Abide module.
   * @module foundation.abide
   */

  var Abide = function () {
    /**
     * Creates a new instance of Abide.
     * @class
     * @fires Abide#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Abide(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Abide);

      this.$element = element;
      this.options = $.extend({}, Abide.defaults, this.$element.data(), options);

      this._init();

      Foundation.registerPlugin(this, 'Abide');
    }

    /**
     * Initializes the Abide plugin and calls functions to get Abide functioning on load.
     * @private
     */


    _createClass(Abide, [{
      key: '_init',
      value: function _init() {
        this.$inputs = this.$element.find('input, textarea, select');

        this._events();
      }

      /**
       * Initializes events for Abide.
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this2 = this;

        this.$element.off('.abide').on('reset.zf.abide', function () {
          _this2.resetForm();
        }).on('submit.zf.abide', function () {
          return _this2.validateForm();
        });

        if (this.options.validateOn === 'fieldChange') {
          this.$inputs.off('change.zf.abide').on('change.zf.abide', function (e) {
            _this2.validateInput($(e.target));
          });
        }

        if (this.options.liveValidate) {
          this.$inputs.off('input.zf.abide').on('input.zf.abide', function (e) {
            _this2.validateInput($(e.target));
          });
        }
      }

      /**
       * Calls necessary functions to update Abide upon DOM change
       * @private
       */

    }, {
      key: '_reflow',
      value: function _reflow() {
        this._init();
      }

      /**
       * Checks whether or not a form element has the required attribute and if it's checked or not
       * @param {Object} element - jQuery object to check for required attribute
       * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
       */

    }, {
      key: 'requiredCheck',
      value: function requiredCheck($el) {
        if (!$el.attr('required')) return true;

        var isGood = true;

        switch ($el[0].type) {
          case 'checkbox':
            isGood = $el[0].checked;
            break;

          case 'select':
          case 'select-one':
          case 'select-multiple':
            var opt = $el.find('option:selected');
            if (!opt.length || !opt.val()) isGood = false;
            break;

          default:
            if (!$el.val() || !$el.val().length) isGood = false;
        }

        return isGood;
      }

      /**
       * Based on $el, get the first element with selector in this order:
       * 1. The element's direct sibling('s).
       * 3. The element's parent's children.
       *
       * This allows for multiple form errors per input, though if none are found, no form errors will be shown.
       *
       * @param {Object} $el - jQuery object to use as reference to find the form error selector.
       * @returns {Object} jQuery object with the selector.
       */

    }, {
      key: 'findFormError',
      value: function findFormError($el) {
        var $error = $el.siblings(this.options.formErrorSelector);

        if (!$error.length) {
          $error = $el.parent().find(this.options.formErrorSelector);
        }

        return $error;
      }

      /**
       * Get the first element in this order:
       * 2. The <label> with the attribute `[for="someInputId"]`
       * 3. The `.closest()` <label>
       *
       * @param {Object} $el - jQuery object to check for required attribute
       * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
       */

    }, {
      key: 'findLabel',
      value: function findLabel($el) {
        var id = $el[0].id;
        var $label = this.$element.find('label[for="' + id + '"]');

        if (!$label.length) {
          return $el.closest('label');
        }

        return $label;
      }

      /**
       * Get the set of labels associated with a set of radio els in this order
       * 2. The <label> with the attribute `[for="someInputId"]`
       * 3. The `.closest()` <label>
       *
       * @param {Object} $el - jQuery object to check for required attribute
       * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
       */

    }, {
      key: 'findRadioLabels',
      value: function findRadioLabels($els) {
        var _this3 = this;

        var labels = $els.map(function (i, el) {
          var id = el.id;
          var $label = _this3.$element.find('label[for="' + id + '"]');

          if (!$label.length) {
            $label = $(el).closest('label');
          }
          return $label[0];
        });

        return $(labels);
      }

      /**
       * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
       * @param {Object} $el - jQuery object to add the class to
       */

    }, {
      key: 'addErrorClasses',
      value: function addErrorClasses($el) {
        var $label = this.findLabel($el);
        var $formError = this.findFormError($el);

        if ($label.length) {
          $label.addClass(this.options.labelErrorClass);
        }

        if ($formError.length) {
          $formError.addClass(this.options.formErrorClass);
        }

        $el.addClass(this.options.inputErrorClass).attr('data-invalid', '');
      }

      /**
       * Remove CSS error classes etc from an entire radio button group
       * @param {String} groupName - A string that specifies the name of a radio button group
       *
       */

    }, {
      key: 'removeRadioErrorClasses',
      value: function removeRadioErrorClasses(groupName) {
        var $els = this.$element.find(':radio[name="' + groupName + '"]');
        var $labels = this.findRadioLabels($els);
        var $formErrors = this.findFormError($els);

        if ($labels.length) {
          $labels.removeClass(this.options.labelErrorClass);
        }

        if ($formErrors.length) {
          $formErrors.removeClass(this.options.formErrorClass);
        }

        $els.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');
      }

      /**
       * Removes CSS error class as specified by the Abide settings from the label, input, and the form
       * @param {Object} $el - jQuery object to remove the class from
       */

    }, {
      key: 'removeErrorClasses',
      value: function removeErrorClasses($el) {
        // radios need to clear all of the els
        if ($el[0].type == 'radio') {
          return this.removeRadioErrorClasses($el.attr('name'));
        }

        var $label = this.findLabel($el);
        var $formError = this.findFormError($el);

        if ($label.length) {
          $label.removeClass(this.options.labelErrorClass);
        }

        if ($formError.length) {
          $formError.removeClass(this.options.formErrorClass);
        }

        $el.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');
      }

      /**
       * Goes through a form to find inputs and proceeds to validate them in ways specific to their type
       * @fires Abide#invalid
       * @fires Abide#valid
       * @param {Object} element - jQuery object to validate, should be an HTML input
       * @returns {Boolean} goodToGo - If the input is valid or not.
       */

    }, {
      key: 'validateInput',
      value: function validateInput($el) {
        var clearRequire = this.requiredCheck($el),
            validated = false,
            customValidator = true,
            validator = $el.attr('data-validator'),
            equalTo = true;

        // don't validate ignored inputs or hidden inputs
        if ($el.is('[data-abide-ignore]') || $el.is('[type="hidden"]')) {
          return true;
        }

        switch ($el[0].type) {
          case 'radio':
            validated = this.validateRadio($el.attr('name'));
            break;

          case 'checkbox':
            validated = clearRequire;
            break;

          case 'select':
          case 'select-one':
          case 'select-multiple':
            validated = clearRequire;
            break;

          default:
            validated = this.validateText($el);
        }

        if (validator) {
          customValidator = this.matchValidation($el, validator, $el.attr('required'));
        }

        if ($el.attr('data-equalto')) {
          equalTo = this.options.validators.equalTo($el);
        }

        var goodToGo = [clearRequire, validated, customValidator, equalTo].indexOf(false) === -1;
        var message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';

        this[goodToGo ? 'removeErrorClasses' : 'addErrorClasses']($el);

        /**
         * Fires when the input is done checking for validation. Event trigger is either `valid.zf.abide` or `invalid.zf.abide`
         * Trigger includes the DOM element of the input.
         * @event Abide#valid
         * @event Abide#invalid
         */
        $el.trigger(message, [$el]);

        return goodToGo;
      }

      /**
       * Goes through a form and if there are any invalid inputs, it will display the form error element
       * @returns {Boolean} noError - true if no errors were detected...
       * @fires Abide#formvalid
       * @fires Abide#forminvalid
       */

    }, {
      key: 'validateForm',
      value: function validateForm() {
        var acc = [];
        var _this = this;

        this.$inputs.each(function () {
          acc.push(_this.validateInput($(this)));
        });

        var noError = acc.indexOf(false) === -1;

        this.$element.find('[data-abide-error]').css('display', noError ? 'none' : 'block');

        /**
         * Fires when the form is finished validating. Event trigger is either `formvalid.zf.abide` or `forminvalid.zf.abide`.
         * Trigger includes the element of the form.
         * @event Abide#formvalid
         * @event Abide#forminvalid
         */
        this.$element.trigger((noError ? 'formvalid' : 'forminvalid') + '.zf.abide', [this.$element]);

        return noError;
      }

      /**
       * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
       * @param {Object} $el - jQuery object to validate, should be a text input HTML element
       * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
       * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
       */

    }, {
      key: 'validateText',
      value: function validateText($el, pattern) {
        // A pattern can be passed to this function, or it will be infered from the input's "pattern" attribute, or it's "type" attribute
        pattern = pattern || $el.attr('pattern') || $el.attr('type');
        var inputText = $el.val();
        var valid = false;

        if (inputText.length) {
          // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
          if (this.options.patterns.hasOwnProperty(pattern)) {
            valid = this.options.patterns[pattern].test(inputText);
          }
          // If the pattern name isn't also the type attribute of the field, then test it as a regexp
          else if (pattern !== $el.attr('type')) {
              valid = new RegExp(pattern).test(inputText);
            } else {
              valid = true;
            }
        }
        // An empty field is valid if it's not required
        else if (!$el.prop('required')) {
            valid = true;
          }

        return valid;
      }

      /**
       * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
       * @param {String} groupName - A string that specifies the name of a radio button group
       * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
       */

    }, {
      key: 'validateRadio',
      value: function validateRadio(groupName) {
        // If at least one radio in the group has the `required` attribute, the group is considered required
        // Per W3C spec, all radio buttons in a group should have `required`, but we're being nice
        var $group = this.$element.find(':radio[name="' + groupName + '"]');
        var valid = false,
            required = false;

        // For the group to be required, at least one radio needs to be required
        $group.each(function (i, e) {
          if ($(e).attr('required')) {
            required = true;
          }
        });
        if (!required) valid = true;

        if (!valid) {
          // For the group to be valid, at least one radio needs to be checked
          $group.each(function (i, e) {
            if ($(e).prop('checked')) {
              valid = true;
            }
          });
        };

        return valid;
      }

      /**
       * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
       * @param {Object} $el - jQuery input element.
       * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
       * @param {Boolean} required - self explanatory?
       * @returns {Boolean} - true if validations passed.
       */

    }, {
      key: 'matchValidation',
      value: function matchValidation($el, validators, required) {
        var _this4 = this;

        required = required ? true : false;

        var clear = validators.split(' ').map(function (v) {
          return _this4.options.validators[v]($el, required, $el.parent());
        });
        return clear.indexOf(false) === -1;
      }

      /**
       * Resets form inputs and styles
       * @fires Abide#formreset
       */

    }, {
      key: 'resetForm',
      value: function resetForm() {
        var $form = this.$element,
            opts = this.options;

        $('.' + opts.labelErrorClass, $form).not('small').removeClass(opts.labelErrorClass);
        $('.' + opts.inputErrorClass, $form).not('small').removeClass(opts.inputErrorClass);
        $(opts.formErrorSelector + '.' + opts.formErrorClass).removeClass(opts.formErrorClass);
        $form.find('[data-abide-error]').css('display', 'none');
        $(':input', $form).not(':button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]').val('').removeAttr('data-invalid');
        $(':input:radio', $form).not('[data-abide-ignore]').prop('checked', false).removeAttr('data-invalid');
        $(':input:checkbox', $form).not('[data-abide-ignore]').prop('checked', false).removeAttr('data-invalid');
        /**
         * Fires when the form has been reset.
         * @event Abide#formreset
         */
        $form.trigger('formreset.zf.abide', [$form]);
      }

      /**
       * Destroys an instance of Abide.
       * Removes error styles and classes from elements, without resetting their values.
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        var _this = this;
        this.$element.off('.abide').find('[data-abide-error]').css('display', 'none');

        this.$inputs.off('.abide').each(function () {
          _this.removeErrorClasses($(this));
        });

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Abide;
  }();

  /**
   * Default settings for plugin
   */


  Abide.defaults = {
    /**
     * The default event to validate inputs. Checkboxes and radios validate immediately.
     * Remove or change this value for manual validation.
     * @option
     * @example 'fieldChange'
     */
    validateOn: 'fieldChange',

    /**
     * Class to be applied to input labels on failed validation.
     * @option
     * @example 'is-invalid-label'
     */
    labelErrorClass: 'is-invalid-label',

    /**
     * Class to be applied to inputs on failed validation.
     * @option
     * @example 'is-invalid-input'
     */
    inputErrorClass: 'is-invalid-input',

    /**
     * Class selector to use to target Form Errors for show/hide.
     * @option
     * @example '.form-error'
     */
    formErrorSelector: '.form-error',

    /**
     * Class added to Form Errors on failed validation.
     * @option
     * @example 'is-visible'
     */
    formErrorClass: 'is-visible',

    /**
     * Set to true to validate text inputs on any value change.
     * @option
     * @example false
     */
    liveValidate: false,

    patterns: {
      alpha: /^[a-zA-Z]+$/,
      alpha_numeric: /^[a-zA-Z0-9]+$/,
      integer: /^[-+]?\d+$/,
      number: /^[-+]?\d*(?:[\.\,]\d+)?$/,

      // amex, visa, diners
      card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      cvv: /^([0-9]){3,4}$/,

      // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
      email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,

      url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
      // abc.de
      domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,

      datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
      // YYYY-MM-DD
      date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
      // HH:MM:SS
      time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
      dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
      // MM/DD/YYYY
      month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
      // DD/MM/YYYY
      day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,

      // #FFF or #FFFFFF
      color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
    },

    /**
     * Optional validation functions to be used. `equalTo` being the only default included function.
     * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
     * el : The jQuery element to validate.
     * required : Boolean value of the required attribute be present or not.
     * parent : The direct parent of the input.
     * @option
     */
    validators: {
      equalTo: function (el, required, parent) {
        return $('#' + el.attr('data-equalto')).val() === el.val();
      }
    }

    // Window exports
  };Foundation.plugin(Abide, 'Abide');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Accordion module.
   * @module foundation.accordion
   * @requires foundation.util.keyboard
   * @requires foundation.util.motion
   */

  var Accordion = function () {
    /**
     * Creates a new instance of an accordion.
     * @class
     * @fires Accordion#init
     * @param {jQuery} element - jQuery object to make into an accordion.
     * @param {Object} options - a plain object with settings to override the default options.
     */
    function Accordion(element, options) {
      _classCallCheck(this, Accordion);

      this.$element = element;
      this.options = $.extend({}, Accordion.defaults, this.$element.data(), options);

      this._init();

      Foundation.registerPlugin(this, 'Accordion');
      Foundation.Keyboard.register('Accordion', {
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ARROW_DOWN': 'next',
        'ARROW_UP': 'previous'
      });
    }

    /**
     * Initializes the accordion by animating the preset active pane(s).
     * @private
     */


    _createClass(Accordion, [{
      key: '_init',
      value: function _init() {
        this.$element.attr('role', 'tablist');
        this.$tabs = this.$element.children('li, [data-accordion-item]');

        this.$tabs.each(function (idx, el) {
          var $el = $(el),
              $content = $el.children('[data-tab-content]'),
              id = $content[0].id || Foundation.GetYoDigits(6, 'accordion'),
              linkId = el.id || id + '-label';

          $el.find('a:first').attr({
            'aria-controls': id,
            'role': 'tab',
            'id': linkId,
            'aria-expanded': false,
            'aria-selected': false
          });

          $content.attr({ 'role': 'tabpanel', 'aria-labelledby': linkId, 'aria-hidden': true, 'id': id });
        });
        var $initActive = this.$element.find('.is-active').children('[data-tab-content]');
        if ($initActive.length) {
          this.down($initActive, true);
        }
        this._events();
      }

      /**
       * Adds event handlers for items within the accordion.
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;

        this.$tabs.each(function () {
          var $elem = $(this);
          var $tabContent = $elem.children('[data-tab-content]');
          if ($tabContent.length) {
            $elem.children('a').off('click.zf.accordion keydown.zf.accordion').on('click.zf.accordion', function (e) {
              e.preventDefault();
              _this.toggle($tabContent);
            }).on('keydown.zf.accordion', function (e) {
              Foundation.Keyboard.handleKey(e, 'Accordion', {
                toggle: function () {
                  _this.toggle($tabContent);
                },
                next: function () {
                  var $a = $elem.next().find('a').focus();
                  if (!_this.options.multiExpand) {
                    $a.trigger('click.zf.accordion');
                  }
                },
                previous: function () {
                  var $a = $elem.prev().find('a').focus();
                  if (!_this.options.multiExpand) {
                    $a.trigger('click.zf.accordion');
                  }
                },
                handled: function () {
                  e.preventDefault();
                  e.stopPropagation();
                }
              });
            });
          }
        });
      }

      /**
       * Toggles the selected content pane's open/close state.
       * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
       * @function
       */

    }, {
      key: 'toggle',
      value: function toggle($target) {
        if ($target.parent().hasClass('is-active')) {
          this.up($target);
        } else {
          this.down($target);
        }
      }

      /**
       * Opens the accordion tab defined by `$target`.
       * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
       * @param {Boolean} firstTime - flag to determine if reflow should happen.
       * @fires Accordion#down
       * @function
       */

    }, {
      key: 'down',
      value: function down($target, firstTime) {
        var _this2 = this;

        $target.attr('aria-hidden', false).parent('[data-tab-content]').addBack().parent().addClass('is-active');

        if (!this.options.multiExpand && !firstTime) {
          var $currentActive = this.$element.children('.is-active').children('[data-tab-content]');
          if ($currentActive.length) {
            this.up($currentActive.not($target));
          }
        }

        $target.slideDown(this.options.slideSpeed, function () {
          /**
           * Fires when the tab is done opening.
           * @event Accordion#down
           */
          _this2.$element.trigger('down.zf.accordion', [$target]);
        });

        $('#' + $target.attr('aria-labelledby')).attr({
          'aria-expanded': true,
          'aria-selected': true
        });
      }

      /**
       * Closes the tab defined by `$target`.
       * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
       * @fires Accordion#up
       * @function
       */

    }, {
      key: 'up',
      value: function up($target) {
        var $aunts = $target.parent().siblings(),
            _this = this;

        if (!this.options.allowAllClosed && !$aunts.hasClass('is-active') || !$target.parent().hasClass('is-active')) {
          return;
        }

        // Foundation.Move(this.options.slideSpeed, $target, function(){
        $target.slideUp(_this.options.slideSpeed, function () {
          /**
           * Fires when the tab is done collapsing up.
           * @event Accordion#up
           */
          _this.$element.trigger('up.zf.accordion', [$target]);
        });
        // });

        $target.attr('aria-hidden', true).parent().removeClass('is-active');

        $('#' + $target.attr('aria-labelledby')).attr({
          'aria-expanded': false,
          'aria-selected': false
        });
      }

      /**
       * Destroys an instance of an accordion.
       * @fires Accordion#destroyed
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display', '');
        this.$element.find('a').off('.zf.accordion');

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Accordion;
  }();

  Accordion.defaults = {
    /**
     * Amount of time to animate the opening of an accordion pane.
     * @option
     * @example 250
     */
    slideSpeed: 250,
    /**
     * Allow the accordion to have multiple open panes.
     * @option
     * @example false
     */
    multiExpand: false,
    /**
     * Allow the accordion to close all panes.
     * @option
     * @example false
     */
    allowAllClosed: false
  };

  // Window exports
  Foundation.plugin(Accordion, 'Accordion');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * AccordionMenu module.
   * @module foundation.accordionMenu
   * @requires foundation.util.keyboard
   * @requires foundation.util.motion
   * @requires foundation.util.nest
   */

  var AccordionMenu = function () {
    /**
     * Creates a new instance of an accordion menu.
     * @class
     * @fires AccordionMenu#init
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function AccordionMenu(element, options) {
      _classCallCheck(this, AccordionMenu);

      this.$element = element;
      this.options = $.extend({}, AccordionMenu.defaults, this.$element.data(), options);

      Foundation.Nest.Feather(this.$element, 'accordion');

      this._init();

      Foundation.registerPlugin(this, 'AccordionMenu');
      Foundation.Keyboard.register('AccordionMenu', {
        'ENTER': 'toggle',
        'SPACE': 'toggle',
        'ARROW_RIGHT': 'open',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'close',
        'ESCAPE': 'closeAll'
      });
    }

    /**
     * Initializes the accordion menu by hiding all nested menus.
     * @private
     */


    _createClass(AccordionMenu, [{
      key: '_init',
      value: function _init() {
        this.$element.find('[data-submenu]').not('.is-active').slideUp(0); //.find('a').css('padding-left', '1rem');
        this.$element.attr({
          'role': 'menu',
          'aria-multiselectable': this.options.multiOpen
        });

        this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
        this.$menuLinks.each(function () {
          var linkId = this.id || Foundation.GetYoDigits(6, 'acc-menu-link'),
              $elem = $(this),
              $sub = $elem.children('[data-submenu]'),
              subId = $sub[0].id || Foundation.GetYoDigits(6, 'acc-menu'),
              isActive = $sub.hasClass('is-active');
          $elem.attr({
            'aria-controls': subId,
            'aria-expanded': isActive,
            'role': 'menuitem',
            'id': linkId
          });
          $sub.attr({
            'aria-labelledby': linkId,
            'aria-hidden': !isActive,
            'role': 'menu',
            'id': subId
          });
        });
        var initPanes = this.$element.find('.is-active');
        if (initPanes.length) {
          var _this = this;
          initPanes.each(function () {
            _this.down($(this));
          });
        }
        this._events();
      }

      /**
       * Adds event handlers for items within the menu.
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;

        this.$element.find('li').each(function () {
          var $submenu = $(this).children('[data-submenu]');

          if ($submenu.length) {
            $(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
              e.preventDefault();

              _this.toggle($submenu);
            });
          }
        }).on('keydown.zf.accordionmenu', function (e) {
          var $element = $(this),
              $elements = $element.parent('ul').children('li'),
              $prevElement,
              $nextElement,
              $target = $element.children('[data-submenu]');

          $elements.each(function (i) {
            if ($(this).is($element)) {
              $prevElement = $elements.eq(Math.max(0, i - 1)).find('a').first();
              $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1)).find('a').first();

              if ($(this).children('[data-submenu]:visible').length) {
                // has open sub menu
                $nextElement = $element.find('li:first-child').find('a').first();
              }
              if ($(this).is(':first-child')) {
                // is first element of sub menu
                $prevElement = $element.parents('li').first().find('a').first();
              } else if ($prevElement.parents('li').first().children('[data-submenu]:visible').length) {
                // if previous element has open sub menu
                $prevElement = $prevElement.parents('li').find('li:last-child').find('a').first();
              }
              if ($(this).is(':last-child')) {
                // is last element of sub menu
                $nextElement = $element.parents('li').first().next('li').find('a').first();
              }

              return;
            }
          });

          Foundation.Keyboard.handleKey(e, 'AccordionMenu', {
            open: function () {
              if ($target.is(':hidden')) {
                _this.down($target);
                $target.find('li').first().find('a').first().focus();
              }
            },
            close: function () {
              if ($target.length && !$target.is(':hidden')) {
                // close active sub of this item
                _this.up($target);
              } else if ($element.parent('[data-submenu]').length) {
                // close currently open sub
                _this.up($element.parent('[data-submenu]'));
                $element.parents('li').first().find('a').first().focus();
              }
            },
            up: function () {
              $prevElement.focus();
              return true;
            },
            down: function () {
              $nextElement.focus();
              return true;
            },
            toggle: function () {
              if ($element.children('[data-submenu]').length) {
                _this.toggle($element.children('[data-submenu]'));
              }
            },
            closeAll: function () {
              _this.hideAll();
            },
            handled: function (preventDefault) {
              if (preventDefault) {
                e.preventDefault();
              }
              e.stopImmediatePropagation();
            }
          });
        }); //.attr('tabindex', 0);
      }

      /**
       * Closes all panes of the menu.
       * @function
       */

    }, {
      key: 'hideAll',
      value: function hideAll() {
        this.$element.find('[data-submenu]').slideUp(this.options.slideSpeed);
      }

      /**
       * Toggles the open/close state of a submenu.
       * @function
       * @param {jQuery} $target - the submenu to toggle
       */

    }, {
      key: 'toggle',
      value: function toggle($target) {
        if (!$target.is(':animated')) {
          if (!$target.is(':hidden')) {
            this.up($target);
          } else {
            this.down($target);
          }
        }
      }

      /**
       * Opens the sub-menu defined by `$target`.
       * @param {jQuery} $target - Sub-menu to open.
       * @fires AccordionMenu#down
       */

    }, {
      key: 'down',
      value: function down($target) {
        var _this = this;

        if (!this.options.multiOpen) {
          this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element).add($target)));
        }

        $target.addClass('is-active').attr({ 'aria-hidden': false }).parent('.is-accordion-submenu-parent').attr({ 'aria-expanded': true });

        //Foundation.Move(this.options.slideSpeed, $target, function() {
        $target.slideDown(_this.options.slideSpeed, function () {
          /**
           * Fires when the menu is done opening.
           * @event AccordionMenu#down
           */
          _this.$element.trigger('down.zf.accordionMenu', [$target]);
        });
        //});
      }

      /**
       * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
       * @param {jQuery} $target - Sub-menu to close.
       * @fires AccordionMenu#up
       */

    }, {
      key: 'up',
      value: function up($target) {
        var _this = this;
        //Foundation.Move(this.options.slideSpeed, $target, function(){
        $target.slideUp(_this.options.slideSpeed, function () {
          /**
           * Fires when the menu is done collapsing up.
           * @event AccordionMenu#up
           */
          _this.$element.trigger('up.zf.accordionMenu', [$target]);
        });
        //});

        var $menus = $target.find('[data-submenu]').slideUp(0).addBack().attr('aria-hidden', true);

        $menus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);
      }

      /**
       * Destroys an instance of accordion menu.
       * @fires AccordionMenu#destroyed
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.find('[data-submenu]').slideDown(0).css('display', '');
        this.$element.find('a').off('click.zf.accordionMenu');

        Foundation.Nest.Burn(this.$element, 'accordion');
        Foundation.unregisterPlugin(this);
      }
    }]);

    return AccordionMenu;
  }();

  AccordionMenu.defaults = {
    /**
     * Amount of time to animate the opening of a submenu in ms.
     * @option
     * @example 250
     */
    slideSpeed: 250,
    /**
     * Allow the menu to have multiple open panes.
     * @option
     * @example true
     */
    multiOpen: true
  };

  // Window exports
  Foundation.plugin(AccordionMenu, 'AccordionMenu');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Drilldown module.
   * @module foundation.drilldown
   * @requires foundation.util.keyboard
   * @requires foundation.util.motion
   * @requires foundation.util.nest
   */

  var Drilldown = function () {
    /**
     * Creates a new instance of a drilldown menu.
     * @class
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Drilldown(element, options) {
      _classCallCheck(this, Drilldown);

      this.$element = element;
      this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options);

      Foundation.Nest.Feather(this.$element, 'drilldown');

      this._init();

      Foundation.registerPlugin(this, 'Drilldown');
      Foundation.Keyboard.register('Drilldown', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close',
        'TAB': 'down',
        'SHIFT_TAB': 'up'
      });
    }

    /**
     * Initializes the drilldown by creating jQuery collections of elements
     * @private
     */


    _createClass(Drilldown, [{
      key: '_init',
      value: function _init() {
        this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
        this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]');
        this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'menuitem').find('a');

        this._prepareMenu();

        this._keyboardEvents();
      }

      /**
       * prepares drilldown menu by setting attributes to links and elements
       * sets a min height to prevent content jumping
       * wraps the element if not already wrapped
       * @private
       * @function
       */

    }, {
      key: '_prepareMenu',
      value: function _prepareMenu() {
        var _this = this;
        // if(!this.options.holdOpen){
        //   this._menuLinkEvents();
        // }
        this.$submenuAnchors.each(function () {
          var $link = $(this);
          var $sub = $link.parent();
          if (_this.options.parentLink) {
            $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>');
          }
          $link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);
          $link.children('[data-submenu]').attr({
            'aria-hidden': true,
            'tabindex': 0,
            'role': 'menu'
          });
          _this._events($link);
        });
        this.$submenus.each(function () {
          var $menu = $(this),
              $back = $menu.find('.js-drilldown-back');
          if (!$back.length) {
            $menu.prepend(_this.options.backButton);
          }
          _this._back($menu);
        });
        if (!this.$element.parent().hasClass('is-drilldown')) {
          this.$wrapper = $(this.options.wrapper).addClass('is-drilldown');
          this.$wrapper = this.$element.wrap(this.$wrapper).parent().css(this._getMaxDims());
        }
      }

      /**
       * Adds event handlers to elements in the menu.
       * @function
       * @private
       * @param {jQuery} $elem - the current menu item to add handlers to.
       */

    }, {
      key: '_events',
      value: function _events($elem) {
        var _this = this;

        $elem.off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
          if ($(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')) {
            e.stopImmediatePropagation();
            e.preventDefault();
          }

          // if(e.target !== e.currentTarget.firstElementChild){
          //   return false;
          // }
          _this._show($elem.parent('li'));

          if (_this.options.closeOnClick) {
            var $body = $('body');
            $body.off('.zf.drilldown').on('click.zf.drilldown', function (e) {
              if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target)) {
                return;
              }
              e.preventDefault();
              _this._hideAll();
              $body.off('.zf.drilldown');
            });
          }
        });
      }

      /**
       * Adds keydown event listener to `li`'s in the menu.
       * @private
       */

    }, {
      key: '_keyboardEvents',
      value: function _keyboardEvents() {
        var _this = this;

        this.$menuItems.add(this.$element.find('.js-drilldown-back > a')).on('keydown.zf.drilldown', function (e) {

          var $element = $(this),
              $elements = $element.parent('li').parent('ul').children('li').children('a'),
              $prevElement,
              $nextElement;

          $elements.each(function (i) {
            if ($(this).is($element)) {
              $prevElement = $elements.eq(Math.max(0, i - 1));
              $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
              return;
            }
          });

          Foundation.Keyboard.handleKey(e, 'Drilldown', {
            next: function () {
              if ($element.is(_this.$submenuAnchors)) {
                _this._show($element.parent('li'));
                $element.parent('li').one(Foundation.transitionend($element), function () {
                  $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
                });
                return true;
              }
            },
            previous: function () {
              _this._hide($element.parent('li').parent('ul'));
              $element.parent('li').parent('ul').one(Foundation.transitionend($element), function () {
                setTimeout(function () {
                  $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                }, 1);
              });
              return true;
            },
            up: function () {
              $prevElement.focus();
              return true;
            },
            down: function () {
              $nextElement.focus();
              return true;
            },
            close: function () {
              _this._back();
              //_this.$menuItems.first().focus(); // focus to first element
            },
            open: function () {
              if (!$element.is(_this.$menuItems)) {
                // not menu item means back button
                _this._hide($element.parent('li').parent('ul'));
                $element.parent('li').parent('ul').one(Foundation.transitionend($element), function () {
                  setTimeout(function () {
                    $element.parent('li').parent('ul').parent('li').children('a').first().focus();
                  }, 1);
                });
                return true;
              } else if ($element.is(_this.$submenuAnchors)) {
                _this._show($element.parent('li'));
                $element.parent('li').one(Foundation.transitionend($element), function () {
                  $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
                });
                return true;
              }
            },
            handled: function (preventDefault) {
              if (preventDefault) {
                e.preventDefault();
              }
              e.stopImmediatePropagation();
            }
          });
        }); // end keyboardAccess
      }

      /**
       * Closes all open elements, and returns to root menu.
       * @function
       * @fires Drilldown#closed
       */

    }, {
      key: '_hideAll',
      value: function _hideAll() {
        var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
        $elem.one(Foundation.transitionend($elem), function (e) {
          $elem.removeClass('is-active is-closing');
        });
        /**
         * Fires when the menu is fully closed.
         * @event Drilldown#closed
         */
        this.$element.trigger('closed.zf.drilldown');
      }

      /**
       * Adds event listener for each `back` button, and closes open menus.
       * @function
       * @fires Drilldown#back
       * @param {jQuery} $elem - the current sub-menu to add `back` event.
       */

    }, {
      key: '_back',
      value: function _back($elem) {
        var _this = this;
        $elem.off('click.zf.drilldown');
        $elem.children('.js-drilldown-back').on('click.zf.drilldown', function (e) {
          e.stopImmediatePropagation();
          // console.log('mouseup on back');
          _this._hide($elem);

          // If there is a parent submenu, call show
          var parentSubMenu = $elem.parent('li').parent('ul').parent('li');
          if (parentSubMenu.length) {
            _this._show(parentSubMenu);
          }
        });
      }

      /**
       * Adds event listener to menu items w/o submenus to close open menus on click.
       * @function
       * @private
       */

    }, {
      key: '_menuLinkEvents',
      value: function _menuLinkEvents() {
        var _this = this;
        this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
          // e.stopImmediatePropagation();
          setTimeout(function () {
            _this._hideAll();
          }, 0);
        });
      }

      /**
       * Opens a submenu.
       * @function
       * @fires Drilldown#open
       * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
       */

    }, {
      key: '_show',
      value: function _show($elem) {
        $elem.attr('aria-expanded', true);
        $elem.children('[data-submenu]').addClass('is-active').attr('aria-hidden', false);
        /**
         * Fires when the submenu has opened.
         * @event Drilldown#open
         */
        this.$element.trigger('open.zf.drilldown', [$elem]);
      }
    }, {
      key: '_hide',


      /**
       * Hides a submenu
       * @function
       * @fires Drilldown#hide
       * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
       */
      value: function _hide($elem) {
        var _this = this;
        $elem.parent('li').attr('aria-expanded', false);
        $elem.attr('aria-hidden', true).addClass('is-closing').one(Foundation.transitionend($elem), function () {
          $elem.removeClass('is-active is-closing');
          $elem.blur();
        });
        /**
         * Fires when the submenu has closed.
         * @event Drilldown#hide
         */
        $elem.trigger('hide.zf.drilldown', [$elem]);
      }

      /**
       * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
       * Prevents content jumping.
       * @function
       * @private
       */

    }, {
      key: '_getMaxDims',
      value: function _getMaxDims() {
        var biggest = 0;
        var result = {};

        this.$submenus.add(this.$element).each(function (i, elem) {
          var height = elem.getBoundingClientRect().height;
          if (height > biggest) biggest = height;
        });

        result['min-height'] = biggest + 'px';
        result['max-width'] = this.$element[0].getBoundingClientRect().width + 'px';

        return result;
      }

      /**
       * Destroys the Drilldown Menu
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._hideAll();
        Foundation.Nest.Burn(this.$element, 'drilldown');
        this.$element.unwrap().find('.js-drilldown-back, .is-submenu-parent-item').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
        this.$submenuAnchors.each(function () {
          $(this).off('.zf.drilldown');
        });
        this.$element.find('a').each(function () {
          var $link = $(this);
          $link.removeAttr('tabindex');
          if ($link.data('savedHref')) {
            $link.attr('href', $link.data('savedHref')).removeData('savedHref');
          } else {
            return;
          }
        });
        Foundation.unregisterPlugin(this);
      }
    }]);

    return Drilldown;
  }();

  Drilldown.defaults = {
    /**
     * Markup used for JS generated back button. Prepended to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
     * @option
     * @example '<\li><\a>Back<\/a><\/li>'
     */
    backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
    /**
     * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
     * @option
     * @example '<\div class="is-drilldown"><\/div>'
     */
    wrapper: '<div></div>',
    /**
     * Adds the parent link to the submenu.
     * @option
     * @example false
     */
    parentLink: false,
    /**
     * Allow the menu to return to root list on body click.
     * @option
     * @example false
     */
    closeOnClick: false
    // holdOpen: false
  };

  // Window exports
  Foundation.plugin(Drilldown, 'Drilldown');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Dropdown module.
   * @module foundation.dropdown
   * @requires foundation.util.keyboard
   * @requires foundation.util.box
   * @requires foundation.util.triggers
   */

  var Dropdown = function () {
    /**
     * Creates a new instance of a dropdown.
     * @class
     * @param {jQuery} element - jQuery object to make into a dropdown.
     *        Object should be of the dropdown panel, rather than its anchor.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Dropdown(element, options) {
      _classCallCheck(this, Dropdown);

      this.$element = element;
      this.options = $.extend({}, Dropdown.defaults, this.$element.data(), options);
      this._init();

      Foundation.registerPlugin(this, 'Dropdown');
      Foundation.Keyboard.register('Dropdown', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ESCAPE': 'close',
        'TAB': 'tab_forward',
        'SHIFT_TAB': 'tab_backward'
      });
    }

    /**
     * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
     * @function
     * @private
     */


    _createClass(Dropdown, [{
      key: '_init',
      value: function _init() {
        var $id = this.$element.attr('id');

        this.$anchor = $('[data-toggle="' + $id + '"]').length ? $('[data-toggle="' + $id + '"]') : $('[data-open="' + $id + '"]');
        this.$anchor.attr({
          'aria-controls': $id,
          'data-is-focus': false,
          'data-yeti-box': $id,
          'aria-haspopup': true,
          'aria-expanded': false

        });

        this.options.positionClass = this.getPositionClass();
        this.counter = 4;
        this.usedPositions = [];
        this.$element.attr({
          'aria-hidden': 'true',
          'data-yeti-box': $id,
          'data-resize': $id,
          'aria-labelledby': this.$anchor[0].id || Foundation.GetYoDigits(6, 'dd-anchor')
        });
        this._events();
      }

      /**
       * Helper function to determine current orientation of dropdown pane.
       * @function
       * @returns {String} position - string value of a position class.
       */

    }, {
      key: 'getPositionClass',
      value: function getPositionClass() {
        var verticalPosition = this.$element[0].className.match(/(top|left|right|bottom)/g);
        verticalPosition = verticalPosition ? verticalPosition[0] : '';
        var horizontalPosition = /float-(\S+)/.exec(this.$anchor[0].className);
        horizontalPosition = horizontalPosition ? horizontalPosition[1] : '';
        var position = horizontalPosition ? horizontalPosition + ' ' + verticalPosition : verticalPosition;

        return position;
      }

      /**
       * Adjusts the dropdown panes orientation by adding/removing positioning classes.
       * @function
       * @private
       * @param {String} position - position class to remove.
       */

    }, {
      key: '_reposition',
      value: function _reposition(position) {
        this.usedPositions.push(position ? position : 'bottom');
        //default, try switching to opposite side
        if (!position && this.usedPositions.indexOf('top') < 0) {
          this.$element.addClass('top');
        } else if (position === 'top' && this.usedPositions.indexOf('bottom') < 0) {
          this.$element.removeClass(position);
        } else if (position === 'left' && this.usedPositions.indexOf('right') < 0) {
          this.$element.removeClass(position).addClass('right');
        } else if (position === 'right' && this.usedPositions.indexOf('left') < 0) {
          this.$element.removeClass(position).addClass('left');
        }

        //if default change didn't work, try bottom or left first
        else if (!position && this.usedPositions.indexOf('top') > -1 && this.usedPositions.indexOf('left') < 0) {
            this.$element.addClass('left');
          } else if (position === 'top' && this.usedPositions.indexOf('bottom') > -1 && this.usedPositions.indexOf('left') < 0) {
            this.$element.removeClass(position).addClass('left');
          } else if (position === 'left' && this.usedPositions.indexOf('right') > -1 && this.usedPositions.indexOf('bottom') < 0) {
            this.$element.removeClass(position);
          } else if (position === 'right' && this.usedPositions.indexOf('left') > -1 && this.usedPositions.indexOf('bottom') < 0) {
            this.$element.removeClass(position);
          }
          //if nothing cleared, set to bottom
          else {
              this.$element.removeClass(position);
            }
        this.classChanged = true;
        this.counter--;
      }

      /**
       * Sets the position and orientation of the dropdown pane, checks for collisions.
       * Recursively calls itself if a collision is detected, with a new position class.
       * @function
       * @private
       */

    }, {
      key: '_setPosition',
      value: function _setPosition() {
        if (this.$anchor.attr('aria-expanded') === 'false') {
          return false;
        }
        var position = this.getPositionClass(),
            $eleDims = Foundation.Box.GetDimensions(this.$element),
            $anchorDims = Foundation.Box.GetDimensions(this.$anchor),
            _this = this,
            direction = position === 'left' ? 'left' : position === 'right' ? 'left' : 'top',
            param = direction === 'top' ? 'height' : 'width',
            offset = param === 'height' ? this.options.vOffset : this.options.hOffset;

        if ($eleDims.width >= $eleDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.$element)) {
          this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
            'width': $eleDims.windowDims.width - this.options.hOffset * 2,
            'height': 'auto'
          });
          this.classChanged = true;
          return false;
        }

        this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, position, this.options.vOffset, this.options.hOffset));

        while (!Foundation.Box.ImNotTouchingYou(this.$element, false, true) && this.counter) {
          this._reposition(position);
          this._setPosition();
        }
      }

      /**
       * Adds event listeners to the element utilizing the triggers utility library.
       * @function
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;
        this.$element.on({
          'open.zf.trigger': this.open.bind(this),
          'close.zf.trigger': this.close.bind(this),
          'toggle.zf.trigger': this.toggle.bind(this),
          'resizeme.zf.trigger': this._setPosition.bind(this)
        });

        if (this.options.hover) {
          this.$anchor.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
            if ($('body[data-whatinput="mouse"]').is('*')) {
              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function () {
                _this.open();
                _this.$anchor.data('hover', true);
              }, _this.options.hoverDelay);
            }
          }).on('mouseleave.zf.dropdown', function () {
            clearTimeout(_this.timeout);
            _this.timeout = setTimeout(function () {
              _this.close();
              _this.$anchor.data('hover', false);
            }, _this.options.hoverDelay);
          });
          if (this.options.hoverPane) {
            this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
              clearTimeout(_this.timeout);
            }).on('mouseleave.zf.dropdown', function () {
              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function () {
                _this.close();
                _this.$anchor.data('hover', false);
              }, _this.options.hoverDelay);
            });
          }
        }
        this.$anchor.add(this.$element).on('keydown.zf.dropdown', function (e) {

          var $target = $(this),
              visibleFocusableElements = Foundation.Keyboard.findFocusable(_this.$element);

          Foundation.Keyboard.handleKey(e, 'Dropdown', {
            tab_forward: function () {
              if (_this.$element.find(':focus').is(visibleFocusableElements.eq(-1))) {
                // left modal downwards, setting focus to first element
                if (_this.options.trapFocus) {
                  // if focus shall be trapped
                  visibleFocusableElements.eq(0).focus();
                  e.preventDefault();
                } else {
                  // if focus is not trapped, close dropdown on focus out
                  _this.close();
                }
              }
            },
            tab_backward: function () {
              if (_this.$element.find(':focus').is(visibleFocusableElements.eq(0)) || _this.$element.is(':focus')) {
                // left modal upwards, setting focus to last element
                if (_this.options.trapFocus) {
                  // if focus shall be trapped
                  visibleFocusableElements.eq(-1).focus();
                  e.preventDefault();
                } else {
                  // if focus is not trapped, close dropdown on focus out
                  _this.close();
                }
              }
            },
            open: function () {
              if ($target.is(_this.$anchor)) {
                _this.open();
                _this.$element.attr('tabindex', -1).focus();
                e.preventDefault();
              }
            },
            close: function () {
              _this.close();
              _this.$anchor.focus();
            }
          });
        });
      }

      /**
       * Adds an event handler to the body to close any dropdowns on a click.
       * @function
       * @private
       */

    }, {
      key: '_addBodyHandler',
      value: function _addBodyHandler() {
        var $body = $(document.body).not(this.$element),
            _this = this;
        $body.off('click.zf.dropdown').on('click.zf.dropdown', function (e) {
          if (_this.$anchor.is(e.target) || _this.$anchor.find(e.target).length) {
            return;
          }
          if (_this.$element.find(e.target).length) {
            return;
          }
          _this.close();
          $body.off('click.zf.dropdown');
        });
      }

      /**
       * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
       * @function
       * @fires Dropdown#closeme
       * @fires Dropdown#show
       */

    }, {
      key: 'open',
      value: function open() {
        // var _this = this;
        /**
         * Fires to close other open dropdowns
         * @event Dropdown#closeme
         */
        this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
        this.$anchor.addClass('hover').attr({ 'aria-expanded': true });
        // this.$element/*.show()*/;
        this._setPosition();
        this.$element.addClass('is-open').attr({ 'aria-hidden': false });

        if (this.options.autoFocus) {
          var $focusable = Foundation.Keyboard.findFocusable(this.$element);
          if ($focusable.length) {
            $focusable.eq(0).focus();
          }
        }

        if (this.options.closeOnClick) {
          this._addBodyHandler();
        }

        /**
         * Fires once the dropdown is visible.
         * @event Dropdown#show
         */
        this.$element.trigger('show.zf.dropdown', [this.$element]);
      }

      /**
       * Closes the open dropdown pane.
       * @function
       * @fires Dropdown#hide
       */

    }, {
      key: 'close',
      value: function close() {
        if (!this.$element.hasClass('is-open')) {
          return false;
        }
        this.$element.removeClass('is-open').attr({ 'aria-hidden': true });

        this.$anchor.removeClass('hover').attr('aria-expanded', false);

        if (this.classChanged) {
          var curPositionClass = this.getPositionClass();
          if (curPositionClass) {
            this.$element.removeClass(curPositionClass);
          }
          this.$element.addClass(this.options.positionClass)
          /*.hide()*/.css({ height: '', width: '' });
          this.classChanged = false;
          this.counter = 4;
          this.usedPositions.length = 0;
        }
        this.$element.trigger('hide.zf.dropdown', [this.$element]);
      }

      /**
       * Toggles the dropdown pane's visibility.
       * @function
       */

    }, {
      key: 'toggle',
      value: function toggle() {
        if (this.$element.hasClass('is-open')) {
          if (this.$anchor.data('hover')) return;
          this.close();
        } else {
          this.open();
        }
      }

      /**
       * Destroys the dropdown.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.off('.zf.trigger').hide();
        this.$anchor.off('.zf.dropdown');

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Dropdown;
  }();

  Dropdown.defaults = {
    /**
     * Amount of time to delay opening a submenu on hover event.
     * @option
     * @example 250
     */
    hoverDelay: 250,
    /**
     * Allow submenus to open on hover events
     * @option
     * @example false
     */
    hover: false,
    /**
     * Don't close dropdown when hovering over dropdown pane
     * @option
     * @example true
     */
    hoverPane: false,
    /**
     * Number of pixels between the dropdown pane and the triggering element on open.
     * @option
     * @example 1
     */
    vOffset: 1,
    /**
     * Number of pixels between the dropdown pane and the triggering element on open.
     * @option
     * @example 1
     */
    hOffset: 1,
    /**
     * Class applied to adjust open position. JS will test and fill this in.
     * @option
     * @example 'top'
     */
    positionClass: '',
    /**
     * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
     * @option
     * @example false
     */
    trapFocus: false,
    /**
     * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
     * @option
     * @example true
     */
    autoFocus: false,
    /**
     * Allows a click on the body to close the dropdown.
     * @option
     * @example false
     */
    closeOnClick: false

    // Window exports
  };Foundation.plugin(Dropdown, 'Dropdown');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * DropdownMenu module.
   * @module foundation.dropdown-menu
   * @requires foundation.util.keyboard
   * @requires foundation.util.box
   * @requires foundation.util.nest
   */

  var DropdownMenu = function () {
    /**
     * Creates a new instance of DropdownMenu.
     * @class
     * @fires DropdownMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function DropdownMenu(element, options) {
      _classCallCheck(this, DropdownMenu);

      this.$element = element;
      this.options = $.extend({}, DropdownMenu.defaults, this.$element.data(), options);

      Foundation.Nest.Feather(this.$element, 'dropdown');
      this._init();

      Foundation.registerPlugin(this, 'DropdownMenu');
      Foundation.Keyboard.register('DropdownMenu', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'up',
        'ARROW_DOWN': 'down',
        'ARROW_LEFT': 'previous',
        'ESCAPE': 'close'
      });
    }

    /**
     * Initializes the plugin, and calls _prepareMenu
     * @private
     * @function
     */


    _createClass(DropdownMenu, [{
      key: '_init',
      value: function _init() {
        var subs = this.$element.find('li.is-dropdown-submenu-parent');
        this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');

        this.$menuItems = this.$element.find('[role="menuitem"]');
        this.$tabs = this.$element.children('[role="menuitem"]');
        this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

        if (this.$element.hasClass(this.options.rightClass) || this.options.alignment === 'right' || Foundation.rtl() || this.$element.parents('.top-bar-right').is('*')) {
          this.options.alignment = 'right';
          subs.addClass('opens-left');
        } else {
          subs.addClass('opens-right');
        }
        this.changed = false;
        this._events();
      }
    }, {
      key: '_isVertical',
      value: function _isVertical() {
        return this.$tabs.css('display') === 'block';
      }

      /**
       * Adds event listeners to elements within the menu
       * @private
       * @function
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this,
            hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',
            parClass = 'is-dropdown-submenu-parent';

        // used for onClick and in the keyboard handlers
        var handleClickFn = function (e) {
          var $elem = $(e.target).parentsUntil('ul', '.' + parClass),
              hasSub = $elem.hasClass(parClass),
              hasClicked = $elem.attr('data-is-click') === 'true',
              $sub = $elem.children('.is-dropdown-submenu');

          if (hasSub) {
            if (hasClicked) {
              if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
                return;
              } else {
                e.stopImmediatePropagation();
                e.preventDefault();
                _this._hide($elem);
              }
            } else {
              e.preventDefault();
              e.stopImmediatePropagation();
              _this._show($sub);
              $elem.add($elem.parentsUntil(_this.$element, '.' + parClass)).attr('data-is-click', true);
            }
          } else {
            if (_this.options.closeOnClickInside) {
              _this._hide($elem);
            }
            return;
          }
        };

        if (this.options.clickOpen || hasTouch) {
          this.$menuItems.on('click.zf.dropdownmenu touchstart.zf.dropdownmenu', handleClickFn);
        }

        if (!this.options.disableHover) {
          this.$menuItems.on('mouseenter.zf.dropdownmenu', function (e) {
            var $elem = $(this),
                hasSub = $elem.hasClass(parClass);

            if (hasSub) {
              clearTimeout(_this.delay);
              _this.delay = setTimeout(function () {
                _this._show($elem.children('.is-dropdown-submenu'));
              }, _this.options.hoverDelay);
            }
          }).on('mouseleave.zf.dropdownmenu', function (e) {
            var $elem = $(this),
                hasSub = $elem.hasClass(parClass);
            if (hasSub && _this.options.autoclose) {
              if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) {
                return false;
              }

              clearTimeout(_this.delay);
              _this.delay = setTimeout(function () {
                _this._hide($elem);
              }, _this.options.closingTime);
            }
          });
        }
        this.$menuItems.on('keydown.zf.dropdownmenu', function (e) {
          var $element = $(e.target).parentsUntil('ul', '[role="menuitem"]'),
              isTab = _this.$tabs.index($element) > -1,
              $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
              $prevElement,
              $nextElement;

          $elements.each(function (i) {
            if ($(this).is($element)) {
              $prevElement = $elements.eq(i - 1);
              $nextElement = $elements.eq(i + 1);
              return;
            }
          });

          var nextSibling = function () {
            if (!$element.is(':last-child')) {
              $nextElement.children('a:first').focus();
              e.preventDefault();
            }
          },
              prevSibling = function () {
            $prevElement.children('a:first').focus();
            e.preventDefault();
          },
              openSub = function () {
            var $sub = $element.children('ul.is-dropdown-submenu');
            if ($sub.length) {
              _this._show($sub);
              $element.find('li > a:first').focus();
              e.preventDefault();
            } else {
              return;
            }
          },
              closeSub = function () {
            //if ($element.is(':first-child')) {
            var close = $element.parent('ul').parent('li');
            close.children('a:first').focus();
            _this._hide(close);
            e.preventDefault();
            //}
          };
          var functions = {
            open: openSub,
            close: function () {
              _this._hide(_this.$element);
              _this.$menuItems.find('a:first').focus(); // focus to first element
              e.preventDefault();
            },
            handled: function () {
              e.stopImmediatePropagation();
            }
          };

          if (isTab) {
            if (_this._isVertical()) {
              // vertical menu
              if (Foundation.rtl()) {
                // right aligned
                $.extend(functions, {
                  down: nextSibling,
                  up: prevSibling,
                  next: closeSub,
                  previous: openSub
                });
              } else {
                // left aligned
                $.extend(functions, {
                  down: nextSibling,
                  up: prevSibling,
                  next: openSub,
                  previous: closeSub
                });
              }
            } else {
              // horizontal menu
              if (Foundation.rtl()) {
                // right aligned
                $.extend(functions, {
                  next: prevSibling,
                  previous: nextSibling,
                  down: openSub,
                  up: closeSub
                });
              } else {
                // left aligned
                $.extend(functions, {
                  next: nextSibling,
                  previous: prevSibling,
                  down: openSub,
                  up: closeSub
                });
              }
            }
          } else {
            // not tabs -> one sub
            if (Foundation.rtl()) {
              // right aligned
              $.extend(functions, {
                next: closeSub,
                previous: openSub,
                down: nextSibling,
                up: prevSibling
              });
            } else {
              // left aligned
              $.extend(functions, {
                next: openSub,
                previous: closeSub,
                down: nextSibling,
                up: prevSibling
              });
            }
          }
          Foundation.Keyboard.handleKey(e, 'DropdownMenu', functions);
        });
      }

      /**
       * Adds an event handler to the body to close any dropdowns on a click.
       * @function
       * @private
       */

    }, {
      key: '_addBodyHandler',
      value: function _addBodyHandler() {
        var $body = $(document.body),
            _this = this;
        $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu').on('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu', function (e) {
          var $link = _this.$element.find(e.target);
          if ($link.length) {
            return;
          }

          _this._hide();
          $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu');
        });
      }

      /**
       * Opens a dropdown pane, and checks for collisions first.
       * @param {jQuery} $sub - ul element that is a submenu to show
       * @function
       * @private
       * @fires DropdownMenu#show
       */

    }, {
      key: '_show',
      value: function _show($sub) {
        var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {
          return $(el).find($sub).length > 0;
        }));
        var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');
        this._hide($sibs, idx);
        $sub.css('visibility', 'hidden').addClass('js-dropdown-active').attr({ 'aria-hidden': false }).parent('li.is-dropdown-submenu-parent').addClass('is-active').attr({ 'aria-expanded': true });
        var clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
        if (!clear) {
          var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
              $parentLi = $sub.parent('.is-dropdown-submenu-parent');
          $parentLi.removeClass('opens' + oldClass).addClass('opens-' + this.options.alignment);
          clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
          if (!clear) {
            $parentLi.removeClass('opens-' + this.options.alignment).addClass('opens-inner');
          }
          this.changed = true;
        }
        $sub.css('visibility', '');
        if (this.options.closeOnClick) {
          this._addBodyHandler();
        }
        /**
         * Fires when the new dropdown pane is visible.
         * @event DropdownMenu#show
         */
        this.$element.trigger('show.zf.dropdownmenu', [$sub]);
      }

      /**
       * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
       * @function
       * @param {jQuery} $elem - element with a submenu to hide
       * @param {Number} idx - index of the $tabs collection to hide
       * @private
       */

    }, {
      key: '_hide',
      value: function _hide($elem, idx) {
        var $toClose;
        if ($elem && $elem.length) {
          $toClose = $elem;
        } else if (idx !== undefined) {
          $toClose = this.$tabs.not(function (i, el) {
            return i === idx;
          });
        } else {
          $toClose = this.$element;
        }
        var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

        if (somethingToClose) {
          $toClose.find('li.is-active').add($toClose).attr({
            'aria-expanded': false,
            'data-is-click': false
          }).removeClass('is-active');

          $toClose.find('ul.js-dropdown-active').attr({
            'aria-hidden': true
          }).removeClass('js-dropdown-active');

          if (this.changed || $toClose.find('opens-inner').length) {
            var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
            $toClose.find('li.is-dropdown-submenu-parent').add($toClose).removeClass('opens-inner opens-' + this.options.alignment).addClass('opens-' + oldClass);
            this.changed = false;
          }
          /**
           * Fires when the open menus are closed.
           * @event DropdownMenu#hide
           */
          this.$element.trigger('hide.zf.dropdownmenu', [$toClose]);
        }
      }

      /**
       * Destroys the plugin.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$menuItems.off('.zf.dropdownmenu').removeAttr('data-is-click').removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
        $(document.body).off('.zf.dropdownmenu');
        Foundation.Nest.Burn(this.$element, 'dropdown');
        Foundation.unregisterPlugin(this);
      }
    }]);

    return DropdownMenu;
  }();

  /**
   * Default settings for plugin
   */


  DropdownMenu.defaults = {
    /**
     * Disallows hover events from opening submenus
     * @option
     * @example false
     */
    disableHover: false,
    /**
     * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
     * @option
     * @example true
     */
    autoclose: true,
    /**
     * Amount of time to delay opening a submenu on hover event.
     * @option
     * @example 50
     */
    hoverDelay: 50,
    /**
     * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
     * @option
     * @example true
     */
    clickOpen: false,
    /**
     * Amount of time to delay closing a submenu on a mouseleave event.
     * @option
     * @example 500
     */

    closingTime: 500,
    /**
     * Position of the menu relative to what direction the submenus should open. Handled by JS.
     * @option
     * @example 'left'
     */
    alignment: 'left',
    /**
     * Allow clicks on the body to close any open submenus.
     * @option
     * @example true
     */
    closeOnClick: true,
    /**
     * Allow clicks on leaf anchor links to close any open submenus.
     * @option
     * @example true
     */
    closeOnClickInside: true,
    /**
     * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
     * @option
     * @example 'vertical'
     */
    verticalClass: 'vertical',
    /**
     * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
     * @option
     * @example 'align-right'
     */
    rightClass: 'align-right',
    /**
     * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
     * @option
     * @example false
     */
    forceFollow: true
  };

  // Window exports
  Foundation.plugin(DropdownMenu, 'DropdownMenu');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Equalizer module.
   * @module foundation.equalizer
   * @requires foundation.util.mediaQuery
   * @requires foundation.util.timerAndImageLoader if equalizer contains images
   */

  var Equalizer = function () {
    /**
     * Creates a new instance of Equalizer.
     * @class
     * @fires Equalizer#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Equalizer(element, options) {
      _classCallCheck(this, Equalizer);

      this.$element = element;
      this.options = $.extend({}, Equalizer.defaults, this.$element.data(), options);

      this._init();

      Foundation.registerPlugin(this, 'Equalizer');
    }

    /**
     * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
     * @private
     */


    _createClass(Equalizer, [{
      key: '_init',
      value: function _init() {
        var eqId = this.$element.attr('data-equalizer') || '';
        var $watched = this.$element.find('[data-equalizer-watch="' + eqId + '"]');

        this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
        this.$element.attr('data-resize', eqId || Foundation.GetYoDigits(6, 'eq'));

        this.hasNested = this.$element.find('[data-equalizer]').length > 0;
        this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
        this.isOn = false;
        this._bindHandler = {
          onResizeMeBound: this._onResizeMe.bind(this),
          onPostEqualizedBound: this._onPostEqualized.bind(this)
        };

        var imgs = this.$element.find('img');
        var tooSmall;
        if (this.options.equalizeOn) {
          tooSmall = this._checkMQ();
          $(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
        } else {
          this._events();
        }
        if (tooSmall !== undefined && tooSmall === false || tooSmall === undefined) {
          if (imgs.length) {
            Foundation.onImagesLoaded(imgs, this._reflow.bind(this));
          } else {
            this._reflow();
          }
        }
      }

      /**
       * Removes event listeners if the breakpoint is too small.
       * @private
       */

    }, {
      key: '_pauseEvents',
      value: function _pauseEvents() {
        this.isOn = false;
        this.$element.off({
          '.zf.equalizer': this._bindHandler.onPostEqualizedBound,
          'resizeme.zf.trigger': this._bindHandler.onResizeMeBound
        });
      }

      /**
       * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
       * @private
       */

    }, {
      key: '_onResizeMe',
      value: function _onResizeMe(e) {
        this._reflow();
      }

      /**
       * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
       * @private
       */

    }, {
      key: '_onPostEqualized',
      value: function _onPostEqualized(e) {
        if (e.target !== this.$element[0]) {
          this._reflow();
        }
      }

      /**
       * Initializes events for Equalizer.
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;
        this._pauseEvents();
        if (this.hasNested) {
          this.$element.on('postequalized.zf.equalizer', this._bindHandler.onPostEqualizedBound);
        } else {
          this.$element.on('resizeme.zf.trigger', this._bindHandler.onResizeMeBound);
        }
        this.isOn = true;
      }

      /**
       * Checks the current breakpoint to the minimum required size.
       * @private
       */

    }, {
      key: '_checkMQ',
      value: function _checkMQ() {
        var tooSmall = !Foundation.MediaQuery.atLeast(this.options.equalizeOn);
        if (tooSmall) {
          if (this.isOn) {
            this._pauseEvents();
            this.$watched.css('height', 'auto');
          }
        } else {
          if (!this.isOn) {
            this._events();
          }
        }
        return tooSmall;
      }

      /**
       * A noop version for the plugin
       * @private
       */

    }, {
      key: '_killswitch',
      value: function _killswitch() {
        return;
      }

      /**
       * Calls necessary functions to update Equalizer upon DOM change
       * @private
       */

    }, {
      key: '_reflow',
      value: function _reflow() {
        if (!this.options.equalizeOnStack) {
          if (this._isStacked()) {
            this.$watched.css('height', 'auto');
            return false;
          }
        }
        if (this.options.equalizeByRow) {
          this.getHeightsByRow(this.applyHeightByRow.bind(this));
        } else {
          this.getHeights(this.applyHeight.bind(this));
        }
      }

      /**
       * Manually determines if the first 2 elements are *NOT* stacked.
       * @private
       */

    }, {
      key: '_isStacked',
      value: function _isStacked() {
        return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;
      }

      /**
       * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
       * @param {Function} cb - A non-optional callback to return the heights array to.
       * @returns {Array} heights - An array of heights of children within Equalizer container
       */

    }, {
      key: 'getHeights',
      value: function getHeights(cb) {
        var heights = [];
        for (var i = 0, len = this.$watched.length; i < len; i++) {
          this.$watched[i].style.height = 'auto';
          heights.push(this.$watched[i].offsetHeight);
        }
        cb(heights);
      }

      /**
       * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
       * @param {Function} cb - A non-optional callback to return the heights array to.
       * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
       */

    }, {
      key: 'getHeightsByRow',
      value: function getHeightsByRow(cb) {
        var lastElTopOffset = this.$watched.length ? this.$watched.first().offset().top : 0,
            groups = [],
            group = 0;
        //group by Row
        groups[group] = [];
        for (var i = 0, len = this.$watched.length; i < len; i++) {
          this.$watched[i].style.height = 'auto';
          //maybe could use this.$watched[i].offsetTop
          var elOffsetTop = $(this.$watched[i]).offset().top;
          if (elOffsetTop != lastElTopOffset) {
            group++;
            groups[group] = [];
            lastElTopOffset = elOffsetTop;
          }
          groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);
        }

        for (var j = 0, ln = groups.length; j < ln; j++) {
          var heights = $(groups[j]).map(function () {
            return this[1];
          }).get();
          var max = Math.max.apply(null, heights);
          groups[j].push(max);
        }
        cb(groups);
      }

      /**
       * Changes the CSS height property of each child in an Equalizer parent to match the tallest
       * @param {array} heights - An array of heights of children within Equalizer container
       * @fires Equalizer#preequalized
       * @fires Equalizer#postequalized
       */

    }, {
      key: 'applyHeight',
      value: function applyHeight(heights) {
        var max = Math.max.apply(null, heights);
        /**
         * Fires before the heights are applied
         * @event Equalizer#preequalized
         */
        this.$element.trigger('preequalized.zf.equalizer');

        this.$watched.css('height', max);

        /**
         * Fires when the heights have been applied
         * @event Equalizer#postequalized
         */
        this.$element.trigger('postequalized.zf.equalizer');
      }

      /**
       * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
       * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
       * @fires Equalizer#preequalized
       * @fires Equalizer#preequalizedRow
       * @fires Equalizer#postequalizedRow
       * @fires Equalizer#postequalized
       */

    }, {
      key: 'applyHeightByRow',
      value: function applyHeightByRow(groups) {
        /**
         * Fires before the heights are applied
         */
        this.$element.trigger('preequalized.zf.equalizer');
        for (var i = 0, len = groups.length; i < len; i++) {
          var groupsILength = groups[i].length,
              max = groups[i][groupsILength - 1];
          if (groupsILength <= 2) {
            $(groups[i][0][0]).css({ 'height': 'auto' });
            continue;
          }
          /**
            * Fires before the heights per row are applied
            * @event Equalizer#preequalizedRow
            */
          this.$element.trigger('preequalizedrow.zf.equalizer');
          for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
            $(groups[i][j][0]).css({ 'height': max });
          }
          /**
            * Fires when the heights per row have been applied
            * @event Equalizer#postequalizedRow
            */
          this.$element.trigger('postequalizedrow.zf.equalizer');
        }
        /**
         * Fires when the heights have been applied
         */
        this.$element.trigger('postequalized.zf.equalizer');
      }

      /**
       * Destroys an instance of Equalizer.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._pauseEvents();
        this.$watched.css('height', 'auto');

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Equalizer;
  }();

  /**
   * Default settings for plugin
   */


  Equalizer.defaults = {
    /**
     * Enable height equalization when stacked on smaller screens.
     * @option
     * @example true
     */
    equalizeOnStack: false,
    /**
     * Enable height equalization row by row.
     * @option
     * @example false
     */
    equalizeByRow: false,
    /**
     * String representing the minimum breakpoint size the plugin should equalize heights on.
     * @option
     * @example 'medium'
     */
    equalizeOn: ''
  };

  // Window exports
  Foundation.plugin(Equalizer, 'Equalizer');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Interchange module.
   * @module foundation.interchange
   * @requires foundation.util.mediaQuery
   * @requires foundation.util.timerAndImageLoader
   */

  var Interchange = function () {
    /**
     * Creates a new instance of Interchange.
     * @class
     * @fires Interchange#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Interchange(element, options) {
      _classCallCheck(this, Interchange);

      this.$element = element;
      this.options = $.extend({}, Interchange.defaults, options);
      this.rules = [];
      this.currentPath = '';

      this._init();
      this._events();

      Foundation.registerPlugin(this, 'Interchange');
    }

    /**
     * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
     * @function
     * @private
     */


    _createClass(Interchange, [{
      key: '_init',
      value: function _init() {
        this._addBreakpoints();
        this._generateRules();
        this._reflow();
      }

      /**
       * Initializes events for Interchange.
       * @function
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        $(window).on('resize.zf.interchange', Foundation.util.throttle(this._reflow.bind(this), 50));
      }

      /**
       * Calls necessary functions to update Interchange upon DOM change
       * @function
       * @private
       */

    }, {
      key: '_reflow',
      value: function _reflow() {
        var match;

        // Iterate through each rule, but only save the last match
        for (var i in this.rules) {
          if (this.rules.hasOwnProperty(i)) {
            var rule = this.rules[i];

            if (window.matchMedia(rule.query).matches) {
              match = rule;
            }
          }
        }

        if (match) {
          this.replace(match.path);
        }
      }

      /**
       * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
       * @function
       * @private
       */

    }, {
      key: '_addBreakpoints',
      value: function _addBreakpoints() {
        for (var i in Foundation.MediaQuery.queries) {
          if (Foundation.MediaQuery.queries.hasOwnProperty(i)) {
            var query = Foundation.MediaQuery.queries[i];
            Interchange.SPECIAL_QUERIES[query.name] = query.value;
          }
        }
      }

      /**
       * Checks the Interchange element for the provided media query + content pairings
       * @function
       * @private
       * @param {Object} element - jQuery object that is an Interchange instance
       * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
       */

    }, {
      key: '_generateRules',
      value: function _generateRules(element) {
        var rulesList = [];
        var rules;

        if (this.options.rules) {
          rules = this.options.rules;
        } else {
          rules = this.$element.data('interchange').match(/\[.*?\]/g);
        }

        for (var i in rules) {
          if (rules.hasOwnProperty(i)) {
            var rule = rules[i].slice(1, -1).split(', ');
            var path = rule.slice(0, -1).join('');
            var query = rule[rule.length - 1];

            if (Interchange.SPECIAL_QUERIES[query]) {
              query = Interchange.SPECIAL_QUERIES[query];
            }

            rulesList.push({
              path: path,
              query: query
            });
          }
        }

        this.rules = rulesList;
      }

      /**
       * Update the `src` property of an image, or change the HTML of a container, to the specified path.
       * @function
       * @param {String} path - Path to the image or HTML partial.
       * @fires Interchange#replaced
       */

    }, {
      key: 'replace',
      value: function replace(path) {
        if (this.currentPath === path) return;

        var _this = this,
            trigger = 'replaced.zf.interchange';

        // Replacing images
        if (this.$element[0].nodeName === 'IMG') {
          this.$element.attr('src', path).on('load', function () {
            _this.currentPath = path;
          }).trigger(trigger);
        }
        // Replacing background images
        else if (path.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i)) {
            this.$element.css({ 'background-image': 'url(' + path + ')' }).trigger(trigger);
          }
          // Replacing HTML
          else {
              $.get(path, function (response) {
                _this.$element.html(response).trigger(trigger);
                $(response).foundation();
                _this.currentPath = path;
              });
            }

        /**
         * Fires when content in an Interchange element is done being loaded.
         * @event Interchange#replaced
         */
        // this.$element.trigger('replaced.zf.interchange');
      }

      /**
       * Destroys an instance of interchange.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        //TODO this.
      }
    }]);

    return Interchange;
  }();

  /**
   * Default settings for plugin
   */


  Interchange.defaults = {
    /**
     * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.
     * @option
     */
    rules: null
  };

  Interchange.SPECIAL_QUERIES = {
    'landscape': 'screen and (orientation: landscape)',
    'portrait': 'screen and (orientation: portrait)',
    'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'
  };

  // Window exports
  Foundation.plugin(Interchange, 'Interchange');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Magellan module.
   * @module foundation.magellan
   */

  var Magellan = function () {
    /**
     * Creates a new instance of Magellan.
     * @class
     * @fires Magellan#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Magellan(element, options) {
      _classCallCheck(this, Magellan);

      this.$element = element;
      this.options = $.extend({}, Magellan.defaults, this.$element.data(), options);

      this._init();

      Foundation.registerPlugin(this, 'Magellan');
    }

    /**
     * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
     * @private
     */


    _createClass(Magellan, [{
      key: '_init',
      value: function _init() {
        var id = this.$element[0].id || Foundation.GetYoDigits(6, 'magellan');
        var _this = this;
        this.$targets = $('[data-magellan-target]');
        this.$links = this.$element.find('a');
        this.$element.attr({
          'data-resize': id,
          'data-scroll': id,
          'id': id
        });
        this.$active = $();
        this.scrollPos = parseInt(window.pageYOffset, 10);

        this._events();
      }

      /**
       * Calculates an array of pixel values that are the demarcation lines between locations on the page.
       * Can be invoked if new elements are added or the size of a location changes.
       * @function
       */

    }, {
      key: 'calcPoints',
      value: function calcPoints() {
        var _this = this,
            body = document.body,
            html = document.documentElement;

        this.points = [];
        this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
        this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));

        this.$targets.each(function () {
          var $tar = $(this),
              pt = Math.round($tar.offset().top - _this.options.threshold);
          $tar.targetPoint = pt;
          _this.points.push(pt);
        });
      }

      /**
       * Initializes events for Magellan.
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this,
            $body = $('html, body'),
            opts = {
          duration: _this.options.animationDuration,
          easing: _this.options.animationEasing
        };
        $(window).one('load', function () {
          if (_this.options.deepLinking) {
            if (location.hash) {
              _this.scrollToLoc(location.hash);
            }
          }
          _this.calcPoints();
          _this._updateActive();
        });

        this.$element.on({
          'resizeme.zf.trigger': this.reflow.bind(this),
          'scrollme.zf.trigger': this._updateActive.bind(this)
        }).on('click.zf.magellan', 'a[href^="#"]', function (e) {
          e.preventDefault();
          var arrival = this.getAttribute('href');
          _this.scrollToLoc(arrival);
        });
      }

      /**
       * Function to scroll to a given location on the page.
       * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
       * @function
       */

    }, {
      key: 'scrollToLoc',
      value: function scrollToLoc(loc) {
        // Do nothing if target does not exist to prevent errors
        if (!$(loc).length) {
          return false;
        }
        var scrollPos = Math.round($(loc).offset().top - this.options.threshold / 2 - this.options.barOffset);

        $('html, body').stop(true).animate({ scrollTop: scrollPos }, this.options.animationDuration, this.options.animationEasing);
      }

      /**
       * Calls necessary functions to update Magellan upon DOM change
       * @function
       */

    }, {
      key: 'reflow',
      value: function reflow() {
        this.calcPoints();
        this._updateActive();
      }

      /**
       * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
       * @private
       * @function
       * @fires Magellan#update
       */

    }, {
      key: '_updateActive',
      value: function _updateActive() /*evt, elem, scrollPos*/{
        var winPos = /*scrollPos ||*/parseInt(window.pageYOffset, 10),
            curIdx;

        if (winPos + this.winHeight === this.docHeight) {
          curIdx = this.points.length - 1;
        } else if (winPos < this.points[0]) {
          curIdx = 0;
        } else {
          var isDown = this.scrollPos < winPos,
              _this = this,
              curVisible = this.points.filter(function (p, i) {
            return isDown ? p - _this.options.barOffset <= winPos : p - _this.options.barOffset - _this.options.threshold <= winPos;
          });
          curIdx = curVisible.length ? curVisible.length - 1 : 0;
        }

        this.$active.removeClass(this.options.activeClass);
        this.$active = this.$links.filter('[href="#' + this.$targets.eq(curIdx).data('magellan-target') + '"]').addClass(this.options.activeClass);

        if (this.options.deepLinking) {
          var hash = this.$active[0].getAttribute('href');
          if (window.history.pushState) {
            window.history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        }

        this.scrollPos = winPos;
        /**
         * Fires when magellan is finished updating to the new active element.
         * @event Magellan#update
         */
        this.$element.trigger('update.zf.magellan', [this.$active]);
      }

      /**
       * Destroys an instance of Magellan and resets the url of the window.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.off('.zf.trigger .zf.magellan').find('.' + this.options.activeClass).removeClass(this.options.activeClass);

        if (this.options.deepLinking) {
          var hash = this.$active[0].getAttribute('href');
          window.location.hash.replace(hash, '');
        }

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Magellan;
  }();

  /**
   * Default settings for plugin
   */


  Magellan.defaults = {
    /**
     * Amount of time, in ms, the animated scrolling should take between locations.
     * @option
     * @example 500
     */
    animationDuration: 500,
    /**
     * Animation style to use when scrolling between locations.
     * @option
     * @example 'ease-in-out'
     */
    animationEasing: 'linear',
    /**
     * Number of pixels to use as a marker for location changes.
     * @option
     * @example 50
     */
    threshold: 50,
    /**
     * Class applied to the active locations link on the magellan container.
     * @option
     * @example 'active'
     */
    activeClass: 'active',
    /**
     * Allows the script to manipulate the url of the current page, and if supported, alter the history.
     * @option
     * @example true
     */
    deepLinking: false,
    /**
     * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
     * @option
     * @example 25
     */
    barOffset: 0

    // Window exports
  };Foundation.plugin(Magellan, 'Magellan');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Orbit module.
   * @module foundation.orbit
   * @requires foundation.util.keyboard
   * @requires foundation.util.motion
   * @requires foundation.util.timerAndImageLoader
   * @requires foundation.util.touch
   */

  var Orbit = function () {
    /**
    * Creates a new instance of an orbit carousel.
    * @class
    * @param {jQuery} element - jQuery object to make into an Orbit Carousel.
    * @param {Object} options - Overrides to the default plugin settings.
    */
    function Orbit(element, options) {
      _classCallCheck(this, Orbit);

      this.$element = element;
      this.options = $.extend({}, Orbit.defaults, this.$element.data(), options);

      this._init();

      Foundation.registerPlugin(this, 'Orbit');
      Foundation.Keyboard.register('Orbit', {
        'ltr': {
          'ARROW_RIGHT': 'next',
          'ARROW_LEFT': 'previous'
        },
        'rtl': {
          'ARROW_LEFT': 'next',
          'ARROW_RIGHT': 'previous'
        }
      });
    }

    /**
    * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
    * @function
    * @private
    */


    _createClass(Orbit, [{
      key: '_init',
      value: function _init() {
        this.$wrapper = this.$element.find('.' + this.options.containerClass);
        this.$slides = this.$element.find('.' + this.options.slideClass);
        var $images = this.$element.find('img'),
            initActive = this.$slides.filter('.is-active');

        if (!initActive.length) {
          this.$slides.eq(0).addClass('is-active');
        }

        if (!this.options.useMUI) {
          this.$slides.addClass('no-motionui');
        }

        if ($images.length) {
          Foundation.onImagesLoaded($images, this._prepareForOrbit.bind(this));
        } else {
          this._prepareForOrbit(); //hehe
        }

        if (this.options.bullets) {
          this._loadBullets();
        }

        this._events();

        if (this.options.autoPlay && this.$slides.length > 1) {
          this.geoSync();
        }

        if (this.options.accessible) {
          // allow wrapper to be focusable to enable arrow navigation
          this.$wrapper.attr('tabindex', 0);
        }
      }

      /**
      * Creates a jQuery collection of bullets, if they are being used.
      * @function
      * @private
      */

    }, {
      key: '_loadBullets',
      value: function _loadBullets() {
        this.$bullets = this.$element.find('.' + this.options.boxOfBullets).find('button');
      }

      /**
      * Sets a `timer` object on the orbit, and starts the counter for the next slide.
      * @function
      */

    }, {
      key: 'geoSync',
      value: function geoSync() {
        var _this = this;
        this.timer = new Foundation.Timer(this.$element, {
          duration: this.options.timerDelay,
          infinite: false
        }, function () {
          _this.changeSlide(true);
        });
        this.timer.start();
      }

      /**
      * Sets wrapper and slide heights for the orbit.
      * @function
      * @private
      */

    }, {
      key: '_prepareForOrbit',
      value: function _prepareForOrbit() {
        var _this = this;
        this._setWrapperHeight(function (max) {
          _this._setSlideHeight(max);
        });
      }

      /**
      * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.
      * @function
      * @private
      * @param {Function} cb - a callback function to fire when complete.
      */

    }, {
      key: '_setWrapperHeight',
      value: function _setWrapperHeight(cb) {
        //rewrite this to `for` loop
        var max = 0,
            temp,
            counter = 0;

        this.$slides.each(function () {
          temp = this.getBoundingClientRect().height;
          $(this).attr('data-slide', counter);

          if (counter) {
            //if not the first slide, set css position and display property
            $(this).css({ 'position': 'relative', 'display': 'none' });
          }
          max = temp > max ? temp : max;
          counter++;
        });

        if (counter === this.$slides.length) {
          this.$wrapper.css({ 'height': max }); //only change the wrapper height property once.
          cb(max); //fire callback with max height dimension.
        }
      }

      /**
      * Sets the max-height of each slide.
      * @function
      * @private
      */

    }, {
      key: '_setSlideHeight',
      value: function _setSlideHeight(height) {
        this.$slides.each(function () {
          $(this).css('max-height', height);
        });
      }

      /**
      * Adds event listeners to basically everything within the element.
      * @function
      * @private
      */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;

        //***************************************
        //**Now using custom event - thanks to:**
        //**      Yohai Ararat of Toronto      **
        //***************************************
        if (this.$slides.length > 1) {

          if (this.options.swipe) {
            this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit').on('swipeleft.zf.orbit', function (e) {
              e.preventDefault();
              _this.changeSlide(true);
            }).on('swiperight.zf.orbit', function (e) {
              e.preventDefault();
              _this.changeSlide(false);
            });
          }
          //***************************************

          if (this.options.autoPlay) {
            this.$slides.on('click.zf.orbit', function () {
              _this.$element.data('clickedOn', _this.$element.data('clickedOn') ? false : true);
              _this.timer[_this.$element.data('clickedOn') ? 'pause' : 'start']();
            });

            if (this.options.pauseOnHover) {
              this.$element.on('mouseenter.zf.orbit', function () {
                _this.timer.pause();
              }).on('mouseleave.zf.orbit', function () {
                if (!_this.$element.data('clickedOn')) {
                  _this.timer.start();
                }
              });
            }
          }

          if (this.options.navButtons) {
            var $controls = this.$element.find('.' + this.options.nextClass + ', .' + this.options.prevClass);
            $controls.attr('tabindex', 0)
            //also need to handle enter/return and spacebar key presses
            .on('click.zf.orbit touchend.zf.orbit', function (e) {
              e.preventDefault();
              _this.changeSlide($(this).hasClass(_this.options.nextClass));
            });
          }

          if (this.options.bullets) {
            this.$bullets.on('click.zf.orbit touchend.zf.orbit', function () {
              if (/is-active/g.test(this.className)) {
                return false;
              } //if this is active, kick out of function.
              var idx = $(this).data('slide'),
                  ltr = idx > _this.$slides.filter('.is-active').data('slide'),
                  $slide = _this.$slides.eq(idx);

              _this.changeSlide(ltr, $slide, idx);
            });
          }

          if (this.options.accessible) {
            this.$wrapper.add(this.$bullets).on('keydown.zf.orbit', function (e) {
              // handle keyboard event with keyboard util
              Foundation.Keyboard.handleKey(e, 'Orbit', {
                next: function () {
                  _this.changeSlide(true);
                },
                previous: function () {
                  _this.changeSlide(false);
                },
                handled: function () {
                  // if bullet is focused, make sure focus moves
                  if ($(e.target).is(_this.$bullets)) {
                    _this.$bullets.filter('.is-active').focus();
                  }
                }
              });
            });
          }
        }
      }

      /**
      * Changes the current slide to a new one.
      * @function
      * @param {Boolean} isLTR - flag if the slide should move left to right.
      * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.
      * @param {Number} idx - the index of the new slide in its collection, if one chosen.
      * @fires Orbit#slidechange
      */

    }, {
      key: 'changeSlide',
      value: function changeSlide(isLTR, chosenSlide, idx) {
        var $curSlide = this.$slides.filter('.is-active').eq(0);

        if (/mui/g.test($curSlide[0].className)) {
          return false;
        } //if the slide is currently animating, kick out of the function

        var $firstSlide = this.$slides.first(),
            $lastSlide = this.$slides.last(),
            dirIn = isLTR ? 'Right' : 'Left',
            dirOut = isLTR ? 'Left' : 'Right',
            _this = this,
            $newSlide;

        if (!chosenSlide) {
          //most of the time, this will be auto played or clicked from the navButtons.
          $newSlide = isLTR ? //if wrapping enabled, check to see if there is a `next` or `prev` sibling, if not, select the first or last slide to fill in. if wrapping not enabled, attempt to select `next` or `prev`, if there's nothing there, the function will kick out on next step. CRAZY NESTED TERNARIES!!!!!
          this.options.infiniteWrap ? $curSlide.next('.' + this.options.slideClass).length ? $curSlide.next('.' + this.options.slideClass) : $firstSlide : $curSlide.next('.' + this.options.slideClass) : //pick next slide if moving left to right
          this.options.infiniteWrap ? $curSlide.prev('.' + this.options.slideClass).length ? $curSlide.prev('.' + this.options.slideClass) : $lastSlide : $curSlide.prev('.' + this.options.slideClass); //pick prev slide if moving right to left
        } else {
          $newSlide = chosenSlide;
        }

        if ($newSlide.length) {
          /**
          * Triggers before the next slide starts animating in and only if a next slide has been found.
          * @event Orbit#beforeslidechange
          */
          this.$element.trigger('beforeslidechange.zf.orbit', [$curSlide, $newSlide]);

          if (this.options.bullets) {
            idx = idx || this.$slides.index($newSlide); //grab index to update bullets
            this._updateBullets(idx);
          }

          if (this.options.useMUI) {
            Foundation.Motion.animateIn($newSlide.addClass('is-active').css({ 'position': 'absolute', 'top': 0 }), this.options['animInFrom' + dirIn], function () {
              $newSlide.css({ 'position': 'relative', 'display': 'block' }).attr('aria-live', 'polite');
            });

            Foundation.Motion.animateOut($curSlide.removeClass('is-active'), this.options['animOutTo' + dirOut], function () {
              $curSlide.removeAttr('aria-live');
              if (_this.options.autoPlay && !_this.timer.isPaused) {
                _this.timer.restart();
              }
              //do stuff?
            });
          } else {
            $curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();
            $newSlide.addClass('is-active is-in').attr('aria-live', 'polite').show();
            if (this.options.autoPlay && !this.timer.isPaused) {
              this.timer.restart();
            }
          }
          /**
          * Triggers when the slide has finished animating in.
          * @event Orbit#slidechange
          */
          this.$element.trigger('slidechange.zf.orbit', [$newSlide]);
        }
      }

      /**
      * Updates the active state of the bullets, if displayed.
      * @function
      * @private
      * @param {Number} idx - the index of the current slide.
      */

    }, {
      key: '_updateBullets',
      value: function _updateBullets(idx) {
        var $oldBullet = this.$element.find('.' + this.options.boxOfBullets).find('.is-active').removeClass('is-active').blur(),
            span = $oldBullet.find('span:last').detach(),
            $newBullet = this.$bullets.eq(idx).addClass('is-active').append(span);
      }

      /**
      * Destroys the carousel and hides the element.
      * @function
      */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();
        Foundation.unregisterPlugin(this);
      }
    }]);

    return Orbit;
  }();

  Orbit.defaults = {
    /**
    * Tells the JS to look for and loadBullets.
    * @option
    * @example true
    */
    bullets: true,
    /**
    * Tells the JS to apply event listeners to nav buttons
    * @option
    * @example true
    */
    navButtons: true,
    /**
    * motion-ui animation class to apply
    * @option
    * @example 'slide-in-right'
    */
    animInFromRight: 'slide-in-right',
    /**
    * motion-ui animation class to apply
    * @option
    * @example 'slide-out-right'
    */
    animOutToRight: 'slide-out-right',
    /**
    * motion-ui animation class to apply
    * @option
    * @example 'slide-in-left'
    *
    */
    animInFromLeft: 'slide-in-left',
    /**
    * motion-ui animation class to apply
    * @option
    * @example 'slide-out-left'
    */
    animOutToLeft: 'slide-out-left',
    /**
    * Allows Orbit to automatically animate on page load.
    * @option
    * @example true
    */
    autoPlay: true,
    /**
    * Amount of time, in ms, between slide transitions
    * @option
    * @example 5000
    */
    timerDelay: 5000,
    /**
    * Allows Orbit to infinitely loop through the slides
    * @option
    * @example true
    */
    infiniteWrap: true,
    /**
    * Allows the Orbit slides to bind to swipe events for mobile, requires an additional util library
    * @option
    * @example true
    */
    swipe: true,
    /**
    * Allows the timing function to pause animation on hover.
    * @option
    * @example true
    */
    pauseOnHover: true,
    /**
    * Allows Orbit to bind keyboard events to the slider, to animate frames with arrow keys
    * @option
    * @example true
    */
    accessible: true,
    /**
    * Class applied to the container of Orbit
    * @option
    * @example 'orbit-container'
    */
    containerClass: 'orbit-container',
    /**
    * Class applied to individual slides.
    * @option
    * @example 'orbit-slide'
    */
    slideClass: 'orbit-slide',
    /**
    * Class applied to the bullet container. You're welcome.
    * @option
    * @example 'orbit-bullets'
    */
    boxOfBullets: 'orbit-bullets',
    /**
    * Class applied to the `next` navigation button.
    * @option
    * @example 'orbit-next'
    */
    nextClass: 'orbit-next',
    /**
    * Class applied to the `previous` navigation button.
    * @option
    * @example 'orbit-previous'
    */
    prevClass: 'orbit-previous',
    /**
    * Boolean to flag the js to use motion ui classes or not. Default to true for backwards compatability.
    * @option
    * @example true
    */
    useMUI: true
  };

  // Window exports
  Foundation.plugin(Orbit, 'Orbit');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * ResponsiveMenu module.
   * @module foundation.responsiveMenu
   * @requires foundation.util.triggers
   * @requires foundation.util.mediaQuery
   * @requires foundation.util.accordionMenu
   * @requires foundation.util.drilldown
   * @requires foundation.util.dropdown-menu
   */

  var ResponsiveMenu = function () {
    /**
     * Creates a new instance of a responsive menu.
     * @class
     * @fires ResponsiveMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function ResponsiveMenu(element, options) {
      _classCallCheck(this, ResponsiveMenu);

      this.$element = $(element);
      this.rules = this.$element.data('responsive-menu');
      this.currentMq = null;
      this.currentPlugin = null;

      this._init();
      this._events();

      Foundation.registerPlugin(this, 'ResponsiveMenu');
    }

    /**
     * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
     * @function
     * @private
     */


    _createClass(ResponsiveMenu, [{
      key: '_init',
      value: function _init() {
        // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
        if (typeof this.rules === 'string') {
          var rulesTree = {};

          // Parse rules from "classes" pulled from data attribute
          var rules = this.rules.split(' ');

          // Iterate through every rule found
          for (var i = 0; i < rules.length; i++) {
            var rule = rules[i].split('-');
            var ruleSize = rule.length > 1 ? rule[0] : 'small';
            var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

            if (MenuPlugins[rulePlugin] !== null) {
              rulesTree[ruleSize] = MenuPlugins[rulePlugin];
            }
          }

          this.rules = rulesTree;
        }

        if (!$.isEmptyObject(this.rules)) {
          this._checkMediaQueries();
        }
      }

      /**
       * Initializes events for the Menu.
       * @function
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;

        $(window).on('changed.zf.mediaquery', function () {
          _this._checkMediaQueries();
        });
        // $(window).on('resize.zf.ResponsiveMenu', function() {
        //   _this._checkMediaQueries();
        // });
      }

      /**
       * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
       * @function
       * @private
       */

    }, {
      key: '_checkMediaQueries',
      value: function _checkMediaQueries() {
        var matchedMq,
            _this = this;
        // Iterate through each rule and find the last matching rule
        $.each(this.rules, function (key) {
          if (Foundation.MediaQuery.atLeast(key)) {
            matchedMq = key;
          }
        });

        // No match? No dice
        if (!matchedMq) return;

        // Plugin already initialized? We good
        if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;

        // Remove existing plugin-specific CSS classes
        $.each(MenuPlugins, function (key, value) {
          _this.$element.removeClass(value.cssClass);
        });

        // Add the CSS class for the new plugin
        this.$element.addClass(this.rules[matchedMq].cssClass);

        // Create an instance of the new plugin
        if (this.currentPlugin) this.currentPlugin.destroy();
        this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
      }

      /**
       * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.currentPlugin.destroy();
        $(window).off('.zf.ResponsiveMenu');
        Foundation.unregisterPlugin(this);
      }
    }]);

    return ResponsiveMenu;
  }();

  ResponsiveMenu.defaults = {};

  // The plugin matches the plugin classes with these plugin instances.
  var MenuPlugins = {
    dropdown: {
      cssClass: 'dropdown',
      plugin: Foundation._plugins['dropdown-menu'] || null
    },
    drilldown: {
      cssClass: 'drilldown',
      plugin: Foundation._plugins['drilldown'] || null
    },
    accordion: {
      cssClass: 'accordion-menu',
      plugin: Foundation._plugins['accordion-menu'] || null
    }
  };

  // Window exports
  Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * ResponsiveToggle module.
   * @module foundation.responsiveToggle
   * @requires foundation.util.mediaQuery
   */

  var ResponsiveToggle = function () {
    /**
     * Creates a new instance of Tab Bar.
     * @class
     * @fires ResponsiveToggle#init
     * @param {jQuery} element - jQuery object to attach tab bar functionality to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function ResponsiveToggle(element, options) {
      _classCallCheck(this, ResponsiveToggle);

      this.$element = $(element);
      this.options = $.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);

      this._init();
      this._events();

      Foundation.registerPlugin(this, 'ResponsiveToggle');
    }

    /**
     * Initializes the tab bar by finding the target element, toggling element, and running update().
     * @function
     * @private
     */


    _createClass(ResponsiveToggle, [{
      key: '_init',
      value: function _init() {
        var targetID = this.$element.data('responsive-toggle');
        if (!targetID) {
          console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
        }

        this.$targetMenu = $('#' + targetID);
        this.$toggler = this.$element.find('[data-toggle]');

        this._update();
      }

      /**
       * Adds necessary event handlers for the tab bar to work.
       * @function
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;

        this._updateMqHandler = this._update.bind(this);

        $(window).on('changed.zf.mediaquery', this._updateMqHandler);

        this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));
      }

      /**
       * Checks the current media query to determine if the tab bar should be visible or hidden.
       * @function
       * @private
       */

    }, {
      key: '_update',
      value: function _update() {
        // Mobile
        if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
          this.$element.show();
          this.$targetMenu.hide();
        }

        // Desktop
        else {
            this.$element.hide();
            this.$targetMenu.show();
          }
      }

      /**
       * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
       * @function
       * @fires ResponsiveToggle#toggled
       */

    }, {
      key: 'toggleMenu',
      value: function toggleMenu() {
        if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
          this.$targetMenu.toggle(0);

          /**
           * Fires when the element attached to the tab bar toggles.
           * @event ResponsiveToggle#toggled
           */
          this.$element.trigger('toggled.zf.responsiveToggle');
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.off('.zf.responsiveToggle');
        this.$toggler.off('.zf.responsiveToggle');

        $(window).off('changed.zf.mediaquery', this._updateMqHandler);

        Foundation.unregisterPlugin(this);
      }
    }]);

    return ResponsiveToggle;
  }();

  ResponsiveToggle.defaults = {
    /**
     * The breakpoint after which the menu is always shown, and the tab bar is hidden.
     * @option
     * @example 'medium'
     */
    hideFor: 'medium'
  };

  // Window exports
  Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Reveal module.
   * @module foundation.reveal
   * @requires foundation.util.keyboard
   * @requires foundation.util.box
   * @requires foundation.util.triggers
   * @requires foundation.util.mediaQuery
   * @requires foundation.util.motion if using animations
   */

  var Reveal = function () {
    /**
     * Creates a new instance of Reveal.
     * @class
     * @param {jQuery} element - jQuery object to use for the modal.
     * @param {Object} options - optional parameters.
     */
    function Reveal(element, options) {
      _classCallCheck(this, Reveal);

      this.$element = element;
      this.options = $.extend({}, Reveal.defaults, this.$element.data(), options);
      this._init();

      Foundation.registerPlugin(this, 'Reveal');
      Foundation.Keyboard.register('Reveal', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ESCAPE': 'close',
        'TAB': 'tab_forward',
        'SHIFT_TAB': 'tab_backward'
      });
    }

    /**
     * Initializes the modal by adding the overlay and close buttons, (if selected).
     * @private
     */


    _createClass(Reveal, [{
      key: '_init',
      value: function _init() {
        this.id = this.$element.attr('id');
        this.isActive = false;
        this.cached = { mq: Foundation.MediaQuery.current };
        this.isMobile = mobileSniff();

        this.$anchor = $('[data-open="' + this.id + '"]').length ? $('[data-open="' + this.id + '"]') : $('[data-toggle="' + this.id + '"]');
        this.$anchor.attr({
          'aria-controls': this.id,
          'aria-haspopup': true,
          'tabindex': 0
        });

        if (this.options.fullScreen || this.$element.hasClass('full')) {
          this.options.fullScreen = true;
          this.options.overlay = false;
        }
        if (this.options.overlay && !this.$overlay) {
          this.$overlay = this._makeOverlay(this.id);
        }

        this.$element.attr({
          'role': 'dialog',
          'aria-hidden': true,
          'data-yeti-box': this.id,
          'data-resize': this.id
        });

        if (this.$overlay) {
          this.$element.detach().appendTo(this.$overlay);
        } else {
          this.$element.detach().appendTo($('body'));
          this.$element.addClass('without-overlay');
        }
        this._events();
        if (this.options.deepLink && window.location.hash === '#' + this.id) {
          $(window).one('load.zf.reveal', this.open.bind(this));
        }
      }

      /**
       * Creates an overlay div to display behind the modal.
       * @private
       */

    }, {
      key: '_makeOverlay',
      value: function _makeOverlay(id) {
        var $overlay = $('<div></div>').addClass('reveal-overlay').appendTo('body');
        return $overlay;
      }

      /**
       * Updates position of modal
       * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
       * @private
       */

    }, {
      key: '_updatePosition',
      value: function _updatePosition() {
        var width = this.$element.outerWidth();
        var outerWidth = $(window).width();
        var height = this.$element.outerHeight();
        var outerHeight = $(window).height();
        var left, top;
        if (this.options.hOffset === 'auto') {
          left = parseInt((outerWidth - width) / 2, 10);
        } else {
          left = parseInt(this.options.hOffset, 10);
        }
        if (this.options.vOffset === 'auto') {
          if (height > outerHeight) {
            top = parseInt(Math.min(100, outerHeight / 10), 10);
          } else {
            top = parseInt((outerHeight - height) / 4, 10);
          }
        } else {
          top = parseInt(this.options.vOffset, 10);
        }
        this.$element.css({ top: top + 'px' });
        // only worry about left if we don't have an overlay or we havea  horizontal offset,
        // otherwise we're perfectly in the middle
        if (!this.$overlay || this.options.hOffset !== 'auto') {
          this.$element.css({ left: left + 'px' });
          this.$element.css({ margin: '0px' });
        }
      }

      /**
       * Adds event handlers for the modal.
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this2 = this;

        var _this = this;

        this.$element.on({
          'open.zf.trigger': this.open.bind(this),
          'close.zf.trigger': function (event, $element) {
            if (event.target === _this.$element[0] || $(event.target).parents('[data-closable]')[0] === $element) {
              // only close reveal when it's explicitly called
              return _this2.close.apply(_this2);
            }
          },
          'toggle.zf.trigger': this.toggle.bind(this),
          'resizeme.zf.trigger': function () {
            _this._updatePosition();
          }
        });

        if (this.$anchor.length) {
          this.$anchor.on('keydown.zf.reveal', function (e) {
            if (e.which === 13 || e.which === 32) {
              e.stopPropagation();
              e.preventDefault();
              _this.open();
            }
          });
        }

        if (this.options.closeOnClick && this.options.overlay) {
          this.$overlay.off('.zf.reveal').on('click.zf.reveal', function (e) {
            if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target) || !$.contains(document, e.target)) {
              return;
            }
            _this.close();
          });
        }
        if (this.options.deepLink) {
          $(window).on('popstate.zf.reveal:' + this.id, this._handleState.bind(this));
        }
      }

      /**
       * Handles modal methods on back/forward button clicks or any other event that triggers popstate.
       * @private
       */

    }, {
      key: '_handleState',
      value: function _handleState(e) {
        if (window.location.hash === '#' + this.id && !this.isActive) {
          this.open();
        } else {
          this.close();
        }
      }

      /**
       * Opens the modal controlled by `this.$anchor`, and closes all others by default.
       * @function
       * @fires Reveal#closeme
       * @fires Reveal#open
       */

    }, {
      key: 'open',
      value: function open() {
        var _this3 = this;

        if (this.options.deepLink) {
          var hash = '#' + this.id;

          if (window.history.pushState) {
            window.history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        }

        this.isActive = true;

        // Make elements invisible, but remove display: none so we can get size and positioning
        this.$element.css({ 'visibility': 'hidden' }).show().scrollTop(0);
        if (this.options.overlay) {
          this.$overlay.css({ 'visibility': 'hidden' }).show();
        }

        this._updatePosition();

        this.$element.hide().css({ 'visibility': '' });

        if (this.$overlay) {
          this.$overlay.css({ 'visibility': '' }).hide();
          if (this.$element.hasClass('fast')) {
            this.$overlay.addClass('fast');
          } else if (this.$element.hasClass('slow')) {
            this.$overlay.addClass('slow');
          }
        }

        if (!this.options.multipleOpened) {
          /**
           * Fires immediately before the modal opens.
           * Closes any other modals that are currently open
           * @event Reveal#closeme
           */
          this.$element.trigger('closeme.zf.reveal', this.id);
        }
        // Motion UI method of reveal
        if (this.options.animationIn) {
          var afterAnimationFocus = function () {
            _this.$element.attr({
              'aria-hidden': false,
              'tabindex': -1
            }).focus();
          };

          var _this = this;

          if (this.options.overlay) {
            Foundation.Motion.animateIn(this.$overlay, 'fade-in');
          }
          Foundation.Motion.animateIn(this.$element, this.options.animationIn, function () {
            _this3.focusableElements = Foundation.Keyboard.findFocusable(_this3.$element);
            afterAnimationFocus();
          });
        }
        // jQuery method of reveal
        else {
            if (this.options.overlay) {
              this.$overlay.show(0);
            }
            this.$element.show(this.options.showDelay);
          }

        // handle accessibility
        this.$element.attr({
          'aria-hidden': false,
          'tabindex': -1
        }).focus();

        /**
         * Fires when the modal has successfully opened.
         * @event Reveal#open
         */
        this.$element.trigger('open.zf.reveal');

        if (this.isMobile) {
          this.originalScrollPos = window.pageYOffset;
          $('html, body').addClass('is-reveal-open');
        } else {
          $('body').addClass('is-reveal-open');
        }

        setTimeout(function () {
          _this3._extraHandlers();
        }, 0);
      }

      /**
       * Adds extra event handlers for the body and window if necessary.
       * @private
       */

    }, {
      key: '_extraHandlers',
      value: function _extraHandlers() {
        var _this = this;
        this.focusableElements = Foundation.Keyboard.findFocusable(this.$element);

        if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
          $('body').on('click.zf.reveal', function (e) {
            if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target) || !$.contains(document, e.target)) {
              return;
            }
            _this.close();
          });
        }

        if (this.options.closeOnEsc) {
          $(window).on('keydown.zf.reveal', function (e) {
            Foundation.Keyboard.handleKey(e, 'Reveal', {
              close: function () {
                if (_this.options.closeOnEsc) {
                  _this.close();
                  _this.$anchor.focus();
                }
              }
            });
          });
        }

        // lock focus within modal while tabbing
        this.$element.on('keydown.zf.reveal', function (e) {
          var $target = $(this);
          // handle keyboard event with keyboard util
          Foundation.Keyboard.handleKey(e, 'Reveal', {
            tab_forward: function () {
              _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
              if (_this.$element.find(':focus').is(_this.focusableElements.eq(-1))) {
                // left modal downwards, setting focus to first element
                _this.focusableElements.eq(0).focus();
                return true;
              }
              if (_this.focusableElements.length === 0) {
                // no focusable elements inside the modal at all, prevent tabbing in general
                return true;
              }
            },
            tab_backward: function () {
              _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
              if (_this.$element.find(':focus').is(_this.focusableElements.eq(0)) || _this.$element.is(':focus')) {
                // left modal upwards, setting focus to last element
                _this.focusableElements.eq(-1).focus();
                return true;
              }
              if (_this.focusableElements.length === 0) {
                // no focusable elements inside the modal at all, prevent tabbing in general
                return true;
              }
            },
            open: function () {
              if (_this.$element.find(':focus').is(_this.$element.find('[data-close]'))) {
                setTimeout(function () {
                  // set focus back to anchor if close button has been activated
                  _this.$anchor.focus();
                }, 1);
              } else if ($target.is(_this.focusableElements)) {
                // dont't trigger if acual element has focus (i.e. inputs, links, ...)
                _this.open();
              }
            },
            close: function () {
              if (_this.options.closeOnEsc) {
                _this.close();
                _this.$anchor.focus();
              }
            },
            handled: function (preventDefault) {
              if (preventDefault) {
                e.preventDefault();
              }
            }
          });
        });
      }

      /**
       * Closes the modal.
       * @function
       * @fires Reveal#closed
       */

    }, {
      key: 'close',
      value: function close() {
        if (!this.isActive || !this.$element.is(':visible')) {
          return false;
        }
        var _this = this;

        // Motion UI method of hiding
        if (this.options.animationOut) {
          if (this.options.overlay) {
            Foundation.Motion.animateOut(this.$overlay, 'fade-out', finishUp);
          } else {
            finishUp();
          }

          Foundation.Motion.animateOut(this.$element, this.options.animationOut);
        }
        // jQuery method of hiding
        else {
            if (this.options.overlay) {
              this.$overlay.hide(0, finishUp);
            } else {
              finishUp();
            }

            this.$element.hide(this.options.hideDelay);
          }

        // Conditionals to remove extra event listeners added on open
        if (this.options.closeOnEsc) {
          $(window).off('keydown.zf.reveal');
        }

        if (!this.options.overlay && this.options.closeOnClick) {
          $('body').off('click.zf.reveal');
        }

        this.$element.off('keydown.zf.reveal');

        function finishUp() {
          if (_this.isMobile) {
            $('html, body').removeClass('is-reveal-open');
            if (_this.originalScrollPos) {
              $('body').scrollTop(_this.originalScrollPos);
              _this.originalScrollPos = null;
            }
          } else {
            $('body').removeClass('is-reveal-open');
          }

          _this.$element.attr('aria-hidden', true);

          /**
          * Fires when the modal is done closing.
          * @event Reveal#closed
          */
          _this.$element.trigger('closed.zf.reveal');
        }

        /**
        * Resets the modal content
        * This prevents a running video to keep going in the background
        */
        if (this.options.resetOnClose) {
          this.$element.html(this.$element.html());
        }

        this.isActive = false;
        if (_this.options.deepLink) {
          if (window.history.replaceState) {
            window.history.replaceState("", document.title, window.location.pathname);
          } else {
            window.location.hash = '';
          }
        }
      }

      /**
       * Toggles the open/closed state of a modal.
       * @function
       */

    }, {
      key: 'toggle',
      value: function toggle() {
        if (this.isActive) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: 'destroy',


      /**
       * Destroys an instance of a modal.
       * @function
       */
      value: function destroy() {
        if (this.options.overlay) {
          this.$element.appendTo($('body')); // move $element outside of $overlay to prevent error unregisterPlugin()
          this.$overlay.hide().off().remove();
        }
        this.$element.hide().off();
        this.$anchor.off('.zf');
        $(window).off('.zf.reveal:' + this.id);

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Reveal;
  }();

  Reveal.defaults = {
    /**
     * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
     * @option
     * @example 'slide-in-left'
     */
    animationIn: '',
    /**
     * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
     * @option
     * @example 'slide-out-right'
     */
    animationOut: '',
    /**
     * Time, in ms, to delay the opening of a modal after a click if no animation used.
     * @option
     * @example 10
     */
    showDelay: 0,
    /**
     * Time, in ms, to delay the closing of a modal after a click if no animation used.
     * @option
     * @example 10
     */
    hideDelay: 0,
    /**
     * Allows a click on the body/overlay to close the modal.
     * @option
     * @example true
     */
    closeOnClick: true,
    /**
     * Allows the modal to close if the user presses the `ESCAPE` key.
     * @option
     * @example true
     */
    closeOnEsc: true,
    /**
     * If true, allows multiple modals to be displayed at once.
     * @option
     * @example false
     */
    multipleOpened: false,
    /**
     * Distance, in pixels, the modal should push down from the top of the screen.
     * @option
     * @example auto
     */
    vOffset: 'auto',
    /**
     * Distance, in pixels, the modal should push in from the side of the screen.
     * @option
     * @example auto
     */
    hOffset: 'auto',
    /**
     * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
     * @option
     * @example false
     */
    fullScreen: false,
    /**
     * Percentage of screen height the modal should push up from the bottom of the view.
     * @option
     * @example 10
     */
    btmOffsetPct: 10,
    /**
     * Allows the modal to generate an overlay div, which will cover the view when modal opens.
     * @option
     * @example true
     */
    overlay: true,
    /**
     * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
     * @option
     * @example false
     */
    resetOnClose: false,
    /**
     * Allows the modal to alter the url on open/close, and allows the use of the `back` button to close modals. ALSO, allows a modal to auto-maniacally open on page load IF the hash === the modal's user-set id.
     * @option
     * @example false
     */
    deepLink: false
  };

  // Window exports
  Foundation.plugin(Reveal, 'Reveal');

  function iPhoneSniff() {
    return (/iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
    );
  }

  function androidSniff() {
    return (/Android/.test(window.navigator.userAgent)
    );
  }

  function mobileSniff() {
    return iPhoneSniff() || androidSniff();
  }
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Slider module.
   * @module foundation.slider
   * @requires foundation.util.motion
   * @requires foundation.util.triggers
   * @requires foundation.util.keyboard
   * @requires foundation.util.touch
   */

  var Slider = function () {
    /**
     * Creates a new instance of a drilldown menu.
     * @class
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Slider(element, options) {
      _classCallCheck(this, Slider);

      this.$element = element;
      this.options = $.extend({}, Slider.defaults, this.$element.data(), options);

      this._init();

      Foundation.registerPlugin(this, 'Slider');
      Foundation.Keyboard.register('Slider', {
        'ltr': {
          'ARROW_RIGHT': 'increase',
          'ARROW_UP': 'increase',
          'ARROW_DOWN': 'decrease',
          'ARROW_LEFT': 'decrease',
          'SHIFT_ARROW_RIGHT': 'increase_fast',
          'SHIFT_ARROW_UP': 'increase_fast',
          'SHIFT_ARROW_DOWN': 'decrease_fast',
          'SHIFT_ARROW_LEFT': 'decrease_fast'
        },
        'rtl': {
          'ARROW_LEFT': 'increase',
          'ARROW_RIGHT': 'decrease',
          'SHIFT_ARROW_LEFT': 'increase_fast',
          'SHIFT_ARROW_RIGHT': 'decrease_fast'
        }
      });
    }

    /**
     * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).
     * @function
     * @private
     */


    _createClass(Slider, [{
      key: '_init',
      value: function _init() {
        this.inputs = this.$element.find('input');
        this.handles = this.$element.find('[data-slider-handle]');

        this.$handle = this.handles.eq(0);
        this.$input = this.inputs.length ? this.inputs.eq(0) : $('#' + this.$handle.attr('aria-controls'));
        this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

        var isDbl = false,
            _this = this;
        if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {
          this.options.disabled = true;
          this.$element.addClass(this.options.disabledClass);
        }
        if (!this.inputs.length) {
          this.inputs = $().add(this.$input);
          this.options.binding = true;
        }
        this._setInitAttr(0);
        this._events(this.$handle);

        if (this.handles[1]) {
          this.options.doubleSided = true;
          this.$handle2 = this.handles.eq(1);
          this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : $('#' + this.$handle2.attr('aria-controls'));

          if (!this.inputs[1]) {
            this.inputs = this.inputs.add(this.$input2);
          }
          isDbl = true;

          this._setHandlePos(this.$handle, this.options.initialStart, true, function () {

            _this._setHandlePos(_this.$handle2, _this.options.initialEnd, true);
          });
          // this.$handle.triggerHandler('click.zf.slider');
          this._setInitAttr(1);
          this._events(this.$handle2);
        }

        if (!isDbl) {
          this._setHandlePos(this.$handle, this.options.initialStart, true);
        }
      }

      /**
       * Sets the position of the selected handle and fill bar.
       * @function
       * @private
       * @param {jQuery} $hndl - the selected handle to move.
       * @param {Number} location - floating point between the start and end values of the slider bar.
       * @param {Function} cb - callback function to fire on completion.
       * @fires Slider#moved
       * @fires Slider#changed
       */

    }, {
      key: '_setHandlePos',
      value: function _setHandlePos($hndl, location, noInvert, cb) {
        // don't move if the slider has been disabled since its initialization
        if (this.$element.hasClass(this.options.disabledClass)) {
          return;
        }
        //might need to alter that slightly for bars that will have odd number selections.
        location = parseFloat(location); //on input change events, convert string to number...grumble.

        // prevent slider from running out of bounds, if value exceeds the limits set through options, override the value to min/max
        if (location < this.options.start) {
          location = this.options.start;
        } else if (location > this.options.end) {
          location = this.options.end;
        }

        var isDbl = this.options.doubleSided;

        if (isDbl) {
          //this block is to prevent 2 handles from crossing eachother. Could/should be improved.
          if (this.handles.index($hndl) === 0) {
            var h2Val = parseFloat(this.$handle2.attr('aria-valuenow'));
            location = location >= h2Val ? h2Val - this.options.step : location;
          } else {
            var h1Val = parseFloat(this.$handle.attr('aria-valuenow'));
            location = location <= h1Val ? h1Val + this.options.step : location;
          }
        }

        //this is for single-handled vertical sliders, it adjusts the value to account for the slider being "upside-down"
        //for click and drag events, it's weird due to the scale(-1, 1) css property
        if (this.options.vertical && !noInvert) {
          location = this.options.end - location;
        }

        var _this = this,
            vert = this.options.vertical,
            hOrW = vert ? 'height' : 'width',
            lOrT = vert ? 'top' : 'left',
            handleDim = $hndl[0].getBoundingClientRect()[hOrW],
            elemDim = this.$element[0].getBoundingClientRect()[hOrW],

        //percentage of bar min/max value based on click or drag point
        pctOfBar = percent(location - this.options.start, this.options.end - this.options.start).toFixed(2),

        //number of actual pixels to shift the handle, based on the percentage obtained above
        pxToMove = (elemDim - handleDim) * pctOfBar,

        //percentage of bar to shift the handle
        movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal);
        //fixing the decimal value for the location number, is passed to other methods as a fixed floating-point value
        location = parseFloat(location.toFixed(this.options.decimal));
        // declare empty object for css adjustments, only used with 2 handled-sliders
        var css = {};

        this._setValues($hndl, location);

        // TODO update to calculate based on values set to respective inputs??
        if (isDbl) {
          var isLeftHndl = this.handles.index($hndl) === 0,

          //empty variable, will be used for min-height/width for fill bar
          dim,

          //percentage w/h of the handle compared to the slider bar
          handlePct = ~~(percent(handleDim, elemDim) * 100);
          //if left handle, the math is slightly different than if it's the right handle, and the left/top property needs to be changed for the fill bar
          if (isLeftHndl) {
            //left or top percentage value to apply to the fill bar.
            css[lOrT] = movement + '%';
            //calculate the new min-height/width for the fill bar.
            dim = parseFloat(this.$handle2[0].style[lOrT]) - movement + handlePct;
            //this callback is necessary to prevent errors and allow the proper placement and initialization of a 2-handled slider
            //plus, it means we don't care if 'dim' isNaN on init, it won't be in the future.
            if (cb && typeof cb === 'function') {
              cb();
            } //this is only needed for the initialization of 2 handled sliders
          } else {
            //just caching the value of the left/bottom handle's left/top property
            var handlePos = parseFloat(this.$handle[0].style[lOrT]);
            //calculate the new min-height/width for the fill bar. Use isNaN to prevent false positives for numbers <= 0
            //based on the percentage of movement of the handle being manipulated, less the opposing handle's left/top position, plus the percentage w/h of the handle itself
            dim = movement - (isNaN(handlePos) ? this.options.initialStart / ((this.options.end - this.options.start) / 100) : handlePos) + handlePct;
          }
          // assign the min-height/width to our css object
          css['min-' + hOrW] = dim + '%';
        }

        this.$element.one('finished.zf.animate', function () {
          /**
           * Fires when the handle is done moving.
           * @event Slider#moved
           */
          _this.$element.trigger('moved.zf.slider', [$hndl]);
        });

        //because we don't know exactly how the handle will be moved, check the amount of time it should take to move.
        var moveTime = this.$element.data('dragging') ? 1000 / 60 : this.options.moveTime;

        Foundation.Move(moveTime, $hndl, function () {
          //adjusting the left/top property of the handle, based on the percentage calculated above
          $hndl.css(lOrT, movement + '%');

          if (!_this.options.doubleSided) {
            //if single-handled, a simple method to expand the fill bar
            _this.$fill.css(hOrW, pctOfBar * 100 + '%');
          } else {
            //otherwise, use the css object we created above
            _this.$fill.css(css);
          }
        });

        /**
         * Fires when the value has not been change for a given time.
         * @event Slider#changed
         */
        clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function () {
          _this.$element.trigger('changed.zf.slider', [$hndl]);
        }, _this.options.changedDelay);
      }

      /**
       * Sets the initial attribute for the slider element.
       * @function
       * @private
       * @param {Number} idx - index of the current handle/input to use.
       */

    }, {
      key: '_setInitAttr',
      value: function _setInitAttr(idx) {
        var id = this.inputs.eq(idx).attr('id') || Foundation.GetYoDigits(6, 'slider');
        this.inputs.eq(idx).attr({
          'id': id,
          'max': this.options.end,
          'min': this.options.start,
          'step': this.options.step
        });
        this.handles.eq(idx).attr({
          'role': 'slider',
          'aria-controls': id,
          'aria-valuemax': this.options.end,
          'aria-valuemin': this.options.start,
          'aria-valuenow': idx === 0 ? this.options.initialStart : this.options.initialEnd,
          'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',
          'tabindex': 0
        });
      }

      /**
       * Sets the input and `aria-valuenow` values for the slider element.
       * @function
       * @private
       * @param {jQuery} $handle - the currently selected handle.
       * @param {Number} val - floating point of the new value.
       */

    }, {
      key: '_setValues',
      value: function _setValues($handle, val) {
        var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
        this.inputs.eq(idx).val(val);
        $handle.attr('aria-valuenow', val);
      }

      /**
       * Handles events on the slider element.
       * Calculates the new location of the current handle.
       * If there are two handles and the bar was clicked, it determines which handle to move.
       * @function
       * @private
       * @param {Object} e - the `event` object passed from the listener.
       * @param {jQuery} $handle - the current handle to calculate for, if selected.
       * @param {Number} val - floating point number for the new value of the slider.
       * TODO clean this up, there's a lot of repeated code between this and the _setHandlePos fn.
       */

    }, {
      key: '_handleEvent',
      value: function _handleEvent(e, $handle, val) {
        var value, hasVal;
        if (!val) {
          //click or drag events
          e.preventDefault();
          var _this = this,
              vertical = this.options.vertical,
              param = vertical ? 'height' : 'width',
              direction = vertical ? 'top' : 'left',
              eventOffset = vertical ? e.pageY : e.pageX,
              halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2,
              barDim = this.$element[0].getBoundingClientRect()[param],
              windowScroll = vertical ? $(window).scrollTop() : $(window).scrollLeft();

          var elemOffset = this.$element.offset()[direction];

          // touch events emulated by the touch util give position relative to screen, add window.scroll to event coordinates...
          // best way to guess this is simulated is if clientY == pageY
          if (e.clientY === e.pageY) {
            eventOffset = eventOffset + windowScroll;
          }
          var eventFromBar = eventOffset - elemOffset;
          var barXY;
          if (eventFromBar < 0) {
            barXY = 0;
          } else if (eventFromBar > barDim) {
            barXY = barDim;
          } else {
            barXY = eventFromBar;
          }
          var offsetPct = percent(barXY, barDim);

          value = (this.options.end - this.options.start) * offsetPct + this.options.start;

          // turn everything around for RTL, yay math!
          if (Foundation.rtl() && !this.options.vertical) {
            value = this.options.end - value;
          }

          value = _this._adjustValue(null, value);
          //boolean flag for the setHandlePos fn, specifically for vertical sliders
          hasVal = false;

          if (!$handle) {
            //figure out which handle it is, pass it to the next function.
            var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
                secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
            $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
          }
        } else {
          //change event on input
          value = this._adjustValue(null, val);
          hasVal = true;
        }

        this._setHandlePos($handle, value, hasVal);
      }

      /**
       * Adjustes value for handle in regard to step value. returns adjusted value
       * @function
       * @private
       * @param {jQuery} $handle - the selected handle.
       * @param {Number} value - value to adjust. used if $handle is falsy
       */

    }, {
      key: '_adjustValue',
      value: function _adjustValue($handle, value) {
        var val,
            step = this.options.step,
            div = parseFloat(step / 2),
            left,
            prev_val,
            next_val;
        if (!!$handle) {
          val = parseFloat($handle.attr('aria-valuenow'));
        } else {
          val = value;
        }
        left = val % step;
        prev_val = val - left;
        next_val = prev_val + step;
        if (left === 0) {
          return val;
        }
        val = val >= prev_val + div ? next_val : prev_val;
        return val;
      }

      /**
       * Adds event listeners to the slider elements.
       * @function
       * @private
       * @param {jQuery} $handle - the current handle to apply listeners to.
       */

    }, {
      key: '_events',
      value: function _events($handle) {
        var _this = this,
            curHandle,
            timer;

        this.inputs.off('change.zf.slider').on('change.zf.slider', function (e) {
          var idx = _this.inputs.index($(this));
          _this._handleEvent(e, _this.handles.eq(idx), $(this).val());
        });

        if (this.options.clickSelect) {
          this.$element.off('click.zf.slider').on('click.zf.slider', function (e) {
            if (_this.$element.data('dragging')) {
              return false;
            }

            if (!$(e.target).is('[data-slider-handle]')) {
              if (_this.options.doubleSided) {
                _this._handleEvent(e);
              } else {
                _this._handleEvent(e, _this.$handle);
              }
            }
          });
        }

        if (this.options.draggable) {
          this.handles.addTouch();

          var $body = $('body');
          $handle.off('mousedown.zf.slider').on('mousedown.zf.slider', function (e) {
            $handle.addClass('is-dragging');
            _this.$fill.addClass('is-dragging'); //
            _this.$element.data('dragging', true);

            curHandle = $(e.currentTarget);

            $body.on('mousemove.zf.slider', function (e) {
              e.preventDefault();
              _this._handleEvent(e, curHandle);
            }).on('mouseup.zf.slider', function (e) {
              _this._handleEvent(e, curHandle);

              $handle.removeClass('is-dragging');
              _this.$fill.removeClass('is-dragging');
              _this.$element.data('dragging', false);

              $body.off('mousemove.zf.slider mouseup.zf.slider');
            });
          })
          // prevent events triggered by touch
          .on('selectstart.zf.slider touchmove.zf.slider', function (e) {
            e.preventDefault();
          });
        }

        $handle.off('keydown.zf.slider').on('keydown.zf.slider', function (e) {
          var _$handle = $(this),
              idx = _this.options.doubleSided ? _this.handles.index(_$handle) : 0,
              oldValue = parseFloat(_this.inputs.eq(idx).val()),
              newValue;

          // handle keyboard event with keyboard util
          Foundation.Keyboard.handleKey(e, 'Slider', {
            decrease: function () {
              newValue = oldValue - _this.options.step;
            },
            increase: function () {
              newValue = oldValue + _this.options.step;
            },
            decrease_fast: function () {
              newValue = oldValue - _this.options.step * 10;
            },
            increase_fast: function () {
              newValue = oldValue + _this.options.step * 10;
            },
            handled: function () {
              // only set handle pos when event was handled specially
              e.preventDefault();
              _this._setHandlePos(_$handle, newValue, true);
            }
          });
          /*if (newValue) { // if pressed key has special function, update value
            e.preventDefault();
            _this._setHandlePos(_$handle, newValue);
          }*/
        });
      }

      /**
       * Destroys the slider plugin.
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.handles.off('.zf.slider');
        this.inputs.off('.zf.slider');
        this.$element.off('.zf.slider');

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Slider;
  }();

  Slider.defaults = {
    /**
     * Minimum value for the slider scale.
     * @option
     * @example 0
     */
    start: 0,
    /**
     * Maximum value for the slider scale.
     * @option
     * @example 100
     */
    end: 100,
    /**
     * Minimum value change per change event.
     * @option
     * @example 1
     */
    step: 1,
    /**
     * Value at which the handle/input *(left handle/first input)* should be set to on initialization.
     * @option
     * @example 0
     */
    initialStart: 0,
    /**
     * Value at which the right handle/second input should be set to on initialization.
     * @option
     * @example 100
     */
    initialEnd: 100,
    /**
     * Allows the input to be located outside the container and visible. Set to by the JS
     * @option
     * @example false
     */
    binding: false,
    /**
     * Allows the user to click/tap on the slider bar to select a value.
     * @option
     * @example true
     */
    clickSelect: true,
    /**
     * Set to true and use the `vertical` class to change alignment to vertical.
     * @option
     * @example false
     */
    vertical: false,
    /**
     * Allows the user to drag the slider handle(s) to select a value.
     * @option
     * @example true
     */
    draggable: true,
    /**
     * Disables the slider and prevents event listeners from being applied. Double checked by JS with `disabledClass`.
     * @option
     * @example false
     */
    disabled: false,
    /**
     * Allows the use of two handles. Double checked by the JS. Changes some logic handling.
     * @option
     * @example false
     */
    doubleSided: false,
    /**
     * Potential future feature.
     */
    // steps: 100,
    /**
     * Number of decimal places the plugin should go to for floating point precision.
     * @option
     * @example 2
     */
    decimal: 2,
    /**
     * Time delay for dragged elements.
     */
    // dragDelay: 0,
    /**
     * Time, in ms, to animate the movement of a slider handle if user clicks/taps on the bar. Needs to be manually set if updating the transition time in the Sass settings.
     * @option
     * @example 200
     */
    moveTime: 200, //update this if changing the transition time in the sass
    /**
     * Class applied to disabled sliders.
     * @option
     * @example 'disabled'
     */
    disabledClass: 'disabled',
    /**
     * Will invert the default layout for a vertical<span data-tooltip title="who would do this???"> </span>slider.
     * @option
     * @example false
     */
    invertVertical: false,
    /**
     * Milliseconds before the `changed.zf-slider` event is triggered after value change.
     * @option
     * @example 500
     */
    changedDelay: 500
  };

  function percent(frac, num) {
    return frac / num;
  }
  function absPosition($handle, dir, clickPos, param) {
    return Math.abs($handle.position()[dir] + $handle[param]() / 2 - clickPos);
  }

  // Window exports
  Foundation.plugin(Slider, 'Slider');
}(jQuery);

//*********this is in case we go to static, absolute positions instead of dynamic positioning********
// this.setSteps(function() {
//   _this._events();
//   var initStart = _this.options.positions[_this.options.initialStart - 1] || null;
//   var initEnd = _this.options.initialEnd ? _this.options.position[_this.options.initialEnd - 1] : null;
//   if (initStart || initEnd) {
//     _this._handleEvent(initStart, initEnd);
//   }
// });

//***********the other part of absolute positions*************
// Slider.prototype.setSteps = function(cb) {
//   var posChange = this.$element.outerWidth() / this.options.steps;
//   var counter = 0
//   while(counter < this.options.steps) {
//     if (counter) {
//       this.options.positions.push(this.options.positions[counter - 1] + posChange);
//     } else {
//       this.options.positions.push(posChange);
//     }
//     counter++;
//   }
//   cb();
// };
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Sticky module.
   * @module foundation.sticky
   * @requires foundation.util.triggers
   * @requires foundation.util.mediaQuery
   */

  var Sticky = function () {
    /**
     * Creates a new instance of a sticky thing.
     * @class
     * @param {jQuery} element - jQuery object to make sticky.
     * @param {Object} options - options object passed when creating the element programmatically.
     */
    function Sticky(element, options) {
      _classCallCheck(this, Sticky);

      this.$element = element;
      this.options = $.extend({}, Sticky.defaults, this.$element.data(), options);

      this._init();

      Foundation.registerPlugin(this, 'Sticky');
    }

    /**
     * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
     * @function
     * @private
     */


    _createClass(Sticky, [{
      key: '_init',
      value: function _init() {
        var $parent = this.$element.parent('[data-sticky-container]'),
            id = this.$element[0].id || Foundation.GetYoDigits(6, 'sticky'),
            _this = this;

        if (!$parent.length) {
          this.wasWrapped = true;
        }
        this.$container = $parent.length ? $parent : $(this.options.container).wrapInner(this.$element);
        this.$container.addClass(this.options.containerClass);

        this.$element.addClass(this.options.stickyClass).attr({ 'data-resize': id });

        this.scrollCount = this.options.checkEvery;
        this.isStuck = false;
        $(window).one('load.zf.sticky', function () {
          //We calculate the container height to have correct values for anchor points offset calculation.
          _this.containerHeight = _this.$element.css("display") == "none" ? 0 : _this.$element[0].getBoundingClientRect().height;
          _this.$container.css('height', _this.containerHeight);
          _this.elemHeight = _this.containerHeight;
          if (_this.options.anchor !== '') {
            _this.$anchor = $('#' + _this.options.anchor);
          } else {
            _this._parsePoints();
          }

          _this._setSizes(function () {
            _this._calc(false);
          });
          _this._events(id.split('-').reverse().join('-'));
        });
      }

      /**
       * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
       * @function
       * @private
       */

    }, {
      key: '_parsePoints',
      value: function _parsePoints() {
        var top = this.options.topAnchor == "" ? 1 : this.options.topAnchor,
            btm = this.options.btmAnchor == "" ? document.documentElement.scrollHeight : this.options.btmAnchor,
            pts = [top, btm],
            breaks = {};
        for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
          var pt;
          if (typeof pts[i] === 'number') {
            pt = pts[i];
          } else {
            var place = pts[i].split(':'),
                anchor = $('#' + place[0]);

            pt = anchor.offset().top;
            if (place[1] && place[1].toLowerCase() === 'bottom') {
              pt += anchor[0].getBoundingClientRect().height;
            }
          }
          breaks[i] = pt;
        }

        this.points = breaks;
        return;
      }

      /**
       * Adds event handlers for the scrolling element.
       * @private
       * @param {String} id - psuedo-random id for unique scroll event listener.
       */

    }, {
      key: '_events',
      value: function _events(id) {
        var _this = this,
            scrollListener = this.scrollListener = 'scroll.zf.' + id;
        if (this.isOn) {
          return;
        }
        if (this.canStick) {
          this.isOn = true;
          $(window).off(scrollListener).on(scrollListener, function (e) {
            if (_this.scrollCount === 0) {
              _this.scrollCount = _this.options.checkEvery;
              _this._setSizes(function () {
                _this._calc(false, window.pageYOffset);
              });
            } else {
              _this.scrollCount--;
              _this._calc(false, window.pageYOffset);
            }
          });
        }

        this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function (e, el) {
          _this._setSizes(function () {
            _this._calc(false);
            if (_this.canStick) {
              if (!_this.isOn) {
                _this._events(id);
              }
            } else if (_this.isOn) {
              _this._pauseListeners(scrollListener);
            }
          });
        });
      }

      /**
       * Removes event handlers for scroll and change events on anchor.
       * @fires Sticky#pause
       * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
       */

    }, {
      key: '_pauseListeners',
      value: function _pauseListeners(scrollListener) {
        this.isOn = false;
        $(window).off(scrollListener);

        /**
         * Fires when the plugin is paused due to resize event shrinking the view.
         * @event Sticky#pause
         * @private
         */
        this.$element.trigger('pause.zf.sticky');
      }

      /**
       * Called on every `scroll` event and on `_init`
       * fires functions based on booleans and cached values
       * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
       * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
       */

    }, {
      key: '_calc',
      value: function _calc(checkSizes, scroll) {
        if (checkSizes) {
          this._setSizes();
        }

        if (!this.canStick) {
          if (this.isStuck) {
            this._removeSticky(true);
          }
          return false;
        }

        if (!scroll) {
          scroll = window.pageYOffset;
        }

        if (scroll >= this.topPoint) {
          if (scroll <= this.bottomPoint) {
            if (!this.isStuck) {
              this._setSticky();
            }
          } else {
            if (this.isStuck) {
              this._removeSticky(false);
            }
          }
        } else {
          if (this.isStuck) {
            this._removeSticky(true);
          }
        }
      }

      /**
       * Causes the $element to become stuck.
       * Adds `position: fixed;`, and helper classes.
       * @fires Sticky#stuckto
       * @function
       * @private
       */

    }, {
      key: '_setSticky',
      value: function _setSticky() {
        var _this = this,
            stickTo = this.options.stickTo,
            mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',
            notStuckTo = stickTo === 'top' ? 'bottom' : 'top',
            css = {};

        css[mrgn] = this.options[mrgn] + 'em';
        css[stickTo] = 0;
        css[notStuckTo] = 'auto';
        css['left'] = this.$container.offset().left + parseInt(window.getComputedStyle(this.$container[0])["padding-left"], 10);
        this.isStuck = true;
        this.$element.removeClass('is-anchored is-at-' + notStuckTo).addClass('is-stuck is-at-' + stickTo).css(css)
        /**
         * Fires when the $element has become `position: fixed;`
         * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`
         * @event Sticky#stuckto
         */
        .trigger('sticky.zf.stuckto:' + stickTo);
        this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
          _this._setSizes();
        });
      }

      /**
       * Causes the $element to become unstuck.
       * Removes `position: fixed;`, and helper classes.
       * Adds other helper classes.
       * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
       * @fires Sticky#unstuckfrom
       * @private
       */

    }, {
      key: '_removeSticky',
      value: function _removeSticky(isTop) {
        var stickTo = this.options.stickTo,
            stickToTop = stickTo === 'top',
            css = {},
            anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
            mrgn = stickToTop ? 'marginTop' : 'marginBottom',
            notStuckTo = stickToTop ? 'bottom' : 'top',
            topOrBottom = isTop ? 'top' : 'bottom';

        css[mrgn] = 0;

        css['bottom'] = 'auto';
        if (isTop) {
          css['top'] = 0;
        } else {
          css['top'] = anchorPt;
        }

        css['left'] = '';
        this.isStuck = false;
        this.$element.removeClass('is-stuck is-at-' + stickTo).addClass('is-anchored is-at-' + topOrBottom).css(css)
        /**
         * Fires when the $element has become anchored.
         * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`
         * @event Sticky#unstuckfrom
         */
        .trigger('sticky.zf.unstuckfrom:' + topOrBottom);
      }

      /**
       * Sets the $element and $container sizes for plugin.
       * Calls `_setBreakPoints`.
       * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
       * @private
       */

    }, {
      key: '_setSizes',
      value: function _setSizes(cb) {
        this.canStick = Foundation.MediaQuery.atLeast(this.options.stickyOn);
        if (!this.canStick) {
          if (cb && typeof cb === 'function') {
            cb();
          }
        }
        var _this = this,
            newElemWidth = this.$container[0].getBoundingClientRect().width,
            comp = window.getComputedStyle(this.$container[0]),
            pdng = parseInt(comp['padding-right'], 10);

        if (this.$anchor && this.$anchor.length) {
          this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
        } else {
          this._parsePoints();
        }

        this.$element.css({
          'max-width': newElemWidth - pdng + 'px'
        });

        var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
        if (this.$element.css("display") == "none") {
          newContainerHeight = 0;
        }
        this.containerHeight = newContainerHeight;
        this.$container.css({
          height: newContainerHeight
        });
        this.elemHeight = newContainerHeight;

        if (this.isStuck) {
          this.$element.css({ "left": this.$container.offset().left + parseInt(comp['padding-left'], 10) });
        } else {
          if (this.$element.hasClass('is-at-bottom')) {
            var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
            this.$element.css('top', anchorPt);
          }
        }

        this._setBreakPoints(newContainerHeight, function () {
          if (cb && typeof cb === 'function') {
            cb();
          }
        });
      }

      /**
       * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
       * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
       * @param {Function} cb - optional callback function to be called on completion.
       * @private
       */

    }, {
      key: '_setBreakPoints',
      value: function _setBreakPoints(elemHeight, cb) {
        if (!this.canStick) {
          if (cb && typeof cb === 'function') {
            cb();
          } else {
            return false;
          }
        }
        var mTop = emCalc(this.options.marginTop),
            mBtm = emCalc(this.options.marginBottom),
            topPoint = this.points ? this.points[0] : this.$anchor.offset().top,
            bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,

        // topPoint = this.$anchor.offset().top || this.points[0],
        // bottomPoint = topPoint + this.anchorHeight || this.points[1],
        winHeight = window.innerHeight;

        if (this.options.stickTo === 'top') {
          topPoint -= mTop;
          bottomPoint -= elemHeight + mTop;
        } else if (this.options.stickTo === 'bottom') {
          topPoint -= winHeight - (elemHeight + mBtm);
          bottomPoint -= winHeight - mBtm;
        } else {
          //this would be the stickTo: both option... tricky
        }

        this.topPoint = topPoint;
        this.bottomPoint = bottomPoint;

        if (cb && typeof cb === 'function') {
          cb();
        }
      }

      /**
       * Destroys the current sticky element.
       * Resets the element to the top position first.
       * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._removeSticky(true);

        this.$element.removeClass(this.options.stickyClass + ' is-anchored is-at-top').css({
          height: '',
          top: '',
          bottom: '',
          'max-width': ''
        }).off('resizeme.zf.trigger');
        if (this.$anchor && this.$anchor.length) {
          this.$anchor.off('change.zf.sticky');
        }
        $(window).off(this.scrollListener);

        if (this.wasWrapped) {
          this.$element.unwrap();
        } else {
          this.$container.removeClass(this.options.containerClass).css({
            height: ''
          });
        }
        Foundation.unregisterPlugin(this);
      }
    }]);

    return Sticky;
  }();

  Sticky.defaults = {
    /**
     * Customizable container template. Add your own classes for styling and sizing.
     * @option
     * @example '&lt;div data-sticky-container class="small-6 columns"&gt;&lt;/div&gt;'
     */
    container: '<div data-sticky-container></div>',
    /**
     * Location in the view the element sticks to.
     * @option
     * @example 'top'
     */
    stickTo: 'top',
    /**
     * If anchored to a single element, the id of that element.
     * @option
     * @example 'exampleId'
     */
    anchor: '',
    /**
     * If using more than one element as anchor points, the id of the top anchor.
     * @option
     * @example 'exampleId:top'
     */
    topAnchor: '',
    /**
     * If using more than one element as anchor points, the id of the bottom anchor.
     * @option
     * @example 'exampleId:bottom'
     */
    btmAnchor: '',
    /**
     * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
     * @option
     * @example 1
     */
    marginTop: 1,
    /**
     * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
     * @option
     * @example 1
     */
    marginBottom: 1,
    /**
     * Breakpoint string that is the minimum screen size an element should become sticky.
     * @option
     * @example 'medium'
     */
    stickyOn: 'medium',
    /**
     * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
     * @option
     * @example 'sticky'
     */
    stickyClass: 'sticky',
    /**
     * Class applied to sticky container. Foundation defaults to `sticky-container`.
     * @option
     * @example 'sticky-container'
     */
    containerClass: 'sticky-container',
    /**
     * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
     * @option
     * @example 50
     */
    checkEvery: -1
  };

  /**
   * Helper function to calculate em values
   * @param Number {em} - number of em's to calculate into pixels
   */
  function emCalc(em) {
    return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
  }

  // Window exports
  Foundation.plugin(Sticky, 'Sticky');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Tabs module.
   * @module foundation.tabs
   * @requires foundation.util.keyboard
   * @requires foundation.util.timerAndImageLoader if tabs contain images
   */

  var Tabs = function () {
    /**
     * Creates a new instance of tabs.
     * @class
     * @fires Tabs#init
     * @param {jQuery} element - jQuery object to make into tabs.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Tabs(element, options) {
      _classCallCheck(this, Tabs);

      this.$element = element;
      this.options = $.extend({}, Tabs.defaults, this.$element.data(), options);

      this._init();
      Foundation.registerPlugin(this, 'Tabs');
      Foundation.Keyboard.register('Tabs', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'previous',
        'ARROW_DOWN': 'next',
        'ARROW_LEFT': 'previous'
        // 'TAB': 'next',
        // 'SHIFT_TAB': 'previous'
      });
    }

    /**
     * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
     * @private
     */


    _createClass(Tabs, [{
      key: '_init',
      value: function _init() {
        var _this = this;

        this.$tabTitles = this.$element.find('.' + this.options.linkClass);
        this.$tabContent = $('[data-tabs-content="' + this.$element[0].id + '"]');

        this.$tabTitles.each(function () {
          var $elem = $(this),
              $link = $elem.find('a'),
              isActive = $elem.hasClass('is-active'),
              hash = $link[0].hash.slice(1),
              linkId = $link[0].id ? $link[0].id : hash + '-label',
              $tabContent = $('#' + hash);

          $elem.attr({ 'role': 'presentation' });

          $link.attr({
            'role': 'tab',
            'aria-controls': hash,
            'aria-selected': isActive,
            'id': linkId
          });

          $tabContent.attr({
            'role': 'tabpanel',
            'aria-hidden': !isActive,
            'aria-labelledby': linkId
          });

          if (isActive && _this.options.autoFocus) {
            $link.focus();
          }
        });

        if (this.options.matchHeight) {
          var $images = this.$tabContent.find('img');

          if ($images.length) {
            Foundation.onImagesLoaded($images, this._setHeight.bind(this));
          } else {
            this._setHeight();
          }
        }

        this._events();
      }

      /**
       * Adds event handlers for items within the tabs.
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        this._addKeyHandler();
        this._addClickHandler();
        this._setHeightMqHandler = null;

        if (this.options.matchHeight) {
          this._setHeightMqHandler = this._setHeight.bind(this);

          $(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
        }
      }

      /**
       * Adds click handlers for items within the tabs.
       * @private
       */

    }, {
      key: '_addClickHandler',
      value: function _addClickHandler() {
        var _this = this;

        this.$element.off('click.zf.tabs').on('click.zf.tabs', '.' + this.options.linkClass, function (e) {
          e.preventDefault();
          e.stopPropagation();
          if ($(this).hasClass('is-active')) {
            return;
          }
          _this._handleTabChange($(this));
        });
      }

      /**
       * Adds keyboard event handlers for items within the tabs.
       * @private
       */

    }, {
      key: '_addKeyHandler',
      value: function _addKeyHandler() {
        var _this = this;
        var $firstTab = _this.$element.find('li:first-of-type');
        var $lastTab = _this.$element.find('li:last-of-type');

        this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
          if (e.which === 9) return;

          var $element = $(this),
              $elements = $element.parent('ul').children('li'),
              $prevElement,
              $nextElement;

          $elements.each(function (i) {
            if ($(this).is($element)) {
              if (_this.options.wrapOnKeys) {
                $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
                $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
              } else {
                $prevElement = $elements.eq(Math.max(0, i - 1));
                $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
              }
              return;
            }
          });

          // handle keyboard event with keyboard util
          Foundation.Keyboard.handleKey(e, 'Tabs', {
            open: function () {
              $element.find('[role="tab"]').focus();
              _this._handleTabChange($element);
            },
            previous: function () {
              $prevElement.find('[role="tab"]').focus();
              _this._handleTabChange($prevElement);
            },
            next: function () {
              $nextElement.find('[role="tab"]').focus();
              _this._handleTabChange($nextElement);
            },
            handled: function () {
              e.stopPropagation();
              e.preventDefault();
            }
          });
        });
      }

      /**
       * Opens the tab `$targetContent` defined by `$target`.
       * @param {jQuery} $target - Tab to open.
       * @fires Tabs#change
       * @function
       */

    }, {
      key: '_handleTabChange',
      value: function _handleTabChange($target) {
        var $tabLink = $target.find('[role="tab"]'),
            hash = $tabLink[0].hash,
            $targetContent = this.$tabContent.find(hash),
            $oldTab = this.$element.find('.' + this.options.linkClass + '.is-active').removeClass('is-active').find('[role="tab"]').attr({ 'aria-selected': 'false' });

        $('#' + $oldTab.attr('aria-controls')).removeClass('is-active').attr({ 'aria-hidden': 'true' });

        $target.addClass('is-active');

        $tabLink.attr({ 'aria-selected': 'true' });

        $targetContent.addClass('is-active').attr({ 'aria-hidden': 'false' });

        /**
         * Fires when the plugin has successfully changed tabs.
         * @event Tabs#change
         */
        this.$element.trigger('change.zf.tabs', [$target]);
      }

      /**
       * Public method for selecting a content pane to display.
       * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
       * @function
       */

    }, {
      key: 'selectTab',
      value: function selectTab(elem) {
        var idStr;

        if (typeof elem === 'object') {
          idStr = elem[0].id;
        } else {
          idStr = elem;
        }

        if (idStr.indexOf('#') < 0) {
          idStr = '#' + idStr;
        }

        var $target = this.$tabTitles.find('[href="' + idStr + '"]').parent('.' + this.options.linkClass);

        this._handleTabChange($target);
      }
    }, {
      key: '_setHeight',

      /**
       * Sets the height of each panel to the height of the tallest panel.
       * If enabled in options, gets called on media query change.
       * If loading content via external source, can be called directly or with _reflow.
       * @function
       * @private
       */
      value: function _setHeight() {
        var max = 0;
        this.$tabContent.find('.' + this.options.panelClass).css('height', '').each(function () {
          var panel = $(this),
              isActive = panel.hasClass('is-active');

          if (!isActive) {
            panel.css({ 'visibility': 'hidden', 'display': 'block' });
          }

          var temp = this.getBoundingClientRect().height;

          if (!isActive) {
            panel.css({
              'visibility': '',
              'display': ''
            });
          }

          max = temp > max ? temp : max;
        }).css('height', max + 'px');
      }

      /**
       * Destroys an instance of an tabs.
       * @fires Tabs#destroyed
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.find('.' + this.options.linkClass).off('.zf.tabs').hide().end().find('.' + this.options.panelClass).hide();

        if (this.options.matchHeight) {
          if (this._setHeightMqHandler != null) {
            $(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
          }
        }

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Tabs;
  }();

  Tabs.defaults = {
    /**
     * Allows the window to scroll to content of active pane on load if set to true.
     * @option
     * @example false
     */
    autoFocus: false,

    /**
     * Allows keyboard input to 'wrap' around the tab links.
     * @option
     * @example true
     */
    wrapOnKeys: true,

    /**
     * Allows the tab content panes to match heights if set to true.
     * @option
     * @example false
     */
    matchHeight: false,

    /**
     * Class applied to `li`'s in tab link list.
     * @option
     * @example 'tabs-title'
     */
    linkClass: 'tabs-title',

    /**
     * Class applied to the content containers.
     * @option
     * @example 'tabs-panel'
     */
    panelClass: 'tabs-panel'
  };

  function checkClass($elem) {
    return $elem.hasClass('is-active');
  }

  // Window exports
  Foundation.plugin(Tabs, 'Tabs');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Toggler module.
   * @module foundation.toggler
   * @requires foundation.util.motion
   * @requires foundation.util.triggers
   */

  var Toggler = function () {
    /**
     * Creates a new instance of Toggler.
     * @class
     * @fires Toggler#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function Toggler(element, options) {
      _classCallCheck(this, Toggler);

      this.$element = element;
      this.options = $.extend({}, Toggler.defaults, element.data(), options);
      this.className = '';

      this._init();
      this._events();

      Foundation.registerPlugin(this, 'Toggler');
    }

    /**
     * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
     * @function
     * @private
     */


    _createClass(Toggler, [{
      key: '_init',
      value: function _init() {
        var input;
        // Parse animation classes if they were set
        if (this.options.animate) {
          input = this.options.animate.split(' ');

          this.animationIn = input[0];
          this.animationOut = input[1] || null;
        }
        // Otherwise, parse toggle class
        else {
            input = this.$element.data('toggler');
            // Allow for a . at the beginning of the string
            this.className = input[0] === '.' ? input.slice(1) : input;
          }

        // Add ARIA attributes to triggers
        var id = this.$element[0].id;
        $('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-controls', id);
        // If the target is hidden, add aria-hidden
        this.$element.attr('aria-expanded', this.$element.is(':hidden') ? false : true);
      }

      /**
       * Initializes events for the toggle trigger.
       * @function
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));
      }

      /**
       * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
       * @function
       * @fires Toggler#on
       * @fires Toggler#off
       */

    }, {
      key: 'toggle',
      value: function toggle() {
        this[this.options.animate ? '_toggleAnimate' : '_toggleClass']();
      }
    }, {
      key: '_toggleClass',
      value: function _toggleClass() {
        this.$element.toggleClass(this.className);

        var isOn = this.$element.hasClass(this.className);
        if (isOn) {
          /**
           * Fires if the target element has the class after a toggle.
           * @event Toggler#on
           */
          this.$element.trigger('on.zf.toggler');
        } else {
          /**
           * Fires if the target element does not have the class after a toggle.
           * @event Toggler#off
           */
          this.$element.trigger('off.zf.toggler');
        }

        this._updateARIA(isOn);
      }
    }, {
      key: '_toggleAnimate',
      value: function _toggleAnimate() {
        var _this = this;

        if (this.$element.is(':hidden')) {
          Foundation.Motion.animateIn(this.$element, this.animationIn, function () {
            _this._updateARIA(true);
            this.trigger('on.zf.toggler');
          });
        } else {
          Foundation.Motion.animateOut(this.$element, this.animationOut, function () {
            _this._updateARIA(false);
            this.trigger('off.zf.toggler');
          });
        }
      }
    }, {
      key: '_updateARIA',
      value: function _updateARIA(isOn) {
        this.$element.attr('aria-expanded', isOn ? true : false);
      }

      /**
       * Destroys the instance of Toggler on the element.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.off('.zf.toggler');
        Foundation.unregisterPlugin(this);
      }
    }]);

    return Toggler;
  }();

  Toggler.defaults = {
    /**
     * Tells the plugin if the element should animated when toggled.
     * @option
     * @example false
     */
    animate: false
  };

  // Window exports
  Foundation.plugin(Toggler, 'Toggler');
}(jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Tooltip module.
   * @module foundation.tooltip
   * @requires foundation.util.box
   * @requires foundation.util.mediaQuery
   * @requires foundation.util.triggers
   */

  var Tooltip = function () {
    /**
     * Creates a new instance of a Tooltip.
     * @class
     * @fires Tooltip#init
     * @param {jQuery} element - jQuery object to attach a tooltip to.
     * @param {Object} options - object to extend the default configuration.
     */
    function Tooltip(element, options) {
      _classCallCheck(this, Tooltip);

      this.$element = element;
      this.options = $.extend({}, Tooltip.defaults, this.$element.data(), options);

      this.isActive = false;
      this.isClick = false;
      this._init();

      Foundation.registerPlugin(this, 'Tooltip');
    }

    /**
     * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
     * @private
     */


    _createClass(Tooltip, [{
      key: '_init',
      value: function _init() {
        var elemId = this.$element.attr('aria-describedby') || Foundation.GetYoDigits(6, 'tooltip');

        this.options.positionClass = this.options.positionClass || this._getPositionClass(this.$element);
        this.options.tipText = this.options.tipText || this.$element.attr('title');
        this.template = this.options.template ? $(this.options.template) : this._buildTemplate(elemId);

        this.template.appendTo(document.body).text(this.options.tipText).hide();

        this.$element.attr({
          'title': '',
          'aria-describedby': elemId,
          'data-yeti-box': elemId,
          'data-toggle': elemId,
          'data-resize': elemId
        }).addClass(this.options.triggerClass);

        //helper variables to track movement on collisions
        this.usedPositions = [];
        this.counter = 4;
        this.classChanged = false;

        this._events();
      }

      /**
       * Grabs the current positioning class, if present, and returns the value or an empty string.
       * @private
       */

    }, {
      key: '_getPositionClass',
      value: function _getPositionClass(element) {
        if (!element) {
          return '';
        }
        // var position = element.attr('class').match(/top|left|right/g);
        var position = element[0].className.match(/\b(top|left|right)\b/g);
        position = position ? position[0] : '';
        return position;
      }
    }, {
      key: '_buildTemplate',

      /**
       * builds the tooltip element, adds attributes, and returns the template.
       * @private
       */
      value: function _buildTemplate(id) {
        var templateClasses = (this.options.tooltipClass + ' ' + this.options.positionClass + ' ' + this.options.templateClasses).trim();
        var $template = $('<div></div>').addClass(templateClasses).attr({
          'role': 'tooltip',
          'aria-hidden': true,
          'data-is-active': false,
          'data-is-focus': false,
          'id': id
        });
        return $template;
      }

      /**
       * Function that gets called if a collision event is detected.
       * @param {String} position - positioning class to try
       * @private
       */

    }, {
      key: '_reposition',
      value: function _reposition(position) {
        this.usedPositions.push(position ? position : 'bottom');

        //default, try switching to opposite side
        if (!position && this.usedPositions.indexOf('top') < 0) {
          this.template.addClass('top');
        } else if (position === 'top' && this.usedPositions.indexOf('bottom') < 0) {
          this.template.removeClass(position);
        } else if (position === 'left' && this.usedPositions.indexOf('right') < 0) {
          this.template.removeClass(position).addClass('right');
        } else if (position === 'right' && this.usedPositions.indexOf('left') < 0) {
          this.template.removeClass(position).addClass('left');
        }

        //if default change didn't work, try bottom or left first
        else if (!position && this.usedPositions.indexOf('top') > -1 && this.usedPositions.indexOf('left') < 0) {
            this.template.addClass('left');
          } else if (position === 'top' && this.usedPositions.indexOf('bottom') > -1 && this.usedPositions.indexOf('left') < 0) {
            this.template.removeClass(position).addClass('left');
          } else if (position === 'left' && this.usedPositions.indexOf('right') > -1 && this.usedPositions.indexOf('bottom') < 0) {
            this.template.removeClass(position);
          } else if (position === 'right' && this.usedPositions.indexOf('left') > -1 && this.usedPositions.indexOf('bottom') < 0) {
            this.template.removeClass(position);
          }
          //if nothing cleared, set to bottom
          else {
              this.template.removeClass(position);
            }
        this.classChanged = true;
        this.counter--;
      }

      /**
       * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
       * if the tooltip is larger than the screen width, default to full width - any user selected margin
       * @private
       */

    }, {
      key: '_setPosition',
      value: function _setPosition() {
        var position = this._getPositionClass(this.template),
            $tipDims = Foundation.Box.GetDimensions(this.template),
            $anchorDims = Foundation.Box.GetDimensions(this.$element),
            direction = position === 'left' ? 'left' : position === 'right' ? 'left' : 'top',
            param = direction === 'top' ? 'height' : 'width',
            offset = param === 'height' ? this.options.vOffset : this.options.hOffset,
            _this = this;

        if ($tipDims.width >= $tipDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template)) {
          this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
            // this.$element.offset(Foundation.GetOffsets(this.template, this.$element, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
            'width': $anchorDims.windowDims.width - this.options.hOffset * 2,
            'height': 'auto'
          });
          return false;
        }

        this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, 'center ' + (position || 'bottom'), this.options.vOffset, this.options.hOffset));

        while (!Foundation.Box.ImNotTouchingYou(this.template) && this.counter) {
          this._reposition(position);
          this._setPosition();
        }
      }

      /**
       * reveals the tooltip, and fires an event to close any other open tooltips on the page
       * @fires Tooltip#closeme
       * @fires Tooltip#show
       * @function
       */

    }, {
      key: 'show',
      value: function show() {
        if (this.options.showOn !== 'all' && !Foundation.MediaQuery.atLeast(this.options.showOn)) {
          // console.error('The screen is too small to display this tooltip');
          return false;
        }

        var _this = this;
        this.template.css('visibility', 'hidden').show();
        this._setPosition();

        /**
         * Fires to close all other open tooltips on the page
         * @event Closeme#tooltip
         */
        this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));

        this.template.attr({
          'data-is-active': true,
          'aria-hidden': false
        });
        _this.isActive = true;
        // console.log(this.template);
        this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function () {
          //maybe do stuff?
        });
        /**
         * Fires when the tooltip is shown
         * @event Tooltip#show
         */
        this.$element.trigger('show.zf.tooltip');
      }

      /**
       * Hides the current tooltip, and resets the positioning class if it was changed due to collision
       * @fires Tooltip#hide
       * @function
       */

    }, {
      key: 'hide',
      value: function hide() {
        // console.log('hiding', this.$element.data('yeti-box'));
        var _this = this;
        this.template.stop().attr({
          'aria-hidden': true,
          'data-is-active': false
        }).fadeOut(this.options.fadeOutDuration, function () {
          _this.isActive = false;
          _this.isClick = false;
          if (_this.classChanged) {
            _this.template.removeClass(_this._getPositionClass(_this.template)).addClass(_this.options.positionClass);

            _this.usedPositions = [];
            _this.counter = 4;
            _this.classChanged = false;
          }
        });
        /**
         * fires when the tooltip is hidden
         * @event Tooltip#hide
         */
        this.$element.trigger('hide.zf.tooltip');
      }

      /**
       * adds event listeners for the tooltip and its anchor
       * TODO combine some of the listeners like focus and mouseenter, etc.
       * @private
       */

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;
        var $template = this.template;
        var isFocus = false;

        if (!this.options.disableHover) {

          this.$element.on('mouseenter.zf.tooltip', function (e) {
            if (!_this.isActive) {
              _this.timeout = setTimeout(function () {
                _this.show();
              }, _this.options.hoverDelay);
            }
          }).on('mouseleave.zf.tooltip', function (e) {
            clearTimeout(_this.timeout);
            if (!isFocus || _this.isClick && !_this.options.clickOpen) {
              _this.hide();
            }
          });
        }

        if (this.options.clickOpen) {
          this.$element.on('mousedown.zf.tooltip', function (e) {
            e.stopImmediatePropagation();
            if (_this.isClick) {
              //_this.hide();
              // _this.isClick = false;
            } else {
              _this.isClick = true;
              if ((_this.options.disableHover || !_this.$element.attr('tabindex')) && !_this.isActive) {
                _this.show();
              }
            }
          });
        } else {
          this.$element.on('mousedown.zf.tooltip', function (e) {
            e.stopImmediatePropagation();
            _this.isClick = true;
          });
        }

        if (!this.options.disableForTouch) {
          this.$element.on('tap.zf.tooltip touchend.zf.tooltip', function (e) {
            _this.isActive ? _this.hide() : _this.show();
          });
        }

        this.$element.on({
          // 'toggle.zf.trigger': this.toggle.bind(this),
          // 'close.zf.trigger': this.hide.bind(this)
          'close.zf.trigger': this.hide.bind(this)
        });

        this.$element.on('focus.zf.tooltip', function (e) {
          isFocus = true;
          if (_this.isClick) {
            // If we're not showing open on clicks, we need to pretend a click-launched focus isn't
            // a real focus, otherwise on hover and come back we get bad behavior
            if (!_this.options.clickOpen) {
              isFocus = false;
            }
            return false;
          } else {
            _this.show();
          }
        }).on('focusout.zf.tooltip', function (e) {
          isFocus = false;
          _this.isClick = false;
          _this.hide();
        }).on('resizeme.zf.trigger', function () {
          if (_this.isActive) {
            _this._setPosition();
          }
        });
      }

      /**
       * adds a toggle method, in addition to the static show() & hide() functions
       * @function
       */

    }, {
      key: 'toggle',
      value: function toggle() {
        if (this.isActive) {
          this.hide();
        } else {
          this.show();
        }
      }

      /**
       * Destroys an instance of tooltip, removes template element from the view.
       * @function
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.attr('title', this.template.text()).off('.zf.trigger .zf.tootip')
        //  .removeClass('has-tip')
        .removeAttr('aria-describedby').removeAttr('data-yeti-box').removeAttr('data-toggle').removeAttr('data-resize');

        this.template.remove();

        Foundation.unregisterPlugin(this);
      }
    }]);

    return Tooltip;
  }();

  Tooltip.defaults = {
    disableForTouch: false,
    /**
     * Time, in ms, before a tooltip should open on hover.
     * @option
     * @example 200
     */
    hoverDelay: 200,
    /**
     * Time, in ms, a tooltip should take to fade into view.
     * @option
     * @example 150
     */
    fadeInDuration: 150,
    /**
     * Time, in ms, a tooltip should take to fade out of view.
     * @option
     * @example 150
     */
    fadeOutDuration: 150,
    /**
     * Disables hover events from opening the tooltip if set to true
     * @option
     * @example false
     */
    disableHover: false,
    /**
     * Optional addtional classes to apply to the tooltip template on init.
     * @option
     * @example 'my-cool-tip-class'
     */
    templateClasses: '',
    /**
     * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.
     * @option
     * @example 'tooltip'
     */
    tooltipClass: 'tooltip',
    /**
     * Class applied to the tooltip anchor element.
     * @option
     * @example 'has-tip'
     */
    triggerClass: 'has-tip',
    /**
     * Minimum breakpoint size at which to open the tooltip.
     * @option
     * @example 'small'
     */
    showOn: 'small',
    /**
     * Custom template to be used to generate markup for tooltip.
     * @option
     * @example '&lt;div class="tooltip"&gt;&lt;/div&gt;'
     */
    template: '',
    /**
     * Text displayed in the tooltip template on open.
     * @option
     * @example 'Some cool space fact here.'
     */
    tipText: '',
    touchCloseText: 'Tap to close.',
    /**
     * Allows the tooltip to remain open if triggered with a click or touch event.
     * @option
     * @example true
     */
    clickOpen: true,
    /**
     * Additional positioning classes, set by the JS
     * @option
     * @example 'top'
     */
    positionClass: '',
    /**
     * Distance, in pixels, the template should push away from the anchor on the Y axis.
     * @option
     * @example 10
     */
    vOffset: 10,
    /**
     * Distance, in pixels, the template should push away from the anchor on the X axis, if aligned to a side.
     * @option
     * @example 12
     */
    hOffset: 12
  };

  /**
   * TODO utilize resize event trigger
   */

  // Window exports
  Foundation.plugin(Tooltip, 'Tooltip');
}(jQuery);
"use strict";

//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () {
  function n(n) {
    function t(t, r, e, u, i, o) {
      for (; i >= 0 && o > i; i += n) {
        var a = u ? u[i] : i;e = r(e, t[a], a, t);
      }return e;
    }return function (r, e, u, i) {
      e = b(e, i, 4);var o = !k(r) && m.keys(r),
          a = (o || r).length,
          c = n > 0 ? 0 : a - 1;return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a);
    };
  }function t(n) {
    return function (t, r, e) {
      r = x(r, e);for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n) {
        if (r(t[i], i, t)) return i;
      }return -1;
    };
  }function r(n, t, r) {
    return function (e, u, i) {
      var o = 0,
          a = O(e);if ("number" == typeof i) n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;else if (r && i && a) return i = r(e, u), e[i] === u ? i : -1;if (u !== u) return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n) {
        if (e[i] === u) return i;
      }return -1;
    };
  }function e(n, t) {
    var r = I.length,
        e = n.constructor,
        u = m.isFunction(e) && e.prototype || a,
        i = "constructor";for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;) {
      i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i);
    }
  }var u = this,
      i = u._,
      o = Array.prototype,
      a = Object.prototype,
      c = Function.prototype,
      f = o.push,
      l = o.slice,
      s = a.toString,
      p = a.hasOwnProperty,
      h = Array.isArray,
      v = Object.keys,
      g = c.bind,
      y = Object.create,
      d = function () {},
      m = function (n) {
    return n instanceof m ? n : this instanceof m ? void (this._wrapped = n) : new m(n);
  };"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3";var b = function (n, t, r) {
    if (t === void 0) return n;switch (null == r ? 3 : r) {case 1:
        return function (r) {
          return n.call(t, r);
        };case 2:
        return function (r, e) {
          return n.call(t, r, e);
        };case 3:
        return function (r, e, u) {
          return n.call(t, r, e, u);
        };case 4:
        return function (r, e, u, i) {
          return n.call(t, r, e, u, i);
        };}return function () {
      return n.apply(t, arguments);
    };
  },
      x = function (n, t, r) {
    return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n);
  };m.iteratee = function (n, t) {
    return x(n, t, 1 / 0);
  };var _ = function (n, t) {
    return function (r) {
      var e = arguments.length;if (2 > e || null == r) return r;for (var u = 1; e > u; u++) {
        for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
          var f = o[c];t && r[f] !== void 0 || (r[f] = i[f]);
        }
      }return r;
    };
  },
      j = function (n) {
    if (!m.isObject(n)) return {};if (y) return y(n);d.prototype = n;var t = new d();return d.prototype = null, t;
  },
      w = function (n) {
    return function (t) {
      return null == t ? void 0 : t[n];
    };
  },
      A = Math.pow(2, 53) - 1,
      O = w("length"),
      k = function (n) {
    var t = O(n);return "number" == typeof t && t >= 0 && A >= t;
  };m.each = m.forEach = function (n, t, r) {
    t = b(t, r);var e, u;if (k(n)) for (e = 0, u = n.length; u > e; e++) {
      t(n[e], e, n);
    } else {
      var i = m.keys(n);for (e = 0, u = i.length; u > e; e++) {
        t(n[i[e]], i[e], n);
      }
    }return n;
  }, m.map = m.collect = function (n, t, r) {
    t = x(t, r);for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
      var a = e ? e[o] : o;i[o] = t(n[a], a, n);
    }return i;
  }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function (n, t, r) {
    var e;return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0;
  }, m.filter = m.select = function (n, t, r) {
    var e = [];return t = x(t, r), m.each(n, function (n, r, u) {
      t(n, r, u) && e.push(n);
    }), e;
  }, m.reject = function (n, t, r) {
    return m.filter(n, m.negate(x(t)), r);
  }, m.every = m.all = function (n, t, r) {
    t = x(t, r);for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
      var o = e ? e[i] : i;if (!t(n[o], o, n)) return !1;
    }return !0;
  }, m.some = m.any = function (n, t, r) {
    t = x(t, r);for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
      var o = e ? e[i] : i;if (t(n[o], o, n)) return !0;
    }return !1;
  }, m.contains = m.includes = m.include = function (n, t, r, e) {
    return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0;
  }, m.invoke = function (n, t) {
    var r = l.call(arguments, 2),
        e = m.isFunction(t);return m.map(n, function (n) {
      var u = e ? t : n[t];return null == u ? u : u.apply(n, r);
    });
  }, m.pluck = function (n, t) {
    return m.map(n, m.property(t));
  }, m.where = function (n, t) {
    return m.filter(n, m.matcher(t));
  }, m.findWhere = function (n, t) {
    return m.find(n, m.matcher(t));
  }, m.max = function (n, t, r) {
    var e,
        u,
        i = -1 / 0,
        o = -1 / 0;if (null == t && null != n) {
      n = k(n) ? n : m.values(n);for (var a = 0, c = n.length; c > a; a++) {
        e = n[a], e > i && (i = e);
      }
    } else t = x(t, r), m.each(n, function (n, r, e) {
      u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u);
    });return i;
  }, m.min = function (n, t, r) {
    var e,
        u,
        i = 1 / 0,
        o = 1 / 0;if (null == t && null != n) {
      n = k(n) ? n : m.values(n);for (var a = 0, c = n.length; c > a; a++) {
        e = n[a], i > e && (i = e);
      }
    } else t = x(t, r), m.each(n, function (n, r, e) {
      u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u);
    });return i;
  }, m.shuffle = function (n) {
    for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) {
      t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
    }return u;
  }, m.sample = function (n, t, r) {
    return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t));
  }, m.sortBy = function (n, t, r) {
    return t = x(t, r), m.pluck(m.map(n, function (n, r, e) {
      return { value: n, index: r, criteria: t(n, r, e) };
    }).sort(function (n, t) {
      var r = n.criteria,
          e = t.criteria;if (r !== e) {
        if (r > e || r === void 0) return 1;if (e > r || e === void 0) return -1;
      }return n.index - t.index;
    }), "value");
  };var F = function (n) {
    return function (t, r, e) {
      var u = {};return r = x(r, e), m.each(t, function (e, i) {
        var o = r(e, i, t);n(u, e, o);
      }), u;
    };
  };m.groupBy = F(function (n, t, r) {
    m.has(n, r) ? n[r].push(t) : n[r] = [t];
  }), m.indexBy = F(function (n, t, r) {
    n[r] = t;
  }), m.countBy = F(function (n, t, r) {
    m.has(n, r) ? n[r]++ : n[r] = 1;
  }), m.toArray = function (n) {
    return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : [];
  }, m.size = function (n) {
    return null == n ? 0 : k(n) ? n.length : m.keys(n).length;
  }, m.partition = function (n, t, r) {
    t = x(t, r);var e = [],
        u = [];return m.each(n, function (n, r, i) {
      (t(n, r, i) ? e : u).push(n);
    }), [e, u];
  }, m.first = m.head = m.take = function (n, t, r) {
    return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t);
  }, m.initial = function (n, t, r) {
    return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)));
  }, m.last = function (n, t, r) {
    return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t));
  }, m.rest = m.tail = m.drop = function (n, t, r) {
    return l.call(n, null == t || r ? 1 : t);
  }, m.compact = function (n) {
    return m.filter(n, m.identity);
  };var S = function (n, t, r, e) {
    for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
      var c = n[o];if (k(c) && (m.isArray(c) || m.isArguments(c))) {
        t || (c = S(c, t, r));var f = 0,
            l = c.length;for (u.length += l; l > f;) {
          u[i++] = c[f++];
        }
      } else r || (u[i++] = c);
    }return u;
  };m.flatten = function (n, t) {
    return S(n, t, !1);
  }, m.without = function (n) {
    return m.difference(n, l.call(arguments, 1));
  }, m.uniq = m.unique = function (n, t, r, e) {
    m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e));for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
      var c = n[o],
          f = r ? r(c, o, n) : c;t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c);
    }return u;
  }, m.union = function () {
    return m.uniq(S(arguments, !0, !0));
  }, m.intersection = function (n) {
    for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
      var i = n[e];if (!m.contains(t, i)) {
        for (var o = 1; r > o && m.contains(arguments[o], i); o++) {}o === r && t.push(i);
      }
    }return t;
  }, m.difference = function (n) {
    var t = S(arguments, !0, !0, 1);return m.filter(n, function (n) {
      return !m.contains(t, n);
    });
  }, m.zip = function () {
    return m.unzip(arguments);
  }, m.unzip = function (n) {
    for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++) {
      r[e] = m.pluck(n, e);
    }return r;
  }, m.object = function (n, t) {
    for (var r = {}, e = 0, u = O(n); u > e; e++) {
      t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
    }return r;
  }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function (n, t, r, e) {
    r = x(r, e, 1);for (var u = r(t), i = 0, o = O(n); o > i;) {
      var a = Math.floor((i + o) / 2);r(n[a]) < u ? i = a + 1 : o = a;
    }return i;
  }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function (n, t, r) {
    null == t && (t = n || 0, n = 0), r = r || 1;for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) {
      u[i] = n;
    }return u;
  };var E = function (n, t, r, e, u) {
    if (!(e instanceof t)) return n.apply(r, u);var i = j(n.prototype),
        o = n.apply(i, u);return m.isObject(o) ? o : i;
  };m.bind = function (n, t) {
    if (g && n.bind === g) return g.apply(n, l.call(arguments, 1));if (!m.isFunction(n)) throw new TypeError("Bind must be called on a function");var r = l.call(arguments, 2),
        e = function () {
      return E(n, e, t, this, r.concat(l.call(arguments)));
    };return e;
  }, m.partial = function (n) {
    var t = l.call(arguments, 1),
        r = function () {
      for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) {
        i[o] = t[o] === m ? arguments[e++] : t[o];
      }for (; e < arguments.length;) {
        i.push(arguments[e++]);
      }return E(n, r, this, this, i);
    };return r;
  }, m.bindAll = function (n) {
    var t,
        r,
        e = arguments.length;if (1 >= e) throw new Error("bindAll must be passed function names");for (t = 1; e > t; t++) {
      r = arguments[t], n[r] = m.bind(n[r], n);
    }return n;
  }, m.memoize = function (n, t) {
    var r = function (e) {
      var u = r.cache,
          i = "" + (t ? t.apply(this, arguments) : e);return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i];
    };return r.cache = {}, r;
  }, m.delay = function (n, t) {
    var r = l.call(arguments, 2);return setTimeout(function () {
      return n.apply(null, r);
    }, t);
  }, m.defer = m.partial(m.delay, m, 1), m.throttle = function (n, t, r) {
    var e,
        u,
        i,
        o = null,
        a = 0;r || (r = {});var c = function () {
      a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null);
    };return function () {
      var f = m.now();a || r.leading !== !1 || (a = f);var l = t - (f - a);return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i;
    };
  }, m.debounce = function (n, t, r) {
    var e,
        u,
        i,
        o,
        a,
        c = function () {
      var f = m.now() - o;t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)));
    };return function () {
      i = this, u = arguments, o = m.now();var f = r && !e;return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a;
    };
  }, m.wrap = function (n, t) {
    return m.partial(t, n);
  }, m.negate = function (n) {
    return function () {
      return !n.apply(this, arguments);
    };
  }, m.compose = function () {
    var n = arguments,
        t = n.length - 1;return function () {
      for (var r = t, e = n[t].apply(this, arguments); r--;) {
        e = n[r].call(this, e);
      }return e;
    };
  }, m.after = function (n, t) {
    return function () {
      return --n < 1 ? t.apply(this, arguments) : void 0;
    };
  }, m.before = function (n, t) {
    var r;return function () {
      return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r;
    };
  }, m.once = m.partial(m.before, 2);var M = !{ toString: null }.propertyIsEnumerable("toString"),
      I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];m.keys = function (n) {
    if (!m.isObject(n)) return [];if (v) return v(n);var t = [];for (var r in n) {
      m.has(n, r) && t.push(r);
    }return M && e(n, t), t;
  }, m.allKeys = function (n) {
    if (!m.isObject(n)) return [];var t = [];for (var r in n) {
      t.push(r);
    }return M && e(n, t), t;
  }, m.values = function (n) {
    for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) {
      e[u] = n[t[u]];
    }return e;
  }, m.mapObject = function (n, t, r) {
    t = x(t, r);for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) {
      e = u[a], o[e] = t(n[e], e, n);
    }return o;
  }, m.pairs = function (n) {
    for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) {
      e[u] = [t[u], n[t[u]]];
    }return e;
  }, m.invert = function (n) {
    for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) {
      t[n[r[e]]] = r[e];
    }return t;
  }, m.functions = m.methods = function (n) {
    var t = [];for (var r in n) {
      m.isFunction(n[r]) && t.push(r);
    }return t.sort();
  }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function (n, t, r) {
    t = x(t, r);for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++) {
      if (e = u[i], t(n[e], e, n)) return e;
    }
  }, m.pick = function (n, t, r) {
    var e,
        u,
        i = {},
        o = n;if (null == o) return i;m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function (n, t, r) {
      return t in r;
    }, o = Object(o));for (var a = 0, c = u.length; c > a; a++) {
      var f = u[a],
          l = o[f];e(l, f, o) && (i[f] = l);
    }return i;
  }, m.omit = function (n, t, r) {
    if (m.isFunction(t)) t = m.negate(t);else {
      var e = m.map(S(arguments, !1, !1, 1), String);t = function (n, t) {
        return !m.contains(e, t);
      };
    }return m.pick(n, t, r);
  }, m.defaults = _(m.allKeys, !0), m.create = function (n, t) {
    var r = j(n);return t && m.extendOwn(r, t), r;
  }, m.clone = function (n) {
    return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n;
  }, m.tap = function (n, t) {
    return t(n), n;
  }, m.isMatch = function (n, t) {
    var r = m.keys(t),
        e = r.length;if (null == n) return !e;for (var u = Object(n), i = 0; e > i; i++) {
      var o = r[i];if (t[o] !== u[o] || !(o in u)) return !1;
    }return !0;
  };var N = function (n, t, r, e) {
    if (n === t) return 0 !== n || 1 / n === 1 / t;if (null == n || null == t) return n === t;n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);var u = s.call(n);if (u !== s.call(t)) return !1;switch (u) {case "[object RegExp]":case "[object String]":
        return "" + n == "" + t;case "[object Number]":
        return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;case "[object Date]":case "[object Boolean]":
        return +n === +t;}var i = "[object Array]" === u;if (!i) {
      if ("object" != typeof n || "object" != typeof t) return !1;var o = n.constructor,
          a = t.constructor;if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t) return !1;
    }r = r || [], e = e || [];for (var c = r.length; c--;) {
      if (r[c] === n) return e[c] === t;
    }if (r.push(n), e.push(t), i) {
      if (c = n.length, c !== t.length) return !1;for (; c--;) {
        if (!N(n[c], t[c], r, e)) return !1;
      }
    } else {
      var f,
          l = m.keys(n);if (c = l.length, m.keys(t).length !== c) return !1;for (; c--;) {
        if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e)) return !1;
      }
    }return r.pop(), e.pop(), !0;
  };m.isEqual = function (n, t) {
    return N(n, t);
  }, m.isEmpty = function (n) {
    return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length;
  }, m.isElement = function (n) {
    return !(!n || 1 !== n.nodeType);
  }, m.isArray = h || function (n) {
    return "[object Array]" === s.call(n);
  }, m.isObject = function (n) {
    var t = typeof n;return "function" === t || "object" === t && !!n;
  }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (n) {
    m["is" + n] = function (t) {
      return s.call(t) === "[object " + n + "]";
    };
  }), m.isArguments(arguments) || (m.isArguments = function (n) {
    return m.has(n, "callee");
  }), "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function (n) {
    return "function" == typeof n || !1;
  }), m.isFinite = function (n) {
    return isFinite(n) && !isNaN(parseFloat(n));
  }, m.isNaN = function (n) {
    return m.isNumber(n) && n !== +n;
  }, m.isBoolean = function (n) {
    return n === !0 || n === !1 || "[object Boolean]" === s.call(n);
  }, m.isNull = function (n) {
    return null === n;
  }, m.isUndefined = function (n) {
    return n === void 0;
  }, m.has = function (n, t) {
    return null != n && p.call(n, t);
  }, m.noConflict = function () {
    return u._ = i, this;
  }, m.identity = function (n) {
    return n;
  }, m.constant = function (n) {
    return function () {
      return n;
    };
  }, m.noop = function () {}, m.property = w, m.propertyOf = function (n) {
    return null == n ? function () {} : function (t) {
      return n[t];
    };
  }, m.matcher = m.matches = function (n) {
    return n = m.extendOwn({}, n), function (t) {
      return m.isMatch(t, n);
    };
  }, m.times = function (n, t, r) {
    var e = Array(Math.max(0, n));t = b(t, r, 1);for (var u = 0; n > u; u++) {
      e[u] = t(u);
    }return e;
  }, m.random = function (n, t) {
    return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1));
  }, m.now = Date.now || function () {
    return new Date().getTime();
  };var B = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
      T = m.invert(B),
      R = function (n) {
    var t = function (t) {
      return n[t];
    },
        r = "(?:" + m.keys(n).join("|") + ")",
        e = RegExp(r),
        u = RegExp(r, "g");return function (n) {
      return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n;
    };
  };m.escape = R(B), m.unescape = R(T), m.result = function (n, t, r) {
    var e = null == n ? void 0 : n[t];return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e;
  };var q = 0;m.uniqueId = function (n) {
    var t = ++q + "";return n ? n + t : t;
  }, m.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };var K = /(.)^/,
      z = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" },
      D = /\\|'|\r|\n|\u2028|\u2029/g,
      L = function (n) {
    return "\\" + z[n];
  };m.template = function (n, t, r) {
    !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"),
        u = 0,
        i = "__p+='";n.replace(e, function (t, r, e, o, a) {
      return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t;
    }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";try {
      var o = new Function(t.variable || "obj", "_", i);
    } catch (a) {
      throw a.source = i, a;
    }var c = function (n) {
      return o.call(this, n, m);
    },
        f = t.variable || "obj";return c.source = "function(" + f + "){\n" + i + "}", c;
  }, m.chain = function (n) {
    var t = m(n);return t._chain = !0, t;
  };var P = function (n, t) {
    return n._chain ? m(t).chain() : t;
  };m.mixin = function (n) {
    m.each(m.functions(n), function (t) {
      var r = m[t] = n[t];m.prototype[t] = function () {
        var n = [this._wrapped];return f.apply(n, arguments), P(this, r.apply(m, n));
      };
    });
  }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
    var t = o[n];m.prototype[n] = function () {
      var r = this._wrapped;return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r);
    };
  }), m.each(["concat", "join", "slice"], function (n) {
    var t = o[n];m.prototype[n] = function () {
      return P(this, t.apply(this._wrapped, arguments));
    };
  }), m.prototype.value = function () {
    return this._wrapped;
  }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function () {
    return "" + this._wrapped;
  }, "function" == typeof define && define.amd && define("underscore", [], function () {
    return m;
  });
}).call(this);
//# sourceMappingURL=underscore-min.map
"use strict";

/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function (a) {
  function b(a) {
    var b = a.length,
        d = c.type(a);return "function" === d || c.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === d || 0 === b || "number" == typeof b && b > 0 && b - 1 in a;
  }if (!a.jQuery) {
    var c = function (a, b) {
      return new c.fn.init(a, b);
    };c.isWindow = function (a) {
      return null != a && a == a.window;
    }, c.type = function (a) {
      return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? e[g.call(a)] || "object" : typeof a;
    }, c.isArray = Array.isArray || function (a) {
      return "array" === c.type(a);
    }, c.isPlainObject = function (a) {
      var b;if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;try {
        if (a.constructor && !f.call(a, "constructor") && !f.call(a.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (d) {
        return !1;
      }for (b in a) {}return void 0 === b || f.call(a, b);
    }, c.each = function (a, c, d) {
      var e,
          f = 0,
          g = a.length,
          h = b(a);if (d) {
        if (h) for (; g > f && (e = c.apply(a[f], d), e !== !1); f++) {} else for (f in a) {
          if (e = c.apply(a[f], d), e === !1) break;
        }
      } else if (h) for (; g > f && (e = c.call(a[f], f, a[f]), e !== !1); f++) {} else for (f in a) {
        if (e = c.call(a[f], f, a[f]), e === !1) break;
      }return a;
    }, c.data = function (a, b, e) {
      if (void 0 === e) {
        var f = a[c.expando],
            g = f && d[f];if (void 0 === b) return g;if (g && b in g) return g[b];
      } else if (void 0 !== b) {
        var f = a[c.expando] || (a[c.expando] = ++c.uuid);return d[f] = d[f] || {}, d[f][b] = e, e;
      }
    }, c.removeData = function (a, b) {
      var e = a[c.expando],
          f = e && d[e];f && c.each(b, function (a, b) {
        delete f[b];
      });
    }, c.extend = function () {
      var a,
          b,
          d,
          e,
          f,
          g,
          h = arguments[0] || {},
          i = 1,
          j = arguments.length,
          k = !1;for ("boolean" == typeof h && (k = h, h = arguments[i] || {}, i++), "object" != typeof h && "function" !== c.type(h) && (h = {}), i === j && (h = this, i--); j > i; i++) {
        if (null != (f = arguments[i])) for (e in f) {
          a = h[e], d = f[e], h !== d && (k && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, g = a && c.isArray(a) ? a : []) : g = a && c.isPlainObject(a) ? a : {}, h[e] = c.extend(k, g, d)) : void 0 !== d && (h[e] = d));
        }
      }return h;
    }, c.queue = function (a, d, e) {
      function f(a, c) {
        var d = c || [];return null != a && (b(Object(a)) ? !function (a, b) {
          for (var c = +b.length, d = 0, e = a.length; c > d;) {
            a[e++] = b[d++];
          }if (c !== c) for (; void 0 !== b[d];) {
            a[e++] = b[d++];
          }return a.length = e, a;
        }(d, "string" == typeof a ? [a] : a) : [].push.call(d, a)), d;
      }if (a) {
        d = (d || "fx") + "queue";var g = c.data(a, d);return e ? (!g || c.isArray(e) ? g = c.data(a, d, f(e)) : g.push(e), g) : g || [];
      }
    }, c.dequeue = function (a, b) {
      c.each(a.nodeType ? [a] : a, function (a, d) {
        b = b || "fx";var e = c.queue(d, b),
            f = e.shift();"inprogress" === f && (f = e.shift()), f && ("fx" === b && e.unshift("inprogress"), f.call(d, function () {
          c.dequeue(d, b);
        }));
      });
    }, c.fn = c.prototype = { init: function (a) {
        if (a.nodeType) return this[0] = a, this;throw new Error("Not a DOM node.");
      }, offset: function () {
        var b = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };return { top: b.top + (a.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0), left: b.left + (a.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0) };
      }, position: function () {
        function a() {
          for (var a = this.offsetParent || document; a && "html" === !a.nodeType.toLowerCase && "static" === a.style.position;) {
            a = a.offsetParent;
          }return a || document;
        }var b = this[0],
            a = a.apply(b),
            d = this.offset(),
            e = /^(?:body|html)$/i.test(a.nodeName) ? { top: 0, left: 0 } : c(a).offset();return d.top -= parseFloat(b.style.marginTop) || 0, d.left -= parseFloat(b.style.marginLeft) || 0, a.style && (e.top += parseFloat(a.style.borderTopWidth) || 0, e.left += parseFloat(a.style.borderLeftWidth) || 0), { top: d.top - e.top, left: d.left - e.left };
      } };var d = {};c.expando = "velocity" + new Date().getTime(), c.uuid = 0;for (var e = {}, f = e.hasOwnProperty, g = e.toString, h = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < h.length; i++) {
      e["[object " + h[i] + "]"] = h[i].toLowerCase();
    }c.fn.init.prototype = c.fn, a.Velocity = { Utilities: c };
  }
}(window), function (a) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : a();
}(function () {
  return function (a, b, c, d) {
    function e(a) {
      for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
        var e = a[b];e && d.push(e);
      }return d;
    }function f(a) {
      return p.isWrapped(a) ? a = [].slice.call(a) : p.isNode(a) && (a = [a]), a;
    }function g(a) {
      var b = m.data(a, "velocity");return null === b ? d : b;
    }function h(a) {
      return function (b) {
        return Math.round(b * a) * (1 / a);
      };
    }function i(a, c, d, e) {
      function f(a, b) {
        return 1 - 3 * b + 3 * a;
      }function g(a, b) {
        return 3 * b - 6 * a;
      }function h(a) {
        return 3 * a;
      }function i(a, b, c) {
        return ((f(b, c) * a + g(b, c)) * a + h(b)) * a;
      }function j(a, b, c) {
        return 3 * f(b, c) * a * a + 2 * g(b, c) * a + h(b);
      }function k(b, c) {
        for (var e = 0; p > e; ++e) {
          var f = j(c, a, d);if (0 === f) return c;var g = i(c, a, d) - b;c -= g / f;
        }return c;
      }function l() {
        for (var b = 0; t > b; ++b) {
          x[b] = i(b * u, a, d);
        }
      }function m(b, c, e) {
        var f,
            g,
            h = 0;do {
          g = c + (e - c) / 2, f = i(g, a, d) - b, f > 0 ? e = g : c = g;
        } while (Math.abs(f) > r && ++h < s);return g;
      }function n(b) {
        for (var c = 0, e = 1, f = t - 1; e != f && x[e] <= b; ++e) {
          c += u;
        }--e;var g = (b - x[e]) / (x[e + 1] - x[e]),
            h = c + g * u,
            i = j(h, a, d);return i >= q ? k(b, h) : 0 == i ? h : m(b, c, c + u);
      }function o() {
        y = !0, (a != c || d != e) && l();
      }var p = 4,
          q = .001,
          r = 1e-7,
          s = 10,
          t = 11,
          u = 1 / (t - 1),
          v = "Float32Array" in b;if (4 !== arguments.length) return !1;for (var w = 0; 4 > w; ++w) {
        if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return !1;
      }a = Math.min(a, 1), d = Math.min(d, 1), a = Math.max(a, 0), d = Math.max(d, 0);var x = v ? new Float32Array(t) : new Array(t),
          y = !1,
          z = function (b) {
        return y || o(), a === c && d === e ? b : 0 === b ? 0 : 1 === b ? 1 : i(n(b), c, e);
      };z.getControlPoints = function () {
        return [{ x: a, y: c }, { x: d, y: e }];
      };var A = "generateBezier(" + [a, c, d, e] + ")";return z.toString = function () {
        return A;
      }, z;
    }function j(a, b) {
      var c = a;return p.isString(a) ? t.Easings[a] || (c = !1) : c = p.isArray(a) && 1 === a.length ? h.apply(null, a) : p.isArray(a) && 2 === a.length ? u.apply(null, a.concat([b])) : p.isArray(a) && 4 === a.length ? i.apply(null, a) : !1, c === !1 && (c = t.Easings[t.defaults.easing] ? t.defaults.easing : s), c;
    }function k(a) {
      if (a) {
        var b = new Date().getTime(),
            c = t.State.calls.length;c > 1e4 && (t.State.calls = e(t.State.calls));for (var f = 0; c > f; f++) {
          if (t.State.calls[f]) {
            var h = t.State.calls[f],
                i = h[0],
                j = h[2],
                n = h[3],
                o = !!n,
                q = null;n || (n = t.State.calls[f][3] = b - 16);for (var r = Math.min((b - n) / j.duration, 1), s = 0, u = i.length; u > s; s++) {
              var w = i[s],
                  y = w.element;if (g(y)) {
                var z = !1;if (j.display !== d && null !== j.display && "none" !== j.display) {
                  if ("flex" === j.display) {
                    var A = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];m.each(A, function (a, b) {
                      v.setPropertyValue(y, "display", b);
                    });
                  }v.setPropertyValue(y, "display", j.display);
                }j.visibility !== d && "hidden" !== j.visibility && v.setPropertyValue(y, "visibility", j.visibility);for (var B in w) {
                  if ("element" !== B) {
                    var C,
                        D = w[B],
                        E = p.isString(D.easing) ? t.Easings[D.easing] : D.easing;if (1 === r) C = D.endValue;else {
                      var F = D.endValue - D.startValue;if (C = D.startValue + F * E(r, j, F), !o && C === D.currentValue) continue;
                    }if (D.currentValue = C, "tween" === B) q = C;else {
                      if (v.Hooks.registered[B]) {
                        var G = v.Hooks.getRoot(B),
                            H = g(y).rootPropertyValueCache[G];H && (D.rootPropertyValue = H);
                      }var I = v.setPropertyValue(y, B, D.currentValue + (0 === parseFloat(C) ? "" : D.unitType), D.rootPropertyValue, D.scrollData);v.Hooks.registered[B] && (g(y).rootPropertyValueCache[G] = v.Normalizations.registered[G] ? v.Normalizations.registered[G]("extract", null, I[1]) : I[1]), "transform" === I[0] && (z = !0);
                    }
                  }
                }j.mobileHA && g(y).transformCache.translate3d === d && (g(y).transformCache.translate3d = "(0px, 0px, 0px)", z = !0), z && v.flushTransformCache(y);
              }
            }j.display !== d && "none" !== j.display && (t.State.calls[f][2].display = !1), j.visibility !== d && "hidden" !== j.visibility && (t.State.calls[f][2].visibility = !1), j.progress && j.progress.call(h[1], h[1], r, Math.max(0, n + j.duration - b), n, q), 1 === r && l(f);
          }
        }
      }t.State.isTicking && x(k);
    }function l(a, b) {
      if (!t.State.calls[a]) return !1;for (var c = t.State.calls[a][0], e = t.State.calls[a][1], f = t.State.calls[a][2], h = t.State.calls[a][4], i = !1, j = 0, k = c.length; k > j; j++) {
        var l = c[j].element;if (b || f.loop || ("none" === f.display && v.setPropertyValue(l, "display", f.display), "hidden" === f.visibility && v.setPropertyValue(l, "visibility", f.visibility)), f.loop !== !0 && (m.queue(l)[1] === d || !/\.velocityQueueEntryFlag/i.test(m.queue(l)[1])) && g(l)) {
          g(l).isAnimating = !1, g(l).rootPropertyValueCache = {};var n = !1;m.each(v.Lists.transforms3D, function (a, b) {
            var c = /^scale/.test(b) ? 1 : 0,
                e = g(l).transformCache[b];g(l).transformCache[b] !== d && new RegExp("^\\(" + c + "[^.]").test(e) && (n = !0, delete g(l).transformCache[b]);
          }), f.mobileHA && (n = !0, delete g(l).transformCache.translate3d), n && v.flushTransformCache(l), v.Values.removeClass(l, "velocity-animating");
        }if (!b && f.complete && !f.loop && j === k - 1) try {
          f.complete.call(e, e);
        } catch (o) {
          setTimeout(function () {
            throw o;
          }, 1);
        }h && f.loop !== !0 && h(e), g(l) && f.loop === !0 && !b && (m.each(g(l).tweensContainer, function (a, b) {
          /^rotate/.test(a) && 360 === parseFloat(b.endValue) && (b.endValue = 0, b.startValue = 360), /^backgroundPosition/.test(a) && 100 === parseFloat(b.endValue) && "%" === b.unitType && (b.endValue = 0, b.startValue = 100);
        }), t(l, "reverse", { loop: !0, delay: f.delay })), f.queue !== !1 && m.dequeue(l, f.queue);
      }t.State.calls[a] = !1;for (var p = 0, q = t.State.calls.length; q > p; p++) {
        if (t.State.calls[p] !== !1) {
          i = !0;break;
        }
      }i === !1 && (t.State.isTicking = !1, delete t.State.calls, t.State.calls = []);
    }var m,
        n = function () {
      if (c.documentMode) return c.documentMode;for (var a = 7; a > 4; a--) {
        var b = c.createElement("div");if (b.innerHTML = "<!--[if IE " + a + "]><span></span><![endif]-->", b.getElementsByTagName("span").length) return b = null, a;
      }return d;
    }(),
        o = function () {
      var a = 0;return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || function (b) {
        var c,
            d = new Date().getTime();return c = Math.max(0, 16 - (d - a)), a = d + c, setTimeout(function () {
          b(d + c);
        }, c);
      };
    }(),
        p = { isString: function (a) {
        return "string" == typeof a;
      }, isArray: Array.isArray || function (a) {
        return "[object Array]" === Object.prototype.toString.call(a);
      }, isFunction: function (a) {
        return "[object Function]" === Object.prototype.toString.call(a);
      }, isNode: function (a) {
        return a && a.nodeType;
      }, isNodeList: function (a) {
        return "object" == typeof a && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a)) && a.length !== d && (0 === a.length || "object" == typeof a[0] && a[0].nodeType > 0);
      }, isWrapped: function (a) {
        return a && (a.jquery || b.Zepto && b.Zepto.zepto.isZ(a));
      }, isSVG: function (a) {
        return b.SVGElement && a instanceof b.SVGElement;
      }, isEmptyObject: function (a) {
        for (var b in a) {
          return !1;
        }return !0;
      } },
        q = !1;if (a.fn && a.fn.jquery ? (m = a, q = !0) : m = b.Velocity.Utilities, 8 >= n && !q) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if (7 >= n) return void (jQuery.fn.velocity = jQuery.fn.animate);var r = 400,
        s = "swing",
        t = { State: { isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: b.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: c.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: !1, calls: [] }, CSS: {}, Utilities: m, Redirects: {}, Easings: {}, Promise: b.Promise, defaults: { queue: "", duration: r, easing: s, begin: d, complete: d, progress: d, display: d, visibility: d, loop: !1, delay: !1, mobileHA: !0, _cacheValues: !0 }, init: function (a) {
        m.data(a, "velocity", { isSVG: p.isSVG(a), isAnimating: !1, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {} });
      }, hook: null, mock: !1, version: { major: 1, minor: 2, patch: 2 }, debug: !1 };b.pageYOffset !== d ? (t.State.scrollAnchor = b, t.State.scrollPropertyLeft = "pageXOffset", t.State.scrollPropertyTop = "pageYOffset") : (t.State.scrollAnchor = c.documentElement || c.body.parentNode || c.body, t.State.scrollPropertyLeft = "scrollLeft", t.State.scrollPropertyTop = "scrollTop");var u = function () {
      function a(a) {
        return -a.tension * a.x - a.friction * a.v;
      }function b(b, c, d) {
        var e = { x: b.x + d.dx * c, v: b.v + d.dv * c, tension: b.tension, friction: b.friction };return { dx: e.v, dv: a(e) };
      }function c(c, d) {
        var e = { dx: c.v, dv: a(c) },
            f = b(c, .5 * d, e),
            g = b(c, .5 * d, f),
            h = b(c, d, g),
            i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx),
            j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);return c.x = c.x + i * d, c.v = c.v + j * d, c;
      }return function d(a, b, e) {
        var f,
            g,
            h,
            i = { x: -1, v: 0, tension: null, friction: null },
            j = [0],
            k = 0,
            l = 1e-4,
            m = .016;for (a = parseFloat(a) || 500, b = parseFloat(b) || 20, e = e || null, i.tension = a, i.friction = b, f = null !== e, f ? (k = d(a, b), g = k / e * m) : g = m;;) {
          if (h = c(h || i, g), j.push(1 + h.x), k += 16, !(Math.abs(h.x) > l && Math.abs(h.v) > l)) break;
        }return f ? function (a) {
          return j[a * (j.length - 1) | 0];
        } : k;
      };
    }();t.Easings = { linear: function (a) {
        return a;
      }, swing: function (a) {
        return .5 - Math.cos(a * Math.PI) / 2;
      }, spring: function (a) {
        return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a);
      } }, m.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (a, b) {
      t.Easings[b[0]] = i.apply(null, b[1]);
    });var v = t.CSS = { RegEx: { isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi }, Lists: { colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"], transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"], transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"] }, Hooks: { templates: { textShadow: ["Color X Y Blur", "black 0px 0px 0px"], boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"], clip: ["Top Right Bottom Left", "0px 0px 0px 0px"], backgroundPosition: ["X Y", "0% 0%"], transformOrigin: ["X Y Z", "50% 50% 0px"], perspectiveOrigin: ["X Y", "50% 50%"] }, registered: {}, register: function () {
          for (var a = 0; a < v.Lists.colors.length; a++) {
            var b = "color" === v.Lists.colors[a] ? "0 0 0 1" : "255 255 255 1";v.Hooks.templates[v.Lists.colors[a]] = ["Red Green Blue Alpha", b];
          }var c, d, e;if (n) for (c in v.Hooks.templates) {
            d = v.Hooks.templates[c], e = d[0].split(" ");var f = d[1].match(v.RegEx.valueSplit);"Color" === e[0] && (e.push(e.shift()), f.push(f.shift()), v.Hooks.templates[c] = [e.join(" "), f.join(" ")]);
          }for (c in v.Hooks.templates) {
            d = v.Hooks.templates[c], e = d[0].split(" ");for (var a in e) {
              var g = c + e[a],
                  h = a;v.Hooks.registered[g] = [c, h];
            }
          }
        }, getRoot: function (a) {
          var b = v.Hooks.registered[a];return b ? b[0] : a;
        }, cleanRootPropertyValue: function (a, b) {
          return v.RegEx.valueUnwrap.test(b) && (b = b.match(v.RegEx.valueUnwrap)[1]), v.Values.isCSSNullValue(b) && (b = v.Hooks.templates[a][1]), b;
        }, extractValue: function (a, b) {
          var c = v.Hooks.registered[a];if (c) {
            var d = c[0],
                e = c[1];return b = v.Hooks.cleanRootPropertyValue(d, b), b.toString().match(v.RegEx.valueSplit)[e];
          }return b;
        }, injectValue: function (a, b, c) {
          var d = v.Hooks.registered[a];if (d) {
            var e,
                f,
                g = d[0],
                h = d[1];return c = v.Hooks.cleanRootPropertyValue(g, c), e = c.toString().match(v.RegEx.valueSplit), e[h] = b, f = e.join(" ");
          }return c;
        } }, Normalizations: { registered: { clip: function (a, b, c) {
            switch (a) {case "name":
                return "clip";case "extract":
                var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(v.RegEx.valueUnwrap), d = d ? d[1].replace(/,(\s+)?/g, " ") : c), d;case "inject":
                return "rect(" + c + ")";}
          }, blur: function (a, b, c) {
            switch (a) {case "name":
                return t.State.isFirefox ? "filter" : "-webkit-filter";case "extract":
                var d = parseFloat(c);if (!d && 0 !== d) {
                  var e = c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d = e ? e[1] : 0;
                }return d;case "inject":
                return parseFloat(c) ? "blur(" + c + ")" : "none";}
          }, opacity: function (a, b, c) {
            if (8 >= n) switch (a) {case "name":
                return "filter";case "extract":
                var d = c.toString().match(/alpha\(opacity=(.*)\)/i);return c = d ? d[1] / 100 : 1;case "inject":
                return b.style.zoom = 1, parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")";} else switch (a) {case "name":
                return "opacity";case "extract":
                return c;case "inject":
                return c;}
          } }, register: function () {
          9 >= n || t.State.isGingerbread || (v.Lists.transformsBase = v.Lists.transformsBase.concat(v.Lists.transforms3D));for (var a = 0; a < v.Lists.transformsBase.length; a++) {
            !function () {
              var b = v.Lists.transformsBase[a];v.Normalizations.registered[b] = function (a, c, e) {
                switch (a) {case "name":
                    return "transform";case "extract":
                    return g(c) === d || g(c).transformCache[b] === d ? /^scale/i.test(b) ? 1 : 0 : g(c).transformCache[b].replace(/[()]/g, "");case "inject":
                    var f = !1;switch (b.substr(0, b.length - 1)) {case "translate":
                        f = !/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case "scal":case "scale":
                        t.State.isAndroid && g(c).transformCache[b] === d && 1 > e && (e = 1), f = !/(\d)$/i.test(e);break;case "skew":
                        f = !/(deg|\d)$/i.test(e);break;case "rotate":
                        f = !/(deg|\d)$/i.test(e);}return f || (g(c).transformCache[b] = "(" + e + ")"), g(c).transformCache[b];}
              };
            }();
          }for (var a = 0; a < v.Lists.colors.length; a++) {
            !function () {
              var b = v.Lists.colors[a];v.Normalizations.registered[b] = function (a, c, e) {
                switch (a) {case "name":
                    return b;case "extract":
                    var f;if (v.RegEx.wrappedValueAlreadyExtracted.test(e)) f = e;else {
                      var g,
                          h = { black: "rgb(0, 0, 0)", blue: "rgb(0, 0, 255)", gray: "rgb(128, 128, 128)", green: "rgb(0, 128, 0)", red: "rgb(255, 0, 0)", white: "rgb(255, 255, 255)" };/^[A-z]+$/i.test(e) ? g = h[e] !== d ? h[e] : h.black : v.RegEx.isHex.test(e) ? g = "rgb(" + v.Values.hexToRgb(e).join(" ") + ")" : /^rgba?\(/i.test(e) || (g = h.black), f = (g || e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                    }return 8 >= n || 3 !== f.split(" ").length || (f += " 1"), f;case "inject":
                    return 8 >= n ? 4 === e.split(" ").length && (e = e.split(/\s+/).slice(0, 3).join(" ")) : 3 === e.split(" ").length && (e += " 1"), (8 >= n ? "rgb" : "rgba") + "(" + e.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";}
              };
            }();
          }
        } }, Names: { camelCase: function (a) {
          return a.replace(/-(\w)/g, function (a, b) {
            return b.toUpperCase();
          });
        }, SVGAttribute: function (a) {
          var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return (n || t.State.isAndroid && !t.State.isChrome) && (b += "|transform"), new RegExp("^(" + b + ")$", "i").test(a);
        }, prefixCheck: function (a) {
          if (t.State.prefixMatches[a]) return [t.State.prefixMatches[a], !0];for (var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, d = b.length; d > c; c++) {
            var e;if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function (a) {
              return a.toUpperCase();
            }), p.isString(t.State.prefixElement.style[e])) return t.State.prefixMatches[a] = e, [e, !0];
          }return [a, !1];
        } }, Values: { hexToRgb: function (a) {
          var b,
              c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a = a.replace(c, function (a, b, c, d) {
            return b + b + c + c + d + d;
          }), b = d.exec(a), b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : [0, 0, 0];
        }, isCSSNullValue: function (a) {
          return 0 == a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a);
        }, getUnitType: function (a) {
          return (/^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? "" : "px"
          );
        }, getDisplayType: function (a) {
          var b = a && a.tagName.toString().toLowerCase();return (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : /^(table)$/i.test(b) ? "table" : /^(tbody)$/i.test(b) ? "table-row-group" : "block"
          );
        }, addClass: function (a, b) {
          a.classList ? a.classList.add(b) : a.className += (a.className.length ? " " : "") + b;
        }, removeClass: function (a, b) {
          a.classList ? a.classList.remove(b) : a.className = a.className.toString().replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ");
        } }, getPropertyValue: function (a, c, e, f) {
        function h(a, c) {
          function e() {
            j && v.setPropertyValue(a, "display", "none");
          }var i = 0;if (8 >= n) i = m.css(a, c);else {
            var j = !1;if (/^(width|height)$/.test(c) && 0 === v.getPropertyValue(a, "display") && (j = !0, v.setPropertyValue(a, "display", v.Values.getDisplayType(a))), !f) {
              if ("height" === c && "border-box" !== v.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                var k = a.offsetHeight - (parseFloat(v.getPropertyValue(a, "borderTopWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "borderBottomWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingTop")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingBottom")) || 0);return e(), k;
              }if ("width" === c && "border-box" !== v.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
                var l = a.offsetWidth - (parseFloat(v.getPropertyValue(a, "borderLeftWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "borderRightWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingLeft")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingRight")) || 0);return e(), l;
              }
            }var o;o = g(a) === d ? b.getComputedStyle(a, null) : g(a).computedStyle ? g(a).computedStyle : g(a).computedStyle = b.getComputedStyle(a, null), "borderColor" === c && (c = "borderTopColor"), i = 9 === n && "filter" === c ? o.getPropertyValue(c) : o[c], ("" === i || null === i) && (i = a.style[c]), e();
          }if ("auto" === i && /^(top|right|bottom|left)$/i.test(c)) {
            var p = h(a, "position");("fixed" === p || "absolute" === p && /top|left/i.test(c)) && (i = m(a).position()[c] + "px");
          }return i;
        }var i;if (v.Hooks.registered[c]) {
          var j = c,
              k = v.Hooks.getRoot(j);e === d && (e = v.getPropertyValue(a, v.Names.prefixCheck(k)[0])), v.Normalizations.registered[k] && (e = v.Normalizations.registered[k]("extract", a, e)), i = v.Hooks.extractValue(j, e);
        } else if (v.Normalizations.registered[c]) {
          var l, o;l = v.Normalizations.registered[c]("name", a), "transform" !== l && (o = h(a, v.Names.prefixCheck(l)[0]), v.Values.isCSSNullValue(o) && v.Hooks.templates[c] && (o = v.Hooks.templates[c][1])), i = v.Normalizations.registered[c]("extract", a, o);
        }if (!/^[\d-]/.test(i)) if (g(a) && g(a).isSVG && v.Names.SVGAttribute(c)) {
          if (/^(height|width)$/i.test(c)) try {
            i = a.getBBox()[c];
          } catch (p) {
            i = 0;
          } else i = a.getAttribute(c);
        } else i = h(a, v.Names.prefixCheck(c)[0]);return v.Values.isCSSNullValue(i) && (i = 0), t.debug >= 2 && console.log("Get " + c + ": " + i), i;
      }, setPropertyValue: function (a, c, d, e, f) {
        var h = c;if ("scroll" === c) f.container ? f.container["scroll" + f.direction] = d : "Left" === f.direction ? b.scrollTo(d, f.alternateValue) : b.scrollTo(f.alternateValue, d);else if (v.Normalizations.registered[c] && "transform" === v.Normalizations.registered[c]("name", a)) v.Normalizations.registered[c]("inject", a, d), h = "transform", d = g(a).transformCache[c];else {
          if (v.Hooks.registered[c]) {
            var i = c,
                j = v.Hooks.getRoot(c);e = e || v.getPropertyValue(a, j), d = v.Hooks.injectValue(i, d, e), c = j;
          }if (v.Normalizations.registered[c] && (d = v.Normalizations.registered[c]("inject", a, d), c = v.Normalizations.registered[c]("name", a)), h = v.Names.prefixCheck(c)[0], 8 >= n) try {
            a.style[h] = d;
          } catch (k) {
            t.debug && console.log("Browser does not support [" + d + "] for [" + h + "]");
          } else g(a) && g(a).isSVG && v.Names.SVGAttribute(c) ? a.setAttribute(c, d) : a.style[h] = d;t.debug >= 2 && console.log("Set " + c + " (" + h + "): " + d);
        }return [h, d];
      }, flushTransformCache: function (a) {
        function b(b) {
          return parseFloat(v.getPropertyValue(a, b));
        }var c = "";if ((n || t.State.isAndroid && !t.State.isChrome) && g(a).isSVG) {
          var d = { translate: [b("translateX"), b("translateY")], skewX: [b("skewX")], skewY: [b("skewY")], scale: 1 !== b("scale") ? [b("scale"), b("scale")] : [b("scaleX"), b("scaleY")], rotate: [b("rotateZ"), 0, 0] };m.each(g(a).transformCache, function (a) {
            /^translate/i.test(a) ? a = "translate" : /^scale/i.test(a) ? a = "scale" : /^rotate/i.test(a) && (a = "rotate"), d[a] && (c += a + "(" + d[a].join(" ") + ") ", delete d[a]);
          });
        } else {
          var e, f;m.each(g(a).transformCache, function (b) {
            return e = g(a).transformCache[b], "transformPerspective" === b ? (f = e, !0) : (9 === n && "rotateZ" === b && (b = "rotate"), void (c += b + e + " "));
          }), f && (c = "perspective" + f + " " + c);
        }v.setPropertyValue(a, "transform", c);
      } };v.Hooks.register(), v.Normalizations.register(), t.hook = function (a, b, c) {
      var e = d;return a = f(a), m.each(a, function (a, f) {
        if (g(f) === d && t.init(f), c === d) e === d && (e = t.CSS.getPropertyValue(f, b));else {
          var h = t.CSS.setPropertyValue(f, b, c);"transform" === h[0] && t.CSS.flushTransformCache(f), e = h;
        }
      }), e;
    };var w = function () {
      function a() {
        return h ? B.promise || null : i;
      }function e() {
        function a() {
          function a(a, b) {
            var c = d,
                e = d,
                g = d;return p.isArray(a) ? (c = a[0], !p.isArray(a[1]) && /^[\d-]/.test(a[1]) || p.isFunction(a[1]) || v.RegEx.isHex.test(a[1]) ? g = a[1] : (p.isString(a[1]) && !v.RegEx.isHex.test(a[1]) || p.isArray(a[1])) && (e = b ? a[1] : j(a[1], h.duration), a[2] !== d && (g = a[2]))) : c = a, b || (e = e || h.easing), p.isFunction(c) && (c = c.call(f, y, x)), p.isFunction(g) && (g = g.call(f, y, x)), [c || 0, e, g];
          }function l(a, b) {
            var c, d;return d = (b || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (a) {
              return c = a, "";
            }), c || (c = v.Values.getUnitType(a)), [d, c];
          }function n() {
            var a = { myParent: f.parentNode || c.body, position: v.getPropertyValue(f, "position"), fontSize: v.getPropertyValue(f, "fontSize") },
                d = a.position === I.lastPosition && a.myParent === I.lastParent,
                e = a.fontSize === I.lastFontSize;I.lastParent = a.myParent, I.lastPosition = a.position, I.lastFontSize = a.fontSize;var h = 100,
                i = {};if (e && d) i.emToPx = I.lastEmToPx, i.percentToPxWidth = I.lastPercentToPxWidth, i.percentToPxHeight = I.lastPercentToPxHeight;else {
              var j = g(f).isSVG ? c.createElementNS("http://www.w3.org/2000/svg", "rect") : c.createElement("div");t.init(j), a.myParent.appendChild(j), m.each(["overflow", "overflowX", "overflowY"], function (a, b) {
                t.CSS.setPropertyValue(j, b, "hidden");
              }), t.CSS.setPropertyValue(j, "position", a.position), t.CSS.setPropertyValue(j, "fontSize", a.fontSize), t.CSS.setPropertyValue(j, "boxSizing", "content-box"), m.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (a, b) {
                t.CSS.setPropertyValue(j, b, h + "%");
              }), t.CSS.setPropertyValue(j, "paddingLeft", h + "em"), i.percentToPxWidth = I.lastPercentToPxWidth = (parseFloat(v.getPropertyValue(j, "width", null, !0)) || 1) / h, i.percentToPxHeight = I.lastPercentToPxHeight = (parseFloat(v.getPropertyValue(j, "height", null, !0)) || 1) / h, i.emToPx = I.lastEmToPx = (parseFloat(v.getPropertyValue(j, "paddingLeft")) || 1) / h, a.myParent.removeChild(j);
            }return null === I.remToPx && (I.remToPx = parseFloat(v.getPropertyValue(c.body, "fontSize")) || 16), null === I.vwToPx && (I.vwToPx = parseFloat(b.innerWidth) / 100, I.vhToPx = parseFloat(b.innerHeight) / 100), i.remToPx = I.remToPx, i.vwToPx = I.vwToPx, i.vhToPx = I.vhToPx, t.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(i), f), i;
          }if (h.begin && 0 === y) try {
            h.begin.call(o, o);
          } catch (r) {
            setTimeout(function () {
              throw r;
            }, 1);
          }if ("scroll" === C) {
            var u,
                w,
                z,
                A = /^x$/i.test(h.axis) ? "Left" : "Top",
                D = parseFloat(h.offset) || 0;h.container ? p.isWrapped(h.container) || p.isNode(h.container) ? (h.container = h.container[0] || h.container, u = h.container["scroll" + A], z = u + m(f).position()[A.toLowerCase()] + D) : h.container = null : (u = t.State.scrollAnchor[t.State["scrollProperty" + A]], w = t.State.scrollAnchor[t.State["scrollProperty" + ("Left" === A ? "Top" : "Left")]], z = m(f).offset()[A.toLowerCase()] + D), i = { scroll: { rootPropertyValue: !1, startValue: u, currentValue: u, endValue: z, unitType: "", easing: h.easing, scrollData: { container: h.container, direction: A, alternateValue: w } }, element: f }, t.debug && console.log("tweensContainer (scroll): ", i.scroll, f);
          } else if ("reverse" === C) {
            if (!g(f).tweensContainer) return void m.dequeue(f, h.queue);"none" === g(f).opts.display && (g(f).opts.display = "auto"), "hidden" === g(f).opts.visibility && (g(f).opts.visibility = "visible"), g(f).opts.loop = !1, g(f).opts.begin = null, g(f).opts.complete = null, s.easing || delete h.easing, s.duration || delete h.duration, h = m.extend({}, g(f).opts, h);var E = m.extend(!0, {}, g(f).tweensContainer);for (var F in E) {
              if ("element" !== F) {
                var G = E[F].startValue;E[F].startValue = E[F].currentValue = E[F].endValue, E[F].endValue = G, p.isEmptyObject(s) || (E[F].easing = h.easing), t.debug && console.log("reverse tweensContainer (" + F + "): " + JSON.stringify(E[F]), f);
              }
            }i = E;
          } else if ("start" === C) {
            var E;g(f).tweensContainer && g(f).isAnimating === !0 && (E = g(f).tweensContainer), m.each(q, function (b, c) {
              if (RegExp("^" + v.Lists.colors.join("$|^") + "$").test(b)) {
                var e = a(c, !0),
                    f = e[0],
                    g = e[1],
                    h = e[2];if (v.RegEx.isHex.test(f)) {
                  for (var i = ["Red", "Green", "Blue"], j = v.Values.hexToRgb(f), k = h ? v.Values.hexToRgb(h) : d, l = 0; l < i.length; l++) {
                    var m = [j[l]];g && m.push(g), k !== d && m.push(k[l]), q[b + i[l]] = m;
                  }delete q[b];
                }
              }
            });for (var H in q) {
              var K = a(q[H]),
                  L = K[0],
                  M = K[1],
                  N = K[2];H = v.Names.camelCase(H);var O = v.Hooks.getRoot(H),
                  P = !1;if (g(f).isSVG || "tween" === O || v.Names.prefixCheck(O)[1] !== !1 || v.Normalizations.registered[O] !== d) {
                (h.display !== d && null !== h.display && "none" !== h.display || h.visibility !== d && "hidden" !== h.visibility) && /opacity|filter/.test(H) && !N && 0 !== L && (N = 0), h._cacheValues && E && E[H] ? (N === d && (N = E[H].endValue + E[H].unitType), P = g(f).rootPropertyValueCache[O]) : v.Hooks.registered[H] ? N === d ? (P = v.getPropertyValue(f, O), N = v.getPropertyValue(f, H, P)) : P = v.Hooks.templates[O][1] : N === d && (N = v.getPropertyValue(f, H));var Q,
                    R,
                    S,
                    T = !1;if (Q = l(H, N), N = Q[0], S = Q[1], Q = l(H, L), L = Q[0].replace(/^([+-\/*])=/, function (a, b) {
                  return T = b, "";
                }), R = Q[1], N = parseFloat(N) || 0, L = parseFloat(L) || 0, "%" === R && (/^(fontSize|lineHeight)$/.test(H) ? (L /= 100, R = "em") : /^scale/.test(H) ? (L /= 100, R = "") : /(Red|Green|Blue)$/i.test(H) && (L = L / 100 * 255, R = "")), /[\/*]/.test(T)) R = S;else if (S !== R && 0 !== N) if (0 === L) R = S;else {
                  e = e || n();var U = /margin|padding|left|right|width|text|word|letter/i.test(H) || /X$/.test(H) || "x" === H ? "x" : "y";switch (S) {case "%":
                      N *= "x" === U ? e.percentToPxWidth : e.percentToPxHeight;break;case "px":
                      break;default:
                      N *= e[S + "ToPx"];}switch (R) {case "%":
                      N *= 1 / ("x" === U ? e.percentToPxWidth : e.percentToPxHeight);break;case "px":
                      break;default:
                      N *= 1 / e[R + "ToPx"];}
                }switch (T) {case "+":
                    L = N + L;break;case "-":
                    L = N - L;break;case "*":
                    L = N * L;break;case "/":
                    L = N / L;}i[H] = { rootPropertyValue: P, startValue: N, currentValue: N, endValue: L, unitType: R, easing: M }, t.debug && console.log("tweensContainer (" + H + "): " + JSON.stringify(i[H]), f);
              } else t.debug && console.log("Skipping [" + O + "] due to a lack of browser support.");
            }i.element = f;
          }i.element && (v.Values.addClass(f, "velocity-animating"), J.push(i), "" === h.queue && (g(f).tweensContainer = i, g(f).opts = h), g(f).isAnimating = !0, y === x - 1 ? (t.State.calls.push([J, o, h, null, B.resolver]), t.State.isTicking === !1 && (t.State.isTicking = !0, k())) : y++);
        }var e,
            f = this,
            h = m.extend({}, t.defaults, s),
            i = {};switch (g(f) === d && t.init(f), parseFloat(h.delay) && h.queue !== !1 && m.queue(f, h.queue, function (a) {
          t.velocityQueueEntryFlag = !0, g(f).delayTimer = { setTimeout: setTimeout(a, parseFloat(h.delay)), next: a };
        }), h.duration.toString().toLowerCase()) {case "fast":
            h.duration = 200;break;case "normal":
            h.duration = r;break;case "slow":
            h.duration = 600;break;default:
            h.duration = parseFloat(h.duration) || 1;}t.mock !== !1 && (t.mock === !0 ? h.duration = h.delay = 1 : (h.duration *= parseFloat(t.mock) || 1, h.delay *= parseFloat(t.mock) || 1)), h.easing = j(h.easing, h.duration), h.begin && !p.isFunction(h.begin) && (h.begin = null), h.progress && !p.isFunction(h.progress) && (h.progress = null), h.complete && !p.isFunction(h.complete) && (h.complete = null), h.display !== d && null !== h.display && (h.display = h.display.toString().toLowerCase(), "auto" === h.display && (h.display = t.CSS.Values.getDisplayType(f))), h.visibility !== d && null !== h.visibility && (h.visibility = h.visibility.toString().toLowerCase()), h.mobileHA = h.mobileHA && t.State.isMobile && !t.State.isGingerbread, h.queue === !1 ? h.delay ? setTimeout(a, h.delay) : a() : m.queue(f, h.queue, function (b, c) {
          return c === !0 ? (B.promise && B.resolver(o), !0) : (t.velocityQueueEntryFlag = !0, void a(b));
        }), "" !== h.queue && "fx" !== h.queue || "inprogress" === m.queue(f)[0] || m.dequeue(f);
      }var h,
          i,
          n,
          o,
          q,
          s,
          u = arguments[0] && (arguments[0].p || m.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || p.isString(arguments[0].properties));if (p.isWrapped(this) ? (h = !1, n = 0, o = this, i = this) : (h = !0, n = 1, o = u ? arguments[0].elements || arguments[0].e : arguments[0]), o = f(o)) {
        u ? (q = arguments[0].properties || arguments[0].p, s = arguments[0].options || arguments[0].o) : (q = arguments[n], s = arguments[n + 1]);var x = o.length,
            y = 0;if (!/^(stop|finish|finishAll)$/i.test(q) && !m.isPlainObject(s)) {
          var z = n + 1;s = {};for (var A = z; A < arguments.length; A++) {
            p.isArray(arguments[A]) || !/^(fast|normal|slow)$/i.test(arguments[A]) && !/^\d/.test(arguments[A]) ? p.isString(arguments[A]) || p.isArray(arguments[A]) ? s.easing = arguments[A] : p.isFunction(arguments[A]) && (s.complete = arguments[A]) : s.duration = arguments[A];
          }
        }var B = { promise: null, resolver: null, rejecter: null };h && t.Promise && (B.promise = new t.Promise(function (a, b) {
          B.resolver = a, B.rejecter = b;
        }));var C;switch (q) {case "scroll":
            C = "scroll";break;case "reverse":
            C = "reverse";break;case "finish":case "finishAll":case "stop":
            m.each(o, function (a, b) {
              g(b) && g(b).delayTimer && (clearTimeout(g(b).delayTimer.setTimeout), g(b).delayTimer.next && g(b).delayTimer.next(), delete g(b).delayTimer), "finishAll" !== q || s !== !0 && !p.isString(s) || (m.each(m.queue(b, p.isString(s) ? s : ""), function (a, b) {
                p.isFunction(b) && b();
              }), m.queue(b, p.isString(s) ? s : "", []));
            });var D = [];return m.each(t.State.calls, function (a, b) {
              b && m.each(b[1], function (c, e) {
                var f = s === d ? "" : s;return f === !0 || b[2].queue === f || s === d && b[2].queue === !1 ? void m.each(o, function (c, d) {
                  d === e && ((s === !0 || p.isString(s)) && (m.each(m.queue(d, p.isString(s) ? s : ""), function (a, b) {
                    p.isFunction(b) && b(null, !0);
                  }), m.queue(d, p.isString(s) ? s : "", [])), "stop" === q ? (g(d) && g(d).tweensContainer && f !== !1 && m.each(g(d).tweensContainer, function (a, b) {
                    b.endValue = b.currentValue;
                  }), D.push(a)) : ("finish" === q || "finishAll" === q) && (b[2].duration = 1));
                }) : !0;
              });
            }), "stop" === q && (m.each(D, function (a, b) {
              l(b, !0);
            }), B.promise && B.resolver(o)), a();default:
            if (!m.isPlainObject(q) || p.isEmptyObject(q)) {
              if (p.isString(q) && t.Redirects[q]) {
                var E = m.extend({}, s),
                    F = E.duration,
                    G = E.delay || 0;return E.backwards === !0 && (o = m.extend(!0, [], o).reverse()), m.each(o, function (a, b) {
                  parseFloat(E.stagger) ? E.delay = G + parseFloat(E.stagger) * a : p.isFunction(E.stagger) && (E.delay = G + E.stagger.call(b, a, x)), E.drag && (E.duration = parseFloat(F) || (/^(callout|transition)/.test(q) ? 1e3 : r), E.duration = Math.max(E.duration * (E.backwards ? 1 - a / x : (a + 1) / x), .75 * E.duration, 200)), t.Redirects[q].call(b, b, E || {}, a, x, o, B.promise ? B : d);
                }), a();
              }var H = "Velocity: First argument (" + q + ") was not a property map, a known action, or a registered redirect. Aborting.";return B.promise ? B.rejecter(new Error(H)) : console.log(H), a();
            }C = "start";}var I = { lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null },
            J = [];m.each(o, function (a, b) {
          p.isNode(b) && e.call(b);
        });var K,
            E = m.extend({}, t.defaults, s);if (E.loop = parseInt(E.loop), K = 2 * E.loop - 1, E.loop) for (var L = 0; K > L; L++) {
          var M = { delay: E.delay, progress: E.progress };L === K - 1 && (M.display = E.display, M.visibility = E.visibility, M.complete = E.complete), w(o, "reverse", M);
        }return a();
      }
    };t = m.extend(w, t), t.animate = w;var x = b.requestAnimationFrame || o;return t.State.isMobile || c.hidden === d || c.addEventListener("visibilitychange", function () {
      c.hidden ? (x = function (a) {
        return setTimeout(function () {
          a(!0);
        }, 16);
      }, k()) : x = b.requestAnimationFrame || o;
    }), a.Velocity = t, a !== b && (a.fn.velocity = w, a.fn.velocity.defaults = t.defaults), m.each(["Down", "Up"], function (a, b) {
      t.Redirects["slide" + b] = function (a, c, e, f, g, h) {
        var i = m.extend({}, c),
            j = i.begin,
            k = i.complete,
            l = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
            n = {};i.display === d && (i.display = "Down" === b ? "inline" === t.CSS.Values.getDisplayType(a) ? "inline-block" : "block" : "none"), i.begin = function () {
          j && j.call(g, g);for (var c in l) {
            n[c] = a.style[c];var d = t.CSS.getPropertyValue(a, c);l[c] = "Down" === b ? [d, 0] : [0, d];
          }n.overflow = a.style.overflow, a.style.overflow = "hidden";
        }, i.complete = function () {
          for (var b in n) {
            a.style[b] = n[b];
          }k && k.call(g, g), h && h.resolver(g);
        }, t(a, l, i);
      };
    }), m.each(["In", "Out"], function (a, b) {
      t.Redirects["fade" + b] = function (a, c, e, f, g, h) {
        var i = m.extend({}, c),
            j = { opacity: "In" === b ? 1 : 0 },
            k = i.complete;i.complete = e !== f - 1 ? i.begin = null : function () {
          k && k.call(g, g), h && h.resolver(g);
        }, i.display === d && (i.display = "In" === b ? "auto" : "none"), t(this, j, i);
      };
    }), t;
  }(window.jQuery || window.Zepto || window, window, document);
});
"use strict";

/*!
 * The Final Countdown for jQuery v2.1.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2015 Edson Hilios
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!function (a) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
}(function (a) {
  "use strict";
  function b(a) {
    if (a instanceof Date) return a;if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a);throw new Error("Couldn't cast `" + a + "` to a date object.");
  }function c(a) {
    var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");return new RegExp(b);
  }function d(a) {
    return function (b) {
      var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if (d) for (var f = 0, g = d.length; g > f; ++f) {
        var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
            j = c(h[0]),
            k = h[1] || "",
            l = h[3] || "",
            m = null;h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && 10 > m && (m = "0" + m.toString()), b = b.replace(j, m.toString()));
      }return b = b.replace(/%%/, "%");
    };
  }function e(a, b) {
    var c = "s",
        d = "";return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), 1 === Math.abs(b) ? d : c;
  }var f = [],
      g = [],
      h = { precision: 100, elapse: !1 };g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));var i = { Y: "years", m: "months", n: "daysToMonth", w: "weeks", d: "daysToWeek", D: "totalDays", H: "hours", M: "minutes", S: "seconds" },
      j = function (b, c, d) {
    this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.start();
  };a.extend(j.prototype, { start: function () {
      null !== this.interval && clearInterval(this.interval);var a = this;this.update(), this.interval = setInterval(function () {
        a.update.call(a);
      }, this.options.precision);
    }, stop: function () {
      clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped");
    }, toggle: function () {
      this.interval ? this.stop() : this.start();
    }, pause: function () {
      this.stop();
    }, resume: function () {
      this.start();
    }, remove: function () {
      this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance;
    }, setFinalDate: function (a) {
      this.finalDate = b(a);
    }, update: function () {
      if (0 === this.$el.closest("html").length) return void this.remove();var b,
          c = void 0 !== a._data(this.el, "events"),
          d = new Date();b = this.finalDate.getTime() - d.getTime(), b = Math.ceil(b / 1e3), b = !this.options.elapse && 0 > b ? 0 : Math.abs(b), this.totalSecsLeft !== b && c && (this.totalSecsLeft = b, this.elapsed = d >= this.finalDate, this.offset = { seconds: this.totalSecsLeft % 60, minutes: Math.floor(this.totalSecsLeft / 60) % 60, hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24, days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7, daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368), totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24), weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7), months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368), years: Math.abs(this.finalDate.getFullYear() - d.getFullYear()) }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")));
    }, dispatchEvent: function (b) {
      var c = a.Event(b + ".countdown");c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c);
    } }), a.fn.countdown = function () {
    var b = Array.prototype.slice.call(arguments, 0);return this.each(function () {
      var c = a(this).data("countdown-instance");if (void 0 !== c) {
        var d = f[c],
            e = b[0];j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e));
      } else new j(this, b[0], b[1]);
    });
  };
});
"use strict";

/*!
 * Isotope PACKAGED v2.2.2
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */

!function (a) {
  function b() {}function c(a) {
    function c(b) {
      b.prototype.option || (b.prototype.option = function (b) {
        a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
      });
    }function e(b, c) {
      a.fn[b] = function (e) {
        if ("string" == typeof e) {
          for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
            var j = this[h],
                k = a.data(j, b);if (k) {
              if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                var l = k[e].apply(k, g);if (void 0 !== l) return l;
              } else f("no such method '" + e + "' for " + b + " instance");
            } else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'");
          }return this;
        }return this.each(function () {
          var d = a.data(this, b);d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d));
        });
      };
    }if (a) {
      var f = "undefined" == typeof console ? b : function (a) {
        console.error(a);
      };return a.bridget = function (a, b) {
        c(b), e(a, b);
      }, a.bridget;
    }
  }var d = Array.prototype.slice;"function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery);
}(window), function (a) {
  function b(b) {
    var c = a.event;return c.target = c.target || c.srcElement || b, c;
  }var c = document.documentElement,
      d = function () {};c.addEventListener ? d = function (a, b, c) {
    a.addEventListener(b, c, !1);
  } : c.attachEvent && (d = function (a, c, d) {
    a[c + d] = d.handleEvent ? function () {
      var c = b(a);d.handleEvent.call(d, c);
    } : function () {
      var c = b(a);d.call(a, c);
    }, a.attachEvent("on" + c, a[c + d]);
  });var e = function () {};c.removeEventListener ? e = function (a, b, c) {
    a.removeEventListener(b, c, !1);
  } : c.detachEvent && (e = function (a, b, c) {
    a.detachEvent("on" + b, a[b + c]);try {
      delete a[b + c];
    } catch (d) {
      a[b + c] = void 0;
    }
  });var f = { bind: d, unbind: e };"function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f;
}(window), function () {
  "use strict";
  function a() {}function b(a, b) {
    for (var c = a.length; c--;) {
      if (a[c].listener === b) return c;
    }return -1;
  }function c(a) {
    return function () {
      return this[a].apply(this, arguments);
    };
  }var d = a.prototype,
      e = this,
      f = e.EventEmitter;d.getListeners = function (a) {
    var b,
        c,
        d = this._getEvents();if (a instanceof RegExp) {
      b = {};for (c in d) {
        d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
      }
    } else b = d[a] || (d[a] = []);return b;
  }, d.flattenListeners = function (a) {
    var b,
        c = [];for (b = 0; b < a.length; b += 1) {
      c.push(a[b].listener);
    }return c;
  }, d.getListenersAsObject = function (a) {
    var b,
        c = this.getListeners(a);return c instanceof Array && (b = {}, b[a] = c), b || c;
  }, d.addListener = function (a, c) {
    var d,
        e = this.getListenersAsObject(a),
        f = "object" == typeof c;for (d in e) {
      e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : { listener: c, once: !1 });
    }return this;
  }, d.on = c("addListener"), d.addOnceListener = function (a, b) {
    return this.addListener(a, { listener: b, once: !0 });
  }, d.once = c("addOnceListener"), d.defineEvent = function (a) {
    return this.getListeners(a), this;
  }, d.defineEvents = function (a) {
    for (var b = 0; b < a.length; b += 1) {
      this.defineEvent(a[b]);
    }return this;
  }, d.removeListener = function (a, c) {
    var d,
        e,
        f = this.getListenersAsObject(a);for (e in f) {
      f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
    }return this;
  }, d.off = c("removeListener"), d.addListeners = function (a, b) {
    return this.manipulateListeners(!1, a, b);
  }, d.removeListeners = function (a, b) {
    return this.manipulateListeners(!0, a, b);
  }, d.manipulateListeners = function (a, b, c) {
    var d,
        e,
        f = a ? this.removeListener : this.addListener,
        g = a ? this.removeListeners : this.addListeners;if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--;) {
      f.call(this, b, c[d]);
    } else for (d in b) {
      b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
    }return this;
  }, d.removeEvent = function (a) {
    var b,
        c = typeof a,
        d = this._getEvents();if ("string" === c) delete d[a];else if (a instanceof RegExp) for (b in d) {
      d.hasOwnProperty(b) && a.test(b) && delete d[b];
    } else delete this._events;return this;
  }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function (a, b) {
    var c,
        d,
        e,
        f,
        g = this.getListenersAsObject(a);for (e in g) {
      if (g.hasOwnProperty(e)) for (d = g[e].length; d--;) {
        c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
      }
    }return this;
  }, d.trigger = c("emitEvent"), d.emit = function (a) {
    var b = Array.prototype.slice.call(arguments, 1);return this.emitEvent(a, b);
  }, d.setOnceReturnValue = function (a) {
    return this._onceReturnValue = a, this;
  }, d._getOnceReturnValue = function () {
    return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
  }, d._getEvents = function () {
    return this._events || (this._events = {});
  }, a.noConflict = function () {
    return e.EventEmitter = f, a;
  }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () {
    return a;
  }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a;
}.call(this), function (a) {
  function b(a) {
    if (a) {
      if ("string" == typeof d[a]) return a;a = a.charAt(0).toUpperCase() + a.slice(1);for (var b, e = 0, f = c.length; f > e; e++) {
        if (b = c[e] + a, "string" == typeof d[b]) return b;
      }
    }
  }var c = "Webkit Moz ms Ms O".split(" "),
      d = document.documentElement.style;"function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () {
    return b;
  }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b;
}(window), function (a, b) {
  function c(a) {
    var b = parseFloat(a),
        c = -1 === a.indexOf("%") && !isNaN(b);return c && b;
  }function d() {}function e() {
    for (var a = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, b = 0, c = h.length; c > b; b++) {
      var d = h[b];a[d] = 0;
    }return a;
  }function f(b) {
    function d() {
      if (!m) {
        m = !0;var d = a.getComputedStyle;if (j = function () {
          var a = d ? function (a) {
            return d(a, null);
          } : function (a) {
            return a.currentStyle;
          };return function (b) {
            var c = a(b);return c || g("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c;
          };
        }(), k = b("boxSizing")) {
          var e = document.createElement("div");e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";var f = document.body || document.documentElement;f.appendChild(e);var h = j(e);l = 200 === c(h.width), f.removeChild(e);
        }
      }
    }function f(a) {
      if (d(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
        var b = j(a);if ("none" === b.display) return e();var f = {};f.width = a.offsetWidth, f.height = a.offsetHeight;for (var g = f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k]), m = 0, n = h.length; n > m; m++) {
          var o = h[m],
              p = b[o];p = i(a, p);var q = parseFloat(p);f[o] = isNaN(q) ? 0 : q;
        }var r = f.paddingLeft + f.paddingRight,
            s = f.paddingTop + f.paddingBottom,
            t = f.marginLeft + f.marginRight,
            u = f.marginTop + f.marginBottom,
            v = f.borderLeftWidth + f.borderRightWidth,
            w = f.borderTopWidth + f.borderBottomWidth,
            x = g && l,
            y = c(b.width);y !== !1 && (f.width = y + (x ? 0 : r + v));var z = c(b.height);return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f;
      }
    }function i(b, c) {
      if (a.getComputedStyle || -1 === c.indexOf("%")) return c;var d = b.style,
          e = d.left,
          f = b.runtimeStyle,
          g = f && f.left;return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c;
    }var j,
        k,
        l,
        m = !1;return f;
  }var g = "undefined" == typeof console ? d : function (a) {
    console.error(a);
  },
      h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];"function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], f) : "object" == typeof exports ? module.exports = f(require("desandro-get-style-property")) : a.getSize = f(a.getStyleProperty);
}(window), function (a) {
  function b(a) {
    "function" == typeof a && (b.isReady ? a() : g.push(a));
  }function c(a) {
    var c = "readystatechange" === a.type && "complete" !== f.readyState;b.isReady || c || d();
  }function d() {
    b.isReady = !0;for (var a = 0, c = g.length; c > a; a++) {
      var d = g[a];d();
    }
  }function e(e) {
    return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), e.bind(a, "load", c)), b;
  }var f = a.document,
      g = [];b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie);
}(window), function (a) {
  "use strict";
  function b(a, b) {
    return a[g](b);
  }function c(a) {
    if (!a.parentNode) {
      var b = document.createDocumentFragment();b.appendChild(a);
    }
  }function d(a, b) {
    c(a);for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++) {
      if (d[e] === a) return !0;
    }return !1;
  }function e(a, d) {
    return c(a), b(a, d);
  }var f,
      g = function () {
    if (a.matches) return "matches";if (a.matchesSelector) return "matchesSelector";for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) {
      var e = b[c],
          f = e + "MatchesSelector";if (a[f]) return f;
    }
  }();if (g) {
    var h = document.createElement("div"),
        i = b(h, "div");f = i ? b : e;
  } else f = d;"function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () {
    return f;
  }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f;
}(Element.prototype), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function (c, d) {
    return b(a, c, d);
  }) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector);
}(window, function (a, b, c) {
  var d = {};d.extend = function (a, b) {
    for (var c in b) {
      a[c] = b[c];
    }return a;
  }, d.modulo = function (a, b) {
    return (a % b + b) % b;
  };var e = Object.prototype.toString;d.isArray = function (a) {
    return "[object Array]" == e.call(a);
  }, d.makeArray = function (a) {
    var b = [];if (d.isArray(a)) b = a;else if (a && "number" == typeof a.length) for (var c = 0, e = a.length; e > c; c++) {
      b.push(a[c]);
    } else b.push(a);return b;
  }, d.indexOf = Array.prototype.indexOf ? function (a, b) {
    return a.indexOf(b);
  } : function (a, b) {
    for (var c = 0, d = a.length; d > c; c++) {
      if (a[c] === b) return c;
    }return -1;
  }, d.removeFrom = function (a, b) {
    var c = d.indexOf(a, b);-1 != c && a.splice(c, 1);
  }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (a) {
    return a instanceof HTMLElement;
  } : function (a) {
    return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName;
  }, d.setText = function () {
    function a(a, c) {
      b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), a[b] = c;
    }var b;return a;
  }(), d.getParent = function (a, b) {
    for (; a != document.body;) {
      if (a = a.parentNode, c(a, b)) return a;
    }
  }, d.getQueryElement = function (a) {
    return "string" == typeof a ? document.querySelector(a) : a;
  }, d.handleEvent = function (a) {
    var b = "on" + a.type;this[b] && this[b](a);
  }, d.filterFindElements = function (a, b) {
    a = d.makeArray(a);for (var e = [], f = 0, g = a.length; g > f; f++) {
      var h = a[f];if (d.isElement(h)) if (b) {
        c(h, b) && e.push(h);for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) {
          e.push(i[j]);
        }
      } else e.push(h);
    }return e;
  }, d.debounceMethod = function (a, b, c) {
    var d = a.prototype[b],
        e = b + "Timeout";a.prototype[b] = function () {
      var a = this[e];a && clearTimeout(a);var b = arguments,
          f = this;this[e] = setTimeout(function () {
        d.apply(f, b), delete f[e];
      }, c || 100);
    };
  }, d.toDashed = function (a) {
    return a.replace(/(.)([A-Z])/g, function (a, b, c) {
      return b + "-" + c;
    }).toLowerCase();
  };var f = a.console;return d.htmlInit = function (c, e) {
    b(function () {
      for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) {
        var k,
            l = g[i],
            m = l.getAttribute(h);try {
          k = m && JSON.parse(m);
        } catch (n) {
          f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n);continue;
        }var o = new c(l, k),
            p = a.jQuery;p && p.data(l, e, o);
      }
    });
  }, d;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function (c, d, e, f) {
    return b(a, c, d, e, f);
  }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils));
}(window, function (a, b, c, d, e) {
  "use strict";
  function f(a) {
    for (var b in a) {
      return !1;
    }return b = null, !0;
  }function g(a, b) {
    a && (this.element = a, this.layout = b, this.position = { x: 0, y: 0 }, this._create());
  }function h(a) {
    return a.replace(/([A-Z])/g, function (a) {
      return "-" + a.toLowerCase();
    });
  }var i = a.getComputedStyle,
      j = i ? function (a) {
    return i(a, null);
  } : function (a) {
    return a.currentStyle;
  },
      k = d("transition"),
      l = d("transform"),
      m = k && l,
      n = !!d("perspective"),
      o = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend" }[k],
      p = ["transform", "transition", "transitionDuration", "transitionProperty"],
      q = function () {
    for (var a = {}, b = 0, c = p.length; c > b; b++) {
      var e = p[b],
          f = d(e);f && f !== e && (a[e] = f);
    }return a;
  }();e.extend(g.prototype, b.prototype), g.prototype._create = function () {
    this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" });
  }, g.prototype.handleEvent = function (a) {
    var b = "on" + a.type;this[b] && this[b](a);
  }, g.prototype.getSize = function () {
    this.size = c(this.element);
  }, g.prototype.css = function (a) {
    var b = this.element.style;for (var c in a) {
      var d = q[c] || c;b[d] = a[c];
    }
  }, g.prototype.getPosition = function () {
    var a = j(this.element),
        b = this.layout.options,
        c = b.isOriginLeft,
        d = b.isOriginTop,
        e = a[c ? "left" : "right"],
        f = a[d ? "top" : "bottom"],
        g = this.layout.size,
        h = -1 != e.indexOf("%") ? parseFloat(e) / 100 * g.width : parseInt(e, 10),
        i = -1 != f.indexOf("%") ? parseFloat(f) / 100 * g.height : parseInt(f, 10);h = isNaN(h) ? 0 : h, i = isNaN(i) ? 0 : i, h -= c ? g.paddingLeft : g.paddingRight, i -= d ? g.paddingTop : g.paddingBottom, this.position.x = h, this.position.y = i;
  }, g.prototype.layoutPosition = function () {
    var a = this.layout.size,
        b = this.layout.options,
        c = {},
        d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
        e = b.isOriginLeft ? "left" : "right",
        f = b.isOriginLeft ? "right" : "left",
        g = this.position.x + a[d];c[e] = this.getXValue(g), c[f] = "";var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
        i = b.isOriginTop ? "top" : "bottom",
        j = b.isOriginTop ? "bottom" : "top",
        k = this.position.y + a[h];c[i] = this.getYValue(k), c[j] = "", this.css(c), this.emitEvent("layout", [this]);
  }, g.prototype.getXValue = function (a) {
    var b = this.layout.options;return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + "%" : a + "px";
  }, g.prototype.getYValue = function (a) {
    var b = this.layout.options;return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + "%" : a + "px";
  }, g.prototype._transitionTo = function (a, b) {
    this.getPosition();var c = this.position.x,
        d = this.position.y,
        e = parseInt(a, 10),
        f = parseInt(b, 10),
        g = e === this.position.x && f === this.position.y;if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();var h = a - c,
        i = b - d,
        j = {};j.transform = this.getTranslate(h, i), this.transition({ to: j, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 });
  }, g.prototype.getTranslate = function (a, b) {
    var c = this.layout.options;return a = c.isOriginLeft ? a : -a, b = c.isOriginTop ? b : -b, n ? "translate3d(" + a + "px, " + b + "px, 0)" : "translate(" + a + "px, " + b + "px)";
  }, g.prototype.goTo = function (a, b) {
    this.setPosition(a, b), this.layoutPosition();
  }, g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function (a, b) {
    this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10);
  }, g.prototype._nonTransition = function (a) {
    this.css(a.to), a.isCleaning && this._removeStyles(a.to);for (var b in a.onTransitionEnd) {
      a.onTransitionEnd[b].call(this);
    }
  }, g.prototype._transition = function (a) {
    if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);var b = this._transn;for (var c in a.onTransitionEnd) {
      b.onEnd[c] = a.onTransitionEnd[c];
    }for (c in a.to) {
      b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
    }if (a.from) {
      this.css(a.from);var d = this.element.offsetHeight;d = null;
    }this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0;
  };var r = "opacity," + h(q.transform || "transform");g.prototype.enableTransition = function () {
    this.isTransitioning || (this.css({ transitionProperty: r, transitionDuration: this.layout.options.transitionDuration }), this.element.addEventListener(o, this, !1));
  }, g.prototype.transition = g.prototype[k ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function (a) {
    this.ontransitionend(a);
  }, g.prototype.onotransitionend = function (a) {
    this.ontransitionend(a);
  };var s = { "-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform" };g.prototype.ontransitionend = function (a) {
    if (a.target === this.element) {
      var b = this._transn,
          c = s[a.propertyName] || a.propertyName;if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) {
        var d = b.onEnd[c];d.call(this), delete b.onEnd[c];
      }this.emitEvent("transitionEnd", [this]);
    }
  }, g.prototype.disableTransition = function () {
    this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1;
  }, g.prototype._removeStyles = function (a) {
    var b = {};for (var c in a) {
      b[c] = "";
    }this.css(b);
  };var t = { transitionProperty: "", transitionDuration: "" };return g.prototype.removeTransitionStyles = function () {
    this.css(t);
  }, g.prototype.removeElem = function () {
    this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]);
  }, g.prototype.remove = function () {
    if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();var a = this;this.once("transitionEnd", function () {
      a.removeElem();
    }), this.hide();
  }, g.prototype.reveal = function () {
    delete this.isHidden, this.css({ display: "" });var a = this.layout.options,
        b = {},
        c = this.getHideRevealTransitionEndProperty("visibleStyle");b[c] = this.onRevealTransitionEnd, this.transition({ from: a.hiddenStyle, to: a.visibleStyle, isCleaning: !0, onTransitionEnd: b });
  }, g.prototype.onRevealTransitionEnd = function () {
    this.isHidden || this.emitEvent("reveal");
  }, g.prototype.getHideRevealTransitionEndProperty = function (a) {
    var b = this.layout.options[a];if (b.opacity) return "opacity";for (var c in b) {
      return c;
    }
  }, g.prototype.hide = function () {
    this.isHidden = !0, this.css({ display: "" });var a = this.layout.options,
        b = {},
        c = this.getHideRevealTransitionEndProperty("hiddenStyle");b[c] = this.onHideTransitionEnd, this.transition({ from: a.visibleStyle, to: a.hiddenStyle, isCleaning: !0, onTransitionEnd: b });
  }, g.prototype.onHideTransitionEnd = function () {
    this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide"));
  }, g.prototype.destroy = function () {
    this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" });
  }, g;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (c, d, e, f, g) {
    return b(a, c, d, e, f, g);
  }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item);
}(window, function (a, b, c, d, e, f) {
  "use strict";
  function g(a, b) {
    var c = e.getQueryElement(a);if (!c) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), this.option(b);var d = ++k;this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout();
  }var h = a.console,
      i = a.jQuery,
      j = function () {},
      k = 0,
      l = {};return g.namespace = "outlayer", g.Item = f, g.defaults = { containerStyle: { position: "relative" }, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, isResizingContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }, e.extend(g.prototype, c.prototype), g.prototype.option = function (a) {
    e.extend(this.options, a);
  }, g.prototype._create = function () {
    this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize();
  }, g.prototype.reloadItems = function () {
    this.items = this._itemize(this.element.children);
  }, g.prototype._itemize = function (a) {
    for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
      var g = b[e],
          h = new c(g, this);d.push(h);
    }return d;
  }, g.prototype._filterFindItemElements = function (a) {
    return e.filterFindElements(a, this.options.itemSelector);
  }, g.prototype.getItemElements = function () {
    for (var a = [], b = 0, c = this.items.length; c > b; b++) {
      a.push(this.items[b].element);
    }return a;
  }, g.prototype.layout = function () {
    this._resetLayout(), this._manageStamps();var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;this.layoutItems(this.items, a), this._isLayoutInited = !0;
  }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function () {
    this.getSize();
  }, g.prototype.getSize = function () {
    this.size = d(this.element);
  }, g.prototype._getMeasurement = function (a, b) {
    var c,
        f = this.options[a];f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c)[b] : f) : this[a] = 0;
  }, g.prototype.layoutItems = function (a, b) {
    a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout();
  }, g.prototype._getItemsForLayout = function (a) {
    for (var b = [], c = 0, d = a.length; d > c; c++) {
      var e = a[c];e.isIgnored || b.push(e);
    }return b;
  }, g.prototype._layoutItems = function (a, b) {
    if (this._emitCompleteOnItems("layout", a), a && a.length) {
      for (var c = [], d = 0, e = a.length; e > d; d++) {
        var f = a[d],
            g = this._getItemLayoutPosition(f);g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g);
      }this._processLayoutQueue(c);
    }
  }, g.prototype._getItemLayoutPosition = function () {
    return { x: 0, y: 0 };
  }, g.prototype._processLayoutQueue = function (a) {
    for (var b = 0, c = a.length; c > b; b++) {
      var d = a[b];this._positionItem(d.item, d.x, d.y, d.isInstant);
    }
  }, g.prototype._positionItem = function (a, b, c, d) {
    d ? a.goTo(b, c) : a.moveTo(b, c);
  }, g.prototype._postLayout = function () {
    this.resizeContainer();
  }, g.prototype.resizeContainer = function () {
    if (this.options.isResizingContainer) {
      var a = this._getContainerSize();a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1));
    }
  }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function (a, b) {
    if (void 0 !== a) {
      var c = this.size;c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px";
    }
  }, g.prototype._emitCompleteOnItems = function (a, b) {
    function c() {
      e.dispatchEvent(a + "Complete", null, [b]);
    }function d() {
      g++, g === f && c();
    }var e = this,
        f = b.length;if (!b || !f) return void c();for (var g = 0, h = 0, i = b.length; i > h; h++) {
      var j = b[h];j.once(a, d);
    }
  }, g.prototype.dispatchEvent = function (a, b, c) {
    var d = b ? [b].concat(c) : c;if (this.emitEvent(a, d), i) if (this.$element = this.$element || i(this.element), b) {
      var e = i.Event(b);e.type = a, this.$element.trigger(e, c);
    } else this.$element.trigger(a, c);
  }, g.prototype.ignore = function (a) {
    var b = this.getItem(a);b && (b.isIgnored = !0);
  }, g.prototype.unignore = function (a) {
    var b = this.getItem(a);b && delete b.isIgnored;
  }, g.prototype.stamp = function (a) {
    if (a = this._find(a)) {
      this.stamps = this.stamps.concat(a);for (var b = 0, c = a.length; c > b; b++) {
        var d = a[b];this.ignore(d);
      }
    }
  }, g.prototype.unstamp = function (a) {
    if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) {
      var d = a[b];e.removeFrom(this.stamps, d), this.unignore(d);
    }
  }, g.prototype._find = function (a) {
    return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0;
  }, g.prototype._manageStamps = function () {
    if (this.stamps && this.stamps.length) {
      this._getBoundingRect();for (var a = 0, b = this.stamps.length; b > a; a++) {
        var c = this.stamps[a];this._manageStamp(c);
      }
    }
  }, g.prototype._getBoundingRect = function () {
    var a = this.element.getBoundingClientRect(),
        b = this.size;this._boundingRect = { left: a.left + b.paddingLeft + b.borderLeftWidth, top: a.top + b.paddingTop + b.borderTopWidth, right: a.right - (b.paddingRight + b.borderRightWidth), bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth) };
  }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function (a) {
    var b = a.getBoundingClientRect(),
        c = this._boundingRect,
        e = d(a),
        f = { left: b.left - c.left - e.marginLeft, top: b.top - c.top - e.marginTop, right: c.right - b.right - e.marginRight, bottom: c.bottom - b.bottom - e.marginBottom };return f;
  }, g.prototype.handleEvent = function (a) {
    var b = "on" + a.type;this[b] && this[b](a);
  }, g.prototype.bindResize = function () {
    this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0);
  }, g.prototype.unbindResize = function () {
    this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1;
  }, g.prototype.onresize = function () {
    function a() {
      b.resize(), delete b.resizeTimeout;
    }this.resizeTimeout && clearTimeout(this.resizeTimeout);var b = this;this.resizeTimeout = setTimeout(a, 100);
  }, g.prototype.resize = function () {
    this.isResizeBound && this.needsResizeLayout() && this.layout();
  }, g.prototype.needsResizeLayout = function () {
    var a = d(this.element),
        b = this.size && a;return b && a.innerWidth !== this.size.innerWidth;
  }, g.prototype.addItems = function (a) {
    var b = this._itemize(a);return b.length && (this.items = this.items.concat(b)), b;
  }, g.prototype.appended = function (a) {
    var b = this.addItems(a);b.length && (this.layoutItems(b, !0), this.reveal(b));
  }, g.prototype.prepended = function (a) {
    var b = this._itemize(a);if (b.length) {
      var c = this.items.slice(0);this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c);
    }
  }, g.prototype.reveal = function (a) {
    this._emitCompleteOnItems("reveal", a);for (var b = a && a.length, c = 0; b && b > c; c++) {
      var d = a[c];d.reveal();
    }
  }, g.prototype.hide = function (a) {
    this._emitCompleteOnItems("hide", a);for (var b = a && a.length, c = 0; b && b > c; c++) {
      var d = a[c];d.hide();
    }
  }, g.prototype.revealItemElements = function (a) {
    var b = this.getItems(a);this.reveal(b);
  }, g.prototype.hideItemElements = function (a) {
    var b = this.getItems(a);this.hide(b);
  }, g.prototype.getItem = function (a) {
    for (var b = 0, c = this.items.length; c > b; b++) {
      var d = this.items[b];if (d.element === a) return d;
    }
  }, g.prototype.getItems = function (a) {
    a = e.makeArray(a);for (var b = [], c = 0, d = a.length; d > c; c++) {
      var f = a[c],
          g = this.getItem(f);g && b.push(g);
    }return b;
  }, g.prototype.remove = function (a) {
    var b = this.getItems(a);if (this._emitCompleteOnItems("remove", b), b && b.length) for (var c = 0, d = b.length; d > c; c++) {
      var f = b[c];f.remove(), e.removeFrom(this.items, f);
    }
  }, g.prototype.destroy = function () {
    var a = this.element.style;a.height = "", a.position = "", a.width = "";for (var b = 0, c = this.items.length; c > b; b++) {
      var d = this.items[b];d.destroy();
    }this.unbindResize();var e = this.element.outlayerGUID;delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace);
  }, g.data = function (a) {
    a = e.getQueryElement(a);var b = a && a.outlayerGUID;return b && l[b];
  }, g.create = function (a, b) {
    function c() {
      g.apply(this, arguments);
    }return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function () {
      f.apply(this, arguments);
    }, c.Item.prototype = new f(), e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c;
  }, g.Item = f, g;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], b) : "object" == typeof exports ? module.exports = b(require("outlayer")) : (a.Isotope = a.Isotope || {}, a.Isotope.Item = b(a.Outlayer));
}(window, function (a) {
  "use strict";
  function b() {
    a.Item.apply(this, arguments);
  }b.prototype = new a.Item(), b.prototype._create = function () {
    this.id = this.layout.itemGUID++, a.Item.prototype._create.call(this), this.sortData = {};
  }, b.prototype.updateSortData = function () {
    if (!this.isIgnored) {
      this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();var a = this.layout.options.getSortData,
          b = this.layout._sorters;for (var c in a) {
        var d = b[c];this.sortData[c] = d(this.element, this);
      }
    }
  };var c = b.prototype.destroy;return b.prototype.destroy = function () {
    c.apply(this, arguments), this.css({ display: "" });
  }, b;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], b) : "object" == typeof exports ? module.exports = b(require("get-size"), require("outlayer")) : (a.Isotope = a.Isotope || {}, a.Isotope.LayoutMode = b(a.getSize, a.Outlayer));
}(window, function (a, b) {
  "use strict";
  function c(a) {
    this.isotope = a, a && (this.options = a.options[this.namespace], this.element = a.element, this.items = a.filteredItems, this.size = a.size);
  }return function () {
    function a(a) {
      return function () {
        return b.prototype[a].apply(this.isotope, arguments);
      };
    }for (var d = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], e = 0, f = d.length; f > e; e++) {
      var g = d[e];c.prototype[g] = a(g);
    }
  }(), c.prototype.needsVerticalResizeLayout = function () {
    var b = a(this.isotope.element),
        c = this.isotope.size && b;return c && b.innerHeight != this.isotope.size.innerHeight;
  }, c.prototype._getMeasurement = function () {
    this.isotope._getMeasurement.apply(this, arguments);
  }, c.prototype.getColumnWidth = function () {
    this.getSegmentSize("column", "Width");
  }, c.prototype.getRowHeight = function () {
    this.getSegmentSize("row", "Height");
  }, c.prototype.getSegmentSize = function (a, b) {
    var c = a + b,
        d = "outer" + b;if (this._getMeasurement(c, d), !this[c]) {
      var e = this.getFirstItemSize();this[c] = e && e[d] || this.isotope.size["inner" + b];
    }
  }, c.prototype.getFirstItemSize = function () {
    var b = this.isotope.filteredItems[0];return b && b.element && a(b.element);
  }, c.prototype.layout = function () {
    this.isotope.layout.apply(this.isotope, arguments);
  }, c.prototype.getSize = function () {
    this.isotope.getSize(), this.size = this.isotope.size;
  }, c.modes = {}, c.create = function (a, b) {
    function d() {
      c.apply(this, arguments);
    }return d.prototype = new c(), b && (d.options = b), d.prototype.namespace = a, c.modes[a] = d, d;
  }, c;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils);
}(window, function (a, b, c) {
  var d = a.create("masonry");return d.prototype._resetLayout = function () {
    this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();var a = this.cols;for (this.colYs = []; a--;) {
      this.colYs.push(0);
    }this.maxY = 0;
  }, d.prototype.measureColumns = function () {
    if (this.getContainerWidth(), !this.columnWidth) {
      var a = this.items[0],
          c = a && a.element;this.columnWidth = c && b(c).outerWidth || this.containerWidth;
    }var d = this.columnWidth += this.gutter,
        e = this.containerWidth + this.gutter,
        f = e / d,
        g = d - e % d,
        h = g && 1 > g ? "round" : "floor";f = Math[h](f), this.cols = Math.max(f, 1);
  }, d.prototype.getContainerWidth = function () {
    var a = this.options.isFitWidth ? this.element.parentNode : this.element,
        c = b(a);this.containerWidth = c && c.innerWidth;
  }, d.prototype._getItemLayoutPosition = function (a) {
    a.getSize();var b = a.size.outerWidth % this.columnWidth,
        d = b && 1 > b ? "round" : "ceil",
        e = Math[d](a.size.outerWidth / this.columnWidth);e = Math.min(e, this.cols);for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = { x: this.columnWidth * h, y: g }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) {
      this.colYs[h + l] = j;
    }return i;
  }, d.prototype._getColGroup = function (a) {
    if (2 > a) return this.colYs;for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
      var e = this.colYs.slice(d, d + a);b[d] = Math.max.apply(Math, e);
    }return b;
  }, d.prototype._manageStamp = function (a) {
    var c = b(a),
        d = this._getElementOffset(a),
        e = this.options.isOriginLeft ? d.left : d.right,
        f = e + c.outerWidth,
        g = Math.floor(e / this.columnWidth);g = Math.max(0, g);var h = Math.floor(f / this.columnWidth);h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) {
      this.colYs[j] = Math.max(i, this.colYs[j]);
    }
  }, d.prototype._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);var a = { height: this.maxY };return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a;
  }, d.prototype._getContainerFitWidth = function () {
    for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) {
      a++;
    }return (this.cols - a) * this.columnWidth - this.gutter;
  }, d.prototype.needsResizeLayout = function () {
    var a = this.containerWidth;return this.getContainerWidth(), a !== this.containerWidth;
  }, d;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode"), require("masonry-layout")) : b(a.Isotope.LayoutMode, a.Masonry);
}(window, function (a, b) {
  "use strict";
  function c(a, b) {
    for (var c in b) {
      a[c] = b[c];
    }return a;
  }var d = a.create("masonry"),
      e = d.prototype._getElementOffset,
      f = d.prototype.layout,
      g = d.prototype._getMeasurement;
  c(d.prototype, b.prototype), d.prototype._getElementOffset = e, d.prototype.layout = f, d.prototype._getMeasurement = g;var h = d.prototype.measureColumns;d.prototype.measureColumns = function () {
    this.items = this.isotope.filteredItems, h.call(this);
  };var i = d.prototype._manageStamp;return d.prototype._manageStamp = function () {
    this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, i.apply(this, arguments);
  }, d;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode);
}(window, function (a) {
  "use strict";
  var b = a.create("fitRows");return b.prototype._resetLayout = function () {
    this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth");
  }, b.prototype._getItemLayoutPosition = function (a) {
    a.getSize();var b = a.size.outerWidth + this.gutter,
        c = this.isotope.size.innerWidth + this.gutter;0 !== this.x && b + this.x > c && (this.x = 0, this.y = this.maxY);var d = { x: this.x, y: this.y };return this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight), this.x += b, d;
  }, b.prototype._getContainerSize = function () {
    return { height: this.maxY };
  }, b;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode);
}(window, function (a) {
  "use strict";
  var b = a.create("vertical", { horizontalAlignment: 0 });return b.prototype._resetLayout = function () {
    this.y = 0;
  }, b.prototype._getItemLayoutPosition = function (a) {
    a.getSize();var b = (this.isotope.size.innerWidth - a.size.outerWidth) * this.options.horizontalAlignment,
        c = this.y;return this.y += a.size.outerHeight, { x: b, y: c };
  }, b.prototype._getContainerSize = function () {
    return { height: this.y };
  }, b;
}), function (a, b) {
  "use strict";
  "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (c, d, e, f, g, h) {
    return b(a, c, d, e, f, g, h);
  }) : "object" == typeof exports ? module.exports = b(a, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : a.Isotope = b(a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode);
}(window, function (a, b, c, d, e, f, g) {
  function h(a, b) {
    return function (c, d) {
      for (var e = 0, f = a.length; f > e; e++) {
        var g = a[e],
            h = c.sortData[g],
            i = d.sortData[g];if (h > i || i > h) {
          var j = void 0 !== b[g] ? b[g] : b,
              k = j ? 1 : -1;return (h > i ? 1 : -1) * k;
        }
      }return 0;
    };
  }var i = a.jQuery,
      j = String.prototype.trim ? function (a) {
    return a.trim();
  } : function (a) {
    return a.replace(/^\s+|\s+$/g, "");
  },
      k = document.documentElement,
      l = k.textContent ? function (a) {
    return a.textContent;
  } : function (a) {
    return a.innerText;
  },
      m = b.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 });m.Item = f, m.LayoutMode = g, m.prototype._create = function () {
    this.itemGUID = 0, this._sorters = {}, this._getSorters(), b.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];for (var a in g.modes) {
      this._initLayoutMode(a);
    }
  }, m.prototype.reloadItems = function () {
    this.itemGUID = 0, b.prototype.reloadItems.call(this);
  }, m.prototype._itemize = function () {
    for (var a = b.prototype._itemize.apply(this, arguments), c = 0, d = a.length; d > c; c++) {
      var e = a[c];e.id = this.itemGUID++;
    }return this._updateItemsSortData(a), a;
  }, m.prototype._initLayoutMode = function (a) {
    var b = g.modes[a],
        c = this.options[a] || {};this.options[a] = b.options ? e.extend(b.options, c) : c, this.modes[a] = new b(this);
  }, m.prototype.layout = function () {
    return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout();
  }, m.prototype._layout = function () {
    var a = this._getIsInstant();this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, a), this._isLayoutInited = !0;
  }, m.prototype.arrange = function (a) {
    function b() {
      d.reveal(c.needReveal), d.hide(c.needHide);
    }this.option(a), this._getIsInstant();var c = this._filter(this.items);this.filteredItems = c.matches;var d = this;this._bindArrangeComplete(), this._isInstant ? this._noTransition(b) : b(), this._sort(), this._layout();
  }, m.prototype._init = m.prototype.arrange, m.prototype._getIsInstant = function () {
    var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;return this._isInstant = a, a;
  }, m.prototype._bindArrangeComplete = function () {
    function a() {
      b && c && d && e.dispatchEvent("arrangeComplete", null, [e.filteredItems]);
    }var b,
        c,
        d,
        e = this;this.once("layoutComplete", function () {
      b = !0, a();
    }), this.once("hideComplete", function () {
      c = !0, a();
    }), this.once("revealComplete", function () {
      d = !0, a();
    });
  }, m.prototype._filter = function (a) {
    var b = this.options.filter;b = b || "*";for (var c = [], d = [], e = [], f = this._getFilterTest(b), g = 0, h = a.length; h > g; g++) {
      var i = a[g];if (!i.isIgnored) {
        var j = f(i);j && c.push(i), j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i);
      }
    }return { matches: c, needReveal: d, needHide: e };
  }, m.prototype._getFilterTest = function (a) {
    return i && this.options.isJQueryFiltering ? function (b) {
      return i(b.element).is(a);
    } : "function" == typeof a ? function (b) {
      return a(b.element);
    } : function (b) {
      return d(b.element, a);
    };
  }, m.prototype.updateSortData = function (a) {
    var b;a ? (a = e.makeArray(a), b = this.getItems(a)) : b = this.items, this._getSorters(), this._updateItemsSortData(b);
  }, m.prototype._getSorters = function () {
    var a = this.options.getSortData;for (var b in a) {
      var c = a[b];this._sorters[b] = n(c);
    }
  }, m.prototype._updateItemsSortData = function (a) {
    for (var b = a && a.length, c = 0; b && b > c; c++) {
      var d = a[c];d.updateSortData();
    }
  };var n = function () {
    function a(a) {
      if ("string" != typeof a) return a;var c = j(a).split(" "),
          d = c[0],
          e = d.match(/^\[(.+)\]$/),
          f = e && e[1],
          g = b(f, d),
          h = m.sortDataParsers[c[1]];return a = h ? function (a) {
        return a && h(g(a));
      } : function (a) {
        return a && g(a);
      };
    }function b(a, b) {
      var c;return c = a ? function (b) {
        return b.getAttribute(a);
      } : function (a) {
        var c = a.querySelector(b);return c && l(c);
      };
    }return a;
  }();m.sortDataParsers = { parseInt: function (a) {
      return parseInt(a, 10);
    }, parseFloat: function (a) {
      return parseFloat(a);
    } }, m.prototype._sort = function () {
    var a = this.options.sortBy;if (a) {
      var b = [].concat.apply(a, this.sortHistory),
          c = h(b, this.options.sortAscending);this.filteredItems.sort(c), a != this.sortHistory[0] && this.sortHistory.unshift(a);
    }
  }, m.prototype._mode = function () {
    var a = this.options.layoutMode,
        b = this.modes[a];if (!b) throw new Error("No layout mode: " + a);return b.options = this.options[a], b;
  }, m.prototype._resetLayout = function () {
    b.prototype._resetLayout.call(this), this._mode()._resetLayout();
  }, m.prototype._getItemLayoutPosition = function (a) {
    return this._mode()._getItemLayoutPosition(a);
  }, m.prototype._manageStamp = function (a) {
    this._mode()._manageStamp(a);
  }, m.prototype._getContainerSize = function () {
    return this._mode()._getContainerSize();
  }, m.prototype.needsResizeLayout = function () {
    return this._mode().needsResizeLayout();
  }, m.prototype.appended = function (a) {
    var b = this.addItems(a);if (b.length) {
      var c = this._filterRevealAdded(b);this.filteredItems = this.filteredItems.concat(c);
    }
  }, m.prototype.prepended = function (a) {
    var b = this._itemize(a);if (b.length) {
      this._resetLayout(), this._manageStamps();var c = this._filterRevealAdded(b);this.layoutItems(this.filteredItems), this.filteredItems = c.concat(this.filteredItems), this.items = b.concat(this.items);
    }
  }, m.prototype._filterRevealAdded = function (a) {
    var b = this._filter(a);return this.hide(b.needHide), this.reveal(b.matches), this.layoutItems(b.matches, !0), b.matches;
  }, m.prototype.insert = function (a) {
    var b = this.addItems(a);if (b.length) {
      var c,
          d,
          e = b.length;for (c = 0; e > c; c++) {
        d = b[c], this.element.appendChild(d.element);
      }var f = this._filter(b).matches;for (c = 0; e > c; c++) {
        b[c].isLayoutInstant = !0;
      }for (this.arrange(), c = 0; e > c; c++) {
        delete b[c].isLayoutInstant;
      }this.reveal(f);
    }
  };var o = m.prototype.remove;return m.prototype.remove = function (a) {
    a = e.makeArray(a);var b = this.getItems(a);o.call(this, a);var c = b && b.length;if (c) for (var d = 0; c > d; d++) {
      var f = b[d];e.removeFrom(this.filteredItems, f);
    }
  }, m.prototype.shuffle = function () {
    for (var a = 0, b = this.items.length; b > a; a++) {
      var c = this.items[a];c.sortData.random = Math.random();
    }this.options.sortBy = "random", this._sort(), this._layout();
  }, m.prototype._noTransition = function (a) {
    var b = this.options.transitionDuration;this.options.transitionDuration = 0;var c = a.call(this);return this.options.transitionDuration = b, c;
  }, m.prototype.getFilteredItemElements = function () {
    for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++) {
      a.push(this.filteredItems[b].element);
    }return a;
  }, m;
});
"use strict";

/*!
 * VERSION: 1.20.5
 * DATE: 2018-05-21
 * UPDATES AND DOCS AT: http://greensock.com
 * 
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
    var d = function (a) {
      var b,
          c = [],
          d = a.length;for (b = 0; b !== d; c.push(a[b++])) {}return c;
    },
        e = function (a, b, c) {
      var d,
          e,
          f = a.cycle;for (d in f) {
        e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
      }delete a.cycle;
    },
        f = function (a, b, d) {
      c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._repeat && this._uncache(!0), this.render = f.prototype.render;
    },
        g = 1e-10,
        h = c._internals,
        i = h.isSelector,
        j = h.isArray,
        k = f.prototype = c.to({}, .1, {}),
        l = [];f.version = "1.20.5", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function () {
      return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), c.prototype.invalidate.call(this);
    }, k.updateTo = function (a, b) {
      var d,
          e = this.ratio,
          f = this.vars.immediateRender || a.immediateRender;b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));for (d in a) {
        this.vars[d] = a[d];
      }if (this._initted || f) if (b) this._initted = !1, f && this.render(0, !0, !0);else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
        var g = this._totalTime;this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1);
      } else if (this._initted = !1, this._init(), this._time > 0 || f) for (var h, i = 1 / (1 - e), j = this._firstPT; j;) {
        h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next;
      }return this;
    }, k.render = function (a, b, d) {
      this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();var e,
          f,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p = this._dirty ? this.totalDuration() : this._totalDuration,
          q = this._time,
          r = this._totalTime,
          s = this._cycle,
          t = this._duration,
          u = this._rawPrevTime;if (a >= p - 1e-7 && a >= 0 ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = t, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (e = !0, f = "onComplete", d = d || this._timeline.autoRemoveChildren), 0 === t && (this._initted || !this.vars.lazy || d) && (this._startTime === this._timeline._duration && (a = 0), (0 > u || 0 >= a && a >= -1e-7 || u === g && "isPause" !== this.data) && u !== a && (d = !0, u > g && (f = "onReverseComplete")), this._rawPrevTime = n = !b || a || u === a ? a : g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== r || 0 === t && u > 0) && (f = "onReverseComplete", e = this._reversed), 0 > a && (this._active = !1, 0 === t && (this._initted || !this.vars.lazy || d) && (u >= 0 && (d = !0), this._rawPrevTime = n = !b || a || u === a ? a : g)), this._initted || (d = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (j = t + this._repeatDelay, this._cycle = this._totalTime / j >> 0, 0 !== this._cycle && this._cycle === this._totalTime / j && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * j, this._yoyo && 0 !== (1 & this._cycle) && (this._time = t - this._time, o = this._yoyoEase || this.vars.yoyoEase, o && (this._yoyoEase || (o !== !0 || this._initted ? this._yoyoEase = o = o === !0 ? this._ease : o instanceof Ease ? o : Ease.map[o] : (o = this.vars.ease, this._yoyoEase = o = o ? o instanceof Ease ? o : "function" == typeof o ? new Ease(o, this.vars.easeParams) : Ease.map[o] || c.defaultEase : c.defaultEase)), this.ratio = o ? 1 - o.getRatio((t - this._time) / t) : 0)), this._time > t ? this._time = t : this._time < 0 && (this._time = 0)), this._easeType && !o ? (k = this._time / t, l = this._easeType, m = this._easePower, (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : this._time / t < .5 ? this.ratio = k / 2 : this.ratio = 1 - k / 2) : o || (this.ratio = this._ease.getRatio(this._time / t))), q === this._time && !d && s === this._cycle) return void (r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));if (!this._initted) {
        if (this._init(), !this._initted || this._gc) return;if (!d && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = q, this._totalTime = r, this._rawPrevTime = u, this._cycle = s, h.lazyTweens.push(this), void (this._lazy = [a, b]);!this._time || e || o ? e && this._ease._calcEnd && !o && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / t);
      }for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== q && a >= 0 && (this._active = !0), 0 === r && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, !0, d) : f || (f = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === t) && (b || this._callback("onStart"))), i = this._firstPT; i;) {
        i.f ? i.t[i.p](i.c * this.ratio + i.s) : i.t[i.p] = i.c * this.ratio + i.s, i = i._next;
      }this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, !0, d), b || (this._totalTime !== r || f) && this._callback("onUpdate")), this._cycle !== s && (b || this._gc || this.vars.onRepeat && this._callback("onRepeat")), f && (!this._gc || d) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, !0, d), e && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[f] && this._callback(f), 0 === t && this._rawPrevTime === g && n !== g && (this._rawPrevTime = 0));
    }, f.to = function (a, b, c) {
      return new f(a, b, c);
    }, f.from = function (a, b, c) {
      return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c);
    }, f.fromTo = function (a, b, c, d) {
      return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new f(a, b, d);
    }, f.staggerTo = f.allTo = function (a, b, g, h, k, m, n) {
      h = h || 0;var o,
          p,
          q,
          r,
          s = 0,
          t = [],
          u = function () {
        g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k.apply(n || g.callbackScope || this, m || l);
      },
          v = g.cycle,
          w = g.startAt && g.startAt.cycle;for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a = a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >= q; q++) {
        p = {};for (r in g) {
          p[r] = g[r];
        }if (v && (e(p, a, q), null != p.duration && (b = p.duration, delete p.duration)), w) {
          w = p.startAt = {};for (r in g.startAt) {
            w[r] = g.startAt[r];
          }e(p.startAt, a, q);
        }p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q], b, p), s += h;
      }return t;
    }, f.staggerFrom = f.allFrom = function (a, b, c, d, e, g, h) {
      return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a, b, c, d, e, g, h);
    }, f.staggerFromTo = f.allFromTo = function (a, b, c, d, e, g, h, i) {
      return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, f.staggerTo(a, b, d, e, g, h, i);
    }, f.delayedCall = function (a, b, c, d, e) {
      return new f(b, 0, { delay: a, onComplete: b, onCompleteParams: c, callbackScope: d, onReverseComplete: b, onReverseCompleteParams: c, immediateRender: !1, useFrames: e, overwrite: 0 });
    }, f.set = function (a, b) {
      return new f(a, 0, b);
    }, f.isTweening = function (a) {
      return c.getTweensOf(a, !0).length > 0;
    };var m = function (a, b) {
      for (var d = [], e = 0, f = a._first; f;) {
        f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(m(f, b)), e = d.length), f = f._next;
      }return d;
    },
        n = f.getAllTweens = function (b) {
      return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b));
    };f.killAll = function (a, c, d, e) {
      null == c && (c = !0), null == d && (d = !0);var f,
          g,
          h,
          i = n(0 != e),
          j = i.length,
          k = c && d && e;for (h = 0; j > h; h++) {
        g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1));
      }
    }, f.killChildTweensOf = function (a, b) {
      if (null != a) {
        var e,
            g,
            k,
            l,
            m,
            n = h.tweenLookup;if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a)) for (l = a.length; --l > -1;) {
          f.killChildTweensOf(a[l], b);
        } else {
          e = [];for (k in n) {
            for (g = n[k].target.parentNode; g;) {
              g === a && (e = e.concat(n[k].tweens)), g = g.parentNode;
            }
          }for (m = e.length, l = 0; m > l; l++) {
            b && e[l].totalTime(e[l].totalDuration()), e[l]._enabled(!1, !1);
          }
        }
      }
    };var o = function (a, c, d, e) {
      c = c !== !1, d = d !== !1, e = e !== !1;for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;) {
        g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a);
      }
    };return f.pauseAll = function (a, b, c) {
      o(!0, a, b, c);
    }, f.resumeAll = function (a, b, c) {
      o(!1, a, b, c);
    }, f.globalTimeScale = function (b) {
      var d = a._rootTimeline,
          e = c.ticker.time;return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale;
    }, k.progress = function (a, b) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration();
    }, k.totalProgress = function (a, b) {
      return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration();
    }, k.time = function (a, b) {
      return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time;
    }, k.duration = function (b) {
      return arguments.length ? a.prototype.duration.call(this, b) : this._duration;
    }, k.totalDuration = function (a) {
      return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration);
    }, k.repeat = function (a) {
      return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat;
    }, k.repeatDelay = function (a) {
      return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay;
    }, k.yoyo = function (a) {
      return arguments.length ? (this._yoyo = a, this) : this._yoyo;
    }, f;
  }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
    var d = function (a) {
      b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;var c,
          d,
          e = this.vars;for (d in e) {
        c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
      }i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger);
    },
        e = 1e-10,
        f = c._internals,
        g = d._internals = {},
        h = f.isSelector,
        i = f.isArray,
        j = f.lazyTweens,
        k = f.lazyRender,
        l = _gsScope._gsDefine.globals,
        m = function (a) {
      var b,
          c = {};for (b in a) {
        c[b] = a[b];
      }return c;
    },
        n = function (a, b, c) {
      var d,
          e,
          f = a.cycle;for (d in f) {
        e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
      }delete a.cycle;
    },
        o = g.pauseCallback = function () {},
        p = function (a) {
      var b,
          c = [],
          d = a.length;for (b = 0; b !== d; c.push(a[b++])) {}return c;
    },
        q = d.prototype = new b();return d.version = "1.20.4", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function (a, b, d, e) {
      var f = d.repeat && l.TweenMax || c;return b ? this.add(new f(a, b, d), e) : this.set(a, d, e);
    }, q.from = function (a, b, d, e) {
      return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e);
    }, q.fromTo = function (a, b, d, e, f) {
      var g = e.repeat && l.TweenMax || c;return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f);
    }, q.staggerTo = function (a, b, e, f, g, i, j, k) {
      var l,
          o,
          q = new d({ onComplete: i, onCompleteParams: j, callbackScope: k, smoothChildTiming: this.smoothChildTiming }),
          r = e.cycle;for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++) {
        l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)), q.to(a[o], b, l, o * f);
      }return this.add(q, g);
    }, q.staggerFrom = function (a, b, c, d, e, f, g, h) {
      return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h);
    }, q.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
      return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i);
    }, q.call = function (a, b, d, e) {
      return this.add(c.delayedCall(0, a, b, d), e);
    }, q.set = function (a, b, d) {
      return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d);
    }, d.exportRoot = function (a, b) {
      a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);var e,
          f,
          g,
          h,
          i = new d(a),
          j = i._timeline;for (null == b && (b = !0), j._remove(i, !0), i._startTime = 0, i._rawPrevTime = i._time = i._totalTime = j._time, g = j._first; g;) {
        h = g._next, b && g instanceof c && g.target === g.vars.onComplete || (f = g._startTime - g._delay, 0 > f && (e = 1), i.add(g, f)), g = h;
      }return j.add(i, 0), e && i.totalDuration(), i;
    }, q.add = function (e, f, g, h) {
      var j, k, l, m, n, o;if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
        if (e instanceof Array || e && e.push && i(e)) {
          for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) {
            i(m = e[l]) && (m = new d({ tweens: m })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
          }return this._uncache(!0);
        }if ("string" == typeof e) return this.addLabel(e, f);if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";e = c.delayedCall(0, e);
      }if (b.prototype.add.call(this, e, f), e._time && e.render((this.rawTime() - e._startTime) * e._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (n = this, o = n.rawTime() > e._startTime; n._timeline;) {
        o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
      }return this;
    }, q.remove = function (b) {
      if (b instanceof a) {
        this._remove(b, !1);var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this;
      }if (b instanceof Array || b && b.push && i(b)) {
        for (var d = b.length; --d > -1;) {
          this.remove(b[d]);
        }return this;
      }return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b);
    }, q._remove = function (a, c) {
      b.prototype._remove.call(this, a, c);var d = this._last;return d ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this;
    }, q.append = function (a, b) {
      return this.add(a, this._parseTimeOrLabel(null, b, !0, a));
    }, q.insert = q.insertMultiple = function (a, b, c, d) {
      return this.add(a, b || 0, c, d);
    }, q.appendMultiple = function (a, b, c, d) {
      return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d);
    }, q.addLabel = function (a, b) {
      return this._labels[a] = this._parseTimeOrLabel(b), this;
    }, q.addPause = function (a, b, d, e) {
      var f = c.delayedCall(0, o, d, e || this);return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a);
    }, q.removeLabel = function (a) {
      return delete this._labels[a], this;
    }, q.getLabelTime = function (a) {
      return null != this._labels[a] ? this._labels[a] : -1;
    }, q._parseTimeOrLabel = function (b, c, d, e) {
      var f, g;if (e instanceof a && e.timeline === this) this.remove(e);else if (e && (e instanceof Array || e.push && i(e))) for (g = e.length; --g > -1;) {
        e[g] instanceof a && e[g].timeline === this && this.remove(e[g]);
      }if (f = "number" != typeof b || c ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - f : 0, d);if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = f);else {
        if (g = b.indexOf("="), -1 === g) return null == this._labels[b] ? d ? this._labels[b] = f + c : c : this._labels[b] + c;c = parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1)), b = g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f;
      }return Number(b) + c;
    }, q.seek = function (a, b) {
      return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1);
    }, q.stop = function () {
      return this.paused(!0);
    }, q.gotoAndPlay = function (a, b) {
      return this.play(a, b);
    }, q.gotoAndStop = function (a, b) {
      return this.pause(a, b);
    }, q.render = function (a, b, c) {
      this._gc && this._enabled(!0, !1);var d,
          f,
          g,
          h,
          i,
          l,
          m,
          n = this._time,
          o = this._dirty ? this.totalDuration() : this._totalDuration,
          p = this._startTime,
          q = this._timeScale,
          r = this._paused;if (n !== this._time && (a += this._time - n), a >= o - 1e-7 && a >= 0) this._totalTime = this._time = o, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = o + 1e-4;else if (1e-7 > a) {
        if (this._totalTime = this._time = 0, (0 !== n || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a;else {
          if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f) for (d = this._first; d && 0 === d._startTime;) {
            d._duration || (f = !1), d = d._next;
          }a = 0, this._initted || (i = !0);
        }
      } else {
        if (this._hasPause && !this._forcingPlayhead && !b) {
          if (a >= n) for (d = this._first; d && d._startTime <= a && !l;) {
            d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next;
          } else for (d = this._last; d && d._startTime >= a && !l;) {
            d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
          }l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay));
        }this._totalTime = this._time = this._rawPrevTime = a;
      }if (this._time !== n && this._first || c || i || l) {
        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== n && a > 0 && (this._active = !0), 0 === n && this.vars.onStart && (0 === this._time && this._duration || b || this._callback("onStart")), m = this._time, m >= n) for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r));) {
          (d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
        } else for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r));) {
          if (d._active || d._startTime <= n && !d._paused && !d._gc) {
            if (l === d) {
              for (l = d._prev; l && l.endTime() > this._time;) {
                l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev;
              }l = null, this.pause();
            }d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c);
          }d = g;
        }this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || o >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h)));
      }
    }, q._hasPausedChild = function () {
      for (var a = this._first; a;) {
        if (a._paused || a instanceof d && a._hasPausedChild()) return !0;a = a._next;
      }return !1;
    }, q.getChildren = function (a, b, d, e) {
      e = e || -9999999999;for (var f = [], g = this._first, h = 0; g;) {
        g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
      }return f;
    }, q.getTweensOf = function (a, b) {
      var d,
          e,
          f = this._gc,
          g = [],
          h = 0;for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;) {
        (d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
      }return f && this._enabled(!1, !0), g;
    }, q.recent = function () {
      return this._recent;
    }, q._contains = function (a) {
      for (var b = a.timeline; b;) {
        if (b === this) return !0;b = b.timeline;
      }return !1;
    }, q.shiftChildren = function (a, b, c) {
      c = c || 0;for (var d, e = this._first, f = this._labels; e;) {
        e._startTime >= c && (e._startTime += a), e = e._next;
      }if (b) for (d in f) {
        f[d] >= c && (f[d] += a);
      }return this._uncache(!0);
    }, q._kill = function (a, b) {
      if (!a && !b) return this._enabled(!1, !1);for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) {
        c[d]._kill(a, b) && (e = !0);
      }return e;
    }, q.clear = function (a) {
      var b = this.getChildren(!1, !0, !0),
          c = b.length;for (this._time = this._totalTime = 0; --c > -1;) {
        b[c]._enabled(!1, !1);
      }return a !== !1 && (this._labels = {}), this._uncache(!0);
    }, q.invalidate = function () {
      for (var b = this._first; b;) {
        b.invalidate(), b = b._next;
      }return a.prototype.invalidate.call(this);
    }, q._enabled = function (a, c) {
      if (a === this._gc) for (var d = this._first; d;) {
        d._enabled(a, !0), d = d._next;
      }return b.prototype._enabled.call(this, a, c);
    }, q.totalTime = function (b, c, d) {
      this._forcingPlayhead = !0;var e = a.prototype.totalTime.apply(this, arguments);return this._forcingPlayhead = !1, e;
    }, q.duration = function (a) {
      return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration);
    }, q.totalDuration = function (a) {
      if (!arguments.length) {
        if (this._dirty) {
          for (var b, c, d = 0, e = this._last, f = 999999999999; e;) {
            b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(e, e._startTime - e._delay), this._calculatingDuration = 0) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale, this._time -= e._startTime, this._totalTime -= e._startTime, this._rawPrevTime -= e._startTime), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
          }this._duration = this._totalDuration = d, this._dirty = !1;
        }return this._totalDuration;
      }return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this;
    }, q.paused = function (b) {
      if (!b) for (var c = this._first, d = this._time; c;) {
        c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
      }return a.prototype.paused.apply(this, arguments);
    }, q.usesFrames = function () {
      for (var b = this._timeline; b._timeline;) {
        b = b._timeline;
      }return b === a._rootFramesTimeline;
    }, q.rawTime = function (a) {
      return a && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(a) - this._startTime) * this._timeScale;
    }, d;
  }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (a, b, c) {
    var d = function (b) {
      a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0;
    },
        e = 1e-10,
        f = b._internals,
        g = f.lazyTweens,
        h = f.lazyRender,
        i = _gsScope._gsDefine.globals,
        j = new c(null, null, 1, 0),
        k = d.prototype = new a();return k.constructor = d, k.kill()._gc = !1, d.version = "1.20.4", k.invalidate = function () {
      return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this);
    }, k.addCallback = function (a, c, d, e) {
      return this.add(b.delayedCall(0, a, d, e), c);
    }, k.removeCallback = function (a, b) {
      if (a) if (null == b) this._kill(null, a);else for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;) {
        c[d]._startTime === e && c[d]._enabled(!1, !1);
      }return this;
    }, k.removePause = function (b) {
      return this.removeCallback(a._internals.pauseCallback, b);
    }, k.tweenTo = function (a, c) {
      c = c || {};var d,
          e,
          f,
          g = { ease: j, useFrames: this.usesFrames(), immediateRender: !1, lazy: !1 },
          h = c.repeat && i.TweenMax || b;for (e in c) {
        g[e] = c[e];
      }return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) / this._timeScale || .001, f = new h(this, d, g), g.onStart = function () {
        f.target.paused(!0), f.vars.time === f.target.time() || d !== f.duration() || f.isFromTo || f.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale).render(f.time(), !0, !0), c.onStart && c.onStart.apply(c.onStartScope || c.callbackScope || f, c.onStartParams || []);
      }, f;
    }, k.tweenFromTo = function (a, b, c) {
      c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = { onComplete: this.seek, onCompleteParams: [a], callbackScope: this }, c.immediateRender = c.immediateRender !== !1;var d = this.tweenTo(b, c);return d.isFromTo = 1, d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001);
    }, k.render = function (a, b, c) {
      this._gc && this._enabled(!0, !1);var d,
          f,
          i,
          j,
          k,
          l,
          m,
          n,
          o = this._time,
          p = this._dirty ? this.totalDuration() : this._totalDuration,
          q = this._duration,
          r = this._totalTime,
          s = this._startTime,
          t = this._timeScale,
          u = this._rawPrevTime,
          v = this._paused,
          w = this._cycle;if (o !== this._time && (a += this._time - o), a >= p - 1e-7 && a >= 0) this._locked || (this._totalTime = p, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (f = !0, j = "onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = q, a = q + 1e-4);else if (1e-7 > a) {
        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== o || 0 === q && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j = "onReverseComplete") : u >= 0 && this._first && (k = !0), this._rawPrevTime = a;else {
          if (this._rawPrevTime = q || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f) for (d = this._first; d && 0 === d._startTime;) {
            d._duration || (f = !1), d = d._next;
          }a = 0, this._initted || (k = !0);
        }
      } else if (0 === q && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (l = q + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && a >= r && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (this._time = q - this._time), this._time > q ? (this._time = q, a = q + 1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this._hasPause && !this._forcingPlayhead && !b) {
        if (a = this._time, a >= o || this._repeat && w !== this._cycle) for (d = this._first; d && d._startTime <= a && !m;) {
          d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (m = d), d = d._next;
        } else for (d = this._last; d && d._startTime >= a && !m;) {
          d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (m = d), d = d._prev;
        }m && m._startTime < q && (this._time = a = m._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay));
      }if (this._cycle !== w && !this._locked) {
        var x = this._yoyo && 0 !== (1 & w),
            y = x === (this._yoyo && 0 !== (1 & this._cycle)),
            z = this._totalTime,
            A = this._cycle,
            B = this._rawPrevTime,
            C = this._time;if (this._totalTime = w * q, this._cycle < w ? x = !x : this._totalTime += q, this._time = o, this._rawPrevTime = 0 === q ? u - 1e-4 : u, this._cycle = w, this._locked = !0, o = x ? 0 : q, this.render(o, b, 0 === q), b || this._gc || this.vars.onRepeat && (this._cycle = A, this._locked = !1, this._callback("onRepeat")), o !== this._time) return;if (y && (this._cycle = w, this._locked = !0, o = x ? q + 1e-4 : -1e-4, this.render(o, !0, !1)), this._locked = !1, this._paused && !v) return;this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B;
      }if (!(this._time !== o && this._first || c || k || m)) return void (r !== this._totalTime && this._onUpdate && (b || this._callback("onUpdate")));if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && (0 === this._totalTime && this._totalDuration || b || this._callback("onStart")), n = this._time, n >= o) for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));) {
        (d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = i;
      } else for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused || v));) {
        if (d._active || d._startTime <= o && !d._paused && !d._gc) {
          if (m === d) {
            for (m = d._prev; m && m.endTime() > this._time;) {
              m.render(m._reversed ? m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m._startTime) * m._timeScale, b, c), m = m._prev;
            }m = null, this.pause();
          }d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c);
        }d = i;
      }this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (f && (g.length && h(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[j] && this._callback(j)));
    }, k.getActive = function (a, b, c) {
      null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);var d,
          e,
          f = [],
          g = this.getChildren(a, b, c),
          h = 0,
          i = g.length;for (d = 0; i > d; d++) {
        e = g[d], e.isActive() && (f[h++] = e);
      }return f;
    }, k.getLabelAfter = function (a) {
      a || 0 !== a && (a = this._time);var b,
          c = this.getLabelsArray(),
          d = c.length;for (b = 0; d > b; b++) {
        if (c[b].time > a) return c[b].name;
      }return null;
    }, k.getLabelBefore = function (a) {
      null == a && (a = this._time);for (var b = this.getLabelsArray(), c = b.length; --c > -1;) {
        if (b[c].time < a) return b[c].name;
      }return null;
    }, k.getLabelsArray = function () {
      var a,
          b = [],
          c = 0;for (a in this._labels) {
        b[c++] = { time: this._labels[a], name: a };
      }return b.sort(function (a, b) {
        return a.time - b.time;
      }), b;
    }, k.invalidate = function () {
      return this._locked = !1, a.prototype.invalidate.call(this);
    }, k.progress = function (a, b) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration() || 0;
    }, k.totalProgress = function (a, b) {
      return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration() || 0;
    }, k.totalDuration = function (b) {
      return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration);
    }, k.time = function (a, b) {
      return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time;
    }, k.repeat = function (a) {
      return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat;
    }, k.repeatDelay = function (a) {
      return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay;
    }, k.yoyo = function (a) {
      return arguments.length ? (this._yoyo = a, this) : this._yoyo;
    }, k.currentLabel = function (a) {
      return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8);
    }, d;
  }, !0), function () {
    var a = 180 / Math.PI,
        b = [],
        c = [],
        d = [],
        e = {},
        f = _gsScope._gsDefine.globals,
        g = function (a, b, c, d) {
      c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a;
    },
        h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
        i = function (a, b, c, d) {
      var e = { a: a },
          f = {},
          g = {},
          h = { c: d },
          i = (a + b) / 2,
          j = (b + c) / 2,
          k = (c + d) / 2,
          l = (i + j) / 2,
          m = (j + k) / 2,
          n = (m - l) / 8;return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h];
    },
        j = function (a, e, f, g, h) {
      var j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w = a.length - 1,
          x = 0,
          y = a[0].a;for (j = 0; w > j; j++) {
        n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5, p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !== j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
      }n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]));
    },
        k = function (a, d, e, f) {
      var h,
          i,
          j,
          k,
          l,
          m,
          n = [];if (f) for (a = [f].concat(a), i = a.length; --i > -1;) {
        "string" == typeof (m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
      }if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[0][d]), n;for (i = 0; h > i; i++) {
        j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
      }return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n;
    },
        l = function (a, f, g, i, l, m) {
      var n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v = {},
          w = [],
          x = m || a[0];l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);for (o in a[0]) {
        w.push(o);
      }if (a.length > 1) {
        for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;) {
          if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
            t = !1;break;
          }
        }t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3]);
      }for (b.length = c.length = d.length = 0, n = w.length; --n > -1;) {
        o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
      }for (n = b.length; --n > -1;) {
        b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
      }if (!i) {
        for (n = w.length; --n > -1;) {
          if (e[o]) for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++) {
            r = p[q + 1].da / c[q] + p[q].da / b[q] || 0, d[q] = (d[q] || 0) + r * r;
          }
        }for (n = d.length; --n > -1;) {
          d[n] = Math.sqrt(d[n]);
        }
      }for (n = w.length, q = g ? 4 : 1; --n > -1;) {
        o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q));
      }return v;
    },
        m = function (a, b, c) {
      b = b || "soft";var d,
          e,
          f,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p = {},
          q = "cubic" === b ? 3 : 2,
          r = "soft" === b,
          s = [];if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1) throw "invalid Bezier data";for (m in a[0]) {
        s.push(m);
      }for (j = s.length; --j > -1;) {
        for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++) {
          d = null == c ? a[k][m] : "string" == typeof (o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d;
        }for (l = n - q + 1, n = 0, k = 0; l > k; k += q) {
          d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
        }i.length = n;
      }return p;
    },
        n = function (a, b, c) {
      for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;) {
        for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++) {
          j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d;
        }
      }
    },
        o = function (a, b) {
      b = b >> 0 || 6;var c,
          d,
          e,
          f,
          g = [],
          h = [],
          i = 0,
          j = 0,
          k = b - 1,
          l = [],
          m = [];for (c in a) {
        n(a[c], g, b);
      }for (e = g.length, d = 0; e > d; d++) {
        i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
      }return { length: j, lengths: h, segments: l };
    },
        p = _gsScope._gsDefine.plugin({ propName: "bezier", priority: -1, version: "1.3.8", API: 2, global: !0, init: function (a, b, c) {
        this._target = a, b instanceof Array && (b = { values: b }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);var d,
            e,
            f,
            g,
            h,
            i = b.values || [],
            j = {},
            k = i[0],
            n = b.autoRotate || c.vars.orientToBezier;this._autoRotate = n ? n instanceof Array ? n : [["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]] : null;for (d in k) {
          this._props.push(d);
        }for (f = this._props.length; --f > -1;) {
          d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j);
        }if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) {
          var p = o(this._beziers, this._timeRes);this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length;
        }if (n = this._autoRotate) for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) {
          for (g = 0; 3 > g; g++) {
            d = n[f][g], this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
          }d = n[f][2], this._initialRotations[f] = (this._func[d] ? this._func[d].call(this._target) : this._target[d]) || 0, this._overwriteProps.push(d);
        }return this._startRatio = c.vars.runBackwards ? 1 : 0, !0;
      }, set: function (b) {
        var c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m = this._segCount,
            n = this._func,
            o = this._target,
            p = b !== this._startRatio;if (this._timeRes) {
          if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) {
            for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;) {}this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0];
          } else if (b < this._l1 && e > 0) {
            for (; e > 0 && (this._l1 = k[--e]) >= b;) {}0 === e && b < this._l1 ? this._l1 = 0 : e++, this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si];
          }if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) {
            for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;) {}this._s1 = l[e - 1], this._si = e;
          } else if (b < this._s1 && e > 0) {
            for (; e > 0 && (this._s1 = l[--e]) >= b;) {}0 === e && b < this._s1 ? this._s1 = 0 : e++, this._s2 = l[e], this._si = e;
          }h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
        } else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;for (d = 1 - h, e = this._props.length; --e > -1;) {
          f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i;
        }if (this._autoRotate) {
          var q,
              r,
              s,
              t,
              u,
              v,
              w,
              x = this._autoRotate;for (e = x.length; --e > -1;) {
            f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i);
          }
        }
      } }),
        q = p.prototype;p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function (a, b, c) {
      return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
    }, p._cssRegister = function () {
      var a = f.CSSPlugin;if (a) {
        var b = a._internals,
            c = b._parseToProxy,
            d = b._setPluginRatio,
            e = b.CSSPropTween;b._registerComplexSpecialProp("bezier", { parser: function (a, b, f, g, h, i) {
            b instanceof Array && (b = { values: b }), i = new p();var j,
                k,
                l,
                m = b.values,
                n = m.length - 1,
                o = [],
                q = {};if (0 > n) return h;for (j = 0; n >= j; j++) {
              l = c(a, m[j], g, h, i, n !== j), o[j] = l.end;
            }for (k in b) {
              q[k] = b[k];
            }return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [["left", "top", "rotation", j, !1]] : null != l.end.x ? [["x", "y", "rotation", j, !1]] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform, l.proxy.rotation = l.autoRotate.rotation || 0, g._overwriteProps.push("rotation")), i._onInitTween(l.proxy, q, g._tween), h;
          } });
      }
    }, q._mod = function (a) {
      for (var b, c = this._overwriteProps, d = c.length; --d > -1;) {
        b = a[c[d]], b && "function" == typeof b && (this._mod[c[d]] = b);
      }
    }, q._kill = function (a) {
      var b,
          c,
          d = this._props;for (b in this._beziers) {
        if (b in a) for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;) {
          d[c] === b && d.splice(c, 1);
        }
      }if (d = this._autoRotate) for (c = d.length; --c > -1;) {
        a[d[c][2]] && d.splice(c, 1);
      }return this._super._kill.call(this, a);
    };
  }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
    var c,
        d,
        e,
        f,
        g = function () {
      a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio;
    },
        h = _gsScope._gsDefine.globals,
        i = {},
        j = g.prototype = new a("css");j.constructor = g, g.version = "1.20.5", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = { top: j, right: j, bottom: j, left: j, width: j, height: j, fontSize: j, padding: j, margin: j, perspective: j, lineHeight: "" };var k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
        t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        w = /(?:\d|\-|\+|=|#|\.)*/g,
        x = /opacity *= *([^)]*)/i,
        y = /opacity:([^;]*)/i,
        z = /alpha\(opacity *=.+?\)/i,
        A = /^(rgb|hsl)/,
        B = /([A-Z])/g,
        C = /-([a-z])/gi,
        D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        E = function (a, b) {
      return b.toUpperCase();
    },
        F = /(?:Left|Right|Width)/i,
        G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        I = /,(?=[^\)]*(?:\(|$))/gi,
        J = /[\s,\(]/i,
        K = Math.PI / 180,
        L = 180 / Math.PI,
        M = {},
        N = { style: {} },
        O = _gsScope.document || { createElement: function () {
        return N;
      } },
        P = function (a, b) {
      return O.createElementNS ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a) : O.createElement(a);
    },
        Q = P("div"),
        R = P("img"),
        S = g._internals = { _specialProps: i },
        T = (_gsScope.navigator || {}).userAgent || "",
        U = function () {
      var a = T.indexOf("Android"),
          b = P("a");return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1;
    }(),
        V = function (a) {
      return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
    },
        W = function (a) {
      _gsScope.console && console.log(a);
    },
        X = "",
        Y = "",
        Z = function (a, b) {
      b = b || Q;var c,
          d,
          e = b.style;if (void 0 !== e[a]) return a;for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];) {}return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) : null;
    },
        $ = ("undefined" != typeof window ? window : O.defaultView || { getComputedStyle: function () {} }).getComputedStyle,
        _ = g.getStyle = function (a, b, c, d, e) {
      var f;return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || $(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a);
    },
        aa = S.convertToPixels = function (a, c, d, e, f) {
      if ("px" === e || !e && "lineHeight" !== c) return d;if ("auto" === e || !d) return 0;var h,
          i,
          j,
          k = F.test(c),
          l = a,
          m = Q.style,
          n = 0 > d,
          o = 1 === d;if (n && (d = -d), o && (d *= 100), "lineHeight" !== c || e) {
        if ("%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight);else {
          if (m.cssText = "border:0 solid red;position:" + _(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;else {
            if (l = a.parentNode || O.body, -1 !== _(l, "display").indexOf("flex") && (m.position = "absolute"), i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;m[k ? "width" : "height"] = d + e;
          }l.appendChild(Q), h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(Q), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = aa(a, c, d, e, !0));
        }
      } else i = $(a).lineHeight, a.style.lineHeight = d, h = parseFloat($(a).lineHeight), a.style.lineHeight = i;return o && (h /= 100), n ? -h : h;
    },
        ba = S.calculateOffset = function (a, b, c) {
      if ("absolute" !== _(a, "position", c)) return 0;var d = "left" === b ? "Left" : "Top",
          e = _(a, "margin" + d, c);return a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0);
    },
        ca = function (a, b) {
      var c,
          d,
          e,
          f = {};if (b = b || $(a, null)) {
        if (c = b.length) for (; --c > -1;) {
          e = b[c], (-1 === e.indexOf("-transform") || Da === e) && (f[e.replace(C, E)] = b.getPropertyValue(e));
        } else for (c in b) {
          (-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]);
        }
      } else if (b = a.currentStyle || a.style) for (c in b) {
        "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
      }return U || (f.opacity = V(a)), d = Ra(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Fa && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f;
    },
        da = function (a, b, c, d, e) {
      var f,
          g,
          h,
          i = {},
          j = a.style;for (g in c) {
        "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ba(a, g), void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
      }if (d) for (g in d) {
        "className" !== g && (i[g] = d[g]);
      }return { difs: i, firstMPT: h };
    },
        ea = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
        fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        ga = function (a, b, c) {
      if ("svg" === (a.nodeName + "").toLowerCase()) return (c || $(a))[b] || 0;if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
          e = ea[b],
          f = e.length;for (c = c || $(a, null); --f > -1;) {
        d -= parseFloat(_(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0;
      }return d;
    },
        ha = function (a, b) {
      if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";(null == a || "" === a) && (a = "0 0");var c,
          d = a.split(" "),
          e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
          f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];if (d.length > 3 && !b) {
        for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) {
          a.push(ha(d[c]));
        }return a.join(",");
      }return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a;
    },
        ia = function (a, b) {
      return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0;
    },
        ja = function (a, b) {
      return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0;
    },
        ka = function (a, b, c, d) {
      var e,
          f,
          g,
          h,
          i,
          j = 1e-6;return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h;
    },
        la = { aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255], olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255], transparent: [255, 255, 255, 0] },
        ma = function (a, b, c) {
      return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0;
    },
        na = g.parseColor = function (a, b) {
      var c, d, e, f, g, h, i, j, k, l, m;if (a) {
        if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];else {
          if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), la[a]) c = la[a];else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];else if ("hsl" === a.substr(0, 3)) {
            if (c = m = a.match(s), b) {
              if (-1 !== a.indexOf("=")) return a.match(t);
            } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(c[3])), c[0] = ma(g + 1 / 3, d, e), c[1] = ma(g, d, e), c[2] = ma(g - 1 / 3, d, e);
          } else c = a.match(s) || la.transparent;c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]));
        }
      } else c = la.black;return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c;
    },
        oa = function (a, b) {
      var c,
          d,
          e,
          f = a.match(pa) || [],
          g = 0,
          h = "";if (!f.length) return a;for (c = 0; c < f.length; c++) {
        d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = na(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
      }return h + a.substr(g);
    },
        pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for (j in la) {
      pa += "|" + j + "\\b";
    }pa = new RegExp(pa + ")", "gi"), g.colorStringFilter = function (a) {
      var b,
          c = a[0] + " " + a[1];pa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = oa(a[0], b), a[1] = oa(a[1], b)), pa.lastIndex = 0;
    }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);var qa = function (a, b, c, d) {
      if (null == a) return function (a) {
        return a;
      };var e,
          f = b ? (a.match(pa) || [""])[0] : "",
          g = a.split(f).join("").match(u) || [],
          h = a.substr(0, a.indexOf(g[0])),
          i = ")" === a.charAt(a.length - 1) ? ")" : "",
          j = -1 !== a.indexOf(" ") ? " " : ",",
          k = g.length,
          l = k > 0 ? g[0].replace(s, "") : "";return k ? e = b ? function (a) {
        var b, m, n, o;if ("number" == typeof a) a += l;else if (d && I.test(a)) {
          for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++) {
            o[n] = e(o[n]);
          }return o.join(",");
        }if (b = (a.match(pa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--) for (; ++n < k;) {
          m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
        }return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "");
      } : function (a) {
        var b, f, m;if ("number" == typeof a) a += l;else if (d && I.test(a)) {
          for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++) {
            f[m] = e(f[m]);
          }return f.join(",");
        }if (b = a.match(u) || [], m = b.length, k > m--) for (; ++m < k;) {
          b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
        }return h + b.join(j) + i;
      } : function (a) {
        return a;
      };
    },
        ra = function (a) {
      return a = a.split(","), function (b, c, d, e, f, g, h) {
        var i,
            j = (c + "").split(" ");for (h = {}, i = 0; 4 > i; i++) {
          h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
        }return e.parse(b, h, f, g);
      };
    },
        sa = (S._setPluginRatio = function (a) {
      this.plugin.setRatio(a);for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;) {
        b = h[i.v], i.r ? b = i.r(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
      }if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod.call(this._tween, h.rotation, this.t, this._tween) : h.rotation), 1 === a || 0 === a) for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
        if (c = i.t, c.type) {
          if (1 === c.type) {
            for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) {
              e += c["xn" + d] + c["xs" + (d + 1)];
            }c[f] = e;
          }
        } else c[f] = c.s + c.xs0;i = i._next;
      }
    }, function (a, b, c, d, e) {
      this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d);
    }),
        ta = (S._parseToProxy = function (a, b, c, d, e, f) {
      var g,
          h,
          i,
          j,
          k,
          l = d,
          m = {},
          n = {},
          o = c._transform,
          p = M;for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
        if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new sa(d, "s", h, j, d.r), d.c = 0), 1 === d.type)) for (g = d.l; --g > 0;) {
          i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new sa(d, i, h, j, d.rxp[i]));
        }d = d._next;
      }return { proxy: m, end: n, firstMPT: j, pt: k };
    }, S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
      this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ta || f.push(this.n), this.r = j ? "function" == typeof j ? j : Math.round : j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this);
    }),
        ua = function (a, b, c, d, e, f) {
      var g = new ta(a, b, c, d - c, e, -1, f);return g.b = c, g.e = g.xs0 = d, g;
    },
        va = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
      c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && pa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);var m,
          n,
          o,
          p,
          u,
          v,
          w,
          x,
          y,
          z,
          A,
          B,
          C,
          D = c.split(", ").join(",").split(" "),
          E = d.split(", ").join(",").split(" "),
          F = D.length,
          G = k !== !1;for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (-1 !== (d + c).indexOf("rgb") || -1 !== (d + c).indexOf("hsl") ? (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" ")) : (D = D.join(" ").split(",").join(", ").split(" "), E = E.join(" ").split(",").join(", ").split(" ")), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, pa.lastIndex = 0, m = 0; F > m; m++) {
        if (p = D[m], u = E[m] + "", x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ia(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px") ? Math.round : !1, !0);else if (e && pa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""), C = -1 !== u.indexOf("hsl") && U, z = u, p = na(p, C), u = na(u, C), y = p.length + u.length > 6, y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ? h.appendXtra(z.substr(0, z.indexOf("hsl")) + (y ? "hsla(" : "hsl("), p[0], ia(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ia(u[1], p[1]), "%,", !1).appendXtra("", p[2], ia(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(z.substr(0, z.indexOf("rgb")) + (y ? "rgba(" : "rgb("), p[0], u[0] - p[0], ",", Math.round, !0).appendXtra("", p[1], u[1] - p[1], ",", Math.round).appendXtra("", p[2], u[2] - p[2], y ? "," : B, Math.round), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), pa.lastIndex = 0;else if (v = p.match(s)) {
          if (w = u.match(t), !w || w.length !== v.length) return h;for (o = 0, n = 0; n < v.length; n++) {
            A = v[n], z = p.indexOf(A, o), h.appendXtra(p.substr(o, z - o), Number(A), ia(w[n], A), "", G && "px" === p.substr(z + A.length, 2) ? Math.round : !1, 0 === n), o = z + A.length;
          }h["xs" + h.l] += p.substr(o);
        } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
      }if (-1 !== d.indexOf("=") && h.data) {
        for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++) {
          B += h["xs" + m] + h.data["xn" + m];
        }h.e = B + h["xs" + m];
      }return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h;
    },
        wa = 9;for (j = ta.prototype, j.l = j.pr = 0; --wa > 0;) {
      j["xn" + wa] = 0, j["xs" + wa] = "";
    }j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f) {
      var g = this,
          h = g.l;return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ta(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = { s: b + c }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g);
    };var xa = function (a, b) {
      b = b || {}, this.p = b.prefix ? Z(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || qa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0;
    },
        ya = S._registerComplexSpecialProp = function (a, b, c) {
      "object" != typeof b && (b = { parser: c });var d,
          e,
          f = a.split(","),
          g = b.defaultValue;for (c = c || [g], d = 0; d < f.length; d++) {
        b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new xa(f[d], b);
      }
    },
        za = S._registerPluginProp = function (a) {
      if (!i[a]) {
        var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";ya(a, { parser: function (a, c, d, e, f, g, j) {
            var k = h.com.greensock.plugins[b];return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."), f);
          } });
      }
    };j = xa.prototype, j.parseComplex = function (a, b, c, d, e, f) {
      var g,
          h,
          i,
          j,
          k,
          l,
          m = this.keyword;if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) {
        for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) {
          b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
        }b = h.join(", "), c = i.join(", ");
      }return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f);
    }, j.parse = function (a, b, c, d, f, g, h) {
      return this.parseComplex(a.style, this.format(_(a, this.p, e, !1, this.dflt)), this.format(b), f, g);
    }, g.registerSpecialProp = function (a, b, c) {
      ya(a, { parser: function (a, d, e, f, g, h, i) {
          var j = new ta(a, e, 0, 0, g, 2, e, !1, c);return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j;
        }, priority: c });
    }, g.useSVGTransformAttr = !0;var Aa,
        Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
        Ca = Z("transform"),
        Da = X + "transform",
        Ea = Z("transformOrigin"),
        Fa = null !== Z("perspective"),
        Ga = S.Transform = function () {
      this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1;
    },
        Ha = _gsScope.SVGElement,
        Ia = function (a, b, c) {
      var d,
          e = O.createElementNS("http://www.w3.org/2000/svg", a),
          f = /([a-z])([A-Z])/g;for (d in c) {
        e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
      }return b.appendChild(e), e;
    },
        Ja = O.documentElement || {},
        Ka = function () {
      var a,
          b,
          c,
          d = p || /Android/i.test(T) && !_gsScope.chrome;return O.createElementNS && !d && (a = Ia("svg", Ja), b = Ia("rect", a, { width: 100, height: 50, x: 100 }), c = b.getBoundingClientRect().width, b.style[Ea] = "50% 50%", b.style[Ca] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Fa), Ja.removeChild(a)), d;
    }(),
        La = function (a, b, c, d, e, f) {
      var h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v = a._gsTransform,
          w = Qa(a, !0);v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = { x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0, y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0, width: 0, height: 0 }), b = ha(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Pa && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j)), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "));
    },
        Ma = function (a) {
      var b,
          c = P("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
          d = this.parentNode,
          e = this.nextSibling,
          f = this.style.cssText;if (Ja.appendChild(c), c.appendChild(this), this.style.display = "block", a) try {
        b = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ma;
      } catch (g) {} else this._originalGetBBox && (b = this._originalGetBBox());return e ? d.insertBefore(this, e) : d.appendChild(this), Ja.removeChild(c), this.style.cssText = f, b;
    },
        Na = function (a) {
      try {
        return a.getBBox();
      } catch (b) {
        return Ma.call(a, !0);
      }
    },
        Oa = function (a) {
      return !(!Ha || !a.getCTM || a.parentNode && !a.ownerSVGElement || !Na(a));
    },
        Pa = [1, 0, 0, 1, 0, 0],
        Qa = function (a, b) {
      var c,
          d,
          e,
          f,
          g,
          h,
          i = a._gsTransform || new Ga(),
          j = 1e5,
          k = a.style;if (Ca ? d = _(a, Da, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, !Ca || !(h = !$(a) || "none" === $(a).display) && a.parentNode || (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ja.appendChild(a)), d = _(a, Da, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Va(k, "display"), g && Ja.removeChild(a)), (i.svg || a.getCTM && Oa(a)) && (c && -1 !== (k[Ca] + "").indexOf("matrix") && (d = k[Ca], c = 0), e = a.getAttribute("transform"), c && e && (e = a.transform.baseVal.consolidate().matrix, d = "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")", c = 0)), c) return Pa;for (e = (d || "").match(s) || [], wa = e.length; --wa > -1;) {
        f = Number(e[wa]), e[wa] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f;
      }return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e;
    },
        Ra = S.getTransform = function (a, c, d, e) {
      if (a._gsTransform && d && !e) return a._gsTransform;var f,
          h,
          i,
          j,
          k,
          l,
          m = d ? a._gsTransform || new Ga() : new Ga(),
          n = m.scaleX < 0,
          o = 2e-5,
          p = 1e5,
          q = Fa ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
          r = parseFloat(g.defaultTransformPerspective) || 0;if (m.svg = !(!a.getCTM || !Oa(a)), m.svg && (La(a, _(a, Ea, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), Aa = g.useSVGTransformAttr || Ka), f = Qa(a), f !== Pa) {
        if (16 === f.length) {
          var s,
              t,
              u,
              v,
              w,
              x = f[0],
              y = f[1],
              z = f[2],
              A = f[3],
              B = f[4],
              C = f[5],
              D = f[6],
              E = f[7],
              F = f[8],
              G = f[9],
              H = f[10],
              I = f[12],
              J = f[13],
              K = f[14],
              M = f[11],
              N = Math.atan2(D, H);m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L, N && (v = Math.cos(N), w = Math.sin(N), s = x * v + y * w, t = B * v + C * w, u = F * v + G * w, y = y * v - x * w, C = C * v - B * w, G = G * v - F * w, x = s, B = t, F = u), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), N = Math.atan2(B, C), m.scaleX = (Math.sqrt(x * x + y * y + z * z) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + D * D) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(F * F + G * G + H * H) * p + .5 | 0) / p, x /= m.scaleX, B /= m.scaleY, y /= m.scaleX, C /= m.scaleY, Math.abs(N) > o ? (m.skewX = N * L, B = 0, "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N))) : m.skewX = 0, m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C));
        } else if (!Fa || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
          var O = f.length >= 6,
              P = O ? f[0] : 1,
              Q = f[1] || 0,
              R = f[2] || 0,
              S = O ? f[3] : 1;m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Fa && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S));
        }Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180)), m.zOrigin = q;for (h in m) {
          m[h] < o && m[h] > -o && (m[h] = 0);
        }
      }return d && (a._gsTransform = m, m.svg && (Aa && a.style[Ca] ? b.delayedCall(.001, function () {
        Va(a.style, Ca);
      }) : !Aa && a.getAttribute("transform") && b.delayedCall(.001, function () {
        a.removeAttribute("transform");
      }))), m;
    },
        Sa = function (a) {
      var b,
          c,
          d = this.data,
          e = -d.rotation * K,
          f = e + d.skewX * K,
          g = 1e5,
          h = (Math.cos(e) * d.scaleX * g | 0) / g,
          i = (Math.sin(e) * d.scaleX * g | 0) / g,
          j = (Math.sin(f) * -d.scaleY * g | 0) / g,
          k = (Math.cos(f) * d.scaleY * g | 0) / g,
          l = this.t.style,
          m = this.t.currentStyle;if (m) {
        c = i, i = -j, j = -c, b = m.filter, l.filter = "";var n,
            o,
            q = this.t.offsetWidth,
            r = this.t.offsetHeight,
            s = "absolute" !== m.position,
            t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
            u = d.x + q * d.xPercent / 100,
            v = d.y + r * d.yPercent / 100;if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
          var y,
              z,
              A,
              B = 8 > p ? 1 : -1;for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), wa = 0; 4 > wa; wa++) {
            z = fa[wa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A = c !== d[z] ? 2 > wa ? -d.ieOffsetX : -d.ieOffsetY : 2 > wa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === wa || 2 === wa ? 1 : B))) + "px";
          }
        }
      }
    },
        Ta = S.set3DTransformRatio = S.setTransformRatio = function (a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x,
          y,
          z = this.data,
          A = this.t.style,
          B = z.rotation,
          C = z.rotationX,
          D = z.rotationY,
          E = z.scaleX,
          F = z.scaleY,
          G = z.scaleZ,
          H = z.x,
          I = z.y,
          J = z.z,
          L = z.svg,
          M = z.perspective,
          N = z.force3D,
          O = z.skewY,
          P = z.skewX;if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Aa && L || !Fa) return void (B || P || L ? (B *= K, x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b, g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset, Aa && (z.xPercent || z.yPercent) && (q = this.t.getBBox(), H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")", L && Aa ? this.t.setAttribute("transform", "matrix(" + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P) B *= K, r = c = Math.cos(B), s = f = Math.sin(B), P && (B -= P * K, r = Math.cos(B), s = Math.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b))), d = -s, g = r;else {
        if (!(D || C || 1 !== G || M || L)) return void (A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));c = g = 1, d = f = 0;
      }k = 1, e = h = i = j = l = m = 0, o = M ? -1 / M : 0, p = z.zOrigin, q = 1e-6, v = ",", w = "0", B = D * K, B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e = c * s, h = f * s, k = r, o *= r, c *= r, f *= r), B = C * K, B && (r = Math.cos(B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m = o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t), 1 !== G && (e *= G, h *= G, k *= G, o *= G), 1 !== F && (d *= F, g *= F, j *= F, m *= F), 1 !== E && (c *= E, f *= E, i *= E, l *= E), (p || L) && (p && (H += e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (I = w), q > J && J > -q && (J = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i), u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g), C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")", A[Ca] = u;
    };j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
      parser: function (a, b, c, d, f, h, i) {
        if (d._lastParsedTransform === i) return f;d._lastParsedTransform = i;var j,
            k = i.scale && "function" == typeof i.scale ? i.scale : 0;"function" == typeof i[c] && (j = i[c], i[c] = b), k && (i.scale = k(r, a));var l,
            m,
            n,
            o,
            p,
            s,
            t,
            u,
            v,
            w = a._gsTransform,
            x = a.style,
            y = 1e-6,
            z = Ba.length,
            A = i,
            B = {},
            C = "transformOrigin",
            D = Ra(a, e, !0, A.parseTransform),
            E = A.transform && ("function" == typeof A.transform ? A.transform(r, q) : A.transform);if (D.skewType = A.skewType || D.skewType || g.defaultSkewType, d._transform = D, E && "string" == typeof E && Ca) m = Q.style, m[Ca] = E, m.display = "block", m.position = "absolute", -1 !== E.indexOf("%") && (m.width = _(a, "width"), m.height = _(a, "height")), O.body.appendChild(Q), l = Ra(Q, null, !1), "simple" === D.skewType && (l.scaleY *= Math.cos(l.skewX * K)), D.svg && (s = D.xOrigin, t = D.yOrigin, l.x -= D.xOffset, l.y -= D.yOffset, (A.transformOrigin || A.svgOrigin) && (E = {}, La(a, ha(A.transformOrigin), E, A.svgOrigin, A.smoothOrigin, !0), s = E.xOrigin, t = E.yOrigin, l.x -= E.xOffset - D.xOffset, l.y -= E.yOffset - D.yOffset), (s || t) && (u = Qa(Q, !0), l.x -= s - (s * u[0] + t * u[2]), l.y -= t - (s * u[1] + t * u[3]))), O.body.removeChild(Q), l.perspective || (l.perspective = D.perspective), null != A.xPercent && (l.xPercent = ja(A.xPercent, D.xPercent)), null != A.yPercent && (l.yPercent = ja(A.yPercent, D.yPercent));else if ("object" == typeof A) {
          if (l = { scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX), scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY), scaleZ: ja(A.scaleZ, D.scaleZ), x: ja(A.x, D.x), y: ja(A.y, D.y), z: ja(A.z, D.z), xPercent: ja(A.xPercent, D.xPercent), yPercent: ja(A.yPercent, D.yPercent), perspective: ja(A.transformPerspective, D.perspective) }, p = A.directionalRotation, null != p) if ("object" == typeof p) for (m in p) {
            A[m] = p[m];
          } else A.rotation = p;"string" == typeof A.x && -1 !== A.x.indexOf("%") && (l.x = 0, l.xPercent = ja(A.x, D.xPercent)), "string" == typeof A.y && -1 !== A.y.indexOf("%") && (l.y = 0, l.yPercent = ja(A.y, D.yPercent)), l.rotation = ka("rotation" in A ? A.rotation : "shortRotation" in A ? A.shortRotation + "_short" : "rotationZ" in A ? A.rotationZ : D.rotation, D.rotation, "rotation", B), Fa && (l.rotationX = ka("rotationX" in A ? A.rotationX : "shortRotationX" in A ? A.shortRotationX + "_short" : D.rotationX || 0, D.rotationX, "rotationX", B), l.rotationY = ka("rotationY" in A ? A.rotationY : "shortRotationY" in A ? A.shortRotationY + "_short" : D.rotationY || 0, D.rotationY, "rotationY", B)), l.skewX = ka(A.skewX, D.skewX), l.skewY = ka(A.skewY, D.skewY);
        }for (Fa && null != A.force3D && (D.force3D = A.force3D, o = !0), n = D.force3D || D.z || D.rotationX || D.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, n || null == A.scale || (l.scaleZ = 1); --z > -1;) {
          v = Ba[z], E = l[v] - D[v], (E > y || -y > E || null != A[v] || null != M[v]) && (o = !0, f = new ta(D, v, D[v], E, f), v in B && (f.e = B[v]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
        }return E = A.transformOrigin, D.svg && (E || A.svgOrigin) && (s = D.xOffset, t = D.yOffset, La(a, ha(E), l, A.svgOrigin, A.smoothOrigin), f = ua(D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C), f = ua(D, "yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C), (s !== D.xOffset || t !== D.yOffset) && (f = ua(D, "xOffset", w ? s : D.xOffset, D.xOffset, f, C), f = ua(D, "yOffset", w ? t : D.yOffset, D.yOffset, f, C)), E = "0px 0px"), (E || Fa && n && D.zOrigin) && (Ca ? (o = !0, v = Ea, E = (E || _(a, v, e, !1, "50% 50%")) + "", f = new ta(x, v, 0, 0, f, -1, C), f.b = x[v], f.plugin = h, Fa ? (m = D.zOrigin, E = E.split(" "), D.zOrigin = (E.length > 2 && (0 === m || "0px" !== E[2]) ? parseFloat(E[2]) : m) || 0, f.xs0 = f.e = E[0] + " " + (E[1] || "50%") + " 0px", f = new ta(D, "zOrigin", 0, 0, f, -1, f.n), f.b = m, f.xs0 = f.e = D.zOrigin) : f.xs0 = f.e = E) : ha(E + "", D)), o && (d._transformType = D.svg && Aa || !n && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), k && (i.scale = k), f;
      }, prefix: !0 }), ya("boxShadow", { defaultValue: "0px 0px 0px 0px #999", prefix: !0, color: !0, multi: !0, keyword: "inset" }), ya("borderRadius", { defaultValue: "0px", parser: function (a, b, c, f, g, h) {
        b = this.format(b);var i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
            z = a.style;for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++) {
          this.p.indexOf("border") && (y[j] = Z(y[j])), m = l = _(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = aa(a, "borderLeft", o, t), w = aa(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = aa(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
        }return g;
      }, prefix: !0, formatter: qa("0px 0px 0px 0px", !1, !0) }), ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", { defaultValue: "0px", parser: function (a, b, c, d, f, g) {
        return va(a.style, c, this.format(_(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f);
      }, prefix: !0, formatter: qa("0px 0px", !1, !0) }), ya("backgroundPosition", { defaultValue: "0 0", parser: function (a, b, c, d, f, g) {
        var h,
            i,
            j,
            k,
            l,
            m,
            n = "background-position",
            o = e || $(a, null),
            q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
            r = this.format(b);if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = _(a, "backgroundImage").replace(D, ""), m && "none" !== m)) {
          for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j = 2; --j > -1;) {
            q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
          }q = h.join(" ");
        }return this.parseComplex(a.style, q, r, f, g);
      }, formatter: ha }), ya("backgroundSize", { defaultValue: "0 0", formatter: function (a) {
        return a += "", "co" === a.substr(0, 2) ? a : ha(-1 === a.indexOf(" ") ? a + " " + a : a);
      } }), ya("perspective", { defaultValue: "0px", prefix: !0 }), ya("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }), ya("transformStyle", { prefix: !0 }), ya("backfaceVisibility", { prefix: !0 }), ya("userSelect", { prefix: !0 }), ya("margin", { parser: ra("marginTop,marginRight,marginBottom,marginLeft") }), ya("padding", { parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft") }), ya("clip", { defaultValue: "rect(0px,0px,0px,0px)", parser: function (a, b, c, d, f, g) {
        var h, i, j;return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(_(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g);
      } }), ya("textShadow", { defaultValue: "0px 0px 0px #999", color: !0, multi: !0 }), ya("autoRound,strictUnits", { parser: function (a, b, c, d, e) {
        return e;
      } }), ya("border", { defaultValue: "0px solid #000", parser: function (a, b, c, d, f, g) {
        var h = _(a, "borderTopWidth", e, !1, "0px"),
            i = this.format(b).split(" "),
            j = i[0].replace(w, "");return "px" !== j && (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + _(a, "borderTopStyle", e, !1, "solid") + " " + _(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g);
      }, color: !0, formatter: function (a) {
        var b = a.split(" ");return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0];
      } }), ya("borderWidth", { parser: ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth") }), ya("float,cssFloat,styleFloat", { parser: function (a, b, c, d, e, f) {
        var g = a.style,
            h = "cssFloat" in g ? "cssFloat" : "styleFloat";return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
      } });var Ua = function (a) {
      var b,
          c = this.t,
          d = c.filter || _(this.data, "filter") || "",
          e = this.s + this.c * a | 0;100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !_(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e));
    };ya("opacity,alpha,autoAlpha", { defaultValue: "1", parser: function (a, b, c, d, f, g) {
        var h = parseFloat(_(a, "opacity", e, !1, "1")),
            i = a.style,
            j = "autoAlpha" === c;return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === _(a, "visibility", e) && 0 !== b && (h = 0), U ? f = new ta(i, "opacity", h, b - h, f) : (f = new ta(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ua), j && (f = new ta(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f;
      } });var Va = function (a, b) {
      b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b));
    },
        Wa = function (a) {
      if (this.t._gsClassPT = this, 1 === a || 0 === a) {
        this.t.setAttribute("class", 0 === a ? this.b : this.e);for (var b = this.data, c = this.t.style; b;) {
          b.v ? c[b.p] = b.v : Va(c, b.p), b = b._next;
        }1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null);
      } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e);
    };ya("className", { parser: function (a, b, d, f, g, h, i) {
        var j,
            k,
            l,
            m,
            n,
            o = a.getAttribute("class") || "",
            p = a.style.cssText;if (g = f._classNamePT = new ta(a, d, 0, 0, g, 2), g.setRatio = Wa, g.pr = -11, c = !0, g.b = o, k = ca(a, e), l = a._gsClassPT) {
          for (m = {}, n = l.data; n;) {
            m[n.p] = 1, n = n._next;
          }l.setRatio(1);
        }return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = da(a, k, ca(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h);
      } });var Xa = function (a) {
      if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
        var b,
            c,
            d,
            e,
            f,
            g = this.t.style,
            h = i.transform.parse;if ("all" === this.e) g.cssText = "", e = !0;else for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) {
          c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ea : i[c].p), Va(g, c);
        }e && (Va(g, Ca), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform));
      }
    };for (ya("clearProps", { parser: function (a, b, d, e, f) {
        return f = new ta(a, d, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f;
      } }), j = "bezier,throwProps,physicsProps,physics2D".split(","), wa = j.length; wa--;) {
      za(j[wa]);
    }j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h, j) {
      if (!a.nodeType) return !1;this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = $(a, ""), f = this._overwriteProps;var n,
          p,
          s,
          t,
          u,
          v,
          w,
          x,
          z,
          A = a.style;if (l && "" === A.zIndex && (n = _(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ca(a, e), A.cssText = t + ";" + b, n = da(a, n, ca(a)).difs, !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) {
        for (z = 3 === this._transformType, Ca ? m && (l = !0, "" === A.zIndex && (w = _(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;) {
          s = s._next;
        }x = new ta(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio = Ca ? Ta : Sa, x.data = this._transform || Ra(a, e, !0), x.tween = h, x.pr = -1, f.pop();
      }if (c) {
        for (; p;) {
          for (v = p._next, s = t; s && s.pr > p.pr;) {
            s = s._next;
          }(p._prev = s ? s._prev : u) ? p._prev._next = p : t = p, (p._next = s) ? s._prev = p : u = p, p = v;
        }this._firstPT = t;
      }return !0;
    }, j.parse = function (a, b, c, f) {
      var g,
          h,
          j,
          l,
          m,
          n,
          o,
          p,
          s,
          t,
          u = a.style;for (g in b) {
        if (n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g]) c = h.parse(a, n, g, this, c, f, b);else {
          if ("--" === g.substr(0, 2)) {
            this._tween._propLookup[g] = this._addTween.call(this._tween, a.style, "setProperty", $(a).getPropertyValue(g) + "", n + "", g, !1, g);continue;
          }m = _(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = na(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = va(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = va(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ga(a, g, e), o = "px") : "left" === g || "top" === g ? (j = ba(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && ("" !== p || "lineHeight" === g) && (l || 0 === l) && j && (j = aa(a, g, j, o), "%" === p ? (j /= aa(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= aa(a, g, 1, p) : "px" !== p && (l = aa(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ta(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ta(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p));
        }f && c && !c.plugin && (c.plugin = f);
      }return c;
    }, j.setRatio = function (a) {
      var b,
          c,
          d,
          e = this._firstPT,
          f = 1e-6;if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time) {
        if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; e;) {
          if (b = e.c * a + e.s, e.r ? b = e.r(b) : f > b && b > -f && (b = 0), e.type) {
            if (1 === e.type) {
              if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;else {
                for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) {
                  c += e["xn" + d] + e["xs" + (d + 1)];
                }e.t[e.p] = c;
              }
            } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
          } else e.t[e.p] = b + e.xs0;e = e._next;
        } else for (; e;) {
          2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
        }
      } else for (; e;) {
        if (2 !== e.type) {
          if (e.r && -1 !== e.type) {
            if (b = e.r(e.s + e.c), e.type) {
              if (1 === e.type) {
                for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) {
                  c += e["xn" + d] + e["xs" + (d + 1)];
                }e.t[e.p] = c;
              }
            } else e.t[e.p] = b + e.xs0;
          } else e.t[e.p] = e.e;
        } else e.setRatio(a);e = e._next;
      }
    }, j._enableTransforms = function (a) {
      this._transform = this._transform || Ra(this._target, e, !0), this._transformType = this._transform.svg && Aa || !a && 3 !== this._transformType ? 2 : 3;
    };var Ya = function (a) {
      this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0);
    };j._addLazySet = function (a, b, c) {
      var d = this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2);d.e = c, d.setRatio = Ya, d.data = this;
    }, j._linkCSSP = function (a, b, c, d) {
      return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a;
    }, j._mod = function (a) {
      for (var b = this._firstPT; b;) {
        "function" == typeof a[b.p] && (b.r = a[b.p]), b = b._next;
      }
    }, j._kill = function (b) {
      var c,
          d,
          e,
          f = b;if (b.autoAlpha || b.alpha) {
        f = {};for (d in b) {
          f[d] = b[d];
        }f.opacity = 1, f.autoAlpha && (f.visibility = 1);
      }for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;) {
        c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next;
      }return a.prototype._kill.call(this, f);
    };var Za = function (a, b, c) {
      var d, e, f, g;if (a.slice) for (e = a.length; --e > -1;) {
        Za(a[e], b, c);
      } else for (d = a.childNodes, e = d.length; --e > -1;) {
        f = d[e], g = f.type, f.style && (b.push(ca(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Za(f, b, c);
      }
    };return g.cascadeTo = function (a, c, d) {
      var e,
          f,
          g,
          h,
          i = b.to(a, c, d),
          j = [i],
          k = [],
          l = [],
          m = [],
          n = b._internals.reservedProps;for (a = i._targets || i.target, Za(a, k, m), i.render(c, !0, !0), Za(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;) {
        if (f = da(m[e], k[e], l[e]), f.firstMPT) {
          f = f.difs;for (g in d) {
            n[g] && (f[g] = d[g]);
          }h = {};for (g in f) {
            h[g] = k[e][g];
          }j.push(b.fromTo(m[e], c, h, f));
        }
      }return j;
    }, a.activate([g]), g;
  }, !0), function () {
    var a = _gsScope._gsDefine.plugin({ propName: "roundProps", version: "1.7.0", priority: -1, API: 2, init: function (a, b, c) {
        return this._tween = c, !0;
      } }),
        b = function (a) {
      var b = 1 > a ? Math.pow(10, (a + "").length - 2) : 1;return function (c) {
        return (Math.round(c / a) * a * b | 0) / b;
      };
    },
        c = function (a, b) {
      for (; a;) {
        a.f || a.blob || (a.m = b || Math.round), a = a._next;
      }
    },
        d = a.prototype;d._onInitAllProps = function () {
      var a,
          d,
          e,
          f,
          g = this._tween,
          h = g.vars.roundProps,
          i = {},
          j = g._propLookup.roundProps;if ("object" != typeof h || h.push) for ("string" == typeof h && (h = h.split(",")), e = h.length; --e > -1;) {
        i[h[e]] = Math.round;
      } else for (f in h) {
        i[f] = b(h[f]);
      }for (f in i) {
        for (a = g._firstPT; a;) {
          d = a._next, a.pg ? a.t._mod(i) : a.n === f && (2 === a.f && a.t ? c(a.t._firstPT, i[f]) : (this._add(a.t, f, a.s, a.c, i[f]), d && (d._prev = a._prev), a._prev ? a._prev._next = d : g._firstPT === a && (g._firstPT = d), a._next = a._prev = null, g._propLookup[f] = j)), a = d;
        }
      }return !1;
    }, d._add = function (a, b, c, d, e) {
      this._addTween(a, b, c, c + d, b, e || Math.round), this._overwriteProps.push(b);
    };
  }(), function () {
    _gsScope._gsDefine.plugin({ propName: "attr", API: 2, version: "0.6.1", init: function (a, b, c, d) {
        var e, f;if ("function" != typeof a.setAttribute) return !1;for (e in b) {
          f = b[e], "function" == typeof f && (f = f(d, a)), this._addTween(a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e), this._overwriteProps.push(e);
        }return !0;
      } });
  }(), _gsScope._gsDefine.plugin({ propName: "directionalRotation", version: "0.3.1", API: 2, init: function (a, b, c, d) {
      "object" != typeof b && (b = { rotation: b }), this.finals = {};var e,
          f,
          g,
          h,
          i,
          j,
          k = b.useRadians === !0 ? 2 * Math.PI : 360,
          l = 1e-6;for (e in b) {
        "useRadians" !== e && (h = b[e], "function" == typeof h && (h = h(d, a)), j = (h + "").split("_"), f = j[0], g = parseFloat("function" != typeof a[e] ? a[e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)]()), h = this.finals[e] = "string" == typeof f && "=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(2)) : Number(f) || 0, i = h - g, j.length && (f = j.join("_"), -1 !== f.indexOf("short") && (i %= k, i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)), -1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k | 0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) % k - (i / k | 0) * k)), (i > l || -l > i) && (this._addTween(a, e, g, g + i, e), this._overwriteProps.push(e)));
      }return !0;
    }, set: function (a) {
      var b;if (1 !== a) this._super.setRatio.call(this, a);else for (b = this._firstPT; b;) {
        b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next;
      }
    } })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) {
    var b,
        c,
        d,
        e,
        f = _gsScope.GreenSockGlobals || _gsScope,
        g = f.com.greensock,
        h = 2 * Math.PI,
        i = Math.PI / 2,
        j = g._class,
        k = function (b, c) {
      var d = j("easing." + b, function () {}, !0),
          e = d.prototype = new a();return e.constructor = d, e.getRatio = c, d;
    },
        l = a.register || function () {},
        m = function (a, b, c, d, e) {
      var f = j("easing." + a, { easeOut: new b(), easeIn: new c(), easeInOut: new d() }, !0);return l(f, a), f;
    },
        n = function (a, b, c) {
      this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a);
    },
        o = function (b, c) {
      var d = j("easing." + b, function (a) {
        this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1;
      }, !0),
          e = d.prototype = new a();return e.constructor = d, e.getRatio = c, e.config = function (a) {
        return new d(a);
      }, d;
    },
        p = m("Back", o("BackOut", function (a) {
      return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1;
    }), o("BackIn", function (a) {
      return a * a * ((this._p1 + 1) * a - this._p1);
    }), o("BackInOut", function (a) {
      return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2);
    })),
        q = j("easing.SlowMo", function (a, b, c) {
      b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0;
    }, !0),
        r = q.prototype = new a();return r.constructor = q, r.getRatio = function (a) {
      var b = a + (.5 - a) * this._p;return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 === a ? 0 : 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b;
    }, q.ease = new q(.7, .7), r.config = q.config = function (a, b, c) {
      return new q(a, b, c);
    }, b = j("easing.SteppedEase", function (a, b) {
      a = a || 1, this._p1 = 1 / a, this._p2 = a + (b ? 0 : 1), this._p3 = b ? 1 : 0;
    }, !0), r = b.prototype = new a(), r.constructor = b, r.getRatio = function (a) {
      return 0 > a ? a = 0 : a >= 1 && (a = .999999999), ((this._p2 * a | 0) + this._p3) * this._p1;
    }, r.config = b.config = function (a, c) {
      return new b(a, c);
    }, c = j("easing.ExpoScaleEase", function (a, b, c) {
      this._p1 = Math.log(b / a), this._p2 = b - a, this._p3 = a, this._ease = c;
    }, !0), r = c.prototype = new a(), r.constructor = c, r.getRatio = function (a) {
      return this._ease && (a = this._ease.getRatio(a)), (this._p3 * Math.exp(this._p1 * a) - this._p3) / this._p2;
    }, r.config = c.config = function (a, b, d) {
      return new c(a, b, d);
    }, d = j("easing.RoughEase", function (b) {
      b = b || {};for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), m = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --m > -1;) {
        c = o ? Math.random() : 1 / l * m, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : m % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = { x: c, y: d };
      }for (j.sort(function (a, b) {
        return a.x - b.x;
      }), h = new n(1, 1, null), m = l; --m > -1;) {
        g = j[m], h = new n(g.x, g.y, h);
      }this._prev = new n(0, 0, 0 !== h.t ? h : h.next);
    }, !0), r = d.prototype = new a(), r.constructor = d, r.getRatio = function (a) {
      var b = this._prev;if (a > b.t) {
        for (; b.next && a >= b.t;) {
          b = b.next;
        }b = b.prev;
      } else for (; b.prev && a <= b.t;) {
        b = b.prev;
      }return this._prev = b, b.v + (a - b.t) / b.gap * b.c;
    }, r.config = function (a) {
      return new d(a);
    }, d.ease = new d(), m("Bounce", k("BounceOut", function (a) {
      return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375;
    }), k("BounceIn", function (a) {
      return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375);
    }), k("BounceInOut", function (a) {
      var b = .5 > a;return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5;
    })), m("Circ", k("CircOut", function (a) {
      return Math.sqrt(1 - (a -= 1) * a);
    }), k("CircIn", function (a) {
      return -(Math.sqrt(1 - a * a) - 1);
    }), k("CircInOut", function (a) {
      return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
    })), e = function (b, c, d) {
      var e = j("easing." + b, function (a, b) {
        this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / h * (Math.asin(1 / this._p1) || 0), this._p2 = h / this._p2;
      }, !0),
          f = e.prototype = new a();return f.constructor = e, f.getRatio = c, f.config = function (a, b) {
        return new e(a, b);
      }, e;
    }, m("Elastic", e("ElasticOut", function (a) {
      return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1;
    }, .3), e("ElasticIn", function (a) {
      return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2));
    }, .3), e("ElasticInOut", function (a) {
      return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1;
    }, .45)), m("Expo", k("ExpoOut", function (a) {
      return 1 - Math.pow(2, -10 * a);
    }), k("ExpoIn", function (a) {
      return Math.pow(2, 10 * (a - 1)) - .001;
    }), k("ExpoInOut", function (a) {
      return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)));
    })), m("Sine", k("SineOut", function (a) {
      return Math.sin(a * i);
    }), k("SineIn", function (a) {
      return -Math.cos(a * i) + 1;
    }), k("SineInOut", function (a) {
      return -.5 * (Math.cos(Math.PI * a) - 1);
    })), j("easing.EaseLookup", { find: function (b) {
        return a.map[b];
      } }, !0), l(f.SlowMo, "SlowMo", "ease,"), l(d, "RoughEase", "ease,"), l(b, "SteppedEase", "ease,"), p;
  }, !0);
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a, b) {
  "use strict";
  var c = {},
      d = a.document,
      e = a.GreenSockGlobals = a.GreenSockGlobals || a;if (e.TweenLite) return e.TweenLite;var f,
      g,
      h,
      i,
      j,
      k = function (a) {
    var b,
        c = a.split("."),
        d = e;for (b = 0; b < c.length; b++) {
      d[c[b]] = d = d[c[b]] || {};
    }return d;
  },
      l = k("com.greensock"),
      m = 1e-10,
      n = function (a) {
    var b,
        c = [],
        d = a.length;for (b = 0; b !== d; c.push(a[b++])) {}return c;
  },
      o = function () {},
      p = function () {
    var a = Object.prototype.toString,
        b = a.call([]);return function (c) {
      return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b);
    };
  }(),
      q = {},
      r = function (d, f, g, h) {
    this.sc = q[d] ? q[d].sc : [], q[d] = this, this.gsClass = null, this.func = g;var i = [];this.check = function (j) {
      for (var l, m, n, o, p = f.length, s = p; --p > -1;) {
        (l = q[f[p]] || new r(f[p], [])).gsClass ? (i[p] = l.gsClass, s--) : j && l.sc.push(this);
      }if (0 === s && g) {
        if (m = ("com.greensock." + d).split("."), n = m.pop(), o = k(m.join("."))[n] = this.gsClass = g.apply(g, i), h) if (e[n] = c[n] = o, "undefined" != typeof module && module.exports) {
          if (d === b) {
            module.exports = c[b] = o;for (p in c) {
              o[p] = c[p];
            }
          } else c[b] && (c[b][n] = o);
        } else "function" == typeof define && define.amd && define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function () {
          return o;
        });for (p = 0; p < this.sc.length; p++) {
          this.sc[p].check();
        }
      }
    }, this.check(!0);
  },
      s = a._gsDefine = function (a, b, c, d) {
    return new r(a, b, c, d);
  },
      t = l._class = function (a, b, c) {
    return b = b || function () {}, s(a, [], function () {
      return b;
    }, c), b;
  };s.globals = e;var u = [0, 0, 1, 1],
      v = t("easing.Ease", function (a, b, c, d) {
    this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? u.concat(b) : u;
  }, !0),
      w = v.map = {},
      x = v.register = function (a, b, c, d) {
    for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;) {
      for (f = i[j], e = d ? t("easing." + f, null, !0) : l.easing[f] || {}, g = k.length; --g > -1;) {
        h = k[g], w[f + "." + h] = w[h + f] = e[h] = a.getRatio ? a : a[h] || new a();
      }
    }
  };for (h = v.prototype, h._calcEnd = !1, h.getRatio = function (a) {
    if (this._func) return this._params[0] = a, this._func.apply(null, this._params);var b = this._type,
        c = this._power,
        d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2;
  }, f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], g = f.length; --g > -1;) {
    h = f[g] + ",Power" + g, x(new v(null, null, 1, g), h, "easeOut", !0), x(new v(null, null, 2, g), h, "easeIn" + (0 === g ? ",easeNone" : "")), x(new v(null, null, 3, g), h, "easeInOut");
  }w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut;var y = t("events.EventDispatcher", function (a) {
    this._listeners = {}, this._eventTarget = a || this;
  });h = y.prototype, h.addEventListener = function (a, b, c, d, e) {
    e = e || 0;var f,
        g,
        h = this._listeners[a],
        k = 0;for (this !== i || j || i.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -1;) {
      f = h[g], f.c === b && f.s === c ? h.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1);
    }h.splice(k, 0, { c: b, s: c, up: d, pr: e });
  }, h.removeEventListener = function (a, b) {
    var c,
        d = this._listeners[a];if (d) for (c = d.length; --c > -1;) {
      if (d[c].c === b) return void d.splice(c, 1);
    }
  }, h.dispatchEvent = function (a) {
    var b,
        c,
        d,
        e = this._listeners[a];if (e) for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;) {
      d = e[b], d && (d.up ? d.c.call(d.s || c, { type: a, target: c }) : d.c.call(d.s || c));
    }
  };var z = a.requestAnimationFrame,
      A = a.cancelAnimationFrame,
      B = Date.now || function () {
    return new Date().getTime();
  },
      C = B();for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !z;) {
    z = a[f[g] + "RequestAnimationFrame"], A = a[f[g] + "CancelAnimationFrame"] || a[f[g] + "CancelRequestAnimationFrame"];
  }t("Ticker", function (a, b) {
    var c,
        e,
        f,
        g,
        h,
        k = this,
        l = B(),
        n = b !== !1 && z ? "auto" : !1,
        p = 500,
        q = 33,
        r = "tick",
        s = function (a) {
      var b,
          d,
          i = B() - C;i > p && (l += i - q), C += i, k.time = (C - l) / 1e3, b = k.time - h, (!c || b > 0 || a === !0) && (k.frame++, h += b + (b >= g ? .004 : g - b), d = !0), a !== !0 && (f = e(s)), d && k.dispatchEvent(r);
    };y.call(k), k.time = k.frame = 0, k.tick = function () {
      s(!0);
    }, k.lagSmoothing = function (a, b) {
      return arguments.length ? (p = a || 1 / m, void (q = Math.min(b, p, 0))) : 1 / m > p;
    }, k.sleep = function () {
      null != f && (n && A ? A(f) : clearTimeout(f), e = o, f = null, k === i && (j = !1));
    }, k.wake = function (a) {
      null !== f ? k.sleep() : a ? l += -C + (C = B()) : k.frame > 10 && (C = B() - p + 5), e = 0 === c ? o : n && z ? z : function (a) {
        return setTimeout(a, 1e3 * (h - k.time) + 1 | 0);
      }, k === i && (j = !0), s(2);
    }, k.fps = function (a) {
      return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void k.wake()) : c;
    }, k.useRAF = function (a) {
      return arguments.length ? (k.sleep(), n = a, void k.fps(c)) : n;
    }, k.fps(a), setTimeout(function () {
      "auto" === n && k.frame < 5 && "hidden" !== (d || {}).visibilityState && k.useRAF(!1);
    }, 1500);
  }), h = l.Ticker.prototype = new l.events.EventDispatcher(), h.constructor = l.Ticker;var D = t("core.Animation", function (a, b) {
    if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, X) {
      j || i.wake();var c = this.vars.useFrames ? W : X;c.add(this, c._time), this.vars.paused && this.paused(!0);
    }
  });i = D.ticker = new l.Ticker(), h = D.prototype, h._dirty = h._gc = h._initted = h._paused = !1, h._totalTime = h._time = 0, h._rawPrevTime = -1, h._next = h._last = h._onUpdate = h._timeline = h.timeline = null, h._paused = !1;var E = function () {
    j && B() - C > 2e3 && ("hidden" !== (d || {}).visibilityState || !i.lagSmoothing()) && i.wake();var a = setTimeout(E, 2e3);a.unref && a.unref();
  };E(), h.play = function (a, b) {
    return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
  }, h.pause = function (a, b) {
    return null != a && this.seek(a, b), this.paused(!0);
  }, h.resume = function (a, b) {
    return null != a && this.seek(a, b), this.paused(!1);
  }, h.seek = function (a, b) {
    return this.totalTime(Number(a), b !== !1);
  }, h.restart = function (a, b) {
    return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0);
  }, h.reverse = function (a, b) {
    return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1);
  }, h.render = function (a, b, c) {}, h.invalidate = function () {
    return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this;
  }, h.isActive = function () {
    var a,
        b = this._timeline,
        c = this._startTime;return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale - 1e-7;
  }, h._enabled = function (a, b) {
    return j || i.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1;
  }, h._kill = function (a, b) {
    return this._enabled(!1, !1);
  }, h.kill = function (a, b) {
    return this._kill(a, b), this;
  }, h._uncache = function (a) {
    for (var b = a ? this : this.timeline; b;) {
      b._dirty = !0, b = b.timeline;
    }return this;
  }, h._swapSelfInParams = function (a) {
    for (var b = a.length, c = a.concat(); --b > -1;) {
      "{self}" === a[b] && (c[b] = this);
    }return c;
  }, h._callback = function (a) {
    var b = this.vars,
        c = b[a],
        d = b[a + "Params"],
        e = b[a + "Scope"] || b.callbackScope || this,
        f = d ? d.length : 0;switch (f) {case 0:
        c.call(e);break;case 1:
        c.call(e, d[0]);break;case 2:
        c.call(e, d[0], d[1]);break;default:
        c.apply(e, d);}
  }, h.eventCallback = function (a, b, c, d) {
    if ("on" === (a || "").substr(0, 2)) {
      var e = this.vars;if (1 === arguments.length) return e[a];null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = p(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b);
    }return this;
  }, h.delay = function (a) {
    return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay;
  }, h.duration = function (a) {
    return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration);
  }, h.totalDuration = function (a) {
    return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration;
  }, h.time = function (a, b) {
    return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time;
  }, h.totalTime = function (a, b, c) {
    if (j || i.wake(), !arguments.length) return this._totalTime;if (this._timeline) {
      if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
        this._dirty && this.totalDuration();var d = this._totalDuration,
            e = this._timeline;if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline) for (; e._timeline;) {
          e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline;
        }
      }this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (J.length && Z(), this.render(a, b, !1), J.length && Z());
    }return this;
  }, h.progress = h.totalProgress = function (a, b) {
    var c = this.duration();return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio;
  }, h.startTime = function (a) {
    return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime;
  }, h.endTime = function (a) {
    return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale;
  }, h.timeScale = function (a) {
    if (!arguments.length) return this._timeScale;var b, c;for (a = a || m, this._timeline && this._timeline.smoothChildTiming && (b = this._pauseTime, c = b || 0 === b ? b : this._timeline.totalTime(), this._startTime = c - (c - this._startTime) * this._timeScale / a), this._timeScale = a, c = this.timeline; c && c.timeline;) {
      c._dirty = !0, c.totalDuration(), c = c.timeline;
    }return this;
  }, h.reversed = function (a) {
    return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed;
  }, h.paused = function (a) {
    if (!arguments.length) return this._paused;var b,
        c,
        d = this._timeline;return a != this._paused && d && (j || a || i.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this;
  };var F = t("core.SimpleTimeline", function (a) {
    D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0;
  });h = F.prototype = new D(), h.constructor = F, h.kill()._gc = !1, h._first = h._last = h._recent = null, h._sortChildren = !1, h.add = h.insert = function (a, b, c, d) {
    var e, f;if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = this.rawTime() - (a._timeline.rawTime() - a._pauseTime)), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren) for (f = a._startTime; e && e._startTime > f;) {
      e = e._prev;
    }return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this;
  }, h._remove = function (a, b) {
    return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this;
  }, h.render = function (a, b, c) {
    var d,
        e = this._first;for (this._totalTime = this._time = this._rawPrevTime = a; e;) {
      d = e._next, (e._active || a >= e._startTime && !e._paused && !e._gc) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d;
    }
  }, h.rawTime = function () {
    return j || i.wake(), this._totalTime;
  };var G = t("TweenLite", function (b, c, d) {
    if (D.call(this, c, d), this.render = G.prototype.render, null == b) throw "Cannot tween a null target.";this.target = b = "string" != typeof b ? b : G.selector(b) || b;var e,
        f,
        g,
        h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
        i = this.vars.overwrite;if (this._overwrite = i = null == i ? V[G.defaultOverwrite] : "number" == typeof i ? i >> 0 : V[i], (h || b instanceof Array || b.push && p(b)) && "number" != typeof b[0]) for (this._targets = g = n(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) {
      f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(n(f))) : (this._siblings[e] = $(f, this, !1), 1 === i && this._siblings[e].length > 1 && aa(f, this, null, 1, this._siblings[e])) : (f = g[e--] = G.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
    } else this._propLookup = {}, this._siblings = $(b, this, !1), 1 === i && this._siblings.length > 1 && aa(b, this, null, 1, this._siblings);(this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -m, this.render(Math.min(0, -this._delay)));
  }, !0),
      H = function (b) {
    return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType);
  },
      I = function (a, b) {
    var c,
        d = {};for (c in a) {
      U[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!R[c] || R[c] && R[c]._autoCSS) || (d[c] = a[c], delete a[c]);
    }a.css = d;
  };h = G.prototype = new D(), h.constructor = G, h.kill()._gc = !1, h.ratio = 0, h._firstPT = h._targets = h._overwrittenProps = h._startAt = null, h._notifyPluginsOfEnabled = h._lazy = !1, G.version = "1.20.5", G.defaultEase = h._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = i, G.autoSleep = 120, G.lagSmoothing = function (a, b) {
    i.lagSmoothing(a, b);
  }, G.selector = a.$ || a.jQuery || function (b) {
    var c = a.$ || a.jQuery;return c ? (G.selector = c, c(b)) : (d || (d = a.document), d ? d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b) : b);
  };var J = [],
      K = {},
      L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      M = /[\+-]=-?[\.\d]/,
      N = function (a) {
    for (var b, c = this._firstPT, d = 1e-6; c;) {
      b = c.blob ? 1 === a && null != this.end ? this.end : a ? this.join("") : this.start : c.c * a + c.s, c.m ? b = c.m.call(this._tween, b, this._target || c.t, this._tween) : d > b && b > -d && !c.blob && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next;
    }
  },
      O = function (a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = [],
        m = 0,
        n = "",
        o = 0;for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(L) || [], f = b.match(L) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++) {
      k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = { _next: l._firstPT, t: l, p: l.length - 1, s: g, c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0, f: 0, m: o && 4 > o ? Math.round : 0 }), m += k.length;
    }return n += b.substr(m), n && l.push(n), l.setRatio = N, M.test(b) && (l.end = null), l;
  },
      P = function (a, b, c, d, e, f, g, h, i) {
    "function" == typeof d && (d = d(i || 0, a));var j,
        k = typeof a[b],
        l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3),
        m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b],
        n = "string" == typeof d && "=" === d.charAt(1),
        o = { t: a, p: b, s: m, f: "function" === k, pg: 0, n: e || b, m: f ? "function" == typeof f ? f : Math.round : 0, pr: 0, c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0 };return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = O(m, n ? parseFloat(o.s) + o.c + (o.s + "").replace(/[0-9\-\.]/g, "") : d, h || G.defaultStringFilter, o), o = { t: j, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: e || b, pr: 0, m: 0 }) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0;
  },
      Q = G._internals = { isArray: p, isSelector: H, lazyTweens: J, blobDif: O },
      R = G._plugins = {},
      S = Q.tweenLookup = {},
      T = 0,
      U = Q.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1, onOverwrite: 1, callbackScope: 1, stringFilter: 1, id: 1, yoyoEase: 1 },
      V = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 },
      W = D._rootFramesTimeline = new F(),
      X = D._rootTimeline = new F(),
      Y = 30,
      Z = Q.lazyRender = function () {
    var a,
        b = J.length;for (K = {}; --b > -1;) {
      a = J[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
    }J.length = 0;
  };X._startTime = i.time, W._startTime = i.frame, X._active = W._active = !0, setTimeout(Z, 1), D._updateRoot = G.render = function () {
    var a, b, c;if (J.length && Z(), X.render((i.time - X._startTime) * X._timeScale, !1, !1), W.render((i.frame - W._startTime) * W._timeScale, !1, !1), J.length && Z(), i.frame >= Y) {
      Y = i.frame + (parseInt(G.autoSleep, 10) || 120);for (c in S) {
        for (b = S[c].tweens, a = b.length; --a > -1;) {
          b[a]._gc && b.splice(a, 1);
        }0 === b.length && delete S[c];
      }if (c = X._first, (!c || c._paused) && G.autoSleep && !W._first && 1 === i._listeners.tick.length) {
        for (; c && c._paused;) {
          c = c._next;
        }c || i.sleep();
      }
    }
  }, i.addEventListener("tick", D._updateRoot);var $ = function (a, b, c) {
    var d,
        e,
        f = a._gsTweenID;if (S[f || (a._gsTweenID = f = "t" + T++)] || (S[f] = { target: a, tweens: [] }), b && (d = S[f].tweens, d[e = d.length] = b, c)) for (; --e > -1;) {
      d[e] === b && d.splice(e, 1);
    }return S[f].tweens;
  },
      _ = function (a, b, c, d) {
    var e,
        f,
        g = a.vars.onOverwrite;return g && (e = g(a, b, c, d)), g = G.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1;
  },
      aa = function (a, b, c, d, e) {
    var f, g, h, i;if (1 === d || d >= 4) {
      for (i = e.length, f = 0; i > f; f++) {
        if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);else if (5 === d) break;
      }return g;
    }var j,
        k = b._startTime + m,
        l = [],
        n = 0,
        o = 0 === b._duration;for (f = e.length; --f > -1;) {
      (h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || ba(b, 0, o), 0 === ba(h, j, o) && (l[n++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (l[n++] = h)));
    }for (f = n; --f > -1;) {
      if (h = l[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
        if (2 !== d && !_(h, b)) continue;h._enabled(!1, !1) && (g = !0);
      }
    }return g;
  },
      ba = function (a, b, c) {
    for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
      if (f += d._startTime, e *= d._timeScale, d._paused) return -100;d = d._timeline;
    }return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * m > f - b ? m : (f += a.totalDuration() / a._timeScale / e) > b + m ? 0 : f - b - m;
  };h._init = function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = this.vars,
        h = this._overwrittenProps,
        i = this._duration,
        j = !!g.immediateRender,
        k = g.ease;if (g.startAt) {
      this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};for (d in g.startAt) {
        e[d] = g.startAt[d];
      }if (e.data = "isStart", e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, e.onUpdate = g.onUpdate, e.onUpdateParams = g.onUpdateParams, e.onUpdateScope = g.onUpdateScope || g.callbackScope || this, this._startAt = G.to(this.target || {}, 0, e), j) if (this._time > 0) this._startAt = null;else if (0 !== i) return;
    } else if (g.runBackwards && 0 !== i) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;else {
      0 !== this._time && (j = !1), c = {};for (d in g) {
        U[d] && "autoCSS" !== d || (c[d] = g[d]);
      }if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = G.to(this.target, 0, c), j) {
        if (0 === this._time) return;
      } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null);
    }if (this._ease = k = k ? k instanceof v ? k : "function" == typeof k ? new v(k, g.easeParams) : w[k] || G.defaultEase : G.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (f = this._targets.length, a = 0; f > a; a++) {
      this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0);
    } else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);if (b && G._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards) for (c = this._firstPT; c;) {
      c.s += c.c, c.c = -c.c, c = c._next;
    }this._onUpdate = g.onUpdate, this._initted = !0;
  }, h._initProps = function (b, c, d, e, f) {
    var g, h, i, j, k, l;if (null == b) return !1;K[b._gsTweenID] && Z(), this.vars.css || b.style && b !== a && b.nodeType && R.css && this.vars.autoCSS !== !1 && I(this.vars, b);for (g in this.vars) {
      if (l = this.vars[g], U[g]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this));else if (R[g] && (j = new R[g]())._onInitTween(b, this.vars[g], this, f)) {
        for (this._firstPT = k = { _next: this._firstPT, t: j, p: "setRatio", s: 0, c: 1, f: 1, n: g, pg: 1, pr: j._priority, m: 0 }, h = j._overwriteProps.length; --h > -1;) {
          c[j._overwriteProps[h]] = this._firstPT;
        }(j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k);
      } else c[g] = P.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
    }return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && aa(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), i);
  }, h.render = function (a, b, c) {
    var d,
        e,
        f,
        g,
        h = this._time,
        i = this._duration,
        j = this._rawPrevTime;if (a >= i - 1e-7 && a >= 0) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === m && "isPause" !== this.data) && j !== a && (c = !0, j > m && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : m);else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== m || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : m)), (!this._initted || this._startAt && this._startAt.progress()) && (c = !0);else if (this._totalTime = this._time = a, this._easeType) {
      var k = a / i,
          l = this._easeType,
          n = this._easePower;(1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === n ? k *= k : 2 === n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2;
    } else this.ratio = this._ease.getRatio(a / i);if (this._time !== h || c) {
      if (!this._initted) {
        if (this._init(), !this._initted || this._gc) return;if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, J.push(this), void (this._lazy = [a, b]);this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
      }for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, !0, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) {
        f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
      }this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, !0, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, !0, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === m && g !== m && (this._rawPrevTime = 0));
    }
  }, h._kill = function (a, b, c) {
    if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b;var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;if ((p(b) || H(b)) && "number" != typeof b[0]) for (d = b.length; --d > -1;) {
      this._kill(a, b[d], c) && (i = !0);
    } else {
      if (this._targets) {
        for (d = this._targets.length; --d > -1;) {
          if (b === this._targets[d]) {
            h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";break;
          }
        }
      } else {
        if (b !== this.target) return !1;h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all";
      }if (h) {
        if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) {
          for (f in j) {
            h[f] && (l || (l = []), l.push(f));
          }if ((l || !a) && !_(this, c, b, l)) return !1;
        }for (f in j) {
          (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
        }!this._firstPT && this._initted && this._enabled(!1, !1);
      }
    }return i;
  }, h.invalidate = function () {
    return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -m, this.render(Math.min(0, -this._delay))), this;
  }, h._enabled = function (a, b) {
    if (j || i.wake(), a && this._gc) {
      var c,
          d = this._targets;if (d) for (c = d.length; --c > -1;) {
        this._siblings[c] = $(d[c], this, !0);
      } else this._siblings = $(this.target, this, !0);
    }return D.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? G._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1;
  }, G.to = function (a, b, c) {
    return new G(a, b, c);
  }, G.from = function (a, b, c) {
    return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c);
  }, G.fromTo = function (a, b, c, d) {
    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a, b, d);
  }, G.delayedCall = function (a, b, c, d, e) {
    return new G(b, 0, { delay: a, onComplete: b, onCompleteParams: c, callbackScope: d, onReverseComplete: b, onReverseCompleteParams: c, immediateRender: !1, lazy: !1, useFrames: e, overwrite: 0 });
  }, G.set = function (a, b) {
    return new G(a, 0, b);
  }, G.getTweensOf = function (a, b) {
    if (null == a) return [];a = "string" != typeof a ? a : G.selector(a) || a;var c, d, e, f;if ((p(a) || H(a)) && "number" != typeof a[0]) {
      for (c = a.length, d = []; --c > -1;) {
        d = d.concat(G.getTweensOf(a[c], b));
      }for (c = d.length; --c > -1;) {
        for (f = d[c], e = c; --e > -1;) {
          f === d[e] && d.splice(c, 1);
        }
      }
    } else if (a._gsTweenID) for (d = $(a).concat(), c = d.length; --c > -1;) {
      (d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
    }return d || [];
  }, G.killTweensOf = G.killDelayedCallsTo = function (a, b, c) {
    "object" == typeof b && (c = b, b = !1);for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;) {
      d[e]._kill(c, a);
    }
  };var ca = t("plugins.TweenPlugin", function (a, b) {
    this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = ca.prototype;
  }, !0);if (h = ca.prototype, ca.version = "1.19.0", ca.API = 2, h._firstPT = null, h._addTween = P, h.setRatio = N, h._kill = function (a) {
    var b,
        c = this._overwriteProps,
        d = this._firstPT;if (null != a[this._propName]) this._overwriteProps = [];else for (b = c.length; --b > -1;) {
      null != a[c[b]] && c.splice(b, 1);
    }for (; d;) {
      null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
    }return !1;
  }, h._mod = h._roundProps = function (a) {
    for (var b, c = this._firstPT; c;) {
      b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b), c = c._next;
    }
  }, G._onPluginEvent = function (a, b) {
    var c,
        d,
        e,
        f,
        g,
        h = b._firstPT;if ("_onInitAllProps" === a) {
      for (; h;) {
        for (g = h._next, d = e; d && d.pr > h.pr;) {
          d = d._next;
        }(h._prev = d ? d._prev : f) ? h._prev._next = h : e = h, (h._next = d) ? d._prev = h : f = h, h = g;
      }h = b._firstPT = e;
    }for (; h;) {
      h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
    }return c;
  }, ca.activate = function (a) {
    for (var b = a.length; --b > -1;) {
      a[b].API === ca.API && (R[new a[b]()._propName] = a[b]);
    }return !0;
  }, s.plugin = function (a) {
    if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";var b,
        c = a.propName,
        d = a.priority || 0,
        e = a.overwriteProps,
        f = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_mod", mod: "_mod", initAll: "_onInitAllProps" },
        g = t("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () {
      ca.call(this, c, d), this._overwriteProps = e || [];
    }, a.global === !0),
        h = g.prototype = new ca(c);h.constructor = g, g.API = a.API;for (b in f) {
      "function" == typeof a[b] && (h[f[b]] = a[b]);
    }return g.version = a.version, ca.activate([g]), g;
  }, f = a._gsQueue) {
    for (g = 0; g < f.length; g++) {
      f[g]();
    }for (h in q) {
      q[h].func || a.console.log("GSAP encountered missing dependency: " + h);
    }
  }j = !1;
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
"use strict";

/*! ScrollMagic v2.0.6 | (c) 2018 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!function (e, t) {
  "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t();
}(this, function () {
  "use strict";
  var e = function () {};e.version = "2.0.6", window.addEventListener("mousewheel", function () {});var t = "data-scrollmagic-pin-spacer";e.Controller = function (r) {
    var o,
        s,
        a = "ScrollMagic.Controller",
        l = "FORWARD",
        c = "REVERSE",
        f = "PAUSED",
        u = n.defaults,
        d = this,
        h = i.extend({}, u, r),
        g = [],
        p = !1,
        v = 0,
        m = f,
        w = !0,
        y = 0,
        S = !0,
        b = function () {
      for (var e in h) {
        u.hasOwnProperty(e) || delete h[e];
      }if (h.container = i.get.elements(h.container)[0], !h.container) throw a + " init failed.";w = h.container === window || h.container === document.body || !document.body.contains(h.container), w && (h.container = window), y = z(), h.container.addEventListener("resize", T), h.container.addEventListener("scroll", T);var t = parseInt(h.refreshInterval, 10);h.refreshInterval = i.type.Number(t) ? t : u.refreshInterval, E();
    },
        E = function () {
      h.refreshInterval > 0 && (s = window.setTimeout(A, h.refreshInterval));
    },
        x = function () {
      return h.vertical ? i.get.scrollTop(h.container) : i.get.scrollLeft(h.container);
    },
        z = function () {
      return h.vertical ? i.get.height(h.container) : i.get.width(h.container);
    },
        C = this._setScrollPos = function (e) {
      h.vertical ? w ? window.scrollTo(i.get.scrollLeft(), e) : h.container.scrollTop = e : w ? window.scrollTo(e, i.get.scrollTop()) : h.container.scrollLeft = e;
    },
        F = function () {
      if (S && p) {
        var e = i.type.Array(p) ? p : g.slice(0);p = !1;var t = v;v = d.scrollPos();var n = v - t;0 !== n && (m = n > 0 ? l : c), m === c && e.reverse(), e.forEach(function (e) {
          e.update(!0);
        });
      }
    },
        L = function () {
      o = i.rAF(F);
    },
        T = function (e) {
      "resize" == e.type && (y = z(), m = f), p !== !0 && (p = !0, L());
    },
        A = function () {
      if (!w && y != z()) {
        var e;try {
          e = new Event("resize", { bubbles: !1, cancelable: !1 });
        } catch (t) {
          e = document.createEvent("Event"), e.initEvent("resize", !1, !1);
        }h.container.dispatchEvent(e);
      }g.forEach(function (e) {
        e.refresh();
      }), E();
    };this._options = h;var N = function (e) {
      if (e.length <= 1) return e;var t = e.slice(0);return t.sort(function (e, t) {
        return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
      }), t;
    };return this.addScene = function (t) {
      if (i.type.Array(t)) t.forEach(function (e) {
        d.addScene(e);
      });else if (t instanceof e.Scene) if (t.controller() !== d) t.addTo(d);else if (g.indexOf(t) < 0) {
        g.push(t), g = N(g), t.on("shift.controller_sort", function () {
          g = N(g);
        });for (var n in h.globalSceneOptions) {
          t[n] && t[n].call(t, h.globalSceneOptions[n]);
        }
      }return d;
    }, this.removeScene = function (e) {
      if (i.type.Array(e)) e.forEach(function (e) {
        d.removeScene(e);
      });else {
        var t = g.indexOf(e);t > -1 && (e.off("shift.controller_sort"), g.splice(t, 1), e.remove());
      }return d;
    }, this.updateScene = function (t, n) {
      return i.type.Array(t) ? t.forEach(function (e) {
        d.updateScene(e, n);
      }) : n ? t.update(!0) : p !== !0 && t instanceof e.Scene && (p = p || [], -1 == p.indexOf(t) && p.push(t), p = N(p), L()), d;
    }, this.update = function (e) {
      return T({ type: "resize" }), e && F(), d;
    }, this.scrollTo = function (n, r) {
      if (i.type.Number(n)) C.call(h.container, n, r);else if (n instanceof e.Scene) n.controller() === d && d.scrollTo(n.scrollOffset(), r);else if (i.type.Function(n)) C = n;else {
        var o = i.get.elements(n)[0];if (o) {
          for (; o.parentNode.hasAttribute(t);) {
            o = o.parentNode;
          }var s = h.vertical ? "top" : "left",
              a = i.get.offset(h.container),
              l = i.get.offset(o);w || (a[s] -= d.scrollPos()), d.scrollTo(l[s] - a[s], r);
        }
      }return d;
    }, this.scrollPos = function (e) {
      return arguments.length ? (i.type.Function(e) && (x = e), d) : x.call(d);
    }, this.info = function (e) {
      var t = { size: y, vertical: h.vertical, scrollPos: v, scrollDirection: m, container: h.container, isDocument: w };return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t;
    }, this.loglevel = function () {
      return d;
    }, this.enabled = function (e) {
      return arguments.length ? (S != e && (S = !!e, d.updateScene(g, !0)), d) : S;
    }, this.destroy = function (e) {
      window.clearTimeout(s);for (var t = g.length; t--;) {
        g[t].destroy(e);
      }return h.container.removeEventListener("resize", T), h.container.removeEventListener("scroll", T), i.cAF(o), null;
    }, b(), d;
  };var n = { defaults: { container: window, vertical: !0, globalSceneOptions: {}, loglevel: 2, refreshInterval: 100 } };e.Controller.addOption = function (e, t) {
    n.defaults[e] = t;
  }, e.Controller.extend = function (t) {
    var n = this;e.Controller = function () {
      return n.apply(this, arguments), this.$super = i.extend({}, this), t.apply(this, arguments) || this;
    }, i.extend(e.Controller, n), e.Controller.prototype = n.prototype, e.Controller.prototype.constructor = e.Controller;
  }, e.Scene = function (n) {
    var o,
        s,
        a = "BEFORE",
        l = "DURING",
        c = "AFTER",
        f = r.defaults,
        u = this,
        d = i.extend({}, f, n),
        h = a,
        g = 0,
        p = { start: 0, end: 0 },
        v = 0,
        m = !0,
        w = function () {
      for (var e in d) {
        f.hasOwnProperty(e) || delete d[e];
      }for (var t in f) {
        L(t);
      }C();
    },
        y = {};this.on = function (e, t) {
      return i.type.Function(t) && (e = e.trim().split(" "), e.forEach(function (e) {
        var n = e.split("."),
            r = n[0],
            i = n[1];"*" != r && (y[r] || (y[r] = []), y[r].push({ namespace: i || "", callback: t }));
      })), u;
    }, this.off = function (e, t) {
      return e ? (e = e.trim().split(" "), e.forEach(function (e) {
        var n = e.split("."),
            r = n[0],
            i = n[1] || "",
            o = "*" === r ? Object.keys(y) : [r];o.forEach(function (e) {
          for (var n = y[e] || [], r = n.length; r--;) {
            var o = n[r];!o || i !== o.namespace && "*" !== i || t && t != o.callback || n.splice(r, 1);
          }n.length || delete y[e];
        });
      }), u) : u;
    }, this.trigger = function (t, n) {
      if (t) {
        var r = t.trim().split("."),
            i = r[0],
            o = r[1],
            s = y[i];s && s.forEach(function (t) {
          o && o !== t.namespace || t.callback.call(u, new e.Event(i, t.namespace, u, n));
        });
      }return u;
    }, u.on("change.internal", function (e) {
      "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? E() : "reverse" === e.what && u.update());
    }).on("shift.internal", function () {
      S(), u.update();
    }), this.addTo = function (t) {
      return t instanceof e.Controller && s != t && (s && s.removeScene(u), s = t, C(), b(!0), E(!0), S(), s.info("container").addEventListener("resize", x), t.addScene(u), u.trigger("add", { controller: s }), u.update()), u;
    }, this.enabled = function (e) {
      return arguments.length ? (m != e && (m = !!e, u.update(!0)), u) : m;
    }, this.remove = function () {
      if (s) {
        s.info("container").removeEventListener("resize", x);var e = s;s = void 0, e.removeScene(u), u.trigger("remove");
      }return u;
    }, this.destroy = function (e) {
      return u.trigger("destroy", { reset: e }), u.remove(), u.off("*.*"), null;
    }, this.update = function (e) {
      if (s) if (e) {
        if (s.enabled() && m) {
          var t,
              n = s.info("scrollPos");t = d.duration > 0 ? (n - p.start) / (p.end - p.start) : n >= p.start ? 1 : 0, u.trigger("update", { startPos: p.start, endPos: p.end, scrollPos: n }), u.progress(t);
        } else T && h === l && N(!0);
      } else s.updateScene(u, !1);return u;
    }, this.refresh = function () {
      return b(), E(), u;
    }, this.progress = function (e) {
      if (arguments.length) {
        var t = !1,
            n = h,
            r = s ? s.info("scrollDirection") : "PAUSED",
            i = d.reverse || e >= g;if (0 === d.duration ? (t = g != e, g = 1 > e && i ? 0 : 1, h = 0 === g ? a : l) : 0 > e && h !== a && i ? (g = 0, h = a, t = !0) : e >= 0 && 1 > e && i ? (g = e, h = l, t = !0) : e >= 1 && h !== c ? (g = 1, h = c, t = !0) : h !== l || i || N(), t) {
          var o = { progress: g, state: h, scrollDirection: r },
              f = h != n,
              p = function (e) {
            u.trigger(e, o);
          };f && n !== l && (p("enter"), p(n === a ? "start" : "end")), p("progress"), f && h !== l && (p(h === a ? "start" : "end"), p("leave"));
        }return u;
      }return g;
    };var S = function () {
      p = { start: v + d.offset }, s && d.triggerElement && (p.start -= s.info("size") * d.triggerHook), p.end = p.start + d.duration;
    },
        b = function (e) {
      if (o) {
        var t = "duration";F(t, o.call(u)) && !e && (u.trigger("change", { what: t, newval: d[t] }), u.trigger("shift", { reason: t }));
      }
    },
        E = function (e) {
      var n = 0,
          r = d.triggerElement;if (s && (r || v > 0)) {
        if (r) if (r.parentNode) {
          for (var o = s.info(), a = i.get.offset(o.container), l = o.vertical ? "top" : "left"; r.parentNode.hasAttribute(t);) {
            r = r.parentNode;
          }var c = i.get.offset(r);o.isDocument || (a[l] -= s.scrollPos()), n = c[l] - a[l];
        } else u.triggerElement(void 0);var f = n != v;v = n, f && !e && u.trigger("shift", { reason: "triggerElementPosition" });
      }
    },
        x = function () {
      d.triggerHook > 0 && u.trigger("shift", { reason: "containerResize" });
    },
        z = i.extend(r.validate, { duration: function (e) {
        if (i.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
          var t = parseFloat(e) / 100;e = function () {
            return s ? s.info("size") * t : 0;
          };
        }if (i.type.Function(e)) {
          o = e;try {
            e = parseFloat(o());
          } catch (n) {
            e = -1;
          }
        }if (e = parseFloat(e), !i.type.Number(e) || 0 > e) throw o ? (o = void 0, 0) : 0;return e;
      } }),
        C = function (e) {
      e = arguments.length ? [e] : Object.keys(z), e.forEach(function (e) {
        var t;if (z[e]) try {
          t = z[e](d[e]);
        } catch (n) {
          t = f[e];
        } finally {
          d[e] = t;
        }
      });
    },
        F = function (e, t) {
      var n = !1,
          r = d[e];return d[e] != t && (d[e] = t, C(e), n = r != d[e]), n;
    },
        L = function (e) {
      u[e] || (u[e] = function (t) {
        return arguments.length ? ("duration" === e && (o = void 0), F(e, t) && (u.trigger("change", { what: e, newval: d[e] }), r.shifts.indexOf(e) > -1 && u.trigger("shift", { reason: e })), u) : d[e];
      });
    };this.controller = function () {
      return s;
    }, this.state = function () {
      return h;
    }, this.scrollOffset = function () {
      return p.start;
    }, this.triggerPosition = function () {
      var e = d.offset;return s && (e += d.triggerElement ? v : s.info("size") * u.triggerHook()), e;
    };var T, A;u.on("shift.internal", function (e) {
      var t = "duration" === e.reason;(h === c && t || h === l && 0 === d.duration) && N(), t && O();
    }).on("progress.internal", function () {
      N();
    }).on("add.internal", function () {
      O();
    }).on("destroy.internal", function (e) {
      u.removePin(e.reset);
    });var N = function (e) {
      if (T && s) {
        var t = s.info(),
            n = A.spacer.firstChild;if (e || h !== l) {
          var r = { position: A.inFlow ? "relative" : "absolute", top: 0, left: 0 },
              o = i.css(n, "position") != r.position;A.pushFollowers ? d.duration > 0 && (h === c && 0 === parseFloat(i.css(A.spacer, "padding-top")) ? o = !0 : h === a && 0 === parseFloat(i.css(A.spacer, "padding-bottom")) && (o = !0)) : r[t.vertical ? "top" : "left"] = d.duration * g, i.css(n, r), o && O();
        } else {
          "fixed" != i.css(n, "position") && (i.css(n, { position: "fixed" }), O());var f = i.get.offset(A.spacer, !0),
              u = d.reverse || 0 === d.duration ? t.scrollPos - p.start : Math.round(g * d.duration * 10) / 10;f[t.vertical ? "top" : "left"] += u, i.css(A.spacer.firstChild, { top: f.top, left: f.left });
        }
      }
    },
        O = function () {
      if (T && s && A.inFlow) {
        var e = h === l,
            t = s.info("vertical"),
            n = A.spacer.firstChild,
            r = i.isMarginCollapseType(i.css(A.spacer, "display")),
            o = {};A.relSize.width || A.relSize.autoFullWidth ? e ? i.css(T, { width: i.get.width(A.spacer) }) : i.css(T, { width: "100%" }) : (o["min-width"] = i.get.width(t ? T : n, !0, !0), o.width = e ? o["min-width"] : "auto"), A.relSize.height ? e ? i.css(T, { height: i.get.height(A.spacer) - (A.pushFollowers ? d.duration : 0) }) : i.css(T, { height: "100%" }) : (o["min-height"] = i.get.height(t ? n : T, !0, !r), o.height = e ? o["min-height"] : "auto"), A.pushFollowers && (o["padding" + (t ? "Top" : "Left")] = d.duration * g, o["padding" + (t ? "Bottom" : "Right")] = d.duration * (1 - g)), i.css(A.spacer, o);
      }
    },
        _ = function () {
      s && T && h === l && !s.info("isDocument") && N();
    },
        P = function () {
      s && T && h === l && ((A.relSize.width || A.relSize.autoFullWidth) && i.get.width(window) != i.get.width(A.spacer.parentNode) || A.relSize.height && i.get.height(window) != i.get.height(A.spacer.parentNode)) && O();
    },
        D = function (e) {
      s && T && h === l && !s.info("isDocument") && (e.preventDefault(), s._setScrollPos(s.info("scrollPos") - ((e.wheelDelta || e[s.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -e.detail)));
    };this.setPin = function (e, n) {
      var r = { pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer" };if (n = i.extend({}, r, n), e = i.get.elements(e)[0], !e) return u;if ("fixed" === i.css(e, "position")) return u;if (T) {
        if (T === e) return u;u.removePin();
      }T = e;var o = T.parentNode.style.display,
          s = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];T.parentNode.style.display = "none";var a = "absolute" != i.css(T, "position"),
          l = i.css(T, s.concat(["display"])),
          c = i.css(T, ["width", "height"]);T.parentNode.style.display = o, !a && n.pushFollowers && (n.pushFollowers = !1);var f = T.parentNode.insertBefore(document.createElement("div"), T),
          d = i.extend(l, { position: a ? "relative" : "absolute", boxSizing: "content-box", mozBoxSizing: "content-box", webkitBoxSizing: "content-box" });if (a || i.extend(d, i.css(T, ["width", "height"])), i.css(f, d), f.setAttribute(t, ""), i.addClass(f, n.spacerClass), A = { spacer: f, relSize: { width: "%" === c.width.slice(-1), height: "%" === c.height.slice(-1), autoFullWidth: "auto" === c.width && a && i.isMarginCollapseType(l.display) }, pushFollowers: n.pushFollowers, inFlow: a }, !T.___origStyle) {
        T.___origStyle = {};var h = T.style,
            g = s.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);g.forEach(function (e) {
          T.___origStyle[e] = h[e] || "";
        });
      }return A.relSize.width && i.css(f, { width: c.width }), A.relSize.height && i.css(f, { height: c.height }), f.appendChild(T), i.css(T, { position: a ? "relative" : "absolute", margin: "auto", top: "auto", left: "auto", bottom: "auto", right: "auto" }), (A.relSize.width || A.relSize.autoFullWidth) && i.css(T, { boxSizing: "border-box", mozBoxSizing: "border-box", webkitBoxSizing: "border-box" }), window.addEventListener("scroll", _), window.addEventListener("resize", _), window.addEventListener("resize", P), T.addEventListener("mousewheel", D), T.addEventListener("DOMMouseScroll", D), N(), u;
    }, this.removePin = function (e) {
      if (T) {
        if (h === l && N(!0), e || !s) {
          var n = A.spacer.firstChild;if (n.hasAttribute(t)) {
            var r = A.spacer.style,
                o = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"],
                a = {};o.forEach(function (e) {
              a[e] = r[e] || "";
            }), i.css(n, a);
          }A.spacer.parentNode.insertBefore(n, A.spacer), A.spacer.parentNode.removeChild(A.spacer), T.parentNode.hasAttribute(t) || (i.css(T, T.___origStyle), delete T.___origStyle);
        }window.removeEventListener("scroll", _), window.removeEventListener("resize", _), window.removeEventListener("resize", P), T.removeEventListener("mousewheel", D), T.removeEventListener("DOMMouseScroll", D), T = void 0;
      }return u;
    };var R,
        k = [];return u.on("destroy.internal", function (e) {
      u.removeClassToggle(e.reset);
    }), this.setClassToggle = function (e, t) {
      var n = i.get.elements(e);return 0 !== n.length && i.type.String(t) ? (k.length > 0 && u.removeClassToggle(), R = t, k = n, u.on("enter.internal_class leave.internal_class", function (e) {
        var t = "enter" === e.type ? i.addClass : i.removeClass;k.forEach(function (e) {
          t(e, R);
        });
      }), u) : u;
    }, this.removeClassToggle = function (e) {
      return e && k.forEach(function (e) {
        i.removeClass(e, R);
      }), u.off("start.internal_class end.internal_class"), R = void 0, k = [], u;
    }, w(), u;
  };var r = { defaults: { duration: 0, offset: 0, triggerElement: void 0, triggerHook: .5, reverse: !0, loglevel: 2 }, validate: { offset: function (e) {
        if (e = parseFloat(e), !i.type.Number(e)) throw 0;return e;
      }, triggerElement: function (e) {
        if (e = e || void 0) {
          var t = i.get.elements(e)[0];if (!t || !t.parentNode) throw 0;e = t;
        }return e;
      }, triggerHook: function (e) {
        var t = { onCenter: .5, onEnter: 1, onLeave: 0 };if (i.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));else {
          if (!(e in t)) throw 0;e = t[e];
        }return e;
      }, reverse: function (e) {
        return !!e;
      } }, shifts: ["duration", "offset", "triggerHook"] };e.Scene.addOption = function (e, t, n, i) {
    e in r.defaults || (r.defaults[e] = t, r.validate[e] = n, i && r.shifts.push(e));
  }, e.Scene.extend = function (t) {
    var n = this;e.Scene = function () {
      return n.apply(this, arguments), this.$super = i.extend({}, this), t.apply(this, arguments) || this;
    }, i.extend(e.Scene, n), e.Scene.prototype = n.prototype, e.Scene.prototype.constructor = e.Scene;
  }, e.Event = function (e, t, n, r) {
    r = r || {};for (var i in r) {
      this[i] = r[i];
    }return this.type = e, this.target = this.currentTarget = n, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this;
  };var i = e._util = function (e) {
    var t,
        n = {},
        r = function (e) {
      return parseFloat(e) || 0;
    },
        i = function (t) {
      return t.currentStyle ? t.currentStyle : e.getComputedStyle(t);
    },
        o = function (t, n, o, s) {
      if (n = n === document ? e : n, n === e) s = !1;else if (!u.DomElement(n)) return 0;t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();var a = (o ? n["offset" + t] || n["outer" + t] : n["client" + t] || n["inner" + t]) || 0;if (o && s) {
        var l = i(n);a += "Height" === t ? r(l.marginTop) + r(l.marginBottom) : r(l.marginLeft) + r(l.marginRight);
      }return a;
    },
        s = function (e) {
      return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function (e) {
        return e[1].toUpperCase();
      });
    };n.extend = function (e) {
      for (e = e || {}, t = 1; t < arguments.length; t++) {
        if (arguments[t]) for (var n in arguments[t]) {
          arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
        }
      }return e;
    }, n.isMarginCollapseType = function (e) {
      return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1;
    };var a = 0,
        l = ["ms", "moz", "webkit", "o"],
        c = e.requestAnimationFrame,
        f = e.cancelAnimationFrame;for (t = 0; !c && t < l.length; ++t) {
      c = e[l[t] + "RequestAnimationFrame"], f = e[l[t] + "CancelAnimationFrame"] || e[l[t] + "CancelRequestAnimationFrame"];
    }c || (c = function (t) {
      var n = new Date().getTime(),
          r = Math.max(0, 16 - (n - a)),
          i = e.setTimeout(function () {
        t(n + r);
      }, r);return a = n + r, i;
    }), f || (f = function (t) {
      e.clearTimeout(t);
    }), n.rAF = c.bind(e), n.cAF = f.bind(e);var u = n.type = function (e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    };u.String = function (e) {
      return "string" === u(e);
    }, u.Function = function (e) {
      return "function" === u(e);
    }, u.Array = function (e) {
      return Array.isArray(e);
    }, u.Number = function (e) {
      return !u.Array(e) && e - parseFloat(e) + 1 >= 0;
    }, u.DomElement = function (e) {
      return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName;
    };var d = n.get = {};return d.elements = function (t) {
      var n = [];if (u.String(t)) try {
        t = document.querySelectorAll(t);
      } catch (r) {
        return n;
      }if ("nodelist" === u(t) || u.Array(t)) for (var i = 0, o = n.length = t.length; o > i; i++) {
        var s = t[i];n[i] = u.DomElement(s) ? s : d.elements(s);
      } else (u.DomElement(t) || t === document || t === e) && (n = [t]);return n;
    }, d.scrollTop = function (t) {
      return t && "number" == typeof t.scrollTop ? t.scrollTop : e.pageYOffset || 0;
    }, d.scrollLeft = function (t) {
      return t && "number" == typeof t.scrollLeft ? t.scrollLeft : e.pageXOffset || 0;
    }, d.width = function (e, t, n) {
      return o("width", e, t, n);
    }, d.height = function (e, t, n) {
      return o("height", e, t, n);
    }, d.offset = function (e, t) {
      var n = { top: 0, left: 0 };if (e && e.getBoundingClientRect) {
        var r = e.getBoundingClientRect();n.top = r.top, n.left = r.left, t || (n.top += d.scrollTop(), n.left += d.scrollLeft());
      }return n;
    }, n.addClass = function (e, t) {
      t && (e.classList ? e.classList.add(t) : e.className += " " + t);
    }, n.removeClass = function (e, t) {
      t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "));
    }, n.css = function (e, t) {
      if (u.String(t)) return i(e)[s(t)];if (u.Array(t)) {
        var n = {},
            r = i(e);return t.forEach(function (e) {
          n[e] = r[s(e)];
        }), n;
      }for (var o in t) {
        var a = t[o];a == parseFloat(a) && (a += "px"), e.style[s(o)] = a;
      }
    }, n;
  }(window || {});return e;
});
"use strict";

/*! ScrollMagic v2.0.6 | (c) 2018 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!function (e, n) {
  "function" == typeof define && define.amd ? define(["ScrollMagic", "TweenMax", "TimelineMax"], n) : "object" == typeof exports ? (require("gsap"), n(require("scrollmagic"), TweenMax, TimelineMax)) : n(e.ScrollMagic || e.jQuery && e.jQuery.ScrollMagic, e.TweenMax || e.TweenLite, e.TimelineMax || e.TimelineLite);
}(this, function (e, n, r) {
  "use strict";
  e.Scene.addOption("tweenChanges", !1, function (e) {
    return !!e;
  }), e.Scene.extend(function () {
    var e,
        t = this;t.on("progress.plugin_gsap", function () {
      i();
    }), t.on("destroy.plugin_gsap", function (e) {
      t.removeTween(e.reset);
    });var i = function () {
      if (e) {
        var n = t.progress(),
            r = t.state();e.repeat && -1 === e.repeat() ? "DURING" === r && e.paused() ? e.play() : "DURING" === r || e.paused() || e.pause() : n != e.progress() && (0 === t.duration() ? n > 0 ? e.play() : e.reverse() : t.tweenChanges() && e.tweenTo ? e.tweenTo(n * e.duration()) : e.progress(n).pause());
      }
    };t.setTween = function (o, a, s) {
      var u;arguments.length > 1 && (arguments.length < 3 && (s = a, a = 1), o = n.to(o, a, s));try {
        u = r ? new r({ smoothChildTiming: !0 }).add(o) : o, u.pause();
      } catch (p) {
        return t;
      }return e && t.removeTween(), e = u, o.repeat && -1 === o.repeat() && (e.repeat(-1), e.yoyo(o.yoyo())), i(), t;
    }, t.removeTween = function (n) {
      return e && (n && e.progress(0).pause(), e.kill(), e = void 0), t;
    };
  });
});
"use strict";

function PolygonFactory(options) {
  this.width = 200;
  this.height = 113;
  this.rowCount = options.rowCount || 5;
  this.colCount = options.colCount || 4;
  this.gutterX = 100;
  this.gutterY = 120;
  this.startX = random(-100, 0);
  this.leftX = -200;
  this.objects = [];
  this.container = options.container;
}

PolygonFactory.prototype.init = function () {
  for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
    for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
      var posX = this.width * rowIndex;
      var posY = this.height * colIndex;
      // move even row element to right 130px;
      if (colIndex % 2 === 0) {
        posX += 130;
      }
      // ??????????????????????????????gutter
      if (colIndex > 0) {
        posY += this.gutterY * colIndex;
      }
      if (rowIndex > 0) {
        posX += this.gutterX * rowIndex;
      }
      // ?????????????????????????????????
      var offsetX = random(-30, 30);
      var offsetY = random(-30, 30);

      //

      var polygon = $('<div class="polygon"></div>');
      this.objects.push({
        top: posY + offsetY,
        left: posX + offsetX + this.startX + this.leftX,
        polygon: polygon[0]
      });
    }
  }
  return this;
};

PolygonFactory.prototype.update = function () {};

PolygonFactory.prototype.renderPolygon = function () {
  var that = this;
  that.objects.forEach(function (object) {
    $(object.polygon).css({ "top": object.top, "left": object.left });
    that.container.append($(object.polygon));
  });
  return that;
};

function random(min, max) {
  return min + (max - min) * Math.random();
}
"use strict";

// Animation helper
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Landing hero
var setDeviceWallScrollPosition = function (e, animate) {
  var devicePosition = e.position().left;
  var wrapPosition = $(".device-wall").position().left;
  var viewportWidth = $(".device-wall-wrap").width();
  var viewportOffset = viewportWidth / 2 - e.width() / 2;
  var offset = devicePosition - wrapPosition - viewportOffset;
  if (animate) {
    $(".device-wall").velocity("scroll", {
      axis: "x",
      offset: offset,
      duration: 500,
      container: $(".device-wall-wrap")
    });
  } else {
    $(".device-wall-wrap").scrollLeft(offset);
  }
};

var animateHero = function () {
  $(".device-wall").addClass("is-animated");
  $(".hero-copy").addClass("is-animated").delay(200).queue(function () {
    $(".device-wall li").each(function (i) {
      var device = $(this);
      setTimeout(function () {
        device.addClass('is-animated');
      }, 150 * i);
    });
  });
};

var replayAnimation = function () {
  $(".hero-copy").removeClass("is-animated");
  $(".device-wall").removeClass("is-animated");
  $(".device-wall li").each(function (i) {
    $(this).removeClass("is-animated");
  });
  //animateHero();
  setTimeout(function () {
    animateHero();
  }, 1000);
};

// Box animation (financing)
var coinId = 0;

var heroCoinDropAnimation = function () {
  var coin = $("<div class='hero-coin hero-coin-" + coinId + "'></div>");
  coin.css({
    left: getRandomNumber(100, 1000),
    backgroundColor: "HSL(" + getRandomNumber(170, 210) + ", 73%, " + getRandomNumber(50, 80) + "%)"
  });
  $(".hero-bg--coin").append(coin);
  $(".hero-coin-" + coinId).velocity({
    properties: {
      top: 400,
      left: "50%",
      opacity: 0,
      scale: 0.2,
      rotateX: getRandomNumber(-45, 90),
      rotateY: getRandomNumber(-90, 35),
      rotateZ: getRandomNumber(-10, 10)
    },
    options: {
      duration: 5000,
      complete: function () {
        coin.remove();
      }
    }
  });
  coinId = coinId + 1;
};

var uberTitleAnimation = function () {
  var cur = $("#carousel-first").find(".hero-title-carousel-reveal");

  if (cur.length === 0) {
    var $lis = $("#carousel-first li");
    $lis.removeClass("cubic-easeinout--fast");
    $lis.addClass("hero-title-carousel-reveal").removeClass("hero-title-carousel-hide");
    $($lis[0]).removeClass("hero-title-carousel-reveal");
    setTimeout(function () {
      $lis.addClass("cubic-easeinout--fast");
      $($lis[0]).addClass("hero-title-carousel-hide");
      $($lis[0]).next().removeClass("hero-title-carousel-reveal");
    }, 100);
  }

  var cur = $(cur[0]);
  cur.prev().addClass("hero-title-carousel-hide");
  cur.removeClass("hero-title-carousel-reveal");
};

var cubeAnimation = function () {
  $(".hero-bg--cube").find(".cube").removeClass("start");
};

// Countdown drop animation
var countdownDropAnimation = function () {
  var base = $(".countdown-bg");
  var coin = $("<div class='countdown-bg__piece countdown-bg__piece-" + coinId + "'></div>");
  var hue = getRandomNumber(170, 210);
  var saturation = getRandomNumber(65, 85);
  var color = "hsl(" + hue + ", 75%, " + saturation + "%)";
  var shadowColor = "hsla(" + hue + ", 73%, " + saturation + "%, 0.25)";
  coin.css({
    left: getRandomNumber(100, base.width() - 100),
    backgroundColor: color,
    boxShadow: "0px 20px 50px " + shadowColor
  });
  base.append(coin);
  $(".countdown-bg__piece-" + coinId).velocity({
    properties: {
      top: base.height() - 150,
      left: "50%",
      opacity: [0, "easeInQuint"],
      scale: 0.6,
      rotateX: getRandomNumber(-5, 5),
      rotateY: getRandomNumber(-45, 45),
      rotateZ: getRandomNumber(-20, 20),
      boxShadowY: 20,
      boxShadowBlur: 20
    },
    options: {
      duration: 8000,
      complete: function () {
        coin.remove();
      }
    }
  });
  coinId = coinId + 1;
};
var screenSlide = function (options) {
  var element = options.element;
  var slideWidth = options.slideWidth;
  var currentIndex = options.currentIndex;
  var transitionString, translateString;
  var currentDistance = slideWidth * currentIndex;
  translateString = "translate3d(-" + currentDistance + "px,0,0)";
  transitionString = "all 0.35s ease-in";
  element.css({ "-webkit-transform": translateString, "transform": translateString, "-webkit-transition": transitionString, "transition": transitionString });
};

$('#balance-scene-menu').on('click', 'a', function (event) {
  event.preventDefault();
  var index = $(this).attr('data-target');
  var element = $(".balance-scene-container .swiper-wrapper");
  $('#balance-scene-menu a').removeClass("active");
  $(this).addClass("active");
  $(".balance-scene-canvas .product-bg").removeClass("active");
  $(".balance-scene-container .content").removeClass("active");
  $(".balance-scene-canvas .product-bg").eq(index).addClass("active");
  $(".balance-scene-container .content").eq(index).addClass("active");
  var height = $(".balance-scene-container .content").eq(index).height();
  $(".balance-scene-container .text-wrapper").css({ "height": height });
  screenSlide({ element: element, slideWidth: 280, currentIndex: index });
});
"use strict";



var ignoredLangs = ['json', 'xml', 'html'];

var populateLanguageChannelSelector = function () {
    var langs = [];
    var channels = [];

    $("code[class^='language-']").each(function () {
        langs.push($(this).attr("class").toString().toLowerCase().slice(9));
    });

    $('.code-filter').each(function () {
        var channel = $(this).attr('class').toString().toLowerCase().split(' ')[1];
        channels.push(channel);
    });

    langs = _.difference(_.uniq(langs), ignoredLangs);
    channels = _.uniq(channels);

    if (langs.length > 1) {
        _.each(langs, function (lang) {
            $('#language-select').append($('<li><a onclick="filterByLanguage(\'' + lang + '\')">' + humanReadableLangs[lang] + '</a></li>'));
        });
        $('.language-select-item > a').text(langs[0]);
        $('.language-select-item').addClass('on');
        filterByLanguage(langs[0]);
    } else {
        $('.language-select-item').remove();
    }

    if (channels.length > 1) {
        _.each(channels, function (channel) {
            $('#channel-select').append($('<li><a onclick="filterByChannel(\'' + channel + '\')">' + channel + '</a></li>'));
        });
        $('.channel-select-item > a').text(channels[0]);
        $('.channel-select-item').addClass('on');
        filterByChannel(channels[0]);
    } else {
        $('.channel-select-item').remove();
    }
};

var filterByLanguage = function (language) {
    var filterIgnoredLangs = ignoredLangs.slice(0);
    filterIgnoredLangs.push(language);

    $("code[class^='language-']").each(function () {
        var l = $(this).attr("class").split(' ')[0].toString().toLowerCase().slice(9);
        if (_.contains(filterIgnoredLangs, l)) {
            $(this).removeClass("hide");
        } else {
            $(this).addClass("hide");
        }
    });

    $(".filter-by-language").each(function () {
        var l = $(this).attr("data-language");
        if (_.contains(filterIgnoredLangs, l)) {
            $(this).removeClass("hide");
        } else {
            $(this).addClass("hide");
        }
    });

    $('.language-select-item > a').text(humanReadableLangs[language]);
};

var filterByChannel = function (channel) {
    $('.code-filter').each(function () {
        var c = $(this).attr('class').toString().toLowerCase().split(' ')[1];
        if (c !== channel) {
            $(this).addClass('hide');
        } else {
            $(this).removeClass('hide');
        }
    });

    $('.channel-select-item > a').text(channel);
};

if (window.location.href.indexOf('docs') > -1) {
    var urlSearch = window.location.search;
    var urlHref = window.location.href;

    if (urlSearch !== '') {
        var params = urlSearch.split('='),
            key = params[0].split('?')[1],
            isOpen = params[1];

        if (isOpen == 'true') {
            $('#' + key).nextUntil($('[data-index!="' + key + '"]')).show();

            $('.thirdcategory').hide();

            // todo ??????3
            if (urlHref.indexOf('overview') > -1) {
                switch (key) {
                    case 'basic_transaction':
                        if (urlHref.indexOf('charge_refunds') > -1) {
                            $('.charge_refunds').show();
                        }
                        break;
                    case 'account':
                        if (urlHref.indexOf('balances') > -1) {
                            $('.balances').show();
                        } else if (urlHref.indexOf('coupons') > -1) {
                            $('.coupons').show();
                        } else if (urlHref.indexOf('orders') > -1) {
                            $('.orders').show();
                        } else if (urlHref.indexOf('user_accounts') > -1) {
                            $('.user_accounts').show();
                        }
                        break;
                    case 'platform':
                        if (urlHref.indexOf('hierarchies') > -1) {
                            $('.hierarchies').show();
                        } else if (urlHref.indexOf('orders') > -1) {
                            $('.orders').show();
                        } else if (urlHref.indexOf('royalties') > -1) {
                            $('.royalties').show();
                        } else if (urlHref.indexOf('user_accounts') > -1) {
                            $('.user_accounts').show();
                        }
                        break;
                }
            } else if (urlHref.indexOf('server') > -1) {
                switch (key) {
                    case 'basic_transaction':
                        if (urlHref.indexOf('charge_refunds') > -1) {
                            $('.charge_refunds').show();
                        }
                        break;
                    case 'account':
                        if (urlHref.indexOf('balances') > -1) {
                            $('.balances').show();
                        } else if (urlHref.indexOf('coupons') > -1) {
                            $('.coupons').show();
                        } else if (urlHref.indexOf('orders') > -1) {
                            $('.orders').show();
                        } else if (urlHref.indexOf('user_accounts') > -1) {
                            $('.user_accounts').show();
                        }
                        break;
                    case 'platform':
                        if (urlHref.indexOf('hierarchies') > -1) {
                            $('.hierarchies').show();
                        } else if (urlHref.indexOf('orders') > -1) {
                            $('.orders').show();
                        } else if (urlHref.indexOf('royalties') > -1) {
                            $('.royalties').show();
                        } else if (urlHref.indexOf('user_accounts') > -1) {
                            $('.user_accounts').show();
                        }
                        break;
                }
            }
        }
    }

    // disabled ?????????????????????
    $('li.subcategory.disabled.is-index').each(function (index, el) {
        $(el).nextUntil($(':not(.subcategory)')).show();
    });

    // ??????????????????
    $('.side-bar li').on('click', function () {
        var href = $(this).data('href'),
            pathName = window.location.pathname;

        // ?????????????????????
        if ($(this).hasClass('subcategory') && $(this).hasClass('is-index')) {
            if (href === pathName) {
                $(this).nextUntil($('[data-index]!=' + $(this).data('index'))).show();
            } else {
                window.location.href = href + '?' + $(this).attr('id') + '=true';
            }
        } else {
            // ???????????????????????? ????????????
            var $firstEl = $(this).prevAll().filter('li.subcategory.is-index'),
                params = '';

            // ?????????????????? id ??? ????????????????????? ????????????, ????????????????????????
            if ($firstEl.attr('id') === $(this).data('index')) {
                params = '?' + $(this).data('index') + '=true';
            }

            window.location.href = href + params;
        }
    });
}
'use strict';

var path = window.location.href;

// ???????????????????????????
$(function () {
    if (path.indexOf('download') > -1) {
        var timer = function ($El, time, func) {
            $El.addClass('disabled').text(time);
            if (time === 0) {
                func();
            } else {
                setTimeout(function () {
                    timer($El, --time, func);
                }, 1000);
            }
        };

        var startDownload = function () {
            var fileName = $.getQueryParameters().filename;

            var realFile = filenameMap[fileName];

            var url = "/download-blog/" + realFile;

            // let win = window.open('about:blank', '_blank');
            // win.location = url;


            var openLink = $("#downloadUrl");
            openLink.attr('href', url);
            openLink[0].click();

            // window.location.href = url;
        };

        var checkCookies = function () {
            var data = $.cookie().downloadInfo;
            if (data) {
                // ????????????
                $('#downloadstep3').fadeIn();

                // ?????? cookie
                setCookies(data.replace(/filename=(.*)/, 'filename=' + $.getQueryParameters().filename));

                $.ajax({
                    method: 'POST',
                    url: baseUrl + '/stats_report',
                    data: data,
                    dataType: 'json'
                }).success(function (res) {
                    if (res.status) {
                        startDownload();
                    } else {
                        console.error('error');
                    }
                });
            } else {
                $('#downloadstep1').fadeIn();
            }
        };

        var setCookies = function (data) {
            $.cookie('downloadInfo', data, { expires: 30 });
        };

        var ajaxHost = location.host.includes('pingxx') ? 'https://dashboard.pingxx.com' : 'https://dashboard.pinpula.com';

        var baseUrl = ajaxHost + '/api/pay_college';

        // ????????????
        var filenameMap = {
            lvmama001: '????????????0???1????????????????????????-Ping++ ????????????????????????.pdf.zip',
            bilibili002: 'Bilibili ??????????????????????????????????????????-Ping++ ????????????????????????.pdf.zip',
            minsheng003: '????????????????????????????????????-Ping++ ????????????????????????.pdf.zip',
            pingpp004: '????????????????????????-Ping++ ????????????????????????.pdf.zip',
            '3corfpcore1': '????????????????????????????????????.zip',
            '3corfpcore2': '????????????????????????????????????.zip',
            '3corfpcore3': '????????????????????????????????????.zip',
            wtliquicore: '???????????????????????????????????????.zip',
            htgtpchanel: '??????????????????????????????????????????????????????????????????.pdf.zip',
            clksxxhsdz: '???0??????????????????????????????????????????????????????.pdf.zip'
        };

        // ?????? cookie
        checkCookies();

        // ??????????????????
        Foundation.Abide.defaults.patterns['sms'] = /^\d{6}$/;

        // ???????????????
        var $provinceEl = $('#downloadProvince');

        // ????????????????????? ??????????????????
        $('#downloadProvince').change(function () {
            if ($(this).val() !== '') {
                $(this).css({ color: '#202020' });
            } else {
                $(this).css({ color: '#cacaca' });
            }
        });

        // ???????????????
        $('#sendSms').click(function () {
            if ($(this).hasClass('disabled')) {
                return false;
            }

            var $phoneEl = $('#phone'),
                $El = $('#sendSms');

            if ($.trim($phoneEl.val()) === '') {
                $phoneEl.addClass('is-invalid-input');
                return false;
            }

            // ?????????
            timer($El, 60, function () {
                $El.text('???????????????').removeClass('disabled');
            });

            $.ajax({
                method: 'POST',
                url: baseUrl + '/send_validate_sms',
                data: { sms_phone: $phoneEl.val() },
                dataType: 'json'
            }).success(function () {}).error(function () {
                $El.text('???????????????').removeClass('disabled');
            });
        });

        // ??????????????? ??? ?????????
        $('#nextStep1').click(function () {
            var _this = this;

            if ($(this).hasClass('disabled')) {
                return false;
            }

            // ??????????????????????????????????????????

            setTimeout(function () {
                if ($('#downloadstep1 input.is-invalid-input').length === 0) {

                    $(_this).text('?????????...').addClass('disabled');

                    $.ajax({
                        method: 'POST',
                        url: baseUrl + '/validate_sms',
                        data: $('#downloadstep1').serialize(),
                        dataType: 'json'
                    }).success(function (res) {
                        if (res.status) {
                            $('#downloadstep1').fadeOut(function () {
                                $('#downloadstep2').fadeIn();
                            });
                        } else {
                            $(_this).text(res.data.message).addClass('button-error').removeClass('disabled');

                            setTimeout(function () {
                                $(_this).text('?????????').removeClass('button-error').removeClass('disabled');
                            }, 4000);
                        }
                    }).error(function () {
                        $(_this).text('????????????').addClass('button-error').removeClass('disabled');

                        setTimeout(function () {
                            $(_this).text('?????????').removeClass('button-error');
                        }, 4000);
                    });
                } else {
                    console.log('error');
                }
            }, 0);
        });

        // ???????????????
        $('#submit').click(function () {
            var _this2 = this;

            if ($(this).hasClass('disabled')) {
                return false;
            }

            setTimeout(function () {
                if ($('#downloadstep2 input.is-invalid-input').length === 0) {

                    $(_this2).text('?????????...').addClass('disabled');

                    var data = $('#downloadstep2').serialize() + ('&phone=' + $('#phone').val() + '&filename=' + $.getQueryParameters().filename);
                    $.ajax({
                        method: 'POST',
                        url: baseUrl + '/stats_report',
                        data: data,
                        dataType: 'json'
                    }).success(function (res) {
                        if (res.status) {
                            $('#downloadstep2').fadeOut(function () {
                                $('#downloadstep3').fadeIn();

                                startDownload();

                                setCookies(data);
                            });
                        } else {
                            $(_this2).text(res.data.message).addClass('button-error').removeClass('disabled');

                            setTimeout(function () {
                                $(_this2).text('?????????').removeClass('button-error');
                            }, 4000);
                        }
                    }).error(function () {
                        $(_this2).text('????????????').addClass('button-error').removeClass('disabled');

                        setTimeout(function () {
                            $(_this2).text('?????????').removeClass('button-error');
                        }, 4000);
                    });
                } else {
                    console.log('error');
                }
            }, 0);
        });
    }
});
'use strict';

// var userAgent = navigator.userAgent;
// if (userAgent.indexOf("Firefox") > -1) {
//     var y1 = '-235', y2 = '-469', y3 = '-705', y4 = '-960';
// } else {
//     var y1 = '-235', y2 = '-479', y3 = '-715', y4 = '-960';
// }

// ?????? ????????? firefox ????????? chrome ????????????????????????????????????????????????
var y1 = '0',
    y2 = '-480',
    y3 = '-960',
    y4 = '-1440';

/**
 * ?????????????????????????????????
 *
 * @param {*} next
 * @param {*} last
 */
function switchSlideLine(next, last) {
    $('#slideLine' + next).css({ opacity: 1 }).find('.active-line').animate({ width: '100%' }, 2000);
    $('#slideLine' + last).css({ opacity: 0.75 }).find('.active-line').css({ width: 0 });

    // ???????????????
    $('.phone-title').eq(next - 1).show().siblings().hide();
}

function slideScene() {
    var lineBoxes = $('.line-boxes');
    var sceneView = $('.scene-viewes');
    var heroSceneText = $('.hero-scene-text');
    var bg_hand = $('.scene-slider-wrap .iphone-hand-bg');
    var phone = $('#iphone6');
    var topbar = $('#iphone6 .topbar');
    var camera = $('#iphone6 .camera');
    var speaker = $('#iphone6 .speaker');
    var speakerBefore = $('#iphone6 .speaker-before');
    var homeButton = $('#iphone6 .home');

    var tl = new TimelineMax({ yoyo: false, repeat: -1 });

    $('.fullheight-column-align').hover(function () {
        tl.pause();
    }, function () {
        tl.play();
    });

    // x ??? line box ???????????? xc ??? sceneView ?????????
    var x1 = '-772',
        xc1 = '-166',
        x2 = '-1213',
        xc2 = '-590',
        x3 = '-1496',
        xc3 = '-1016',
        x4 = '-1678',
        xc4 = '-1182';

    tl.add(function () {
        switchSlideLine(1, 4);
    });

    // switch to desktop
    tl.add([TweenLite.to(lineBoxes, 1, { opacity: 1, x: x1, ease: Power3.easeInOut }), TweenLite.to(sceneView, 1, { y: y2, ease: Power3.easeInOut }), TweenLite.to(heroSceneText, 1, { y: y2, ease: Power3.easeInOut })], "+=2");

    tl.add(function () {
        switchSlideLine(2, 1);
    });

    tl.add([TweenLite.to(lineBoxes, 1, { x: x2, ease: Power3.easeInOut }), TweenLite.to(sceneView, 1, { y: y3, ease: Power3.easeInOut }), TweenLite.to(heroSceneText, 1, { y: y3, ease: Power3.easeInOut })], "+=2");

    tl.add(function () {
        switchSlideLine(3, 2);
    });

    // switch to iphone
    tl.add([TweenLite.to(lineBoxes, 1, { x: x3, ease: Power3.easeInOut }), TweenLite.to(sceneView, 1, { y: y4, ease: Power3.easeInOut }), TweenLite.to(heroSceneText, 1, { y: y4, ease: Power3.easeInOut })], "+=2");

    tl.add(function () {
        switchSlideLine(4, 3);
    });

    tl.add([TweenLite.to(lineBoxes, 1, { x: x4, ease: Power3.easeInOut }), TweenLite.to(sceneView, 1, { y: y4, ease: Power3.easeInOut }), TweenLite.to(heroSceneText, 1, { y: y4, ease: Power3.easeInOut })], "+=2");

    // tl.to(bg_hand, 0.5, { scale: 1, opacity: 1 }, "-=1.2");
    tl.timeScale(1);
}

function resizeFrame() {
    var lineBoxWapWidth = $('.line-box-wrap').width();
    var lineBoxes = $('.line-boxes');
    var initLeftOfPhoneHand = 295,
        initLeftOfLineBox = 246;
    var currentLeftOfPhoneHand = Math.ceil(lineBoxWapWidth / 2);
    var moveLeft = initLeftOfPhoneHand - currentLeftOfPhoneHand;
    var currentLeftOfLineBox = -(initLeftOfLineBox + moveLeft);
    TweenLite.to(lineBoxes, 0.1, { x: currentLeftOfLineBox, ease: Power3.easeInOut });
}

function slideViewbox() {
    var viewBoxes = $('#pingerOverview .views');
    var tl = new TimelineMax({ yoyo: false, repeat: -1 });
    tl.to(viewBoxes, 1, { x: "-25%", ease: Power3.easeInOut }, 3).to(viewBoxes, 1, { x: "-50%", ease: Power3.easeInOut }, 8).to(viewBoxes, 1, { x: "-75%", ease: Power3.easeInOut }, 13);
}
'use strict';

$(document).ready(function () {
    // ???????????????????????????
    $('.difficult-box > div').mouseenter(function () {
        $(this).find('h4').animate({ marginTop: 10, lineHeight: 25 });
        $(this).find('.difficult-desc').fadeIn();
    }).mouseleave(function () {
        $(this).find('h4').animate({ marginTop: 0, lineHeight: 160 });
        $(this).find('.difficult-desc').fadeOut();
    });

    // ?????? ????????????????????? -- ????????? video 1 ?????????????????????
    // setTimeout(function () {
    // $('.pc-video .video1 > .img').one('load', function () {
    //
    //     console.log($('.pc-video .video1 > .img').height())
    //
    //     $('.pc-video .video2 > .img,.pc-video .video3 > .img').height(($('.pc-video .video1 > .img').height()) / 2);
    //
    // }).each(function () {
    //     // ?????????????????????bug, ??????????????????
    //     this.complete && $(this).load();
    // });
    // }, 1000);


    // ?????????????????????
    // $('.mobile-video > div').on('click', function () {
    //     var $Elem = $(this).find('video');
    //
    //     $Elem.show().siblings().hide();
    //     $Elem[0].play();
    // });


    $('.stickers-box').length > 0 && $('.stickers-box').seamlessRolling({ speed: 0.5 });

    // ???????????????
    $('#video1Modal, #video2Modal, #video3Modal').bind('closed.zf.reveal', function () {
        $(this).find('video')[0].pause();
    });

    // ?????????????????????
    $('.bottom-tools > div:not(:last-child)').on('click', function () {
        window.location.href = $(this).data('url');
    });

    $('.bottom-tools > div:last-child').hover(function () {
        $(this).css({ padding: 0 }).find('.no-hover').hide().siblings().show();
    }, function () {
        $(this).css({ padding: '35px 0 28px 0' }).find('.had-hover').hide().siblings().show();
    });
});
"use strict";

var homepageTween = function () {
  // Homepage tweening
  var controller = new ScrollMagic.Controller();

  var homePhone1Tween = TweenMax.to("#phone-1", 1, { className: "+=end" });
  var homePhone2Tween = TweenMax.to("#phone-2", 1, { className: "+=end" });
  var homePhoneShadowTween = TweenMax.to("#phone-shadow", 1, { className: "+=end" });
  var homePhoneShadowInnerTween = TweenMax.to("#phone-shadow .inner", 1, { className: "+=end" });
  var homeFeaturesListTween = TweenMax.staggerFromTo(".iconwall-item", 2, { yPercent: -20, opacity: 0 }, { yPercent: 0, opacity: 1, ease: Back.easeOut }, 0.15);
  var homeStickLabelTween = TweenMax.staggerFromTo(".stick-label", 2, { yPercent: -20, opacity: 0 }, { yPercent: 0, opacity: 1, ease: Back.easeOut }, 1);
  var homeDashboardTween = TweenMax.fromTo(".home-feature__bg.dashboard", 2, { xPercent: 20, opacity: 0 }, { xPercent: 0, opacity: 1, ease: Power3.easeOut });

  // build scene
  var homePhone1Scene = new ScrollMagic.Scene({ triggerElement: "#providers", duration: 800, offset: -100 }).setTween(homePhone1Tween).addTo(controller);

  var homePhone2Scene = new ScrollMagic.Scene({ triggerElement: "#providers", duration: 800, offset: -100 }).setTween(homePhone2Tween).addTo(controller);

  var homePhoneShadowScene = new ScrollMagic.Scene({ triggerElement: "#providers", duration: 500, offset: 150 }).setTween(homePhoneShadowTween).addTo(controller);

  var homePhoneShadowInnerScene = new ScrollMagic.Scene({ triggerElement: "#providers", duration: 500, offset: 150 }).setTween(homePhoneShadowInnerTween).addTo(controller);

  var homeIconWallScene = new ScrollMagic.Scene({ triggerElement: "#iconwall", duration: 700, offset: -200 }).setTween(homeFeaturesListTween).addTo(controller);

  var homeStickLabelScene = new ScrollMagic.Scene({ triggerElement: "#providers", duration: 500, offset: -50 }).setTween(homeStickLabelTween).addTo(controller);

  var homeDashboardScene = new ScrollMagic.Scene({ triggerElement: "#dashboard", duration: 700, offset: -500 }).setTween(homeDashboardTween).addTo(controller);
};

var cmbIntroAnimate = function () {
  var controller = new ScrollMagic.Controller();
  // build scenes
  new ScrollMagic.Scene({ triggerElement: "#advantage" }).setClassToggle("#device", "animated") // add class toggle
  .addTo(controller);

  var buttonRest = $("#cmbWalletPayReset");
  var start = $("#step1");
  buttonRest.click(function () {
    console.log("click");
    $("#device").removeClass("animated");
  });
  start.click(function () {
    console.log("start");
    $("#device").addClass("animated");
  });
};

var testimonialParallax = function () {
  var controller = new ScrollMagic.Controller();

  // build scenes

  $('.testimonial-card').each(function () {
    var currentElement = this;
    var image = $(this).find('.testimonial__fullbleed')[0];
    var tween = TweenMax.fromTo(image, 2, { 'background-position-y': '30%' }, { 'background-position-y': '70%' });
    var scene = new ScrollMagic.Scene({ triggerElement: currentElement, duration: $(window).height() * 1.5, offset: -$(window).height() * 0.5 }).setTween(tween).addTo(controller);
  });
};
"use strict";

var setStickyNavBar = function () {
    // if ($('.top-bar-wrapper').hasClass('is-fixed')) {
    //
    // }
    var controller = new ScrollMagic.Controller();
    var navBarTween = TweenMax.to(".top-bar-wrapper", 1, { className: "+=fixed2" });
    var navBar = new ScrollMagic.Scene({ triggerHook: 0.6, duration: 50, offset: $('.banner-box').height() }).setTween(navBarTween).addTo(controller);
};

var setStickyforPositon = function () {
    var $membersContainer = $("#membersContainer"),
        $product = $("#product").height(),
        $engineer = $("#engineer").height(),
        $misc = $("#misc").height(),
        $operations = $("#operations").height(),
        $marketing = $("#marketing").height(),
        $nav = $('#team-members .team-nav'),
        n = 0,
        n1 = $product,
        n2 = n1 + $engineer,
        n3 = n2 + $misc,
        n4 = n3 + $operations,
        n5 = n4 + $marketing;
    $membersContainer.on('scroll', testOffset);

    function testOffset(e) {
        n = $membersContainer.scrollTop() + 42;
        if (n <= n1) {
            $("ul.team-nav li a").removeClass("active");
            $("ul.team-nav li:eq(0) a").addClass("active");
        } else if (n > n1 && n <= n2) {
            $("ul.team-nav li a").removeClass("active");
            $("ul.team-nav li:eq(1) a").addClass("active");
        } else if (n > n2 && n <= n3) {
            $("ul.team-nav li a").removeClass("active");
            $("ul.team-nav li:eq(2) a").addClass("active");
        } else if (n > n3 && n <= n4) {
            $("ul.team-nav li a").removeClass("active");
            $("ul.team-nav li:eq(3) a").addClass("active");
        } else if (n > n4) {
            $("ul.team-nav li a").removeClass("active");
            $("ul.team-nav li:eq(4) a").addClass("active");
        }
    }
};

var setMobileNav = function () {
    $('.title-bar__toggle').click(function () {

        // ???????????????????????????????????????
        $('.activity-box').toggleClass('hide');

        $('body').toggleClass('no-scrolling');
        $('.mobile-nav').toggleClass('show');
        // $('.ui-mask').toggleClass('show');
        $('.title-bar').toggleClass('title-bar--active');
    });

    $(window).on('resize', function () {
        var $w = $(window).width();
        if ($w > 640) {
            $('.mobile-nav').removeClass('show');
            $('.ui-mask').removeClass('show');
        }
    });
};

// ??????banner ??????, ????????????
if ($('#bannerTemplate').html()) {
    var domain = location.hostname.indexOf('pinpula.com') > -1 ? 'pinpula.com' : 'pingxx.com';

    var url = 'https://dashboard.' + domain + '/api/callback/banner/image?scenario=official-site';
    $.get(url, function (data) {
        if (data.status === true && data.data.message && data.data.message.enabled === 1) {
            var message = data.data.message;

            var template = _.template($('#bannerTemplate').html()),
                bannerBox = $('#banner-box');

            var newString = template(message);

            // ?????????html ???
            bannerBox.html(newString);

            // ??? top ?????????????????????css
            $('#index-top-bar').css('top', bannerBox.height() + 'px');
        }
    });

    // ????????? banner ?????????????????????????????????
    $('#banner-box').on('click', '.activity-box', function () {

        var url = $(this).data('src');

        if (url) {
            var win = window.open('loading page');
            win.location.href = url;
        }
    });

    // ????????????????????????banner ????????????????????? ?????? DOM
    $('#banner-box').on('click', '.close-btn', function (event) {
        event.stopPropagation();
        var $El = $('.activity-box');
        $El.animate({ height: '0' }, 200, 'linear', function () {
            $El.remove();
        });
    });
}
'use strict';

$(function () {
    // ????????????
    $('.control-box.account > span').on('click', function () {
        $(this).removeClass('unactive-control').siblings().addClass('unactive-control');

        // ??????????????????
        var isClient = $('#client').hasClass('unactive-control');

        var itemName = $('#account-switch-one .box-active').data('img');

        // ??????????????????
        if (isClient) {
            $('#' + itemName + '-client').fadeIn(1000).siblings().fadeOut();

            $('#clientBox').fadeIn(1000);
            $('#serverBox').hide();
        } else {
            $('#' + itemName + '-server').fadeIn(1000).siblings().fadeOut();

            $('#serverBox').fadeIn(1000);
            $('#clientBox').hide();
        }
    });

    // ?????????????????????
    $('#account-switch-one > div').on('click', function () {
        $(this).addClass('box-active').siblings().removeClass('box-active');

        // ?????????item name
        var itemName = $(this).data('img');

        // ??????????????????
        var isClient = $('#client').hasClass('unactive-control');

        // ????????????
        if (isClient === true) {
            $('#' + itemName + '-client').fadeIn(1000).siblings().fadeOut();
        } else {
            $('#' + itemName + '-server').fadeIn(1000).siblings().fadeOut();
        }
    });

    $('.pc-switch > div').on('click', function () {
        $(this).addClass('box-active').siblings().removeClass('box-active');

        // ?????????item name
        var itemName = $(this).data('img');

        // ????????????
        $('#' + itemName).fadeIn(1000).siblings().fadeOut();
    });

    $('.coupon > div').on('click', function () {
        $(this).addClass('box-active').siblings().removeClass('box-active');

        // ?????????item name
        var itemName = $(this).data('img');

        $('#' + itemName).fadeIn(1000).siblings().fadeOut();
    });

    $('#scenSlide').splide();
    $('#scenSlide1').splide({ num: 3 });

    //  platform ??????
    $('.control-box.platform > span').on('click', function () {
        $(this).removeClass('unactive-control').siblings().addClass('unactive-control');

        // ?????????item name
        var itemName = $(this).data('img');

        // ????????????
        $('#' + itemName).fadeIn(1000).siblings().hide();
    });

    $('#scenSlidePlatform1').splide({ num: 2 });
    $('#scenSlidePlatform2').splide({ num: 2 });
    $('#scenSlidePlatform3').splide({ num: 2 });
    $('#scenSlidePlatform4').splide({ num: 3 });
});
'use strict';

$(document).ready(function () {
		var path = window.location.href;
    // ???????????????????????????
    if (path.indexOf('sharksoft') > -1) {

        // ????????????
        $('.consult').on('click', function () {
            var w = window.innerWidth - document.body.scrollWidth;
            $('body').css('padding-right', w);
            $('body').css('overflow', 'hidden');

            $('#consultSlide').removeClass('down').addClass('on');
        });

        // ???true ????????????PC
        if ($('.pricing-head:hidden').length === 0) {
            var getTitle = function (scroll) {
                if (scroll > baseOffset && scroll < paymentChannelOffset) {
                    headerEl.find('.header-title').remove();
                    baseEl.clone().appendTo(headerEl).width(priceWidth);
                } else if (scroll > paymentChannelOffset && scroll < customizationOffset) {
                    headerEl.find('.header-title').remove();
                    paymentChannelEl.clone().appendTo(headerEl).width(priceWidth);
                } else if (scroll > customizationOffset && scroll < systemPerformanceOffset) {
                    headerEl.find('.header-title').remove();
                    customizationEl.clone().appendTo(headerEl).width(priceWidth);
                } else if (scroll > systemPerformanceOffset && scroll < technicalSupportOffset) {
                    headerEl.find('.header-title').remove();
                    systemPerformanceEl.clone().appendTo(headerEl).width(priceWidth);
                } else if (scroll > technicalSupportOffset) {
                    headerEl.find('.header-title').remove();
                    technicalSupportEl.clone().appendTo(headerEl).width(priceWidth);
                }
            };

            var parentEl = $('.box-right');
            // ?????? box right ?????????
            var scroll1 = $('#scroll1').height(),
                scroll2 = $('#scroll2').height(),
                scroll3 = $('#scroll3').height();

            var maxHeight = Math.max(scroll1, scroll2, scroll3);

            parentEl.height(maxHeight);

            // ????????????
            var methods = {
                timerId: 0,
                getScrollTop: function (nu) {
                    switch (nu) {
                        case 1:
                            return 0;
                        case 2:
                            return scroll1 + 20;
                        case 3:
                            return scroll1 + scroll2 + 40;
                    }
                },
                // ??????????????????
                autoScroll: function () {
                    // ???????????????????????????
                    var index = $('.box-list.active').index();

                    var nextIndex = index === 2 ? 0 : index + 1;

                    $('.box-list:eq(' + nextIndex + ')').click();
                    methods.timer();
                },

                timer: function () {
                    this.timerId = setTimeout(function () {
                        methods.autoScroll();
                    }, 3000);
                }
						};
            $('.box-list').on('click', function () {
                $('.box-list').removeClass('active');
                $(this).addClass('active');

                var scrollPosition = $(this).data('t');

                var nu = parseInt(scrollPosition.replace('scroll', ''));

                parentEl.animate({ scrollTop: methods.getScrollTop(nu) });

                [1, 2, 3].forEach(function (v) {
                    if (nu === v) {
                        $('#scroll' + v).animate({ opacity: 1 });
                    } else {
                        $('#scroll' + v).animate({ opacity: 0 });
                    }
                });
            });

            methods.timer();

            // ????????????????????? ????????????
            $('.pricing-head-box').on('mouseenter', function () {
                clearTimeout(methods.timerId);
            }).on('mouseleave', function () {
                methods.timer();
            });

            // ????????????
            var headerEl = $('.table-header'),
                baseEl = $('#base'),
                paymentChannelEl = $('#paymentChannel'),
                customizationEl = $('#customization'),
                systemPerformanceEl = $('#systemPerformance'),
                technicalSupportEl = $('#technicalSupport');

            var headerHeight = headerEl.innerHeight(),
                titleHeight = $('.header-title').outerHeight(),
                priceWidth = $('.price-table').width(),
                baseOffset = baseEl.offset().top - headerHeight - titleHeight,
                paymentChannelOffset = paymentChannelEl.offset().top - headerHeight * 2 - titleHeight * 2,
                // ??????fixed ?????? ????????????????????? header ??? title
            customizationOffset = customizationEl.offset().top - headerHeight * 2 - titleHeight * 2,
                systemPerformanceOffset = systemPerformanceEl.offset().top - headerHeight * 2 - titleHeight * 2,
                technicalSupportOffset = technicalSupportEl.offset().top - headerHeight * 2 - titleHeight * 2;

            $(document).scroll(function () {
                var scroll = $(document).scrollTop();

                // ?????? --- base
                if (scroll > baseOffset) {
                    if (!headerEl.hasClass('price-sticking')) {
                        headerEl.addClass('price-sticking').children().width(priceWidth);
                        // baseEl.clone().appendTo(headerEl).width(priceWidth);
                    }

                    getTitle(scroll);
                } else {
                    if (headerEl.hasClass('price-sticking')) {
                        headerEl.removeClass('price-sticking').find('.header-title').remove();
                    }
                }
            });
        } else {
            //  ????????????????????????
            var headerM = $('.table-section-m');

            // ????????????
            $(document).scroll(function () {
                var scroll = $(document).scrollTop();

                if (scroll > $('.table-body-m').offset().top - headerM.innerHeight()) {
                    !headerM.hasClass('fixed-m') && headerM.addClass('fixed-m');
                } else {
                    headerM.hasClass('fixed-m') && headerM.removeClass('fixed-m');
                }
            });

            var versionMap = {
                trial: ['?????????', '?????? ??????30???'],
                standard: ['?????????', '9,999???/???'],
                professional: ['?????????', '29,999???/???'],
                custom: ['?????????', '99,999???/???']
            };

            // ???????????????????????????
            jQuery.fn.extend({
                /**
                 * ??????????????????jQuery???????????????
                 */
                swap: function (another) {
                    var me = this;
                    var cloneMe = me.clone();
                    var temp = $('<span/>');
                    another.before(temp);
                    me.replaceWith(another);
                    temp.replaceWith(cloneMe);
                    return this;
                }
            });

            $('#dropdown-box').on('click', 'p', function () {
                var selectVersion = $(this).data('v'),
                    slot = $(this).parent().data('slot');

                // section ??????????????????
                var popular = selectVersion === 'professional' ? '<img class="price-popular" src="../assets/img/pricing/popular.svg" alt="">' : '';
                $('#' + slot + 'section').html('<h5>' + versionMap[selectVersion][0] + ' ' + popular + '</h5><p>' + versionMap[selectVersion][1] + '</p>');

                // ???info ??????????????????????????????????????? slot ???
                $('.' + selectVersion).each(function (k, v) {
                    var html = $(v).html();
                    // ??????????????? slot ???
                    $(v).parent().find('#' + slot).html(html);
                });

                // ????????????
                $(this).parent().foundation('close');
            });

            // ???ios ???foundation ???dropdown ??????????????? ????????????????????????click ????????? ????????????????????????
            $('.body-section-m').on('click', 'div', function () {});
        }
    }
});
'use strict';


// ?????????????????????
$(document).ready(function () {
    var path = window.location.href;

    // ?????????????????????????????????
    if (path.indexOf('solutionfund') > -1 || path.indexOf('sol_distribution') > -1 || // ??????????????????
    path.indexOf('sol_store') > -1 || // ???????????????
    path.indexOf('sol_retail') > -1 || // ?????????
    path.indexOf('profit_sharing') > -1 // ???????????????
    ) {

            // wave animate
            $('#img1').seamlessRolling({ speed: 3.5 });
            $('#img2').seamlessRolling({ speed: 2.2 });
            $('#img3').seamlessRolling({ speed: 1 });

            // top contact-us
            $('#contact-us-top').off('click').on('click', function () {
                $('html, body').animate({
                    scrollTop: $(".solution-contact").offset().top - 150
                });
            });
        }
});
'use strict';

$(function () {
    // ????????????
    var size = $('.case-list li').length,
        i = 0,
        imgArr = ['../assets/img/xhs-bg.png', '../assets/img/kid-bg.png', '../assets/img/dxys-bg.png'];

    $('.case-list li').css('width', 100 / size + '%');
    $('.case-list').css('width', 100 * size + '%');

    for (var j = 0; j < size; j++) {
        $('.case-num').append('<span></span>');
        $('.case-list li').eq(j).css('background-image', 'url(' + imgArr[j] + ')');
    }
    $('.case-num').find('span').first().addClass('on');

    var w = parseInt($('.case-list li').css('width'));

    /*????????????*/
    var t = setInterval(function () {
        i++;
        move();
    }, 3000);

    /*??????????????????*/
    $(".index-case-moudle").hover(function () {
        clearInterval(t);
    }, function () {
        t = setInterval(function () {
            i++;move();
        }, 3000);
    });

    /*????????????????????????*/
    $(".case-num span").hover(function () {
        var index = $(this).index();
        $(".case-list").stop().animate({ left: -w * index + 'px' }, 500);
        $(this).addClass("on").siblings().removeClass("on");
    });

    /*????????????*/
    $(".arrow-left").click(function () {
        i--;
        move();
    });

    /*????????????*/
    $(".arrow-right").click(function () {
        i++;
        move();
    });

    var move = function () {
        if (i > size - 1) {
            $(".case-list").stop().animate({ left: 0 }, 500);
            i = 0;
        }
        if (i < 0) {
            $(".case-list").stop().animate({ left: -w * (size - 1) + 'px' }, 500);
            i = size - 1;
        }

        $(".case-list").stop().animate({ left: -w * i + 'px' }, 500);

        if (i > size - 1) {
            $(".case-num span").eq(0).addClass("on").siblings().removeClass("on");
        } else {
            $(".case-num span").eq(i).addClass("on").siblings().removeClass("on");
        }
    };
});
'use strict';

$(document).ready(function () {
    var path = window.location.href;

    // ?????? ?????????????????????????????????
    if (path.indexOf('wiki') > -1 || path.indexOf('scenes') > -1) {
        $('.scenes-box,.scenes-qr-box').on('click', function () {
            window.location.href = '/wiki/' + $(this).attr('url');
        });
    }
});
"use strict";

$(document).foundation();


// ?????? url params ????????????
$.extend({
    //???????????? name ??? cookie ???
    getCookie: function (name) {
        var ret = document.cookie.match(new RegExp('(?:^|;\\s)' + name + '=(.*?)(?:;\\s|$)'));
        return ret ? ret[1] : "";
    },

    //?????? cookie
    setCookie: function (name, value, expires, domain, path, secure) {
        var path = '/';
        var domain = domain || 'pingxx.com';

        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        expires && expires instanceof Date && (cookieText += "; expires=" + expires.toGMTString());
        path && (cookieText += "; path=" + path);
        domain && (cookieText += "; domain=" + domain);
        secure && (cookieText += "; secure");

        document.cookie = cookieText;

        return this;
    },

    getQueryParameters: function (str) {
        return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function (n) {
            return n = n.split("="), this[n[0]] = n[1], this;
        }.bind({}))[0];
    },

    randomString: function (len) {
        var len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = '';

        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }

        return pwd;
    },

    initReport: function () {
        var href = location.href,
            search = location.search || '',
            bd_vid = this.getQueryParameters().bd_vid || '',
            from = this.getQueryParameters().from || 2,
            desc = this.getQueryParameters().desc || '',
            sub_from = this.getQueryParameters().sub_from || '',
            source = this.getQueryParameters().source || '',
            plan = decodeURI(this.getQueryParameters().plan || ''),
            unit = decodeURI(this.getQueryParameters().unit || ''),
            keyword = decodeURI(this.getQueryParameters().keyword || ''),
            device = this.getQueryParameters().device || '',
            sem_track = "?source=" + source + "&plan=" + plan + "&unit=" + unit + "&keyword=" + keyword + "&device=" + device + "&bd_vid=" + bd_vid,
            puid = this.getCookie('puid') || '';

        var eqid = this.getQueryParameters(document.referrer.split('?')[1]).eqid || '';
        var date = new Date(new Date().getTime() + 10 * 365 * 86400000);
        var domain = location.hostname.replace('www.', '') || 'pingxx.com';

        search !== '' && this.setCookie('search', search, date, domain);

        this.setCookie('href', href, date, domain).setCookie('bd_vid', encodeURIComponent(bd_vid), date, domain).setCookie('eqid', eqid, date, domain);

        // ?????????????????? puid ??? cookie ???????????????doNothing, ???????????????cookie ?????????
        if (!puid) {
            if (/pingxx/.test(location.href)) {
                puid = this.randomString();

                this.setCookie('puid', puid, date, domain).setCookie('from', from, date, domain).setCookie('desc', desc, date, domain).setCookie('sub_from', sub_from, date, domain);
            }
        }

        if (/pingxx/.test(location.href)) {
            if (source || plan !== '' || unit !== '' || keyword !== '' || device) {
                this.setCookie('_sem_track', sem_track, date, domain);
            }
        }
    }

});

// ????????????????????????
$.fn.seamlessRolling = function (option) {
    function mixinsAnimationFrame(type) {
        if (type === 'request') {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                var currTime = +new Date(),
                    delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
                lastTime = currTime + delay;
                return setTimeout(callback, delay);
            };
        } else {
            return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
        }
    }

    function seamlessRolling($El, speed) {

        // ????????????
        var $items = $El,
            target = $items.width();

        // clone ??????
        $items.html($items.html() + $items.html());

        var timer = null,
            scrollX = 0;

        function adAni() {
            timer = nextFrame(function () {
                scrollX += speed;
                if (scrollX >= target) {
                    scrollX = 0;
                }
                $items.scrollLeft(scrollX);
                adAni();
            });
        }

        adAni();
    }

    // ???????????????????????????????????????, ????????? cancelFrame ??????
    var lastTime = 0,
        nextFrame = mixinsAnimationFrame('request'),
        cancelFrame = mixinsAnimationFrame();

    var _option = $.extend({
        speed: 2
    }, option);
    seamlessRolling(this, _option.speed);

    return this;
};

// ????????????jq ?????? - --- - : ?????????????????????????????????
$.fn.splide = function (option) {
    var _option = $.extend({
        num: 4
    }, option);

    var n = 0,
        _this = this;
    this.find('.arrow-s-r').click(function () {

        if (n == _option.num - 1) {
            n = -1;
        }
        n++;
        switchPic(n, this);
        return n;
    });
    this.find('.arrow-s-l').click(function () {
        if (n == 0) {
            n = _option.num;
        }
        n--;
        switchPic(n, this);
        return n;
    });

    function switchPic(n) {
        var w = 20.6 * n - 1.6;

        _this.find('.tab-outer-s').animate({ 'left': -w + 'em' }, 1000);
        _this.find('.scen-' + n).fadeIn(1000).siblings().fadeOut();
    }
};

// ui logic, animations and transitions
$(document).ready(function () {
    if (navigator.userAgent.match(/MicroMessenger/i)) {
        $('body').prepend('<div style=" overflow:hidden; width:0px; height:0; margin:0 auto; position:absolute; top:-800px;"><img src="/assets/img/wxshare.png"></div>');
    }

    $.initReport();

    //for mobile menu
    setMobileNav();

    if ($(window).width() > 760) {
        homepageTween();
        setStickyNavBar();
    }

    cmbIntroAnimate();
    // cue animations
    // animateHero();
    cubeAnimation();
    slideScene();

    // animate hero backgrounds
    setInterval(heroCoinDropAnimation, 500);
    setInterval(countdownDropAnimation, 1500);
    setInterval(uberTitleAnimation, 3000);

    // activate countdown
    $(".countdown-timer").countdown("2016/04/20 18:00:00", function (e) {
        var totalHours = e.offset.totalDays * 24 + e.offset.hours;
        $(this).find(".hours").text(totalHours);
        $(this).find(".minutes").text(e.strftime("%M"));
        $(this).find(".seconds").text(e.strftime("%S"));
    });

    var path = document.location.pathname.split('/');
    var page = path[path.length - 1];
    if (page.indexOf("html") > 0) {
        page = page.slice(0, -5);
    }
    if (page === "customers") {
        testimonialParallax();
        var $testimonialContent = $(".testimonial-content--new");

        $testimonialContent.isotope({
            itemSelector: ".testimonial-card",
            layoutMode: 'vertical',
            hiddenStyle: {
                opacity: 0
            },
            visibleStyle: {
                opacity: 1
            }
        });

        $('#industryFilters').on('click', 'a', function () {
            var filterValue = $(this).attr('data-filter');
            $('#industryFilters a').removeClass("active");
            $(this).addClass("active");
            $testimonialContent.isotope({
                filter: filterValue
            });
        });

        $('#productFilters').on('click', 'a', function () {
            var filterValue = $(this).attr('data-filter');
            $('#productFilters a').removeClass("active");
            $(this).addClass("active");
            $testimonialContent.isotope({
                filter: filterValue
            });
        });

        $("#panel1-label").click(function () {
            $("#industryFilters a.all").trigger("click");
        });

        $("#panel2-label").click(function () {
            $("#productFilters a.all").trigger("click");
        });

        var targets = document.location.hash.slice(1).split("&");
        var type = targets[0],
            filter = targets[1];
        if (type == "category") {
            $("#panel1-label").trigger("click");
            $("#industryFilters a." + filter).trigger("click");
        } else if (type == "product") {
            $("#panel2-label").trigger("click");
            $("#productFilters a." + filter).trigger("click");
        }
    } else if (page == "about") {
        if ($(window).width() > 770) {
            setStickyforPositon();
        }
    } else if (page == "career") {
        var updatePos = function (event) {
            var xPosition = event.pageX;
            var yPosition = event.pageY;
            var offsetX = xPosition - startX;
            var offsetY = yPosition - startY;
            if (offsetX > maxOffestx) offsetX = maxOffestx;
            if (offsetX > maxOffestx) offsetY = maxOffestx;
            var moveX = -(offsetX * 0.2);
            var moveY = -(offsetY * 0.2);
            var distanceX = moveX - lastMoveX;
            var distanceY = moveY - lastMoveY;
            lastMoveX = moveX;
            lastMoveY = moveY;
            if (distanceX > 60 || distanceY > 60) return;
            window.requestAnimationFrame(function () {
                $("#polygonContainer").css({
                    'transform': 'translate(' + moveX + 'px,' + moveY + 'px)'
                });
            });
        };

        slideViewbox();
        var winW = $(window).width();
        var rowCount = Math.ceil(winW / 300) + 2;
        var options = {
            container: $("#polygonContainer"),
            rowCount: rowCount
        };
        var polygon = new PolygonFactory(options);
        polygon.init().renderPolygon();
        var startX,
            startY,
            lastMoveX = 0,
            lastMoveY = 0,
            maxOffestx = 1200,
            minOffsetY = 2000;
        $('#polygonContainer').on('mouseenter', function (event) {
            startX = event.pageX;
            startY = event.pageY;
        });

        $('#polygonContainer').on('mousemove', function (event) {
            updatePos(event);
        });

        $("#hero .hero-copy").on('mousemove', function (event) {
            updatePos(event);
        });
    } else if (page === "product" || page === "products") {} else if (page === "contact") {

        if ($.getQueryParameters().purpose) {
            $('#to option[data-v=' + $.getQueryParameters().purpose + ']').prop('selected', true);
        }
    }

    // Smooth scroll to anchor
    $('.targetLink').on('click', function (e) {
        // prevent default action and bubbling
        e.preventDefault();
        e.stopPropagation();
        // set target to anchor's "href" attribute
        var target = $(this).attr('href');
        // scroll to each target
        $(target).velocity('scroll', {
            duration: 300,
            offset: -40,
            easing: 'linear'
        });
    });

});