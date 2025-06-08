import { ConversationRecipient } from "./user";
import { PaginationInfo } from "./pagination";

export interface Conversation {
  _id: string;
  receiver: ConversationRecipient;
}

export interface ExtendedConversationDetails extends Conversation {
  initiator: ConversationRecipient;
}

export interface CondensedConversationDetails {
  _id: string;
  receiverId: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  paginationInfo: PaginationInfo;
}

export interface ConversationResponse {
  conversation: Conversation;
}

export interface ConversationRecipientsResponse {
  users: ConversationRecipient[];
  paginationInfo?: PaginationInfo;
}

export interface ConversationStore {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  isConversationsLoading: boolean;
  isSearchingRecipients: boolean;
  foundRecipients: ConversationRecipient[];
  foundRecipientsPagination?: PaginationInfo;
  paginationInfo?: PaginationInfo;
  foundRecipientsSearchTerm: string;
  createConversation: (participantId: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  getConversations: (page?: number, pageSize?: number) => Promise<void>;
  setSelectedConversation: (conversation: Conversation | null) => void;
  getRecipientsByFullName: (page?: number, pageSize?: number) => Promise<void>;
  setFoundRecipientsSearchTerm: (searchTerm: string) => void;
  clearFoundRecipients: () => void;
}
