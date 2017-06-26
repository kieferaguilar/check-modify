import { CharacterLimitChecker } from './CharacterLimitChecker';
import composeCheckers from './ComposeCheckers';

/**
 * Generates a currency checker that allows only numbers, commas, periods, spaces
 * Also, disallows more than 16 characters
 *
 * @returns {function(string): boolean} Function that checks whether text is a currency value
 */
function CurrencyChecker() {
  const disallowCharacters = (text) => {
    if (text == null) {
      return true;
    }
    return /^[0-9,. ]*$/g.test(text);
  }
  
  const limit = 16;
  return composeCheckers(CharacterLimitChecker(limit), disallowCharacters);
}

export default CurrencyChecker;
