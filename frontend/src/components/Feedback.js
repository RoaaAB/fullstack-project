import React from 'react';
import { Box, Typography, Container, TextField, Button } from '@mui/material';

const Feedback = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ padding: '30px' }}>
        <Typography variant="h4" gutterBottom>
          Feedback
        </Typography>
        <TextField
          fullWidth
          label="Your Feedback"
          variant="outlined"
          multiline
          rows={4}
          margin="normal"
        />
        <Button variant="contained" color="secondary" fullWidth sx={{ marginTop: '20px' }}>
          Submit Feedback
        </Button>
      </Box>
    </Container>
  );
};

export default Feedback;
