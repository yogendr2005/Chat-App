import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authuser } = useSelector(({ user }) => user);
  const selectedUser = useSelector((store) => store.user.selectedUser);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isCurrentUser = authuser?._id === message?.senderId;
  const currentTime = format(new Date(), "HH:mm");

  return (
    <div className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`} ref={scroll}>
      <div className="chat-image avatar flex items-center">
        <div className="w-10 rounded-full">
          <img
            alt="Profile Picture"
            src={
              isCurrentUser
                ? authuser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">{currentTime}</time>
      </div>
      <div
        className={`chat-bubble ${
          isCurrentUser ? "bg-gray-200 text-black" : ""
        }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default Message;
