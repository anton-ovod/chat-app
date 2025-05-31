import { FC, useEffect } from "react";
import { useContextMenuStore } from "../../store/useContextMenuStore";
import { useMessagesStore } from "../../store/useMessagesStore";
interface ContextMenuProps {
  onDeleteClick: () => void;
}
const ContextMenu: FC<ContextMenuProps> = ({ onDeleteClick }) => {
  const { visible, closeMenu, x, y, message } = useContextMenuStore();
  const { startEditing } = useMessagesStore();
  const handleDeleteClick = () => {
    console.log("Delete message", message);
    onDeleteClick();
  };

  useEffect(() => {
    const handleClick = () => {
      if (visible) closeMenu();
      console.log("Context menu closed");
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [visible, closeMenu]);

  if (!visible || !message) return null;

  return (
    <ul
      onClick={(e) => e.stopPropagation()}
      className="absolute bg-base-100 shadow-md rounded border border-base-300 py-1"
      style={{
        top: y + 20,
        left: x,
        zIndex: 1000,
        minWidth: 120,
      }}
    >
      {" "}
      <li
        className="px-4 py-2 cursor-pointer hover:bg-secondary"
        onClick={() => {
          startEditing(message);
          closeMenu();
        }}
      >
        Edit
      </li>
      <li
        className="px-4 py-2 cursor-pointer hover:bg-secondary text-red-600"
        onClick={handleDeleteClick}
      >
        Delete
      </li>
    </ul>
  );
};

export default ContextMenu;
