import { expect } from '@open-wc/testing';
import { PageProgressionParser } from '../../src/field-types/page-progression';

describe('PageProgressionParser', () => {
  it('can parse page progression', async () => {
    const parser = new PageProgressionParser();
    expect(parser.parseValue('rl')).to.equal('rl');
    expect(parser.parseValue('lr')).to.equal('lr');
  });

  it('returns undefined for number values', async () => {
    const parser = new PageProgressionParser();
    const response = parser.parseValue(15);
    expect(response).to.be.undefined;
  });

  it('returns undefined for boolean values', async () => {
    const parser = new PageProgressionParser();
    const response = parser.parseValue(true);
    expect(response).to.be.undefined;
  });
});
