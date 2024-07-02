import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

const Home = () => {
  const authuser = useSelector((store) => store.user.authuser);

  return (
    <>
      <div className="absolute top-0 right-0 m-4 p-3 bg-white bg-opacity-80 rounded-lg shadow-lg flex items-center">
        <CgProfile className="text-2xl text-gray-700 mr-2" />
        <div className="mb-1">
        <h1 className="text-xl text-gray-800">{authuser.name}</h1>
        </div>
       </div>
      <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
};

export default Home;
