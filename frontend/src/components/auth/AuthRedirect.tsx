// src/components/ui/AuthRedirect.tsx
import { Link } from "react-router-dom";

type AuthRedirectProps = {
  text: string;
  linkText: string;
  linkTo: string;
};

const AuthRedirect = ({ text, linkText, linkTo }: AuthRedirectProps) => {
  return (
    <div className="text-center">
      <p className="text-base-content/60">
        {text}{" "}
        <Link to={linkTo} className="link link-primary">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthRedirect;
