export interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  text: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
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
  messages: Message[];
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  isConversationsLoading: boolean;
  isMessagesLoading: boolean;

  getConversations: () => Promise<void>;
  getMessages: (username: string) => Promise<void>;
  setSelectedConversation: (conversation: Conversation) => void;
}
