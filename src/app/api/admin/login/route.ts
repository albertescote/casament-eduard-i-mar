import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { key } = await req.json().catch(() => ({}));
  const master = process.env.ADMIN_MASTER_KEY;
  if (!master) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  if (typeof key !== "string" || key !== master) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cookieStore = cookies();
  cookieStore.set("admin_session", "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return NextResponse.json({ ok: true });
}


