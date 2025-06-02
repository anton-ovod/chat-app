import { FC, Dispatch, SetStateAction } from "react";
import RecipientSearchInputField from "../../forms/inputs/RecipientSearchInputField";
import FoundRecipientList from "./FoundRecipientList";
import { ArrowLeft } from "lucide-react";

interface SearchHeaderProps {
  setIsSearchEnabled: Dispatch<SetStateAction<boolean>>;
}

const SearchHeader: FC<SearchHeaderProps> = ({ setIsSearchEnabled }) => {
  return (
    <>
      <div className="p-3 border-b border-base-300 flex items-center">
        <button
          onClick={() => setIsSearchEnabled(false)}
          className="p-2 mr-2 rounded-full hover:bg-base-300"
        >
          <ArrowLeft className="size-5" />
        </button>
        <span className="font-medium">Search Users</span>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <RecipientSearchInputField />
        <div className="mt-3 flex-1 overflow-hidden lg:max-h-[calc(100vh-200px)]">
          <FoundRecipientList onClose={() => setIsSearchEnabled(false)} />
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
