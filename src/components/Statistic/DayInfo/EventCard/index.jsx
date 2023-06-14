import React, { useContext } from "react";
import classes from "./styles.module.scss";
import Button from "../../../Form/Button";
import classNames from "classnames";
import { AppContext } from "../../../context/AppContext";

const getFormatDate = (date) => {
  const eventDate = new Date(date);
  return `${eventDate.getDate()} ${eventDate.toLocaleString("uk-UA", {
    month: "short",
  })} ${eventDate.getFullYear()}`;
};

export default function EventCard({ event }) {
  const { deleteRecord } = useContext(AppContext);

  const deleteEvent = () => deleteRecord(event);

  return (
    <div className={classes.EventCard}>
      <div
        className={classNames(classes.info, {
          [classes.green]: event.type === "Надходження",
        })}
      >
        <span className={classes.category}>{event.category}</span>
        <span className={classes.date}>{getFormatDate(event.date)}</span>
      </div>
      <div className={classes.footer}>
        <span className={classes.details}>{event?.details}</span>
        <span className={classes.amount}>
          {event.type === "Надходження" ? "+" : "-"}
          <span
            className={classNames({ [classes.red]: event.type === "Витрати" })}
          >
            {event.amount}
          </span>
          {` грн`}
        </span>
        <div className={classes.buttons}>
          <Button text="Видалити" width={100} onClick={deleteEvent} />
        </div>
      </div>
    </div>
  );
}
