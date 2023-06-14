import React from "react";
import classes from "./styles.module.scss";
import CategoriesForm from "../CategoriesForm";

const title = "Оберіть категорію надходження";

const categories = [
  "Зарплатня",
  "Хобі",
  "Стипендія",
  "Пенсія",
  "Соціальні виплати",
  "Інше",
];

export default function Income() {
  return (
    <div className={classes.Income}>
      <CategoriesForm
        title={title}
        categories={categories}
        type="Надходження"
      />
    </div>
  );
}
