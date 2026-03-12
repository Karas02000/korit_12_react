// 1. CssBaseLine을 CssBaseline으로 수정했습니다.
import { Container, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 2. 컴포넌트를 올바르게 불러옵니다. (확장자는 생략 가능합니다)
import Carlist from './components/Carlist';

import './App.css';

// 3. 컴포넌트 외부에서 QueryClient 인스턴스를 생성합니다.
// (컴포넌트 내부에 두면 화면이 렌더링될 때마다 초기화될 수 있기 때문입니다)
const queryClient = new QueryClient();

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Car Shop
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/* 4. 위에서 만든 queryClient 인스턴스를 연결해 줍니다. */}
      <QueryClientProvider client={queryClient}>
        <Carlist />
      </QueryClientProvider>
    </Container>
  );
}

export default App;