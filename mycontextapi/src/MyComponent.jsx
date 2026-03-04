import Hello from "./Hello.jsx";

export default function MyComponent(props) {
    const username = props.username;

    return (
        <>
            {username}님!, <br />
            <Hello username={username} />
        </>
    );
}