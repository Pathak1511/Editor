import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function Browser() {
  const [url, setUrl] = useState("");
  return (
    <Box display="flex" alignItems="start" justifyContent="start">
      <h2>Browser</h2>
    </Box>
  );
}

export default Browser;
