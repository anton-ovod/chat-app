import { useConversationStore } from "../../store/useConversationStore";
import { useSocketStore } from "../../store/useSocketStore";

const ChatRecipientInfo = () => {
  const { selectedConversation } = useConversationStore();
  const { onlineUsers } = useSocketStore();

  const isOnline =
    selectedConversation &&
    onlineUsers.includes(selectedConversation.receiver._id);

  return (
    <div>
      <h3 className="font-medium">{selectedConversation?.receiver.fullName}</h3>
      <p className="text-sm text-base-content/70">
        {isOnline ? "Online" : "Offline"}
      </p>
    </div>
  );
};

export default ChatRecipientInfo;
