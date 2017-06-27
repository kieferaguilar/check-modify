# check-modify
Simple text checkers and modifiers for forms.

### Installation

```
npm install --save check-modify
```

## What's a checker/modifier?

Checkers and modifiers are **function generators** of functions that take a single `String` argument (the text to check or modify).

Checkers generate functions that return a `Boolean` value indicating whether the `String` argument passes some criterion.

Validators generate functions that return a `String` value transformation of the `String` argument

### Function signatures

**Checker:** `function(any) --> function(String) --> Boolean`

**Modifier:** `function(any) --> function(String) --> String`

### Example

```js
import { CharacterLimitChecker, CharacterLimitModifier } from 'check-modify';

const checker = CharacterLimitChecker(5);
console.log( checker("abc")     ); // prints "true"
console.log( checker("abcdefg") ); // prints "false"

const modifier = CharacterLimitModifier(5);
console.log( modifier("abc")     ); // prints "abc"
console.log( modifier("abcdefg") ); // prints "abcde"
```
**Note:** Currently, there is no option to reference a minified version directly. Rather, use import the modules you need.

## Quick reference

### Composition

You can compose any number of checkers and modifiers, including with checkers and modifiers you write yourself. What is actually composed is the **generated** functions, not the function generators.

#### Composing checkers
```js
import { composeCheckers, CharacterLimitChecker, MinimumCharacterLimitChecker } from 'check-modify';

const upperChecker = CharacterLimitChecker(8);
const lowerChecker = MinimumCharacterLimitChecker(4);
const composed = composeCheckers(upperChecker, lowerChecker);

console.log( composed("abc")        ); // prints "false"
console.log( composed("abcde")      ); // prints "true"
console.log( composed("abcdefghij") ); // prints "false"
```

#### Composing modifiers
```js
import { composeModifiers, CharacterLimitModifier } from 'check-modify';

const Repeater = function() {
  return function(text) {
    return text + text;
  };
};
const truncator = CharacterLimitModifier(2);
const composed = composeModifiers(truncator, Repeater(), Repeater());

console.log( composed("abcdefghij") ); // prints "abababab"
```
**Note:** Composed modifiers are applied in order.

## Provided checkers and modifiers

For more details about each provided checker and modifier, [check the tests](https://github.com/kieferaguilar/check-modify/tree/master/src) accompanying each.

| Checker name (and arguments)           | Description                  
| -------------------------------------- | ---------------------------------------------------------------
| `CharacterLimitChecker(limit)`         | Is text shorter than `limit` characters?
| `MinimumCharacterLimitChecker(limit)`  | Is text longer than `limit` characters?
| `CurrencyChecker()`                    | Does text have only currency characters (numbers, commas, periods, spaces)?
| `EmailChecker()`                       | `*` Is text a valid email?
| `KeywordCountChecker(countLimit)`      | Are there fewer than `countLimit` comma separated phrases?
| `KeywordLengthChecker(characterLimit)` | `*` Is each comma separated phrase shorter than `characterLimit`?
| `LinkChecker()`                        | `*` Is text a valid HTTP(S) link?
| `ShortenedLinkChecker()`               | `*` Is text NOT a shortened link (e.g. `t.co/...`)?
| `PasswordChecker()`                    | `*` Does text have at least 8 characters, containing at least one letter and number?
| `PhoneNumberChecker()`                 | `*` Is text a valid 10 digit phone number?
| `ZipCodeChecker()`                     | `*` Is text a valid 5 digit zip code?

Checkers whose description begins with `*` are intended to be used as a final check on input values just before form submission. The rest are intended to be used to check whether text changes in an input should be allowed to happen.

| Modifier name (and arguments)      | Description                  
| ---------------------------------- | ---------------------------------------------------------------
| `CharacterLimitModifier(limit)`    | Truncates text to `limit` characters
| `CurrencyOnChangeModifier()`       | Places commas in correct locations, and enforces max 2 decimal digits
| `CurrencyOnBlurModifier(maxValue)` | Adds a decimal point if needed, fills out any missing zeros, and limits value to `maxValue`
| `KeywordOnChangeModifier()`        | Strips all characters except letters, numbers, `","`, `"-"`, and `" "`
| `KeywordOnBlurModifier()`          | Reformats valid keywords with `", "` separator
| `PhoneNumberOnChangeModifier()`    | Strips all characters except numbers, `"-"`, `" "`, `"("`, and `")"`
| `PhoneNumberOnBlurModifier()`      | Formats 10 digit phone numbers like `(123) 456-7890`
| `ZipCodeOnChangeModifier()`        | Strips all characters except numbers and `"-"`
| `ZipCodeOnBlurModifier()`          | Keeps up to 5 numeric characters preceeding the first `"-"`

Modifer names sometimes include either `OnChange` or `OnBlur` to indicate the intended use of the modifier with text inputs.

## Contributing

### Setup

You will want to clone the repository and `npm install`.

### Testing

`npm test`: Tests all modules

Branch pushes to Github will trigger CI tests on [CircleCI](http://circleci.com).

### Building lib

The `lib` directory contains transpiled code that is gets shipped. To update this directory, `npm run build` and commit changes.