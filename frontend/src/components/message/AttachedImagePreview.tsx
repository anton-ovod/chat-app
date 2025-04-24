import { X } from "lucide-react";
import { useMessagesStore } from "../../store/useMessagesStore";

const AttachedImagePreview = () => {
  const {
    messageContent: { image },
    setMessageContent,
  } = useMessagesStore();
  const removeImage = () => {
    setMessageContent((prev) => ({ ...prev, image: "" }));
  };
  if (!image) return null;
  return (
    <div className="mb-3 flex items-center gap-2">
      <div className="relative">
        <img
          src={image}
          alt="Preview"
          className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
        />
        <button
          onClick={removeImage}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
        flex items-center justify-center"
          type="button"
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  );
};

export default AttachedImagePreview;
