import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.warn(error);
    }

    setUser({
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">name</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter Name here"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
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
          <div>
            <label className="label p-2">
              <span className="text-base label-text">confirm password</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter confirm password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="checkbox"
                className="checkbox mx-2"
                onChange={() => handleCheckbox("male")}
                checked={user.gender === "male"}
              />
            </div>
            <div className="flex items-center">
              <p>FeMale</p>
              <input
                type="checkbox"
                className="checkbox mx-2"
                onChange={() => handleCheckbox("female")}
                checked={user.gender === "female"}
              />
            </div>
          </div>
          <p className="text-center">
            already have an account?
            <Link to="/login"> Login</Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
