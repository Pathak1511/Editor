import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
export default function DisabledTabs() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="disabled tabs example"
      sx={{ bgcolor: "#191919", height: "2px" }}
    >
      <Tab
        label="main.cpp"
        sx={{ color: "#808080", textTransform: "lowercase" }}
      />
      <Tab
        label="index.html"
        sx={{ color: "#808080", textTransform: "lowercase" }}
      />
      <Tab
        label="index.css"
        sx={{ color: "#808080", textTransform: "lowercase" }}
      />
    </Tabs>
  );
}
