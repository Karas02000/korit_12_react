import {useRef} from 'react'
import Counter5 from './Counter5.jsx'

export function App() {
  const inputRef = useRef(null);

  return (
    <>
      <Counter5 />
      <input type="text" ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </>
  );
}