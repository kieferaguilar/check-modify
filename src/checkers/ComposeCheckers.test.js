import composeCheckers from './ComposeCheckers';

function GenerateContainsChecker(target) {
  return function (text) {
    return text.includes(target);
  }
}

it('composes checkers', () => {
  const checkers = "12345".split("")
    .map(text => GenerateContainsChecker(text));
  const composed = composeCheckers(...checkers);
  expect(composed("42531")).toBe(true);
  expect(composed("4231")).toBe(false);
});
