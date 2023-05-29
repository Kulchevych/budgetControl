import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import classes from "./styles.module.scss";
import editIcon from "../../../assets/images/menu/edit.png";
import classNames from "classnames";

export default function Balance() {
  const { balance } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className={classes.Balance}>
      <div>
        Баланс:{" "}
        <span
          className={classNames(classes.amount, {
            [classes.red]: +balance < 0,
          })}
        >
          {balance}
        </span>{" "}
        грн
      </div>
      <img
        src={editIcon}
        alt="edit-icon"
        onClick={() => {
          navigate("/home");
        }}
      />
    </div>
  );
}
