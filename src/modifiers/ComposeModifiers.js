/**
 * Composes list of string modifiers, in order
 *
 * @param {...function(string): string} modifiers Modifiers to compose
 * @returns {function(string): string} Composition of modifiers
 */
function composeModifiers(...modifiers) {
  return function (text) {
    return modifiers.reduce((result, next) => next(result), text);
  }
}

export default composeModifiers;
