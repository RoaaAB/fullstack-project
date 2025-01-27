import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 5, padding: 4, boxShadow: 3, borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
          Log In
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ '& .MuiInputBase-root': { borderRadius: 4 } }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ '& .MuiInputBase-root': { borderRadius: 4 } }}
        />
        <Button
          variant="contained"
          color="success"  // Green button
          fullWidth
          onClick={handleLogin}
          sx={{
            marginTop: 2,
            padding: "10px 0",
            borderRadius: 4,
            '&:hover': { backgroundColor: "#388e3c" },
          }}
        >
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
