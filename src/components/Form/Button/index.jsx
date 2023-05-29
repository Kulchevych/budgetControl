import React from "react";
import classes from "./styles.module.scss";

export default function Button({ text, width, onClick, disabled }) {
  return (
    <button
      type="button"
      className={classes.Button}
      style={{ width }}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
