import { useConversationStore } from "../../store/useConversationStore";

const ChatRecipientInfo = () => {
  const { selectedConversation } = useConversationStore();
  return (
    <div>
      <h3 className="font-medium">{selectedConversation?.receiver.fullName}</h3>
      {/* <p className="text-sm text-base-content/70">
        {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
      </p> */}
    </div>
  );
};

export default ChatRecipientInfo;
