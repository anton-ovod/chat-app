import { FC, useEffect, useState } from "react";
import { useConversationStore } from "../../store/useConversationStore";
import ConversationItem from "./ConversationItem";
import ConversationsListSkeleton from "../skeletons/ConversationsListSkeleton";
import NoConversationsFound from "./NoConversationsFound";
import PaginationControls from "./PaginationControls";

const ConversationsList: FC = () => {
  const {
    conversations,
    isConversationsLoading,
    getConversations,
    paginationInfo,
  } = useConversationStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getConversations(page);
  }, [page, getConversations]);

  if (isConversationsLoading && !conversations.length)
    return <ConversationsListSkeleton />;

  return (
    <>
      <div className="overflow-y-auto w-full py-3 h-full">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation._id}
            conversation={conversation}
          />
        ))}

        {conversations.length === 0 && (
          <NoConversationsFound message="No conversations found" />
        )}
      </div>
      {paginationInfo && (
        <div className="hidden lg:block">
          <PaginationControls
            page={page}
            setPage={setPage}
            totalPages={paginationInfo.totalPages}
          />
        </div>
      )}
    </>
  );
};

export default ConversationsList;
