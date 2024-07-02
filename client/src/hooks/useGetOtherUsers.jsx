import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOtherUsers } from "../redux/userSlice";


const useGetOtherUsers = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:5001/api/user/");
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
