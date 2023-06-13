import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { ethers } from "ethers";
import * as React from "react";
import { useState } from "react";
import ColdChain from "../artifacts/contracts/ColdChain.sol/ColdChain.json";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E65100",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DisplayWorkers = () => {
  const [workersList, setData] = useState();

  async function getWorker() {
    const ContractAddress = "0xb43f8ea97308f28249a24a1b95e9acc10cfb297e";
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(await signer.getAddress());

      const contract = new ethers.Contract(
        ContractAddress,
        ColdChain.abi,
        provider
      );

      try {
        const Wdata = await contract.getWorkersList();
        console.log("data: ", Wdata);
        setData(Wdata);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  if (workersList == null) {
    getWorker();
    return (
      <div style={{ textAlign: "center", padding: "10%" }}>
        <Box sx={{ color: "grey.500" }}>
          <CircularProgress color="inherit" />
        </Box>
      </div>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "50%", margin: "auto", marginTop: "5%" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            {/* <StyledTableCell>SN</StyledTableCell> */}
            <StyledTableCell align="left">Name of Employee</StyledTableCell>
            <StyledTableCell align="right">Employee&nbsp;ID</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {workersList.map((row, iterator) => (
            <StyledTableRow
              key={iterator}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <StyledTableCell component="th" scope="row">
                {iterator + 1}
              </StyledTableCell> */}
              <StyledTableCell align="left">{row[0]}</StyledTableCell>
              <StyledTableCell align="right">
                {parseInt(row[1]._hex)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayWorkers;
