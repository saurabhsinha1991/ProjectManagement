import React from 'react';
import LoginForm from '../../components/LoginForm';
import './index.css';

function Login() {
    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1>Project Management Tool</h1>
                <div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login;
