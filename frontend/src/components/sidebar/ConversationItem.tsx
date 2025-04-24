import { FC } from "react";
import { Conversation } from "../../types/conversation.store";
import { useConversationStore } from "../../store/useConversationStore";

interface ConversationProps {
  conversation: Conversation;
}

const ConversationItem: FC<ConversationProps> = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();
  return (
    <button
      onClick={() => setSelectedConversation(conversation)}
      className={`
    w-full p-3 flex items-center gap-3
    hover:bg-base-300 transition-colors
    ${
      conversation._id === selectedConversation?._id
        ? "bg-base-300 ring-1 ring-base-300"
        : ""
    }
  `}
    >
      <div className="relative mx-auto lg:mx-0">
        <img
          src={conversation.receiver.profilePic || "/avatar.png"}
          alt={conversation.receiver.fullName}
          className="size-12 object-cover rounded-full"
        />
      </div>

      {/* User info - only visible on larger screens */}
      <div className="hidden lg:block text-left min-w-0">
        <div className="font-medium truncate">
          {conversation.receiver.fullName}
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;
