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
      {
        repodata.length === 0 ? (
          <p>No repositories found.</p>
        ) : (
          <table>
            <tbody>
              {repodata.map(repo => (
                <tr key={repo.id}>
                  <td>{repo.full_name}</td>
                  <td><a href={repo.html_url}>link</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </>
  );
}
export default App