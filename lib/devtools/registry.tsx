import type { ComponentType } from 'react';
import type { IconType } from 'react-icons';
import {
  FiCode, FiFileText, FiRepeat, FiHash, FiLink, FiLock, FiKey, FiShield, FiArchive,
  FiClock, FiDroplet, FiType, FiList, FiGrid, FiCpu, FiSearch, FiGitMerge, FiBarChart2,
  FiEye, FiPlusSquare, FiCalendar, FiSliders, FiTag, FiPercent, FiBox,
} from 'react-icons/fi';

import { JsonFormatter, XmlFormatter } from '@/components/devtools/tools/formatters';
import {
  YamlJson, JsonToTs, CsvJson, NumberBase, ColorConverter, TimestampConverter, DataSize, CaseConverter,
} from '@/components/devtools/tools/converters';
import {
  Base64Tool, UrlTool, HtmlEntities, JwtDecoder, HashGenerator, GzipTool,
} from '@/components/devtools/tools/encoders';
import {
  UuidGenerator, PasswordGenerator, LoremGenerator, QrGenerator, SlugGenerator,
} from '@/components/devtools/tools/generators';
import {
  RegexTester, DiffChecker, TextStats, MarkdownPreview, Calculator, CronExplainer, ChmodCalculator,
} from '@/components/devtools/tools/text';

export type Category = 'Format' | 'Convert' | 'Encode' | 'Generate' | 'Text';

export type Tool = {
  id: string;
  name: string;
  category: Category;
  description: string;
  keywords: string[];
  icon: IconType;
  Component: ComponentType;
};

// ── The single source of truth. Add a tool = add one entry here. ──
export const tools: Tool[] = [
  // Format
  { id: 'json-formatter', name: 'JSON Formatter', category: 'Format', description: 'Beautify, minify & validate JSON.', keywords: ['json', 'pretty', 'minify', 'validate', 'lint'], icon: FiCode, Component: JsonFormatter },
  { id: 'xml-formatter', name: 'XML / HTML Formatter', category: 'Format', description: 'Pretty-print and validate XML or HTML.', keywords: ['xml', 'html', 'pretty', 'beautify'], icon: FiFileText, Component: XmlFormatter },

  // Convert
  { id: 'yaml-json', name: 'YAML ↔ JSON', category: 'Convert', description: 'Convert between YAML and JSON.', keywords: ['yaml', 'yml', 'json', 'convert'], icon: FiRepeat, Component: YamlJson },
  { id: 'json-to-ts', name: 'JSON → TypeScript', category: 'Convert', description: 'Generate TypeScript interfaces from JSON.', keywords: ['typescript', 'ts', 'types', 'interface', 'json'], icon: FiCpu, Component: JsonToTs },
  { id: 'csv-json', name: 'CSV ↔ JSON', category: 'Convert', description: 'Convert between CSV and JSON.', keywords: ['csv', 'json', 'spreadsheet', 'convert'], icon: FiGrid, Component: CsvJson },
  { id: 'number-base', name: 'Number Base Converter', category: 'Convert', description: 'Binary, octal, decimal & hex.', keywords: ['binary', 'hex', 'octal', 'decimal', 'radix', 'base'], icon: FiHash, Component: NumberBase },
  { id: 'color-converter', name: 'Color Converter', category: 'Convert', description: 'HEX, RGB & HSL with a picker.', keywords: ['color', 'colour', 'hex', 'rgb', 'hsl', 'picker'], icon: FiDroplet, Component: ColorConverter },
  { id: 'timestamp', name: 'Timestamp Converter', category: 'Convert', description: 'Unix epoch ↔ human date.', keywords: ['unix', 'epoch', 'timestamp', 'date', 'time'], icon: FiClock, Component: TimestampConverter },
  { id: 'data-size', name: 'Data Size Converter', category: 'Convert', description: 'Bytes, KB, MB, GB, TB, PB.', keywords: ['bytes', 'kb', 'mb', 'gb', 'size', 'storage'], icon: FiBox, Component: DataSize },
  { id: 'case-converter', name: 'Case Converter', category: 'Convert', description: 'camelCase, snake_case, kebab & more.', keywords: ['case', 'camel', 'snake', 'kebab', 'pascal', 'title'], icon: FiType, Component: CaseConverter },

  // Encode
  { id: 'base64', name: 'Base64 Encode / Decode', category: 'Encode', description: 'Unicode-safe Base64.', keywords: ['base64', 'encode', 'decode', 'btoa', 'atob'], icon: FiLock, Component: Base64Tool },
  { id: 'url-encode', name: 'URL Encode / Decode', category: 'Encode', description: 'Percent-encode URI components.', keywords: ['url', 'uri', 'encode', 'decode', 'percent'], icon: FiLink, Component: UrlTool },
  { id: 'html-entities', name: 'HTML Entities', category: 'Encode', description: 'Encode & decode HTML entities.', keywords: ['html', 'entities', 'escape', 'unescape'], icon: FiPercent, Component: HtmlEntities },
  { id: 'jwt-decoder', name: 'JWT Decoder', category: 'Encode', description: 'Decode JWT header & payload.', keywords: ['jwt', 'token', 'jose', 'auth', 'decode'], icon: FiKey, Component: JwtDecoder },
  { id: 'hash', name: 'Hash Generator', category: 'Encode', description: 'SHA-1 / 256 / 384 / 512.', keywords: ['hash', 'sha', 'sha256', 'checksum', 'digest'], icon: FiShield, Component: HashGenerator },
  { id: 'gzip', name: 'Gzip Compress', category: 'Encode', description: 'Compress / decompress (gzip + base64).', keywords: ['gzip', 'compress', 'zip', 'deflate'], icon: FiArchive, Component: GzipTool },

  // Generate
  { id: 'uuid', name: 'UUID Generator', category: 'Generate', description: 'Bulk RFC-4122 v4 UUIDs.', keywords: ['uuid', 'guid', 'id', 'random'], icon: FiHash, Component: UuidGenerator },
  { id: 'password', name: 'Password Generator', category: 'Generate', description: 'Strong, cryptographically random passwords.', keywords: ['password', 'secret', 'random', 'secure'], icon: FiKey, Component: PasswordGenerator },
  { id: 'lorem', name: 'Lorem Ipsum', category: 'Generate', description: 'Placeholder paragraphs.', keywords: ['lorem', 'ipsum', 'placeholder', 'dummy', 'text'], icon: FiList, Component: LoremGenerator },
  { id: 'qr', name: 'QR Code Generator', category: 'Generate', description: 'Make a downloadable QR code.', keywords: ['qr', 'qrcode', 'barcode'], icon: FiGrid, Component: QrGenerator },
  { id: 'slug', name: 'Slug Generator', category: 'Generate', description: 'URL-friendly slugs.', keywords: ['slug', 'url', 'permalink', 'seo'], icon: FiTag, Component: SlugGenerator },

  // Text
  { id: 'regex', name: 'Regex Tester', category: 'Text', description: 'Live regex matching with groups.', keywords: ['regex', 'regexp', 'pattern', 'match'], icon: FiSearch, Component: RegexTester },
  { id: 'diff', name: 'Diff Checker', category: 'Text', description: 'Line-by-line text diff.', keywords: ['diff', 'compare', 'changes', 'merge'], icon: FiGitMerge, Component: DiffChecker },
  { id: 'text-stats', name: 'Text Stats', category: 'Text', description: 'Words, chars, reading time.', keywords: ['count', 'words', 'characters', 'stats', 'reading'], icon: FiBarChart2, Component: TextStats },
  { id: 'markdown', name: 'Markdown Preview', category: 'Text', description: 'Render Markdown live.', keywords: ['markdown', 'md', 'preview', 'render'], icon: FiEye, Component: MarkdownPreview },
  { id: 'calculator', name: 'Calculator', category: 'Text', description: 'Expression calculator with functions.', keywords: ['calculator', 'math', 'calc', 'expression'], icon: FiPlusSquare, Component: Calculator },
  { id: 'cron', name: 'Cron Explainer', category: 'Text', description: 'Explain cron expressions.', keywords: ['cron', 'crontab', 'schedule', 'job'], icon: FiCalendar, Component: CronExplainer },
  { id: 'chmod', name: 'Chmod Calculator', category: 'Text', description: 'Unix permissions ↔ octal.', keywords: ['chmod', 'permissions', 'unix', 'octal', 'rwx'], icon: FiSliders, Component: ChmodCalculator },
];

export const categories: Category[] = ['Format', 'Convert', 'Encode', 'Generate', 'Text'];
