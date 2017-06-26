import composeModifiers from './ComposeModifiers';

function addCommas(text) {
  return text.replace(/(\d)(?=(\d{3})+(?:\.\d*)?$)/g, "$1,");
}

function reverseString(s) {
  return s.split("").reverse().join("")
}

/**
 * Generates a currency modifier to enforce some basic sensibility on change.
 * First, strips commas, spaces, and all periods but the last.
 * Then, inserts commas relative to the last period (if any).
 * Then, strips all characters after the last period except two numbers.
 *
 * @returns {function(string): string} Function that modifies currency value text
 */
function CurrencyOnChangeModifier() {
  return function (text) {
    if (text == null) {
      return text;
    }
    const tokens = reverseString(text.replace(/[, ]/g, "")).split(".");
    const hasDollarsOnly = tokens.length === 1;
    const cents = hasDollarsOnly ? "" : reverseString(tokens[0]).substring(0, 2);
    const reversedDollars = hasDollarsOnly ? tokens[0] : tokens.slice(1).join("");
    const dollars = addCommas(reverseString(reversedDollars));
    return tokens.length === 1 ? dollars : `${dollars}.${cents}`;
  }
}

/**
 * Generates a currency modifier that properly formats the currency value on blur.
 * First, applies the CurrencyOnChangeModifier.
 * Then, adds a decimal point if needed, and fills out any missing zeros.
 * Then, limits value to 9,999,999.99.
 *
 * @param {number} maxValue Highest allowed currency value
 * @returns {function(string): string} Function that modifies currency value text
 */
function CurrencyOnBlurModifier(maxValue = 9999999.99) {
  const formatter = (text) => {
    if (text == null || text === "") {
      return text;
    }

    const currencyValue = parseFloat(text.replace(/(^0*|,)/g, ""));
    const finalValue = Math.min(currencyValue, maxValue);
    return addCommas(finalValue.toFixed(2));
  };
  return composeModifiers(CurrencyOnChangeModifier(), formatter);
}

export { CurrencyOnChangeModifier, CurrencyOnBlurModifier };
