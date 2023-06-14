import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Balance from "./Balance";
import Tab from "./Tab";
import classes from "./styles.module.scss";

import logo from "../../assets/images/menu/logo.png";
import incomeIcon from "../../assets/images/menu/income.png";
import costsIcon from "../../assets/images/menu/costs.png";
import statisticIcon from "../../assets/images/menu/statistic.png";
import forecastIcon from "../../assets/images/menu/forecast.png";
import settingsIcon from "../../assets/images/menu/settings.png";

const tabs = [
  { tab: "Введення витрат", image: costsIcon, link: "/costs" },
  { tab: "Введення доходів", image: incomeIcon, link: "/income" },
  { tab: "Статистика", image: statisticIcon, link: "/statistic" },
  { tab: "Прогнозування", image: forecastIcon, link: "/forecast" },
  { tab: "Налаштування", image: settingsIcon, link: "/settings" },
];

export default function Header() {
  const [activeTab, setActiveTab] = useState("");

  const navigate = useNavigate();

  const currentURL = window.location.href;

  useEffect(() => {
    setActiveTab(tabs?.find((tab) => currentURL.includes(tab.link))?.tab);
  }, [currentURL]);

  let isShouldShowHeader;

  if (currentURL.includes("home")) {
    isShouldShowHeader = false;
  } else {
    isShouldShowHeader = true;
  }

  return (
    <header className={classes.Header}>
      <img
        src={logo}
        alt="logo"
        width={70}
        onClick={() => {
          navigate("home");
          setActiveTab("");
        }}
      />
      {isShouldShowHeader && (
        <>
          <div className={classes.navMenu}>
            <ul className={classes.tabs}>
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  tab={tab}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  width={30}
                />
              ))}
            </ul>
          </div>
          <Balance />
        </>
      )}
    </header>
  );
}
