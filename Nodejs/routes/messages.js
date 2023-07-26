const router = require("express").Router();
const { Message } = require("../models");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).populate("employee");

    const lastMessage = await Message.findOne({
      conversationId: req.params.conversationId,
    }).sort({ createdAt: -1 });
    res.status(200).json({ messages: messages, lastMessage: lastMessage });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
