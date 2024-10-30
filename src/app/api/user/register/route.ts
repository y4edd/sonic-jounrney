import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ユーザー新規登録API
export const POST = async (req: NextRequest, res:NextResponse) => {
    try {
      const { name, email, password } = await req.json();

      const exitingUser = await prisma.user.findUnique({
        where: { email },
      });

      if(exitingUser) {
        return NextResponse.json({ message: "このメールアドレスはすでに登録されています"},{status:409});
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          createdAt: new Date(),
        },
      });

      return NextResponse.json({ message: "ユーザーの登録に成功しました", user: newUser },{status:201});
    } catch (err) {
      console.error("サーバーエラーが発生しました", err);
      return NextResponse.json({message: "サーバーエラーが発生しました" },{status:500});
    }
}
