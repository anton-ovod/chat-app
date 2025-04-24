import { FC } from "react";
import { useMessagesStore } from "../../store/useMessagesStore";
import toast from "react-hot-toast";
import { useConversationStore } from "../../store/useConversationStore";
import MessageInput from "../forms/inputs/MessageInput";
import SendMessageButton from "../message/SendMessageButton";
import AttachedImagePreview from "../message/AttachedImagePreview";

const SendMessageForm: FC = () => {
  const {
    messageContent,
    sendMessage,
    resetMessageContent,
    setMessageContent,
  } = useMessagesStore();
  const { selectedConversation } = useConversationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent.text?.trim() && !messageContent.image) return;

    try {
      if (messageContent.image === "") {
        setMessageContent((prev) => ({ ...prev, image: undefined }));
      }
      await sendMessage(selectedConversation!.receiver.username);

      resetMessageContent();
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Failed to send message:", error);
    }
  };
  return (
    <div className="p-4 w-full">
      <AttachedImagePreview />
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <MessageInput />

        <SendMessageButton />
      </form>
    </div>
  );
};

export default SendMessageForm;
