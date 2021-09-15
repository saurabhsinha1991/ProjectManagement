import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../hooks/UserContext";
import { useRegister } from "../hooks/useRegister";
import RegisterForm from "./RegisterForm";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFn] = useAuth();
  const { findUser } = useContext(UserContext);
  const history = useHistory();
  const {
    showForm,
    showRegisterForm,
    setShowForm,
    postRegisterDetails,
    regError,
    setRegError
  } = useRegister();
  const onSubmit = async () => {
    await loginFn({ email, password });
    await findUser();
    history.push("/");
  };

  if (showForm)
    return (<RegisterForm {...{ showForm, setShowForm, postRegisterDetails ,regError,setRegError }} />);

  return (
    <div className="login-form-wrapper">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={onSubmit}>
          Submit
        </Button>
        <Button variant="primary" type="button" onClick={showRegisterForm}>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;