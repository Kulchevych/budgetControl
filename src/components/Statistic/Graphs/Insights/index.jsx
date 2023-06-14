import React from "react";

import Stat from "./Stat";
import Graph from "./Graph";
import ViewGraph from "./ViewGraph";

import classes from "./styles.module.scss";

function isThisWeek(date) {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const daysToday = Math.floor(
    (currentDate - startDate) / (24 * 60 * 60 * 1000)
  );
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

  const todayWeekNumber = Math.floor(daysToday / 7);
  const dateWeekNumber = Math.floor(days / 7);

  return todayWeekNumber === dateWeekNumber;
}

export default function Insights({ stats, metrics }) {
  const costsTotalAmount = stats.costsGraph.reduce(
    (accum, stat) => accum + stat.count,
    0
  );
  const incomeTotalAmount = stats.incomesGraph.reduce(
    (accum, stat) => accum + stat.count,
    0
  );

  const daysIncomes = [0, 0, 0, 0, 0, 0, 0];
  const daysCosts = [0, 0, 0, 0, 0, 0, 0];
  const monthIncomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const monthCosts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  stats?.incomes?.forEach((income) => {
    const incomeDate = new Date(income?.date);

    if (incomeDate.getFullYear() !== new Date().getFullYear()) {
      return;
    }

    monthIncomes[incomeDate.getMonth()] += income?.count;

    if (!isThisWeek(incomeDate)) {
      return;
    }

    if (incomeDate.getDay() === 0) {
      daysIncomes[6] += income?.count;
    } else {
      daysIncomes[incomeDate.getDay() - 1] += income?.count;
    }
  });

  stats?.costs?.forEach((cost) => {
    const costDate = new Date(cost?.date);

    if (costDate.getFullYear() !== new Date().getFullYear()) {
      return;
    }

    monthCosts[costDate.getMonth()] += cost?.count;

    if (!isThisWeek(costDate)) {
      return;
    }

    if (costDate.getDay() === 0) {
      daysCosts[6] += cost?.count;
    } else {
      daysCosts[costDate.getDay() - 1] += cost?.count;
    }
  });
  
  const graphData = {
    daysCosts,
    daysIncomes,
    monthCosts,
    monthIncomes,
  };

  return (
    <div className={classes.Insights}>
      <div className={classes.metrics}>
        {metrics.slice(0, 4).map((metric) => (
          <Stat metric={metric} key={metric.title} />
        ))}
      </div>
      <div className={classes.graphs}>
        <ViewGraph graphData={graphData} />
        <div className={classes.topGraphs}>
          <Graph
            name="Витрати за категоріями"
            data={stats.costsGraph}
            totalAmount={costsTotalAmount}
          />
          <Graph
            name="Надходження за категоріями"
            data={stats.incomesGraph}
            totalAmount={incomeTotalAmount}
          />
        </div>
      </div>
      <div className={classes.metrics}>
        {metrics.slice(4).map((metric) => (
          <Stat metric={metric} key={metric.title} />
        ))}
      </div>
    </div>
  );
}
