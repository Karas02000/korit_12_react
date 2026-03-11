import { 
  Container, AppBar, Toolbar, Typography, 
  List, ListItem, ListItemText, Paper 
} from '@mui/material';
import { useState } from 'react';
import './App.css';
import AddItem2 from './components/AddItem';

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
            Shopping List
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="add-button-container">
        <AddItem2 addItem={addItem} />
      </div>

      <Paper elevation={0} className="list-paper">
        <List disablePadding>
          {items.length === 0 ? (
            <div className="empty-message">
              <Typography variant="body1">목록이 비어 있습니다.</Typography>
              <Typography variant="caption">새 항목을 추가해 보세요!</Typography>
            </div>
          ) : (
            items.map((it, index) => (
              <ListItem 
                key={index} 
                divider={index < items.length - 1}
                className="list-item-animate"
              >
                <ListItemText 
                  primary={it.product} 
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        수량 : {it.amount}
                      </Typography>
                      <br />
                        가격 : ${it.price}
                    </>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default App;