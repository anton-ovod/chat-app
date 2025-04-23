import { Users } from "lucide-react";
import { FC } from "react";

interface SidebarHeaderProps {
  title: string;
}

const SidebarHeader: FC<SidebarHeaderProps> = ({ title }) => {
  return (
    <div className="border-b border-base-300 w-full p-5">
      <div className="flex items-center gap-2">
        <Users className="size-6" />
        <span className="font-medium hidden lg:block">{title}</span>
      </div>
    </div>
  );
};

export default SidebarHeader;
