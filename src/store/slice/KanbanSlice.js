import { createSlice } from "@reduxjs/toolkit";

const kanbanSlice = createSlice({
  name: "kanban",
  initialState: [
    {
      title: "Development component with react diff view",
      id: "11",
      column: "backlog",
    },
    {
      title: "Service to run development environment",
      id: "12",
      column: "backlog",
    },
    // TODO
    {
      title: "Backend services for dashboard",
      id: "5",
      column: "todo",
    },
    {
      title: "backend service for video call features",
      id: "6",
      column: "todo",
    },

    // DOING
    {
      title: "UI for dashboard and VideoCall",
      id: "8",
      column: "doing",
    },
    { title: "Dashboard UI and Error components", id: "9", column: "doing" },
    // DONE
    {
      title: "Backend Service of Chat applications",
      id: "10",
      column: "done",
    },
  ],
  reducers: {
    updateKanban(state, action) {
      return action.payload;
    },
  },
});

export default kanbanSlice.reducer;
export const { updateKanban } = kanbanSlice.actions;
