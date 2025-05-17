import { FC } from "react";
import { MessageContent } from "../../types/messages.store";

interface MessageItemContentProps {
  content: MessageContent;
  className?: string;
}
const MessageItemContent: FC<MessageItemContentProps> = ({
  content,
  className,
}) => {
  return (
    <div className={`chat-bubble flex flex-col ${className ?? ""}`}>
      {content.image && (
        <img
          src={content.image}
          alt="Attachment"
          className="sm:max-w-[200px] rounded-md mb-2"
        />
      )}
      {content.text && <p>{content.text}</p>}
    </div>
  );
};

export default MessageItemContent;
