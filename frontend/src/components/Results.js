import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Grid, Paper } from "@mui/material";

const Results = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Check if results were passed via the location state
    if (location.state?.results) {
      setResults(location.state.results);
    }
  }, [location]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Results
      </Typography>
      {results.length > 0 ? (
        <Grid container spacing={2}>
          {results.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">{tool.name}</Typography>
                <Typography variant="body2">{tool.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No results found</Typography>
      )}
    </Container>
  );
};

export default Results;

