import React from "react";
import classes from "./styles.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

export default function Tab({ tab, activeTab, setActiveTab, width }) {
  const handleClickOnTab = () => {
    setActiveTab?.(tab.tab);
    navigate(tab.link);
  };

  const navigate = useNavigate();

  return (
    <li
      className={classNames(classes.Tab, {
        [classes.activeTab]: tab.tab === activeTab,
      })}
      onClick={handleClickOnTab}
    >
      <img src={tab.image} alt="tab-icon" width={width} />
      <span>{tab.tab}</span>
    </li>
  );
}
