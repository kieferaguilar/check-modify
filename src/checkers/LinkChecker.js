import EmailChecker from './EmailChecker';

/**
 * Generates link checker
 *
 * @returns {function(string): boolean} Function that checks whether text is a link
 */
function LinkChecker() {
  return function (text) {
    // Disallow valid emails
    const emailChecker = EmailChecker();
    if (emailChecker(text)) {
      return false;
    }
    
    // Copyright (c) 2010-2013 Diego Perini, MIT licensed
		// https://gist.github.com/dperini/729294
    // Modified to disallow ftp protocol, and to make protocol optional
    const linkRegex = /^(?:(?:(?:https?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    return linkRegex.test(text);
  }
}

/**
 * Generates link checker disallowing shortened links (e.g. t.co)
 *
 * @returns {function(string): boolean} Function that checks whether text is NOT a shortened link
 */
function ShortenedLinkChecker() {
  return function (text) {
    const domain = text.replace(/^(?:(?:(?:https?):)?\/\/)/i, "")
      .split("/")
      .filter(s => s.length)[0]
      .split(".")
      .slice(-2)
      .join(".");

    const shortURLDomains = new Set(["t.co", "goo.gl", "bit.ly", "amzn.to", "tinyurl.com", "ow.ly", "youtu.be"]);
    return !shortURLDomains.has(domain);
  }
}

export { LinkChecker, ShortenedLinkChecker };
