import { KeywordCountChecker, KeywordLengthChecker } from './KeywordChecker';

describe('KeywordCountChecker', () => {

  it('allows up to specified number of keywords', () => {
    const checker = KeywordCountChecker(5);
    expect(checker("1,2")).toBe(true);
    expect(checker(" ,1,2 , , 3,4,5, ")).toBe(true);
    expect(checker("1,2,3,4,5,6")).toBe(false);

    expect(checker("")).toBe(true);
    expect(checker(" ")).toBe(true);
    expect(checker(null)).toBe(true);
    expect(checker(undefined)).toBe(true);
  });

  it('by default, allows up to 8 keywords', () => {
    const checker = KeywordCountChecker();
    expect(checker(" ,1 ,2,3, , 4,5,6,7,8, ")).toBe(true);
    expect(checker("1,2,3,4,5,6,7,8,9")).toBe(false);
  });
});

describe('KeywordLengthChecker', () => {

  it('enforces character limit on each keyword', () => {
    const checker = KeywordLengthChecker(3);
    expect(checker("123 , 321,   1,    ,   2 ")).toBe(true);
    expect(checker("1234")).toBe(false);

    expect(checker("")).toBe(true);
    expect(checker(" ")).toBe(true);
    expect(checker(null)).toBe(true);
    expect(checker(undefined)).toBe(true);
  });

  it('by default, enforces 30 character limit on keywords', () => {
    const checker = KeywordLengthChecker();
    expect(checker("foo, , 123456789012345678901234567890, bar")).toBe(true);
    expect(checker("1234567890123456789012345678901")).toBe(false);
  });
});
