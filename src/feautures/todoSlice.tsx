import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  contact: number;
}

interface TodoState {
  todos: Todo[];
  deletedTodos: Todo[];
}

const initialState: TodoState = {
  todos: [],
  deletedTodos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deletetask: (state, action: PayloadAction<number>) => {
      state.deletedTodos.push(state.todos.find(todo => todo.id === action.payload)!);
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTask, deletetask, updateTask } = todoSlice.actions;
export default todoSlice.reducer;
