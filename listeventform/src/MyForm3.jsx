import { useState } from "react";

export default function MyForm3() {
    const [ user, setUser ] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const handleSubmit = (event) => {
        alert(`Hello, ${user.firstName} ${user.lastName}!`);
        event.preventDefault();
    }


    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value });
    }

    return (
        <form onSubmit={handleSubmit}>
            <lable>FirstName</lable> <br />
            <input type="text" name="firstName" onChange={handleChange} value={user.firstName} /> <br />
            <lable>LastName</lable> <br />
            <input type="text" name="lastName" onChange={handleChange} value={user.lastName} /> <br />
            <lable>E-mail</lable> <br />
            <input type="email" name="email" onChange={handleChange} value={user.email} /> <br />
            <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
    );
}   