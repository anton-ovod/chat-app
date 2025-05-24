import { Message } from "./messages.store";

export interface ContextMenuStore {
  visible: boolean;
  x: number;
  y: number;
  message?: Message;
  openMenu: (x: number, y: number, message: Message) => void;
  closeMenu: () => void;
}
