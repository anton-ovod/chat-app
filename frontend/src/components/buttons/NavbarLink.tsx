import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { FC } from "react";

type NavbarButtonProps = {
  icon: LucideIcon;
  label: string;
  to: string;
};

const NavbarLink: FC<NavbarButtonProps> = ({ icon: Icon, label, to }) => {
  const content = (
    <>
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="hidden sm:inline">{label}</span>
    </>
  );

  return (
    <Link to={to} className="btn btn-sm gap-2 transition-colors">
      {content}
    </Link>
  );
};

export default NavbarLink;
