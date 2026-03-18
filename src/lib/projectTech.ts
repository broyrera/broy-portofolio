export interface TechEntry {
  name: string;
  usage: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseSingleTech(value: unknown): TechEntry | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (isRecord(parsed) && typeof parsed.name === "string") {
        return {
          name: parsed.name.trim(),
          usage: typeof parsed.usage === "string" ? parsed.usage.trim() : "",
        };
      }
    } catch {
      // Fall through to plain string handling.
    }
  }

  const legacyParts = trimmed.split("|");
  if (legacyParts.length > 1) {
    return {
      name: legacyParts[0].trim(),
      usage: legacyParts.slice(1).join("|").trim(),
    };
  }

  return { name: trimmed, usage: "" };
}

export function parseTechEntries(input: unknown): TechEntry[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map(parseSingleTech)
    .filter((entry): entry is TechEntry => Boolean(entry && entry.name));
}

export function serializeTechEntries(entries: TechEntry[]): string[] {
  return entries
    .map((entry) => ({
      name: entry.name.trim(),
      usage: entry.usage.trim(),
    }))
    .filter((entry) => entry.name)
    .map((entry) => JSON.stringify(entry));
}

export function getTechNames(input: unknown): string[] {
  return parseTechEntries(input).map((entry) => entry.name);
}
