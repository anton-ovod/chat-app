//import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/chat/NoChatSelected";
import Sidebar from "../components/layout/Sidebar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-200 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {/* {!selectedUser ? <NoChatSelected /> : <ChatContainer />} */}
            <NoChatSelected />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
