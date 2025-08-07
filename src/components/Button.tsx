import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => (
  <button
    {...props}
    className={`bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition ${className}`}
  >
    {children}
  </button>
);

export default Button;
