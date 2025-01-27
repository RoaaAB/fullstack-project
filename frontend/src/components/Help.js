import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Help = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ padding: '50px' }}>
        <Typography variant="h4" gutterBottom>
          Help Center
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or need assistance, feel free to reach out to us.
        </Typography>
      </Box>
    </Container>
  );
};

export default Help;
