import React, { useState } from "react";
import language from "../data/language";
import FolderStructure from "./FolderStructure";
import useTraverseTree from "./../hooks/use-traverse-tree";
import { addCode, insertNode } from "../store/slice/CodeSlice";
import { useDispatch, useSelector } from "react-redux";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";

import Client from "./../components/Client";
import { Button } from "@mui/material";
function SideBar({ clients }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.code;
  });

  const [explorerData, setExplorerData] = useState(data);
  const [width, setWidth] = useState({ width: "200px", isClosed: false });
  const { deleteNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    dispatch(
      insertNode({ folderId: folderId, item: item, isFolder: isFolder })
    );
    setExplorerData(data);
  };

  const handleDeleteNode = (folderId, item) => {
    const finalTree = deleteNode(explorerData, folderId);
  };

  return (
    <div
      className="Sidebar"
      style={{ position: "relative", width: width.width }}
    >
      <Button
        style={{
          position: "absolute",
          right: "-30px",
          top: "6px",
          paddingTop: 2,
          paddingBottom: 2,
          margin: 0,
          zIndex: "20",
        }}
        onClick={() =>
          setWidth((prev) => ({
            ...prev,
            width: prev.isClosed ? "200px" : "8px",
            isClosed: !prev.isClosed,
          }))
        }
      >
        {width.isClosed ? (
          <SwitchRightIcon
            sx={{
              fontSize: "24",
              backgroundColor: "inherit",
              borderRadius: "100%",
            }}
          />
        ) : (
          <SwitchLeftIcon
            sx={{
              fontSize: "24",
              backgroundColor: "inherit",
              borderRadius: "100%",
            }}
          />
        )}
      </Button>

      <div
        style={{
          minHeight: "40vh",
          display: width.isClosed ? "none" : "",
        }}
      >
        <FolderStructure
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          explorer={data}
        />
      </div>

      <h3 style={{ color: "#fff", display: width.isClosed ? "none" : "" }}>
        Connected
      </h3>
      <div
        className="clientList"
        style={{ display: width.isClosed ? "none" : "" }}
      >
        {clients.map((client) => (
          <Client key={client.socketId} userName={client.username} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
