import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import classNames from "classnames";

export default function GraphBar({ item, totalAmount }) {
  const [filledBarSize, setFilledBarSize] = useState(0);

  useEffect(() => {
    setFilledBarSize(item.count / (totalAmount / 100));
  }, [item.count, totalAmount]);

  const isIncome = item.type === "Надходження";

  return (
    <div className={classes.GraphBar}>
      <div>
        <span className={classes.name}>{item?.title}</span>
        <span
          className={classNames(classes.amount, {
            [classes.green]: isIncome,
          })}
        >
          {item.amount} грн
        </span>
      </div>
      <div className={classes.bar}>
        <div
          className={classNames(classes.filledBar, {
            [classes.green]: isIncome,
          })}
          style={{ width: `${filledBarSize}%` }}
        >
          <span className={classes.count}>{item.count}</span>
        </div>
      </div>
    </div>
  );
}
