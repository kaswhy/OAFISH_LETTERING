export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { ok, notFound, badRequest } from "@/lib/http";
import { withError } from "@/lib/withError";

export const GET = withError(async (_req, ctx) => {
  const { id: raw } = await ctx.params;
  if (!/^\d+$/.test(raw))
    return badRequest("id는 양의 정수만 입력할 수 있습니다.");
  const id = Number(raw);
  if (!Number.isSafeInteger(id) || id <= 0)
    return badRequest("id는 양의 정수만 입력할 수 있습니다.");

  const wish = await prisma.wish.findUnique({
    where: { id },
    select: {
      id: true,
      plantKey: true,
      nickname: true,
      content: true,
      createdAt: true,
    },
  });
  if (!wish) return notFound("존재하지 않는 위시입니다.");

  return ok(wish);
});
