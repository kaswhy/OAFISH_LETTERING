export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { ok, notFound } from "@/lib/http";
import { withError } from "@/lib/withError";

export const GET = withError(async (_req, { params }) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) return badRequest('Invalid id');

  const wish = await prisma.wish.findUnique({ where: { id } });
  if (!wish) return notFound('존재하지 않는 위시입니다.');

  return ok(wish);
});
