import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, loginFn] = useAuth();
    const history = useHistory();

    const onSubmit = async () => {
        await loginFn({ email, password });
        history.push('/');
    };

    return (
        <div className="login-form-wrapper">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm;