import prisma from "@/app/libs/prismadb";

interface IParams {
  habitId?: string;
}

export default async function getListingById(
  params: IParams
) {
  try {
    const { habitId } = params;

    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
      include: {
        user: true
      }
    });

    if (!habit) {
      return null;
    }

    return {
      ...habit,
      createdAt: habit.createdAt.toString(),
      user: {
        ...habit.user,
        createdAt: habit.user.createdAt.toString(),
        updatedAt: habit.user.updatedAt.toString(),
        emailVerified:
          habit.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
