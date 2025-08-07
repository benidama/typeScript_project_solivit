import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="mb-2">
    {label && <label className="block text-sm mb-1">{label}</label>}
    <input
      {...props}
      className={`border p-2 w-full rounded ${props.className || ""}`}
    />
  </div>
);

export default Input;
