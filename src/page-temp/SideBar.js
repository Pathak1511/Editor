import React, { useState } from "react";
import language from "../data/language";
import FolderStructure from "./FolderStructure";
import useTraverseTree from "./../hooks/use-traverse-tree";
import explorer from "./../data/folderData";
import Client from "./../components/Client";
function SideBar({ clients }) {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId, item) => {
    const finalTree = deleteNode(explorerData, folderId);
  };

  return (
    <div className="Sidebar">
      <FolderStructure
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData}
      />
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
