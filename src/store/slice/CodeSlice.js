import { createSlice } from "@reduxjs/toolkit";

const codeSlice = createSlice({
  name: "code",
  initialState: {
    id: "145",
    name: "root",
    isFolder: true,
    items: [
      {
        id: "0",
        name: "main.cpp",
        isFolder: false,
        items: [],
        file_content: "",
      },
      {
        id: "1",
        name: "main.java",
        isFolder: false,
        items: [],
        file_content: "",
      },
      {
        id: "2",
        name: "main.py",
        isFolder: false,
        items: [],
        file_content: "",
      },
    ],
  },
  reducers: {
    addCode: (state, action) => {
      const { id, file_content } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.items[itemIndex].file_content = file_content;
      }
      return state;
    },

    removeCode(state, action) {
      state.splice(action.payload, 1);
    },
    insertNode: (state, action) => {
      const { folderId, item, isFolder } = action.payload;

      const findNode = (tree) => {
        if (tree.id === folderId && tree.isFolder) {
          tree.items.unshift({
            id: new Date().getTime().toString(),
            name: item,
            isFolder,
            items: [],
          });
          return true;
        }

        for (let i = 0; i < tree.items.length; i++) {
          if (findNode(tree.items[i])) {
            return true;
          }
        }

        return false;
      };

      findNode(state);
    },

    deleteNode: (state, action) => {
      const { nodeId } = action.payload;
      const removeNode = (node) => {
        if (node.id === nodeId) {
          return null;
        }
        const updateItems = node.items
          .map((item) => removeNode(item))
          .filter(Boolean);
        return { ...node, items: updateItems };
      };

      return removeNode(state);
    },

    updateFileContent: (state, action) => {
      const { id, file_content } = action.payload;
      const updateFile = (node) => {
        if (node.id === id && !node.isFolder) {
          node.file_content = file_content;
          return true;
        }

        for (let i = 0; i < node.items.length; i++) {
          if (updateFile(node.items[i])) {
            return true;
          }
        }

        return false;
      };

      updateFile(state);
    },
  },
});

export default codeSlice.reducer;
export const { addCode } = codeSlice.actions;
export const { removeCode } = codeSlice.actions;
export const { deleteNode } = codeSlice.actions;
export const { insertNode } = codeSlice.actions;
export const { updateFileContent } = codeSlice.actions;
