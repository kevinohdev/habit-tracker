'use client';

import {
  SafeHabit,
  SafeUser
} from "@/app/types";
import { useRouter } from "next/navigation";
import { FormEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../Button";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import { FiArrowDown, FiArrowDownCircle, FiArrowUp, FiArrowUpCircle, FiEdit } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface HabitCardProps {
  data: SafeHabit;
  userHabit?: SafeHabit;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
  onSubmit?: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  userHabit,
  onSubmit
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [taskTitle, setTaskTitle] = useState<string>(data.title);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showDaycountForm, setShowDaycountForm] = useState<boolean>(false);
  const [dayCount, setDayCount] = useState<number>(data.count);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (disabled) {
        return;
      }

      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  const onEditTitle: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();

    axios.post(`/api/habits/${data.id}`, {
      habitId: data?.id,
      title: taskTitle
    })
      .then(() => {
        toast.success('Updated Habit Name');
        setShowInput(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
    [
      data.id,
      router,
      taskTitle
    ]);

  const onUpdateCount: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();

    if (dayCount < 0) return;

    axios.post(`/api/dayCount/${data.id}`, {
      habitId: data?.id,
      count: dayCount
    })
      .then(() => {
        toast.success('Updated # of Days');
        setShowDaycountForm(false);
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
    [
      data.id,
      router,
      dayCount
    ]);

  const increaseCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDayCount(dayCount + 1);
  }

  const decreaseCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (dayCount == 0) { return }
    setDayCount(dayCount - 1);
  }

  return (
    <div className="flex gap-2 cursor-pointer group bg-slate-100 odd:bg-slate-300 rounded-lg">
      <div className="
          flex
          flex-col
          sm:flex-row
          w-full
          gap-2
          justify-around
          items-center
          sm:p-4
        ">
        {showInput ? (
          <form className="flex flex-col w-full gap-3 p-4 rounded-lg bg-indigo-400" onSubmit={onEditTitle}>
            <h1 className="font-bold text-lg underline">Edit Title</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                className="w-full py-4 text-center text-2xl rounded-lg bg-cyan-100"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              ></input>
              <div className="flex flex-col sm:flex-row gap-2 w-full justify-between">
                <button
                  className="
                    relative
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    rounded-lg
                    hover:opacity-80
                    transition
                    p-4
                    w-full
                    sm:w-auto
                  bg-cyan-500
                    text-bold
                    text-xl
                    "
                  type="submit"
                >Confirm</button>
                <div className="flex justify-between h-full gap-10 sm:gap-6 sm:self-end">
                  <div className="flex w-1/4 sm:w-full">
                    <Button
                      del
                      label="Delete"
                      onClick={handleCancel}
                    />
                  </div>
                  <div className="flex w-1/4 sm:w-full">
                    <Button
                      label="Cancel"
                      onClick={() => setShowInput(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <>
            {(!showDaycountForm && !showInput) &&
              <div className="flex w-full p-4  text-3xl justify-center sm:w-1/3 sm:justify-start"> {data.title}</div>
            }
          </>
        )}

        {showDaycountForm ? (
          <form className="flex flex-col w-full gap-3 p-4 rounded-lg bg-indigo-300" onSubmit={onUpdateCount}>
            <h1 className="font-bold text-lg underline">Set Number of Days</h1>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="number"
                className="py-4 text-center text-2xl rounded-lg bg-cyan-100"
                min="0"
                value={dayCount}
                onChange={(e) => setDayCount(parseInt(e.target.value))}
              ></input>
              <div className="flex flex-col sm:flex-row  w-full justify-between">
                <div className="flex gap-6">
                  <Button
                    del
                    label=""
                    icon={FiArrowDownCircle}
                    onClick={decreaseCount}
                  />
                  <Button
                    label=""
                    icon={FiArrowUpCircle}
                    onClick={increaseCount}
                  />
                  <button
                    className="
                    relative
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    rounded-lg
                    hover:opacity-80
                    transition
                    p-4
                    w-full
                    sm:w-auto
                  bg-cyan-500
                  text-bold
                  text-xl
                    "
                    type="submit"
                  >Confirm</button>
                </div>
                <div className="flex justify-between mt-10 sm:mt-0 h-full gap-6">
                  <div className="flex h-full gap-6">
                    <Button
                      del
                      label="Delete"
                      onClick={handleCancel}
                    /></div>
                  <div className="flex h-full gap-6">
                    <Button
                      label="Cancel"
                      onClick={() => setShowDaycountForm(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <>
            {(!showDaycountForm && !showInput) &&
              <div className="flex w-full p-4 sm:w-1/3 justify-center">
                {(data.count === 0) && <div>Not Started Yet</div>}
                {(data.count === 1) && <div>{data.count} Day Completed</div>}
                {(data.count > 1) && <div>{data.count} Days Completed</div>}
              </div>}
          </>
        )}

        {(!showDaycountForm && !showInput) &&
          <div className="flex w-full p-4 sm:w-1/3 justify-between gap-4">
            <Button
              label="Set Days Completed"
              onClick={() => setShowDaycountForm((prev) => !prev)}
            />
            <div
              onClick={() => setShowInput((prev) => !prev)}
              className="
              flex
              w-1/3
              bg-fuchsia-300
              items-center
              justify-center
              relative
              disabled:opacity-70
              disabled:cursor-not-allowed
              rounded-lg
              hover:opacity-80
              transition
              p-4
              ">
              <FiEdit
                size={25}
              />
            </div>
          </div>
        }
      </div >
    </div >
  );
}

export default HabitCard;