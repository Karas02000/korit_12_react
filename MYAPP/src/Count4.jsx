import { useEffect, useState } from "react";

export default function Counter4() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    useEffect(() => {
        console.log('첫번째 렌더링  ');
    }, []);

    useEffect(() => {
        console.log('count1의 값이 변경되었습니다.');
    }, [count1]);

    return (
        <>
            <p>Counters : {count1} | {count2} </p>
            <button onClick={() => {
                setCount1(count1 + 1);
            }}>count1 증가</button>
            <button onClick={() => {
                setCount2(count2 + 1);
            }}>count2 증가</button>
            <button onClick={() => {
                setCount1(count1 - 1);
            }}>count1 감소</button>
            <button onClick={() => {
                setCount2(count2 - 1);
            }}>count2 감소</button>
        </>
    )
}