import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setAuthUser } from "../redux/userSlice";
import OtherUsers from "./OtherUsers";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { OtherUsers: otherUsers } = useSelector((store) => store.user);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5001/api/user/logout");
      toast.success(res.data.message);
      navigate("/login");
      dispatch(setAuthUser(null))
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const searchUser = otherUsers?.find((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      if (searchUser) {
        dispatch(setOtherUsers([searchUser]));
      } else {
        toast.error("user not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        action=""
        className="flex items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn  bg-slate-500">
          <FaSearch className="w-6 h-6 outline-none" />
        </button>
      </form>
      <div className="divider px-3"> </div>
      <OtherUsers />
      <div className="mt-2">
        <button className="btn btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
