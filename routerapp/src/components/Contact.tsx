// Contact.tsx
import { Link, Outlet } from 'react-router-dom'

export default function Contact() {
    return (
        <>
            <h3>🖇️ Contact Component</h3>
            <nav>
                <Link to='seoul'>서울지점</Link> {'  |  '}
                <Link to='busan'>부산지점</Link>
            </nav>
            <hr />
            <Outlet />
        </>
    );
}