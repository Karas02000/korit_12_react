import Login from "./Login.jsx";
import Logout from "./Logout.jsx";

export default function MyComponent(props) {
    const isLoggedin = props.isLoggedin;

    if (isLoggedin) {
        return(<Login />);
    }

    return(<Logout />);
}