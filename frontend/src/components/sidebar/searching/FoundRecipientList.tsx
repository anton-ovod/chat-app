import { Loader2, UserX } from "lucide-react";
import { useConversationStore } from "../../../store/useConversationStore";
import RecipientItem from "./RecipientItem";
import { FC, useEffect } from "react";

interface FoundRecipientListProps {
  onClose: () => void;
}
const FoundRecipientList: FC<FoundRecipientListProps> = ({ onClose }) => {
  const { foundRecipients, isSearchingRecipients, clearFoundRecipients } =
    useConversationStore();

  useEffect(() => {
    return () => {
      clearFoundRecipients();
    };
  }, [clearFoundRecipients]);

  if (isSearchingRecipients) {
    return (
      <div className="flex flex-col justify-center items-center h-full py-6">
        <Loader2 className="size-8 animate-spin text-primary mb-3" />
        <span className="text-sm text-base-content/80">Searching...</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {foundRecipients.length > 0 ? (
        <>
          <div className="text-xs text-base-content/70 px-1 mb-2">
            {foundRecipients.length}{" "}
            {foundRecipients.length === 1 ? "user" : "users"} found
          </div>
          <div className="overflow-y-auto flex-1 space-y-1">
            {foundRecipients.map((recipient) => (
              <RecipientItem
                key={recipient._id}
                recipient={recipient}
                onClose={onClose}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-base-content/70">
          <UserX className="size-12 mb-3 text-base-content/40" />
          <p className="text-center text-sm">No users found</p>
          <p className="text-xs mt-2 text-center">
            Try a different search term
          </p>
        </div>
      )}
    </div>
  );
};

export default FoundRecipientList;
