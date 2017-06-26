'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZipCodeOnBlurModifier = exports.ZipCodeOnChangeModifier = undefined;

var _ComposeModifiers = require('./ComposeModifiers');

var _ComposeModifiers2 = _interopRequireDefault(_ComposeModifiers);

var _CharacterLimitModifier = require('./CharacterLimitModifier');

var _CharacterLimitModifier2 = _interopRequireDefault(_CharacterLimitModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates a zip code modifier for modification on change.
 * First, strips all characters except numbers and "-".
 * Then, limits to 10 characters.
 * e.g. "a12b345.67-890" --> "1234567-89"
 *
 * @returns {function(string): string} Function that modifies zip code text by disallowing characters
 */
function ZipCodeOnChangeModifier() {
  var characterEliminator = function characterEliminator(text) {
    if (text == null) {
      return text;
    }
    return text.replace(/[^\d-]/g, "");
  };

  var limit = 10;
  return (0, _ComposeModifiers2.default)(characterEliminator, (0, _CharacterLimitModifier2.default)(limit));
}

/**
 * Generates a zip code modifier for modification on blur.
 * First, applies ZipCodeOnChangeModifier.
 * Then, keeps up to 5 numeric characters preceeding the first "-".
 * e.g. "123456-789" --> "12345"
 * e.g. "123-456789" --> "123"
 *
 * @returns {function(string): string} Function that modifies zip code text by reformatting and truncating it
 */
function ZipCodeOnBlurModifier() {
  var preceedingHyphen = function preceedingHyphen(text) {
    if (text == null) {
      return text;
    }
    return text.split("-")[0];
  };
  var limit = 5;
  return (0, _ComposeModifiers2.default)(ZipCodeOnChangeModifier(), preceedingHyphen, (0, _CharacterLimitModifier2.default)(limit));
}

exports.ZipCodeOnChangeModifier = ZipCodeOnChangeModifier;
exports.ZipCodeOnBlurModifier = ZipCodeOnBlurModifier;