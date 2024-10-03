import { Container, Row, Col, Form, FormControl } from 'react-bootstrap'; // Added Form and FormControl
import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import ChatRoom from './components/ChatRoom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatroom, setChatroom] = useState('');
  const [chatrooms, setChatrooms] = useState([]); // Stores all available chat rooms
  const [username, setUsername] = useState(''); // Store the logged-in username
  const [newRoomName, setNewRoomName] = useState(''); // To hold the new room name

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5116/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (username, message) => {
        setMessages((prevMessages) => [...prevMessages, { username, msg: message }]);
      });

      connection.on("ReceiveHistory", (messageHistory) => {
        setMessages(messageHistory.map((msg) => ({
          username: msg.username,
          msg: msg.message
        })));
      });

      await connection.start();
      await connection.invoke('FetchHistory', chatroom);
      await connection.invoke("JoinSpecificChatRoom", { Username: username, ChatRoom: chatroom });

      setConnection(connection);
      setChatroom(chatroom);
    } catch (error) {
      console.error("Error while connecting to SignalR", error);
    }
  };

  const fetchChatRooms = async (username) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5116/chat")
        .configureLogging(LogLevel.Information)
        .build();

      await connection.start();
      const chatrooms = await connection.invoke('FetchUserChatRooms', username);
      setChatrooms(chatrooms); // Store chat rooms in state
      setUsername(username);
      setConnection(connection);

      // Listen for new room creation events
      connection.on("RoomCreated", (roomName) => {
        setChatrooms((prevRooms) => [...prevRooms, roomName]); // Add new room to the list
      });
    } catch (error) {
      console.error("Error fetching chat rooms", error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to create a new room
  const createRoom = async () => {
    if (!newRoomName) {
      alert("Room name cannot be empty");
      return;
    }
    try {
      const result = await conn.invoke("CreateNewRoom", { Username: username, ChatRoom: newRoomName });
      console.log("Username:", result.Username, "ChatRoom:", result.ChatRoom);
      setNewRoomName(''); // Clear the input field after room creation
    } catch (error) {
      console.error("Error creating room", error);
    }
  };
  

  return (
    <div>
      <main>
        <Container fluid>
          <Row className='my-5'>
            <Col sm={3} className="left-chat-panel">
              {!conn && <WaitingRoom fetchChatRooms={fetchChatRooms} />}
              {conn && (
                <>
                  {/* Display logged-in username */}
                  <div className="left-header">
                      <div className="logged-in-username">
                      Logged in as: <strong>{username}</strong>
                      </div>
                  </div>
                  <Form onSubmit={e => {
                    e.preventDefault();
                    joinChatRoom(username, chatroom);
                  }}>
                    <Row className="px-5 py-5">
                      <Col sm={12}>
                        <Form.Group>
                          <FormControl 
                            placeholder="Username"
                            value={username}
                            disabled 
                            onChange={e => setUsername(e.target.value)} 
                          />
                          <FormControl 
                            placeholder="New ChatRoom" 
                            onChange={e => setChatroom(e.target.value)} 
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <hr />
                        <button variant="success" type='submit'>Join New Chat Room</button>
                      </Col>
                    </Row>
                  </Form>
                  <ul className="chatroom-list">
                  <div className="your-chat-rooms">
                    Your Chat Rooms
                  </div>
                    {chatrooms.map((room, index) => (
                      <li key={index} onClick={() => joinChatRoom(username, room)}>
                        {room}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Added Form for joining a chat room */}
                  
                </>
              )}
            </Col>
            
            <Col sm={9} className="chat-box-panel">
            <div className="right-header">
                <div className="chatroom-title">
                  Logged ChatRoom: <strong>{chatroom}</strong>
                </div>
              </div>
              {conn && chatroom && (
                <ChatRoom messages={messages} sendMessage={sendMessage} />
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
