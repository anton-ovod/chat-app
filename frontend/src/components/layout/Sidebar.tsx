import SidebarHeader from "../sidebar/SidebarHeader";
import ConversationsList from "../sidebar/ConversationsList";
import { FC, useState } from "react";
import FoundRecipientList from "../sidebar/searching/FoundRecipientList";
import RecipientSearchInputField from "../forms/inputs/RecipientSearchInputField";

const Sidebar: FC = () => {
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <SidebarHeader
        title="Conversations"
        onSearchClick={() => setIsSearchEnabled((prev) => !prev)}
      />
      {isSearchEnabled ? (
        <div className="p-4">
          <RecipientSearchInputField />
          <FoundRecipientList onClose={() => setIsSearchEnabled(false)} />
        </div>
      ) : (
        <ConversationsList />
      )}
    </aside>
  );
};

export default Sidebar;
