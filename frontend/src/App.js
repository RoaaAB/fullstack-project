import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Feedback from "./components/Feedback";
import Help from "./components/Help";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfilePage from "./components/ProfilePage";
import Recommendations from "./components/Recommendations";
import Search from "./components/Search";
import Signup from "./components/Signup";
import CreateProfile from "./components/CreateProfile";
import PrivateRoute from "./components/PrivateRoute";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Guide from "./components/Guide";

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [searchResults, setSearchResults] = useState([]);
  const [pythonData, setPythonData] = useState(null);

  useEffect(() => {
    // Firebase authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch data from the API using axios when searchTerm changes
    const fetchPythonData = async () => {
      if (searchTerm.trim() === "") return; // Prevent request if searchTerm is empty
      try {
        const response = await axios.post("https://recommendation-system-aqbb.onrender.com/get_recommendations", {
          query: searchTerm,  // Provide the search term
          top_n: 3            // Optional, adjust as needed
        });
        setPythonData(response.data);  // Save the API response in state
      } catch (error) {
        console.error("Error fetching Python data:", error);
      }
    };
    
    fetchPythonData();
  }, [searchTerm]); // Dependency array includes searchTerm to trigger on change

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update searchTerm state when user types
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Container sx={{ marginTop: 2 }}>
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} pythonData={pythonData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/search"
            element={<Search onSearch={handleSearchResults} onSearchChange={handleSearchChange} />}
          />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route
            path="/create-profile"
            element={<PrivateRoute user={user}><CreateProfile /></PrivateRoute>}
          />
          <Route
            path="/profile"
            element={<PrivateRoute user={user}><Profile /></PrivateRoute>}
          />
          <Route
            path="/profilepage"
            element={<PrivateRoute user={user}><ProfilePage /></PrivateRoute>}
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;