import React from 'react'
import { Link } from 'react-router-dom'

interface DefaultLayourProps{
    children: React.ReactNode
}

const DefaultLayout = ({children}:DefaultLayourProps)=>{
    return <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
        <main>{children}</main>
    </>
}

export {DefaultLayout}