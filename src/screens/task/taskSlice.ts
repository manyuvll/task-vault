import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Task, TaskStore } from "./types";

const initialState: TaskStore = {
  taskList: [],
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      return { ...state, taskList: [...state.taskList, action.payload] };
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload),
      };
    },
    editTask: (state, action: PayloadAction<Task>) => {
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.id !== action.payload.id) {
            return task;
          }
          return {
            ...task,
            ...action.payload,
          };
        }),
      };
    },
    completeTask: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.id !== action.payload) {
            return task;
          }
          return {
            ...task,
            completed: true,
          };
        }),
      };
    },
    clearStore: () => {
      return { taskList: [] };
    },
  },
});
export const { addTask, deleteTask, editTask, completeTask, clearStore } =
  taskSlice.actions;
export const taskReducer = taskSlice.reducer;
