import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import InputFieldWithIcon from "./inputs/InputFieldWithIcon";
import { Lock, Mail, User, UserCircle } from "lucide-react";
import SubmitButton from "../buttons/SubmitButton";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signup(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control flex flex-row justify-between gap-5">
        <InputFieldWithIcon
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          placeholder="John Doe"
          icon={User}
        />

        <InputFieldWithIcon
          label="Username"
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="john-doe"
          icon={UserCircle}
        />
      </div>

      <InputFieldWithIcon
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="you@example.com"
        icon={Mail}
      />

      <InputFieldWithIcon
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="••••••••"
        icon={Lock}
        showPassword={showPassword}
        togglePassword={() => setShowPassword(!showPassword)}
      />

      <SubmitButton
        isProcessing={isSigningUp}
        label={"Create Account"}
        className="w-full"
      />
    </form>
  );
};

export default SignUpForm;
