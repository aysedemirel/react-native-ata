import { useTheme } from '@/src/providers/ThemeProvider';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const SeperatorView = () => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: theme.border,
        },
      ]}
    />
  );
};

export default SeperatorView;

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});
