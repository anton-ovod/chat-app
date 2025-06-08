import { useCallback, useEffect, useRef } from "react";
import { useConversationStore } from "../../../store/useConversationStore";
import debounce from "lodash.debounce";
import { Search, X } from "lucide-react";

const RecipientSearchInputField = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    getRecipientsByFullName,
    clearFoundRecipients,
    foundRecipientsSearchTerm,
    setFoundRecipientsSearchTerm,
  } = useConversationStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    return () => {
      setFoundRecipientsSearchTerm("");
    };
  }, [setFoundRecipientsSearchTerm]);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        getRecipientsByFullName();
      } else {
        clearFoundRecipients();
      }
    }, 500),
    [getRecipientsByFullName, clearFoundRecipients]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFoundRecipientsSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setFoundRecipientsSearchTerm("");
    clearFoundRecipients();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="size-4 text-base-content/60" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by name..."
        className="input input-bordered w-full pl-10 pr-10 py-2 input-md"
        value={foundRecipientsSearchTerm}
        onChange={handleChange}
        autoComplete="off"
      />
      {foundRecipientsSearchTerm && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-base-300"
            type="button"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipientSearchInputField;
