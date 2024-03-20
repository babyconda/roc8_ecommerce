import { NextRequest, NextResponse } from "next/server";

import prisma from "@/server/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();

    const userId = await getDataFromToken(request);

    const updateUserIntrest = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        interests: reqBody,
      },
    });

    const { interests } = updateUserIntrest;

    return NextResponse.json({
      message: "Registration Successful",
      success: true,
      interests,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
