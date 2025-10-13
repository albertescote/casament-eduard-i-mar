import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const RsvpSchema = z.object({
  fullName: z.string().min(2).max(200),
  email: z.string().email().max(200),
  attending: z.union([z.literal("yes"), z.literal("no")]),
  notes: z.string().max(2000).optional().nullable(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = RsvpSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", issues: parsed.error.format() }, { status: 400 });
    }
    const { fullName, email, attending, notes } = parsed.data;

    const created = await prisma.rsvp.create({
      data: {
        fullName,
        email: email.toLowerCase(),
        attending: attending === "yes",
        notes: notes ?? undefined,
      },
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


