import { ListGroup } from 'react-bootstrap';

const ChatRoomsList = ({ chatRooms, joinChatRoom }) => {
  return (
    <div>
      <h3>Chat Rooms</h3>
      <ListGroup>
        {chatRooms.map((room, index) => (
          <ListGroup.Item 
            key={index} 
            action 
            onClick={() => joinChatRoom('your-username', room)}>
            {room}
          </ListGroup.Item>
        ))}
        <ListGroup.Item action onClick={() => joinChatRoom('your-username', 'new-room')}>
          + Create New Room
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ChatRoomsList;
