import AuthImagePattern from "../components/pattterns/AuthImagePattern";
import AuthHeader from "../components/auth/AuthHeader";
import LoginForm from "../components/forms/LoginForm";
import AuthRedirect from "../components/auth/AuthRedirect";

const LoginPage = () => {
  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <AuthHeader
            title="Welcome back!"
            subtitle="Sign in to continue your conversations and catch up with your messages."
          />

          <LoginForm />

          <AuthRedirect
            text="Don't have an account?"
            linkText="Sign Up"
            linkTo="/signup"
          />
        </div>
      </div>

      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};
export default LoginPage;
