import { useEffect, useState } from 'react'

export default function Counter3() {
    const [count, setCount] = useState(0);

    useEffect(() => console.log ('hello'));
    return(
        <div>
            <p>Counter = {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    )
}