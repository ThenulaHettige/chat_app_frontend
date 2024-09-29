import { Container, Row, Col } from 'react-bootstrap'; 
import { useState } from 'react'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';

function App() {
  const [conn, setConnection] = useState(null); // Initialize with null
  const [messages, setMessages] = useState([]); // Initialize with an empty array

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5116/chat")  // Ensure this URL matches your backend URL
        .configureLogging(LogLevel.Information)
        .build();

      // Set up event handler for receiving messages
      connection.on("ReceiveMessage", (username, message) => {
        console.log(`Received message from ${username}: ${message}`);

        //
        // Update the messages state when a new message is received
       // setMessages((prevMessages) => [...prevMessages, { username, msg: message }]);

       setMessages((prevMessages) => {
        console.log('Previous messages:', prevMessages);
        return [...prevMessages, { username, msg: message }];
      });

      });

      // Start the connection
      await connection.start();
      console.log("Connection started");

      // Invoke the "JoinSpecificChatRoom" method on the server
      await connection.invoke("JoinSpecificChatRoom", { Username: username, ChatRoom: chatroom });

      // Store the connection in state
      setConnection(connection);

    } catch (error) {
      console.error("Error while connecting to SignalR", error);
    }
  };

  const sendMessage = async(message) => {
    try {
      await conn.invoke("SendMessage",message);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>
                Welcome to Thenula's Chat app
              </h1>
            </Col>
          </Row>
          {!conn 
          ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
          : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
