import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const envText = await readFile(path.join(root, ".env"), "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter((line) => line && !line.trim().startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^["']|["']$/g, "")];
    })
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
const bucket = "business-assets";
const folder = "mahapragya-vihar/gallery";
const files = ["IMG_1013.MOV", "IMG_1026.MOV", "IMG_1027.MOV", "IMG_1028.MOV", "IMG_1038.MOV"];

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env");
}

for (const file of files) {
  const filePath = path.join(root, "public", file);
  const body = await readFile(filePath);
  const objectPath = `${folder}/${file}`;
  const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${objectPath}`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "video/quicktime",
      "x-upsert": "true"
    },
    body
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Failed: ${file}`);
    console.error(error);
    continue;
  }

  console.log(`${file} uploaded: ${supabaseUrl}/storage/v1/object/public/${bucket}/${objectPath}`);
}
