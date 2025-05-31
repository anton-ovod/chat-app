import { FC } from "react";
import { ConversationRecipient } from "../../../types/user";
import { useConversationStore } from "../../../store/useConversationStore";
import { useSocketStore } from "../../../store/useSocketStore";

interface RecipientItemProps {
  recipient: ConversationRecipient;
  onClose: () => void;
}

const RecipientItem: FC<RecipientItemProps> = ({ recipient, onClose }) => {
  const { conversations, createConversation, setSelectedConversation } =
    useConversationStore();
  const { onlineUsers } = useSocketStore();

  const handleClick = async () => {
    const isExist = conversations.find(
      (conversation) => conversation.receiver.username === recipient.username
    );
    if (isExist) {
      setSelectedConversation(isExist);
    } else {
      createConversation(recipient._id);
    }
    onClose();
  };
  return (
    <button
      onClick={() => handleClick()}
      className="w-full p-3 flex items-center gap-3 
                hover:bg-base-300 transition-colors"
    >
      <div className="relative mx-auto lg:mx-0">
        <img
          src={recipient.profilePic || "/avatar.png"}
          alt={recipient.fullName}
          className="size-10 rounded-full object-cover ring-2 ring-primary group-hover:ring-offset-2 ring-offset-base-100 transition-all duration-200"
        />
        {onlineUsers.includes(recipient._id) && (
          <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
        )}
      </div>

      {/* User info - only visible on larger screens */}
      <div className="hidden lg:flex flex-col text-left min-w-0">
        <span className="font-semibold text-base truncate text-base-content">
          {recipient.fullName}
        </span>
        <span className="text-sm text-base-content/70 truncate">
          @{recipient.username}
        </span>
      </div>
    </button>
  );
};

export default RecipientItem;
