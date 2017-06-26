"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Generates email checker
 *
 * @returns {function(string): boolean} Function that checks whether text is an email
 */
function EmailChecker() {
  return function (text) {
    // Slightly modified from https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
    var whatwgEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Be slightly more strict, disallowing "foo@bar"
    var stricterEmailRegex = /^.+@.+\..+$/g;

    return whatwgEmailRegex.test(text) && stricterEmailRegex.test(text);
  };
}

exports.default = EmailChecker;