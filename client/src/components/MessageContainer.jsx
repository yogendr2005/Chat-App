import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser, authuser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="md:min-w-[550px] flex flex-col">
      {!selectedUser ? (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-4xl text-black">
            {/* Hi , <b>{authuser.name}</b> */}
          </h1>
          <h1 className="text-4xl text-black">Lets start the conversation</h1>
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>{selectedUser.name}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
