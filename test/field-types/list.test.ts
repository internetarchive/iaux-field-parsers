import { expect } from '@open-wc/testing';
import { ListParser } from '../../src/field-types/list';
import { StringParser } from '../../src/field-types/string';
import { NumberParser } from '../../src/field-types/number';
import { BooleanParser } from '../../src/field-types/boolean';

describe('ListParser', () => {
  it('can parse a list of strings with commas', async () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('foo, bar, baz');
    expect(response).to.deep.equal(['foo', 'bar', 'baz']);
  });

  it('can parse a list of strings with semicolons', async () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('foo; bar; baz');
    expect(response).to.deep.equal(['foo', 'bar', 'baz']);
  });

  it('returns a single value if no list', async () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('foo bar baz');
    expect(response).to.deep.equal(['foo bar baz']);
  });

  it('trims whitespace in list items', async () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('   foo   ,  bar   ,   baz');
    expect(response).to.deep.equal(['foo', 'bar', 'baz']);
  });

  it('can parse a list of numbers with commas', async () => {
    const numberParser = new NumberParser();
    const parser = new ListParser(numberParser);
    const response = parser.parseValue('1, 2, 3');
    expect(response).to.deep.equal([1, 2, 3]);
  });

  it('can parse a list of numbers with a 0 in it for falsy protection', async () => {
    const numberParser = new NumberParser();
    const parser = new ListParser(numberParser);
    const response = parser.parseValue('0, 1, 2, 3');
    expect(response).to.deep.equal([0, 1, 2, 3]);
  });

  it('does not include non-numbers in result if numbers are intended', async () => {
    const numberParser = new NumberParser();
    const parser = new ListParser(numberParser);
    const response = parser.parseValue('abc, 2, 3');
    expect(response).to.deep.equal([2, 3]);
  });

  it('can parse a list of booleans with commas', async () => {
    const booleanParser = new BooleanParser();
    const parser = new ListParser(booleanParser);
    const response = parser.parseValue('true, false, true');
    expect(response).to.deep.equal([true, false, true]);
  });

  it('can parse a list of strings with custom separator', async () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser, { separators: ['-'] });
    const response = parser.parseValue('boop - bop - beep');
    expect(response).to.deep.equal(['boop', 'bop', 'beep']);
  });

  it('can parse a list of strings with the second custom separator', async () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser, { separators: ['-', '|'] });
    const response = parser.parseValue('boop | bop | beep');
    expect(response).to.deep.equal(['boop', 'bop', 'beep']);
  });

  it('defaults to semicolons before commas since commas are common in some terms', async () => {
    const stringParser = new StringParser();
    const parser = new ListParser(stringParser);
    const response = parser.parseValue('10,000 Maniacs; Boop, Beep, Boop');
    expect(response).to.deep.equal(['10,000 Maniacs', 'Boop, Beep, Boop']);
  });
});
