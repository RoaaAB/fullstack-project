import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth"; // Import the signOut function from Firebase
import { auth } from "../firebase"; // Import auth from your firebase configuration

const Header = ({ user }) => {

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase signOut function
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#388e3c", boxShadow: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
        AI-Driven Tool Recommendation System
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/" color="inherit" sx={{ '&:hover': { backgroundColor: "#2c6b2f" } }}>
            Home
          </Button>
          <Button component={Link} to="/about" color="inherit" sx={{ '&:hover': { backgroundColor: "#2c6b2f" } }}>
            About
          </Button>
          <Button component={Link} to="/contact" color="inherit" sx={{ '&:hover': { backgroundColor: "#2c6b2f" } }}>
            Contact
          </Button>
          <Button component={Link} to="/guide" color="inherit" sx={{ '&:hover': { backgroundColor: "#2c6b2f" } }}>
            Best Guide
          </Button> {/* New "Best Guide" Button */}
          
          {user ? (
            <>
              <Button component={Link} to="/profile" color="inherit" sx={{ '&:hover': { backgroundColor: "#2c6b2f" } }}>
                Profile
              </Button>
              <Button onClick={handleLogout} color="inherit" sx={{ '&:hover': { backgroundColor: "#2c6b2f" } }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit" sx={{ '&:hover': { backgroundColor: "#2c6b2f" } }}>
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit" sx={{ '&:hover': { backgroundColor: "#2c6b2f" } }}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
