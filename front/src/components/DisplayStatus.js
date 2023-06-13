import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ColdChain from "../artifacts/contracts/ColdChain.sol/ColdChain.json";

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Typography from "@mui/material/Typography";

import StatusModal from "./StatusModal.js";

const DisplayStatus = () => {
  const ContractAddress = "0xb43f8ea97308f28249a24a1b95e9acc10cfb297e";
  const [id, setId] = useState(1);
  const [data, setData] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  const getStatus = async () => {
    if (typeof window.ethereum !== "undefined") {
      requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(await signer.getAddress());

      const contract = new ethers.Contract(
        ContractAddress,
        ColdChain.abi,
        provider
      );
      try {
        const Sdata = await contract.getProductStatus(id);
        console.log("data: ", Sdata);
        setData(Sdata);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };
  useEffect(() => {
    getStatus();
  }, [id]);

  function convertTimestamp(t) {
    var intTimestamp = parseInt(t, 16);
    var s = new Date(intTimestamp * 1000);
    return String(s).substring(0, 24);
  }

  return (
    <center>
      <div style={{ marginTop: "80px" }}>
        <div>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter Product ID"
              onChange={(e) => setId(e.target.value)}
            />
            <IconButton
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={getStatus}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
      <div style={{ color: "white" }}>
        {!data ? (
          <Box sx={{ color: "grey.500" }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <div>
            <h1>Drug Status</h1>
            <Timeline position="left">
              {data.map((row, iterator) => (
                <TimelineItem key={iterator}>
                  <TimelineOppositeContent sx={{ py: "10px", px: 2 }}>
                    {convertTimestamp(row.timestamp._hex)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <StatusModal statusData={row} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "10px", px: 2 }}>
                    <Typography variant="h6" component="span">
                      {row[0]}
                    </Typography>
                    {parseInt(row[2], 10) < 25 ? (
                      <Typography sx={{ color: "lightgreen" }}>
                        Temperature recorded: {row[2]}°C
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "orange" }}>
                        Temperature recorded: {row[2]}°C
                      </Typography>
                    )}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        )}
      </div>
    </center>
  );
};

export default DisplayStatus;
