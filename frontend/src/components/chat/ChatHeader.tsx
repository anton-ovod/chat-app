import { Trash, X, MoreVertical } from "lucide-react";
import ChatAvatar from "./ChatAvatar";
import ChatRecipientInfo from "./ChatRecipientInfo";
import { useConversationStore } from "../../store/useConversationStore";
import { useRef, useEffect, useState } from "react";
import DeleteItemModal from "../modals/DeleteItemModal";

const ChatHeader = () => {
  const { setSelectedConversation, deleteConversation, selectedConversation } =
    useConversationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <div className="p-3 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChatAvatar />
            <ChatRecipientInfo />
          </div>

          <div className="flex items-center gap-2 relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded-full hover:bg-base-200 transition-colors"
              title="More actions"
            >
              <MoreVertical />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 z-10 bg-base-100 border border-base-300 rounded shadow-md">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 justify-between px-4 py-4 text-red-900 hover:bg-base-200"
                >
                  <Trash /> Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedConversation(null);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 justify-between px-4 py-4 text-zinc-600 hover:bg-base-200"
                >
                  <X /> Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() => deleteConversation(selectedConversation!._id)}
      />
    </>
  );
};

export default ChatHeader;
