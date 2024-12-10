import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

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

const AttendanceDashboard = () => {
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;

    if (userEmail) {
      fetch("http://localhost:5000/check")
        .then((response) => response.json())
        .then((data) => {
          const userData = data.find((entry) => entry.userId === userEmail);

          if (userData) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const hoursWorked = new Array(12).fill(0);
            const attendancePercent = new Array(12).fill(0);
            const now = new Date();
            const currentMonthIndex = now.getMonth();
            const currentYear = now.getFullYear();
            const getWeekendCount = (year, month) => {
              let count = 0;
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                if (date.getDay() === 0 || date.getDay() === 6) {
                  count++;
                }
              }
              return count;
            };

            let currentMonthHoursWorked = 0;
            let currentMonthAttendancePercent = 0;
            let totalEntries = 0;

            userData.checkInsOuts.forEach((entry) => {
              const checkInDate = new Date(entry.checkInTime);
              const monthIndex = checkInDate.getMonth();
              const year = checkInDate.getFullYear();
              const hours = (new Date(entry.checkOutTime) - checkInDate) / (1000 * 60 * 60);

              hoursWorked[monthIndex] += hours;
              attendancePercent[monthIndex] += 1; 
              if (monthIndex === currentMonthIndex && year === currentYear) {
                currentMonthHoursWorked += hours;
                totalEntries++;
              }
            });

            const avgAttendance = (totalEntries / 30) * 100;
            const totalHoursWorked = hoursWorked.reduce((sum, hours) => sum + hours, 0);
            const absentDays = months.map((_, index) => {
              const totalDaysInMonth = new Date(currentYear, index + 1, 0).getDate();
              const weekends = getWeekendCount(currentYear, index);
              return totalDaysInMonth - attendancePercent[index] - weekends;
            });
            const currentMonthDaysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
            const currentMonthAbsentDays = currentMonthDaysInMonth - totalEntries - getWeekendCount(currentYear, currentMonthIndex);

            setBarData({
              labels: months,
              datasets: [
                {
                  label: "Attendance (%)",
                  data: attendancePercent.map(count => (count / 30) * 100),
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            });

            setLineData({
              labels: months,
              datasets: [
                {
                  label: "Hours Worked",
                  data: hoursWorked,
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  fill: true,
                },
              ],
            });

            setAttendanceSummary([
              { label: "Monthly Attendance", value: `${((totalEntries / currentMonthDaysInMonth) * 100).toFixed(2)}%` },
              { label: "Monthly Working Hours", value: `${currentMonthHoursWorked.toFixed(2)} hrs` },
              { label: "Monthly Absent Days", value: currentMonthAbsentDays.toString() },
              { label: "Average Attendance", value: `${avgAttendance.toFixed(2)}%` },
              { label: "Total Hours Worked", value: `${totalHoursWorked.toFixed(2)} hrs` },
              { label: "Absent Days", value: absentDays.reduce((sum, days) => sum + days, 0).toString() },
            ]);

          } else {
            console.error("No data found for the user.");
            setAttendanceSummary([
              { label: "Monthly Attendance", value: "N/A" },
              { label: "Monthly Working Hours", value: "N/A" },
              { label: "Monthly Absent Days", value: "N/A" },
              { label: "Average Attendance", value: "N/A" },
              { label: "Total Hours Worked", value: "N/A" },
              { label: "Absent Days", value: "N/A" },
            ]);
          }

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      console.error("User email not found in localStorage.");
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main style={{ padding: 20 }}>
      <Container>
        <Header variant="h4" gutterBottom>
          <b>Employee Monthly Attendance Dashboard</b>
        </Header>
        <Grid container spacing={3}>
          {attendanceSummary.slice(0, 3).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <InfoBox>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h4">{item.value}</Typography>
              </InfoBox>
            </Grid>
          ))}
          <Grid item xs={12} lg={6}>
            <Paper style={{ padding: 16, textAlign: "center" }}>
              <Typography variant="h6">Monthly Attendance Overview</Typography>
              {barData && <Bar data={barData} options={{ responsive: true }} />}
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper style={{ padding: 16, textAlign: "center" }}>
              <Typography variant="h6">Monthly Hours Worked</Typography>
              {lineData && <Line data={lineData} options={{ responsive: true }} />}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default AttendanceDashboard;