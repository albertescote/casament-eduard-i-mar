import { z } from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Zod schema for the new payload
const RsvpSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .max(200)
    .transform((s) => s.trim()),
  attending: z.union([z.literal("yes"), z.literal("no")]),
  bus: z.union([z.literal("yes"), z.literal("no")]),
  dietary: z
    .object({
      vegetarian: z.boolean().optional().default(false),
      vegan: z.boolean().optional().default(false),
      celiac: z.boolean().optional().default(false),
    })
    .optional()
    .default({ vegetarian: false, vegan: false, celiac: false }),
  allergies: z
    .string()
    .max(2000)
    .optional()
    .transform((v) => (v && v.trim().length ? v.trim() : undefined)),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = RsvpSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.format() },
        { status: 400 },
      );
    }

    const { fullName, attending, bus, dietary, allergies } = parsed.data;

    const created = await prisma.rsvp.create({
      data: {
        fullName,
        attending: attending === "yes",
        bus: bus === "yes",
        vegetarian: dietary.vegetarian ?? false,
        vegan: dietary.vegan ?? false,
        celiac: dietary.celiac ?? false,
        allergies,
      },
      select: { id: true },
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
