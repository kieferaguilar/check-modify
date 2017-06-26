import { LinkChecker, ShortenedLinkChecker}  from './LinkChecker';

describe('LinkChecker', () => {

  it('returns true on valid links', () => {
    const checker = LinkChecker();
    expect(checker("foo.bar")).toBe(true);
    expect(checker("www.foo.bar")).toBe(true);
    expect(checker("http://foo.com")).toBe(true);
    expect(checker("http://foo.com/bar")).toBe(true);
    expect(checker("http://foo.com/bar.baz")).toBe(true);
    expect(checker("https://foo.com")).toBe(true);
    expect(checker("https://foo.com/bar")).toBe(true);
    expect(checker("https://foo.com/bar.baz")).toBe(true);
    expect(checker("https://foo.com/bar.baz@foo.com")).toBe(true);
  });

  it('returns false on invalid links', () => {
    const checker = LinkChecker();
    expect(checker("ftp://foo.bar")).toBe(false);
    expect(checker("foo://foo.bar")).toBe(false);
    expect(checker("foo@bar.com")).toBe(false);
    expect(checker("foobar")).toBe(false);
    expect(checker("foo.")).toBe(false);
    expect(checker("foo<>bar.com")).toBe(false);
    expect(checker("foo\"\"bar.com")).toBe(false);
  });
});

describe('ShortenedLinkChecker', () => {

    it('returns false on common link shorteners', () => {
    const checker = ShortenedLinkChecker();
    expect(checker("https://t.co/123")).toBe(false);
    expect(checker("https://www.t.co/123")).toBe(false);
    expect(checker("t.co/123")).toBe(false);

    expect(checker("t.com/123")).toBe(true);
    expect(checker("not.co/123")).toBe(true);
    expect(checker("t.co.foo/123")).toBe(true);
  });
});
