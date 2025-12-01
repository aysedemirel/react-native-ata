import { useThemeStore } from '@/src/stores/themestore/themeStore';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../themes';

type ThemeContextType = {
  theme: typeof darkTheme | typeof lightTheme;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const appTheme = useThemeStore((state) => state.theme);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (appTheme === undefined) {
      setTheme(colorScheme === 'dark');
    }
  }, [appTheme, colorScheme, setTheme]);

  const theme = useMemo(
    () => appTheme ?? (colorScheme === 'dark' ? darkTheme : lightTheme),
    [appTheme, colorScheme],
  );

  const contextValue = useMemo(
    () => ({ theme, toggleTheme, isDark }),
    [theme, toggleTheme, isDark],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
