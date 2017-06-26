"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortenedLinkChecker = exports.LinkChecker = undefined;

var _EmailChecker = require("./EmailChecker");

var _EmailChecker2 = _interopRequireDefault(_EmailChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generates link checker
 *
 * @returns {function(string): boolean} Function that checks whether text is a link
 */
function LinkChecker() {
  return function (text) {
    // Disallow valid emails
    var emailChecker = (0, _EmailChecker2.default)();
    if (emailChecker(text)) {
      return false;
    }

    // Copyright (c) 2010-2013 Diego Perini, MIT licensed
    // https://gist.github.com/dperini/729294
    // Modified to disallow ftp protocol, and to make protocol optional
    var linkRegex = /^(?:(?:(?:https?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    return linkRegex.test(text);
  };
}

/**
 * Generates link checker disallowing shortened links (e.g. t.co)
 *
 * @returns {function(string): boolean} Function that checks whether text is NOT a shortened link
 */
function ShortenedLinkChecker() {
  return function (text) {
    var domain = text.replace(/^(?:(?:(?:https?):)?\/\/)/i, "").split("/").filter(function (s) {
      return s.length;
    })[0].split(".").slice(-2).join(".");

    var shortURLDomains = new Set(["t.co", "goo.gl", "bit.ly", "amzn.to", "tinyurl.com", "ow.ly", "youtu.be"]);
    return !shortURLDomains.has(domain);
  };
}

exports.LinkChecker = LinkChecker;
exports.ShortenedLinkChecker = ShortenedLinkChecker;