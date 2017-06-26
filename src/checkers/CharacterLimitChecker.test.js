import { CharacterLimitChecker, MinimumCharacterLimitChecker } from './CharacterLimitChecker';

describe('CharacterLimitChecker', () => {
  
  it('returns true only if text is within character limit', () => {
    const checker = CharacterLimitChecker(5);
    expect(checker("123456789")).toBe(false);
    expect(checker("12345")).toBe(true);
    expect(checker("123")).toBe(true);
    expect(checker("")).toBe(true);
    expect(checker(null)).toBe(true);
    expect(checker(undefined)).toBe(true);
  });

  it('returns true when limit is non-positive', () => {
    const negativeChecker = CharacterLimitChecker(-1);
    expect(negativeChecker("123456789")).toBe(true);

    const zeroChecker = CharacterLimitChecker(0);
    expect(zeroChecker("123456789")).toBe(true);
  });
});

describe('MinimumCharacterLimitChecker', () => {
  
  it('returns true only if text is beyond minimum character limit', () => {
    const checker = MinimumCharacterLimitChecker(5);
    expect(checker("123456789")).toBe(true);
    expect(checker("12345")).toBe(true);
    expect(checker("123")).toBe(false);
    expect(checker("")).toBe(false);
    expect(checker(null)).toBe(false);
    expect(checker(undefined)).toBe(false);
  });

  it('returns true if text is null/undefined and limit is non-positive', () => {
    const negativeChecker = MinimumCharacterLimitChecker(-1);
    expect(negativeChecker("")).toBe(true);
    expect(negativeChecker(null)).toBe(true);
    expect(negativeChecker(undefined)).toBe(true);

    const zeroChecker = MinimumCharacterLimitChecker(0);
    expect(zeroChecker("")).toBe(true);
    expect(zeroChecker(null)).toBe(true);
    expect(zeroChecker(undefined)).toBe(true);
  });
});

