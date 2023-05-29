import React, { useState } from "react";
import classNames from "classnames";
import classes from "./styles.module.scss";
import Graph from "./Graph";

export default function ViewGraph({ graphData }) {
  const [activeOption, setActiveOption] = useState("По місяцях");
  const [isDropdownMenuVisible, setIsDropdownMenuVisible] = useState(false);

  const options = ["По днях", "По місяцях"];

  return (
    <div className={classes.ViewGraph}>
      <div className={classes.header}>
        <span className={classes.title}>Надходження і витрати</span>
        <div className={classes.info}>
          <span className={classes.costs}>Витрати</span>
          <span className={classes.incomes}>Надходення</span>
          <div
            className={classNames(classes.type, {
              [classes.selected]: isDropdownMenuVisible,
            })}
            onClick={() => setIsDropdownMenuVisible(!isDropdownMenuVisible)}
          >
            {activeOption}
            {isDropdownMenuVisible && (
              <div className={classes.dropdown}>
                {options.map((option) => (
                  <span
                    className={classNames(classes.option, {
                      [classes.activeOption]: activeOption === option,
                    })}
                    onClick={() => {
                      setActiveOption(option);
                      setIsDropdownMenuVisible(false);
                    }}
                    key={option}
                  >
                    {option}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Graph activeOption={activeOption} graphData={graphData} />
    </div>
  );
}
