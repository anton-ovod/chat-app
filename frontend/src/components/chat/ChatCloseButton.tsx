import { X } from "lucide-react";
import { useConversationStore } from "../../store/useConversationStore";

const ChatCloseButton = () => {
  const { setSelectedConversation } = useConversationStore();
  return (
    <button onClick={() => setSelectedConversation(null)}>
      <X />
    </button>
  );
};

export default ChatCloseButton;
