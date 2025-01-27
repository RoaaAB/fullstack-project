import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';  // Import motion from Framer Motion

const About = () => {
  return (
    <div style={{ backgroundColor: '#F9F9F9', minHeight: '100vh', padding: '0' }}>
      <Container sx={{ marginTop: 5, padding: '20px 0' }}>
        
        {/* About Section with Fade-in animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: 5 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 500, color: '#388E3C' }}>
              About the AI-Driven Tool Recommendation System
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 300, color: '#666' }}>
              Enhancing Academic Productivity through AI-powered Research Tools
            </Typography>
          </Box>
        </motion.div>

        {/* Project Overview with Slide-in from the left */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Box sx={{ marginBottom: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#388E3C' }}>
              Overview
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300, color: '#333', lineHeight: 1.8 }}>
              The AI-Driven Tool Recommendation System aims to enhance academic productivity by providing personalized tool suggestions to researchers. Through a comprehensive taxonomy of research tools and an advanced recommendation system, we help researchers find the best tools tailored to their specific needs at different stages of their research journey.
            </Typography>
          </Box>
        </motion.div>

        {/* Technologies Used with Scale-up animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Box sx={{ marginBottom: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#388E3C' }}>
              Technologies Used
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', backgroundColor: '#FFFFFF', padding: 3, borderRadius: '8px' }}>
                  <Typography variant="h6" sx={{ color: '#388E3C', fontWeight: 500 }}>AI and Machine Learning</Typography>
                  <Typography variant="body2" sx={{ color: '#333', fontWeight: 300 }}>
                  Our system uses Google’s embedding-001 model to generate embeddings, enabling similarity scoring via dot products for precise tool recommendations.                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', backgroundColor: '#FFFFFF', padding: 3, borderRadius: '8px' }}>
                  <Typography variant="h6" sx={{ color: '#66BB6A', fontWeight: 500 }}>Data Visualization</Typography>
                  <Typography variant="body2" sx={{ color: '#333', fontWeight: 300 }}>
                    The tool utilizes data visualization techniques to display recommendations and tool comparisons in an intuitive format.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center', backgroundColor: '#FFFFFF', padding: 3, borderRadius: '8px' }}>
                  <Typography variant="h6" sx={{ color: '#81C784', fontWeight: 500 }}>Cloud Technologies</Typography>
                  <Typography variant="body2" sx={{ color: '#333', fontWeight: 300 }}>
                  We use Firebase for scalable user account management and real-time data storage. Firebase Authentication and Cloud Firestore ensure secure, reliable, and efficient collaboration for all users.                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        {/* User Benefits with Fade-in animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Box sx={{ marginBottom: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#388E3C' }}>
              User Benefits
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300, color: '#333', lineHeight: 1.8 }}>
Researchers will benefit from our AI-driven system through personalized tool recommendations tailored to their specific needs. This saves time, enhances decision-making, and provides access to a well-organized database of research tools, streamlining every stage of the research process.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
};

export default About;
