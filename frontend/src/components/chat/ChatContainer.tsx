import SendMessageForm from "../forms/SendMessageForm";
import MessagesList from "../message/MessagesList";
import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <MessagesList />

      <SendMessageForm />
    </div>
  );
};
export default ChatContainer;
