import { Col, Row } from "react-bootstrap";
import MessageContainer from './MessageContainer';
import SendMessageForm from "./SendMessageForm";
import './ChatRoom.css';  // Assuming you create a separate CSS file for ChatRoom-specific styles

const ChatRoom = ({ messages, sendMessage }) => {
  return (
    <div className="chatroom-container">
      

      {/* Scrollable message container */}
      <Row className="chatroom-body">
        <Col sm={12} className="message-box">
          <MessageContainer messages={messages} />
        </Col>
      </Row>

      {/* Input box for sending messages */}
      <Row className="chatroom-footer">
        <Col sm={12}>
          <SendMessageForm sendMessage={sendMessage} />
        </Col>
      </Row>
    </div>
  );
};

export default ChatRoom;
