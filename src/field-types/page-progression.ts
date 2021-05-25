import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export enum PageProgression {
  RightToLeft = 'rl',
  LeftToRight = 'lr',
}

export class PageProgressionParser
  implements FieldParserInterface<PageProgression> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new PageProgressionParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): PageProgression | undefined {
    if (typeof rawValue !== 'string') return undefined;

    switch (rawValue) {
      case 'rl':
        return PageProgression.RightToLeft;
      case 'lr':
        return PageProgression.LeftToRight;
      default:
        return undefined;
    }
  }
}
