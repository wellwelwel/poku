export interface ImportMember {
  name: string;
  alias: string;
  type: 'default' | 'named' | 'namespace';
}

export interface ImportDefinition {
  module: string;
  members: ImportMember[];
  kind: 'esm' | 'cjs' | 'dynamic';
}

export interface ImportMember {
  name: string;
  alias: string;
  type: 'default' | 'named' | 'namespace';
}

export interface ImportDefinition {
  module: string;
  members: ImportMember[];
  kind: 'esm' | 'cjs' | 'dynamic';
}

const staticImportRegex =
  /import\s+(?:([\w\s{},*]*)\s+from\s+)?(?:["'])([^"']+)(?:["'])/g;
const namedMatchRegex = /\{([^}]+)\}/;
const asRegex = /\s+as\s+/;
const nsMatchRegex = /\*\s+as\s+(\w+)/;
const dynamicImportRegex = /import\s*\(\s*(?:["'])([^"']+)(?:["'])\s*\)/g;
const requireRegex =
  /(?:(?:const|let|var)\s+([\w\s{},:]*)\s*=\s*)?require\s*\(\s*(?:["'])([^"']+)(?:["'])\s*\)/g;

const parseESMImports = (
  content: string,
  results: { index: number; def: ImportDefinition }[]
) => {
  let match = staticImportRegex.exec(content);
  while (match !== null) {
    const clause = match[1];
    const modulePath = match[2];
    const members: ImportMember[] = [];

    if (clause) {
      const namedMatch = clause.match(namedMatchRegex);
      let remaining = clause;

      if (namedMatch) {
        const namedPart = namedMatch[1];
        remaining = clause.replace(namedMatch[0], '');

        for (const p of namedPart.split(',')) {
          const part = p.trim();
          if (part) {
            const parts = part.split(asRegex);
            if (parts.length === 2) {
              members.push({
                name: parts[0].trim(),
                alias: parts[1].trim(),
                type: 'named',
              });
            } else {
              members.push({
                name: parts[0].trim(),
                alias: parts[0].trim(),
                type: 'named',
              });
            }
          }
        }
      }

      const nsMatch = remaining.match(nsMatchRegex);
      if (nsMatch) {
        members.push({ name: '*', alias: nsMatch[1], type: 'namespace' });
        remaining = remaining.replace(nsMatch[0], '');
      }

      const defaultPart = remaining.replace(/,/g, '').trim();
      if (defaultPart) {
        members.push({ name: 'default', alias: defaultPart, type: 'default' });
      }
    }

    results.push({
      index: match.index,
      def: { module: modulePath, members, kind: 'esm' },
    });

    match = staticImportRegex.exec(content);
  }
};

const parseDynamicImports = (
  content: string,
  results: { index: number; def: ImportDefinition }[]
) => {
  let match = dynamicImportRegex.exec(content);
  while (match !== null) {
    results.push({
      index: match.index,
      def: { module: match[1], members: [], kind: 'dynamic' },
    });
    match = dynamicImportRegex.exec(content);
  }
};

const parseCJSImports = (
  content: string,
  results: { index: number; def: ImportDefinition }[]
) => {
  let match = requireRegex.exec(content);
  while (match !== null) {
    const lhs = match[1];
    const modulePath = match[2];
    const members: ImportMember[] = [];

    if (lhs) {
      if (lhs.trim().startsWith('{') && lhs.trim().endsWith('}')) {
        const inner = lhs.trim().slice(1, -1);
        for (const p of inner.split(',')) {
          const part = p.trim();
          if (part) {
            const parts = part.split(':');
            if (parts.length === 2) {
              members.push({
                name: parts[0].trim(),
                alias: parts[1].trim(),
                type: 'named',
              });
            } else {
              members.push({
                name: parts[0].trim(),
                alias: parts[0].trim(),
                type: 'named',
              });
            }
          }
        }
      } else {
        members.push({ name: 'default', alias: lhs.trim(), type: 'default' });
      }
    }

    results.push({
      index: match.index,
      def: { module: modulePath, members, kind: 'cjs' },
    });

    match = requireRegex.exec(content);
  }
};

export function parseImports(content: string): ImportDefinition[] {
  const results: { index: number; def: ImportDefinition }[] = [];

  parseESMImports(content, results);
  parseDynamicImports(content, results);
  parseCJSImports(content, results);

  return results.sort((a, b) => a.index - b.index).map((r) => r.def);
}
