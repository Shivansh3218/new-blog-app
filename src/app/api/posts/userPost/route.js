import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req) => {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorEmail: email,
      },
    });

    return new NextResponse(JSON.stringify(posts, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  } finally {
    await prisma.$disconnect();
  }
};
