type AdminRecord<T> = {
  id: string;
  collection: string;
  data: T;
  updated_at?: string;
};

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase env variables are missing.");
  }

  return { url: url.replace(/\/$/, ""), key };
}

async function supabaseRequest<T>(path: string, init: RequestInit = {}) {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers || {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || "Supabase request failed.");
  }

  if (response.status === 204) return null as T;
  return (await response.json()) as T;
}

export async function readCollection<T extends { id: string }>(collection: string) {
  const records = await supabaseRequest<AdminRecord<T>[]>(
    `admin_records?collection=eq.${encodeURIComponent(collection)}&select=id,collection,data,updated_at&order=updated_at.desc`
  );

  return records.map((record) => ({ ...record.data, id: record.id }));
}

export async function upsertRecord<T extends { id: string }>(collection: string, record: T) {
  const rows = await supabaseRequest<AdminRecord<T>[]>("admin_records?on_conflict=collection,id&select=id,collection,data,updated_at", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      id: record.id,
      collection,
      data: record,
      updated_at: new Date().toISOString()
    })
  });

  const saved = rows[0];
  return saved ? { ...saved.data, id: saved.id } : record;
}

export async function deleteRecord(collection: string, id: string) {
  await supabaseRequest(`admin_records?collection=eq.${encodeURIComponent(collection)}&id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      Prefer: "return=minimal"
    }
  });
}
