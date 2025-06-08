import { create } from "zustand";

type ThemeOption = string;

interface ThemeState {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("chatty-theme") || "coffee",
  setTheme: (theme: ThemeOption) => {
    localStorage.setItem("chatty-theme", theme);
    set({ theme });
  },
}));
