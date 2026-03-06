import { useState } from "react";

export default function Users() {
    const [ user, setUser ] = useState({
        username: "",
        password: "",
        email: ""
    });

    const handleSubmit = (event) => {
        alert(`Welcome, ${user.username}!`);
        event.preventDefault();
    }

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value });
    }

  return(
    <form onSubmit={handleSubmit}>
        <label>Username</label> <br />
        <input type="text" name="username" onChange={handleChange} value={user.username} /> <br />

        <label>Password</label> <br />
        <input type="password" name="password" onChange={handleChange} value={user.password} /> <br />

        <label>E-mail</label> <br />
        <input type="email" name="email" onChange={handleChange} value={user.email} /> <br />

        <input type="submit" value="Submit" />
    </form>
  );
}