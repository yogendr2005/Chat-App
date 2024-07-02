import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser || !selectedUser._id) {
      console.error('No selected user or user ID not found');
      return;
    }

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:5001/api/message/${selectedUser._id}`);
    
        if (res.status === 200) {
          // console.log(res.data.messages); 
          dispatch(setMessages(res.data.messages));
        } else {
          console.error('Failed to fetch messages:', res.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [dispatch, selectedUser]);
};

export default useGetMessages;
