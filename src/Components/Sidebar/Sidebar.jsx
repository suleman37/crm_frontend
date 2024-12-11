import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  ListItemIcon,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenLogoutDialog = () => setOpenLogoutDialog(true);
  const handleCloseLogoutDialog = () => setOpenLogoutDialog(false);

  const handleConfirmLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    setOpenLogoutDialog(false);
  };

  return (
    <div style={{ width: 250, height: "100vh", backgroundColor: "#ffffff", color: "#2c3e50", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)" }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon style={{ color: "#2c3e50" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" style={{ color: "#2c3e50" }} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/attendance">
          <ListItemIcon>
            <EventIcon style={{ color: "#2c3e50" }} />
          </ListItemIcon>
          <ListItemText primary="Attendance" style={{ color: "#2c3e50" }} />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/monthly">
          <ListItemIcon>
            <ReceiptIcon style={{ color: "#2c3e50" }} />
          </ListItemIcon>
          <ListItemText primary="Monthly Record" style={{ color: "#2c3e50" }} />
        </ListItem>
        <Divider />
        <ListItem button onClick={handleOpenLogoutDialog}>
          <ListItemIcon>
            <PowerSettingsNewIcon style={{ color: "#2c3e50" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" style={{ color: "#2c3e50" }} />
        </ListItem>
      </List>
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{ style: { maxHeight: '150px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' } }} 
      >
        <DialogTitle id="logout-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center', color: '#555', overflow: 'hidden' }}>
          <p id="logout-dialog-description" style={{ margin: 0 }}>
            Are you sure you want to logout?
          </p>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseLogoutDialog} style={{ color: '#007bff', fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} style={{ color: '#d32f2f', fontWeight: 'bold' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;