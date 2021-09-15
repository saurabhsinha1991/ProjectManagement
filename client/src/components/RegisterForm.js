import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
// import { useRegister } from "../hooks/useRegister";

function RegisterForm(props) {
  const { postRegisterDetails, regError,setShowForm, showForm, setRegError } = props;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = () => {
    postRegisterDetails(userName, email, password)
  };
  const handleClose = () => {
    setRegError('');
    setShowForm(false)};
  console.log('Hi');

  return (
    <Modal show={showForm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registration Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={userName}
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
  <Modal.Title>{regError}</Modal.Title>
      <Modal.Footer>
        <Button variant="primary" onClick={registerUser}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterForm;
