import { expect } from '@open-wc/testing';
import { MediaTypeParser } from '../../src/field-types/mediatype';

describe('MediaTypeParser', () => {
  it('can parse mediatypes', async () => {
    const parser = new MediaTypeParser();
    expect(parser.parseValue('account')).to.equal('account');
    expect(parser.parseValue('audio')).to.equal('audio');
    expect(parser.parseValue('collection')).to.equal('collection');
    expect(parser.parseValue('data')).to.equal('data');
    expect(parser.parseValue('etree')).to.equal('etree');
    expect(parser.parseValue('image')).to.equal('image');
    expect(parser.parseValue('movies')).to.equal('movies');
    expect(parser.parseValue('software')).to.equal('software');
    expect(parser.parseValue('texts')).to.equal('texts');
    expect(parser.parseValue('web')).to.equal('web');
  });

  it('returns undefined for number values', async () => {
    const parser = new MediaTypeParser();
    const response = parser.parseValue(15);
    expect(response).to.be.undefined;
  });

  it('returns undefined for boolean values', async () => {
    const parser = new MediaTypeParser();
    const response = parser.parseValue(true);
    expect(response).to.be.undefined;
  });
});
