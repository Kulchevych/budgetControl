import React, { useContext, useState } from "react";
import classNames from "classnames";

import Button from "../Form/Button";
import Input from "../Form/Input";
import CalendarForm from "../CalendarForm";
import classes from "./styles.module.scss";
import { AppContext } from "../context/AppContext";

function getFormatDate(date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export default function CategoriesForm({ title, categories, type }) {
  const [amountValue, setAmountValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [details, setDetails] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const { updateRecords } = useContext(AppContext);

  const reset = () => {
    setSelectedCategory("");
  };

  const confirm = () => {
    const newRecord = {
      type,
      category: selectedCategory,
      details,
      amount: amountValue,
      date: selectedDate,
    };

    updateRecords(newRecord);
    reset();
  };

  const isConfirmButtonValidate =
    amountValue !== "" &&
    selectedCategory.length &&
    amountValue.length > 1 &&
    amountValue[0] !== "0";
  const isResetButtonValidate = amountValue?.length || selectedCategory.length;

  return (
    <div className={classes.CategoriesForm}>
      <div className={classes.container}>
        <p className={classes.title}>{title}</p>
        <div className={classes.categories}>
          {categories.map((category, index) => (
            <div
              className={classNames(classes.category, {
                [classes.active]: category === selectedCategory,
              })}
              onClick={() => setSelectedCategory(category)}
            >
              <span className={classes.categoryNumber}>{index + 1}</span>
              <span className={classes.name}>{category}</span>
            </div>
          ))}
        </div>
        <div className={classes.form}>
          <Input
            text="Введіть суму в грн: "
            value={amountValue}
            setValue={setAmountValue}
            type="number"
            placeholder="1000"
          />
          <Input
            text="Додатково (вибірково):"
            value={details}
            setValue={setDetails}
            type="text"
            size={30}
            placeholder="Наприклад, інформація про транзакцію"
          />
          <span>Категорія: {selectedCategory || "Не обрано"}</span>
          <div className={classes.date}>
            <span>Дата: {getFormatDate(selectedDate)}</span>
            <span
              className={classes.calendar}
              onClick={() => setCalendarVisible(true)}
            />
            {isCalendarVisible && (
              <CalendarForm
                setCurrentDate={setSelectedDate}
                currentDate={selectedDate}
                onClick={() => setCalendarVisible(false)}
                dateToday={new Date()}
                isModal
              />
            )}
          </div>
          <span>Сума: {amountValue || "0"}</span>
        </div>

        <div className={classes.buttons}>
          <Button
            text="Підтвердити"
            disabled={!isConfirmButtonValidate}
            onClick={confirm}
          />
          <Button
            text="Скинути"
            onClick={reset}
            disabled={!isResetButtonValidate}
          />
        </div>
      </div>
    </div>
  );
}
