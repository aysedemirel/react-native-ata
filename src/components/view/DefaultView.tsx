import { useTheme } from '@/src/providers/ThemeProvider';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}
const DefaultView = ({ children, style }: Props) => {
  const { theme } = useTheme();
  return (
    <View style={[{ backgroundColor: theme.background }, style]}>
      {children}
    </View>
  );
};

export default DefaultView;
