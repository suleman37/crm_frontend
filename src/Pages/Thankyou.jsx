import React from "react";
import { Container, Typography, Paper, Button, Box } from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const CheckOutThankYouPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        padding: "40px",
        backgroundImage:
          "url(https://source.unsplash.com/random/1600x900?nature,water)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          padding: 4,
        }}
      >
        <CheckCircleIcon
          color="success"
          style={{ fontSize: 80, marginBottom: 20 }}
        />
        <Typography variant="h4" gutterBottom>
          <b>Thank You for Checking Out!</b>
        </Typography>
        <Typography variant="h6" component="div">
          Employee Name: {user.firstName + " " + user.lastName}
        </Typography>
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            borderRadius: 2,
            boxShadow: 3,
            marginTop: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Your check-out has been successfully recorded.
          </Typography>
          <Typography variant="body1">
            We appreciate your punctuality and effort. If you need to review
            your attendance record or have any questions, please contact
            hr@cognitojs.com.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<HomeIcon />}
              onClick={() => (window.location.href = "/dashboard")}
              sx={{
                fontWeight: "bold",
                borderRadius: 5,
                paddingX: 3,
                paddingY: 1.5,
                transition: "background-color 0.3s ease",
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default CheckOutThankYouPage;
