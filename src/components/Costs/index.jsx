import React from "react";
import classes from "./styles.module.scss";
import CategoriesForm from "../CategoriesForm";

const title = "Оберіть категорію витрат";

const categories = [
  "Продукти",
  "Житло",
  "Транспорт",
  `Здоров'я`,
  "Комунальні послуги",
  "Розваги",
  "Купівлі",
  "Подарунки",
  "Кредити",
];

export default function Costs() {
  return (
    <div className={classes.Costs}>
      <CategoriesForm title={title} categories={categories} type="Витрати" />
    </div>
  );
}
