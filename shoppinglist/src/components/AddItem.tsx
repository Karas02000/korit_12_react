import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { Item } from '../App'; // App.tsx에서 정의한 타입 가져오기

interface AddItemProps {
  addItem: (item: Item) => void;
}

export default function AddItem({ addItem }: AddItemProps) {
  const [open, setOpen] = useState(false);
  
  // 입력 필드를 관리할 state
  const [item, setItem] = useState<Item>({
    product: '',
    amount: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItem({ product: '', amount: '' }); // 닫을 때 초기화
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    addItem(item); // 부모(App.tsx)의 함수 실행
    handleClose(); // 다이얼로그 닫기
  };

  return (
    <>
      {/* 가독성을 위해 상단 마진 추가 */}
      <Button variant="contained" onClick={handleOpen} style={{ marginTop: '20px' }}>
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField 
            name="product" 
            value={item.product} 
            label="Product" 
            margin="dense" 
            fullWidth 
            onChange={handleChange} 
          />
          <TextField 
            name="amount" 
            value={item.amount} 
            label="Amount" 
            margin="dense" 
            fullWidth 
            onChange={handleChange} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddItem} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}