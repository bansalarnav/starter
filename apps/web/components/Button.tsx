import { cx } from "@/utils/tw";
import React from "react";

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
    <button className={cx("", className)} {...props}>
      {loading ? "Loading" : children}
    </button>
  );
};

export default Button;
