import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import InputFieldWithIcon from "./inputs/InputFieldWithIcon";
import { Lock, UserCircle } from "lucide-react";
import SubmitButton from "../buttons/SubmitButton";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputFieldWithIcon
        label="Username"
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="user-name"
        icon={UserCircle}
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

      <SubmitButton isProcessing={isLoggingIn} label={"Login"} />
    </form>
  );
};

export default LoginForm;
