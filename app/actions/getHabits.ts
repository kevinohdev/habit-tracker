import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getHabits() {
  try {
    const currentUser = await getCurrentUser();

    const habits = await prisma.habit.findMany({
      where: {
        userId: currentUser?.id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeHabits = habits.map((habit) => (
      {
        ...habit,
        createdAt: habit.createdAt.toISOString()
      }
    ));

    return safeHabits;
  } catch (error: any) {
    throw new Error(error);
  }
};