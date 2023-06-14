import React, { useContext } from "react";
import classes from "./styles.module.scss";
import { AppContext } from "../context/AppContext";

export default function Settings() {
  const { clearData, saveData, downloadData } = useContext(AppContext);

  const save = () => {
    saveData();
  };

  const download = (data) => {
    downloadData(data);
  };

  const clear = () => {
    clearData();
  };

  function handleFileSelect(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;
      download(fileContent);
    };

    reader.readAsText(file);
  }

  return (
    <div className={classes.Settings}>
      <div className={classes.container}>
        <div>
          <label for="file">Завантажити дані з файлу</label>
          <input
            type="file"
            id="file"
            onChange={handleFileSelect}
            accept=".txt"
          />
          <span onClick={save}>Зберегти дані у файл</span>
        </div>
        <span className={classes.red} onClick={clear}>
          Очистити всі дані
        </span>
      </div>
    </div>
  );
}
