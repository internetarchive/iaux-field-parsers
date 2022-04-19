import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class ListParser<T> implements FieldParserInterface<T[]> {
  private parser: FieldParserInterface<T>;

  constructor(parser: FieldParserInterface<T>) {
    this.parser = parser;
  }

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): T[] {
    const stringifiedValue = String(rawValue);
    let results: string[] = [];
    // first try splitting by comma, then by semi-colon
    results = stringifiedValue.split(',');
    if (results.length === 1) results = stringifiedValue.split(';');
    return this.parseListValues(results);
  }

  private parseListValues(rawValues: string[]): T[] {
    const trimmed = rawValues.map(s => s.trim());
    const parsed = trimmed.map(rawValue => this.parser.parseValue(rawValue));
    const result: T[] = [];
    parsed.forEach(p => {
      if (p !== undefined) result.push(p);
    });
    return result;
  }
}
