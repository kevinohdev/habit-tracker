'use client';

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import useHabitModal from "@/app/hooks/useHabitModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { Calendar } from "react-date-range";

const HabitModal = () => {
  const router = useRouter();
  const habitModal = useHabitModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
    }
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/habits', data)
      .then(() => {
        toast.success('Habit successfully created!');
        router.refresh();
        reset();
        habitModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Your new habit"
      />
      <Input
        id="title"
        label=""
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={habitModal.isOpen}
      onClose={habitModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Submit"
      title="Start a new habit"
      body={bodyContent}
    />
  );
}

export default HabitModal;