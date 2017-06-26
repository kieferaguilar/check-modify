/**
 * Generates password checker
 * Passwords must:
 *    - be at least 8 characters long
 *    - contain at least one number
 *    - contain at least 1 letter
 *
 * @returns {function(string): boolean} Function that checks whether text is a valid password
 */
function PasswordChecker() {
  return function (text) {
    const minPasswordLength = 8;
    return text != null &&
      text.length >= minPasswordLength &&
      /(?=.*[A-Za-z])(?=.*\d)/g.test(text);
  }
}

export default PasswordChecker;
