import React from "react";

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="md:mb-4 mb-2">
      <label
        htmlFor={id}
        className="block text-black/90 text-sm font-semibold md:mb-2 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full md:py-2 md:px-3 p-1 text-black/90 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}
