import { FC } from "react";
import { MessageContent } from "../../types/messages.store";

interface MessageItemContentProps {
  content: MessageContent;
}
const MessageItemContent: FC<MessageItemContentProps> = ({ content }) => {
  return (
    <div className="chat-bubble flex flex-col">
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
