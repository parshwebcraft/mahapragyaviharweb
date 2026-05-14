export function readClientRecords<T>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeClientRecords<T>(key: string, records: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(records));
}

export function mergeClientRecords<T extends { id: string }>(key: string, serverRecords: T[]) {
  const clientRecords = readClientRecords<T>(key);
  const removedIds = readClientRecords<string>(`${key}:removed`);
  const merged = new Map<string, T>();

  serverRecords.forEach((record) => {
    if (!removedIds.includes(record.id)) merged.set(record.id, record);
  });

  clientRecords.forEach((record) => {
    if (!removedIds.includes(record.id)) merged.set(record.id, record);
  });

  return Array.from(merged.values());
}

export function upsertClientRecord<T extends { id: string }>(key: string, record: T) {
  const records = readClientRecords<T>(key);
  const nextRecords = [record, ...records.filter((item) => item.id !== record.id)];
  const removedIds = readClientRecords<string>(`${key}:removed`).filter((id) => id !== record.id);

  writeClientRecords(key, nextRecords);
  writeClientRecords(`${key}:removed`, removedIds);
  return nextRecords;
}

export function removeClientRecord<T extends { id: string }>(key: string, id: string) {
  const records = readClientRecords<T>(key).filter((record) => record.id !== id);
  const removedIds = Array.from(new Set([...readClientRecords<string>(`${key}:removed`), id]));

  writeClientRecords(key, records);
  writeClientRecords(`${key}:removed`, removedIds);
  return records;
}
