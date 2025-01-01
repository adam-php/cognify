import React, { useState, useEffect } from 'react';
import { useFirebase } from '@/context/FirebaseContext';
import { Input, Button } from 'aceternity-ui'; // Assuming Aceternity UI provides these components

const ChatBox = ({ boardId }) => {
  const { database, user } = useFirebase();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = database.ref(`boards/${boardId}/messages`);
    messagesRef.on('child_added', (snapshot) => {
      const newMessage = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      messagesRef.off();
    };
  }, [boardId, database]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const messagesRef = database.ref(`boards/${boardId}/messages`);
    const newMessage = {
      text: message,
      userId: user.uid,
      timestamp: Date.now(),
    };

    messagesRef.push(newMessage);
    setMessage('');
  };

  return (
    <div className="chat-box p-4 border-t border-gray-200">
      <div className="messages-list mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="message mb-2">
            <span className="font-bold">{msg.userId}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage} className="bg-blue-500 text-white">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
