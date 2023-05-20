import React, { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="landing-wrapper">
      <div id="heading">Coldchain in Blockchain</div>
      <div
        style={{
          width: "50%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ marginTop: "2%", listStyle: "none", paddingLeft: 0 }}>
          <li>Process sensor data through Node-RED</li>
          <li style={{ marginTop: "2%" }}>
            Send sensor data to Ethereum via API and Web3
          </li>
          <li style={{ marginTop: "2%" }}>
            Monitor real-time product info:
            <ul style={{ marginTop: "2%", listStyle: "none", paddingLeft: 0 }}>
              <li>Delivery Status</li>
              <li>Temperature</li>
              <li>Humidity</li>
              <li>Employee</li>
              <li>Location</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
