import composeModifiers from './ComposeModifiers';

function GenerateConcatenationModifier(modifierText) {
  return function (text) {
    return text + modifierText;
  }
}

it('composes modifiers in order', () => {
  const modifiers = "12345".split("")
    .map(text => GenerateConcatenationModifier(text));
  const composed = composeModifiers(...modifiers);
  expect(composed("")).toBe("12345");
});
