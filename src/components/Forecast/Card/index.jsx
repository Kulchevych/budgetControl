import React from "react";
import classes from "./styles.module.scss";

export default function Card({ type }) {
  return (
    <div className={classes.Card} style={{ borderLeftColor: type.color }}>
      <span>{type.title}</span>
      <div className={classes.footer}>
        <span>
          Надходження:
          <span className={classes.green}> {type.incomesForecast} </span>
          грн
        </span>
        <span>
          Витрати:
          <span className={classes.red}> {type.costsForecast} </span>
          грн
        </span>
        <span>
          Залишок:
          <span className={classes.purple}>
            {" "}
            {type.incomesForecast - type.costsForecast}{" "}
          </span>
          грн
        </span>
      </div>
    </div>
  );
}
