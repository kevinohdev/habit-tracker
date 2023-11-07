'use client';

import { SafeUser } from "@/app/types";
import Button from "../Button";
import Container from "../Container";

import useHabitModal from "@/app/hooks/useHabitModal";



const AddTodo: React.FC = () => {
  const habitModal = useHabitModal();

  return (
    <div className="
        flex
        items-center
        justify-center
        w-full
        p-1
      ">
      <Button
        small
        label="Start a New Habit"
        onClick={habitModal.onOpen}
      ></Button>
    </div>
  );
}

export default AddTodo;