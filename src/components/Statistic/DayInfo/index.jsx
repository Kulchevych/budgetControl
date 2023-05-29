import React from "react";
import classes from "./styles.module.scss";
import EventCard from "./EventCard";

export default function DayInfo({ events, handleClose, currentDate }) {
  const incomes = events.filter((event) => {
    const date = new Date(event.date);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return (
      event.type === "Надходження" &&
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    );
  });
  const costs = events.filter((event) => {
    const date = new Date(event.date);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return (
      event.type === "Витрати" &&
      day === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    );
  });

  if (incomes.length === 0 && costs.length === 0) {
    handleClose();
  }

  return (
    <div className={classes.DayInfo}>
      <span className={classes.close} onClick={handleClose}>
        +
      </span>
      <div className={classes.content}>
        <div className={classes.leftPanel}>
          <span className={classes.title}>Надходження</span>
          <span>-</span>
          <div className={classes.container}>
            {incomes.length === 0 ? (
              <span>Немає надходжень</span>
            ) : (
              incomes.map((income) => (
                <EventCard
                  event={income}
                  key={`${income.date} ${income.amount}`}
                />
              ))
            )}
          </div>
        </div>
        <div className={classes.leftPanel}>
          <span className={classes.title}>Витрати</span>
          <span>-</span>
          <div className={classes.container}>
            {costs.length === 0 ? (
              <span>Немає витрат</span>
            ) : (
              costs.map((cost) => (
                <EventCard event={cost} key={`${cost.date} ${cost.amount}`} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
