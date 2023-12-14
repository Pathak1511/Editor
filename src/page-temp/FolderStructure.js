import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { deleteNode, insertNode } from "../store/slice/CodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNewTab } from "../store/slice/SelectTab";

function FolderStructure({ explorer }) {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState("block");
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      dispatch(
        insertNode({
          folderId: explorer.id,
          item: e.target.value,
          isFolder: showInput.isFolder,
        })
      );
      setShowInput({ ...showInput, visible: false });
    }
  };

  const handleDeleteNode = (e, id) => {
    dispatch(deleteNode({ nodeId: id.toString() }));
  };
  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  const handleAddTabs = (id, file_name) => {
    dispatch(addNewTab({ id: id, file_name: file_name }));
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
              round="2px"
              style={{ color: "#f8d775", marginRight: "5px" }}
              sx={{
                "&:hover": { "& svg": { visibility: "visible" } },
                fontSize: 16,
              }}
            />
            {explorer.name}
            &nbsp;{" "}
            <CloseIcon
              sx={{ fontSize: 16, visibility: "hidden" }}
              onClick={(e) => handleDeleteNode(e)}
            />
          </span>

          <div>
            <InsertDriveFileIcon
              size={10}
              round="2px"
              style={{ color: "#1976d2", marginRight: "2px" }}
              onClick={(e) => handleNewFolder(e, false, explorer.id)}
            />
            &nbsp;
            <CreateNewFolderIcon
              size={10}
              round="2px"
              style={{ color: "#1976d2", marginRight: "2px" }}
              onClick={(e) => handleNewFolder(e, true, explorer.id)}
            />
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 5 }}>
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
        onClick={(e) => handleAddTabs(explorer.id, explorer.name)}
        onKeyDown={(e) => handleDeleteNode(e)}
      >
        <Button
          className="file_btn"
          size="small"
          sx={{
            "&:hover": { "& svg": { visibility: "visible" } },
          }}
        >
          📄 {explorer.name} &nbsp;&nbsp;{" "}
          <CloseIcon
            sx={{ fontSize: 16, color: "#1976d2", visibility: "hidden" }}
            onClick={(e) => handleDeleteNode(e, explorer.id)}
          />
        </Button>
      </div>
    );
  }
}

export default FolderStructure;
