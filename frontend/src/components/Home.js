import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import myImage1 from '../assets/home/compare-5201278_1280.jpg';
import myImage2 from '../assets/home/pexels-anete-lusina-4792285.jpg';
import myImage3 from '../assets/home/pexels-ron-lach-9783353.jpg';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/recommendations");
  };

  const handleSearch = () => {
    // Ensure that the search term is passed to the recommendations page
    navigate("/recommendations", { state: { searchTerm } });
  };

  return (
    <div style={{ backgroundColor: '#E8F5E9', minHeight: '100vh', padding: '0', overflow: 'hidden' }}>
      <Container sx={{ marginTop: 5, padding: '20px 0' }}>
        {/* Hero Section with Image and Animation */}
        <Box
          sx={{
            textAlign: 'center',
            color: '#388E3C',
            padding: '50px 0',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 2s ease-out', // Animation for fade-in effect
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 500, animation: 'slideUp 1s ease-out' }}>
            AI-Driven Academic Productivity
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 300, animation: 'slideUp 1.5s ease-out' }}>
            Enhance your research productivity with personalized tool recommendations.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            sx={{
              marginTop: 2,
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: '#66BB6A',
              '&:hover': { backgroundColor: '#4CAF50' },
              animation: 'bounce 2s infinite',
            }}
          >
            Start Your Research Journey
          </Button>
        </Box>

        {/* Search Bar Section */}
        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Search tools..."
            fullWidth
            sx={{
              marginTop: 2,
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                padding: '10px 15px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #BDBDBD',
                transition: 'border 0.3s ease',
                '&:hover': {
                  borderColor: '#66BB6A', // Change border color on hover
                },
                '&.Mui-focused': {
                  borderColor: '#66BB6A', // Focused state color
                  boxShadow: '0 0 5px rgba(102, 187, 106, 0.5)',
                },
              },
              '& .MuiInputBase-input': {
                fontSize: '16px',
                padding: '10px 12px',
              },
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start" color="primary" onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Features Section with Larger Images and Animations */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#388E3C', fontWeight: 500 }}>
            Features Tailored for Researchers
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#FFFFFF',
                  padding: 3,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }, // Hover effect
                }}
              >
                <img src={myImage3} alt="Recommendations" style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '8px', transition: 'transform 0.3s ease' }} />
                <Typography variant="h6" sx={{ color: '#388E3C', fontWeight: 500, marginTop: 2 }}>
                  Personalized Recommendations
                </Typography>
                <Typography variant="body2" sx={{ color: '#333', fontWeight: 300 }}>
                  Receive tool suggestions tailored to your specific research needs.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#FFFFFF',
                  padding: 3,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <img src={myImage2} alt="Tool Selection" style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '8px' }} />
                <Typography variant="h6" sx={{ color: '#66BB6A', fontWeight: 500, marginTop: 2 }}>
                  Efficient Tool Selection
                </Typography>
                <Typography variant="body2" sx={{ color: '#333', fontWeight: 300 }}>
                  Find the best tools for each stage of your research journey.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#FFFFFF',
                  padding: 3,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <img src={myImage1} alt="Compare Tools" style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '8px' }} />
                <Typography variant="h6" sx={{ color: '#81C784', fontWeight: 500, marginTop: 2 }}>
                  Tool Comparisons
                </Typography>
                <Typography variant="body2" sx={{ color: '#333', fontWeight: 300 }}>
                  Compare research tools based on features, reviews, and performance.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        

        {/* Footer Section */}
        <Box sx={{ textAlign: 'center', marginTop: 8, padding: '20px', backgroundColor: '#388E3C', color: '#FFF' }}>
          <Typography variant="body1" sx={{ fontWeight: 300 }}>
            © 2025 AI-Driven Tool Recommendation. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
