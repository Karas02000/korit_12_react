import { useState } from 'react';

export default function Review() {
    const [ name, setName ] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(name);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`Submit : ${name}`);
        alert(`Hello, ${name}!`);
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value = {name} onChange={handleChange} />
            <input type="submit" value='Submit' />
        </form>
    );
}   