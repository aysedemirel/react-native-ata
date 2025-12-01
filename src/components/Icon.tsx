import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '@/src/providers/ThemeProvider';

interface Props {
  isEnabled: boolean;
  iconNameEnabled: keyof typeof Ionicons.glyphMap;
  iconNameDisabled: keyof typeof Ionicons.glyphMap;
  size: number;
  iconColor?: string | undefined;
  style?: TextStyle;
}
const Icon = ({
  isEnabled,
  iconNameEnabled,
  iconNameDisabled,
  size,
  iconColor,
  style,
}: Props) => {
  const { theme } = useTheme();
  return (
    <Ionicons
      style={[styles.icon, style]}
      name={isEnabled ? iconNameEnabled : iconNameDisabled}
      size={size}
      color={iconColor || theme.icon}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
});
