import SendMessageForm from "../forms/SendMessageForm";
import MessagesList from "../message/MessagesList";
import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
  return (
    <div className="flex-1 h-full flex flex-col overflow-auto bg-base-400">
      <ChatHeader />

      <MessagesList />

      <SendMessageForm />
    </div>
  );
};
export default ChatContainer;
