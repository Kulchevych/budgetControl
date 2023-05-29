import React, { useContext, useEffect, useState } from "react";
import classes from "./styles.module.scss";

import incomeIcon from "../../assets/images/menu/income.png";
import costsIcon from "../../assets/images/menu/costs.png";
import statisticIcon from "../../assets/images/menu/statistic.png";
import forecastIcon from "../../assets/images/menu/forecast.png";
import settingsIcon from "../../assets/images/menu/settings.png";
import Tab from "../Header/Tab";
import Balance from "./Balance";
import { AppContext } from "../context/AppContext";
import CalendarForm from "../CalendarForm";

const tabs = [
  { tab: "Введення витрат", image: costsIcon, link: "/costs" },
  { tab: "Введення доходів", image: incomeIcon, link: "/income" },
  { tab: "Статистика", image: statisticIcon, link: "/statistic" },
  { tab: "Прогнозування", image: forecastIcon, link: "/forecast" },
  { tab: "Налаштування", image: settingsIcon, link: "/settings" },
];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateToday] = useState(new Date());

  const { records } = useContext(AppContext);

  useEffect(() => {
    if (records) {
      setEvents([...records]);
    }
  }, [records]);

  return (
    <div className={classes.Home}>
      <div className={classes.header}>
        <div className={classes.calendar}>
          <span className={classes.title}>Календар</span>
          <CalendarForm
            currentDate={currentDate}
            dateToday={dateToday}
            events={events}
          />
        </div>
        <div className={classes.container}>
          <span className={classes.title}>Баланс</span>
          <Balance />
        </div>
      </div>
      <div className={classes.container}>
        <span className={classes.title}>Розділи</span>
        <ul className={classes.tabs}>
          {tabs.map((tab) => (
            <Tab key={tab.tab} tab={tab} width={100} />
          ))}
        </ul>
      </div>
    </div>
  );
}
