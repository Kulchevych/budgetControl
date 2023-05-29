import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

import Card from "./Card";
import classes from "./styles.module.scss";

export default function Forecast() {
  const { records } = useContext(AppContext);

  const types = useMemo(() => {
    const incomes = records.filter((event) => event.type === "Надходження");
    const costs = records.filter((event) => event.type === "Витрати");

    const monthlyIncomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthlyCosts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (const cost of costs) {
      const currentDate = new Date(cost.date);
      const month = currentDate.getMonth();

      monthlyCosts[month] += +cost.amount;
    }

    for (const income of incomes) {
      const currentDate = new Date(income.date);
      const month = currentDate.getMonth();

      monthlyIncomes[month] += +income.amount;
    }

    const monthCostsForecast = Math.round(
      monthlyCosts.reduce((accum, amount) => accum + amount, 0) /
        monthlyCosts.filter((amount) => amount !== 0).length || 0
    );
    const monthIncomesForecast = Math.round(
      monthlyIncomes.reduce((accum, amount) => accum + amount, 0) /
        monthlyIncomes.filter((amount) => amount !== 0).length || 0
    );

    return [
      {
        title: "Прогноз на день",
        color: "rgb(255, 135, 37)",
        incomesForecast: Math.round(monthIncomesForecast / 4 / 7),
        costsForecast: Math.round(monthCostsForecast / 4 / 7),
      },
      {
        title: "Прогноз на тиждень",
        color: "red",
        incomesForecast: Math.round(monthIncomesForecast / 4),
        costsForecast: Math.round(monthCostsForecast / 4),
      },
      {
        title: "Прогноз на місяць",
        color: "rgb(161, 73, 219)",
        incomesForecast: monthIncomesForecast,
        costsForecast: monthCostsForecast,
      },
      {
        title: "Прогноз на 2 місяці",
        color: "rgb(255, 135, 37)",
        incomesForecast: monthIncomesForecast * 2,
        costsForecast: monthCostsForecast * 2,
      },
      {
        title: "Прогноз на 3 місяці",
        color: "red",
        incomesForecast: monthIncomesForecast * 3,
        costsForecast: monthCostsForecast * 3,
      },
      {
        title: "Прогноз на пів року",
        color: "rgb(161, 73, 219)",
        incomesForecast: monthIncomesForecast * 6,
        costsForecast: monthCostsForecast * 6,
      },
      {
        title: "Прогноз на рік",
        color: "rgb(161, 73, 219)",
        incomesForecast: monthIncomesForecast * 12,
        costsForecast: monthCostsForecast * 12,
      },
    ];
  }, [records]);
  return (
    <div className={classes.Forecast}>
      <div className={classes.container}>
        {types.map((type) => (
          <Card type={type} key={type.title} />
        ))}
      </div>
    </div>
  );
}
