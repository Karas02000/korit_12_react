import { useState } from "react";

export default function MyForm2() {
    const [ text, setText ] = useState("");

    const handleChange = (event) => 
        {
        console.log(event.target.value);
        setText(event.target.value);
    };
    const handleSubmit = (event) => {
        alert(`당신은 ${text}라고 입력하셨습니다.`);
        event.preventDefault();
    }

    return (
        <>
            <input type="text" onChange={handleChange} value={text} placeholder="내용을 입력하세요." />
            <input type="submit" value="Submit" onClick={handleSubmit} />   
        </>
    );
}