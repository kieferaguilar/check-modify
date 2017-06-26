"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Generates a CSV keyword checker that only allows only a specified number of keywords
 *
 * @param {number} [countLimit=8] Keyword count limit
 * @returns {function(string): boolean} Function that checks whether text has no more than countLimit keywords
 */
function KeywordCountChecker() {
  var countLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

  return function (text) {
    return text == null || text.split(",").map(function (s) {
      return s.trim();
    }).filter(function (s) {
      return s.length;
    }).length <= countLimit;
  };
}

/**
 * Generates a CSV keyword checker that enforces a character limit on each keyword
 *
 * @param {number} [characterLimit=30] Maximum character limit value
 * @returns {function(string): boolean} Function that checks whether text's keywords each has no more than characterLimit characters
 */
function KeywordLengthChecker() {
  var characterLimit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;

  return function (text) {
    if (text == null) {
      return true;
    }
    var keywords = text.split(",");
    return keywords.map(function (s) {
      return s.trim();
    }).reduce(function (result, next) {
      return result && next.length <= characterLimit;
    }, true);
  };
}

exports.KeywordCountChecker = KeywordCountChecker;
exports.KeywordLengthChecker = KeywordLengthChecker;