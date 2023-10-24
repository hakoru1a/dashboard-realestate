import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useAuth from "hooks/useAuth";

export const MessageContext = createContext();
export function MessageProvider({ children }) {
  const user = useAuth();
  const [messages, setMessages] = useState([]);
  const [currentReciever, setCurrentReciever] = useState(0);
  useEffect(() => {
    if (currentReciever !== 0) {
      const senderId = user?.id || 0;
      const reciverId = currentReciever;
      axios.get(`http://localhost:5000/api/get-message/${senderId}/${reciverId}/`).then((res) => {
        const messages = res.data?.map((item) => {
          return {
            content: item.content,
            sender: item.sender,
            receiver: item.receiver,
          };
        });
        console.log(messages);
        setMessages(messages);
      });
    }
  }, [currentReciever]);
  const value = {
    messages,
    setMessages,
    currentReciever,
    setCurrentReciever,
  };
  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
}

export default MessageContext;

MessageProvider.propTypes = {
  children: PropTypes.node,
};
