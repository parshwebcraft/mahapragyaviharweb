import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

export function requireAdmin() {
  const session = cookies().get(adminSessionCookieName())?.value;

  if (!verifyAdminSessionToken(session)) {
    redirect("/admin/login");
  }
}
