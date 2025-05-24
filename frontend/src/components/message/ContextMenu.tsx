import { useEffect } from "react";
import { useContextMenuStore } from "../../store/useContextMenuStore";

const ContextMenu = () => {
  const { visible, closeMenu, x, y, message } = useContextMenuStore();
  useEffect(() => {
    const handleClick = () => {
      if (visible) closeMenu();
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
      className="absolute bg-base-100 shadow-md rounded border border-base-300 py-1"
      style={{
        top: y + 20,
        left: x,
        zIndex: 1000,
        minWidth: 120,
      }}
    >
      <li
        className="px-4 py-2 cursor-pointer hover:bg-secondary"
        onClick={() => console.log("Edit message", message)}
      >
        Edit
      </li>
      <li
        className="px-4 py-2 cursor-pointer hover:bg-secondary text-red-600"
        onClick={() => console.log("Delete message", message)}
      >
        Delete
      </li>
    </ul>
  );
};

export default ContextMenu;
