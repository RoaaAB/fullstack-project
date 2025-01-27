import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';

const Guide = () => {
  // Placeholder function for future AI agent feature
  const handleUpdateData = () => {
    alert("This feature is coming soon! Our AI agent will generate tools automatically in the future.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ padding: 4, backgroundColor: '#f7f7f7', borderRadius: 2 }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#388E3C', fontWeight: 'bold', textAlign: 'center' }}>
          Guide to Using the AI-Driven Tool Recommendation System
        </Typography>

        {/* Repository Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ color: '#444', lineHeight: 1.8 }}>
              "Welcome to the AI-Driven Tool Recommendation System, your ultimate guide to discovering the most effective tools for academic research. Whether you're just starting your project, analyzing data, or preparing to publish your findings, this platform is designed to help you streamline every step of your research process. With personalized recommendations powered by advanced AI, you'll find the tools you need to enhance productivity, improve accuracy, and achieve your research goals faster than ever before."
            </Typography>
            {/* Add the button to access the repository */}
            <Button
              variant="contained"
              color="success" // Green button
              href="https://github.com/RoaaAB/AI-Research-Tools"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ marginTop: 2 }}
            >
              Access the Research Tool Repository
            </Button>
          </Paper>
        </motion.div>

        <Divider sx={{ margin: '20px 0' }} />

        {/* How to Use the System */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" sx={{ color: '#388E3C', fontWeight: 'bold', marginBottom: 2 }}>
            How to Use the System:
          </Typography>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2 }}>
            <List sx={{ paddingLeft: 2 }}>
              <ListItem>
                <ListItemText
                  primary={<strong>1. Enter Your Query</strong>}
                  secondary="Start by entering a query related to your research needs (e.g., 'best AI collaboration tool' or 'data collection tool'). The system will analyze your query and generate recommendations."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<strong>2. View AI-Generated Recommendations</strong>}
                  secondary="The system uses embeddings and similarity scoring to find the most relevant tools. You'll see a list of tools with descriptions and key features."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<strong>3. Compare Tools</strong>}
                  secondary="The system provides a visual comparison of tools based on metrics like ease of use, scalability, and performance. You can also view ratings and explanations for each metric."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<strong>4. Provide Feedback</strong>}
                  secondary="After using a recommended tool, rate its relevance and usefulness. Your feedback helps improve the system's recommendations for future users."
                />
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Why Use the System */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" sx={{ color: '#388E3C', fontWeight: 'bold', marginBottom: 2 }}>
            Why Use the AI-Driven Tool Recommendation System?
          </Typography>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2 }}>
            <List sx={{ paddingLeft: 2 }}>
              <ListItem>
                <ListItemText
                  primary={<strong>1. AI-Powered Recommendations</strong>}
                  secondary="Our system uses advanced embeddings and similarity algorithms to provide highly accurate and personalized tool recommendations."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<strong>2. Visual Comparisons</strong>}
                  secondary="Easily compare tools using visual charts that highlight key metrics like ease of use, scalability, and performance."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<strong>3. Feedback-Driven Improvements</strong>}
                  secondary="Your feedback helps the system learn and improve its recommendations over time, ensuring better results for everyone."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={<strong>4. Save Time and Effort</strong>}
                  secondary="Avoid the hassle of manually searching for tools. Our system delivers tailored recommendations in seconds."
                />
              </ListItem>
            </List>
          </Paper>
        </motion.div>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Future Feature Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" sx={{ color: '#388E3C', fontWeight: 'bold', marginBottom: 2 }}>
            Coming Soon: AI Agent for Tool Generation
          </Typography>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2 }}>
            <Typography variant="body1" sx={{ color: '#444', lineHeight: 1.8, marginBottom: 2 }}>
              We're excited to announce that an AI agent for automatic tool generation is in development! This feature will allow the system to generate tools dynamically based on your research needs, making the process even more efficient and personalized.
            </Typography>
            <Button
              variant="outlined"
              color="success" // Green button
              fullWidth
              sx={{
                marginTop: 2,
                padding: "10px 0",
                borderRadius: 4,
                '&:hover': { backgroundColor: "#4CAF50", color: "#fff" }, // Darker green on hover
              }}
              onClick={handleUpdateData}
            >
              Update Data (Coming Soon)
            </Button>
            <Typography variant="body2" sx={{ color: '#666', marginTop: 2, textAlign: "center" }}>
              Stay tuned for updates on this exciting new feature!
            </Typography>
          </Paper>
        </motion.div>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Final Call to Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h6" sx={{ color: '#388E3C', lineHeight: 1.8 }}>
            Ready to make your research process easier and more efficient? The AI-Driven Tool Recommendation System is here to help. Start exploring today and discover how the right tools can make all the difference!
          </Typography>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Guide;