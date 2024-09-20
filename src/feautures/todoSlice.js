// src/features/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  deletedTodos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.todos.push(action.payload);
    },
    deletetask: (state, action) => {
      const id = action.payload;
      const todoToDelete = state.todos.find(todo => todo.id === id);
      
      if (todoToDelete) {
        state.deletedTodos.push(todoToDelete);
        state.todos = state.todos.filter(todo => todo.id !== id);
      }
    },

    updateTask: (state, action) => {
      const { id, text } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },
  },
});

export const { addTask, deletetask, updateTask } = todosSlice.actions;
export default todosSlice.reducer;
