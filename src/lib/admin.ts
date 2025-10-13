import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_session";

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  return value === "ok";
}

export function setAdminAuthenticated() {
  const cookieStore = cookies();
  // Session cookie; secure in production
  cookieStore.set(ADMIN_COOKIE, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}


