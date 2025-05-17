import ChatAvatar from "./ChatAvatar";
import ChatCloseButton from "./ChatCloseButton";
import ChatRecipientInfo from "./ChatRecipientInfo";

const ChatHeader = () => {
  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChatAvatar />

          <ChatRecipientInfo />
        </div>

        <ChatCloseButton />
      </div>
    </div>
  );
};
export default ChatHeader;
