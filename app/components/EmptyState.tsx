'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Start a New Habit",
  subtitle = "",
  showReset
}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
  "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Log In"
            onClick={loginModal.onOpen}
          />
        )}
      </div>
      <div className="p-4">or</div>
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Sign Up"
            onClick={registerModal.onOpen}
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState;