import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleProfileCreation = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser; // Get the current logged-in user
      const userRef = doc(db, 'users', user.uid);

      // Create user profile in Firestore
      await setDoc(userRef, {
        bio,
        location,
        website,
      });

      // Redirect to the profile page
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Your Profile</Typography>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleProfileCreation}>
        <TextField
          label="Bio"
          variant="outlined"
          fullWidth
          margin="normal"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Website"
          variant="outlined"
          fullWidth
          margin="normal"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth>
          Save Profile
        </Button>
      </form>
    </Container>
  );
};

export default CreateProfile;
