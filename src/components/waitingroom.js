import { useState } from "react";
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom }) => {

    const[username, setUsername] = useState();
    const[chatroom, setChatroom] = useState();

    return <Form onSubmit={ e => {
        e.preventDefault();
        joinChatRoom(username,chatroom);
    }}>

        <Row className="px-5 py-5">
            <Col sm={12}>
                <Form.Group>
                    <FormControl placeholder="Username"
                    onChange={e => setUsername(e.target.value)}></FormControl>
                    <FormControl placeholder="Chatroom"
                    onChange={e => setChatroom(e.target.value)}></FormControl>
                </Form.Group>
            </Col>
            <Col sm={12}>
                <hr />
                <button variant="success" type='submit'>Join</button>
            </Col>
        </Row>

    </Form>
}

export default WaitingRoom