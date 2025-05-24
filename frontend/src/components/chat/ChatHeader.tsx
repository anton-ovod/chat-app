import { Trash, X } from "lucide-react";
import ChatAvatar from "./ChatAvatar";
import ChatRecipientInfo from "./ChatRecipientInfo";
import { useConversationStore } from "../../store/useConversationStore";
import { useState } from "react";
import DeleteItemModal from "../modals/DeleteItemModal";

const ChatHeader = () => {
  const { setSelectedConversation, deleteConversation, selectedConversation } =
    useConversationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-3 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChatAvatar />
            <ChatRecipientInfo />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Delete Conversation"
            >
              <Trash />
            </button>

            <button
              onClick={() => setSelectedConversation(null)}
              className="text-zinc-600 hover:text-zinc-800 transition-colors"
              title="Close"
            >
              <X />
            </button>
          </div>
        </div>
      </div>

      <DeleteItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() => deleteConversation(selectedConversation!._id)}
      />
    </>
  );
};

export default ChatHeader;
