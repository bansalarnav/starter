import { cx } from "@/utils/tw";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return <input className={cx("", className)} {...props} />;
};

export default Input;
