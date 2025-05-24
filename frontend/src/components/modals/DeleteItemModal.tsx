import { FC } from "react";
import { Trash2 } from "lucide-react";

interface DeleteItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteItemModal: FC<DeleteItemModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="text-red-500" />
          <h3 className="font-bold text-lg">Delete Item</h3>
        </div>
        <p className="py-2 text-zinc-600">
          Are you sure you want to permanently delete this item? This action
          cannot be undone.
        </p>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemModal;
