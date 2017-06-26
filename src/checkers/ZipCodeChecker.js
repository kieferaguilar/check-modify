/**
 * Generates a 5-digit zip code checker
 *
 * @returns {function(string): boolean} Function that checks whether text is a valid zip code
 */
function ZipCodeChecker() {
  return function (text) {
    return text != null && /^[\d]{5}$/g.test(text);
  }
}

export default ZipCodeChecker;
