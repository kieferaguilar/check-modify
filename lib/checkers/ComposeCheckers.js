"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Composes list of string checkers
 *
 * @param {...function(string): boolean} checkers Checker functions to be composed
 * @returns {function(string): boolean} Composition result
 */
function composeCheckers() {
  for (var _len = arguments.length, checkers = Array(_len), _key = 0; _key < _len; _key++) {
    checkers[_key] = arguments[_key];
  }

  return function (text) {
    return checkers.reduce(function (result, next) {
      return result && next(text);
    }, true);
  };
}

exports.default = composeCheckers;