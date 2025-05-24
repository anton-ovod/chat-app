import { FC } from "react";
import { MessageContent } from "../../types/messages.store";

interface MessageItemContentProps {
  content: MessageContent;
  className?: string;
  onContextMenu: (event: React.MouseEvent) => void;
}
const MessageItemContent: FC<MessageItemContentProps> = ({
  content,
  className,
  onContextMenu,
}) => {
  return (
    <div
      className={`chat-bubble flex flex-col ${className ?? ""}`}
      onContextMenu={onContextMenu}
    >
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
