'use client';

import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";

interface HabitHeadProps {
  title: string;
  id: string;
  currentUser?: SafeUser | null
}

const HabitHead: React.FC<HabitHeadProps> = ({
  title,
  id,
  currentUser
}) => {
  return (
    <>
      <Heading
        title={title}
      />
    </>
  );
}

export default HabitHead;