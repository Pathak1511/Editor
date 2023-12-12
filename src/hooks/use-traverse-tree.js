const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  function findNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return findNode(obj, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, nodeId) {
    function removeNode(node) {
      if (node.id === nodeId) {
        return null;
      }
      const updatedItems = node.items
        .map((item) => removeNode(item))
        .filter(Boolean);
      return { ...node, items: updatedItems };
    }

    return removeNode(tree);
  }
  return { insertNode, deleteNode, findNode };
};

export default useTraverseTree;
