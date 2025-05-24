import { Send } from "lucide-react";
import { useMessagesStore } from "../../store/useMessagesStore";

const SendMessageButton = () => {
  const { messageContent } = useMessagesStore();

  return (
    <button
      type="submit"
      className="btn btn-sm btn-circle"
      disabled={!messageContent.text?.trim() && !messageContent.image}
    >
      <Send size={22} />
    </button>
  );
};

export default SendMessageButton;
