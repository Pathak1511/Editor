import React, { useState } from "react";
import language from "../data/language";
import FolderStructure from "./FolderStructure";
import useTraverseTree from "./../hooks/use-traverse-tree";
import { addCode, insertNode } from "../store/slice/CodeSlice";
import { useDispatch, useSelector } from "react-redux";

import Client from "./../components/Client";
function SideBar({ clients }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.code;
  });

  const [explorerData, setExplorerData] = useState(data);
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
    <div className="Sidebar">
      <div style={{ minHeight: "40vh" }}>
        <FolderStructure
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          explorer={data}
        />
      </div>

      <h3 style={{ color: "#fff" }}>Connected</h3>
      <div className="clientList">
        {clients.map((client) => (
          <Client key={client.socketId} userName={client.username} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
