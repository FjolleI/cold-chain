// import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DisplayData from "./components/DisplayData.js";
import DisplayProducts from "./components/DisplayProducts.js";
import DisplayStatus from "./components/DisplayStatus.js";
import DisplayWorkers from "./components/DisplayWorkers.js";
import Home from "./components/Home.js";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";

function App() {
  return (
    <div className="app">
      <div id="routes">
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route path="/workers" element={<DisplayWorkers />} />
            <Route path="/products" element={<DisplayProducts />} />
            <Route path="/status" element={<DisplayStatus />} />
            <Route path="/data" element={<DisplayData />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
