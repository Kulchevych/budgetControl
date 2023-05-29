import React, { useMemo } from "react";
import classes from "./styles.module.scss";
import Insights from "./Insights";

export default function Graphs({ isDateSelected, events }) {
  const stats = useMemo(() => {
    const incomesCategoriesCount = [];
    const costsCategoriesCount = [];

    events.forEach((event) => {
      if (event.type === "Надходження") {
        const hasIncomesCategoriesAlreadyCount = incomesCategoriesCount.find(
          (count) => count.title === event.category
        );

        if (hasIncomesCategoriesAlreadyCount) {
          hasIncomesCategoriesAlreadyCount.count += 1;
        } else {
          incomesCategoriesCount.push({
            type: "Надходження",
            title: event.category,
            count: 1,
          });
        }
      } else {
        const hasCostsCategoriesAlreadyCount = costsCategoriesCount.find(
          (count) => count.title === event.category
        );

        if (hasCostsCategoriesAlreadyCount) {
          hasCostsCategoriesAlreadyCount.count += 1;
        } else {
          costsCategoriesCount.push({
            type: "Витрати",
            title: event.category,
            count: 1,
          });
        }
      }
    });

    return {
      incomesGraph: incomesCategoriesCount,
      costsGraph: costsCategoriesCount,
      incomes: events
        .filter((event) => event.type === "Надходження")
        .map((income) => ({ date: income.date, count: +income.amount })),
      costs: events
        .filter((event) => event.type === "Витрати")
        .map((cost) => ({ date: cost.date, count: +cost.amount })),
    };
  }, [events]);

  const metrics = useMemo(() => {
    const incomes = events.filter((event) => event.type === "Надходження");
    const costs = events.filter((event) => event.type === "Витрати");

    const allIncomes = incomes.reduce(
      (accum, income) => +accum + +income.amount,
      0
    );

    const allCosts = costs.reduce((accum, cost) => +accum + +cost.amount, 0);

    const uniqueMonths = {};

    for (const cost of costs) {
      const currentDate = new Date(cost.date);
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      const key = month + "-" + year;

      if (!uniqueMonths[key]) {
        uniqueMonths[key] = 1;
      } else {
        uniqueMonths[key]++;
      }
    }

    const costsAmountPerMonth = allCosts / Object.keys(uniqueMonths).length;

    const uniqueDays = [];

    for (const cost of costs) {
      const currentDate = new Date(cost.date);

      const dateString = currentDate.toISOString().slice(0, 10);

      if (!uniqueDays.includes(dateString)) {
        uniqueDays.push(dateString);
      }
    }

    const costsAmountPerDay = allCosts / uniqueDays.length;

    return [
      {
        title: "Всього надходжень",
        amount: `${allIncomes} грн`,
        color: "#00E4AC",
      },
      {
        title: "Всього витрат",
        amount: `${allCosts} грн`,
      },
      {
        title: "Фінансовий баланс",
        amount: `${allIncomes - allCosts} грн`,
        color: "rgb(255, 136, 39)",
      },
      {
        title: "Співвідношення доходів і витрат",
        amount: (allIncomes / allCosts).toFixed(2),
        color: "#0050e4",
      },
      {
        title: "Середня кількість витрат на день",
        amount: `${costsAmountPerDay.toFixed(2)} грн`,
      },
      {
        title: "Середня кількість витрат на місяць",
        amount: `${costsAmountPerMonth.toFixed(2)} грн`,
      },
    ];
  }, [events]);

  return (
    <div
      className={classes.Graphs}
      style={{ height: !isDateSelected ? "calc(100vh - 180px)" : "" }}
    >
      <Insights stats={stats} metrics={metrics} />
    </div>
  );
}
