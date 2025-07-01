import { expect } from '@open-wc/testing';
import { EpochParser } from '../../src/field-types/epoch';

describe('EpochParser', () => {
  it('can parse int strings', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(0);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('can parse float strings', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397.123');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('can parse nanoseconds', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456789');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('can parse microseconds', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('can parse milliseconds', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('can parse seconds', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(0);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('returns undefined if the number is not a number', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue('qab');
    expect(response).to.be.undefined;
  });

  it('returns can parse number values', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue(1637274397);
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(0);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('returns undefined if a boolean is passed in', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue(true);
    expect(response).to.be.undefined;
  });

  it('has a defaults to auto detects the input unit', async () => {
    const parser = new EpochParser();
    const response = parser.parseValue('1637274397123456789');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('has a shared static instance that auto detects the input unit', async () => {
    const parser = EpochParser.shared;
    const response = parser.parseValue('1637274397123456789');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('has a millisecondsParser static instance that uses milliseconds', async () => {
    const parser = EpochParser.millisecondsParser;
    const response = parser.parseValue(1637274397123);
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('has a secondsParser static instance that uses seconds', async () => {
    const parser = EpochParser.secondsParser;
    const response = parser.parseValue(1637274397);
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(0);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('can specify input unit as nanoseconds', async () => {
    const parser = new EpochParser('nanoseconds');
    const response = parser.parseValue('1637274397123456789');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });

  it('can specify input unit as microseconds', async () => {
    const parser = new EpochParser('microseconds');
    const response = parser.parseValue('1637274397123456');
    const expected = new Date();
    expected.setHours(14);
    expected.setMinutes(26);
    expected.setSeconds(37);
    expected.setMilliseconds(123);
    expected.setMonth(10);
    expected.setDate(18);
    expected.setFullYear(2021);
    expect(response?.getTime()).to.equal(expected.getTime());
  });
});
