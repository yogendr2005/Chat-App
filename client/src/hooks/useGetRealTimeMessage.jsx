import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const userSocket = useSelector((store) => store.user?.socket);
  const messages = useSelector((store) => store.message.messages);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log("New message received:", newMessage);
      
    
      if (!isMessageExists) {
        // console.log("Dispatching new message to Redux:", newMessage);
        dispatch(setMessages([...messages, newMessage]));
      } else {
        // console.log("Message already exists in Redux state, skipping:", newMessage);
      }
    };

    if (userSocket) {
      console.log("WebSocket subscription enabled for newMessage event.");
      userSocket.on("newMessage", handleNewMessage);
    } else {
      console.log("No active userSocket found. WebSocket subscription skipped.");
    }

    return () => {
      if (userSocket) {
        console.log("Cleaning up WebSocket subscription for newMessage event.");
        userSocket.off("newMessage", handleNewMessage);
      }
    };
  }, [dispatch, userSocket, messages]);

  return null; // Assuming this hook is used for side effects only
};

export default useGetRealTimeMessage;
