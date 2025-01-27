import React, { useState, useCallback } from "react";
import { TextField, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    (e) => {
      const searchQuery = e.target.value;
      setQuery(searchQuery);

      const sanitizedQuery = searchQuery.trim().toLowerCase();

      if (sanitizedQuery === "") {
        if (onSearch) {
          onSearch([]);
        }
        return;
      }

      // Simulate loading while the parent handles the search
      setLoading(true);
      onSearch(sanitizedQuery);
      setLoading(false);
    },
    [onSearch] // dependencies list
  );

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center" }}>
      <TextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit" aria-label="search" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : <SearchIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default Search;
