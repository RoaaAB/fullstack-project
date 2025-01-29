import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Grid, CircularProgress, Rating, TextField, Button } from "@mui/material";
import axios from "axios";

const Recommendations = () => {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || "";
  const [toolData, setToolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        console.log("Fetching data with query:", searchTerm);
        const response = await axios.post("https://recommendation-system-aqbb.onrender.com/get_recommendations", { query: searchTerm });
        console.log("Response from backend:", response.data);
        setToolData(response.data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError(err.response?.data?.error || err.message || "Failed to fetch recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSubmitFeedback = async () => {
    try {
      console.log("Submitting feedback:", feedback, feedbackMessage);
      const response = await axios.post("https://recommendation-system-aqbb.onrender.com/collect_feedback", {
        rating: feedback,
        comments: feedbackMessage,
      });
      console.log("Feedback submission response:", response.data);
      alert("Feedback submitted successfully!");
      setFeedback(0);
      setFeedbackMessage("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "600", color: "#333", marginBottom: 2 }}>
          Recommended Tools
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.7 }}>
          Based on your interests, we recommend the following tools:
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4, color: "red" }}>
          {error}
        </Typography>
      )}

      {toolData && toolData.prompt && (
        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          <Grid item xs={12}>
            <Box
              sx={{
                padding: 3,
                backgroundColor: "#FFF",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Tool Title */}
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", marginBottom: "16px", fontSize: "1.5rem" }}>
                {toolData.prompt}
              </Typography>

              {/* Comparison Image */}
              {toolData.comparison_image && (
                <img
                  src={`data:image/png;base64,${toolData.comparison_image}`}
                  alt={toolData.prompt}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
              )}

              {/* Feedback Section */}
              <Box sx={{ marginTop: "16px", textAlign: "left", width: "100%" }}>
                <Typography variant="body2" sx={{ fontStyle: "italic", color: "#888", marginBottom: "8px" }}>
                  Rate this tool:
                </Typography>
                <Rating
                  name="feedback-rating"
                  value={feedback}
                  onChange={(event, newValue) => setFeedback(newValue)}
                  max={5}
                  sx={{ marginBottom: "16px" }}
                />
              </Box>

              {/* Feedback Textbox */}
              <TextField
                label="Additional Feedback"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                sx={{ marginTop: "16px" }}
              />

              {/* Submit Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitFeedback}
                sx={{ marginTop: "16px" }}
              >
                Submit Feedback
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {!toolData && !loading && !error && (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4, color: "#777" }}>
          No comparisons found for your search. Try searching with different keywords.
        </Typography>
      )}
    </Container>
  );
};

export default Recommendations;