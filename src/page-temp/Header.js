import React, { useState } from "react";
import Button from "@mui/material/Button";
import language from "../data/language";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ShareIcon from "@mui/icons-material/Share";
import { useParams } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SimpleDialogDemo from "../components/RequestAdmin";
function Header({
  leaveRoom,
  copyId,
  handleSetValue,
  handleSetInputValue,
  value,
  inputValue,
  codeRef,
  onSendCode,
  sendAccessRequest,
  socketRef,
}) {
  const { env } = useParams();
  return (
    <div>
      <div className="Header">
        <div className="header_Container">
          <img src="/assests/main-logo.png" alt="Logo" height="50" width="50" />
          <h3>CodeFlow Studio</h3>
        </div>

        <div className="header_Container header_btn">
          <div>
            {env === "coding" ? (
              <Autocomplete
                variant="standard"
                value={value}
                onChange={(event, newValue) => {
                  handleSetValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  handleSetInputValue(newInputValue);
                }}
                id="flat-demo"
                size="small"
                sx={{ width: 180 }}
                clearOnEscape
                options={language}
                renderInput={(params) => (
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    {...params}
                    className="languageText"
                    label="C++"
                  />
                )}
              />
            ) : (
              <></>
            )}
          </div>

          {env === "coding" ? (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => {
                inputValue !== "" && codeRef.current !== null
                  ? onSendCode(codeRef.current)
                  : toast.error("Please write code first");
              }}
              //onClick={copyId}
            >
              Run
            </Button>
          ) : (
            <></>
          )}
        </div>
        <div className="header_Container header_btn">
        <div
  style={
    localStorage.getItem("owner") != 'undefined' &&
    localStorage.getItem("userId") &&
    JSON.parse(localStorage.getItem("owner")) === JSON.parse(localStorage.getItem("userId"))
      ? {}
      : { display: "none" }
  }
>
  <SimpleDialogDemo socketRef={socketRef} />
</div>
          <Button
  variant="contained"
  color="primary"
  size="small"
  style={
    localStorage.getItem("owner") != 'undefined' &&
    localStorage.getItem("userId") &&
    JSON.parse(localStorage.getItem("owner")) === JSON.parse(localStorage.getItem("userId"))
      ? { display: "none" }
      : {}
  }
  onClick={sendAccessRequest}
>
  Request <AdminPanelSettingsIcon sx={{ fontSize: 24 }} />
</Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={copyId}
          >
            <ShareIcon sx={{ fontSize: 24 }} />
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={leaveRoom}
          >
            <CallEndIcon sx={{ fontSize: 24 }} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
