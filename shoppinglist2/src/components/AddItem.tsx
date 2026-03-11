import { 
  TextField, Dialog, DialogActions, 
  DialogContent, DialogTitle, Button 
} from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { Item } from '../App';

interface AddItemProps {
  addItem: (item: Item) => void;
}

export default function AddItem({ addItem }: AddItemProps) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<Item>({ product: '', amount: '', price: 0});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItem({ product: '', amount: '', price: 0 }); // 입력값 초기화
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (item.product.trim() === '') return; // 빈 값 방지
    addItem(item);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ borderRadius: 2 }}>
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>New Shopping Item</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            name="product" 
            label="Product Name" 
            value={item.product}
            onChange={handleChange}
            fullWidth 
            margin="normal" 
            variant="outlined"
          />
          <TextField 
            name="amount" 
            label="Amount" 
            value={item.amount}
            onChange={handleChange}
            fullWidth 
            margin="normal" 
            variant="outlined"
          />
          <TextField 
            name="price" 
            label="Price" 
            value={item.price}
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