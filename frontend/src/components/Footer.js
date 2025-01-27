import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        textAlign: "center",
        marginTop: "20px",
        backgroundColor: "#f1f1f1",
      }}
      role="contentinfo" // Accessibility enhancement
    >
      <Typography variant="body2" color="textSecondary">
        © 2025 AI Tool System. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
