import { PhoneNumberOnChangeModifier, PhoneNumberOnBlurModifier } from './PhoneNumberModifier';

describe('PhoneNumberOnChangeModifier', () => {

  it('limits characters to 18 relevant phone number characters', () => {
    const modifier = PhoneNumberOnChangeModifier();
    expect(modifier("abcde(fghi12b345.67-89)0")).toBe("(1234567-89)0");
    expect(modifier("123456789(fghi12b345.67-89)0")).toBe("123456789(1234567-");
    expect(modifier("")).toBe("");
    expect(modifier(null)).toBe(null);
    expect(modifier(undefined)).toBe(undefined);
  });
});

describe('PhoneNumberOnBlurModifier', () => {

  it('formats as US phone number if exactly 10 numeric characters', () => {
    const modifier = PhoneNumberOnBlurModifier();
    expect(modifier("1234567890")).toBe("(123) 456-7890");
    expect(modifier("123456789")).toBe("123456789");
    expect(modifier("12345678901")).toBe("12345678901");
    expect(modifier("abcdefghi12b345.67-890")).toBe("(123) 456-7890");
    expect(modifier("abcde(fghi12b345.67-89)0")).toBe("(123) 456-7890");
    expect(modifier("-abcdefg12-b345.67-8901")).toBe("-12-34567-8901");
    expect(modifier("-abcdefg12b345.6789")).toBe("-123456789");
    expect(modifier("")).toBe("");
    expect(modifier(null)).toBe(null);
    expect(modifier(undefined)).toBe(undefined);
  });
});
