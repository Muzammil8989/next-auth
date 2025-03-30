import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Missing verification token" },
        { status: 400 }
      );
    }

    // Find the token in the database
    const verificationToken = await prisma.token.findUnique({
      where: {
        token,
        type: "VERIFY_EMAIL",
      },
      include: {
        user: true,
      },
    });

    // Check if token exists and is valid
    if (!verificationToken) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (new Date() > verificationToken.expires) {
      // Delete expired token
      await prisma.token.delete({
        where: {
          id: verificationToken.id,
        },
      });

      return NextResponse.json(
        { message: "Verification token has expired" },
        { status: 400 }
      );
    }

    // Update user's emailVerified field
    await prisma.user.update({
      where: {
        id: verificationToken.userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    // Delete the used token
    await prisma.token.delete({
      where: {
        id: verificationToken.id,
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
