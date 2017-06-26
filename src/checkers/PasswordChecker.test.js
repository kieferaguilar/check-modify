import PasswordChecker from './PasswordChecker';

it('rejects passwords less than 8 characters long', () => {
  const checker = PasswordChecker();
  expect(checker("a1b2c3d4")).toBe(true);
  expect(checker("a1b2c3d4e5")).toBe(true);
  expect(checker("a1b2c3d")).toBe(false);
  expect(checker("")).toBe(false);
  expect(checker(null)).toBe(false);
  expect(checker(undefined)).toBe(false);
});

it('rejects passwords not containing at least one letter', () => {
  const checker = PasswordChecker();
  expect(checker("a1234567")).toBe(true);
  expect(checker("1234567a")).toBe(true);
  expect(checker("12345678")).toBe(false);
  expect(checker("........")).toBe(false);
});

it('rejects passwords not containing at least one number', () => {
  const checker = PasswordChecker();
  expect(checker("1abcdefg")).toBe(true);
  expect(checker("abcdefg1")).toBe(true);
  expect(checker("abcdefgh")).toBe(false);
  expect(checker("........")).toBe(false);
});
