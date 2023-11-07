'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  del?: boolean;
  wide?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  del,
  wide,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="submit"
      className={`
        flex
        items-center
        justify-center
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        p-4
        py-3
        text-md
        font-semibold
        border-2
        ${outline ? 'bg-white' : 'bg-kelly-green'}
        ${outline ? 'border-black' : 'border-kelly-green'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'w-1/3' : 'w-full'}
        ${del ? 'bg-red-500' : 'bg-kelly-green'}
        ${del ? 'border-red-500' : 'bg-kelly-green'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            flex
            items-center
            align-center
          "
        />
      )}
      {label}
    </button>
  );
}

export default Button;