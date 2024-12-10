import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import { format } from "date-fns";
import { PieChart } from "@mui/x-charts/PieChart";

const InfoBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const CalendarWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  maxWidth: "80%",
}));

const CalendarHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  fontWeight: 600,
}));

const DayCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  fontSize: "0.75rem",
}));

const MonthlyAttendancePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/check");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyStatus = status
    .filter((item) => item.userId === user.email)
    .flatMap((item) => item.checkInsOuts)
    .filter((checkInOut) => {
      const checkInDate = new Date(checkInOut.checkInTime);
      return checkInDate.getMonth() === currentMonth && checkInDate.getFullYear() === currentYear;
    });

  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;

  const daysPresent = monthlyStatus.filter((checkInOut) => {
    const checkInDate = new Date(checkInOut.checkInTime);
    return !isWeekend(checkInDate);
  }).length;

  const totalWeekendDays = Array.from({ length: totalDays }, (_, i) => i + 1)
    .map((day) => new Date(currentYear, currentMonth, day))
    .filter((date) => isWeekend(date)).length;

  const daysAbsent = totalDays - daysPresent - totalWeekendDays;

  const calendarDays = Array.from({ length: totalDays }, (_, i) => i + 1);
  const data1 = [
    { label: "Present", value: daysPresent },
    { label: "Absent", value: daysAbsent },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <InfoBox>
              <Typography variant="h6" color="textSecondary">Current Month</Typography>
              <Typography variant="h4" color="textPrimary">{format(new Date(), "MMMM yyyy")}</Typography>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoBox>
              <Typography variant="h6" color="textSecondary">Total Days</Typography>
              <Typography variant="h4" color="textPrimary">{totalDays}</Typography>
            </InfoBox>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InfoBox>
              <Typography variant="h6" color="textSecondary">Current Date</Typography>
              <Typography variant="h4" color="textPrimary">{format(new Date(), "dd/MM/yyyy")}</Typography>
            </InfoBox>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ width: "100%", height: "350px", display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" align="center">Attendance Overview</Typography>
              <PieChart
                series={[{ innerRadius: 60, outerRadius: 120, data: data1 }]}
                width={500}
                height={400}
                slotProps={{ legend: { hidden: false } }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CalendarWrapper>
              <CalendarHeader>Monthly Attendance Calendar</CalendarHeader>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: 1 }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <DayCell key={day} sx={{ fontWeight: "bold", borderBottom: `1px solid #ddd` }}>{day}</DayCell>
                ))}
                {/* Render empty cells for days before the first of the month */}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <DayCell key={`empty-${index}`}></DayCell>
                ))}
                {calendarDays.map(day => {
                  const date = new Date(currentYear, currentMonth, day);
                  const isWeekendDay = isWeekend(date);
                  const checkInDate = monthlyStatus.some(
                    (status) => new Date(status.checkInTime).getDate() === day
                  );

                  return (
                    <Tooltip key={day} title={checkInDate ? "Present" : "Absent"} arrow>
                      <DayCell sx={{
                        backgroundColor: checkInDate ? "#c8e6c9" : "#ffebee",
                        color: checkInDate ? "#2e7d32" : "#d32f2f",
                      }}>
                        {day}
                      </DayCell>
                    </Tooltip>
                  );
                })}
              </Box>
            </CalendarWrapper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MonthlyAttendancePage;