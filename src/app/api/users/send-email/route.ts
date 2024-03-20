import { NextRequest, NextResponse } from "next/server";

import prisma from "@/server/db";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const OTP = Math.floor(10000000 + Math.random() * 90000000);

    // Check if user already exists
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    await sendEmail({ email, OTP });

    return NextResponse.json({
      message: "OTP Send on Email",
      success: true,
      email,
      OTP,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
