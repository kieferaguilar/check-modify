"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrencyOnBlurModifier = exports.CurrencyOnChangeModifier = undefined;

var _ComposeModifiers = require("./ComposeModifiers");

var _ComposeModifiers2 = _interopRequireDefault(_ComposeModifiers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addCommas(text) {
  return text.replace(/(\d)(?=(\d{3})+(?:\.\d*)?$)/g, "$1,");
}

function reverseString(s) {
  return s.split("").reverse().join("");
}

/**
 * Generates a currency modifier to enforce some basic sensibility on change.
 * First, strips commas, spaces, and all periods but the last.
 * Then, inserts commas relative to the last period (if any).
 * Then, strips all characters after the last period except two numbers.
 *
 * @returns {function(string): string} Function that modifies currency value text
 */
function CurrencyOnChangeModifier() {
  return function (text) {
    if (text == null) {
      return text;
    }
    var tokens = reverseString(text.replace(/[, ]/g, "")).split(".");
    var hasDollarsOnly = tokens.length === 1;
    var cents = hasDollarsOnly ? "" : reverseString(tokens[0]).substring(0, 2);
    var reversedDollars = hasDollarsOnly ? tokens[0] : tokens.slice(1).join("");
    var dollars = addCommas(reverseString(reversedDollars));
    return tokens.length === 1 ? dollars : dollars + "." + cents;
  };
}

/**
 * Generates a currency modifier that properly formats the currency value on blur.
 * First, applies the CurrencyOnChangeModifier.
 * Then, adds a decimal point if needed, and fills out any missing zeros.
 * Then, limits value to 9,999,999.99.
 *
 * @param {number} maxValue Highest allowed currency value
 * @returns {function(string): string} Function that modifies currency value text
 */
function CurrencyOnBlurModifier() {
  var maxValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9999999.99;

  var formatter = function formatter(text) {
    if (text == null || text === "") {
      return text;
    }

    var currencyValue = parseFloat(text.replace(/(^0*|,)/g, ""));
    var finalValue = Math.min(currencyValue, maxValue);
    return addCommas(finalValue.toFixed(2));
  };
  return (0, _ComposeModifiers2.default)(CurrencyOnChangeModifier(), formatter);
}

exports.CurrencyOnChangeModifier = CurrencyOnChangeModifier;
exports.CurrencyOnBlurModifier = CurrencyOnBlurModifier;