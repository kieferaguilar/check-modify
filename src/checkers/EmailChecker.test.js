import EmailChecker from './EmailChecker';

it('returns true on valid emails', () => {
  const checker = EmailChecker();
  expect(checker("foo.bar123@baz.com")).toBe(true);
  expect(checker("foo.bar123+foobar456@baz.com")).toBe(true);
  expect(checker("foo.bar@foo.bar.com")).toBe(true);
});

it('returns false on invalid emails', () => {
  const checker = EmailChecker();
  expect(checker("foo.bar.com")).toBe(false);
  expect(checker("foo.bar@baz")).toBe(false);
  expect(checker("@baz.com")).toBe(false);
  expect(checker("foo@.com")).toBe(false);
  expect(checker("foo@bar.")).toBe(false);
  expect(checker("foo<>bar@baz.com")).toBe(false);
  expect(checker("foo\"\"bar@baz.com")).toBe(false);
});
