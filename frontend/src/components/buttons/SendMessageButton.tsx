import { Send, Edit, Loader2 } from "lucide-react";
import { useMessagesStore } from "../../store/useMessagesStore";
import { FC } from "react";

interface SendMessageButtonProps {
  isEditing?: boolean;
}

const SendMessageButton: FC<SendMessageButtonProps> = ({
  isEditing = false,
}) => {
  const { isMessageSending, messageContent } = useMessagesStore();

  return (
    <button
      type="submit"
      className={`btn btn-sm btn-circle ${isEditing ? "btn-primary" : ""}`}
      disabled={!messageContent.text?.trim() && !messageContent.image}
    >
      {isMessageSending ? (
        <Loader2 size={22} className="animate-spin" />
      ) : isEditing ? (
        <Edit size={20} />
      ) : (
        <Send size={22} />
      )}
    </button>
  );
};

export default SendMessageButton;
