import React from "react";
import classes from "./styles.module.scss";

export default function Input({
  text,
  value,
  size,
  type,
  setValue,
  placeholder,
  width,
  fontSize,
  reference,
}) {
  const hanleOnChange = (event) => {
    setValue(event?.target?.value);
  };

  return (
    <div className={classes.inputField}>
      <span className={classes.label}>{text}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={hanleOnChange}
        style={{ width, fontSize }}
        ref={reference}
        maxLength={size}
      />
    </div>
  );
}
