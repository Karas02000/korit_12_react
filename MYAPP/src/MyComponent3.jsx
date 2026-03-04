import Login from "./Login.jsx";
import Logout from "./Logout.jsx";

export default function MyComponent3(props) {
    return (
        <>
            {props.isLoggedin ? <Login /> : <Logout />}
        </>
    )
}