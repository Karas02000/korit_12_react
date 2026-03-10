import { useState } from 'react';
import axios from 'axios';
import './App.css';

type Repository = {
  id: number;
  full_name: string;
  html_url: string;
};

function App() {
  const [ keyword, setKeyword ] = useState('');
  const [ repodata, setRepodata ] = useState<Repository[]>([]);

  const handleClick = () => {
  axios.get<{ items: Repository[] }>(`https://api.github.com/search/repositories?q=${keyword}`)
    .then(res => setRepodata(res.data.items))
    .catch(err => console.log(err));
  };

  return (
    <>
      <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button onClick={handleClick}>🔎</button>
    </>
  );
}
export default App