"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeywordOnBlurModifier = exports.KeywordOnChangeModifier = undefined;

var _ComposeModifiers = require("./ComposeModifiers");

var _ComposeModifiers2 = _interopRequireDefault(_ComposeModifiers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates a CSV keyword modifier for modification on change.
 * Allows only letters, numbers, commas, dashes, spaces.
 *
 * @returns {function(string): string} Function that modifies keyword text by disallowing some characters
 */
function KeywordOnChangeModifier() {
  return function (text) {
    if (text == null) {
      return text;
    }
    return text.replace(/[^a-zA-Z0-9, -]/g, "");
  };
}

/**
 * Generates a CSV keyword modifier for modification on blur.
 * First applies KeywordOnChangeModifier.
 * Then, reformats valid keywords with ", " separator.
 *
 * @returns {function(string): string} Function that modifies keyword text by reformatting it
 */
function KeywordOnBlurModifier() {
  var reformatter = function reformatter(text) {
    if (text == null) {
      return text;
    }
    return text.split(",").map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return s.length;
    }).join(", ");
  };
  return (0, _ComposeModifiers2.default)(KeywordOnChangeModifier(), reformatter);
}

exports.KeywordOnChangeModifier = KeywordOnChangeModifier;
exports.KeywordOnBlurModifier = KeywordOnBlurModifier;