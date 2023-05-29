import React, { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import classNames from "classnames";

export default function GraphBar({ item, totalAmount }) {
  const [filledBarSize, setFilledBarSize] = useState(0);

  useEffect(() => {
    setFilledBarSize(item.count / (totalAmount / 100));
  }, [item.count, totalAmount]);

  return (
    <div className={classes.GraphBar}>
      <span className={classes.name}>{item.title}</span>
      <div className={classes.bar}>
        <div
          className={classNames(classes.filledBar, {
            [classes.green]: item.type === "Надходження",
          })}
          style={{ width: `${filledBarSize}%` }}
        >
          <span className={classes.amount}>{item.count}</span>
        </div>
      </div>
    </div>
  );
}
