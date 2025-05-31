import { FC, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Image } from "lucide-react";
import { useMessagesStore } from "../../../store/useMessagesStore";

const MessageInputField: FC = () => {
  const { messageContent, setMessageContent, editingMessage } =
    useMessagesStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMessageContent((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
  };

  useEffect(() => {
    if (messageContent.image === "") fileInputRef.current!.value = "";
  }, [messageContent.image]);

  useEffect(() => {
    if (editingMessage && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editingMessage) {
        const { cancelEditing } = useMessagesStore.getState();
        cancelEditing();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editingMessage]);

  return (
    <div className="flex-1 flex gap-2">
      {" "}
      <input
        type="text"
        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
        placeholder={
          editingMessage ? "Edit your message..." : "Type a message..."
        }
        value={messageContent.text}
        ref={inputRef}
        onChange={(e) =>
          setMessageContent((prev) => ({ ...prev, text: e.target.value }))
        }
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <button
        type="button"
        className={`hidden sm:flex btn btn-circle
               ${messageContent.image ? "text-emerald-500" : "text-zinc-400"}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image size={20} />
      </button>
    </div>
  );
};

export default MessageInputField;
