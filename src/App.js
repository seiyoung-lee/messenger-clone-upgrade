import React, {useState, useEffect, useRef} from 'react';
import { Button, FormControl, InputLabel, Input} from '@material-ui/core'
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { animateScroll } from "react-scroll";


function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const messagesEndRef = useRef(null);

  const sendMessage = (event) => {
    //all the logic to send a message
    event.preventDefault();
    if(input !== "") {
      db.collection('messages').add({
        text: input, 
        user : username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
      updateScroll(); 
    }
  }

  

  const updateScroll = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if(messagesEndRef) {
      updateScroll();
    }
  }, [messages])
  
  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp')
    .onSnapshot(ss  => {
      setMessages(ss.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  },[])

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
    updateScroll();
  }, [])



  return (
    <div className="App">
      <img src = "https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" alt = "messenger logo"/>
      <h1> Messenger Clone </h1>
      <h2> Welcome {username} </h2>
      <center>
        <div className = "app__messages" id = "app__messages">
          <FlipMove>
            {
              messages.map(({message, id}) => (
                  <Message key = {id} name = {username} message = {message} />
              ))
            }
          </FlipMove>
          <div id={'messagesEndRef'} ref={messagesEndRef} />
        </div>
        <form className = "app__form">
          <FormControl className = "app_formControl">
            <Input className = "app__input"  placeholder = "Enter a message..." value = {input} onChange  = {(e) => setInput(e.target.value)}/>
            <IconButton className = "app__icon" variant  = "contained" color = "primary" type = 'submit' onClick = {sendMessage} >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
      </center>
    </div>
  );
}

export default App;
