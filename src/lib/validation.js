import { z } from "zod";

export const nicknameSchema = z
  .string()
  .min(1, "닉네임은 1자 이상이어야 합니다.")
  .max(10, "닉네임은 10자 이하로 입력하세요.")
  .regex(
    /^[A-Za-z0-9가-힣 ]+$/,
    "닉네임은 한글, 영문, 숫자, 공백만 사용할 수 있어요."
  );

export const contentSchema = z
  .string()
  .min(1, "본문은 1자 이상이어야 합니다.")
  .max(200, "본문은 공백 포함 200자 이하로 입력하세요.");

export const phoneSchema = z.string().regex(/^\d{11}$/, {
  message: "11자리 숫자만 입력하세요",
});

export const createWishSchema = z.object({
  nickname: nicknameSchema,
  content: contentSchema,
  phoneNumber: phoneSchema,
  plantKey: z.enum([
    "daisy",
    "rose",
    "mugung",
    "sunflower",
    "freesia",
    "susun",
  ]),
});

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  size: z.coerce.number().int().min(1).max(100).default(9),
  nickname: z.string().min(1).max(10).optional(),
});
