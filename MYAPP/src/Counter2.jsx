import { useState } from "react";

export default function Counter2() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    return (
        <>
            <p>Counters : {count1} | {count2} </p>
            <button onClick={() => {
                setCount1(count1 + 1);
                setCount2(count2 + 1);
            }}>증가</button>
            <button onClick={() => {
                setCount1(count1 - 1);
                setCount2(count2 - 1);
            }}>감소</button>
        </>
    )
}