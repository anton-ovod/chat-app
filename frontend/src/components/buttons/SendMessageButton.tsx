import { Send, Edit } from "lucide-react";
import { useMessagesStore } from "../../store/useMessagesStore";
import { FC } from "react";

interface SendMessageButtonProps {
  isEditing?: boolean;
}

const SendMessageButton: FC<SendMessageButtonProps> = ({
  isEditing = false,
}) => {
  const { messageContent } = useMessagesStore();

  return (
    <button
      type="submit"
      className={`btn btn-sm btn-circle ${isEditing ? "btn-primary" : ""}`}
      disabled={!messageContent.text?.trim() && !messageContent.image}
    >
      {isEditing ? <Edit size={20} /> : <Send size={22} />}
    </button>
  );
};

export default SendMessageButton;
