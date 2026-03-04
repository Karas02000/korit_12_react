

export default function Hello(props) {
    const username = props.username;

    return (
        <p>
            안녕하세요, {username}!
        </p>
    );
}