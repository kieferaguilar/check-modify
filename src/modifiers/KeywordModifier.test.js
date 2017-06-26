import { KeywordOnChangeModifier, KeywordOnBlurModifier } from './KeywordModifier';

describe('KeywordOnChangeModifier', () => {

  it('strips disallowed characters', () => {
    const modifier = KeywordOnChangeModifier();
    expect(modifier(" a,  b-c , 1,  , d/e, f123  :';+=\", ")).toBe(" a,  b-c , 1,  , de, f123  , ");

    expect(modifier("  ")).toBe("  ");
    expect(modifier("")).toBe("");
    expect(modifier(null)).toBe(null);
    expect(modifier(undefined)).toBe(undefined);
  });
});

describe('KeywordOnBlurModifier', () => {

  it('strips disallowed characters and reformats valid keywords', () => {
    const modifier = KeywordOnBlurModifier();
    expect(modifier(" a,  b-c , 1,  , d/e, f123  :';+=\", ")).toBe("a, b-c, 1, de, f123");
    expect(modifier("  ")).toBe("");

    expect(modifier("")).toBe("");
    expect(modifier(null)).toBe(null);
    expect(modifier(undefined)).toBe(undefined);
  });
});
