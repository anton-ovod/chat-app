import type { LucideIcon } from "lucide-react";
import { FC } from "react";

type NavbarButtonProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
};

const NavbarButton: FC<NavbarButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  const content = (
    <>
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="hidden sm:inline">{label}</span>
    </>
  );
  return (
    <button className="btn btn-sm flex gap-2 items-center" onClick={onClick}>
      {content}
    </button>
  );
};

export default NavbarButton;
