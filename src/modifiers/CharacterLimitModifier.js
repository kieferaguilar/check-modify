/**
 * Generates character limit modifier
 *
 * @param {number} limit Maximum character limit value
 * @returns {function(string): string} Function that truncates text length to limit
 */
function CharacterLimitModifier(limit) {
  return function (text) {
    if (limit <= 0 || text == null) {
      return text;
    }
    return text.substring(0, limit);
  }
}

export default CharacterLimitModifier;
