import {useQuery} from '@tanstack/react-query';
import{ fetchPosts } from './api.js';
import './App.css'

function App() {
  const { isLoading, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  });

  return (
    <>
      {
        isLoading ? (
          <h1>Loading...⏳</h1>
        ) : (
          posts.map((post) => (
            <div>{`${post.id} : ${post.title}`}</div>
          ))
        ) 
      }
    </>
  )
}

export default App
