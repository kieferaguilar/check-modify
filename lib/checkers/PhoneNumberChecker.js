"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Generates a 10-digit phone number checker
 *
 * @returns {function(string): boolean} Function that checks whether text is a valid phone number
 */
function PhoneNumberChecker() {
  return function (text) {
    if (text == null) {
      return false;
    }
    var numericCharacters = text.replace(/\D/g, "");
    return (/^[\d]{10}$/g.test(numericCharacters)
    );
  };
}

exports.default = PhoneNumberChecker;