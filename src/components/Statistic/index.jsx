import React, { useContext, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import CalendarForm from "../CalendarForm";
import Graphs from "./Graphs";
import DayInfo from "./DayInfo";
import { AppContext } from "../context/AppContext";

const calendarInfo = [
  {
    type: "square",
    color: "rgb(161, 73, 219)",
    description: "Сьогоднішній день",
  },
  {
    type: "square",
    color:
      "linear-gradient(228.41deg, #00E4AC 0%, #10C5E9 53.88%, #9240DC 106.71%)",
    description: "Обраний день",
  },
  {
    type: "circle",
    color: "rgb(3, 247, 3)",
    description: "Надходження коштів",
  },
  { type: "circle", color: "red", description: "Витрати коштів" },
];

export default function Statistic() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [dateToday] = useState(new Date());

  const { records } = useContext(AppContext);

  useEffect(() => {
    if (records) {
      setEvents([...records]);
    }
  }, [records]);

  return (
    <div className={classes.Statistic}>
      <div className={classes.leftPanel}>
        <CalendarForm
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          dateToday={dateToday}
          events={events}
          onClick={() => setIsDateSelected(true)}
        />
        <div className={classes.calendarInfo}>
          {calendarInfo.map((info) => (
            <div className={classes.info} key={info.description}>
              <span
                className={classes.infoColor}
                style={{
                  background: info.color,
                  borderRadius: info.type === "circle" ? "50%" : "4px",
                }}
              />
              <span> - </span>
              <span>{info.description}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.rigthPanel}>
        {isDateSelected && (
          <DayInfo
            events={events}
            handleClose={() => setIsDateSelected(false)}
            currentDate={currentDate}
          />
        )}
        <Graphs isDateSelected={isDateSelected} events={events} />
      </div>
    </div>
  );
}
