export interface Conversation {
  _id: string;
  receiver: {
    fullName: string;
    username: string;
    profilePic: string;
  };
}

export interface ConversationsResponse {
  conversations: Conversation[];
}

export interface ConversationStore {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  isConversationsLoading: boolean;
  isMessagesLoading: boolean;

  getConversations: () => Promise<void>;
  setSelectedConversation: (conversation: Conversation | null) => void;
}
