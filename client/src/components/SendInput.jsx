import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const { messages } = useSelector((store) => store.message);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5001/api/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
console.log("res",res)
      if (res.status === 200)
     {
      console.log(res.data.message)
        dispatch(setMessages([res.data.newMessage]));
      }

      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="border text-sm p-3 border-zinc-500 rounded-lg block w-full bg-gray-600 text-white"
        />
        <button
          className="absolute flex items-center inset-y-0 end-0 pr-4"
          type="submit"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
