import { FC } from "react";
import { formatMessageTime } from "../../utils/messages.utils";

interface MessageTimeHeaderProps {
  createdAt: Date;
}
const MessageTimeHeader: FC<MessageTimeHeaderProps> = ({ createdAt }) => {
  return (
    <div className="chat-header mb-1">
      <time className="text-xs opacity-50 ml-1">
        {formatMessageTime(createdAt)}
      </time>
    </div>
  );
};

export default MessageTimeHeader;
