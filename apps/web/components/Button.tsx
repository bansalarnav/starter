import { cx } from "@/utils/tw";
import React from "react";
import Loader from "./Loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  loading = false,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className={cx("rounded-[6px] bg-primary p-4 text-white", className)}
      {...props}>
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
