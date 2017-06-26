import PhoneNumberChecker from './PhoneNumberChecker';

it('returns true for any string with exactly 10 numeric characters', () => {
  const checker = PhoneNumberChecker();
  expect(checker("1234567890")).toBe(true);
  expect(checker("1a2b3c4.5-6(7)8,9:0")).toBe(true);
  expect(checker("12345678901")).toBe(false);
  expect(checker("123456789")).toBe(false);
  expect(checker("a123456789")).toBe(false);
  expect(checker("")).toBe(false);
  expect(checker(null)).toBe(false);
  expect(checker(undefined)).toBe(false);
});
