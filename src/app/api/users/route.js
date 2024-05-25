import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();

    return new NextResponse(JSON.stringify(users, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  } finally {
    await prisma.$disconnect();
  }
};









// Create a User
export const POST = async (req) => {
  try {
    const body = await req.json();

    const user = await prisma.user.create({
      data: { ...body },
    });

    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
