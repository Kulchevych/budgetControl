import React from "react";
import GraphBar from "./GraphBar";
import classes from "./styles.module.scss";

export default function Graph({ data, name, totalAmount }) {
  return (
    <div className={classes.Graph}>
      <span className={classes.title}>{name}</span>
      {data?.length === 0 ? (
        <div className={classes.noData}>Даних немає</div>
      ) : (
        <>
          {data
            ?.sort((prevItem, nextItem) => nextItem.count - prevItem.count)
            .slice(0, 4)
            .map((item) => (
              <GraphBar item={item} key={item.name} totalAmount={totalAmount} />
            ))}
          <div className={classes.percents}>
            {[
              "0",
              "10",
              "20",
              "30",
              "40",
              "50%",
              "60",
              "70",
              "80",
              "90",
              "100%",
            ].map((percent) => (
              <span className={classes.percent}>{percent}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
