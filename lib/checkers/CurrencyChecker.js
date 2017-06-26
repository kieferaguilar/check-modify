'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CharacterLimitChecker = require('./CharacterLimitChecker');

var _ComposeCheckers = require('./ComposeCheckers');

var _ComposeCheckers2 = _interopRequireDefault(_ComposeCheckers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates a currency checker that allows only numbers, commas, periods, spaces
 * Also, disallows more than 16 characters
 *
 * @returns {function(string): boolean} Function that checks whether text is a currency value
 */
function CurrencyChecker() {
  var disallowCharacters = function disallowCharacters(text) {
    if (text == null) {
      return true;
    }
    return (/^[0-9,. ]*$/g.test(text)
    );
  };

  var limit = 16;
  return (0, _ComposeCheckers2.default)((0, _CharacterLimitChecker.CharacterLimitChecker)(limit), disallowCharacters);
}

exports.default = CurrencyChecker;