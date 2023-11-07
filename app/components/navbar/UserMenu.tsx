'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useHabitModal from '@/app/hooks/useHabitModal';

import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null;
  onClick?: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const habitModal = useHabitModal();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onHabit = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    habitModal.onOpen();
  }, [loginModal, habitModal, currentUser]);

  const handleClick = useCallback(() => {
    setIsOpen((value) => !value);
    router.push('/')
  }, [router]);

  const handleLogOut = useCallback(() => {
    setIsOpen((value) => !value);
    signOut();
    router.push('/');
  }, [router]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="
        p-2
        border-[1px] 
        border-neutral-200 
        flex 
        flex-row 
        items-center 
        gap-3 
        rounded-full 
        cursor-pointer 
        hover:shadow-md 
        transition
      ">
          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-[10vw]
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
        ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={handleLogOut}
                  label='Log Out'
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label='Login'
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label='Sign Up'
                />
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;