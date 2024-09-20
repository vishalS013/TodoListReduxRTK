import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deletetask, updateTask } from '../feautures/todoSlice'; 
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [edit, setEdit] = useState(null);
  const todos = useSelector((state) => state.todos.todos); 
  const deletedTodos = useSelector((state) => state.todos.deletedTodos);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(updateTask({ id: edit, text: inputValue }));
      setEdit(null);
    } else {
      dispatch(addTask({ id: Date.now(), text: inputValue }));
    }
    setInputValue('');
  };

  const handleEdit = (todo) => {
    setInputValue(todo.text);
    setEdit(todo.id);
  };

  const handleDelete = (id) => {
    dispatch(deletetask(id));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
        />
        <Button variant="contained" color="primary" type="submit" sx={{ marginLeft: "20px" }}>
          {edit ? 'Update' : 'Add'}
        </Button>
      </form>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} secondaryAction={
            <>
              <Button onClick={() => handleEdit(todo)} color="primary">Edit</Button>
              <Button onClick={() => handleDelete(todo.id)} color="secondary">Delete</Button>
            </>
          }>
            <ListItemText primary={todo.text} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" >
        Deleted Tasks
      </Typography>
      <List sx={{textAlign:'center',justifyItems:"center"}}>
        {deletedTodos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText primary={todo.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoList;
