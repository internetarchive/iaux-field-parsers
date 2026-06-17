import { expect } from '@open-wc/testing';
import { BooleanParser } from '../../src/field-types/boolean';

describe('BooleanParser', () => {
  it('can parse string number truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('1');
    expect(response).to.be.true;
  });

  it('can parse string number falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('0');
    expect(response).to.be.false;
  });

  it('can parse words truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('true');
    expect(response).to.be.true;
  });

  it('can parse words falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('false');
    expect(response).to.be.false;
  });

  it('can parse date truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(Date());
    expect(response).to.be.true;
  });

  it('parses "yes" as truthy', async () => {
    const parser = new BooleanParser();
    expect(parser.parseValue('yes')).to.be.true;
  });

  it('parses "no" as falsy', async () => {
    const parser = new BooleanParser();
    expect(parser.parseValue('no')).to.be.false;
  });

  it('parses the textual encodings case- and whitespace-insensitively', async () => {
    const parser = new BooleanParser();
    expect(parser.parseValue(' YES ')).to.be.true;
    expect(parser.parseValue('No')).to.be.false;
    expect(parser.parseValue('FALSE')).to.be.false;
    expect(parser.parseValue('True')).to.be.true;
  });
});
