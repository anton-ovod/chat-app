import { FC } from "react";
import { formatMessageTime } from "../../utils/messages.utils";

interface MessageTimeHeaderProps {
  createdAt: Date;
  updatedAt?: Date;
}

const MessageTimeHeader: FC<MessageTimeHeaderProps> = ({
  createdAt,
  updatedAt,
}) => {
  const isEdited =
    updatedAt && new Date(updatedAt).getTime() > new Date(createdAt).getTime();

  return (
    <div className="chat-header mb-1">
      <time className="text-xs opacity-50 ml-1">
        {formatMessageTime(createdAt)}
        {isEdited && <span className="ml-1 text-xs italic">(edited)</span>}
      </time>
    </div>
  );
};

export default MessageTimeHeader;
