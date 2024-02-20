import { useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { updateFileContent } from "../store/slice/CodeSlice";
import { selectTab, removeTabs } from "../store/slice/SelectTab";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Editor from "./Editor";

export default function DisabledTabs({
  socketRef,
  id,
  data,
  codeRef,
  isadmin,
}) {
  const dispatch = useDispatch();
  let selectId = useSelector((state) => {
    return state.tabs;
  });

  const tabId = useRef("0");

  const [tab, setTab] = useState(tabId.current);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    tabId.current = newValue.toString();
    setTab(newValue);
  };

  const handleRemoveTab = (newValue) => {
    dispatch(removeTabs({ id: newValue }));
    codeRef.current = "";
    setTab(selectId[selectId.length - 2]?.id);
    tabId.current = selectId[selectId.length - 2]?.id;
  };

  return (
    <>
      <Tabs
        value={tab}
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
      <div>
        <Editor
          socketRef={socketRef}
          id={id}
          data={data}
          tabId={tabId.current}
          isadmin={isadmin}
          onCodeChange={(code) => {
            codeRef.current = code;
            dispatch(
              updateFileContent({ id: tabId.current, file_content: code })
            );
          }}
        />
      </div>
    </>
  );
}
