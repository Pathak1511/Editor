import React, { useState } from "react";
import Button from "@mui/material/Button";
import language from "../data/language";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

function Header({
  leaveRoom,
  copyId,
  handleSetValue,
  handleSetInputValue,
  value,
  inputValue,
  codeRef,
  onSendCode,
}) {
  return (
    <div>
      <div className="Header">
        <div className="header_Container">
          <img src="/assests/main-logo.png" alt="Logo" height="50" width="50" />
          <h3>CodeFlow Studio</h3>
        </div>

        <div className="header_Container header_btn">
          <div>
            {" "}
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
          </div>
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
        </div>
        <div className="header_Container header_btn">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={copyId}
          >
            Share
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={leaveRoom}
          >
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
