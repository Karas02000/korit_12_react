import { useState } from "react";
import axios from "axios";
import { Button, TextField, Snackbar, Stack } from "@mui/material";
import Carlist from "./Carlist";

type User = {
  username: string;
  password: string;
}

export default function Login() {
  const [ user, setUser ] = useState<User>({
    username: '',
    password: ''
  });
  const [ isAuthenticated, setAuth ] = useState(false);
  
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handleLogin = () => {
    // 템플릿 리터럴도 안 쓰고 하겠습니다.
    axios.post(import.meta.env.VITE_API_URL + '/login', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      const jwtToken = res.headers.authorization;
      if(jwtToken !== null && jwtToken !== undefined) {
        localStorage.setItem('jwt', jwtToken);
        setAuth(true);
      }
    })
    .catch(err => {
      console.error('로그인 중 오류 발생 :', err);
      alert('로그인에 실패하였습니다. Username과 Password를 다시 확인하여 주세요.');
    })
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.setItem('jwt', '');
  }

  if(isAuthenticated) {
    return <Carlist logout={handleLogout} />
  }
  
  else {
    return(
      <Stack spacing={2} alignItems='center' mt={2} >
        <TextField name='username' label='Username' onChange={handleChange}></TextField>
        <TextField name='password' label='Password' onChange={handleChange}></TextField>
        <Button
          variant="outlined"
          color='primary'
          onClick={handleLogin}
        >
          Login
        </Button>
      </Stack>
    );
  }
}