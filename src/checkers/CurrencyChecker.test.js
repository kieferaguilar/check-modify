import CurrencyChecker from './CurrencyChecker';

it('disallows non-currency related characters', () => {
  const checker = CurrencyChecker();
  expect(checker(" 3 3,,.,.,.3 3")).toBe(true);
  expect(checker("3,000.00")).toBe(true);
  expect(checker("3.000,00")).toBe(true);
  expect(checker("3")).toBe(true);
  expect(checker("3.0")).toBe(true);
  expect(checker("3.00")).toBe(true);

  expect(checker(" 3 3,,.,.,.3 3")).toBe(true);
  expect(checker("$3")).toBe(false);
  expect(checker("-3")).toBe(false);
  expect(checker("a3.00")).toBe(false);
  expect(checker("3:00")).toBe(false);

  expect(checker("")).toBe(true);
  expect(checker(null)).toBe(true);
  expect(checker(undefined)).toBe(true);
});

it('enforces 16 character limit', () => {
  const checker = CurrencyChecker();
  expect(checker("123,567,901,345,")).toBe(true);
  expect(checker("123,567,901,345,7")).toBe(false);
});
