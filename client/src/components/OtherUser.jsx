import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { CiUnread } from "react-icons/ci";
import { CiRead } from "react-icons/ci";


const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers.includes(user._id);

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div>
      <div
        onClick={selectedUserHandler}
        className={`${
          selectedUser?._id === user._id ? "bg-zinc-700 hover:text-black" : ""
        } flex gap-2 items-center text-white hover:bg-zinc-900 rounded p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img
              src={user?.profilePhoto}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p>{user.name}</p>
          </div>
        </div>
        {
          selectedUser?._id === user._id  ? <CiRead size={20} color="#00FF00"/> : <CiUnread size={20} color="#FF0000"/>
        }
      </div>
      <div className="divider my-0 py-0"></div>
    </div>
  );
};

export default OtherUser;
