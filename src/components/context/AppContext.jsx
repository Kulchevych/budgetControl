import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [balance, setBalance] = useState("0");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedRecords = JSON.parse(localStorage.getItem("records"));

    if (storedBalance) {
      setBalance(storedBalance);
    }

    if (storedRecords) {
      setRecords(storedRecords);
    }
  }, []);

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);
  };

  const updateRecords = (newRecord) => {
    localStorage.setItem("records", JSON.stringify([...records, newRecord]));
    setRecords([...records, newRecord]);

    if (newRecord.type === "Надходження") {
      updateBalance(+balance + +newRecord.amount);
    } else {
      updateBalance(balance - newRecord.amount);
    }
  };

  const deleteRecord = (record) => {
    const recordIndex = records.findIndex((rec) => rec === record);
    const newRecords = [
      ...records.slice(0, recordIndex),
      ...records.slice(recordIndex + 1),
    ];

    localStorage.setItem("records", JSON.stringify(newRecords));
    setRecords(newRecords);

    if (record.type === "Надходження") {
      updateBalance(+balance - +record.amount);
    } else {
      updateBalance(+balance + +record.amount);
    }
  };

  const saveData = () => {
    const data = [`${balance} \n`, JSON.stringify(records)];

    const blob = new Blob([data.join("")], { type: "text/plain" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "budgetData.txt";

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  const downloadData = (data) => {
    if (data) {
      const [bal, recs] = data.split("\n");
      console.log(bal, JSON.parse(recs));

      setBalance(bal);
      localStorage.setItem("balance", bal);

      localStorage.setItem("records", JSON.stringify([recs]));
      setRecords(JSON.parse(recs));
    }
  };
  const clearData = () => {
    localStorage.removeItem("records");
    setRecords([]);
    localStorage.removeItem("balance");
    setBalance("0");
  };

  return (
    <AppContext.Provider
      value={{
        balance,
        records,
        updateBalance,
        updateRecords,
        deleteRecord,
        clearData,
        saveData,
        downloadData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
