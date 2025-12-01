import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { darkTheme, lightTheme } from '@/src/themes';
import themeMmkvStorage from './themeMmkv';

export type Theme = typeof lightTheme | typeof darkTheme | undefined;

export interface ThemeState {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (isDarkMode: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      theme: undefined,
      toggleTheme: () =>
        set((state) => {
          const newTheme = !state.isDark;
          set({ isDark: newTheme, theme: newTheme ? darkTheme : lightTheme });
          return { isDark: newTheme };
        }),
      setTheme: (isDarkMode: boolean) => {
        set({ isDark: isDarkMode, theme: isDarkMode ? darkTheme : lightTheme });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => themeMmkvStorage),
    },
  ),
);
