function findBalancedEndIndex(source: string, startIndex: number): number {
  let openChar = "";
  let closeChar = "";
  let depth = 0;
  let inString: string | null = null;
  let isEscaped = false;

  for (let i = startIndex; i < source.length; i++) {
    const char = source[i];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
      } else if (char === "\\") {
        isEscaped = true;
      } else if (char === inString) {
        inString = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = char;
      continue;
    }

    if (!openChar) {
      if (char === "{" || char === "[") {
        openChar = char;
        closeChar = char === "{" ? "}" : "]";
        depth = 1;
      }
      continue;
    }

    if (char === openChar) {
      depth++;
    } else if (char === closeChar) {
      depth--;
      if (depth === 0) {
        let endIndex = i + 1;
        while (
          endIndex < source.length &&
          /\s/.test(source[endIndex]) &&
          source[endIndex] !== "\n"
        ) {
          endIndex++;
        }
        if (endIndex < source.length && source[endIndex] === ";") {
          endIndex++;
        }
        return endIndex;
      }
    }
  }

  return -1;
}

export function updateSectionInSource(
  source: string,
  exportName: string,
  typeAnnotation: string,
  data: unknown,
): string {
  const jsonStr = JSON.stringify(data, null, 2);
  const replacement = `export const ${exportName}: ${typeAnnotation} = ${jsonStr};`;

  const regex = new RegExp(
    `export\\s+const\\s+${exportName}\\s*(:[^=]+)?\\s*=\\s*`,
  );
  const match = regex.exec(source);

  if (!match || match.index === undefined) {
    return `${source.trimEnd()}\n\n${replacement}\n`;
  }

  const declStartIndex = match.index;
  const equalsIndex = declStartIndex + match[0].length;
  const declEndIndex = findBalancedEndIndex(source, equalsIndex);

  if (declEndIndex === -1) {
    const fallbackRegex = new RegExp(
      `export\\s+const\\s+${exportName}\\s*(:[^=]+)?\\s*=[\\s\\S]*?;(\\n|$)`,
    );
    if (fallbackRegex.test(source)) {
      return source.replace(fallbackRegex, `${replacement}\n`);
    }
    return `${source.trimEnd()}\n\n${replacement}\n`;
  }

  return (
    source.slice(0, declStartIndex) + replacement + source.slice(declEndIndex)
  );
}
