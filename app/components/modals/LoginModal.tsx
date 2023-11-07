'use client';

import { signIn } from 'next-auth/react'
import axios from "axios";
import { ReactHTML, useCallback, useState } from "react";
import { toast } from 'react-hot-toast';

import {
  Field,
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from 'next/navigation';


const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [emailValue, setEmailValue] = useState('')

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })


  const onSubmit: SubmitHandler<FieldValues> =
    (data) => {
      setIsLoading(true);

      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          setIsLoading(false);

          if (callback?.ok) {
            toast.success('Logged in');
            router.refresh();
            loginModal.onClose();
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
    }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);




  const bodyContent = (
    <div className="
      flex
      flex-col
      gap-4
    ">
      <Heading
        title="Track your Habits"
        subtitle="Login to your Account"
      />
      <div className="w-full relative">
        <input
          id="email"
          disabled={isLoading}
          {...register('email', { required: true })}
          placeholder=" "
          type='text'
          value={emailValue}
          onChange={(e) => setEmailValue((e.target.value).toLowerCase())}
          className="
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          border-neutral-300
          focus:border-black
        "
        />
        <label
          className="
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          left-4
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          text-zinc-400
        "
        >
          Email
        </label>
      </div>
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-row items-center justify-center gap-2 p-2">
      <p>First time using Habit Tracker?</p>
      <span
        onClick={onToggle}
        className="
          text-neutral-800
          cursor-pointer
          hover:underline
          ">
        Create an Account
      </span>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;