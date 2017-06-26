import composeModifiers from './ComposeModifiers';
import CharacterLimitModifier from './CharacterLimitModifier';

/**
 * Generates a zip code modifier for modification on change.
 * First, strips all characters except numbers and "-".
 * Then, limits to 10 characters.
 * e.g. "a12b345.67-890" --> "1234567-89"
 *
 * @returns {function(string): string} Function that modifies zip code text by disallowing characters
 */
function ZipCodeOnChangeModifier() {
  const characterEliminator = (text) => {
    if (text == null) {
      return text;
    }
    return text.replace(/[^\d-]/g, "");
  };

  const limit = 10;
  return composeModifiers(characterEliminator, CharacterLimitModifier(limit));
}

/**
 * Generates a zip code modifier for modification on blur.
 * First, applies ZipCodeOnChangeModifier.
 * Then, keeps up to 5 numeric characters preceeding the first "-".
 * e.g. "123456-789" --> "12345"
 * e.g. "123-456789" --> "123"
 *
 * @returns {function(string): string} Function that modifies zip code text by reformatting and truncating it
 */
function ZipCodeOnBlurModifier() {
  const preceedingHyphen = (text) => {
    if (text == null) {
      return text;
    }
    return text.split("-")[0];
  };
  const limit = 5;
  return composeModifiers(
    ZipCodeOnChangeModifier(),
    preceedingHyphen,
    CharacterLimitModifier(limit)
  );
}

export { ZipCodeOnChangeModifier, ZipCodeOnBlurModifier };
