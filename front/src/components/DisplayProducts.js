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
import React, { useEffect, useState } from "react";
import ColdChain from "../artifacts/contracts/ColdChain.sol/ColdChain.json";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

const DisplayProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const ContractAddress = "0xb43f8ea97308f28249a24a1b95e9acc10cfb297e";
  useEffect(() => {
    async function fetchData() {
      try {
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
          const Pdata = await contract.getProducts();
          console.log("data: ", Pdata);
          setProductsList(Pdata);
        }
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    }

    fetchData();
  }, []);

  if (productsList.length === 0) {
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
      sx={{ width: "80%", margin: "auto", marginTop: "5%" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>SN</StyledTableCell>
            <StyledTableCell align="left">Drug&nbsp;Name</StyledTableCell>
            <StyledTableCell>Drug ID</StyledTableCell>
            <StyledTableCell sx={{ width: "40%" }}>Description</StyledTableCell>
            <StyledTableCell>Price&nbsp;</StyledTableCell>
            <StyledTableCell>Required&nbsp;Temp</StyledTableCell>
            <StyledTableCell align="right">Manufacturer</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {productsList.map((row, iterator) => (
            <StyledTableRow
              key={iterator}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {iterator + 1}
              </StyledTableCell>
              <StyledTableCell align="left">{row[1]}</StyledTableCell>
              <StyledTableCell>{parseInt(row.id._hex)}</StyledTableCell>
              <StyledTableCell>{row.description}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>{row.reqTemp}</StyledTableCell>
              <StyledTableCell align="right">{row[5]}</StyledTableCell>
              <StyledTableCell align="right">
                {formatDate(row.timestamp)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}

export default DisplayProducts;
