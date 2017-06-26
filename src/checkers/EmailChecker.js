/**
 * Generates email checker
 *
 * @returns {function(string): boolean} Function that checks whether text is an email
 */
function EmailChecker() {
  return function (text) {
    // Slightly modified from https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
    const whatwgEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    
    // Be slightly more strict, disallowing "foo@bar"
    const stricterEmailRegex = /^.+@.+\..+$/g;

    return whatwgEmailRegex.test(text) &&
      stricterEmailRegex.test(text);
  }
}

export default EmailChecker;
