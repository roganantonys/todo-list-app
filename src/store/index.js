import { configureStore } from "@reduxjs/toolkit";
import TaskSlices from "./slices/TaskSlices";

export const store = configureStore({
  reducer: {
    Task: TaskSlices,
  },
});
