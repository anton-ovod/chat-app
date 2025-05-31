import { FC } from "react";
import { useMessagesStore } from "../../store/useMessagesStore";
import { useConversationStore } from "../../store/useConversationStore";
import MessageInputField from "./inputs/MessageInputField";
import SendMessageButton from "../buttons/SendMessageButton";
import AttachedImagePreview from "../message/AttachedImagePreview";

const SendMessageForm: FC = () => {
  const {
    messageContent,
    sendMessage,
    resetMessageContent,
    editingMessage,
    editMessage,
    cancelEditing,
  } = useMessagesStore();
  const { selectedConversation } = useConversationStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent.text?.trim() && !messageContent.image) return;

    if (editingMessage) {
      await editMessage(editingMessage._id, messageContent);
      cancelEditing();
    } else {
      await sendMessage(selectedConversation!.receiver.username);
    }

    resetMessageContent();
  };
  return (
    <div className="p-4 w-full">
      {editingMessage && (
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-primary">
              Editing message
            </span>
            <button
              type="button"
              className="text-xs underline hover:text-primary"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <AttachedImagePreview />
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <MessageInputField />

        <SendMessageButton isEditing={!!editingMessage} />
      </form>
    </div>
  );
};

export default SendMessageForm;
