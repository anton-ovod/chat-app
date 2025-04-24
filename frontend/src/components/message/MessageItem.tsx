import { FC } from "react";
import { Message } from "../../types/messages.store";
import { useAuthStore } from "../../store/useAuthStore";
import MessageAvatar from "./MessageAvatar";
import { useConversationStore } from "../../store/useConversationStore";
import MessageTimeHeader from "./MessageTimeHeader";
import MessageItemContent from "./MessageItemContent";
interface MessageItemProps {
  message: Message;
  ref?: React.Ref<HTMLDivElement>;
}
const MessageItem: FC<MessageItemProps> = ({ message, ref }) => {
  const { authUser } = useAuthStore();
  const { selectedConversation } = useConversationStore();
  return (
    <div
      key={message._id}
      ref={ref}
      className={`chat ${
        message.senderId === authUser!._id ? "chat-end" : "chat-start"
      }`}
    >
      <MessageAvatar
        src={
          message.senderId === authUser!._id
            ? authUser!.profilePic
            : selectedConversation!.receiver.profilePic
        }
        alt={
          message.senderId === authUser!._id
            ? authUser!.fullName
            : selectedConversation!.receiver.fullName
        }
      />

      <MessageTimeHeader createdAt={message.createdAt} />

      <MessageItemContent
        content={{ text: message.text, image: message.image }}
      />
    </div>
  );
};

export default MessageItem;
