import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./components/context/AppContext";

import Home from "./components/Home";
import Header from "./components/Header";
import Costs from "./components/Costs";
import Income from "./components/Income";
import Statistic from "./components/Statistic";
import Forecast from "./components/Forecast";
import Settings from "./components/Settings";
import classes from "./styles.module.scss";

export default function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <div className={classes.body}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/costs" element={<Costs />} />
              <Route path="/Income" element={<Income />} />
              <Route path="/statistic" element={<Statistic />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}
