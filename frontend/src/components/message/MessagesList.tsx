import { useEffect, useRef, useState } from "react";
import { useMessagesStore } from "../../store/useMessagesStore";
import MessagesListSkeleton from "../skeletons/MessagesListSkeleton";
import MessageItem from "./MessageItem";
import { useConversationStore } from "../../store/useConversationStore";
import ContextMenu from "./ContextMenu";
import DeleteItemModal from "../modals/DeleteItemModal";
import { useContextMenuStore } from "../../store/useContextMenuStore";

const MessagesList = () => {
  const { isMessagesLoading, messages, getMessages, deleteMessage } =
    useMessagesStore();
  const { selectedConversation } = useConversationStore();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const { message } = useContextMenuStore();

  const handleConfirmDelete = () => {
    console.log("Deleting message:", message);
    if (message) {
      deleteMessage(message._id);
    }
    setDeleteModelOpen(false);
  };

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
      {messages.map((message, idx) => (
        <MessageItem
          key={message._id}
          message={message}
          ref={idx === messages.length - 1 ? lastMessageRef : undefined}
        />
      ))}
      <ContextMenu onDeleteClick={() => setDeleteModelOpen(true)} />
      <DeleteItemModal
        isOpen={deleteModelOpen}
        onClose={() => setDeleteModelOpen(false)}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default MessagesList;
