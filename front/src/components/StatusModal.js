import TimelineDot from "@mui/lab/TimelineDot";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StatusModal = ({ statusData }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // display 1st by default or IoT
  useEffect(() => {
    if (statusData && statusData[0] === 1) {
      setOpen(true);
    }
  }, [statusData]);

  function convertTimestamp(t) {
    var intTimestamp = parseInt(t, 16);
    var s = new Date(intTimestamp * 1000);
    return String(s).substring(0, 24);
  }

  return (
    <div>
      <TimelineDot color="secondary" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {statusData != null ? (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {statusData[0]}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Temperature recorded: {statusData[2]}°C <br />
              Timestamp: {convertTimestamp(statusData.timestamp._hex)} <br />
              Humidity: {statusData.humidity}%<br />
              Heat Index: {statusData.heatIndex}°C
              <br />
              Drug ID: {parseInt(statusData.productId._hex)}
              <br />
              Total Quantity: {parseInt(statusData.totalQuantity._hex)} Units
              <br />
            </Typography>
          </Box>
        ) : (
          <Box sx={{ color: "grey.500" }}>
            <CircularProgress color="inherit" />
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default StatusModal;
