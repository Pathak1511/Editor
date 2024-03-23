import { useEffect, useRef, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { updateFileContent } from "../store/slice/CodeSlice";
import { removeTabs } from "../store/slice/SelectTab";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Editor from "./Editor";
import BackendAPI from "../hooks/api";
import axios from "axios";
import toast from "react-hot-toast";

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

  const codeData = useSelector((state) => state.code);

  const handleSave = async (event) => {
    if (event?.ctrlKey && event?.key === "s") {
      event.preventDefault();
      let cookie = JSON.parse(localStorage.getItem("Cookie"));
      const obj = JSON.stringify({
        code: codeData,
        room_id: id,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BackendAPI}/v1/Code/insert-code`,
        headers: {
          Authorization: `Bearer=${cookie}`,
          "Content-Type": "application/json",
        },
        data: JSON.parse(obj),
      };

      axios
        .request(config)
        .then((response) => {
          toast.success("Code saved successfully");
        })
        .catch((error) => {
          toast.error("Error while saving please try again later");
          // console.log(error);
        });
    }
  };

  const tabId = useRef(selectId[0]?.id || -1);

  const [tab, setTab] = useState(tabId.current);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    tabId.current = newValue.toString();
    setTab(newValue.toString());
  };

  const handleRemoveTab = (newValue) => {
    dispatch(removeTabs({ id: newValue }));
    const index = selectId.findIndex((obj) => obj.id === newValue);
    tabId.current = selectId[index - 1]?.id;
    setTab(selectId[index - 1]?.id);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleSave);
    return () => {
      document.removeEventListener("keydown", handleSave);
    };
  });

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
                  onClick={() => handleRemoveTab(tabId.current)}
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
