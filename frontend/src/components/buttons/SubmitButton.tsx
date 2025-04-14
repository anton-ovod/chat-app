import { Loader2 } from "lucide-react";
import { FC } from "react";

type SubmitButtonProps = {
  isProcessing: boolean;
  label: string;
};

const SubmitButton: FC<SubmitButtonProps> = ({ isProcessing, label }) => {
  return (
    <button type="submit" className="btn btn-primary" disabled={isProcessing}>
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
