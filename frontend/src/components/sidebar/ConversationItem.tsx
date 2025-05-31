import { FC } from "react";
import { Conversation } from "../../types/conversation.store";
import { useConversationStore } from "../../store/useConversationStore";
import { useSocketStore } from "../../store/useSocketStore";

interface ConversationProps {
  conversation: Conversation;
}

const ConversationItem: FC<ConversationProps> = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();
  const { onlineUsers } = useSocketStore();

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
        {onlineUsers.includes(conversation.receiver._id) && (
          <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
        )}
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
