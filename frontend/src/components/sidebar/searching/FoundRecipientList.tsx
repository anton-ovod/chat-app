import { Loader2 } from "lucide-react";
import { useConversationStore } from "../../../store/useConversationStore";
import RecipientItem from "./RecipientItem";
import { useEffect } from "react";

const FoundRecipientList = () => {
  const { foundRecipients, isSearchingRecipients, clearFoundRecipients } =
    useConversationStore();

  useEffect(() => {
    return () => {
      clearFoundRecipients();
    };
  }, []);

  if (isSearchingRecipients) {
    return (
      <div className="flex justify-center items-center py-6 gap-2 text-base-content">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-y-auto w-full py-3">
        {foundRecipients.map((recipient) => (
          <RecipientItem key={recipient._id} recipient={recipient} />
        ))}

        {foundRecipients.length === 0 && (
          <div className="text-center text-base-content p-4">
            No users found
          </div>
        )}
      </div>
    </>
  );
};

export default FoundRecipientList;
