import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import classNames from "classnames";

import Button from "../../Form/Button";
import Input from "../../Form/Input";
import classes from "./styles.module.scss";

export default function Balance() {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("0");

  const inputRef = useRef(null);

  const { balance, updateBalance } = useContext(AppContext);

  useEffect(() => {
    if (balance) {
      setValue(balance);
    }
  }, [balance]);

  const save = () => {
    updateBalance(value);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const isSaveButtonDisabled =
    value.length === 0 || (value.length > 1 && value[0] === "0");

  return (
    <div className={classes.Balance}>
      {isEditing ? (
        <>
          <Input
            width={240}
            value={value}
            setValue={setValue}
            type="number"
            fontSize={26}
            reference={inputRef}
          />
          <Button
            text="Зберегти"
            onClick={save}
            width={180}
            disabled={isSaveButtonDisabled}
          />
        </>
      ) : (
        <>
          <span
            className={classes.title}
            onDoubleClick={() => setIsEditing(true)}
          >
            <span
              className={classNames(classes.value, {
                [classes.red]: +value < 0,
              })}
            >
              {value}
            </span>{" "}
            грн
          </span>
          <Button
            text="Змінити"
            onClick={() => setIsEditing(true)}
            width={180}
          />
        </>
      )}
    </div>
  );
}
