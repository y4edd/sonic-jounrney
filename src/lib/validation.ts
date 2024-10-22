import { z } from "zod";

export const schema = z
  .object({
    userName: z.string().min(1, "ユーザー名は必須です").max(20, "20文字以内で入力してください"),
    mailAddress: z.string().email("正しいメールアドレスを入力してください"),
    password: z.string().min(6, "6文字以上で入力してください").max(20, "20文字以内で入力してください"),
    passwordConfirm: z.string().min(6, "6文字以上で入力してください"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "パスワードが一致しません",
    path: ["passwordConfirm"],
  });
