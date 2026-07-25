// Minimal CSV parsing for Import Doctor's upload preview (Phase 0): header row + row count.
// Handles quoted fields, including embedded commas and escaped "" quotes. Full validation
// against reference data happens later; this only needs to prove the upload round-trips.

function splitCsvLine(line: string): string[] {
  const fields: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      fields.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields.map((f) => f.trim());
}

export type CsvPreview = {
  headers: string[];
  rowCount: number;
};

export function parseCsvPreview(text: string): CsvPreview {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n").filter((line) => line.length > 0);
  if (lines.length === 0) return { headers: [], rowCount: 0 };

  const headers = splitCsvLine(lines[0]);
  const rowCount = Math.max(0, lines.length - 1);
  return { headers, rowCount };
}
