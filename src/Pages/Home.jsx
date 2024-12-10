import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main", color: "white", mr: 2 }}>
            {user.firstName.charAt(0)}
          </Avatar>
          <Typography variant="h6" component="div">
            Welcome, {user.firstName}!
          </Typography>
        </Box>
        <Button color="inherit" onClick={() => navigate("/profile")}>
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
