import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  BooleanParser,
  ByteParser,
  DateParser,
  DurationParser,
  ListParser,
  MediaTypeParser,
  NumberParser,
  PageProgressionParser,
  StringParser
} from '../index';

/** One parser shown in the results table. */
interface ParserRow {
  label: string;
  /** The native type the parser yields, for the column hint. */
  type: string;
  parse: (raw: string) => unknown;
}

/**
 * Every field parser run against the same raw input. ListParser is shown
 * wrapping a StringParser so its multi-value splitting is visible.
 */
const PARSERS: ParserRow[] = [
  {
    label: 'BooleanParser',
    type: 'boolean',
    parse: raw => BooleanParser.shared.parseValue(raw)
  },
  {
    label: 'NumberParser',
    type: 'number',
    parse: raw => NumberParser.shared.parseValue(raw)
  },
  {
    label: 'ByteParser',
    type: 'number (bytes)',
    parse: raw => ByteParser.shared.parseValue(raw)
  },
  {
    label: 'DurationParser',
    type: 'number (seconds)',
    parse: raw => DurationParser.shared.parseValue(raw)
  },
  {
    label: 'DateParser',
    type: 'Date',
    parse: raw => DateParser.shared.parseValue(raw)
  },
  {
    label: 'MediaTypeParser',
    type: 'MediaType',
    parse: raw => MediaTypeParser.shared.parseValue(raw)
  },
  {
    label: 'PageProgressionParser',
    type: "'rl' | 'lr'",
    parse: raw => PageProgressionParser.shared.parseValue(raw)
  },
  {
    label: 'StringParser',
    type: 'string',
    parse: raw => StringParser.shared.parseValue(raw)
  },
  {
    label: 'ListParser(StringParser)',
    type: 'string[]',
    parse: raw => new ListParser(StringParser.shared).parseValue(raw)
  }
];

/** Raw values that each highlight a different parser. */
const EXAMPLES = [
  'yes',
  '1.5',
  '1:23:45',
  '1073741824',
  '2020-06-20',
  'audio',
  'rl',
  'foo, bar, baz'
];

/** Render a parsed value (boolean, number, Date, string, array) as text. */
function display(value: unknown): string {
  if (value === undefined || value === null) return 'undefined';
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value))
    return value.length ? `[${value.map(display).join(', ')}]` : '[]';
  if (typeof value === 'string') return `"${value}"`;
  return String(value);
}

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() private rawValue = EXAMPLES[0];

  render() {
    return html`
      <h1>Field Parsers Demo</h1>
      <p>
        Parsers for
        <a href="https://archive.org" target="_blank" rel="noopener"
          >archive.org</a
        >
        metadata field values. Type a raw value to see how each parser in
        <code>@internetarchive/field-parsers</code> interprets it.
      </p>

      <label class="field">
        <span>Raw value</span>
        <input
          type="text"
          .value=${this.rawValue}
          @input=${this.onInput}
          placeholder="e.g. yes"
        />
      </label>

      <p class="examples">
        Try:
        ${EXAMPLES.map(
          example =>
            html`<button
              type="button"
              class="link"
              @click=${() => this.useExample(example)}
            >
              ${example}
            </button>`
        )}
      </p>

      <table>
        <thead>
          <tr>
            <th>Parser</th>
            <th>Type</th>
            <th>Parsed value</th>
          </tr>
        </thead>
        <tbody>
          ${PARSERS.map(
            parser => html`
              <tr>
                <td><code>${parser.label}</code></td>
                <td class="type">${parser.type}</td>
                <td class="value">${display(parser.parse(this.rawValue))}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  private onInput(event: Event): void {
    this.rawValue = (event.currentTarget as HTMLInputElement).value;
  }

  private useExample(example: string): void {
    this.rawValue = example;
  }

  static styles = css`
    :host {
      display: block;
      max-width: 50rem;
      margin: 0 auto;
      padding: 1rem;
      color: #222;
      line-height: 1.4;
    }

    h1 {
      margin-bottom: 0.25rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      max-width: 24rem;
    }

    .field span {
      font-size: 0.8rem;
      font-weight: bold;
    }

    input {
      font: inherit;
      padding: 0.4rem 0.5rem;
      border: 1px solid #aaa;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .examples {
      font-size: 0.85rem;
      color: #555;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: baseline;
    }

    button.link {
      font: inherit;
      background: none;
      border: none;
      color: #194880;
      text-decoration: underline;
      padding: 0;
      cursor: pointer;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 0.4rem 0.6rem;
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #f0f0f0;
    }

    td.type {
      color: #555;
    }

    td.value {
      font-family: monospace;
      word-break: break-word;
    }
  `;
}
