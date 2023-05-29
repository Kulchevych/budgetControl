/* eslint-disable no-plusplus */
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import classes from "./styles.module.scss";

export default function YearPicker({ viewDate, setViewDate, handleClose }) {
  const size = {
    from: 1900,
    to: 2100,
  };
  const positionRef = useRef(null);
  const years = [];

  for (let i = size.from; i <= size.to; i++) {
    years.push(i);
  }

  const setViewYear = (year) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
  };

  useEffect(() => {
    positionRef.current.scrollTop =
      Math.floor((viewDate.getFullYear() - size.from) / 3) * 50 - 150;
  }, [size.from, viewDate]);

  return (
    <div className={classes.container} ref={positionRef}>
      {years.map((year) => (
        <div
          className={classNames(classes.year, {
            [classes.activeYear]: year === viewDate.getFullYear(),
          })}
          key={year}
          onClick={() => {
            setViewYear(year);
            handleClose();
          }}
        >
          {year}
        </div>
      ))}
    </div>
  );
}
