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
      await createConversation(recipient._id);
    }
    onClose();
  };

  const isOnline = onlineUsers.includes(recipient._id);

  return (
    <button
      onClick={() => handleClick()}
      className="w-full p-3 flex items-center gap-3 rounded-lg
                hover:bg-base-200 transition-colors"
    >
      <div className="relative flex-shrink-0">
        <img
          src={recipient.profilePic || "/avatar.png"}
          alt={recipient.fullName}
          className="size-12 rounded-full object-cover border-2 border-base-300"
        />
        {isOnline && (
          <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-base-100" />
          </div>
        )}
      </div>

      <div className="flex flex-col text-left min-w-0 overflow-hidden">
        <div className="flex items-center">
          <span className="font-medium text-base truncate">
            {recipient.fullName}
          </span>
          {isOnline && (
            <span className="ml-2 text-xs bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded">
              online
            </span>
          )}
        </div>
        <span className="text-sm text-base-content/70 truncate">
          @{recipient.username}
        </span>
      </div>
    </button>
  );
};

export default RecipientItem;
