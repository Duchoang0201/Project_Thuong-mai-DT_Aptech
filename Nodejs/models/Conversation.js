const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Conversation = model("Conversation", ConversationSchema);
module.exports = Conversation;
