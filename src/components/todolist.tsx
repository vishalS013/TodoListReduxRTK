import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deletetask, updateTask } from "../feautures/todoSlice";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Modal,
} from "@mui/material";
import { RootState } from "../redux/store";

interface Todo {
  id: number;
  text: string;
  contact: number;
}

const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
  const [edit, setEdit] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const todos = useSelector((state: RootState) => state.todos.todos);
  const deletedTodos = useSelector(
    (state: RootState) => state.todos.deletedTodos
  );

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (edit) {
      dispatch(
        updateTask({ id: edit, text: inputValue, contact: phoneNumber! })
      ); 
      setEdit(null);
    } else {
      dispatch(
        addTask({ id: Date.now(), text: inputValue, contact: phoneNumber! })
      ); 
      setInputValue("");
      setPhoneNumber(null);
    }
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      dispatch(deletetask(todoToDelete));
      closeModal();
    }
    }


  const handleEdit = (todo: Todo) => {
    setInputValue(todo.text);
    setEdit(todo.id);
    setPhoneNumber(todo.contact);
  };

  const openModal = (id : number) => {
    setTodoToDelete(id)
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEdit(null);
    setTodoToDelete(null);
  };
  
  const handleView = () => {
    setShow(!show);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Task
      </Typography>
      <Button variant="contained" onClick={handleView} className='!mt-2'>Click to add task</Button>

      {show && (
        <>
      <form onSubmit={handleSubmit} className="!mt-5">
        <TextField
          variant="outlined"
          value={inputValue !== null ? inputValue : ''}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
        />
        <TextField
          variant="outlined"
          value={phoneNumber !== null ? phoneNumber : ""}
          onChange={(e) => {
            const value = e.target.value;
            setPhoneNumber(value ? Number(value) : null);
          }}
          placeholder="Phone Number"
          type="number"
          sx={{ marginLeft: "20px" }} 
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginLeft: "20px" }}
        >
          {edit ? "Update" : "Add"}
        </Button>
      </form>
      <List>
        {todos.map((todo: Todo) => {
          return (
            <>
              <ListItem
                key={todo.id}
                secondaryAction={
                  <>
                    <Button onClick={() => handleEdit(todo)} color="primary">
                      Edit
                    </Button>
                    <Button
                      onClick={() => openModal(todo.id)}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </>
                }
              >
                <ListItemText primary={todo.text} />
                <ListItemText primary={todo.contact} />
              </ListItem>
            </>
          );
        })}
      </List>

      <Modal open={showModal} onClose={closeModal}>
            <div className='p-[10px] bg-slate-600 !w-[400px] mt-[20%] m-auto space-x-8 !space-y-8 !h-[25%]'>
              <Typography variant="h6" className='!ml-6 text-white'>Confirm ??</Typography>
              <Typography className='text-white'>Are you sure you want to delete this task?</Typography>
              <Button variant="outlined" onClick={closeModal} className='m-3 !bg-white'>Cancel</Button>
              <Button variant="contained" color="error" className='flex justify-end' onClick={confirmDelete}>Delete</Button>
            </div>
          </Modal>

      <Typography variant="h4">Deleted Tasks</Typography>
      <List sx={{ textAlign: "center", justifyItems: "center" }}>
        {deletedTodos.map((todo: Todo) => {
          return (
            <>
              <ListItem key={todo.id}>
                <ListItemText primary={todo.text} />
                <ListItemText primary={todo.contact} />
              </ListItem>
            </>
          );
        })}
      </List>
      </>
      )}
    </div>
  );
};

export default TodoList;
