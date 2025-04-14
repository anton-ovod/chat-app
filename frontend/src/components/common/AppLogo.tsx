// src/components/ui/AppLogo.tsx
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const AppLogo = () => {
  return (
    <div className="flex items-center gap-8">
      <Link
        to="/"
        className="flex items-center gap-2.5 hover:opacity-80 transition-all"
      >
        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-lg font-bold">Chatty</h1>
      </Link>
    </div>
  );
};

export default AppLogo;
