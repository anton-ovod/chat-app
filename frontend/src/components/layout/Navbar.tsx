import { useAuthStore } from "../../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";
import AppLogo from "../common/AppLogo";
import NavbarButton from "../buttons/NavbarButton";
import NavbarLink from "../buttons/NavbarLink";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="border-b-3 border-base-200 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-200">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <AppLogo />

          <div className="flex items-center gap-2">
            <NavbarLink icon={Settings} label="Settings" to="/settings" />

            {authUser && (
              <>
                <NavbarLink icon={User} label="Profile" to="/profile" />
                <NavbarButton icon={LogOut} label="Logout" onClick={logout} />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
