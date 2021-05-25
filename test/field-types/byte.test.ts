import { expect } from '@open-wc/testing';
import { ByteParser } from '../../src/field-types/byte';

describe('ByteParser', () => {
  it('can parse int strings', async () => {
    const parser = new ByteParser();
    const response = parser.parseValue('3');
    expect(response).to.equal(3);
  });

  it('can parse float strings', async () => {
    const parser = new ByteParser();
    const response = parser.parseValue('3.14');
    expect(response).to.equal(3.14);
  });

  it('returns undefined if the number is not a number', async () => {
    const parser = new ByteParser();
    const response = parser.parseValue('qab');
    expect(response).to.be.undefined;
  });

  it('returns the number if a number is passed', async () => {
    const parser = new ByteParser();
    const response = parser.parseValue(5.67);
    expect(response).to.equal(5.67);
  });

  it('returns undefined if a boolean is passed in', async () => {
    const parser = new ByteParser();
    const response = parser.parseValue(true);
    expect(response).to.be.undefined;
  });
});
