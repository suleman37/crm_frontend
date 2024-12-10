import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// Styled components
const Header = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
}));

const InfoBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  borderRadius: "8px",
  boxShadow: theme.shadows[4],
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
}));

const Attendance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState([]);
  const [error, setError] = useState(null);
  const [lastCheckedDate, setLastCheckedDate] = useState(new Date().toDateString());

  const navigate = useNavigate();

  // Fetch attendance status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/check");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setStatus(data);

        const userStatus = data.find((item) => item.userId === user.email);
        if (userStatus) {
          const lastCheckIn = userStatus.checkInsOuts
            .filter((checkInOut) => checkInOut.checkInTime)
            .sort((a, b) => new Date(b.checkInTime) - new Date(a.checkInTime))[0];
          if (lastCheckIn) {
            setCheckInTime(new Date(lastCheckIn.checkInTime));
            setCheckOutTime(
              lastCheckIn.checkOutTime ? new Date(lastCheckIn.checkOutTime) : null
            );
            setIsCheckedIn(!lastCheckIn.checkOutTime);
          } else {
            setIsCheckedIn(false);
            setCheckInTime(null);
            setCheckOutTime(null);
          }
        } else {
          setIsCheckedIn(false);
          setCheckInTime(null);
          setCheckOutTime(null);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStatus();
  }, [user.email]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastCheckedDate !== today) {
      setIsCheckedIn(false);
      setCheckInTime(null);
      setCheckOutTime(null);
      setLastCheckedDate(today);
    }
  }, [currentDateTime, lastCheckedDate]);

  const handleCheckIn = async () => {
    const time = new Date();
    setCheckInTime(time);
    setIsCheckedIn(true);
    setCheckOutTime(null);

    try {
      const response = await fetch("http://localhost:5000/api/attendance/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.email,
          checkInTime: time.toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to check in: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during check-in:", error);
    }
  };

  const handleCheckOut = async () => {
    const time = new Date();
    setCheckOutTime(time);
    setIsCheckedIn(false);
    setOpenDialog(false);

    try {
      const response = await fetch("http://localhost:5000/api/attendance/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.email,
          checkOutTime: time.toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to check out: ${errorText}`);
      }

      navigate("/last");
    } catch (error) {
      console.error("Error during check-out:", error);
    }
  };

  const cancelCheckOut = () => {
    setOpenDialog(false);
  };

  const formatTime = (date) =>
    date instanceof Date && !isNaN(date) ? date.toLocaleTimeString() : "N/A";

  const formatDate = (date) =>
    date instanceof Date && !isNaN(date) ? date.toLocaleDateString() : "N/A";

  const getDayOfWeek = (date) =>
    date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString("en-US", { weekday: "long" })
      : "N/A";

  if (!user) {
    return (
      <Typography variant="h6">User data not found. Please log in.</Typography>
    );
  }

  // Check if already checked out today
  const today = new Date().toDateString();
  const hasCheckedOutToday = checkOutTime && checkOutTime.toDateString() === today;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Header variant="h4" gutterBottom>
        <b>Check In/Out</b>
      </Header>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} style={{ width: "75vw" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <InfoBox>
              <Typography variant="h6" color="textSecondary">
                Current Date
              </Typography>
              <Typography variant="h4" color="textPrimary">
                {formatDate(currentDateTime)}
              </Typography>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoBox>
              <Typography variant="h6" color="textSecondary">
                Current Time
              </Typography>
              <Typography variant="h4" color="textPrimary">
                {formatTime(currentDateTime)}
              </Typography>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoBox>
              <Typography variant="h6" color="textSecondary">
                Day of the Week
              </Typography>
              <Typography variant="h4" color="textPrimary">
                {getDayOfWeek(currentDateTime)}
              </Typography>
            </InfoBox>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "20px", alignItems: "center" }}>
          <Grid item xs={12} sm={4}>
            <InfoBox>
              <Typography variant="h6" color="textSecondary">
                Check In Time
              </Typography>
              <Typography variant="h6" component="div" style={{ marginTop: "20px" }}>
                {checkInTime && checkInTime.toDateString() === today ? formatTime(checkInTime) : "N/A"}
              </Typography>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoBox>
              <Typography variant="h6" color="textSecondary">
                Check Out Time
              </Typography>
              <Typography variant="h6" component="div" style={{ marginTop: "20px" }}>
                {hasCheckedOutToday ? formatTime(checkOutTime) : "N/A"}
              </Typography>
            </InfoBox>
          </Grid>
        </Grid>

        <StyledButton
          variant="contained"
          color={isCheckedIn ? "error" : "primary"}
          onClick={() => {
            if (isCheckedIn) {
              setOpenDialog(true);
            } else {
              handleCheckIn();
            }
          }}
          disabled={hasCheckedOutToday || (isCheckedIn && lastCheckedDate !== today)}  // Disable if checked out today
        >
          {isCheckedIn ? "Check Out" : "Check In"}
        </StyledButton>

        <Dialog open={openDialog} onClose={cancelCheckOut}>
          <DialogTitle>Confirm Check Out</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to check out?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelCheckOut} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCheckOut} color="error">
              Check Out
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Attendance;