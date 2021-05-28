import { expect } from '@open-wc/testing';
import { MediaType, MediaTypeParser } from '../../src/field-types/mediatype';

describe('MediaTypeParser', () => {
  it('can parse mediatypes', async () => {
    const parser = new MediaTypeParser();
    expect(parser.parseValue('audio')).to.equal(MediaType.Audio);
    expect(parser.parseValue('collection')).to.equal(MediaType.Collection);
    expect(parser.parseValue('data')).to.equal(MediaType.Data);
    expect(parser.parseValue('etree')).to.equal(MediaType.Etree);
    expect(parser.parseValue('image')).to.equal(MediaType.Image);
    expect(parser.parseValue('movies')).to.equal(MediaType.Movies);
    expect(parser.parseValue('software')).to.equal(MediaType.Software);
    expect(parser.parseValue('texts')).to.equal(MediaType.Texts);
    expect(parser.parseValue('web')).to.equal(MediaType.Web);
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
