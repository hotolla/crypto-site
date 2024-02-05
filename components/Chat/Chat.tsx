import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  AppBar
} from '@mui/material';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SendIcon from '@mui/icons-material/Send';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';
import Toolbar from '@mui/material/Toolbar';
import { socket } from "@/socket";

export interface IChatMessage {
  user: string;
  message: string;
}

export const Chat = () => {
  const [ isConnected, setIsConnected] = useState(socket.connected);
  const [ chatMessages, setChatMessages ] = useState<IChatMessage[]>([]);
  const [ user, setUser] = useState<IChatMessage['user']>('');
  const [ message, setMessage] = useState<IChatMessage['message']>('');
  const scrollBottomRef = useRef(null);
  const ENTER_KEY_CODE = 13;

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function handleMessage(value: IChatMessage) {
      setChatMessages(previous => [...previous, value]);
      console.log(chatMessages);
    }
    console.log(user, message);


    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', handleMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', handleMessage);
    };
  }, []);

  const handleUserChange:StandardInputProps['onChange'] = (event) => {
    setUser(event.target.value);
  };

  const handleMessageChange:StandardInputProps['onChange'] = (event) => {
    setMessage(event.target.value);
  };

  const handleEnterKey: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if(event.keyCode === ENTER_KEY_CODE){
      sendMessage(event);
    }
  };
  const sendMessage = (event:   any) => {
    // if(user && message) {
    //   webSocket.current.send(JSON.stringify({
    //     user,
    //     message
    //   }));
    // }
  };

  return (
    <Box width={1200} height={400} mt={2}>

      <AppBar position="static">
        <Toolbar>
          <LiveHelpIcon fontSize={'large'}/>
          <Typography variant="h6" align="center">
            Chat with personal assistant
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={4}>
        <Box p={2}>
          <Typography variant="h4" gutterBottom>
            I am your personal assistant. How can I help you?
          </Typography>
          <Grid container spacing={2} alignItems="center">

            <Grid xs={2} item>
              <FormControl fullWidth>
                <TextField onChange={handleUserChange}
                 value={user}
                 label="Nickname"
                 variant="outlined"/>
              </FormControl>
            </Grid>
            <Grid xs={8} item>
              <FormControl fullWidth>
                <TextField
                  value={message}
                  label="Type your message..."
                  variant="outlined"
                  onChange={handleMessageChange}
                  onKeyDown={handleEnterKey}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="send"
                color="primary"
                onClick={sendMessage}
              >
                <SendIcon/>
              </IconButton>
            </Grid>
          </Grid>

          <List ref={scrollBottomRef}>
            {chatMessages.map((chatMessage, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${chatMessage.user}: ${chatMessage.message}`}/>
              </ListItem>
            ))}
          </List>

        </Box>
      </Paper>
    </Box>
  );
};
