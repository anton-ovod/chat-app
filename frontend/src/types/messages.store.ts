export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageContent {
  text?: string;
  image?: string;
}

export interface CursorPaginationInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextCursor?: string;
  previousCursor?: string;
  limit?: number;
}

export interface CursorPaginationParams {
  before?: string;
  after?: string;
  limit?: number;
}

export interface MessagesResponse {
  messages: Message[];
  paginationInfo?: CursorPaginationInfo;
}

export interface MessagesStore {
  messages: Message[];
  messageContent: MessageContent;
  isMessagesLoading: boolean;
  isMessageSending: boolean;
  editingMessage: Message | null;
  paginationInfo?: CursorPaginationInfo;
  getMessages: (
    username: string,
    params?: CursorPaginationParams
  ) => Promise<void>;
  sendMessage: (username: string) => Promise<void>;
  editMessage: (messageId: string, content: MessageContent) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  setMessageContent: (
    updater: (prev: MessageContent) => MessageContent
  ) => void;
  resetMessageContent: () => void;
  startEditing: (message: Message) => void;
  cancelEditing: () => void;
}
