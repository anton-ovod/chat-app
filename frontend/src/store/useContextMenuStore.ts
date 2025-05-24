import { create } from "zustand";
import { ContextMenuStore } from "../types/contextMenu.store";

export const useContextMenuStore = create<ContextMenuStore>((set) => ({
  visible: false,
  x: 0,
  y: 0,
  message: undefined,
  openMenu: (x, y, message) => set({ visible: true, x, y, message }),
  closeMenu: () => set({ visible: false, x: 0, y: 0, message: undefined }),
}));
