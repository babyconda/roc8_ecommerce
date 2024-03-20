import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const userId = await getDataFromToken(request);

    const savedData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        interests: true,
      },
    });

    return NextResponse.json({
      message: "Saved Data",
      savedData: savedData?.interests,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
