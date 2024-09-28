import React, { useContext, useEffect, useState, useRef } from 'react';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext'; // Adjust the path as necessary
import FileUpload from './FileUpload'; // Import the FileUpload component
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref for scrolling
  const navigate = useNavigate();

  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesArray);
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages area whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && currentUser) {
      await addDoc(collection(db, 'messages'), {
        senderId: currentUser.uid,
        text: newMessage,
        timestamp: new Date(),
      });
      setNewMessage(''); // Clear the input after sending the message
    }
  };

  const handleFileUpload = async (url) => {
    if (currentUser) {
      await addDoc(collection(db, 'messages'), {
        senderId: currentUser.uid,
        imageUrl: url,
        timestamp: new Date(),
      });
    }
    else{
        navigate('/login');
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex">
      <div className={`flex ${!currentUser ? 'w-full' : 'w-1/2'} h-full justify-center items-center p-4`}>
        <div className="flex flex-col md:w-full h-[80%] bg-black p-4 rounded-lg shadow-lg w-screen">
          <h2 className="text-2xl text-white font-bold mb-4">Community Chat</h2>
          <div className="messages overflow-y-auto flex-grow border border-gray-300 p-4 rounded mb-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message mb-2 p-2 rounded-lg ${
                  message.senderId === currentUser?.uid 
                    ? 'bg-blue-500 text-white self-end' 
                    : 'bg-gray-300 text-gray-700 self-start' 
                }`}
                style={{ 
                  maxWidth: '75%',
                  alignSelf: message.senderId === currentUser?.uid ? 'flex-end' : 'flex-start',
                  marginLeft: message.senderId === currentUser?.uid ? 'auto' : '0',
                }}
              >
                {message.senderId === currentUser?.uid ? (
                  
                  <>
                    <span className="text-xs text-gray-300">{currentUser.email || currentUser.username}</span>
                    <p>{message.text}</p>
                    {message.imageUrl && <img src={message.imageUrl} alt="Uploaded" className="mt-1 max-w-full rounded" />}
                  </>
                ) : (
                  <>
                    {message.senderId !== currentUser?.uid && (
                      <span className="text-xs text-gray-600">{message.senderId}</span>
                    )}
                    {message.text && <p>{message.text}</p>}
                    {message.imageUrl && <img src={message.imageUrl} alt="Uploaded" className="mt-1 max-w-full rounded" />}
                  </>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} /> 
          </div>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
              className="border rounded-l px-4 py-2 flex-grow"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">Send</button>
            <FileUpload onFileUpload={handleFileUpload} />
          </form>
          {!currentUser && <p className="text-red-500">Please log in to chat.</p>}
        </div>
      </div>

      <div className="w-1/2 flex flex-col h-full hidden md:flex"> 
        <iframe 
          src="https://my.spline.design/spacetexttransition-5d056e301e7f30bedc0de7e5d5f70cab/" 
          title="Example Iframe"
          className="flex-grow" 
          style={{ minHeight: '80vh' }} 
        />
      </div>    
    </div>
  );
};

export default Chat;
