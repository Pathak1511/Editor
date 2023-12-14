import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { selectTab, removeTabs } from "../store/slice/SelectTab";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function DisabledTabs() {
  const dispatch = useDispatch();
  const selectId = useSelector((state) => {
    return state.tabs;
  });
  const [tabId, setTabId] = React.useState(selectId[0]?.id);

  console.log(selectId);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    console.log(newValue);
    setTabId(newValue);
    // dispatch(selectTab(String(newValue)));
  };

  const handleRemoveTab = (newValue) => {
    console.log(newValue);
    dispatch(removeTabs({ id: newValue }));
  };

  return (
    <Tabs
      value={tabId * 1.0}
      onChange={handleChange}
      aria-label="disabled tabs example"
      sx={{ bgcolor: "#191919", height: "2px" }}
    >
      {selectId.map((tabs) => (
        <Tab
          key={tabs.id}
          value={tabs.id}
          sx={{
            color: "#808080",
            textTransform: "lowercase",
            "&:hover": { "& svg": { visibility: "visible" } },
          }}
          label={
            <span>
              {tabs.file_name}
              <IconButton
                size="small"
                onClick={() => handleRemoveTab(tabs.id)}
                sx={{
                  color: "#1976d2",
                  fontSize: "14px",
                  visibility: "hidden",
                }}
              >
                <CloseIcon />
              </IconButton>
            </span>
          }
        />
      ))}
    </Tabs>
  );
}
