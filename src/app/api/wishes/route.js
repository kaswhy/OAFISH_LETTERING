export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { ok, fail, create, badRequest, internalError } from "@/lib/http";
import { listQuerySchema, createWishSchema } from "@/lib/validation";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = listQuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!parsed.success)
      return fail("Invalid query", 400, parsed.error.flatten());

    const { page, size, nickname } = parsed.data;

    const where = {
      AND: [nickname ? { nickname: { equals: nickname } } : {}],
    };

    const [total, items] = await Promise.all([
      prisma.wish.count({ where }),
      prisma.wish.findMany({
        select: {
          id: true,
          plantKey: true,
          nickname: true,
          createdAt: true,
        },
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * size,
        take: size,
      }),
    ]);

    return ok({ items, page, size, total });
  } catch (e) {
    console.error(e);
    return internalError("Internal Server Error");
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const parsed = createWishSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Invalid body", parsed.error.flatten());
    }
    const wish = await prisma.wish.create({ data: parsed.data });
    return create(wish);
  } catch (e) {
    console.error(e);
    return internalError("Internal Server Error");
  }
}
