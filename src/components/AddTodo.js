/* eslint-disable no-undef */
import React, { useRef } from "react";
import TodoItem from "../components/TodoItem";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodos,
  clearCompleted,
  selectActiveTodos,
  selectCompletedTodos,
  selectShowTodos,
  selectShowActiveTodos,
  selectShowCompletedTodos,
  selectTodos,
} from "../redux/addTodoSlice";

import { showCompletedFunction } from "../redux/addTodoSlice";
import { showAllFunction } from "../redux/addTodoSlice";
import { showActiveFunction } from "../redux/addTodoSlice";

const AddTodo = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const activeTodos = useSelector(selectActiveTodos);

  const showTodos = useSelector(selectShowTodos);
  const showActiveTodos = useSelector(selectShowActiveTodos);
  const showCompletedTodos = useSelector(selectShowCompletedTodos);

  let todosToRender;
  let activeTodoNumber = 0;

  const submitTodo = (e) => {
    e.preventDefault();

    if (inputRef.current.value.trim()) {
      dispatch(
        addTodos({
          id: Math.random() * 1000,
          content: inputRef.current.value,
          completed: false,
        })
      );
    }
    inputRef.current.value = "";
  };

  const showCompletedHandler = () => {
    dispatch(showCompletedFunction());
  };

  const showAllHandler = () => {
    dispatch(showAllFunction());
  };

  const showActiveHandler = () => {
    dispatch(showActiveFunction());
  };

  const clearCompletedHandler = () => {
    dispatch(clearCompleted());
  };
  if (showActiveTodos) {
    todosToRender = activeTodos;
  } else if (showCompletedTodos) {
    todosToRender = completedTodos;
  } else {
    todosToRender = todos;
  }

  todos?.forEach((todo) => {
    if (!todo.completed) {
      activeTodoNumber++;
    }
  });

  return (
    <div className="addtodos">
      <div className="input__container">
        {todosToRender.map((todo) => (
          <TodoItem
            content={todo.content}
            key={todo.id}
            id={todo.id}
            completed={todo.completed}
          />
        ))}
        <div className="circle">
          <form onSubmit={submitTodo}>
            <input
              type="text"
              ref={inputRef}
              placeholder="Create a new todo..."
            />
            <button type="submit" hidden></button>
          </form>
        </div>
      </div>

      <div className="addtodos__container">
        <div className="addtodos__footer">
          <p> {activeTodoNumber} items left</p>
        </div>

        <div className="types">
          <p
            className={`clear ${showTodos ? "active" : ""}`}
            onClick={showAllHandler}
          >
            All
          </p>
          <p
            className={`clear ${showActiveTodos ? "active" : ""}`}
            onClick={showActiveHandler}
          >
            Active
          </p>
          <p
            className={`clear ${showCompletedTodos ? "active" : ""}`}
            onClick={showCompletedHandler}
          >
            Completed
          </p>
        </div>
        <p className="clear" onClick={clearCompletedHandler}>
          Clear completed
        </p>
      </div>
    </div>
  );
};
export default AddTodo;
