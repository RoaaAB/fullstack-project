import React, { useState, useEffect } from "react";
import { auth, updateProfile, storage } from "../firebase"; // Import storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage functions
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../firebase"; // Import Firestore instance
import { TextField, Button, Typography, Container, Box, Avatar, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const ProfilePage = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate(); // For redirection

  // Check authentication state on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, set profile data
        setDisplayName(user.displayName || "");
        setPhotoURL(user.photoURL || "");

        // Fetch additional user details from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setDay(userData.day || "");
          setMonth(userData.month || "");
          setYear(userData.year || "");
          setBio(userData.bio || "");
          setLocation(userData.location || "");
        }
      } else {
        // No user is signed in, redirect to login page
        navigate("/login"); // Replace "/login" with your login route
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError("No user is signed in.");
      return;
    }

    if (!displayName.trim()) {
      setError("Display name is required.");
      return;
    }

    // Validate date of birth fields
    if (!day || !month || !year) {
      setError("Please enter a valid date of birth.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let photoURLUpdated = photoURL;

      // Upload image to Firebase Storage if a new file is selected
      if (imageFile) {
        const storageRef = ref(storage, `profile-pictures/${user.uid}`);
        await uploadBytes(storageRef, imageFile);
        photoURLUpdated = await getDownloadURL(storageRef);
      }

      // Update user profile in Firebase Authentication
      await updateProfile(user, { displayName, photoURL: photoURLUpdated });
      setPhotoURL(photoURLUpdated);

      // Save additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        photoURL: photoURLUpdated,
        day,
        month,
        year,
        bio,
        location,
      }, { merge: true }); // Merge with existing data

      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPhotoURL(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 5, padding: 4, boxShadow: 3, borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
          Update Profile
        </Typography>

        {/* Error and Success Messages */}
        {error && <Typography color="error" align="center">{error}</Typography>}
        {success && <Typography color="primary" align="center">{success}</Typography>}

        {/* Avatar and Image Upload */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 3 }}>
          <Avatar 
            alt="Profile Picture"
            src={photoURL || "https://via.placeholder.com/150"} 
            sx={{ width: 100, height: 100, marginBottom: 2 }} 
          />
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
            <PhotoCamera />
          </IconButton>
        </Box>

        {/* Display Name Field */}
        <TextField
          label="Display Name"
          variant="outlined"
          fullWidth
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Date of Birth Fields */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <TextField
            label="Day"
            variant="outlined"
            fullWidth
            type="number"
            placeholder="DD"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            inputProps={{ min: 1, max: 31 }}
          />
          <TextField
            label="Month"
            variant="outlined"
            fullWidth
            type="number"
            placeholder="MM"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            inputProps={{ min: 1, max: 12 }}
          />
          <TextField
            label="Year"
            variant="outlined"
            fullWidth
            type="number"
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
          />
        </Box>

        {/* Bio Field */}
        <TextField
          label="Bio"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Location Field */}
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Button to submit the update */}
        <Button
          variant="contained"
          color="success"
          fullWidth
          disabled={loading}
          sx={{
            marginTop: 2,
            padding: "10px 0",
            borderRadius: 4,
            '&:hover': { backgroundColor: "#388e3c" },
          }}
          onClick={handleUpdateProfile}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;