import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req) => {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  try {
    const users = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return new NextResponse(JSON.stringify(users, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  } finally {
    await prisma.$disconnect();
  }
};
