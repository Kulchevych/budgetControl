import React from "react";
import GraphPoints from "./GraphPoints";
import classes from "./styles.module.scss";

export default function Graph({ activeOption, graphData }) {
  let noData = false;

  return (
    <div className={classes.Graph}>
      <div className={classes.percents}>
        {["0", "20", "40", "60", "80", "100"].map((percent) => (
          <span className={classes.percent} key={percent}>
            {percent}
          </span>
        ))}
      </div>
      <div className={classes.bottom}>
        {activeOption === "По днях" && (
          <div className={classes.days}>
            {[
              "Понеділок",
              "Вівторок",
              "Середа",
              "Четвер",
              `П'ятниця`,
              "Субота",
              "Неділя",
            ].map((day) => (
              <span className={classes.day} key={day}>
                {day}
              </span>
            ))}
          </div>
        )}
        {activeOption === "По місяцях" && (
          <div className={classes.months}>
            {[
              "Січ",
              "Лют",
              "Бер",
              "Кві",
              "Тра",
              "Чер",
              "Лип",
              "Сер",
              "Вер",
              "Жов",
              "Лис",
              "Гру",
            ].map((month) => (
              <span className={classes.month} key={month}>
                {month}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={classes.graph}>
        {noData ? (
          <div className={classes.noData}>Даних немає</div>
        ) : (
          <GraphPoints
            data={
              activeOption === "По днях"
                ? [graphData?.daysIncomes, graphData?.daysCosts]
                : [graphData?.monthIncomes, graphData?.monthCosts]
            }
          />
        )}
      </div>
    </div>
  );
}
