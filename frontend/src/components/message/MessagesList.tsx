import { useCallback, useEffect, useRef, useState } from "react";
import { useMessagesStore } from "../../store/useMessagesStore";
import MessagesListSkeleton from "../skeletons/MessagesListSkeleton";
import MessageItem from "./MessageItem";
import { useConversationStore } from "../../store/useConversationStore";
import ContextMenu from "./ContextMenu";
import DeleteItemModal from "../modals/DeleteItemModal";
import { useContextMenuStore } from "../../store/useContextMenuStore";
import { CursorPaginationParams } from "../../types/messages.store";
import { DEFAULT_MESSAGES_PAGE_SIZE } from "../../constants";
import { debounce } from "lodash";

const MessagesList = () => {
  const {
    isMessagesLoading,
    messages,
    getMessages,
    deleteMessage,
    paginationInfo,
  } = useMessagesStore();
  const { selectedConversation } = useConversationStore();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);
  const { message } = useContextMenuStore();

  const handleConfirmDelete = () => {
    if (message) {
      deleteMessage(message._id);
    }
    setDeleteModelOpen(false);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const params: CursorPaginationParams = {
        limit: DEFAULT_MESSAGES_PAGE_SIZE,
      };
      await getMessages(selectedConversation!.receiver.username, params);
    };
    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation, getMessages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages[messages.length - 1]]);

  const handleScroll = async () => {
    if (!containerRef.current || isMessagesLoading) return;

    if (
      paginationInfo?.hasNextPage &&
      containerRef.current.scrollTop < 100 &&
      messages.length > 0
    ) {
      const params: CursorPaginationParams = {
        before: paginationInfo.nextCursor,
        limit: DEFAULT_MESSAGES_PAGE_SIZE,
      };
      debouncedFetch(params);
    }
  };

  const debouncedFetch = useCallback(
    debounce((params: CursorPaginationParams) => {
      getMessages(selectedConversation!.receiver.username, params);
    }, 200),
    [getMessages]
  );
  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  if (isMessagesLoading) return <MessagesListSkeleton />;
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 space-y-4"
    >
      {messages.map((message, idx) => {
        const prevMessage = messages[idx - 1];
        const currentDate = formatDate(message.createdAt);
        const prevDate = prevMessage ? formatDate(prevMessage.createdAt) : null;
        const showDateHeader = !prevMessage || currentDate !== prevDate;

        return (
          <div key={message._id}>
            {showDateHeader && (
              <div className="text-center text-xs text-gray-500 mb-2">
                {currentDate}
              </div>
            )}
            <MessageItem
              message={message}
              ref={idx === messages.length - 1 ? lastMessageRef : undefined}
            />
          </div>
        );
      })}
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
