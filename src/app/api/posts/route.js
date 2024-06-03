import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
const prisma = new PrismaClient();





export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();

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








export const POST = async (req) => {
  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: { ...body },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


