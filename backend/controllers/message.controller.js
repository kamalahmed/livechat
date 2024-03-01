import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params; // id is the user's id of the reciever
    const { message } = req.body;
    const senderId = req.user._id; // get the id of the sender from the authenticated user

    // find the conversation that the sender and receiver are in
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // if the conversation does not exist, create a new conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receiverId, senderId],
      });
    }
    // if the conversation already exists, add the sender to the conversation

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (!senderId || !receiverId || !message) {
      return res
        .status(400)
        .json({ error: "Error happened in sending message: Invalid message data" });
    }

    if (!newMessage) {
      return res
        .status(400)
        .json({ error: "Error happened in sending message: Invalid message data" });
    }
    conversation.messages.push(newMessage._id);

    // save message and conversation to the database
    Promise.all([newMessage.save(), conversation.save()]); // this will run in parallel to save the message and conversation to the database faster

    res.status(201).json({
      _id: newMessage._id,
      message: newMessage.message,
      senderId: newMessage.senderId,
      receiverId: newMessage.receiverId,
    });
  } catch (error) {
    console.log("Error happened in sending message");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
