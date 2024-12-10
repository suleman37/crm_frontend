import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
}));

const Header = () => {
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
    <CustomAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <b>CRM</b>
          </Typography>
        </Box>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
          Welcome, {user.firstName}!
        </Typography>
        <Avatar sx={{ mr: 2, bgcolor: "primary.main", color: "white" }}>
          {userInitial}
        </Avatar>
        <Button color="inherit" onClick={() => navigate("/profile")}>
          Profile
        </Button>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
