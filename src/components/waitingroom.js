import React, { useState } from 'react';
import { Form, FormControl, Button, Row, Col } from 'react-bootstrap';

const WaitingRoom = ({ fetchChatRooms }) => {
  const [isSignup, setIsSignup] = useState(false); // state to toggle login/signup
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with username:', username);
    fetchChatRooms(username);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signing up with:', { username, firstName, lastName, email });
  };

  return (
    <div>
      {!isSignup ? (
        <Form onSubmit={handleLoginSubmit}>
          <Row className="px-5 py-5">
            <Col sm={12}>
              <Form.Group>
                <FormControl
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <hr />
              <Button variant="success" type="submit">
                Login
              </Button>
              <Button variant="link" onClick={() => setIsSignup(true)}>
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <Form onSubmit={handleSignupSubmit}>
          <Row className="px-5 py-5">
            <Col sm={12}>
              <Form.Group>
                <FormControl
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group>
                <FormControl
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group>
                <FormControl
                  placeholder="Enter your last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group>
                <FormControl
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <hr />
              <Button variant="success" type="submit">
                Sign Up
              </Button>
              <Button variant="link" onClick={() => setIsSignup(false)}>
                Back to Login
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};

export default WaitingRoom;
