import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const {
    firstName,
    lastName,
    designation,
    address,
    email,
    phoneNumber,
    password,
    confirmPassword,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      toast.success(res.data.msg);
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred");
      toast.error("User Already Existed");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        px: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 800 }}>
        <CardHeader title="Employees Registration" />
        <CardContent>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  inputProps={{ maxLength: 30 }}
                  autoComplete="given-name"
                  autoFocus
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  inputProps={{ maxLength: 30 }} 
                  autoComplete="family-name"
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="designation"
                  label="Designation"
                  name="designation"
                  value={designation}
                  onChange={onChange}
                  inputProps={{ maxLength: 30 }} 
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={onChange}
                  inputProps={{ maxLength: 30 }} 
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                  inputProps={{ maxLength: 50 }}
                  autoComplete="email"
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  type="number"
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChange}
                  inputProps={{ maxLength: 20 }}
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChange}
                  inputProps={{ minLength: 8 }} 
                  autoComplete="new-password"
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={onChange}
                  inputProps={{ mixLength: 8 }} 
                  autoComplete="new-password"
                  sx={{ mb: 1 }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <p>
              If You Have Already Account <Link to="/">Login</Link>
            </p>
          </Box>
        </CardContent>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default Register;