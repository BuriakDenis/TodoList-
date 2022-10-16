import { configureStore } from "@reduxjs/toolkit";
import { addTodoReducer } from "../redux/addTodoSlice";

const store = configureStore({
  reducer: {
    todos: addTodoReducer,
  },
});

export default store;
