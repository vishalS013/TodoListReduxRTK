// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './feautures/todoSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
