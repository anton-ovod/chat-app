import { FC, useEffect } from "react";
import { useConversationStore } from "../../store/useConversationStore";
import ConversationItem from "./ConversationItem";
import ConversationsListSkeleton from "../skeletons/ConversationsListSkeleton";
import NoConversationsFound from "./NoConversationsFound";

const ConversationsList: FC = () => {
  const {
    conversations,
    isConversationsLoading,
    getConversations,
    selectedConversation,
    setSelectedConversation,
  } = useConversationStore();

  useEffect(() => {
    const fetchConversations = async () => {
      await getConversations();
    };
    fetchConversations();
  }, []);

  if (isConversationsLoading && !conversations.length)
    return <ConversationsListSkeleton />;

  return (
    <>
      <div className="overflow-y-auto w-full py-3">
        {conversations.map((conversation) => (
          <ConversationItem
            conversation={conversation}
            onClick={setSelectedConversation}
            isSelected={selectedConversation?.id === conversation.id}
          />
        ))}

        {conversations.length === 0 && (
          <NoConversationsFound message="No conversations found" />
        )}
      </div>
    </>
  );
};

export default ConversationsList;
