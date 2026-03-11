import { 
  Container, AppBar, Toolbar, Typography, 
  List, ListItem, ListItemText, Divider, Paper 
} from '@mui/material';
import { useState } from 'react';
import './App.css';
import AddItem2 from './components/AddItem2';

export type Item = {
  product: string;
  amount: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([item, ...items]);
  };

  return (
    <Container maxWidth="sm"> {/* 너비를 적절히 제한하여 보기 좋게 설정 */}
      <AppBar position='static' sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant='h6'>
            Shopping List
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 아이템 추가 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <AddItem2 addItem={addItem} />
      </div>

      {/* 리스트 출력 부분: Paper로 감싸면 카드 느낌이 납니다 */}
      <Paper elevation={2}>
        <List>
          {items.length === 0 ? (
            <ListItem>
              <ListItemText 
                primary="목록이 비어 있습니다." 
                secondary="새 항목을 추가해 보세요!" 
                sx={{ textAlign: 'center', color: 'gray' }} 
              />
            </ListItem>
          ) : (
            items.map((it, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText 
                    primary={it.product} 
                    secondary={`수량: ${it.amount}`} 
                  />
                </ListItem>
                {/* 마지막 아이템 뒤에는 선을 긋지 않음 */}
                {index < items.length - 1 && <Divider />}
              </div>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
}

export default App;