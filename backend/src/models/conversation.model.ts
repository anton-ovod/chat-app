import { IConversation } from "@/types/conversation";
import mongoose, { Types } from "mongoose";

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    participants: [
      {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);

export default Conversation;
