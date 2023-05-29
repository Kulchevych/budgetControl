import React, { useEffect, useState } from "react";
import classNames from "classnames";
import MonthPicker from "./MonthPicker";
import YearPicker from "./YearPicker";
import classes from "./styles.module.scss";

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 1);
  const dayList = [];

  while (date.getMonth() === month) {
    dayList.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dayList;
}

export default function CalendarForm({
  currentDate,
  setCurrentDate,
  dateToday,
  events,
  isModal,
  onClick,
}) {
  const [viewDate, setViewDate] = useState(new Date(currentDate));
  const [isYearPicked, setIsYearPicked] = useState(false);
  const [isMonthPicked, setIsMonthPicked] = useState(false);

  useEffect(() => {
    setViewDate(currentDate);
  }, [currentDate]);

  const getPrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const getNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  let prevMonthDays = [];
  let nextMonthDays = [];

  if (viewDate?.getMonth() - 1 === -1) {
    prevMonthDays = getDaysInMonth(11, viewDate?.getFullYear() - 1);
  } else {
    prevMonthDays = getDaysInMonth(
      viewDate?.getMonth() - 1,
      viewDate?.getFullYear()
    );
  }

  if (viewDate?.getMonth() + 1 === 12) {
    nextMonthDays = getDaysInMonth(0, viewDate?.getFullYear() + 1);
  } else {
    nextMonthDays = getDaysInMonth(
      viewDate?.getMonth() + 1,
      viewDate?.getFullYear()
    );
  }

  let days = getDaysInMonth(viewDate?.getMonth(), viewDate?.getFullYear());

  switch (days[0]?.getDay()) {
    case 0:
      days = [...prevMonthDays.slice(-6), ...days];
      break;
    case 1:
      break;
    case 2:
      days = [...prevMonthDays.slice(-1), ...days];
      break;
    case 3:
      days = [...prevMonthDays.slice(-2), ...days];
      break;
    case 4:
      days = [...prevMonthDays.slice(-3), ...days];
      break;
    case 5:
      days = [...prevMonthDays.slice(-4), ...days];
      break;
    case 6:
      days = [...prevMonthDays.slice(-5), ...days];
      break;
    default:
      break;
  }

  switch (days[days.length - 1]?.getDay()) {
    case 2:
      days = [...days, ...nextMonthDays.slice(0, 5)];
      break;
    case 3:
      days = [...days, ...nextMonthDays.slice(0, 4)];
      break;
    case 4:
      days = [...days, ...nextMonthDays.slice(0, 3)];
      break;
    case 5:
      days = [...days, ...nextMonthDays.slice(0, 2)];
      break;
    case 6:
      days = [...days, ...nextMonthDays.slice(0, 1)];
      break;
    case 1:
      days = [...days, ...nextMonthDays.slice(0, 6)];
      break;
    case 0:
    default:
      break;
  }

  return (
    <div
      className={classes.calendar}
      style={{
        position: isModal ? "absolute" : "relative",
        top: isModal ? "-50%" : "",
        left: isModal ? "100%" : "",
        zIndex: isModal ? "1" : "auto",
        transform: isModal ? "translate(-50%, -50%)" : "auto",
      }}
    >
      <div className={classes.header}>
        <div className={classes.prev} onClick={getPrevMonth} />
        <div
          className={classNames(classes.container, {
            [classes.isActive]: isMonthPicked,
          })}
          onClick={() => {
            setIsMonthPicked(!isMonthPicked);
            setIsYearPicked(false);
          }}
        >
          <div
            className={classNames(classes.month, {
              [classes.isActive]: isMonthPicked,
            })}
          >
            {`${viewDate?.toLocaleString("uk-UA", {
              month: "long",
            })}`}
          </div>
        </div>
        <div
          className={classNames(classes.container, {
            [classes.isActive]: isYearPicked,
          })}
          onClick={() => {
            setIsYearPicked(!isYearPicked);
            setIsMonthPicked(false);
          }}
        >
          <div
            className={classNames(classes.year, {
              [classes.isActive]: isYearPicked,
            })}
          >
            {viewDate?.getFullYear()}
          </div>
        </div>
        <div className={classes.next} onClick={getNextMonth} />
      </div>
      {isYearPicked && (
        <YearPicker
          viewDate={viewDate}
          setViewDate={setViewDate}
          handleClose={() => setIsYearPicked(false)}
        />
      )}
      {isMonthPicked && (
        <MonthPicker
          viewDate={viewDate}
          setViewDate={setViewDate}
          handleClose={() => setIsMonthPicked(false)}
        />
      )}

      <div className={classes.days}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day) => (
          <div className={classes.day} key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className={classes.calendarMonth}>
        {days.map((day) => {
          const date = day.getDate();
          const month = day.getMonth();
          const year = day.getFullYear();
          const hasCostEvent = events?.some((event) => {
            const eventDate = new Date(event.date);

            return (
              eventDate.getDate() === date &&
              eventDate.getMonth() === month &&
              eventDate.getFullYear() === year &&
              event.type === "Витрати"
            );
          });
          const hasIncomeEvent = events?.some((event) => {
            const eventDate = new Date(event.date);

            return (
              eventDate.getDate() === date &&
              eventDate.getMonth() === month &&
              eventDate.getFullYear() === year &&
              event.type === "Надходження"
            );
          });

          return (
            <div
              className={classNames(classes.day, {
                [classes.selected]:
                  date === currentDate.getDate() &&
                  month === currentDate.getMonth() &&
                  year === currentDate.getFullYear(),
                [classes.today]:
                  date === dateToday.getDate() &&
                  month === dateToday.getMonth() &&
                  year === dateToday.getFullYear(),
                [classes.anotherMonth]:
                  prevMonthDays.slice(-6).includes(day) ||
                  nextMonthDays.slice(0, 6).includes(day),
                [classes.hasCostEvent]: hasCostEvent,
                [classes.hasIncomeEvent]: hasIncomeEvent,
              })}
              onClick={() => {
                setCurrentDate?.(new Date(year, month, date, 0, 0, 0));
                onClick?.();
              }}
              key={day}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
