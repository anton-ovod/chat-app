import { useAuthStore } from "../store/useAuthStore";
import { useMessagesStore } from "../store/useMessagesStore";
import { useConversationStore } from "../store/useConversationStore";
import { useSocketStore } from "../store/useSocketStore";
import { useContextMenuStore } from "../store/useContextMenuStore";

export function resetAllState() {
  useAuthStore.setState({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,
    onlineUsers: [],
  });
  useMessagesStore.setState({
    messages: [],
    messageContent: { text: "", image: "" },
    isMessagesLoading: false,
    isMessageSending: false,
    editingMessage: null,
  });
  useConversationStore.setState({
    conversations: [],
    selectedConversation: null,
    isConversationsLoading: false,
    isSearchingRecipients: false,
    foundRecipients: [],
  });
  useSocketStore.getState().disconnectSocket();
  useSocketStore.setState({
    socket: null,
    onlineUsers: [],
  });
  useContextMenuStore.setState({
    visible: false,
    x: 0,
    y: 0,
    message: undefined,
  });
}
