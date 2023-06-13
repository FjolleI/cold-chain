import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled, useTheme } from "@mui/material/styles";
import { ethers } from "ethers";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ColdChain from "../artifacts/contracts/ColdChain.sol/ColdChain.json";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E65100",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  ['&.highTemperature"']: {
    color: "red",
    fontWeight: "bold",
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

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const DisplayData = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const ContractAddress = "0xb43f8ea97308f28249a24a1b95e9acc10cfb297e";
  const [id, setId] = useState(1);
  const [data, setData] = useState(null);
  const temperatureThreshold = 30;

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          console.log(await signer.getAddress());
          const contract = new ethers.Contract(
            ContractAddress,
            ColdChain.abi,
            provider
          );
          const Wdata = await contract.getProductData(id);
          console.log("data: ", Wdata);
          setData(Wdata);
        } catch (err) {
          console.log("Error: ", err);
        }
      }
    };

    fetchData();
  }, [id]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!data) {
    return (
      <div style={{ textAlign: "center", padding: "10%" }}>
        <Box sx={{ color: "grey.500" }}>
          <CircularProgress color="inherit" />
        </Box>
      </div>
    );
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}
      >
        <Paper
          elevation={3}
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
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon onClick={() => setId(id)} />
          </IconButton>
        </Paper>
      </div>
      <div style={{ overflow: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{ width: "40%", margin: "auto", marginTop: "16px" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>SN</StyledTableCell>
                <StyledTableCell align="left">Temperature</StyledTableCell>
                <StyledTableCell align="left">Humidity</StyledTableCell>
                <StyledTableCell align="left">Heat Index</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((row, iterator) => (
                <StyledTableRow
                  key={iterator}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {iterator + 1}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    className={
                      parseInt(row.temperature._hex) > temperatureThreshold
                        ? "highTemperature"
                        : ""
                    }
                  >
                    {parseInt(row.temperature._hex)}°C
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {parseInt(row.humidity._hex)}%
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {parseInt(row.heatIndex._hex)}°C
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={4} />
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default DisplayData;
