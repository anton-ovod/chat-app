import { useConversationStore } from "../../store/useConversationStore";
import { useSocketStore } from "../../store/useSocketStore";

const ChatRecipientInfo = () => {
  const { receiver } = useConversationStore(
    (state) => state.selectedConversation!
  );
  const { onlineUsers } = useSocketStore();

  const isOnline = onlineUsers.includes(receiver._id);

  return (
    <div>
      <h3 className="font-medium">{receiver.fullName}</h3>
      <p className="text-sm text-base-content/70">
        {isOnline ? "Online" : "Offline"}
      </p>
    </div>
  );
};

export default ChatRecipientInfo;
