import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddTaskIcon from "@mui/icons-material/AddTask";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenLogoutDialog = () => setOpenLogoutDialog(true);
  const handleCloseLogoutDialog = () => setOpenLogoutDialog(false);

  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");

    navigate("/");
    setOpenLogoutDialog(false);
  };

  return (
    <div style={{ height: "87vh", display: "flex" }}>
      <div
        style={{
          width: "250px",
          height: "104%",
          backgroundColor: "#f4f4f4",
          overflowY: "auto",
        }}
      >
        <List>
          {/* DASHBOARD */}
          <ListItem button component={Link} to="/dashboard">
            <HomeIcon />
            <ListItemText primary="Dashboard" />
          </ListItem>
          {/* INSTALLMENT */}
          <ListItem button component={Link} to="/attendance">
            <AddTaskIcon />
            <ListItemText primary="Attendence" />
          </ListItem>

          {/* PAYMENT RECEVINGS */}
          <ListItem button component={Link} to="/monthly">
            <RadioButtonUncheckedIcon />
            <ListItemText primary="Monthly Record" />
          </ListItem>
          {/* LOGOUT */}
          <Divider />
          <ListItem button onClick={handleOpenLogoutDialog}>
            <ExitToAppIcon />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
        {/* Logout Confirmation Dialog */}
        <Dialog
          open={openLogoutDialog}
          onClose={handleCloseLogoutDialog}
          aria-labelledby="logout-dialog-title"
          aria-describedby="logout-dialog-description"
        >
          <DialogTitle id="logout-dialog-title">
            <b>Confirm Logout</b>
          </DialogTitle>
          <DialogContent>
            <p id="logout-dialog-description">
              Are you sure you want to logout?
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogoutDialog}>
             Cancel
            </Button>
            <Button onClick={handleConfirmLogout} color="primary">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Sidebar;