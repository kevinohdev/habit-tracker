import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

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

  const body = await request.json();
  const { habitId } = params;

  const {
    count
  } = body;

  const habit = await prisma.habit.update({
    where: {
      id: habitId
    },
    data: {
      count
    }
  });

  return NextResponse.json(habit);
};