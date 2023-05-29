import classNames from "classnames";
import React from "react";
import classes from "./styles.module.scss";

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export default function MonthPicker({ viewDate, setViewDate, handleClose }) {
  const setViewMonth = (month) => {
    setViewDate(new Date(viewDate.getFullYear(), month, 1));
  };

  return (
    <div className={classes.container}>
      {months.map((month, i) => (
        <div
          className={classNames(classes.month, {
            [classes.activeMonth]: i === viewDate.getMonth(),
          })}
          key={month}
          onClick={() => {
            setViewMonth(i);
            handleClose();
          }}
        >
          {month}
        </div>
      ))}
    </div>
  );
}
