import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { selectTab } from "../store/slice/SelectTab";
import { useDispatch, useSelector } from "react-redux";

export default function DisabledTabs() {
  const dispatch = useDispatch();
  const selectId = useSelector((state) => {
    return state.tabs;
  });

  const handleChange = (event, newValue) => {
    event.preventDefault();
    dispatch(selectTab(String(newValue)));
  };

  return (
    <Tabs
      value={selectId * 1.0}
      onChange={handleChange}
      aria-label="disabled tabs example"
      sx={{ bgcolor: "#191919", height: "2px" }}
    >
      <Tab
        label="main.cpp"
        sx={{ color: "#808080", textTransform: "lowercase" }}
      />
      <Tab
        label="main.java"
        sx={{ color: "#808080", textTransform: "lowercase" }}
      />
      <Tab
        label="main.py"
        sx={{ color: "#808080", textTransform: "lowercase" }}
      />
    </Tabs>
  );
}
