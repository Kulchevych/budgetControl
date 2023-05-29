import React from "react";
import classNames from "classnames";
import classes from "./styles.module.scss";

export default function Stat({ metric }) {
  return (
    <div className={classes.Stat}>
      <span className={classes.title}>{metric.title}</span>
      <div className={classes.container}>
        <>
          <div
            className={classNames(classes.amount, {
              [classes.zero]: metric.amount === 0,
            })}
            style={{ color: metric.color }}
          >
            {!Number.isFinite(+metric.amount.split("грн")[0]) ? "0" : metric.amount}
          </div>
        </>
      </div>
    </div>
  );
}
