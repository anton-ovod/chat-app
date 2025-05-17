import { Search, Users } from "lucide-react";
import { FC } from "react";

interface SidebarHeaderProps {
  title: string;
  onSearchClick: () => void;
}

const SidebarHeader: FC<SidebarHeaderProps> = ({ title, onSearchClick }) => {
  return (
    <div className="border-b border-base-300 w-full p-5">
      <div className="flex items-center gap-2">
        <Users className="size-6" />
        <span className="font-medium hidden lg:block">{title}</span>
        <div
          className="ml-auto cursor-pointer p-2 hover:bg-base-300 rounded-full transition-colors"
          onClick={onSearchClick}
        >
          <Search className="size-6" />
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
