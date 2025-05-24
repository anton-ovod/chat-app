import { FC } from "react";
import { Message } from "../../types/messages.store";
import { useAuthStore } from "../../store/useAuthStore";
import MessageAvatar from "./MessageAvatar";
import { useConversationStore } from "../../store/useConversationStore";
import MessageTimeHeader from "./MessageTimeHeader";
import MessageItemContent from "./MessageItemContent";
import { useContextMenuStore } from "../../store/useContextMenuStore";
interface MessageItemProps {
  message: Message;
  ref?: React.Ref<HTMLDivElement>;
}
const MessageItem: FC<MessageItemProps> = ({ message, ref }) => {
  const { authUser } = useAuthStore();
  const { selectedConversation } = useConversationStore();
  const { openMenu } = useContextMenuStore();
  const isSender = message.senderId === authUser!._id;

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    openMenu(event.clientX, event.clientY, message);
  };

  return (
    <div
      key={message._id}
      ref={ref}
      className={`chat ${isSender ? "chat-end" : "chat-start"}`}
    >
      <MessageAvatar
        src={
          isSender
            ? authUser!.profilePic
            : selectedConversation!.receiver.profilePic
        }
        alt={
          isSender
            ? authUser!.fullName
            : selectedConversation!.receiver.fullName
        }
      />

      <MessageTimeHeader createdAt={message.createdAt} />

      <MessageItemContent
        content={{ text: message.text, image: message.image }}
        className={isSender ? "bg-primary text-primary-content" : "bg-base-400"}
        onContextMenu={
          isSender
            ? handleContextMenu
            : (event: React.MouseEvent) => event.preventDefault()
        }
      />
    </div>
  );
};

export default MessageItem;
