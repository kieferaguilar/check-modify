/**
 * Generates a CSV keyword checker that only allows only a specified number of keywords
 *
 * @param {number} [countLimit=8] Keyword count limit
 * @returns {function(string): boolean} Function that checks whether text has no more than countLimit keywords
 */
function KeywordCountChecker(countLimit = 8) {
  return function (text) {
    return text == null ||
      text.split(",")
        .map(s => s.trim())
        .filter(s => s.length)
      .length <= countLimit;
  }
}

/**
 * Generates a CSV keyword checker that enforces a character limit on each keyword
 *
 * @param {number} [characterLimit=30] Maximum character limit value
 * @returns {function(string): boolean} Function that checks whether text's keywords each has no more than characterLimit characters
 */
function KeywordLengthChecker(characterLimit = 30) {
  return function (text) {
    if (text == null) {
      return true;
    }
    const keywords = text.split(",");
    return keywords.map(s => s.trim())
      .reduce((result, next) => result && next.length <= characterLimit, true);
  }
}

export { KeywordCountChecker, KeywordLengthChecker };
