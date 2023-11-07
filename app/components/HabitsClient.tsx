'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeHabit, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import HabitCard from "@/app/components/habits/HabitCard";
import AddTodo from "./navbar/AddTodo";

interface HabitClientProps {
  userHabits: SafeHabit[],
  currentUser?: SafeUser | null
}

const HabitClient: React.FC<HabitClientProps> = ({
  userHabits,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/habits/${id}`)
      .then(() => {
        toast.success('Habit Deleted');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [router]);

  return (
    <Container>
      <AddTodo></AddTodo>
      <div
        className="
          grid
          grid-row-1
          gap-4
        "
      >
        <div className="py-6 text-5xl font-bold">My Habits</div>
        {userHabits.map((userHabit: any) => (
          <HabitCard
            key={userHabit.id}
            data={userHabit}
            userHabit={userHabit}
            actionId={userHabit.id}
            onAction={onCancel}
            disabled={deletingId === userHabit.id}
            actionLabel="Cancel dayCompleted"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default HabitClient;