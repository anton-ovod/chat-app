import { FC } from "react";
import { useMessagesStore } from "../../store/useMessagesStore";

interface EditingIndicatorProps {
  messageId: string;
}

const EditingIndicator: FC<EditingIndicatorProps> = ({ messageId }) => {
  const { editingMessage } = useMessagesStore();

  if (!editingMessage || editingMessage._id !== messageId) return null;

  return (
    <div className="chat-footer text-xs opacity-80 mt-1 text-primary animate-pulse">
      Currently editing...
    </div>
  );
};

export default EditingIndicator;
