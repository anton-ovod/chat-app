import SidebarHeader from "../sidebar/SidebarHeader";
import ConversationsList from "../sidebar/ConversationsList";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <SidebarHeader title="Conversations" />

      <ConversationsList />
    </aside>
  );
};

export default Sidebar;
