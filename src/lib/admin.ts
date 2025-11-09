import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_session_772165ca-7ca8-487f-b332-2aaf7247a3c6";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  return value === "ok";
}

export async function setAdminAuthenticated() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}
