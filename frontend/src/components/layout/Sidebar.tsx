import SidebarHeader from "../sidebar/SidebarHeader";
import ConversationsList from "../sidebar/ConversationsList";
import { FC, Dispatch, SetStateAction } from "react";
import SearchHeader from "../sidebar/searching/SearchHeader";

interface SidebarProps {
  isSearchEnabled: boolean;
  setIsSearchEnabled: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ isSearchEnabled, setIsSearchEnabled }) => {
  return (
    <aside
      className={`h-full border-r border-base-300 flex flex-col transition-all duration-300 ${
        isSearchEnabled ? "lg:w-72 flex-1 lg:flex-none" : "w-20 lg:w-72"
      }`}
    >
      {isSearchEnabled ? (
        <SearchHeader setIsSearchEnabled={setIsSearchEnabled} />
      ) : (
        <>
          <SidebarHeader
            title="Conversations"
            onSearchClick={() => setIsSearchEnabled(true)}
          />
          <ConversationsList />
        </>
      )}
    </aside>
  );
};

export default Sidebar;
