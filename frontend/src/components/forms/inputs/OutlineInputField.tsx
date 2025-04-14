import { FC, ChangeEvent } from "react";
import { LucideIcon } from "lucide-react";

type OutlineInputFieldProps = {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
};

const OutlineInputField: FC<OutlineInputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  icon: Icon,
}) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm text-zinc-400 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
      />
    </div>
  );
};

export default OutlineInputField;
