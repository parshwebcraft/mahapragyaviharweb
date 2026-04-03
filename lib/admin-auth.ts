import crypto from "crypto";

const SESSION_COOKIE = "mv_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "change-this-to-a-long-random-string";
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@parshwebcraft.in",
    password: process.env.ADMIN_PASSWORD || "admin123"
  };
}

export function createAdminSessionToken(email: string) {
  const payload = JSON.stringify({
    email,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000
  });
  const body = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;

  const [body, sig] = token.split(".");
  if (!body || !sig) return false;

  const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  if (expected !== sig) return false;

  try {
    const decoded = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      email?: string;
      exp?: number;
    };

    if (!decoded.email || typeof decoded.exp !== "number") {
      return false;
    }

    return decoded.exp > Date.now();
  } catch {
    return false;
  }
}

export function adminSessionCookieName() {
  return SESSION_COOKIE;
}
