import {
  taskReducer,
  addTask,
  deleteTask,
  editTask,
  toggleCompletedTask,
  clearStore,
  initialState,
} from "./taskSlice";
import { Task, TaskStore } from "./types";

const task: Task = {
  id: "1",
  label: "Eat!",
  completed: false,
  date: "2023-09-28",
  priority: "medium",
};

test("should return the initial state", () => {
  expect(taskReducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle a Task being added to an empty list", () => {
  expect(taskReducer(initialState, addTask(task))).toEqual({
    taskList: [task],
  });
});

test("should handle a todo being edited to an existing list", () => {
  const previousState: TaskStore = {
    taskList: [task],
  };

  const editedTask: Task = { ...task, completed: true };

  expect(taskReducer(previousState, editTask(editedTask))).toEqual({
    taskList: [editedTask],
  });
});

test("should mark a task as completed", () => {
  const previousState: TaskStore = {
    taskList: [task],
  };

  const editedTask: Task = { ...task, completed: true };

  expect(taskReducer(previousState, toggleCompletedTask(task.id))).toEqual({
    taskList: [editedTask],
  });
});

test("should handle a todo being removed to an existing list", () => {
  const previousState: TaskStore = {
    taskList: [task],
  };

  expect(taskReducer(previousState, deleteTask(task.id))).toEqual({
    taskList: [],
  });
});

test("should clear the store", () => {
  const previousState: TaskStore = {
    taskList: [task, task, task],
  };

  expect(taskReducer(previousState, clearStore())).toEqual({
    taskList: [],
  });
});
