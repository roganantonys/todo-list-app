import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const TaskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    setTask(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },

    editTask(state, action) {
      const { id, taskTitle, description, dueDate, status } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          taskTitle,
          description,
          dueDate,
          status,
        };
      }
      console.log("After update all tasks:", state.tasks);
    },
    deleteTask(state, action) {
      const { id } = action.payload;
      state.tasks = state.tasks.filter((data) => data.id != id);
    },

    changeStatus(state, action) {
      const { id } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = !state.tasks[taskIndex].status;
      }
    },
  },
});

export const { setTask, addTask, editTask, deleteTask, changeStatus } =
  TaskSlice.actions;

export default TaskSlice.reducer;
