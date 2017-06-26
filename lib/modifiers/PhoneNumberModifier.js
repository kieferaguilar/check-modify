'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneNumberOnBlurModifier = exports.PhoneNumberOnChangeModifier = undefined;

var _ComposeModifiers = require('./ComposeModifiers');

var _ComposeModifiers2 = _interopRequireDefault(_ComposeModifiers);

var _CharacterLimitModifier = require('./CharacterLimitModifier');

var _CharacterLimitModifier2 = _interopRequireDefault(_CharacterLimitModifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates a phone number modifier for modification on change.
 * First, strips all characters except numbers, "-", " ", "(", and ")".
 * Then, limits to 18 characters.
 *
 * @returns {function(string): string} Function that modifies phone number text by disallowing characters
 */
function PhoneNumberOnChangeModifier() {
  var characterEliminator = function characterEliminator(text) {
    if (text == null) {
      return text;
    }
    return text.replace(/[^\d-() ]/g, "");
  };

  var limit = 18;
  return (0, _ComposeModifiers2.default)(characterEliminator, (0, _CharacterLimitModifier2.default)(limit));
}

/**
 * Generates a phone number modifier for modification on blur.
 * First, applies PhoneNumberOnChangeModifier.
 * Then, if there are exactly 10 numeric characters, it formats it.
 * e.g. "123-78(9)" --> "123-78(9)"
 * e.g. "123-4567890" --> "(123) 456-7890"
 *
 * @returns {function(string): string} Function that modifies phone number text by reformatting it
 */
function PhoneNumberOnBlurModifier() {
  var formatTenNumbers = function formatTenNumbers(text) {
    if (text == null) {
      return text;
    }

    var phoneDigits = 10;
    var numericCharacters = text.replace(/\D/g, "");
    if (numericCharacters.length !== phoneDigits) {
      return text;
    }

    var areaCode = numericCharacters.substring(0, 3);
    var localPrefix = numericCharacters.substring(3, 6);
    var localSuffix = numericCharacters.substring(6, 10);
    return '(' + areaCode + ') ' + localPrefix + '-' + localSuffix;
  };
  return (0, _ComposeModifiers2.default)(PhoneNumberOnChangeModifier(), formatTenNumbers);
}

exports.PhoneNumberOnChangeModifier = PhoneNumberOnChangeModifier;
exports.PhoneNumberOnBlurModifier = PhoneNumberOnBlurModifier;