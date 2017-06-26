import ZipCodeChecker from './ZipCodeChecker';

it('checks for a 5 digit numeric zip code', () => {
  const checker = ZipCodeChecker();
  expect(checker("12345")).toBe(true);
  expect(checker("01234")).toBe(true);
  expect(checker("1234")).toBe(false);
  expect(checker("123456")).toBe(false);
  expect(checker("01234-")).toBe(false);
  expect(checker("a1234")).toBe(false);
  expect(checker("")).toBe(false);
  expect(checker(null)).toBe(false);
  expect(checker(undefined)).toBe(false);
});
