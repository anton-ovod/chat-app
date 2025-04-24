import { useEffect, useRef } from "react";
import { useMessagesStore } from "../../store/useMessagesStore";
import MessagesListSkeleton from "../skeletons/MessagesListSkeleton";
import MessageItem from "./MessageItem";
import { useConversationStore } from "../../store/useConversationStore";

const MessagesList = () => {
  const { isMessagesLoading, messages, getMessages } = useMessagesStore();
  const { selectedConversation } = useConversationStore();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessages(selectedConversation!.receiver.username);
    };
    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation, getMessages]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return <MessagesListSkeleton />;
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} ref={lastMessageRef} />
      ))}
    </div>
  );
};

export default MessagesList;
