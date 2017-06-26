"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Generates character limit maximum checker
 *
 * @param {number} limit Maximum character limit value
 * @returns {function(string): boolean} Function that checks text length is less than limit
 */
function CharacterLimitChecker(limit) {
  return function (text) {
    return limit <= 0 || text == null || text.length <= limit;
  };
}

/**
 * Generates character limit minimum checker
 *
 * @param {number} limit Minimum character limit value
 * @returns {function(string): boolean} Function that checks text length is at least limit
 */
function MinimumCharacterLimitChecker(limit) {
  return function (text) {
    return text == null ? limit <= 0 : text.length >= limit;
  };
}

exports.CharacterLimitChecker = CharacterLimitChecker;
exports.MinimumCharacterLimitChecker = MinimumCharacterLimitChecker;