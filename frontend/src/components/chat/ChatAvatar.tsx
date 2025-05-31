import { useConversationStore } from "../../store/useConversationStore";
import { useSocketStore } from "../../store/useSocketStore";

const ChatAvatar = () => {
  const { selectedConversation } = useConversationStore();
  const { onlineUsers } = useSocketStore();
  return (
    <div className="avatar">
      <div className="size-10 rounded-full relative">
        <img
          src={selectedConversation?.receiver.profilePic || "/avatar.png"}
          alt={selectedConversation?.receiver.fullName}
        />
      </div>
      {onlineUsers.includes(selectedConversation!.receiver._id) && (
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default ChatAvatar;
