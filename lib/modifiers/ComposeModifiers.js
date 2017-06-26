"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Composes list of string modifiers, in order
 *
 * @param {...function(string): string} modifiers Modifiers to compose
 * @returns {function(string): string} Composition of modifiers
 */
function composeModifiers() {
  for (var _len = arguments.length, modifiers = Array(_len), _key = 0; _key < _len; _key++) {
    modifiers[_key] = arguments[_key];
  }

  return function (text) {
    return modifiers.reduce(function (result, next) {
      return next(result);
    }, text);
  };
}

exports.default = composeModifiers;