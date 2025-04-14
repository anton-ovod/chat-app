import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { FC, ChangeEvent } from "react";

type FormInputProps = {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: LucideIcon;
  showPassword?: boolean;
  togglePassword?: () => void;
};
const InputFieldWithIcon: FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
  showPassword = false,
  togglePassword = () => {},
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-2">
          {<Icon className="h-5 w-5 text-base-content/40" />}
        </div>
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`input input-bordered w-full pl-10`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-base-content/40" />
            ) : (
              <Eye className="h-5 w-5 text-base-content/40" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputFieldWithIcon;
