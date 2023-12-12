import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function FolderStructure({ handleInsertNode, explorer }) {
  const [expand, setExpand] = useState("block");
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleDeleteNode = (e) => {
    if (e.keyCode === 46) {
      console.log("delete key pressed");
    }
  };
  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  const handleNewFolder = (e, isFolder, id) => {
    setExpand(true);
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder: isFolder,
      folderId: id,
    });
  };

  const handleSelectItem = (e, id) => {
    e.stopPropagation();
    setSelectedItem(id);
  };

  if (explorer.isFolder) {
    return (
      <div
        className="folder_container"
        onClick={(e) => handleSelectItem(e, explorer.id) && toggleSelection()}
      >
        <div
          className={`folder folderStructure ${isSelected ? "selected" : ""}`}
          onClick={() => setExpand(!expand)}
        >
          <span>
            <FolderIcon
              size={20}
              round="2px"
              style={{ color: "#f8d775", marginRight: "5px" }}
            />
            {explorer.name}
          </span>

          <div>
            {isSelected && (
              <button
                className="delete-button"
                onClick={(e) => handleDeleteNode(e)}
              >
                Delete
              </button>
            )}

            <InsertDriveFileIcon
              size={6}
              round="2px"
              style={{ color: "#f8f8f8", marginRight: "2px" }}
              onClick={(e) => handleNewFolder(e, false, explorer.id)}
            />
            {/* <button onClick={(e) => handleNewFolder(e, false, explorer.id)}>

            </button> */}
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                variant="filled"
                size="small"
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                // className="inputContainer__input"
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <FolderStructure
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`file ${isSelected ? "selected" : ""}`}
        onClick={(e) => handleSelectItem(e, explorer.id) && toggleSelection()}
        onKeyDown={(e) => handleDeleteNode(e)}
      >
        <Button
          size="small"
          sx={{ "&:hover": { "& svg": { visibility: "visible" } } }}
        >
          📄 {explorer.name} &nbsp;&nbsp;{" "}
          <OpenInNewIcon
            sx={{ fontSize: 16, visibility: "hidden" }}
            // onClick={() => handleFileOpen(explorer)}
          />
        </Button>
      </div>
    );
  }
}

export default FolderStructure;
