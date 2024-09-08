import React from "react";

export default function Button({
  value = "",
  className,
  type,
  onclick,
  ...props
}) {
  return (
    <button type={type} className={className} onClick={onclick} {...props}>
      {value}
    </button>
  );
}
