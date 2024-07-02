const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { io, getReceiverSocketId } = require('../socket/socket'); // Import getReceiverSocketId directly

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    // Validate message input
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId]
      });
      await conversation.save();
    }

    // Create and save new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message // Using 'message' consistent with schema
    });
    await newMessage.save();

    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Emit new message to recipient if socket connection exists
    const receiverSocketId = getReceiverSocketId(receiverId); // Use getReceiverSocketId from imported module
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({ newMessage });
  } catch (error) {
    console.error("Error sending message:", error); // Improved logging
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    return res.status(200).json({ messages: conversation.messages });
  } catch (error) {
    console.error("Error retrieving messages:", error); // Improved logging
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendMessage, getMessage };
