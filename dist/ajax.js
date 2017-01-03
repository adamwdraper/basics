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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ajax {
  constructor() {

  }

  request(options) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let { data, method, url, headers } = options;

      // format data if it is an object
      if (data && typeof data === 'object') {
        switch (method) {
          case 'GET':
            url += '?' + Object.keys(data).map(function (key) {
              return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
            }).join('&');

            data = null;

            break;
          default:
            data = JSON.stringify(data);
        }
      }

      xhr.open(method, url);

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };

      // send json content on non GET calls
      if (method !== 'GET') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      }

      xhr.send(data);
    });
  }

  get(options) {
    if (typeof options === 'string') {
      options = {
        url: options
      };
    }

    options.method = 'GET';

    return this.request(options);
  }

  post(options) {
    options.method = 'POST';

    return this.request(options);
  }

  put(options) {
    options.method = 'PUT';

    return this.request(options);
  }

  delete(options) {
    options.method = 'DELETE';

    return this.request(options);
  }
}
/* harmony export (immutable) */ exports["default"] = Ajax;



/***/ }
/******/ ]);