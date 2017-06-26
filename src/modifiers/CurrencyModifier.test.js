import { CurrencyOnChangeModifier, CurrencyOnBlurModifier } from './CurrencyModifier';

describe('CurrencyOnChangeModifier', () => {

  it('strips commas, spaces, and all but last decimal', () => {
    const checker = CurrencyOnChangeModifier();
    expect(checker(" 123,45  6...")).toBe("123,456.");
    expect(checker(",")).toBe("");
    expect(checker("1,")).toBe("1");
  });

  it('keeps only last decimal point', () => {
    const checker = CurrencyOnChangeModifier();
    expect(checker("1.2.3.4")).toBe("123.4");
    expect(checker("1.")).toBe("1.");
  });

  it('does not add decimal point', () => {
    const checker = CurrencyOnChangeModifier();
    expect(checker("1")).toBe("1");
    expect(checker("1234")).toBe("1,234");
  });

  it('does not pad zeros', () => {
    const checker = CurrencyOnChangeModifier();
    expect(checker(".1")).toBe(".1");
  });

  it('disallows more than 2 digits after decimal', () => {
    const checker = CurrencyOnChangeModifier();
    expect(checker("1.234")).toBe("1.23");
    expect(checker("1.234.567")).toBe("1,234.56");
  });

  it('adds commas relative to last decimal point', () => {
    const checker = CurrencyOnChangeModifier();
    expect(checker("1234567")).toBe("1,234,567");
    expect(checker("1234567.89")).toBe("1,234,567.89");
    expect(checker("123.4567.89")).toBe("1,234,567.89");
    expect(checker("1234567.89")).toBe("1,234,567.89");
  });

  it('preserves empty/null/undefined', () => {
    const checker = CurrencyOnChangeModifier();
    expect(checker("")).toBe("");
    expect(checker(null)).toBe(null);
    expect(checker(undefined)).toBe(undefined);
  });
});

describe('CurrencyOnBlurModifier', () => {

  it('correctly formats currency value', () => {
    const checker = CurrencyOnBlurModifier();
    expect(checker(" 123,45  6...")).toBe("123,456.00");
    expect(checker(", . 123,45  6")).toBe("0.12");
    expect(checker("1.2.3.4")).toBe("123.40");
    expect(checker("1.2.3.456")).toBe("123.45");
    expect(checker("123.4567.89")).toBe("1,234,567.89");
  });

  it('enforces a given maximum value', () => {
    const checker = CurrencyOnBlurModifier(3.14);
    expect(checker("3.13")).toBe("3.13");
    expect(checker("3.14")).toBe("3.14");
    expect(checker("3.15")).toBe("3.14");
    expect(checker("5")).toBe("3.14");
  });

  it('defaults to enforcing a max value of 9,999,999.99', () => {
    const checker = CurrencyOnBlurModifier();
    expect(checker("9 999 999.98")).toBe("9,999,999.98");
    expect(checker("9 999 999.99")).toBe("9,999,999.99");
    expect(checker("10 000 000")).toBe("9,999,999.99");
  });

  it('preserves empty/null/undefined', () => {
    const checker = CurrencyOnBlurModifier();
    expect(checker("")).toBe("");
    expect(checker(null)).toBe(null);
    expect(checker(undefined)).toBe(undefined);
  });
});
