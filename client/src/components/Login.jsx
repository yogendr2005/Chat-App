import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useDispatch } from "react-redux";

import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
        dispatch(setAuthUser(res.data))
        // console.log(res);
        console.log(res.data)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.warn(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">username</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter username here"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">password</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter password here"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <p className="text-center ">
            Don't have an account?
            <Link to="/register"> register</Link>
          </p>
          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
