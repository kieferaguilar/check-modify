import CharacterLimitModifier from './CharacterLimitModifier';

it('returns truncated string', () => {
  const validator = CharacterLimitModifier(5);
  expect(validator("123456789")).toBe("12345");
});

it('returns null/undefined when string is null/undefined', () => {
  const validator = CharacterLimitModifier(5);
  expect(validator(null)).toBe(null);
  expect(validator(undefined)).toBe(undefined);
});

it('returns same string when limit is non-positive', () => {
  const negativeValidator = CharacterLimitModifier(-1);
  expect(negativeValidator("123456789")).toBe("123456789");

  const zeroValidator = CharacterLimitModifier(0);
  expect(zeroValidator("123456789")).toBe("123456789");
});

it('returns same string when limit is smaller than text length', () => {
  const negativeValidator = CharacterLimitModifier(20);
  expect(negativeValidator("123456789")).toBe("123456789");
});
