import { 
  TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, Button 
} from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { Todo } from '../App';

interface AddTodoProps {
  addTodo: (todo: Todo) => void;
}

export default function AddTodo({ addTodo }: AddTodoProps) {
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<Todo>({ id: 0, scadule: '', is_todo: false });

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    setNewTodo({ id: 0, scadule: '', is_todo: false }); 
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (newTodo.scadule.trim() === '') return; 
    
    const todoToAdd: Todo = {
      ...newTodo,
      id: Date.now(), 
    };

    addTodo(todoToAdd);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ borderRadius: 2 }}>
        Add Todo
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>New Todo List</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            name="scadule" 
            label="Schedule Name" 
            value={newTodo.scadule}
            onChange={handleChange}
            fullWidth 
            margin="normal" 
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}