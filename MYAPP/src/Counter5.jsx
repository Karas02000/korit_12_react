import React, { useState } from 'react';
import useTitle from './useTitle';

export default function Counter5() {
    const [count, setCount] = useState(0);
    useTitle(`당신은 ${count}번 클릭했어요!`);

  return (
    <div>
      <p>Counter : {count}</p>
        <button onClick={() => setCount(preValue => preValue + 1)}>Increment</button>
    </div>
  );
}