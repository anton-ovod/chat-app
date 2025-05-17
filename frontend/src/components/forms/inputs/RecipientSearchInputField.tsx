import { useCallback, useState } from "react";
import { useConversationStore } from "../../../store/useConversationStore";
import debounce from "lodash.debounce";

const RecipientSearchInputField = () => {
  const [query, setQuery] = useState<string>("");

  const { getRecipientsByFullName } = useConversationStore();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        getRecipientsByFullName(value);
      }
    }, 500),
    [getRecipientsByFullName]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search by full name...."
      className="input input-bordered w-full"
      value={query}
      onChange={handleChange}
    />
  );
};

export default RecipientSearchInputField;
