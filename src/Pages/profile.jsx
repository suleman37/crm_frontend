import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Avatar,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Email, Phone, LocationOn, Work } from "@mui/icons-material";
import { styled } from "@mui/system";

const GradientHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)`,
  color: "white",
  borderRadius: "10px 10px 0 0",
  padding: theme.spacing(4),
  textAlign: "center",
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  "&:hover": {
    transform: "scale(1.1)",
    transition: "transform 0.3s ease-in-out",
  },
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[4],
  borderRadius: "16px",
  transition: "0.3s",
  "&:hover": {
    boxShadow: theme.shadows[10],
  },
}));

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }
  const userInitial = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "";
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
      <ProfileCard>
        <GradientHeader
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              color: "white",
              alignSelf: "center",
            }}
          >
            {userInitial}
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Welcome, {user.firstName}!
          </Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
        </GradientHeader>

        <CardContent>
          <Grid container spacing={3}>
            {[
              {
                icon: <Work color="primary" />,
                label: "Designation",
                value: user.designation,
              },
              {
                icon: <LocationOn color="primary" />,
                label: "Address",
                value: user.address,
              },
              {
                icon: <Email color="primary" />,
                label: "Email",
                value: user.email,
              },
              {
                icon: <Phone color="primary" />,
                label: "Phone Number",
                value: user.phoneNumber,
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <ProfileCard>
                  <CardContent>
                    <IconBox>
                      {item.icon}
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {item.label}
                      </Typography>
                    </IconBox>
                    <Typography variant="h6">{item.value}</Typography>
                  </CardContent>
                </ProfileCard>
              </Grid>
            ))}
          </Grid>
        </CardContent>

        <Divider />
      </ProfileCard>
    </Container>
  );
};

export default Profile;