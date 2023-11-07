import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  };

  const body = await request.json();

  const {
    title,
    description,
  } = body;

  const habit = await prisma.habit.create({
    data: {
      title,
      description,
      userId: currentUser.id
    }
  });

  return NextResponse.json(habit);
};