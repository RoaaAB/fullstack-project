import React, { useState } from "react";
import { auth } from "../firebase"; // Ensure this path is correct
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container, Box } from "@mui/material";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      // Firebase create user account
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      setError(error.message); // Display error message if sign-up fails
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 5, padding: 4, boxShadow: 3, borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
          Sign Up
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{ '& .MuiInputBase-root': { borderRadius: 4 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ '& .MuiInputBase-root': { borderRadius: 4 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ '& .MuiInputBase-root': { borderRadius: 4 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ '& .MuiInputBase-root': { borderRadius: 4 } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="success"  // Green button
                fullWidth
                sx={{
                  marginTop: 2,
                  padding: "10px 0",
                  borderRadius: 4,
                  '&:hover': { backgroundColor: "#388e3c" },
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant="body2">
              Already have an account?{" "}
              <Button 
                color="success"  // Green button
                onClick={() => navigate("/login")} 
                sx={{ textTransform: "none" }}
              >
                Log In
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Signup;
