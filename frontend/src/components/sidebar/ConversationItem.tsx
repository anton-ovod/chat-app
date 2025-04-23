import { FC } from "react";
import { Conversation } from "../../types/conversation.store";

interface ConversationProps {
  conversation: Conversation;
  onClick: (conversation: Conversation) => void;
  isSelected: boolean;
}

const ConversationItem: FC<ConversationProps> = ({
  conversation,
  onClick,
  isSelected,
}) => {
  return (
    <button
      key={conversation.id}
      onClick={() => onClick(conversation)}
      className={`
    w-full p-3 flex items-center gap-3
    hover:bg-base-300 transition-colors
    ${isSelected ? "bg-base-300 ring-1 ring-base-300" : ""}
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
