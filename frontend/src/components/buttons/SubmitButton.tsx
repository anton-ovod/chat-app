import { Loader2 } from "lucide-react";
import { FC } from "react";

type SubmitButtonProps = {
  isProcessing: boolean;
  label: string;
  className?: string;
  disabled?: boolean;
};

const SubmitButton: FC<SubmitButtonProps> = ({
  isProcessing,
  label,
  className = "",
  disabled,
}) => {
  return (
    <button
      type="submit"
      className={`btn btn-primary ${className}`}
      disabled={isProcessing || disabled}
    >
      {isProcessing ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading...
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default SubmitButton;
