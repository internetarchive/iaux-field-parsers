[![Build Status](https://travis-ci.com/internetarchive/iaux-field-parsers.svg?branch=master)](https://travis-ci.com/internetarchive/iaux-field-parsers) [![codecov](https://codecov.io/gh/internetarchive/iaux-field-parsers/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux-field-parsers)

# Internet Archive Field Parsers

Parsers to convert strings from Internet Archive API responses to their native javascript equivalents.

Each parser implements the `FieldParserInterface`:
```
export type FieldParserRawValue = string | number | boolean;

export interface FieldParserInterface<T> {
  /**
   * Parse the raw value and return a value of type T or undefined if unparseable
   *
   * @param rawValue T | undefined
   */
  parseValue(rawValue: FieldParserRawValue): T | undefined;
}
```
They are responsible for parsing the input and returning the appropriate value or `undefined`.

## Usage

Instantiate a parser or use the shared instance:
```
const parser = new BooleanParser()
parser.parse('true') => true

BooleanParser.shared.parse('false') => false
```

See tests for more usage examples.

## Available Parsers:

1. `Boolean`
2. `Byte` - a number in bytes
3. `Date` - parses the various Internet Archive date formats
4. `Duration` - Parses `hh:mm:ss.ms` and `ss.ms` formats to seconds
5. `MediaType` - Internet Archive media types
6. `Number`
7. `PageProgression` - Internet Archive page progression (right to left, left to right)
8. `String`

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
yarn run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
yarn run test:watch
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
yarn run lint
```

You can lint with ESLint and Prettier individually as well
```bash
yarn run lint:eslint
```
```bash
yarn run lint:prettier
```

To automatically fix many linting errors, run
```bash
yarn run format
```

You can format using ESLint and Prettier individually as well
```bash
yarn run format:eslint
```
```bash
yarn run format:prettier
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
