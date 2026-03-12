import { 
  Container, AppBar, Toolbar, Typography, 
  List, ListItem, ListItemText, Paper, 
  Button, Checkbox, ListItemIcon 
} from '@mui/material';
import { useState } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';

export type Todo = {
  id: number;
  scadule: string;
  is_todo: boolean;
}

function App() {
  const [todos, settodos] = useState<Todo[]>([]);

  // 1. 할 일 추가하기
  const addTodo = (todo: Todo) => {
    settodos([todo, ...todos]);
  };

  // 2. 할 일 완료 상태 반전하기 (Toggle)
  const handleisTodo = (targetId: number) => {
    settodos(
      todos.map((todo) => 
        todo.id === targetId ? { ...todo, is_todo: !todo.is_todo } : todo
      )
    );
  };

  // 3. 할 일 삭제하기
  const deleteTodo = (targetId: number) => {
    settodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <Container maxWidth="sm" className="main-container">
      <AppBar position="static" elevation={0} className="app-bar">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="add-button-container">
        <AddTodo addTodo={addTodo} />
      </div>

      <Paper elevation={0} className="list-paper">
        <List disablePadding>
          {todos.length === 0 ? (
            <div className="empty-message">
              <Typography variant="body1">목록이 비어 있습니다.</Typography>
              <Typography variant="caption">새 항목을 추가해 보세요!</Typography>
            </div>
          ) : (
            todos.map((it, index) => (
              <ListItem 
                key={it.id} 
                divider={index < todos.length - 1}
                className="list-todo-animate"
                // secondaryAction을 사용하면 리스트 맨 우측에 요소를 깔끔하게 고정할 수 있습니다.
                secondaryAction={
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small" 
                    onClick={() => deleteTodo(it.id)}
                  >
                    삭제
                  </Button>
                }
              >
                {/* 리스트 맨 왼쪽에 체크박스 배치 */}
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={it.is_todo}
                    onChange={() => handleisTodo(it.id)}
                    disableRipple // 클릭 시 퍼지는 물결 효과 제거 (깔끔함을 위해)
                  />
                </ListItemIcon>
                
                {/* 텍스트 내용 및 취소선 스타일 적용 */}
                <ListItemText 
                  primary={it.scadule} 
                  primaryTypographyProps={{
                    sx: {
                      // is_todo가 true면 취소선 그리기, false면 선 없애기
                      textDecoration: it.is_todo ? 'line-through' : 'none',
                      // is_todo가 true면 회색(text.disabled)으로, false면 기본 색상(text.primary)으로 변경
                      color: it.is_todo ? 'text.disabled' : 'text.primary',
                      transition: 'all 0.2s ease-in-out', // 부드러운 전환 효과
                    }
                  }}
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