/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
import React, { useEffect, useRef, useState } from "react";
import GraphDetail from "./GraphDetail";
import classes from "./styles.module.scss";

function createBezierPath(points) {
  if (!points.length) {
    return [];
  }

  let d = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points?.length - 1; i++) {
    const xc = (points[i][0] + points[i + 1][0]) / 2;
    const yc = (points[i][1] + points[i + 1][1]) / 2;
    d += ` Q ${points[i][0]} ${points[i][1]}, ${xc} ${yc}`;
  }

  d += ` T ${points[points?.length - 1][0]} ${points[points?.length - 1][1]}`;
  return d;
}

export default function GraphPoints({ data }) {
  const [firstPoints, setFirstPoints] = useState([]);
  const [secondPoints, setSecondPoints] = useState([]);
  const [, setIsLoaded] = useState(false);
  const [isDetailInfoVisible, setIsDetailInfoVisible] = useState(false);
  const [graphDetailInfo, setGraphDetailInfo] = useState(null);

  const graphRef = useRef();

  const totalFirstAmount =
    data[0].reduce((accum, item) => accum + item, 0) || 1;
  const totalSecondAmount =
    data[1].reduce((accum, item) => accum + item, 0) || 1;

  useEffect(() => {
    setFirstPoints([
      ...data[0]?.map((item, index) => {
        const x = index * (100 / (data[0].length - 1)) * 6.4;
        let y = (item / (totalFirstAmount / 100)) * 3.38;

        if (index === 0 || index === data[0].length - 1) {
          y = (item / (totalFirstAmount / 100)) * 2.54;
        }

        return [x || 0, -y || 0];
      }),
    ]);
    setSecondPoints([
      ...data[1]?.map((item, index) => {
        const x = index * (100 / (data[1].length - 1)) * 6.4;
        let y = (item / (totalSecondAmount / 100)) * 3.38;

        if (index === 0 || index === data[1].length - 1) {
          y = (item / (totalSecondAmount / 100)) * 2.54;
        }
        return [x || 0, -y || 0];
      }),
    ]);
  }, [data, totalFirstAmount, totalSecondAmount]);

  const firstPath = createBezierPath(firstPoints);
  const secondPath = createBezierPath(secondPoints);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleClick = (event, points, counts) => {
    const rect = graphRef?.current?.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const countIndex = points?.findIndex((item) => {
      if (x <= points[1][0] / 2) {
        return true;
      }

      if (x >= item[0] - points[1][0] / 2 && x <= item[0] + points[1][0] / 2) {
        return true;
      }

      return false;
    });

    setGraphDetailInfo((prev) => ({
      ...prev,
      name: event.target.getAttribute("name"),
      count: counts[countIndex],
      color: event.target.getAttribute("stroke"),
      x,
      y,
    }));

    setIsDetailInfoVisible(true);
  };

  return (
    <div className={classes.views} ref={graphRef}>
      <svg>
        <path
          d={firstPath}
          stroke="#00E4AC"
          strokeWidth="3px"
          name="Надходження"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          onClick={(event) => handleClick(event, firstPoints, data[0])}
        />
        <path
          d={secondPath}
          stroke="#6722D2"
          strokeWidth="3px"
          name="Витрати"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          onClick={(event) => handleClick(event, secondPoints, data[1])}
        />
      </svg>
      {isDetailInfoVisible && (
        <GraphDetail
          name={graphDetailInfo?.name}
          color={graphDetailInfo?.color}
          count={graphDetailInfo?.count}
          top={graphDetailInfo?.y}
          left={graphDetailInfo?.x}
          handleClose={() => setIsDetailInfoVisible(false)}
        />
      )}
    </div>
  );
}
