/**
 * Composes list of string checkers
 *
 * @param {...function(string): boolean} checkers Checker functions to be composed
 * @returns {function(string): boolean} Composition result
 */
function composeCheckers(...checkers) {
  return function (text) {
    return checkers.reduce((result, next) => result && next(text), true);
  }
}

export default composeCheckers;
