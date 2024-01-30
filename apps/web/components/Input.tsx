import { cx } from "@/utils/tw";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cx(
        "mt-[6px] h-[50px] rounded-[6px] border-2 border-black p-[8px]",
        className
      )}
      {...props}
    />
  );
};

export default Input;
