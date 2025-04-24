import { useConversationStore } from "../../store/useConversationStore";

const ChatAvatar = () => {
  const { selectedConversation } = useConversationStore();
  return (
    <div className="avatar">
      <div className="size-10 rounded-full relative">
        <img
          src={selectedConversation?.receiver.profilePic || "/avatar.png"}
          alt={selectedConversation?.receiver.fullName}
        />
      </div>
    </div>
  );
};

export default ChatAvatar;
