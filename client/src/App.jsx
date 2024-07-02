import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocketId } from "./redux/socketSlice"; 
import { setOnlineUsers } from "./redux/userSlice";
import { setMessages } from "./redux/messageSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const authuser = useSelector((store) => store.user.authuser);
  const socketId = useSelector((store) => store.socket.socketId); // Corrected selector
  const dispatch = useDispatch();


  useEffect(() => {
    if (authuser) {
      console.log("Connecting to socket...");
      const newSocket = io("http://localhost:5001", {
        transports: ["websocket"],
        query: {
          userId: authuser._id,
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected to socket");
      });

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
        // console.log("Online users:", onlineUsers);
      });

      newSocket.on("newMessage", (newMessage) => {
        dispatch(setMessages([newMessage]));
      // console.log(newMessage)
      });

      dispatch(setSocketId(newSocket.id));

     

      return () => {
        console.log("Disconnecting from socket...");
        newSocket.close();
        dispatch(setSocketId(null)); 
      };
    } else {
      if (socketId) {
        console.log("Disconnecting from socket...");
        dispatch(setSocketId(null)); 
      }
    }
  }, [authuser,dispatch,socketId]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
