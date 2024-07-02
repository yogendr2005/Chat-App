import React from "react";
import Message from "./Message";
import { useSelector } from "react-redux";

const Messages = () => {
  const { messages } = useSelector((store) => store.message);
  const { authuser, selectedUser } = useSelector((store) => store.user);
  // console.log(messages);

  const filteredMessages = messages.filter(
    (message) =>
      (message.senderId === authuser._id && message.receiverId === selectedUser._id) ||
      (message.senderId === selectedUser._id && message.receiverId === authuser._id)
  );
  // console.log(filteredMessages);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {filteredMessages.length === 0 ? (
        <div>No messages available</div>
      ) : (
        filteredMessages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
    </div>
  );
};

export default Messages;
