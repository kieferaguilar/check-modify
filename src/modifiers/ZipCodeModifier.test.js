import { ZipCodeOnChangeModifier, ZipCodeOnBlurModifier } from './ZipCodeModifier';

describe('ZipCodeOnChangeModifier', () => {

  it('limits characters to 10 relevant zip code characters', () => {
    const modifier = ZipCodeOnChangeModifier();
    expect(modifier("abcdefghi12b345.67-890")).toBe("1234567-89");
    expect(modifier("")).toBe("");
    expect(modifier(null)).toBe(null);
    expect(modifier(undefined)).toBe(undefined);
  });
});

describe('ZipCodeOnBlurModifier', () => {

  it('takes first 5 numeric characters up to first hyphen', () => {
    const modifier = ZipCodeOnBlurModifier();
    expect(modifier("abcdefghi12b345.67-890")).toBe("12345");
    expect(modifier("abcdefghi12-b34-5.6789")).toBe("12");
    expect(modifier("abc-defg12-b345.67-890")).toBe("");
    expect(modifier("-abcdefg12-b345.67-890")).toBe("");
    expect(modifier("")).toBe("");
    expect(modifier(null)).toBe(null);
    expect(modifier(undefined)).toBe(undefined);
  });
});
