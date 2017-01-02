/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_router__ = __webpack_require__(1);


describe('Router', function() {
  let router;

  beforeEach(function() {
    router = new __WEBPACK_IMPORTED_MODULE_0__src_router__["a" /* default */]({
      root: '/mocha',
      routes: {
        '/': 'home',
        '/one': 'one',
        '/two(/:id)': 'two',
        '/three': 'three',
        '/^\/f/': 'four',
        '*': 'notFound'
      },
      callbacks: {
        home() {},
        one() {},
        two() {},
        three() {},
        four() {},
        notFound() {}
      }
    });
  });

  afterEach(function() {
    router = null;
  });

  describe('construction', function() {
    it('should construct', function() {
      expect(router).to.be.an('object');
    });
  });

  describe('routes', function() {
    it('should route to home', function() {
      sinon.spy(router.callbacks, 'home');

      router.start();

      expect(router.callbacks.home.calledOnce).to.be.true;
    });
  });

  describe('fragments', function() {
    it('should generate fragment path', function() {
      const paths = {
        '/': '/',
        'path': '/path',
        '/path': '/path',
        '/path/path2': '/path/path2'
      };
      const rootPaths = {
        '/': '/root',
        'path': '/root/path',
        '/path': '/root/path',
        '/path/path2': '/root/path/path2'
      };

      // test with / as root
      router.root = '/';

      for (let path in paths) {
        expect(router._createPath(path)).to.equal(paths[path]);
      }

      // test with a root
      router.root = '/root';
      for (let path in rootPaths) {
        expect(router._createPath(path)).to.equal(rootPaths[path]);
      }
    });
  });
});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Router {
  constructor(options = {}) {
    this._regExp = {
      default: /^[*]$/,
      regExp: /^\/.+\/$/,
      slashes: /(^\/)|(\/$)/g,
      optional: /\((.*?)\)/g,
      named: /(\(\?)?:\w+/g,
      splat: /\*\w+/g,
      escape: /[\-{}\[\]+?.,\\\^$|#\s]/g
    };
    this._routes = [];

    this.root = options.root || '/';
    this.routes = options.routes || {
      '*': 'action'
    };
    this.callbacks = options.callbacks || {
      action() {}
    };

    this._processRoutes();

    this.setup();
  }

  // internal functions
  _processRoutes() {
    for (let route in this.routes) {
      this._routes.push({
        route,
        regExp: this._regExp.regExp.test(route) ? new RegExp(this._trimSlashes(route)) : this._routeToRegExp(route),
        callback: this.routes[route]
      });
    }
  }

  _trimSlashes(string) {
    return string.replace(this._regExp.slashes, '');
  }

  _routeToRegExp(route) {
    let regExp;

    if (route === '*') {
      regExp = this._regExp.default;
    } else {
      route = route.replace(this._regExp.escape, '\\$&')
        .replace(this._regExp.optional, '(?:$1)?')
        .replace(this._regExp.named, function(match, optional) {
         return optional ? match : '([^/?]+)';
        })
        .replace(this._regExp.splat, '([^?]*?)');

      regExp = new RegExp(`^${route}$`);
    }

    return regExp;
  }

  _getFragment() {
    const uri = decodeURI(location.pathname);
    const fragment = this.root !== '/' ? uri.replace(this.root, '') : uri;

    return fragment || '/';
  }

  _getParameters(route, fragment) {
    const args = route.regExp.exec(fragment);

    return args ? args.slice(1) : [];
  }

  _createPath(fragment) {
    let path = [];

    if (this.root !== '/') {
      path.push(this._trimSlashes(this.root));
    }

    if (fragment && fragment !== '/') {
      path.push(this._trimSlashes(fragment));
    }

    return `/${path.join('/')}`;
  }

  _route() {
    const fragment = this._getFragment();

    this._execute(fragment);
  }

  _execute(fragment) {
    let callback;
    let args;

    for (let route of this._routes) {
      if (route.regExp.test(fragment) || route.route === '*') {
        args = this._getParameters(route, fragment);

        callback = this.callbacks[route.callback];

        break;
      }
    }

    if (callback) {
      callback.apply(this, args);
    } else {
      throw new Error(`No route found for '${fragment}'`);
    }
  }

  // api
  setup() {

  }

  start() {
    this._route();

    window.onpopstate = () => {
      this._route();
    };
  }

  go(fragment) {
    const path = this._createPath(fragment);

    window.history.pushState({}, '', path);

    this._route();
  }

  back() {
    window.history.back();
  }
}
/* harmony export (immutable) */ exports["a"] = Router;



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(0);



/***/ }
/******/ ]);