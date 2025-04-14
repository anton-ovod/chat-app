import AuthImagePattern from "../components/pattterns/AuthImagePattern";
import AuthHeader from "../components/auth/AuthHeader";
import SignUpForm from "../components/forms/SignUpForm";
import AuthRedirect from "../components/auth/AuthRedirect";

const SignUpPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <AuthHeader
            title="Join our community"
            subtitle="Connect with friend, share moments and stay in touch with your loved ones"
          />

          <SignUpForm />

          <AuthRedirect
            text="Already have an account?"
            linkText="Sign In"
            linkTo="/login"
          />
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friend, share moments and stay in touch with your loved ones"
      />
    </div>
  );
};

export default SignUpPage;
