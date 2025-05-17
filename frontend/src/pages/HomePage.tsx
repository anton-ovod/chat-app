import ChatContainer from "../components/chat/ChatContainer";
import NoChatSelected from "../components/chat/NoChatSelected";
import Sidebar from "../components/layout/Sidebar";
import { useConversationStore } from "../store/useConversationStore";

const HomePage = () => {
  const { selectedConversation } = useConversationStore();
  return (
    <div className="min-h-screen bg-base-400">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-200 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden border-3 border-base-400">
            <Sidebar />

            {!selectedConversation ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
