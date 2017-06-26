import composeModifiers from './ComposeModifiers';
import CharacterLimitModifier from './CharacterLimitModifier';


/**
 * Generates a phone number modifier for modification on change.
 * First, strips all characters except numbers, "-", " ", "(", and ")".
 * Then, limits to 18 characters.
 *
 * @returns {function(string): string} Function that modifies phone number text by disallowing characters
 */
function PhoneNumberOnChangeModifier() {
  const characterEliminator = (text) => {
    if (text == null) {
      return text;
    }
    return text.replace(/[^\d-() ]/g, "");
  };

  const limit = 18;
  return composeModifiers(characterEliminator, CharacterLimitModifier(limit));
}



/**
 * Generates a phone number modifier for modification on blur.
 * First, applies PhoneNumberOnChangeModifier.
 * Then, if there are exactly 10 numeric characters, it formats it.
 * e.g. "123-78(9)" --> "123-78(9)"
 * e.g. "123-4567890" --> "(123) 456-7890"
 *
 * @returns {function(string): string} Function that modifies phone number text by reformatting it
 */
function PhoneNumberOnBlurModifier() {
  const formatTenNumbers = (text) => {
    if (text == null) {
      return text;
    }

    const phoneDigits = 10;
    const numericCharacters = text.replace(/\D/g, "");
    if (numericCharacters.length !== phoneDigits) {
      return text;
    }

    const areaCode = numericCharacters.substring(0, 3);
    const localPrefix = numericCharacters.substring(3, 6);
    const localSuffix= numericCharacters.substring(6, 10);
    return `(${areaCode}) ${localPrefix}-${localSuffix}`
  };
  return composeModifiers(
    PhoneNumberOnChangeModifier(),
    formatTenNumbers
  );
}

export { PhoneNumberOnChangeModifier, PhoneNumberOnBlurModifier };
