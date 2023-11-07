import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  habitId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { habitId } = params;
  const body = await request.json();
  const {
    title
  } = body;

  if (!habitId || typeof habitId !== 'string') {
    throw new Error('Invalid ID');
  }

  const habit = await prisma.habit.update({
    where: {
      id: habitId
    },
    data: {
      title
    }
  });

  return NextResponse.json(habit);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { habitId } = params;

  if (!habitId || typeof habitId !== 'string') {
    throw new Error('Invalid ID');
  }

  const habit = await prisma.habit.deleteMany({
    where: {
      id: habitId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(habit);
}


