import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ACCESS_PASSWORD || "";

  const ok = typeof password === "string" && password === expected;

  if (!ok) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("wedding_auth_d60eeb9b-f82b-4c8a-8d1b-878621647408", "ok", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
