import React from 'react';
import { Container, Typography, Grid, Paper, Link } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';  // Importing the icon

const Contact = () => {
  return (
    <Container 
      sx={{ 
        marginTop: 6, 
        padding: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 4, 
          borderRadius: 3, 
          textAlign: 'center', 
          backgroundColor: '#f9f9f9', 
          maxWidth: 600 
        }}
      >
        <ContactMailIcon 
          sx={{ 
            fontSize: 50, 
            color: '#4CAF50', 
            marginBottom: 2 
          }} 
        />
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            color: '#388E3C', 
            fontWeight: 600 
          }}
        >
          Contact Us
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#555', 
            marginBottom: 3 
          }}
        >
          Have questions, feedback, or suggestions? We’re here to help! Feel free to reach out to us at the email below.
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
              Email:
            </Typography>
            <Link 
              href="mailto:g4academicproductivity@gmail.com" 
              underline="hover" 
              sx={{ 
                fontSize: '18px', 
                color: '#388E3C', 
                fontWeight: 600, 
                '&:hover': { color: '#4CAF50' } 
              }}
            >
              g4academicproductivity@gmail.com
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Contact;
