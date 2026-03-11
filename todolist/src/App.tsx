import { 
  Container, AppBar, Toolbar, Typography, 
  List, ListItem, ListItemText, Paper 
} from '@mui/material';
import { useState } from 'react';
import './App.css';

// 1. 타입 정의 (AddItem2에서도 사용하기 위해 export)
export type Item = {
  product: string;
  amount: string;
  price: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);

  // 2. 새 아이템을 리스트 맨 앞에 추가하는 함수
  const addItem = (item: Item) => {
    setItems([item, ...items]);
  };

  return (
    <Container maxWidth="sm" className="main-container">
      <AppBar position="static" elevation={0} className="app-bar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Todo List 🗒️
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        
      </div>
    </Container>
  );
}

export default App;