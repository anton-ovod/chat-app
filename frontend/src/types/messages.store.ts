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

export interface MessagesResponse {
  messages: Message[];
}

export interface MessagesStore {
  messages: Message[];
  messageContent: MessageContent;
  isMessagesLoading: boolean;
  isMessageSending: boolean;
  editingMessage: Message | null;
  getMessages: (username: string) => Promise<void>;
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
