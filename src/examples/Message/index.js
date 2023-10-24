import React, { useContext, useState } from "react";
import { Box, Grid, Divider, InputAdornment, IconButton, TextField, Button } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ChatCard from "./ChatCard";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import UserContext from "context/user.context";
import useAuth from "hooks/useAuth";
import { toast } from "react-toastify";
import MessageContext from "context/message.context";
import { socket } from "socket";
import axios from "axios";

const chatData = [
  {
    name: "Ronaldo ",
    message: "Sure, let's meet tomorrow at the cafe.",
    timestamp: "15 mins ago",
    avatar: "https://example.com/avatars/alex.jpg",
    hasNewMessage: true,
  },
  {
    name: "Messi",
    message: "Sure, let's meet tomorrow at the cafe.",
    timestamp: "15 mins ago",
    avatar: "https://example.com/avatars/alex.jpg",
    hasNewMessage: true,
  },
  {
    name: "John Doe",
    message: "Hey, how are you?",
    timestamp: "5 mins ago",
    avatar: "https://example.com/avatars/john.jpg",
    hasNewMessage: true,
  },
  {
    name: "Jane Smith",
    message: "I saw that movie last night. It was amazing!",
    timestamp: "10 mins ago",
    avatar: "https://example.com/avatars/jane.jpg",
    hasNewMessage: false,
  },
  {
    name: "Alex Teles",
    message: "Sure, let's meet tomorrow at the cafe.",
    timestamp: "15 mins ago",
    avatar: "https://example.com/avatars/alex.jpg",
    hasNewMessage: true,
  },
];
const messageData = [
  {
    content: "Sure, let's meet tomorrow at the cafe.",
    timestamp: "15 mins ago",
    isMyMessage: false,
  },
  {
    content: "Hey, how are you?",
    timestamp: "5 mins ago",
    isMyMessage: true,
  },
  {
    content: "I saw that movie last night. It was amazing!",
    timestamp: "10 mins ago",
    isMyMessage: false,
  },
  {
    content: "Sure, let's meet tomorrow at the cafe.",
    timestamp: "15 mins ago",
    isMyMessage: true,
  },
  {
    content: "Good morning! How was your day?",
    timestamp: "25 mins ago",
    isMyMessage: false,
  },
  {
    content: "I heard the news, that sounds interesting.",
    timestamp: "40 mins ago",
    isMyMessage: false,
  },
  {
    content: "Just wanted to check in, are you free later?",
    timestamp: "1 hour ago",
    isMyMessage: true,
  },
  {
    content: "Sorry, I can't make it tomorrow.",
    timestamp: "2 hours ago",
    isMyMessage: false,
  },
  {
    content: "No worries, we can reschedule.",
    timestamp: "2 hours ago",
    isMyMessage: true,
  },
  {
    content: "Have a great day!",
    timestamp: "3 hours ago",
    isMyMessage: false,
  },
  {
    content: "What do you think about this project?",
    timestamp: "4 hours ago",
    isMyMessage: true,
  },
  {
    content: "I think it has great potential!",
    timestamp: "4 hours ago",
    isMyMessage: false,
  },
  {
    content: "Let's meet at the park on Sunday.",
    timestamp: "5 hours ago",
    isMyMessage: true,
  },
  {
    content: "Sounds like a plan!",
    timestamp: "5 hours ago",
    isMyMessage: false,
  },
  {
    content: "Did you watch the latest episode?",
    timestamp: "6 hours ago",
    isMyMessage: false,
  },
  {
    content: "No, I haven't had the chance yet.",
    timestamp: "6 hours ago",
    isMyMessage: true,
  },
  {
    content: "Looking forward to our trip next week!",
    timestamp: "7 hours ago",
    isMyMessage: false,
  },
  {
    content: "Me too, it will be a great adventure!",
    timestamp: "7 hours ago",
    isMyMessage: true,
  },
  {
    content: "Let me know when you are available to talk.",
    timestamp: "8 hours ago",
    isMyMessage: false,
  },
  {
    content: "I'm free now. Want to have a call?",
    timestamp: "8 hours ago",
    isMyMessage: true,
  },
];
const ChatList = () => {
  const { userOnline } = useContext(UserContext);
  const { currentReciever, setCurrentReciever, messages, setMessages } = useContext(MessageContext);
  const [value, setValue] = useState("");
  const user = useAuth();
  const handleSelectCard = (customerId) => {
    setCustomerId(customerId);
    setCurrentReciever(customerId);
  };
  const handleSendMessageToCustomer = () => {
    if (value?.trim().length === 0) toast.error("Chưa nhập nội dung");
    else {
      const myMessage = {
        content: value,
        receiver: {
          id: currentReciever,
          role: "CUSTOMER",
        },
        sender: {
          id: user.id,
          role: "STAFF",
        },
      };
      setMessages([...messages, myMessage]);
      socket.emit("send-message-client", myMessage);
      // clear input
      setValue("");
    }
  };
  socket.on("new-message-client", (message) => {
    // if (message?.sender.id === Number(id)) {
    setMessages([...messages, message]);
    // }
  });
  return (
    <DashboardLayout>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <Grid container spacing={1} padding={1}>
          <Grid item xs={3} padding={1}>
            <div
              style={{
                overflowY: chatData.length > 4 ? "scroll" : "auto",
                maxHeight: "calc(100vh - 64px)",
                borderRight: "1px solid #ccc",
              }}
            >
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Divider style={{ margin: "15px 0px" }} />
              {userOnline.map((user, index) => (
                <ChatCard
                  onClick={() => handleSelectCard(user.id)}
                  key={index}
                  name={user.fullname}
                  avatar={user.avatar}
                  isSelecting={currentReciever === user.id}
                />
              ))}
            </div>
          </Grid>
          {currentReciever ? (
            <Grid
              item
              padding={2}
              xs={9}
              style={{
                height: `calc(100vh - 64px)`,
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) handleSendMessageToCustomer();
                }}
                value={value}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSendMessageToCustomer}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box padding={2} overflow={"scroll"}>
                {messages.map((chat, index) => (
                  <Message
                    key={index}
                    message={chat.content}
                    isMyMessage={user.id === chat.sender.id && chat.sender.role === "STAFF"}
                  />
                ))}
              </Box>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default ChatList;
