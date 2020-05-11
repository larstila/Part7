import React from 'react'
import Login from './Login'
import Notification from '../Notification'

const LoginPage = () => {
    return (
    <div>
        <h2>Log in to application</h2>
        <Notification/>
        <Login/>
    </div>        
    )
}

export default LoginPage