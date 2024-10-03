import { useState } from "react";
import { Row, Col, Form, FormControl } from 'react-bootstrap';

const WaitingRoom = ({ fetchChatRooms }) => {
  const [username, setUsername] = useState('');

  return (
    <Form onSubmit={e => {
      e.preventDefault();
      fetchChatRooms(username);
    }}>
      <Row className="px-5 py-5">
        <Col sm={12}>
          <Form.Group>
            <FormControl
              placeholder="Enter your username"
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <hr />
          <button variant="success" type="submit">Login</button>
        </Col>
      </Row>
    </Form>
  );
};

export default WaitingRoom;
