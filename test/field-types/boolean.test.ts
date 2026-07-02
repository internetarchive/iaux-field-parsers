import { describe, it, expect } from 'vitest';
import { BooleanParser } from '../../src/field-types/boolean';

describe('BooleanParser', () => {
  it('can parse string number truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('1');
    expect(response).toBe(true);
  });

  it('can parse string number falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('0');
    expect(response).toBe(false);
  });

  it('can parse words truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('true');
    expect(response).toBe(true);
  });

  it('can parse words falsy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue('false');
    expect(response).toBe(false);
  });

  it('can parse date truthy', async () => {
    const parser = new BooleanParser();
    const response = parser.parseValue(Date());
    expect(response).toBe(true);
  });
});
