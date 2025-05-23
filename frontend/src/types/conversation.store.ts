import { ConversationRecipient } from "./user";

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

export interface ConversationResponse {
  conversation: Conversation;
}

export interface ConversationRecipientsResponse {
  users: ConversationRecipient[];
}

export interface ConversationStore {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  isConversationsLoading: boolean;
  isSearchingRecipients: boolean;
  foundRecipients: ConversationRecipient[];

  createConversation: (participantId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  getConversations: () => Promise<void>;
  setSelectedConversation: (conversation: Conversation | null) => void;
  getRecipientsByFullName: (fullName: string) => Promise<void>;
  clearFoundRecipients: () => void;
}
