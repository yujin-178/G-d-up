import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const { email, password} = useSelector((state)=>state)

    return (
        <div>
            <h1>Home</h1>
           <h3>안녕하세요,</h3><br/>
            <Link to={{
            pathname: '/modify',
            state: {
                email,
                password
            }
            }}
            style={{textDecoration:"none"}}>비밀번호 변경</Link>
        </div>
    )
    
}