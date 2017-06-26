import composeModifiers from './ComposeModifiers';

/**
 * Generates a CSV keyword modifier for modification on change.
 * Allows only letters, numbers, commas, dashes, spaces.
 *
 * @returns {function(string): string} Function that modifies keyword text by disallowing some characters
 */
function KeywordOnChangeModifier() {
  return function (text) {
    if (text == null) {
      return text;
    }
    return text.replace(/[^a-zA-Z0-9, -]/g, "");
  }
}

/**
 * Generates a CSV keyword modifier for modification on blur.
 * First applies KeywordOnChangeModifier.
 * Then, reformats valid keywords with ", " separator.
 *
 * @returns {function(string): string} Function that modifies keyword text by reformatting it
 */
function KeywordOnBlurModifier() {
  const reformatter = (text) => {
      if (text == null) {
        return text;
      }
      return text.split(",")
        .map(s => s.trim())
        .filter(s => s.length)
        .join(", ");
    };
  return composeModifiers(KeywordOnChangeModifier(), reformatter);
}

export { KeywordOnChangeModifier, KeywordOnBlurModifier };
